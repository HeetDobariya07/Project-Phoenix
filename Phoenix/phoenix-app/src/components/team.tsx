import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

// X (Twitter) Logo Component
const XLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const academicGuide = {
    name: 'Dr. Academic Guide',
    role: 'Academic Guide & Mentor',
    avatar: '/images/team/guide.jpg',
    github: '#',
    linkedin: '#',
    twitter: '#',
};

const members = [
    {
        name: 'Dr. Meera Khanna',
        role: 'Guide & Mentor',
        avatar: '/images/team/Meet_Profile_Beach_upscaled.png',
        github: 'https://github.com/Meet2304',
        linkedin: 'https://www.linkedin.com/in/dr-meera-thapar-khanna-892696163/',
        twitter: 'https://twitter.com/meetbhatt',
    },    
    {
        name: 'Meet Bhatt',
        role: 'Project Lead',
        avatar: '/images/team/Meet_Profile_Beach.png',
        github: 'https://github.com/Meet2304',
        linkedin: 'https://linkedin.com/in/meetbhatt',
        twitter: 'https://twitter.com/meetbhatt',
    },
    {
        name: 'Maitri Patel',
        role: 'ML Engineer',
        avatar: '/images/team/Maitri.jpg',
        github: 'https://github.com/maitri0204',
        linkedin: 'https://www.linkedin.com/in/maitri-patel-b42249296/',
        twitter: '#',
    },
    {
        name: 'Devanshi Dudhatra',
        role: 'ML Engineer',
        avatar: '/images/team/Devanshi.jpeg',
        github: 'https://github.com/devanshidudhatra',
        linkedin: 'https://www.linkedin.com/in/devanshi-dudhatra-408116253/',
        twitter: 'https://x.com/Devanshi0109',
    },
    {
        name: 'Heet Dobariya',
        role: 'Data Scientist',
        avatar: '/images/team/Heet.jpeg',
        github: 'https://github.com/HeetDobariya07',
        linkedin: 'https://www.linkedin.com/in/heet-dobariya-30758a28a/',
        twitter: 'https://x.com/HeetDobariya63',
    },
];

export default function TeamSection() {
    return (
        <section className="flex w-full flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-8 md:px-16 pb-32 sm:pb-36 md:pb-40">
            <div className="mx-auto max-w-5xl w-full">
                <div className="flex flex-col items-center justify-center gap-8 text-center mb-16">
                    <h1
                        className="font-bold leading-tight text-white drop-shadow-lg"
                        style={{
                            fontFamily: "var(--font-michroma)",
                            fontSize: "clamp(2rem, 8vw, 6rem)",
                        }}
                    >
                        OUR DREAM TEAM
                    </h1>
                    <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl" style={{ fontFamily: "var(--font-poppins)" }}>
                        A dedicated team of researchers and developers working together to revolutionize 
                        cervical cancer cell classification using advanced AI and explainable machine learning techniques.
                    </p>
                </div>

                {/* Team Members */}
                <div className="mt-12 md:mt-16 pb-8">
                    <div className="grid gap-x-6 gap-y-16 sm:gap-y-20 md:grid-cols-2 lg:gap-x-8">
                        {members.map((member, index) => (
                            <div key={index} className="group overflow-hidden mb-8">
                                <img
                                    className="h-80 sm:h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[18rem] sm:group-hover:h-[22.5rem] group-hover:rounded-xl"
                                    src={member.avatar}
                                    alt={member.name}
                                    width="826"
                                    height="1239"
                                    loading="lazy"
                                />
                                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-white text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                                            {member.name}
                                        </h3>
                                        <span className="text-white/50 text-xs">_0{index + 1}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-white/60 inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            {member.role}
                                        </span>
                                        <div className="flex gap-3 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                            <Link
                                                href={member.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/70 hover:text-white transition-colors"
                                                aria-label="GitHub"
                                            >
                                                <Github className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={member.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/70 hover:text-white transition-colors"
                                                aria-label="LinkedIn"
                                            >
                                                <Linkedin className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={member.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/70 hover:text-white transition-colors"
                                                aria-label="X (Twitter)"
                                            >
                                                <XLogo className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}