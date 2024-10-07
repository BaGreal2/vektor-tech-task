import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  SxProps
} from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

type FormInputDropdownProps<T extends FieldValues, K extends string> = {
  name: Path<T>
  control: Control<T>
  label: string
  options: { value: K; label: string }[]
  getStylesForOption?: (option: { value: K; label: string }) => SxProps
} & FormControlProps

export const FormInputDropdown = <T extends FieldValues, K extends string>({
  name,
  control,
  label,
  options,
  required,
  getStylesForOption,
  ...props
}: FormInputDropdownProps<T, K>) => {
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
                  key={option.label}
                  value={option.value}
                  sx={{
                    textTransform: 'capitalize',
                    ...getStylesForOption?.(option)
                  }}
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
