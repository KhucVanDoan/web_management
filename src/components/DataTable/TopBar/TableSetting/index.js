import React, { useState } from 'react'

import {
  Box,
  Checkbox,
  FormControlLabel,
  Popover,
  Typography,
} from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import useTableSetting from '~/components/DataTable/hooks/useTableSetting'
import { useClasses } from '~/themes'

import style from './style'

const TableSetting = ({
  columns: rawColumns,
  visibleColumns,
  onApplySetting,
}) => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const { updateTableSetting } = useTableSetting()
  const [anchorEl, setAnchorEl] = useState(null)
  const [showColumns, setShowColumns] = useState(visibleColumns)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUpdateColumns = (newCols) => {
    setShowColumns(newCols)
    updateTableSetting(newCols)
    onApplySetting(newCols)
  }

  const open = Boolean(anchorEl)
  const columns = rawColumns.filter((col) => !col.hide)
  return (
    <Box className={classes.root}>
      <Button icon="tableSetting" color="grayEE" onClick={handleClick} />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          variant: 'caret',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box className={classes.formContainer}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {t('dataTable.visibleColumns')}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={showColumns.length === columns.length}
                indeterminate={
                  showColumns.length !== columns.length &&
                  showColumns.length > columns.filter((col) => col.fixed).length
                }
                onChange={(e) => {
                  if (e.target.checked)
                    handleUpdateColumns(columns.map((col) => col.field))
                  else
                    handleUpdateColumns(
                      columns.reduce((acc, val) => {
                        if (val.fixed) return [...acc, val.field]
                        return acc
                      }, []),
                    )
                }}
              />
            }
            label="Tất cả"
          />
          {columns.map((column) => {
            return (
              <Box key={column.field}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showColumns.includes(column.field)}
                      onChange={(e) => {
                        if (e.target.checked)
                          handleUpdateColumns([...showColumns, column.field])
                        else
                          handleUpdateColumns(
                            showColumns.filter((col) => col !== column.field),
                          )
                      }}
                      {...(column.fixed
                        ? {
                            disabled: true,
                            checked: true,
                          }
                        : {})}
                    />
                  }
                  label={column.headerName}
                />
              </Box>
            )
          })}
        </Box>
      </Popover>
    </Box>
  )
}

TableSetting.defaultProps = {
  onApplySetting: () => {},
  columns: [],
  visibleColumns: [],
}

TableSetting.propTypes = {
  onApplySetting: PropTypes.func,
  columns: PropTypes.array,
  visibleColumns: PropTypes.array,
}

export default TableSetting
