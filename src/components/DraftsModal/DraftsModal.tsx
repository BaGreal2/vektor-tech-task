import { useEffect, useRef, useState } from 'react'
import { Add } from '@mui/icons-material'
import { Box, Button, debounce, Stack, Typography } from '@mui/material'
import { nanoid } from 'nanoid'
import { useForm } from 'react-hook-form'

import { DEFAULT_LOG_DATA } from '@/data'
import { getPersistData } from '@/helpers'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  addDraft,
  closeDrafts,
  removeDraft,
  setActiveDraft,
  updateDraft
} from '@/store/features/draftsSlice'
import { addLog } from '@/store/features/logsSlice'
import { Draft, LogFormData } from '@/types'

import {
  EquipmentInputSection,
  ProviderDetailsInputSection,
  ServiceDetailsInputSection
} from './components'

export const DraftsModal = () => {
  const { isOpen, drafts, activeDraftId } = useAppSelector(
    (state) => state.drafts
  )
  const dispatch = useAppDispatch()

  const { id: persistId, ...persistLogData } = JSON.parse(
    getPersistData('drafts') ?? '[]'
  ).find((draft: Draft) => draft.id === activeDraftId) ?? {
    id: '',
    ...DEFAULT_LOG_DATA
  }

  const { handleSubmit, watch, control, reset } = useForm<LogFormData>({
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
    dispatch(addLog({ id: nanoid(), ...data }))

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
        <Stack
          direction="row"
          justifyContent="flex-start"
          height="2.5rem"
          marginBottom="1rem"
        >
          {drafts.map((draft) => (
            <Button
              key={draft.id}
              sx={{
                height: '100%',
                background: activeDraftId === draft.id ? 'white' : '#F3F4F6'
              }}
              onClick={() => dispatch(setActiveDraft(draft.id))}
            >
              New Draft
            </Button>
          ))}
          <Button
            sx={{
              height: '100%'
            }}
            onClick={() => {
              if (activeDraftId) {
                dispatch(updateDraft({ ...watchAllFields, id: activeDraftId }))
              }
              const newId = nanoid()
              dispatch(addDraft({ ...DEFAULT_LOG_DATA, id: newId }))
              dispatch(setActiveDraft(newId))
            }}
          >
            <Add />
          </Button>
        </Stack>
        <Stack
          spacing="1.5rem"
          sx={{
            width: '40rem'
          }}
        >
          <ProviderDetailsInputSection control={control} />
          <EquipmentInputSection control={control} />
          <ServiceDetailsInputSection control={control} />

          <Typography
            variant="h6"
            color={isDataPersisted ? '#1d43e1' : 'black'}
          >
            {isDataPersisted ? 'Saved Draft' : 'Saving Draft...'}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
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
