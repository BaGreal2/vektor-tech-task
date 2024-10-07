import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getPersistData, persistData } from '@/helpers'
import { Filter, LogData } from '@/types'

interface LogsState {
  searchQuery: string
  typeFilter: Filter
  logs: LogData[]
  filteredLogs: LogData[]
  editLogId?: number
  isEditOpen: boolean
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
    searchQuery: '',
    typeFilter: 'all',
    logs,
    filteredLogs: logs,
    editLogId: undefined,
    isEditOpen: false
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
    requestSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload

      if (action.payload === '') {
        state.filteredLogs = state.logs
        return
      }
      const filteredRows = state.logs.filter((row) => {
        return (
          row.id
            .toString()
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          row.providerId.toLowerCase().includes(action.payload.toLowerCase()) ||
          row.serviceOrder
            .toLowerCase()
            .includes(action.payload.toLowerCase()) ||
          row.truckId.toLowerCase().includes(action.payload.toLowerCase()) ||
          row.type.toLowerCase().includes(action.payload.toLowerCase()) ||
          row.serviceDescription
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        )
      })
      state.filteredLogs = filteredRows
    },
    setTypeFilter: (state, action: PayloadAction<Filter>) => {
      state.typeFilter = action.payload

      if (action.payload === 'all') {
        state.filteredLogs = state.logs
        return
      }
      const filteredRows = state.logs.filter(
        (row) => row.type === action.payload
      )
      state.filteredLogs = filteredRows
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
    removeLog: (state, action: PayloadAction<number>) => {
      state.logs = state.logs.filter((log) => log.id !== action.payload)
      persistData('logs', state.logs)
    },
    openEdit: (state, action: PayloadAction<number>) => {
      state.editLogId = action.payload
      state.isEditOpen = true
    },
    closeEdit: (state) => {
      state.isEditOpen = false
    }
  }
})

export const {
  requestSearch,
  setTypeFilter,
  addLog,
  updateLog,
  removeLog,
  openEdit,
  closeEdit
} = logsSlice.actions
