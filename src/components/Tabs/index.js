import React, { useState, useEffect } from 'react'

import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import { useTheme } from '@mui/material/styles'
import { isArray, isUndefined, findIndex } from 'lodash'
import PropTypes from 'prop-types'

const Tabs = ({ list, children, sx, onChange, value: externalValue }) => {
  const [value, setValue] = useState(0)
  const theme = useTheme()

  useEffect(() => {
    if (isUndefined(externalValue)) return

    const idx = isUndefined(list[0]?.value)
      ? externalValue
      : findIndex(list, (item) => item.value === externalValue)

    if (idx !== value) {
      setValue(idx)
    }
  }, [externalValue, list])

  const getLabel = (item) => {
    const label = item?.label ?? item
    const isRequired = item?.required

    return (
      <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
        {label}
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
      <Box sx={{ borderBottom: 2, borderColor: 'divider', mb: 3 }}>
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
            return (
              <Tab
                key={`Tab-${index}`}
                label={getLabel(item)}
                wrapped
                {...(item.error
                  ? {
                      icon: (
                        <WarningAmberRoundedIcon
                          fontSize="small"
                          sx={{
                            mr: '4px !important',
                            color: `${theme.palette.error.main}`,
                          }}
                        />
                      ),
                      iconPosition: 'start',
                      sx: {
                        minHeight: '48px',
                      },
                    }
                  : {})}
              />
            )
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
