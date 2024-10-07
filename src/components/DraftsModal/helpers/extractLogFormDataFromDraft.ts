import { DEFAULT_LOG_DATA } from '@/data'
import { Draft, LogFormData } from '@/types'

export const extractLogFormDataFromDraft = (draft?: Draft): LogFormData => {
  if (!draft) {
    return DEFAULT_LOG_DATA
  }

  return {
    providerId: draft.providerId,
    serviceOrder: draft.serviceOrder,
    truckId: draft.truckId,
    odometer: draft.odometer,
    engineHours: draft.engineHours,
    startDate: draft.startDate,
    endDate: draft.endDate,
    type: draft.type,
    serviceDescription: draft.serviceDescription
  }
}
