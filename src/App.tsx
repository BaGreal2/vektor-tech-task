import { Box } from '@mui/material'

import {
  DraftsModalContent,
  DraftsModalTrigger
} from '@/components/DraftsModal'
import { LogEditModalContent } from '@/components/LogEditModal'
import { LogsTable } from '@/components/LogsTable'
import { MenuBar } from '@/components/MenuBar'
import { SlideModal } from '@/components/SlideModal'

import { useAppDispatch, useAppSelector } from './store'
import { closeDrafts } from './store/features/draftsSlice'
import { closeEdit } from './store/features/logsSlice'

export const App = () => {
  const { isDraftsOpen } = useAppSelector((state) => state.drafts)
  const { isEditOpen } = useAppSelector((state) => state.logs)
  const dispatch = useAppDispatch()

  return (
    <Box>
      <MenuBar />
      <LogsTable />
      <DraftsModalTrigger />

      <SlideModal isOpen={isEditOpen} onClose={() => dispatch(closeEdit())}>
        <LogEditModalContent />
      </SlideModal>
      <SlideModal isOpen={isDraftsOpen} onClose={() => dispatch(closeDrafts())}>
        <DraftsModalContent />
      </SlideModal>
    </Box>
  )
}
