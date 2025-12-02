"use client"

import { useState, useEffect, useRef } from "react"
import { Download, Mail, Github, Linkedin, MapPin, Phone, Sparkles, Zap, Star } from "lucide-react"
import { AudioSection } from "@/components/audio-experience/audio-section"
import { AudioButton } from "@/components/audio-experience/audio-button"
import Link from "next/link"

export default function ResumeTemplate() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const resumeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    const timer = setInterval(() => setTime((prev) => prev + 0.1), 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(timer)
    }
  }, [])

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      // Dynamic import to reduce bundle size
      const html2canvas = (await import("html2canvas")).default
      const jsPDF = (await import("jspdf")).default

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save("Corey-Alejandro-Resume.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      // Fallback: open print dialog
      window.print()
    }
  }

  return (
    <AudioSection
      id="resume"
      title="Resume - Professional Experience"
      description="Download my resume to learn more about my professional background, skills, and achievements."
      position={{ x: 0, y: 6, z: -8 }}
    >
      <section className="relative min-h-screen py-32 mb-16">
        <div
          className="absolute inset-0 rounded-3xl transition-all duration-[3000ms]"
          style={{
            background: `
              radial-gradient(ellipse at ${20 + Math.sin(time) * 10}% ${30 + Math.cos(time * 0.7) * 15}%, 
                var(--theme-primary-rgb, 251, 191, 36) 0%, 
                var(--theme-secondary-rgb, 239, 68, 68) 30%, 
                var(--theme-accent-rgb, 194, 65, 12) 70%, 
                rgba(20, 20, 30, 1) 100%),
              radial-gradient(ellipse at ${80 + Math.cos(time * 1.2) * 8}% ${70 + Math.sin(time * 0.9) * 12}%, 
                var(--theme-primary-rgb, 251, 146, 60) 0%, 
                transparent 50%)
            `,
            transform: `scale(${1 + Math.sin(time * 0.5) * 0.05}) rotate(${Math.sin(time * 0.3) * 2}deg)`,
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${10 + ((i * 9) % 80)}%`,
                top: `${15 + ((i * 13) % 70)}%`,
                transform: `
                  translate(
                    ${Math.sin(time + i) * 30 + mousePosition.x * 0.01}px,
                    ${Math.cos(time * 0.8 + i) * 20 + mousePosition.y * 0.008}px
                  ) 
                  rotate(${time * 12 + i * 30}deg)
                  scale(${0.3 + Math.sin(time + i) * 0.3})
                `,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white/30 backdrop-blur-sm" />
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-4">
          {/* Header with Download Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div
              className="mb-6 md:mb-0"
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.008}px)`,
              }}
            >
              <h1
                className="text-6xl md:text-8xl font-black leading-none mb-4 transition-colors duration-[3000ms]"
                style={{
                  transform: `rotate(${Math.sin(time * 0.2) * 1}deg)`,
                  color: "var(--theme-text)",
                }}
              >
                <span className="block transform -rotate-1">Resume</span>
              </h1>
              <p
                className="text-xl max-w-2xl transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Download my professional resume to explore my experience, skills, and achievements
              </p>
            </div>

            <AudioButton
              onClick={handleDownloadPDF}
              description="Download resume as PDF"
              className="font-bold px-8 py-4 rounded-full shadow-2xl inline-flex items-center gap-3 transform hover:scale-110 transition-all duration-300"
              style={{
                transform: `rotate(${Math.sin(time * 0.6) * 2}deg)`,
                background: "var(--theme-gradient)",
                color: "var(--theme-text)",
              }}
            >
              <Download className="w-5 h-5" />
              Download PDF
            </AudioButton>
          </div>

          {/* Resume Content - Printable Version */}
          <div
            ref={resumeRef}
            className="rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden transition-all duration-[3000ms]"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg)`,
              backgroundColor: "var(--theme-card)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-2 transition-all duration-[3000ms]"
              style={{
                transform: `scaleX(${1 + Math.sin(time * 0.3) * 0.1})`,
                background: "var(--theme-gradient)",
              }}
            />

            {/* Resume Header */}
            <div
              className="relative mb-8 pb-8 transition-colors duration-[3000ms]"
              style={{ borderBottom: "2px solid var(--theme-border)" }}
            >
              <h2
                className="text-4xl md:text-5xl font-black mb-4 transition-colors duration-[3000ms]"
                style={{
                  transform: `translateX(${Math.sin(time * 0.2) * 2}px)`,
                  color: "var(--theme-primary)",
                }}
              >
                Corey Alejandro
              </h2>
              <p
                className="text-xl mb-6 transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Creative Developer & Design System Architect
              </p>

              <div
                className="flex flex-wrap gap-4 text-sm transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                <div className="flex items-center gap-2">
                  <Mail
                    className="w-4 h-4 transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-primary)" }}
                  />
                  <span>corey@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone
                    className="w-4 h-4 transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-primary)" }}
                  />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin
                    className="w-4 h-4 transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-primary)" }}
                  />
                  <span>San Francisco, CA</span>
                </div>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/coreyalejandro</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>linkedin.com/in/coreyalejandro</span>
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <section className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 flex items-center gap-2 transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-primary)" }}
              >
                <Sparkles className="w-5 h-5" />
                Professional Summary
              </h3>
              <p
                className="leading-relaxed transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Creative developer and design system architect with a passion for building accessible, joyful web
                experiences. Specialized in creating innovative interfaces that combine cutting-edge technology with
                emotional design. Expert in React, TypeScript, and Next.js with a strong focus on accessibility and user
                experience.
              </p>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 flex items-center gap-2 transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-primary)" }}
              >
                <Zap className="w-5 h-5" />
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4
                    className="font-semibold mb-2 transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Frontend
                  </h4>
                  <p
                    className="text-sm transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3, JavaScript (ES6+)
                  </p>
                </div>
                <div>
                  <h4
                    className="font-semibold mb-2 transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Design & Tools
                  </h4>
                  <p
                    className="text-sm transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    Figma, Adobe Creative Suite, Web Audio API, Accessibility (WCAG 2.1 AA), Design Systems
                  </p>
                </div>
                <div>
                  <h4
                    className="font-semibold mb-2 transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Backend & DevOps
                  </h4>
                  <p
                    className="text-sm transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    Node.js, API Development, Vercel, Git, CI/CD, Performance Optimization
                  </p>
                </div>
                <div>
                  <h4
                    className="font-semibold mb-2 transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text)" }}
                  >
                    Specializations
                  </h4>
                  <p
                    className="text-sm transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    3D Web Graphics, Spatial Audio, Creative Coding, Motion Design, User Experience
                  </p>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 flex items-center gap-2 transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-primary)" }}
              >
                <Star className="w-5 h-5" />
                Professional Experience
              </h3>

              <div className="space-y-6">
                <div
                  className="pl-6 transition-all duration-[3000ms]"
                  style={{ borderLeft: "4px solid var(--theme-primary)" }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-[3000ms]"
                        style={{ color: "var(--theme-text)" }}
                      >
                        Senior Creative Developer
                      </h4>
                      <p
                        className="font-medium transition-colors duration-[3000ms]"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        Creative Chaos Design System
                      </p>
                    </div>
                    <span
                      className="text-sm mt-1 md:mt-0 transition-colors duration-[3000ms]"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      2023 - Present
                    </span>
                  </div>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    <li>
                      Architected and developed a revolutionary design system with 3D spatial audio accessibility
                      features
                    </li>
                    <li>
                      Built component library with 40+ reusable components following Creative Chaos design principles
                    </li>
                    <li>
                      Implemented Web Audio API integration for immersive accessibility experiences beyond traditional
                      screen readers
                    </li>
                    <li>Led performance optimization achieving Lighthouse scores of 95+ across all metrics</li>
                  </ul>
                </div>

                <div
                  className="pl-6 transition-all duration-[3000ms]"
                  style={{ borderLeft: "4px solid var(--theme-secondary)" }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-[3000ms]"
                        style={{ color: "var(--theme-text)" }}
                      >
                        Frontend Engineer
                      </h4>
                      <p
                        className="font-medium transition-colors duration-[3000ms]"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        Tech Innovation Co.
                      </p>
                    </div>
                    <span
                      className="text-sm mt-1 md:mt-0 transition-colors duration-[3000ms]"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      2021 - 2023
                    </span>
                  </div>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    <li>Developed responsive web applications using React and Next.js serving 100K+ monthly users</li>
                    <li>
                      Collaborated with design team to implement pixel-perfect UI components with focus on accessibility
                    </li>
                    <li>Optimized application performance reducing load time by 40%</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>

                <div
                  className="pl-6 transition-all duration-[3000ms]"
                  style={{ borderLeft: "4px solid var(--theme-accent)" }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-[3000ms]"
                        style={{ color: "var(--theme-text)" }}
                      >
                        UI/UX Developer
                      </h4>
                      <p
                        className="font-medium transition-colors duration-[3000ms]"
                        style={{ color: "var(--theme-primary)" }}
                      >
                        Digital Agency
                      </p>
                    </div>
                    <span
                      className="text-sm mt-1 md:mt-0 transition-colors duration-[3000ms]"
                      style={{ color: "var(--theme-text-secondary)" }}
                    >
                      2019 - 2021
                    </span>
                  </div>
                  <ul
                    className="list-disc list-inside space-y-1 text-sm transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    <li>
                      Created engaging user interfaces for clients across various industries including e-commerce and
                      SaaS
                    </li>
                    <li>Designed and implemented custom animations and micro-interactions</li>
                    <li>Ensured WCAG 2.1 AA compliance for all client projects</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h3
                className="text-2xl font-bold mb-4 transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-primary)" }}
              >
                Education
              </h3>
              <div
                className="pl-6 transition-all duration-[3000ms]"
                style={{ borderLeft: "4px solid var(--theme-accent)" }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h4
                      className="font-bold text-lg transition-colors duration-[3000ms]"
                      style={{ color: "var(--theme-text)" }}
                    >
                      Bachelor of Science in Computer Science
                    </h4>
                    <p
                      className="font-medium transition-colors duration-[3000ms]"
                      style={{ color: "var(--theme-primary)" }}
                    >
                      University of Technology
                    </p>
                  </div>
                  <span
                    className="text-sm mt-1 md:mt-0 transition-colors duration-[3000ms]"
                    style={{ color: "var(--theme-text-secondary)" }}
                  >
                    2015 - 2019
                  </span>
                </div>
                <p
                  className="text-sm transition-colors duration-[3000ms]"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  Focus: Human-Computer Interaction & Web Development
                </p>
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h3
                className="text-2xl font-bold mb-4 transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-primary)" }}
              >
                Key Achievements
              </h3>
              <ul
                className="list-disc list-inside space-y-2 text-sm transition-colors duration-[3000ms]"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                <li>Developed award-winning portfolio site featured on Awwwards</li>
                <li>Open source contributor with 50+ GitHub repositories</li>
                <li>Speaker at Web Accessibility Conference 2024</li>
                <li>Published articles on creative coding and accessibility</li>
              </ul>
            </section>
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-12">
            <p
              className="text-lg mb-6 transition-colors duration-[3000ms]"
              style={{ color: "var(--theme-text-secondary)" }}
            >
              Interested in working together? Let's create something amazing.
            </p>
            <Link href="/contact">
              <AudioButton
                description="Get in touch - Contact me for collaboration"
                className="backdrop-blur-md font-semibold px-8 py-4 rounded-full inline-flex items-center gap-3 transition-all duration-300"
                style={{
                  backgroundColor: "var(--theme-card)",
                  color: "var(--theme-text)",
                  border: "1px solid var(--theme-border)",
                }}
              >
                <Mail className="w-5 h-5" />
                Get In Touch
              </AudioButton>
            </Link>
          </div>
        </div>
      </section>
    </AudioSection>
  )
}
