import { LogType } from './logTypes'

export interface LogFormData {
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
