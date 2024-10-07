import { Stack } from '@mui/material'
import { Control } from 'react-hook-form'

import { FormInputText } from '@/components/ui/FormComponents'
import { LogFormData } from '@/types'

interface ProviderDetailsInputSectionProps {
  control: Control<LogFormData>
}

export const ProviderDetailsInputSection = ({
  control
}: ProviderDetailsInputSectionProps) => {
  return (
    <Stack direction="row">
      <FormInputText
        name="providerId"
        label="Provider"
        control={control}
        required
        sx={{
          flexGrow: 1
        }}
      />
      <FormInputText
        name="serviceOrder"
        label="Service Order"
        required
        control={control}
      />
    </Stack>
  )
}
