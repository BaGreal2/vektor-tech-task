import { ReactNode } from 'react'
import { Box, Button } from '@mui/material'

interface SlideModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const SlideModal = ({ isOpen, onClose, children }: SlideModalProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        width: '100vw',
        height: '100vh',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease-in-out',
        borderRadius: 0
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 10,
          top: 0,
          right: 0,
          width: '90%',
          height: '100%',
          background: 'white',
          transform: isOpen ? undefined : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          padding: '1rem'
        }}
      >
        {children}
      </Box>

      <Button
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={onClose}
      />
    </Box>
  )
}
