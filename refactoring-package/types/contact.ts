export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

export interface ContactFormResponse {
  success: boolean
  message?: string
  error?: string
}
