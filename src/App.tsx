import { Box } from '@mui/material'

import { DraftsModal, DraftsModalTrigger } from '@/components/DraftsModal'
import { LogsTable } from '@/components/LogsTable'
import { MenuBar } from '@/components/MenuBar'

export const App = () => {
  return (
    <Box>
      <MenuBar />
      <LogsTable />
      <DraftsModalTrigger />
      <DraftsModal />
    </Box>
  )
}
