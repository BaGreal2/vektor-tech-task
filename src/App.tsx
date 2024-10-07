import { Box } from '@mui/material'

import { DraftsModal, DraftsModalTrigger } from '@/components/DraftsModal'
import { LogEditModal } from '@/components/LogEditModal'
import { LogsTable } from '@/components/LogsTable'
import { MenuBar } from '@/components/MenuBar'

export const App = () => {
  return (
    <Box>
      <MenuBar />
      <LogsTable />
      <DraftsModalTrigger />

      <LogEditModal />
      <DraftsModal />
    </Box>
  )
}
