import { Button, Stack, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/store'
import { decrement, increment } from '@/store/features/counterSlice'

export const App = () => {
  const count = useAppSelector((state) => state.counterState.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>Hello, Vite!</h1>
      <Typography variant="h5">The state is: {count}</Typography>
      <Stack spacing={2} direction="row" sx={{ width: '25.5rem' }}>
        <Button
          variant="contained"
          onClick={() => dispatch(increment())}
          sx={{
            flexGrow: 1
          }}
        >
          Increment!
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(decrement())}
          sx={{
            flexGrow: 1
          }}
        >
          Decrement!
        </Button>
      </Stack>
    </div>
  )
}
