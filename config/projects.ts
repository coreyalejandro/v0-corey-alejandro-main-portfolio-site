// Plug-and-play project configuration
// Simply add or remove projects from this array to update your portfolio

export const projects = [
  {
    id: "creative-chaos",
    title: "Creative Chaos Design System",
    description:
      "A revolutionary design system that breaks all the rules with deep saturated gradients and living interfaces.",
    longDescription:
      "Creative Chaos is a design system that challenges conventional UI/UX patterns. It features breathing backgrounds, 3D perspective effects, and organic positioning that creates truly unique web experiences.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React"],
    githubUrl: "https://github.com/yourusername/creative-chaos",
    liveUrl: "https://creative-chaos.vercel.app",
    images: [
      "/creative-chaos-design-system-hero.jpg",
      "/breathing-background-effect.jpg",
      "/laydown-card-animation.jpg",
    ],
    challenge:
      "Most design systems prioritize minimalism and conformity, making every website look the same. How do we create interfaces that are both functional and emotionally engaging?",
    solution:
      "By combining deep saturated gradients, organic positioning, and living animations, Creative Chaos creates interfaces that breathe and respond to user interaction, making every moment feel unique.",
    impact: "Achieved 95% user engagement increase and featured on Awwwards for innovative design approach.",
    featured: true,
  },
  {
    id: "neural-depth-scroll",
    title: "Neural Depth Scroll",
    description: "An experimental 3D scrolling effect that creates the illusion of walking through dimensional space.",
    longDescription:
      "This project explores 3D perspective transforms and scroll-based animations to create a footbridge effect where users feel like they are walking deeper into the interface.",
    technologies: ["React", "CSS 3D Transforms", "Scroll API", "TypeScript"],
    githubUrl: "https://github.com/yourusername/neural-depth-scroll",
    images: ["/3d-perspective-scroll-effect.jpg", "/dimensional-depth-animation.jpg"],
    challenge:
      "Creating a sense of depth and forward motion in a 2D web interface without using WebGL or heavy 3D libraries.",
    solution:
      "Leveraging CSS 3D transforms with scroll-triggered animations to simulate perspective and depth, creating an immersive tunnel effect.",
    impact:
      "Demonstrated innovative use of native web technologies, inspiring similar effects across the design community.",
    featured: false,
  },
  // Add more projects here - they will automatically appear in your portfolio
]

// Helper function to get project by ID
export function getProjectById(id: string) {
  return projects.find((project) => project.id === id)
}

// Helper function to get featured projects
export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}
