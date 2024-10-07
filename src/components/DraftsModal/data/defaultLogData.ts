import dayjs from 'dayjs'

import { LogData } from '@/types'

export const DEFAULT_LOG_DATA: LogData = {
  providerId: '',
  serviceOrder: '',
  truckId: '',
  startDate: dayjs().toString(),
  endDate: dayjs().add(1, 'day').toString(),
  type: 'planned',
  serviceDescription: ''
}
