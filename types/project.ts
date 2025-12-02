export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  images?: string[]
  challenge?: string
  solution?: string
  impact?: string
  featured?: boolean
}

export interface ProjectPresentation {
  gradient: string
  size: 'small' | 'medium' | 'large'
  rotation: number
  position: { x: number; y: number }
}

export interface HomepageProject {
  id: string
  title: string
  description: string
  image?: string
  tags: string[]
  gradient: string
  size: 'small' | 'medium' | 'large'
  rotation: number
  position: { x: number; y: number }
}
