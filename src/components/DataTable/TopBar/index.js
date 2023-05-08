import React from 'react'

import { Box, Typography } from '@mui/material'

import { useTable } from '~/common/hooks/useTable'
import { useClasses } from '~/themes'

import BulkActions from '../BulkActions'
import TableFilter from '../TableFilter'
import TableSetting from '../TableSetting'
import style from './style'

const TopBar = () => {
  const classes = useClasses(style)
  const {
    beforeTopbar,
    afterTopbar,
    title,
    hideSetting,
    filters,
    bulkActions,
    selected,
  } = useTable()

  if (
    !title &&
    !filters &&
    hideSetting &&
    !beforeTopbar &&
    !afterTopbar &&
    (!bulkActions || !selected?.length)
  )
    return null

  return (
    <Box className={classes.root}>
      {title && <Typography variant="h3">{title}</Typography>}
      <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
        {beforeTopbar}
        {bulkActions && selected?.length > 0 && <BulkActions />}
        {filters && <TableFilter />}
        {!hideSetting && <TableSetting />}
        {afterTopbar}
      </Box>
    </Box>
  )
}

export default TopBar
