import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getPersistData, persistData } from '@/helpers'
import { Draft } from '@/types'

interface DraftState {
  isDraftsOpen: boolean
  activeDraftId?: string
  drafts: Draft[]
}

const loadPersistState = (): DraftState => {
  const drafts = getPersistData<Draft[]>('drafts') ?? []

  return {
    isDraftsOpen: false,
    drafts
  }
}

const initialState: DraftState = loadPersistState()

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    addDraft: (state, action: PayloadAction<Draft>) => {
      state.drafts.push(action.payload)
      persistData('drafts', state.drafts)
    },
    setActiveDraft: (state, action: PayloadAction<string | undefined>) => {
      state.activeDraftId = action.payload
    },
    updateDraft: (state, action: PayloadAction<Draft>) => {
      const draftIndex = state.drafts.findIndex(
        (draft) => draft.id === action.payload.id
      )
      if (draftIndex !== -1) {
        state.drafts[draftIndex] = action.payload
        persistData('drafts', state.drafts)
      } else {
        console.error(`Draft with id ${action.payload.id} not found`)
      }
    },
    removeDraft: (state, action: PayloadAction<string>) => {
      state.drafts = state.drafts.filter((draft) => draft.id !== action.payload)
      state.activeDraftId =
        state.drafts.length > 0
          ? state.drafts[state.drafts.length - 1].id
          : undefined
      persistData('drafts', state.drafts)
    },
    clearDrafts: (state) => {
      state.drafts = []
      state.activeDraftId = undefined
      persistData('drafts', state.drafts)
    },
    openDrafts: (state) => {
      state.isDraftsOpen = true
    },
    closeDrafts: (state) => {
      state.isDraftsOpen = false
    }
  }
})

export const {
  addDraft,
  setActiveDraft,
  updateDraft,
  removeDraft,
  openDrafts,
  clearDrafts,
  closeDrafts
} = draftsSlice.actions
