import React from 'react'

import { Box, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'

const NotFoundPage = () => {
  const history = useHistory()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        pt: '10%',
      }}
    >
      <Typography sx={{ fontSize: 60, fontWeight: 'bold' }}>Oops!</Typography>
      <Typography sx={{ fontSize: 20 }}>404 - Page Not Found</Typography>
      <Button onClick={() => history.push('/')} sx={{ mt: 3 }}>
        Back to Home
      </Button>
    </Box>
  )
}

export default NotFoundPage
