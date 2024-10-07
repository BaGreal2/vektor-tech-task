import { useEffect, useRef, useState } from 'react'
import { Box, Button, debounce, Stack } from '@mui/material'
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

import { LogFormContent } from '../LogFormContent'
import { DraftsTabs } from './components'

export const DraftsModal = () => {
  const { isOpen, drafts, activeDraftId } = useAppSelector(
    (state) => state.drafts
  )
  const { logs, searchQuery, typeFilter } = useAppSelector(
    (state) => state.logs
  )
  const dispatch = useAppDispatch()

  const { id: persistId, ...persistLogData } = JSON.parse(
    getPersistData('drafts') ?? '[]'
  ).find((draft: Draft) => draft.id === activeDraftId) ?? {
    id: '',
    ...DEFAULT_LOG_DATA
  }

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
      console.log(watchAllFields)
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
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        width: '100vw',
        height: '100vh',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease-in-out',
        borderRadius: 0
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 10,
          top: 0,
          right: 0,
          width: '90%',
          height: '100%',
          background: 'white',
          transform: isOpen ? undefined : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          padding: '1rem'
        }}
      >
        <DraftsTabs currentDraftData={watchAllFields} />
        <LogFormContent
          control={control}
          onSubmit={onSubmit}
          submitLabel="Create Log"
          isDataPersisted={isDataPersisted}
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
            Close All Draft
          </Button>
        </Stack>
      </Box>

      <Button
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)'
        }}
        onClick={() => dispatch(closeDrafts())}
      />
    </Box>
  )
}
