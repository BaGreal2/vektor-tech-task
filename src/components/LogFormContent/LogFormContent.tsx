import { Button, Stack, Typography } from '@mui/material'
import { Control, SubmitHandler } from 'react-hook-form'

import { LogFormData } from '@/types'

import {
  EquipmentInputSection,
  ProviderDetailsInputSection,
  ServiceDetailsInputSection
} from './components'

interface LogFormContentProps {
  control: Control<LogFormData>
  onSubmit: SubmitHandler<LogFormData>
  indicateDataPersisted?: boolean
  isDataPersisted?: boolean
}

export const LogFormContent = ({
  control,
  onSubmit,
  indicateDataPersisted = false,
  isDataPersisted = false
}: LogFormContentProps) => {
  const { handleSubmit } = control

  return (
    <Stack
      spacing="1.5rem"
      sx={{
        width: '40rem'
      }}
    >
      <ProviderDetailsInputSection control={control} />
      <EquipmentInputSection control={control} />
      <ServiceDetailsInputSection control={control} />

      {indicateDataPersisted && (
        <Typography variant="h6" color={isDataPersisted ? '#1d43e1' : 'black'}>
          {isDataPersisted ? 'Saved Draft' : 'Saving Draft...'}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </Stack>
  )
}
