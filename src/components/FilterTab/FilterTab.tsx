import { alpha, Box, Button, Typography } from '@mui/material'

import { filterToColor } from '@/data'
import { useAppDispatch, useAppSelector } from '@/store'
import { setTypeFilter } from '@/store/features/logsSlice'
import { Filter } from '@/types'

interface FilterTabProps {
  type: Filter
}

export const FilterTab = ({ type }: FilterTabProps) => {
  const dispatch = useAppDispatch()
  const activeType = useAppSelector((state) => state.logs.typeFilter)
  const tabColor = filterToColor[type]
  const isActive = activeType === type

  return (
    <Button
      sx={{
        minWidth: '6.25rem',
        height: '2.25rem',
        borderBottom: `0.25rem solid ${isActive ? '#1D43E1' : 'transparent'}`,
        color: isActive ? '#1D43E1' : '#656565',
        textTransform: 'uppercase',
        paddingX: '0.5rem'
      }}
      onClick={() => dispatch(setTypeFilter(type))}
    >
      {tabColor && (
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            p: '0.4rem',
            background: alpha(tabColor, 0.3),
            borderRadius: '100%',
            marginRight: '0.5rem'
          }}
        >
          <Box
            sx={{
              width: '0.5rem',
              height: '0.5rem',
              background: tabColor,
              borderRadius: '100%'
            }}
          />
        </Box>
      )}
      <Typography
        variant="button"
        sx={{
          textAlign: 'center'
        }}
      >
        {type}
      </Typography>
    </Button>
  )
}
