"use client"
import { motion } from "framer-motion"

// Animation variants for reusability
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
}

const backgroundVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

// Footer data for better maintainability
const footerData = {
  sections: [
    { title: "About", links: [{ name: "Home", href: "/" }, { name: "About Project", href: "/about" }, { name: "Our Team", href: "/team" }, { name: "Contact Us", href: "#contact" }] },
    { title: "Project", links: [{ name: "Overview", href: "/about" }, { name: "Classification", href: "/about#classification" }, { name: "Technology", href: "/about#technology" }, { name: "Research", href: "#research" }] },
    { title: "Resources", links: [{ name: "Documentation", href: "#docs" }, { name: "Publications", href: "#publications" }, { name: "GitHub", href: "https://github.com/Meet2304/project-phoenix" }, { name: "Learn More", href: "/about" }] },
    { title: "Connect", links: [{ name: "Team", href: "/team" }, { name: "Collaborate", href: "#collaborate" }] },
  ],
  title: "Phoenix",
  subtitle: "Explainable AI for Cervical Cancer",
  copyright: "©2025 Project Phoenix. All rights reserved",
  tagline: "Made on Earth, by Humans",
}

// Reusable components
const NavSection = ({ title, links, index }: { title: string; links: { name: string; href: string }[]; index: number }) => (
  <motion.div variants={itemVariants} custom={index} className="flex flex-col gap-2">
    <motion.h3
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      className="mb-2 uppercase text-white/70 text-xs font-semibold tracking-wider border-b border-white/20 pb-1 hover:text-white transition-colors duration-300"
    >
      {title}
    </motion.h3>
    {links.map((link, linkIndex) => (
      <motion.a
        key={linkIndex}
        variants={linkVariants}
        custom={linkIndex}
        href={link.href}
        whileHover={{
          x: 8,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="text-white/60 hover:text-white transition-colors duration-300 font-sans text-xs md:text-sm group relative"
      >
        <span className="relative">
          {link.name}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-white"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </motion.a>
    ))}
  </motion.div>
)

function StickyFooter() {
  return (
    <div className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-black/30 backdrop-blur-md py-8 md:py-12 px-4 md:px-12 pb-24 md:pb-16 w-full flex flex-col justify-between relative overflow-hidden min-h-[60vh] border-t border-white/10"
      >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-primary/3 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-secondary/3 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Navigation Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 lg:gap-20">
                {footerData.sections.map((section, index) => (
                  <NavSection key={section.title} title={section.title} links={section.links} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Footer Bottom Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-4 md:gap-6 mt-12 md:mt-6"
            >
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[6vw] leading-[0.8] font-serif bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent cursor-default"
                >
                  {footerData.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: "auto" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="flex items-center gap-3 md:gap-4 mt-3 md:mt-4"
                >
                  <motion.div
                    className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-white to-white/60"
                    animate={{
                      scaleX: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    className="text-white/60 text-xs md:text-sm font-sans hover:text-white transition-colors duration-300"
                  >
                    {footerData.subtitle}
                  </motion.p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-left md:text-right"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="text-white/60 text-xs md:text-sm mb-2 md:mb-3 hover:text-white transition-colors duration-300"
                >
                  {footerData.copyright}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="text-white/40 text-xs md:text-sm italic hover:text-white/60 transition-colors duration-300"
                >
                  {footerData.tagline}
                </motion.p>
              </motion.div>
            </motion.div>
      </motion.div>
    </div>
  )
}

export { StickyFooter as Footer }
export default StickyFooter
