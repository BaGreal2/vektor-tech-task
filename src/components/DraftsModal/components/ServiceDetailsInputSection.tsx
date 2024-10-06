import { MenuItem, Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import { FILTERS } from '@/data'

export const ServiceDetailsInputSection = () => {
  return (
    <Stack spacing="0.5rem">
      <Stack direction="row">
        <DatePicker label="Date In" />
        <DatePicker label="Date Out" />
        <TextField
          id="type"
          label="Type"
          select
          defaultValue="all"
          sx={{
            flexGrow: 1,
            minWidth: '10rem',
            textTransform: 'capitalize'
          }}
        >
          {FILTERS.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{ textTransform: 'capitalize' }}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <TextField id="description" label="Service Description" />
    </Stack>
  )
}
