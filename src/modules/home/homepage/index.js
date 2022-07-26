import React from 'react'

import Box from '@mui/material/Box'

import CommingSoonImage from '~/assets/images/sample/coming-soon.jpeg'

const HomePage = () => {
  return (
    <Box sx={{ textAlign: 'center', img: { maxWidth: '100%' } }}>
      <img src={CommingSoonImage} alt="" />
    </Box>
  )
}

export default HomePage
