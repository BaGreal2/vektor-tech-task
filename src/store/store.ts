import { configureStore } from '@reduxjs/toolkit'

import { draftsSlice } from './features/draftsSlice'
import { logsSlice } from './features/logsSlice'

export const store = configureStore({
  reducer: {
    drafts: draftsSlice.reducer,
    logs: logsSlice.reducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
