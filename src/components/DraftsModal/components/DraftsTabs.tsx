import { Add } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import { nanoid } from 'nanoid'

import { DEFAULT_LOG_DATA } from '@/data'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  addDraft,
  setActiveDraft,
  updateDraft
} from '@/store/features/draftsSlice'
import { LogFormData } from '@/types'

interface DraftsTabsProps {
  currentDraftData: LogFormData
}

export const DraftsTabs = ({ currentDraftData }: DraftsTabsProps) => {
  const { drafts, activeDraftId } = useAppSelector((state) => state.drafts)
  const dispatch = useAppDispatch()

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      height="2.5rem"
      marginBottom="1rem"
    >
      {drafts.map((draft) => (
        <Button
          key={draft.id}
          sx={{
            height: '100%',
            background: activeDraftId === draft.id ? 'white' : '#F3F4F6'
          }}
          onClick={() => dispatch(setActiveDraft(draft.id))}
        >
          New Draft
        </Button>
      ))}
      <Button
        sx={{
          height: '100%'
        }}
        onClick={() => {
          if (activeDraftId) {
            dispatch(updateDraft({ ...currentDraftData, id: activeDraftId }))
          }
          const newId = nanoid()
          dispatch(addDraft({ ...DEFAULT_LOG_DATA, id: newId }))
          dispatch(setActiveDraft(newId))
        }}
      >
        <Add />
      </Button>
    </Stack>
  )
}
