import { Button, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/store'
import { openDrafts, setActiveDraft } from '@/store/features/draftsSlice'

export const DraftsModalTrigger = () => {
  const { drafts, activeDraftId } = useAppSelector((state) => state.drafts)
  const dispatch = useAppDispatch()

  return (
    <Button
      variant="contained"
      sx={{
        position: 'fixed',
        right: 0,
        bottom: '12rem',
        display: 'flex',
        flexDirection: 'column',
        width: '5rem',
        height: '5.5rem',
        textTransform: 'uppercase',
        background: '#1D43E1'
      }}
      onClick={() => {
        dispatch(setActiveDraft(activeDraftId ?? drafts[drafts.length - 1].id))
        dispatch(openDrafts())
      }}
    >
      <Typography variant="h5">{drafts.length} </Typography>
      <Typography variant="button">log drafts</Typography>
    </Button>
  )
}
