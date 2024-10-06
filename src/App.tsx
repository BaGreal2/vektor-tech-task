import { Box } from '@mui/material'

import { Header } from '@/components/Header'

import { DraftsModal } from './components/DraftsModal'

export const App = () => {
  return (
    <Box>
      <Header />
      <DraftsModal />
    </Box>
  )
}
