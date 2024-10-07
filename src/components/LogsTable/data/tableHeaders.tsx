import { Delete, Edit } from '@mui/icons-material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'

import { removeLog } from '@/store/features/logsSlice'
import { LogData } from '@/types'

export const tableHeaders: GridColDef<LogData>[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70
  },
  {
    field: 'providerId',
    headerName: 'PROVIDER',
    width: 150
  },
  {
    field: 'serviceOrder',
    headerName: 'SERVICE ORDER',
    width: 100
  },
  {
    field: 'truckId',
    headerName: 'TRUCK ID',
    width: 100
  },
  {
    field: 'odometer',
    headerName: 'ODOMETER',
    width: 100,
    valueGetter: (_, row) => {
      return row.odometer ? `${row.odometer} mi` : '-'
    }
  },
  {
    field: 'engineHours',
    headerName: 'ENGINE HOURS',
    width: 100,
    valueGetter: (_, row) => {
      return row.odometer ? row.odometer : '-'
    }
  },
  {
    field: 'startDate',
    headerName: 'START DATE',
    width: 140,
    type: 'date',
    valueGetter: (_, row) => {
      return new Date(row.startDate)
    }
  },
  {
    field: 'endDate',
    headerName: 'END DATE',
    width: 140,
    type: 'date',
    valueGetter: (_, row) => {
      return new Date(row.endDate)
    }
  },
  {
    field: 'type',
    headerName: 'TYPE',
    width: 100
  },
  {
    field: 'serviceDescription',
    headerName: 'SERVICE DESCRIPTION',
    width: 200
  },
  {
    field: 'actions',
    type: 'actions',
    getActions: (params) => {
      const dispatch = useDispatch()

      return [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit Row"
          onClick={() => console.log('edit', params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => dispatch(removeLog(params.row.id))}
        />
      ]
    }
  }
]
