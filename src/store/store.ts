import { configureStore } from '@reduxjs/toolkit'

import { draftsSlice } from './features/drafts-slice'

export const store = configureStore({
  reducer: {
    drafts: draftsSlice.reducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
