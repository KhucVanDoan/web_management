import React from 'react'

import { Tooltip } from '@mui/material'
import IconButtonHover from '@mui/material/IconButton'
import { PropTypes } from 'prop-types'

const IconButton = ({ title, onClick, children }) => {
  return (
    <Tooltip title={<div style={{ fontSize: '14px' }}>{title}</div>}>
      <IconButtonHover onClick={onClick}>{children}</IconButtonHover>
    </Tooltip>
  )
}
IconButton.defaultProps = {
  title: '',
  onClick: null,
}

IconButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default IconButton
