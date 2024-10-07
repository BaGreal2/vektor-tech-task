import { Box, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@/store'
import { closeDrafts } from '@/store/features/drafts-slice'
import { LogData } from '@/types'

import {
  EquipmentInputSection,
  ProviderDetailsInputSection,
  ServiceDetailsInputSection
} from './components'
import { DEFAULT_LOG_DATA } from './data'

export const DraftsModal = () => {
  const isOpen = useAppSelector((state) => state.drafts.isOpen)
  const dispatch = useAppDispatch()
  const { watch, handleSubmit, control } = useForm<LogData>({
    defaultValues: DEFAULT_LOG_DATA
  })

  const onSubmit = (data: LogData) => {
    console.log(data)
    dispatch(closeDrafts())
  }

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
            width: '40rem'
          }}
        >
          <ProviderDetailsInputSection control={control} />
          <EquipmentInputSection control={control} />
          <ServiceDetailsInputSection control={control} />
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
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
