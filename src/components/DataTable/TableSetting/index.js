import React, { useState, useEffect, useRef } from 'react'

import {
  Box,
  Checkbox,
  FormControlLabel,
  Popover,
  Typography,
} from '@mui/material'
import { isEqual } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import useTableSetting from '~/components/DataTable/hooks/useTableSetting'
import { useClasses } from '~/themes'

import style from './style'

const TableSetting = ({
  columns: rawColumns,
  visibleColumns,
  setVisibleColumns,
  onSettingChange,
  tableSettingKey,
}) => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const tableSettingRef = useRef(null)

  const { getTableSetting, updateTableSetting } =
    useTableSetting(tableSettingKey)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onApplySetting = (cols = []) => {
    setVisibleColumns(cols)

    const tbSetting = getTableSetting() || []
    const newSetting = tbSetting.map((s) => {
      if (cols.includes(s?.field)) return { ...s, visible: true }
      return { ...s, visible: false }
    })

    updateTableSetting(newSetting)
  }

  useEffect(() => {
    const tbSetting = getTableSetting() || []

    let newVisibleColumns = []

    if (tbSetting.length) {
      newVisibleColumns = tbSetting.reduce((acc, cur) => {
        if (cur.visible) return [...acc, cur.field]
        return acc
      }, [])
    } else {
      newVisibleColumns = rawColumns.reduce((acc, cur) => {
        if (!cur.hide) return [...acc, cur.field]
        return acc
      }, [])
    }

    setVisibleColumns(newVisibleColumns)
  }, [rawColumns])

  useEffect(() => {
    if (!isEqual(visibleColumns, tableSettingRef?.current)) {
      onSettingChange(visibleColumns)
      tableSettingRef.current = visibleColumns
    }
  }, [visibleColumns])

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
                checked={visibleColumns.length === columns.length}
                indeterminate={
                  visibleColumns.length !== columns.length &&
                  visibleColumns.length >
                    columns.filter((col) => col.fixed).length
                }
                onChange={(e) => {
                  if (e.target.checked)
                    onApplySetting(columns.map((col) => col.field))
                  else
                    onApplySetting(
                      columns.reduce((acc, val) => {
                        if (val.fixed) return [...acc, val.field]
                        return acc
                      }, []),
                    )
                }}
              />
            }
            label={t('dataTable.showAllColumns')}
          />
          {columns.map((column, idx) => {
            return (
              <Box key={column.field || idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibleColumns.includes(column.field)}
                      onChange={(e) => {
                        if (e.target.checked)
                          onApplySetting([...visibleColumns, column.field])
                        else
                          onApplySetting(
                            visibleColumns.filter(
                              (col) => col !== column.field,
                            ),
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
                  label={column.headerName || ''}
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
  setVisibleColumns: () => {},
  onSettingChange: () => {},
  columns: [],
  visibleColumns: [],
}

TableSetting.propTypes = {
  columns: PropTypes.array,
  visibleColumns: PropTypes.array,
  setVisibleColumns: PropTypes.func,
  onSettingChange: PropTypes.func,
  tableSettingKey: PropTypes.string,
}

export default TableSetting
