import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

/**
 *
 * @param {object} props
 * @param {boolean} props.open Loading overlay is active?
 * @returns {*}
 */
const Loading = ({ open }) => {
  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 10 }}>
      <CircularProgress color="primary" />
    </Backdrop>
  )
}

export default Loading
