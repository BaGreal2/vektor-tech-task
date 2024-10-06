import { Stack, TextField } from '@mui/material'

export const EquipmentInputSection = () => {
  return (
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
  )
}
