import dayjs from 'dayjs'

import { LogFormData } from '@/types'

export const DEFAULT_LOG_DATA: LogFormData = {
  providerId: '',
  serviceOrder: '',
  truckId: '',
  startDate: dayjs().toString(),
  endDate: dayjs().add(1, 'day').toString(),
  type: 'planned',
  serviceDescription: ''
}
