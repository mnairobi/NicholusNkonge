'use client'

import { create } from 'zustand' // Optional: use simple context instead
import { Toast, ToastType } from '@/types'

// Simple implementation without Zustand — using React context
let toastCallbacks: {
  show: (message: string, type: ToastType, duration?: number) => void
} | null = null

export function registerToastCallbacks(callbacks: typeof toastCallbacks) {
  toastCallbacks = callbacks
}

export function useToastTrigger() {
  const show = (message: string, type: ToastType = 'info', duration = 5000) => {
    if (toastCallbacks) {
      toastCallbacks.show(message, type, duration)
    }
  }

  return {
    success: (msg: string) => show(msg, 'success'),
    error: (msg: string) => show(msg, 'error'),
    info: (msg: string) => show(msg, 'info'),
  }
}