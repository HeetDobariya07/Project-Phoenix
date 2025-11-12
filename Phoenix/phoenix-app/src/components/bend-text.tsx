'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface BendTextProps {
  text?: string;
  className?: string;
}

export function BendText({ text = 'PHOENIX', className = '' }: BendTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [animatedIn, setAnimatedIn] = useState(false);
    const sceneRef = useRef<{
        scene?: THREE.Scene;
        camera?: THREE.OrthographicCamera;
        renderer?: THREE.WebGLRenderer;
        animationId?: number;
        cleanup?: () => void;
    }>({});

    useEffect(() => {
        setMounted(true);
        // Trigger the entry animation after component mounts
        const timer = setTimeout(() => {
            setAnimatedIn(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!containerRef.current || !mounted || !animatedIn) return;

        // Always use light theme colors for consistency
        const textColor = '#ffffff';
        const shadowColor = 'rgba(255, 255, 255, 0.3)';

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000);
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        const containerElement = containerRef.current;
        const width = containerElement.clientWidth;
        const height = containerElement.clientHeight;
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        containerElement.appendChild(renderer.domElement);

        // Create high-resolution text texture
        const createTextTexture = (displayText: string, blur = false) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = 2048;
            canvas.height = 512;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Clear canvas
            ctx.fillStyle = 'transparent';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (blur) {
                ctx.fillStyle = shadowColor;
                ctx.filter = 'blur(15px)';
                ctx.font = 'bold 200px var(--font-michroma), system-ui, sans-serif';
            } else {
                ctx.fillStyle = textColor;
                ctx.font = 'bold 200px var(--font-michroma), system-ui, sans-serif';
            }

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.letterSpacing = '0.2em';

            ctx.fillText(displayText, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.needsUpdate = true;
            return texture;
        };

        const textTexture = createTextTexture(text);
        const shadowTexture = createTextTexture(text, true);

        // Displacement shader material
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: textTexture },
                uDisplacement: { value: new THREE.Vector3(999, 999, 999) } // 初始位置设置在远处，避免初始形变
            },
            vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;
        
        float easeInOutCubic(float x) {
          return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
        }

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
          vUv = uv;
          vec3 newPosition = position;
          
          vec4 localPosition = vec4(position, 1.0);
          vec4 worldPosition = modelMatrix * localPosition;
          
          float dist = length(uDisplacement - worldPosition.xyz);
          float minDistance = 2.5; // 减小影响范围，让效果更精确
          
          if (dist < minDistance) {
            float distanceMapped = map(dist, 0.0, minDistance, 1.0, 0.0);
            float val = easeInOutCubic(distanceMapped) * 1.5; // 减小位移强度，让效果更自然
            newPosition.z += val;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          gl_FragColor = vec4(color);
        }
      `,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        // Shadow shader material with improved shadow effect
        const shadowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: shadowTexture },
                uDisplacement: { value: new THREE.Vector3(999, 999, 999) } // 初始位置设置在远处，避免初始形变
            },
            vertexShader: `
        varying vec2 vUv;
        varying float dist;
        uniform vec3 uDisplacement;

        void main() {
          vUv = uv;
          
          vec4 localPosition = vec4(position, 1.0);
          vec4 worldPosition = modelMatrix * localPosition;
          dist = length(uDisplacement - worldPosition.xyz);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        varying float dist;
        uniform sampler2D uTexture;
        
        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        
        float easeOutQuad(float x) {
          return 1.0 - (1.0 - x) * (1.0 - x);
        }

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          float minDistance = 2.5; // 与主材质保持一致
          
          if (dist < minDistance) {
            float normalizedDist = map(dist, 0.0, minDistance, 1.0, 0.0);
            float easedDist = easeOutQuad(normalizedDist);
            float alpha = easedDist * color.a * 0.8; // 调整阴影强度
            color.a = alpha;
          } else {
            color.a = 0.0; // 超出范围时完全透明
          }
          
          gl_FragColor = vec4(color);
        }
      `,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        // Create geometries with higher subdivision for smoother displacement
        const geometry = new THREE.PlaneGeometry(15, 15, 150, 150);

        // Create meshes
        const textMesh = new THREE.Mesh(geometry, shaderMaterial);
        const shadowMesh = new THREE.Mesh(geometry, shadowMaterial);
        shadowMesh.position.z = -0.05; // 调整阴影位置，让它更贴近文字

        scene.add(textMesh);
        scene.add(shadowMesh);

        // Create invisible hit plane for raycasting
        const hitGeometry = new THREE.PlaneGeometry(20, 20);
        const hitMaterial = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0
        });
        const hitPlane = new THREE.Mesh(hitGeometry, hitMaterial);
        hitPlane.name = 'hit';
        scene.add(hitPlane);

        // Raycasting setup
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        const onPointerMove = (event: MouseEvent) => {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(pointer, camera);
            const intersects = raycaster.intersectObject(hitPlane);

            if (intersects.length > 0) {
                const point = intersects[0].point;
                // Update shader uniforms
                shaderMaterial.uniforms.uDisplacement.value.copy(point);
                shadowMaterial.uniforms.uDisplacement.value.copy(point);
            }
        };

        const onPointerLeave = () => {
            // 鼠标离开时重置位移位置
            const farPoint = new THREE.Vector3(999, 999, 999);
            shaderMaterial.uniforms.uDisplacement.value.copy(farPoint);
            shadowMaterial.uniforms.uDisplacement.value.copy(farPoint);
        };

        // Animation loop
        const animate = () => {
            sceneRef.current.animationId = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        // Event listeners
        containerElement.addEventListener('pointermove', onPointerMove);
        containerElement.addEventListener('pointerleave', onPointerLeave);

        // Handle resize
        const handleResize = () => {
            if (!containerElement) return;
            const width = containerElement.clientWidth;
            const height = containerElement.clientHeight;
            const aspect = width / height;
            camera.left = -10 * aspect;
            camera.right = 10 * aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Store references and start animation
        sceneRef.current = {
            scene,
            camera,
            renderer,
            cleanup: () => {
                containerElement.removeEventListener('pointermove', onPointerMove);
                containerElement.removeEventListener('pointerleave', onPointerLeave);
                window.removeEventListener('resize', handleResize);
                if (sceneRef.current.animationId) {
                    cancelAnimationFrame(sceneRef.current.animationId);
                }
                if (containerElement && renderer.domElement && containerElement.contains(renderer.domElement)) {
                    containerElement.removeChild(renderer.domElement);
                }
                renderer.dispose();
                textTexture.dispose();
                shadowTexture.dispose();
                geometry.dispose();
                hitGeometry.dispose();
                shaderMaterial.dispose();
                shadowMaterial.dispose();
                hitMaterial.dispose();
            }
        };

        animate();

        return () => {
            sceneRef.current.cleanup?.();
        };
    }, [text, mounted, animatedIn]);

    if (!mounted) {
        return null;
    }

    // Split text into letters for word-appear animation
    const letters = text.split('');

    return (
        <div className={`w-full h-full relative ${className}`}>
            {/* Animated text overlay that fades out after animation */}
            {!animatedIn && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <style>{`
                        @keyframes word-appear {
                            0% {
                                opacity: 0;
                                transform: translateY(30px) scale(0.8);
                                filter: blur(10px);
                            }
                            50% {
                                opacity: 0.8;
                                transform: translateY(10px) scale(0.95);
                                filter: blur(2px);
                            }
                            100% {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                                filter: blur(0);
                            }
                        }
                        
                        .letter-animate {
                            display: inline-block;
                            opacity: 0;
                            animation: word-appear 0.8s ease-out forwards;
                        }
                    `}</style>
                    <h1 
                        className="font-bold leading-tight tracking-wider text-white drop-shadow-lg"
                        style={{
                            fontFamily: "var(--font-michroma)",
                            whiteSpace: "nowrap",
                            fontSize: "clamp(2.5rem, 6vw, 8rem)",
                            letterSpacing: "0.2em",
                            textAlign: "center",
                        }}
                    >
                        {letters.map((letter, index) => (
                            <span
                                key={`letter-${index}`}
                                className="letter-animate"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </h1>
                </div>
            )}
            
            {/* Three.js canvas with fade-in after text animation */}
            <div 
                ref={containerRef} 
                className="w-full h-full"
                style={{
                    opacity: animatedIn ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                }}
            />
        </div>
    );
}
