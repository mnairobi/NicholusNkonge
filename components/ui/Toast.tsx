'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="alert"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[200] flex items-start gap-3 max-w-sm p-4 rounded-2xl shadow-2xl border backdrop-blur-md ${
            type === 'success'
              ? 'bg-neon-green/10 border-neon-green/30 text-neon-green'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {type === 'success' ? (
            <FiCheckCircle size={20} className="shrink-0 mt-0.5" />
          ) : (
            <FiAlertCircle size={20} className="shrink-0 mt-0.5" />
          )}
          <p className="text-sm leading-relaxed flex-1 text-text-primary">
            {message}
          </p>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors shrink-0"
            aria-label="Dismiss notification"
          >
            <FiX size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}