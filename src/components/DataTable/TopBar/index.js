import React from 'react'

import { Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'

import { useClasses } from '~/themes'

import BulkActions from '../BulkActions'
import TableFilter from '../TableFilter'
import TableSetting from '../TableSetting'
import style from './style'

const TopBar = ({
  beforeTopbar,
  afterTopbar,
  title,
  columns,
  visibleColumns,
  hideSetting,
  filters,
  bulkActions,
  selected,
  uniqKey,
  tableSettingKey,
  setVisibleColumns,
  onSettingChange,
}) => {
  const classes = useClasses(style)

  return (
    <Box className={classes.root}>
      {title && <Typography variant="h3">{title}</Typography>}
      <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
        {beforeTopbar}
        {bulkActions && selected?.length > 0 && (
          <BulkActions
            bulkActions={bulkActions}
            selected={selected}
            uniqKey={uniqKey}
          />
        )}
        {filters && <TableFilter filters={filters} />}
        {!hideSetting && (
          <TableSetting
            columns={columns}
            visibleColumns={visibleColumns}
            tableSettingKey={tableSettingKey}
            setVisibleColumns={setVisibleColumns}
            onSettingChange={onSettingChange}
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
  bulkActions: PropTypes.shape(),
  beforeTopbar: PropTypes.node,
  afterTopbar: PropTypes.node,
  selected: PropTypes.array,
  tableSettingKey: PropTypes.string,
  setVisibleColumns: PropTypes.func,
  onSettingChange: PropTypes.func,
}

export default TopBar
