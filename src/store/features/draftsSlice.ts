import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getPersistData, persistData } from '@/helpers'
import { Draft } from '@/types'

interface DraftState {
  isOpen: boolean
  activeDraftId?: string
  drafts: Draft[]
}

const loadPersistState = (): DraftState => {
  let drafts = []

  try {
    const serializedState = getPersistData('drafts')
    if (serializedState) {
      drafts = JSON.parse(serializedState)
    }
  } catch (error) {
    console.error('Failed to load state from localStorage', error)
  }

  return {
    isOpen: false,
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
    setActiveDraft: (state, action: PayloadAction<string>) => {
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
      persistData('drafts', state.drafts)
    },
    openDrafts: (state) => {
      state.isOpen = true
    },
    closeDrafts: (state) => {
      state.isOpen = false
    }
  }
})

export const {
  addDraft,
  setActiveDraft,
  updateDraft,
  removeDraft,
  openDrafts,
  closeDrafts
} = draftsSlice.actions
