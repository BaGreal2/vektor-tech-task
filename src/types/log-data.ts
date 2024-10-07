import { LogType } from './log-types'

export interface LogData {
  providerId: string
  serviceOrder: string
  truckId: string
  odometer?: number
  engineHours?: number
  startDate: string
  endDate: string
  type: LogType
  serviceDescription: string
}
