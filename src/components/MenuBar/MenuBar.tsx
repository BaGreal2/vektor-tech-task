import { Add, RoomPreferences } from '@mui/icons-material'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { nanoid } from 'nanoid'

import { DEFAULT_LOG_DATA, FILTERS } from '@/data'
import { removePersistData } from '@/helpers'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  addDraft,
  openDrafts,
  setActiveDraft
} from '@/store/features/draftsSlice'
import { requestSearch } from '@/store/features/logsSlice'

import { FilterTab } from '../FilterTab'

export const MenuBar = () => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.logs.searchQuery)

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '4.25rem',
        width: '100%',
        paddingX: '1rem'
      }}
    >
      <Stack
        direction="row"
        spacing="2.5rem"
        sx={{
          alignItems: 'center',
          width: '80%'
        }}
      >
        <Stack direction="row" spacing="0.5rem" alignItems="center">
          <RoomPreferences width="2.25rem" height="2.25rem" opacity={0.5} />
          <Typography variant="h6">Service Logs</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing="1rem"
          sx={{
            flexGrow: 1
          }}
        >
          {/* Search */}
          <TextField
            sx={{
              maxWidth: '25.5rem',
              height: '2.5rem',
              flexGrow: 1,
              background: '#F3F4F6'
            }}
            size="small"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => dispatch(requestSearch(e.target.value))}
          />
          {/* Filters */}
          <Stack direction="row" spacing="1rem">
            {FILTERS.map((filter) => (
              <FilterTab key={filter} type={filter} />
            ))}
          </Stack>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{
          background: '#1d43e1',
          height: '2.5rem'
        }}
        onClick={() => {
          removePersistData('currentDraft')
          const newId = nanoid()
          dispatch(addDraft({ ...DEFAULT_LOG_DATA, id: newId }))
          dispatch(setActiveDraft(newId))
          dispatch(openDrafts())
        }}
      >
        Add
      </Button>
    </Stack>
  )
}
