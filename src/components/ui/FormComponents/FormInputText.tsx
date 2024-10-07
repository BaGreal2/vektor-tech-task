import TextField, { TextFieldProps } from '@mui/material/TextField'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions
} from 'react-hook-form'

type FormInputTextProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
} & TextFieldProps

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  rules,
  ...props
}: FormInputTextProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ ...rules, required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          required={required}
          fullWidth
          {...props}
        />
      )}
    />
  )
}
