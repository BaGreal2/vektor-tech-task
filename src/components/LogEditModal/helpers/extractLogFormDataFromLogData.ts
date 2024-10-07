import { DEFAULT_LOG_DATA } from '@/data'
import { LogData, LogFormData } from '@/types'

export const extractLogFormDataFromLogData = (
  logData?: LogData
): LogFormData => {
  if (!logData) {
    return DEFAULT_LOG_DATA
  }

  return {
    providerId: logData.providerId,
    serviceOrder: logData.serviceOrder,
    truckId: logData.truckId,
    odometer: logData.odometer,
    engineHours: logData.engineHours,
    startDate: logData.startDate,
    endDate: logData.endDate,
    type: logData.type,
    serviceDescription: logData.serviceDescription
  }
}
