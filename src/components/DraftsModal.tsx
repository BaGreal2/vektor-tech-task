import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Stack,
  TextField
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import { filters } from '@/data'
import { useAppDispatch, useAppSelector } from '@/store'
import { closeDrafts } from '@/store/features/drafts-slice'

export const DraftsModal = () => {
  const isOpen = useAppSelector((state) => state.drafts.isOpen)
  const dispatch = useAppDispatch()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        width: '100vw',
        height: '100vh',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease-in-out',
        borderRadius: 0
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 10,
          top: 0,
          right: 0,
          width: '90%',
          height: '100%',
          background: 'white',
          transform: isOpen ? undefined : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          padding: '1rem'
        }}
      >
        <Stack
          spacing="1.5rem"
          sx={{
            width: '30rem'
          }}
        >
          <Stack direction="row">
            <TextField
              id="provider"
              label="Provider"
              sx={{
                flexGrow: 1
              }}
            />
            <TextField id="service-order" label="Service Order" />
          </Stack>

          <Stack direction="row">
            <TextField
              id="truck"
              label="Truck"
              sx={{
                flexGrow: 1
              }}
            />
            <TextField
              id="odometer"
              label="Odometer"
              type="number"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">mi</InputAdornment>
                  )
                }
              }}
              sx={{
                width: '10rem'
              }}
            />
            <TextField
              id="engine-hours"
              label="Engine Hours"
              type="number"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">h</InputAdornment>
                  )
                }
              }}
              sx={{
                width: '10rem'
              }}
            />
          </Stack>

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
                {filters.map((option) => (
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
        </Stack>
      </Box>

      <Button
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={() => dispatch(closeDrafts())}
      />
    </Box>
  )
}
