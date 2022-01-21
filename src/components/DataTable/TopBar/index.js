import React from 'react'
import { PropTypes } from 'prop-types'
import { Box, Typography } from '@mui/material'
import { useClasses } from 'themes'
import style from './style'
import TableFilter from './TableFilter'
import TableSetting from './TableSetting'

const TopBar = ({
  title,
  columns,
  visibleColumns,
  onApplySetting,
  hideSetting,
  filters,
}) => {
  const classes = useClasses(style)

  return (
    <Box className={classes.root}>
      {title && <Typography variant="h3">{title}</Typography>}
      <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
        {filters && <TableFilter filters={filters} />}
        {!hideSetting && (
          <TableSetting
            columns={columns}
            visibleColumns={visibleColumns}
            onApplySetting={onApplySetting}
          />
        )}
      </Box>
    </Box>
  )
}

TopBar.defaultProps = {
  title: '',
  visibleColumns: [],
  columns: [],
  hideSetting: false,
}

TopBar.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  visibleColumns: PropTypes.array,
  onApplySettings: PropTypes.func,
  hideSetting: PropTypes.bool,
  filters: PropTypes.shape(),
}

export default TopBar
