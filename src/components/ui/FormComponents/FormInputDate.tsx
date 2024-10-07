import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions
} from 'react-hook-form'

type FormInputDateProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
} & DatePickerProps<Dayjs>

export const FormInputDate = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  ...props
}: FormInputDateProps<T>) => {
  dayjs
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <>
          <DatePicker
            label={label}
            value={dayjs(value)}
            onChange={(date) => onChange(dayjs(date).toString())}
            {...props}
          />
        </>
      )}
    />
  )
}
