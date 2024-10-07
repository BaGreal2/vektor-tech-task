import { InputAdornment, Stack } from '@mui/material'
import { Control } from 'react-hook-form'

import { FormInputText } from '@/components/FormComponents'
import { LogFormData } from '@/types'

interface EquipmentInputSectionProps {
  control: Control<LogFormData>
}

export const EquipmentInputSection = ({
  control
}: EquipmentInputSectionProps) => {
  return (
    <Stack direction="row">
      <FormInputText
        name="truckId"
        label="Truck"
        control={control}
        required
        sx={{
          flexGrow: 1
        }}
      />
      <FormInputText
        name="odometer"
        label="Odometer"
        control={control}
        type="number"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">mi</InputAdornment>
          }
        }}
        sx={{
          width: '17rem'
        }}
      />
      <FormInputText
        name="engineHours"
        label="Engine Hours"
        control={control}
        type="number"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">h</InputAdornment>
          }
        }}
        sx={{
          width: '17rem'
        }}
      />
    </Stack>
  )
}
