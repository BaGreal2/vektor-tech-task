import { createSlice } from '@reduxjs/toolkit'

interface DraftState {
  isOpen: boolean
}

const initialState: DraftState = {
  isOpen: false
}

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    openDrafts: (state) => {
      state.isOpen = true
    },
    closeDrafts: (state) => {
      state.isOpen = false
    }
  }
})

export const { openDrafts, closeDrafts } = draftsSlice.actions
