import React from 'react'

import { Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'

import { useClasses } from '~/themes'

import TableFilter from '../TableFilter'
import TableSetting from '../TableSetting'
import style from './style'

const TopBar = ({
  beforeTopbar,
  afterTopbar,
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
        {beforeTopbar}
        {filters && <TableFilter filters={filters} />}
        {!hideSetting && (
          <TableSetting
            columns={columns}
            visibleColumns={visibleColumns}
            onApplySetting={onApplySetting}
          />
        )}
        {afterTopbar}
      </Box>
    </Box>
  )
}

TopBar.defaultProps = {
  beforeTopbar: null,
  afterTopbar: null,
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
  beforeTopbar: PropTypes.node,
  afterTopbar: PropTypes.node,
}

export default TopBar
