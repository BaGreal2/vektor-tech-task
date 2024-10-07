import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

type FormInputDropdownProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  options: { value: string; label: string }[]
} & FormControlProps

export const FormInputDropdown = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  required,
  ...props
}: FormInputDropdownProps<T>) => {
  return (
    <FormControl required={required} {...props}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {options.map((option) => {
              return (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {option.label}
                </MenuItem>
              )
            })}
          </Select>
        )}
      />
    </FormControl>
  )
}
