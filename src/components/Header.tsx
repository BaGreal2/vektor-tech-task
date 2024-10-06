import { Add, RoomPreferences } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'

import { useAppDispatch } from '@/store'
import { openDrafts } from '@/store/features/drafts-slice'

import { FilterTab } from './FilterTab'

export const Header = () => {
  const dispatch = useAppDispatch()

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
          alignItems: 'center'
        }}
      >
        <Stack direction="row" spacing="0.5rem" sx={{ alignItems: 'center' }}>
          <RoomPreferences
            sx={{ width: '2.25rem', height: '2.25rem', opacity: 0.5 }}
          />
          <Typography variant="h6">Service Logs</Typography>
        </Stack>
        <Stack direction="row" spacing="1rem">
          {/* Search */}
          <Box
            sx={{ width: '25.5rem', height: '2.25rem', background: '#F3F4F6' }}
          />
          {/* Filters */}
          <Stack direction="row" spacing="1rem">
            <FilterTab isActive={true} type="all" />
            <FilterTab isActive={false} type="planned" />
            <FilterTab isActive={false} type="unplanned" />
            <FilterTab isActive={false} type="emergency" />
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
        onClick={() => dispatch(openDrafts())}
      >
        Add
      </Button>
    </Stack>
  )
}
