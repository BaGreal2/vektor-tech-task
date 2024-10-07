import { Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { useAppSelector } from '@/store'

import { tableHeaders } from './data'

export const LogsTable = () => {
  const { filteredLogs } = useAppSelector((state) => state.logs)

  return (
    <Paper
      sx={{
        height: '25.5rem',
        width: '100%'
      }}
    >
      <DataGrid rows={filteredLogs} columns={tableHeaders} />
    </Paper>
  )
}
