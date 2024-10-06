import { Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Header } from '@/components/Header'

import { DraftsModal } from './components/DraftsModal'

export const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Header />
        <DraftsModal />
      </Box>
    </LocalizationProvider>
  )
}
