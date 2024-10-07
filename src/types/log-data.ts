import { LogType } from './log-types'

export interface LogData {
  providerId: string
  serviceOrder: string
  truckId: string
  odometer: number | null
  engineHours: number | null
  startDate: string
  endDate: string
  type: LogType
  serviceDescription: string
}
