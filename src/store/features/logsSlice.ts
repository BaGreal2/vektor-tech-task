import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getPersistData, persistData } from '@/helpers'
import { LogData } from '@/types'

interface LogsState {
  logs: LogData[]
}

const loadPersistState = (): LogsState => {
  let logs = []

  try {
    const serializedState = getPersistData('logs')
    if (serializedState) {
      logs = JSON.parse(serializedState)
    }
  } catch (error) {
    console.error('Failed to load state from localStorage', error)
  }

  return {
    logs
  }
}

const initialState: LogsState = loadPersistState()

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<LogData>) => {
      state.logs.push(action.payload)
      persistData('logs', state.logs)
    },
    updateLog: (state, action: PayloadAction<LogData>) => {
      const logIndex = state.logs.findIndex(
        (log) => log.id === action.payload.id
      )
      if (logIndex !== -1) {
        state.logs[logIndex] = action.payload
        persistData('logs', state.logs)
      } else {
        console.error(`Log with id ${action.payload.id} not found`)
      }
    },
    removeLog: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter((log) => log.id !== action.payload)
      persistData('logs', state.logs)
    }
  }
})

export const { addLog, updateLog, removeLog } = logsSlice.actions
