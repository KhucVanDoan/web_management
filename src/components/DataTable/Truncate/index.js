import React from 'react'

import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import TruncateMarkup from 'react-truncate-markup'

const Truncate = ({ classes, value }) => {
  if (typeof value !== 'string') return value ?? null

  return (
    <TruncateMarkup
      lines={2}
      ellipsis={(rootEl) => (
        <Box
          title={rootEl.props.original}
          component="span"
          sx={{
            display: 'inline-block',
            '>span': {
              display: 'inline !important',
            },
          }}
        >
          {rootEl.props.children}...
        </Box>
      )}
    >
      <div className={classes.truncateCell} original={value}>
        <span className={classes.originText}>{value}</span>
      </div>
    </TruncateMarkup>
  )
}

Truncate.defaultProps = {}

Truncate.propsTypes = {
  classes: PropTypes.shape(),
  value: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}

export default Truncate
