import React, { useState, useEffect } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import { isArray, isUndefined, findIndex } from 'lodash'
import PropTypes from 'prop-types'

const Tabs = ({ list, children, sx, onChange, value: externalValue }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (isUndefined(externalValue)) return

    const idx = isUndefined(list[0]?.value)
      ? externalValue
      : findIndex(list, (item) => item.value === externalValue)

    if (idx !== value) {
      setValue(idx)
    }
  }, [externalValue, list])

  const getLable = (item) => {
    const lable = item?.lable ?? item
    const isRequired = item?.required

    return (
      <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
        {lable}
        {isRequired && (
          <Typography color="error" component="span" ml="3px">
            *
          </Typography>
        )}
      </Box>
    )
  }
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <MuiTabs
          value={value ?? 0}
          onChange={(_, newValue) => {
            setValue(newValue)
            onChange(list?.[newValue]?.value ?? newValue)
          }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {list.map((item, index) => {
            return <Tab key={`Tab-${index}`} label={getLable(item)} wrapped />
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
  list: [],
  children: null,
  sx: {},
  onChange: () => {},
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.shape(), PropTypes.string]),
  ).isRequired,
  sx: PropTypes.shape(),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Tabs
