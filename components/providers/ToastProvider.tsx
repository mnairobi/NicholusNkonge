'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { Toast } from '@/components/ui/Toast'

type ToastType = 'success' | 'error'

interface ToastState {
  message: string
  type: ToastType
  visible: boolean
}

interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  })

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type, visible: true })
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}