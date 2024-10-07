import { alpha, Box, Stack, Typography } from '@mui/material'

import { filterToColor } from '@/data'
import { LogType } from '@/types'

interface LogTypeBadgeProps {
  type: LogType
}

export const LogTypeBadge = ({ type }: LogTypeBadgeProps) => {
  const color = filterToColor[type] ?? 'black'
  return (
    <Stack
      direction="row"
      paddingX="0.5rem"
      paddingY="0.125rem"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="0.25rem"
      sx={{
        background: alpha(color, 0.2)
      }}
    >
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          p: '0.2rem',
          background: alpha(color, 0.3),
          borderRadius: '100%',
          marginRight: '0.5rem'
        }}
      >
        <Box
          sx={{
            width: '0.25rem',
            height: '0.25rem',
            background: color,
            borderRadius: '100%'
          }}
        />
      </Box>
      <Typography
        variant="caption"
        marginTop="0.125rem"
        color={color}
        textTransform="capitalize"
      >
        {type}
      </Typography>
    </Stack>
  )
}
