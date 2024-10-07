import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { DEFAULT_LOG_DATA } from '@/data'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  closeEdit,
  requestSearch,
  setTypeFilter,
  updateLog
} from '@/store/features/logsSlice'
import { LogFormData } from '@/types'

import { LogFormContent } from '../LogFormContent'
import { SlideModal } from '../SlideModal'
import { extractLogFormDataFromLogData } from './helpers'

export const LogEditModal = () => {
  const { logs, isEditOpen, editLogId, searchQuery, typeFilter } =
    useAppSelector((state) => state.logs)
  const dispatch = useAppDispatch()

  const logData = extractLogFormDataFromLogData(
    logs.find((log) => log.id === editLogId)
  )

  const { control, reset } = useForm<LogFormData>({
    defaultValues: logData
  })

  useEffect(() => {
    const { id, ...logData } = logs.find((log) => log.id === editLogId) ?? {
      id: 0,
      ...DEFAULT_LOG_DATA
    }

    reset(logData)
  }, [editLogId, logs, reset])

  const onSubmit = (data: LogFormData) => {
    if (editLogId === undefined) {
      return
    }
    dispatch(updateLog({ id: editLogId, ...data }))
    dispatch(requestSearch(searchQuery))
    dispatch(setTypeFilter(typeFilter))

    reset(DEFAULT_LOG_DATA)
    dispatch(closeEdit())
  }
  return (
    <SlideModal isOpen={isEditOpen} onClose={() => dispatch(closeEdit())}>
      <Typography variant="h3" marginBottom="1.25rem">
        Editing a log
      </Typography>
      <LogFormContent
        control={control}
        onSubmit={onSubmit}
        submitLabel="Update Log"
      />
    </SlideModal>
  )
}
