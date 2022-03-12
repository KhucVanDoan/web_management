import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import { isArray } from 'lodash'
import PropTypes from 'prop-types'

const Tabs = ({ labels, children, sx }) => {
  const [value, setValue] = useState(0)

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <MuiTabs
          value={value || 0}
          onChange={(_, newValue) => setValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {labels.map((label, index) => {
            return <Tab key={`Tab-${index}`} label={label} />
          })}
        </MuiTabs>
      </Box>

      {isArray(children)
        ? children.map((child, index) => {
            if (value !== index) return <Box key={`TabPanel-${index}`} />

            return <Box key={`TabPanel-${index}`}>{child}</Box>
          })
        : children}
    </Box>
  )
}

Tabs.defaultProps = {
  labels: [],
  children: null,
  sx: {},
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  labels: PropTypes.arrayOf(PropTypes.node).isRequired,
  sx: PropTypes.shape(),
}

export default Tabs
