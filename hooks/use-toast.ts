"use client"

// Keeping this simple for now - you can expand with a proper toast system later
import { toast as sonnerToast } from "sonner"

export const useToast = () => {
  return {
    toast: sonnerToast,
  }
}

export { sonnerToast as toast }