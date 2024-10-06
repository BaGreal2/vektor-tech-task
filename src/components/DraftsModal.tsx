import { Box, Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/store'
import { closeDrafts } from '@/store/features/drafts-slice'

export const DraftsModal = () => {
  const isOpen = useAppSelector((state) => state.drafts.isOpen)
  const dispatch = useAppDispatch()

  return (
    <Button
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.5)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease-in-out',
        borderRadius: 0
      }}
      onClick={() => dispatch(closeDrafts())}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '90%',
          height: '100%',
          background: 'white',
          transform: isOpen ? undefined : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem'
        }}
      ></Box>
    </Button>
  )
}
