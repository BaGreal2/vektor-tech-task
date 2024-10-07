import { Delete, Edit } from '@mui/icons-material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'

import { LogTypeBadge } from '@/components/ui/LogTypeBadge'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  openEdit,
  removeLog,
  requestSearch,
  setTypeFilter
} from '@/store/features/logsSlice'
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
    renderCell: ({ value }) => <LogTypeBadge type={value} />,
    width: 130
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
      const { searchQuery, typeFilter } = useAppSelector((state) => state.logs)
      const dispatch = useAppDispatch()

      return [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit Row"
          onClick={() => dispatch(openEdit(params.row.id))}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            dispatch(removeLog(params.row.id))
            dispatch(requestSearch(searchQuery))
            dispatch(setTypeFilter(typeFilter))
          }}
        />
      ]
    }
  }
]
