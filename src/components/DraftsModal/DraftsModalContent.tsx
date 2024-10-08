import { useEffect, useRef, useState } from 'react'
import { Button, debounce, Stack } from '@mui/material'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'

import { DEFAULT_LOG_DATA } from '@/data'
import { getPersistData } from '@/helpers'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  clearDrafts,
  closeDrafts,
  removeDraft,
  updateDraft
} from '@/store/features/draftsSlice'
import {
  addLog,
  requestSearch,
  setTypeFilter
} from '@/store/features/logsSlice'
import { Draft, LogFormData } from '@/types'

import { LogForm } from '../LogForm'
import { DraftsTabs } from './components'
import { extractLogFormDataFromDraft } from './helpers'

export const DraftsModalContent = () => {
  const { drafts, activeDraftId } = useAppSelector((state) => state.drafts)
  const { logs, searchQuery, typeFilter } = useAppSelector(
    (state) => state.logs
  )
  const dispatch = useAppDispatch()

  const persistDrafts = getPersistData<Draft[]>('drafts') ?? []
  const persistLogData = extractLogFormDataFromDraft(
    persistDrafts.find((draft: Draft) => draft.id === activeDraftId)
  )

  const { watch, control, reset } = useForm<LogFormData>({
    defaultValues: persistLogData
  })
  const [isDataPersisted, setIsDataPersisted] = useState(false)

  const watchAllFields = watch()
  const prevDataRef = useRef(watchAllFields)

  const persistFormData = debounce((data) => {
    if (!activeDraftId) {
      return
    }
    dispatch(updateDraft({ ...data, id: activeDraftId }))
    setIsDataPersisted(true)
  }, 1000)

  useEffect(() => {
    if (
      JSON.stringify(prevDataRef.current) !== JSON.stringify(watchAllFields)
    ) {
      setIsDataPersisted(false)
      persistFormData(watchAllFields)

      prevDataRef.current = watchAllFields
    }
  }, [watchAllFields])

  const prevActiveDraftIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (prevActiveDraftIdRef.current !== activeDraftId) {
      const { id, ...logData } = drafts.find(
        (draft) => draft.id === activeDraftId
      ) ?? { id: nanoid(), ...DEFAULT_LOG_DATA }

      reset(logData)
      setIsDataPersisted(false)

      prevActiveDraftIdRef.current = activeDraftId ?? null
    }
  }, [activeDraftId, drafts, reset])

  const onSubmit = (data: LogFormData) => {
    console.log(data)
    dispatch(addLog({ id: logs.length, ...data }))
    dispatch(requestSearch(searchQuery))
    dispatch(setTypeFilter(typeFilter))

    if (activeDraftId) {
      dispatch(removeDraft(activeDraftId))
    }
    reset(DEFAULT_LOG_DATA)
    dispatch(closeDrafts())
  }

  return (
    <>
      <DraftsTabs currentDraftData={watchAllFields} />
      <LogForm
        control={control}
        onSubmit={onSubmit}
        submitLabel="Create Log"
        isDataPersisted={isDataPersisted}
        indicateDataPersisted
      />
      <Stack direction="row" gap="1rem" width="40rem">
        <Button
          variant="contained"
          sx={{
            flexGrow: 1,
            marginTop: '1rem',
            background: '#1D43E1'
          }}
          onClick={() => {
            if (activeDraftId) {
              dispatch(removeDraft(activeDraftId))
            }

            if (drafts.length <= 1) {
              dispatch(closeDrafts())
            }

            reset(DEFAULT_LOG_DATA)
          }}
        >
          Delete Draft
        </Button>
        <Button
          variant="contained"
          sx={{
            flexGrow: 1,
            marginTop: '1rem',
            background: '#1D43E1'
          }}
          onClick={() => {
            dispatch(clearDrafts())
            dispatch(closeDrafts())
          }}
        >
          Clear All Draft
        </Button>
      </Stack>
    </>
  )
}
