/* eslint-disable */
import React, { useState, useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Checkbox } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { useTable } from '~/common/hooks/useTable'
import Pagination from '~/components/DataTable/Pagination'
import TableHead from '~/components/DataTable/TableHead'
import TopBar from '~/components/DataTable/TopBar'
import { TableProvider } from '~/contexts/TableContext'
import { useClasses } from '~/themes'

import Truncate from '../DataTable/Truncate'
import style from './style'

const DataTableCollapse = (props) => {
  const { t } = useTranslation()
  const classes = useClasses(style)

  const {
    visibleColumns,
    height,
    subColumns,
    subDataKey,
    isRoot,
    rows,
    page,
    pageSize,
    enableResizable,
    handleGetData,
    uniqKey,
    containerRef,
    onSortChange: _onSortChange,
    onSelectionChange,
    selected = [],
    checkboxSelection,
  } = useTable()

  const [open, setOpen] = useState({})
  const [sort, setSort] = useState(null)
  const expandIconVisible = handleGetData === 'function'

  const onOpen = (index, e, row) => {
    if (typeof handleGetData === 'function') {
      handleGetData(row?.id, row)
    }

    setOpen({
      ...open,
      [index]: e,
    })
  }

  /**
   * Handle select or deselect row
   * @param {*} indexValue
   * @returns
   */
  const handleSelectOrDeselectRow = (indexValue) => {
    if (!checkboxSelection) return
    const selectedIndex = selected.findIndex(
      (item) => item[uniqKey] === indexValue,
    )
    let newSelected = []

    const newValueData = rows.find((item) => item[uniqKey] === indexValue)

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, newValueData)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    onSelectionChange(newSelected)
  }

  /**
   * Check if row is selected
   * @param {*} uniqKeyValue
   * @returns
   */
  const isSelected = (uniqKeyValue) => {
    return selected.findIndex((item) => item[uniqKey] === uniqKeyValue) !== -1
  }

  useEffect(() => {
    setOpen({})
  }, [page, pageSize, sort])

  /**
   * Handle change order
   * @param {*} param
   */
  const onSortChange = (newSort) => {
    if (typeof _onSortChange === 'function') {
      setSort(newSort)
      _onSortChange(newSort)
    }
  }

  const renderCellValue = (cellValue, row) => {
    if (!row) {
      return null
    } else {
      return <Truncate value={cellValue} classes={classes} />
    }
  }

  const renderCheckboxPlaceholder = () => {
    if (checkboxSelection)
      return (
        <TableCell
          className={clsx(classes.tableCell, classes.tableCellCheckbox)}
          sx={(theme) => ({
            position: 'sticky !important',
            left: 0,
            zIndex: 10,
            borderLeft: 'none !important',
            borderRight: `1px solid ${theme.palette.grayE4.main} !important`,
            '&+td': {
              borderLeft: 'none! important',
            },
          })}
        ></TableCell>
      )

    return null
  }

  return (
    <>
      <TopBar />

      <TableContainer
        className={classes.tableContainer}
        style={{ height: height ? height : '100%' }}
        {...(isRoot ? { ref: containerRef } : {})}
      >
        <Table
          stickyHeader
          className={classes.table}
          sx={enableResizable ? { tableLayout: 'fixed', width: '100%' } : {}}
        >
          <TableHead onSortChange={onSortChange} />
          <TableBody>
            {rows &&
              rows?.length > 0 &&
              rows?.map((row, index) => {
                if (!row) return
                const expandable = row?.[subDataKey]?.length > 0
                const isItemSelected = isSelected(row[uniqKey])
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <React.Fragment>
                    <TableRow
                      tabIndex={-1}
                      key={row[uniqKey] || index}
                      className={clsx(
                        classes.tableRow,
                        classes.tableRowBorderGrid,
                        // classes.tableRowBorder,
                        // classes.tableRowHover,
                        'original',
                        {
                          [classes.tableRowSelected]: open[index],
                          [classes.tableRowRootSelected]: open[index] && isRoot,
                        },
                      )}
                    >
                      {checkboxSelection && (
                        <TableCell
                          className={clsx(
                            classes.tableCell,
                            classes.tableCellCheckbox,
                          )}
                          sx={{
                            position: 'sticky',
                            left: 0,
                            zIndex: 10,
                          }}
                        >
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                            onClick={() =>
                              handleSelectOrDeselectRow(row[uniqKey])
                            }
                          />
                        </TableCell>
                      )}

                      {visibleColumns?.map((column, i) => {
                        const { field, align, renderCell, width } = column
                        const cellValue = renderCell
                          ? renderCell({ row }, index)
                          : // renderCell(
                            //     { row, parentIndex: index, childIndex: i },
                            //     i,
                            //   )
                            row[field]

                        return (
                          <TableCell
                            className={clsx(classes.tableCell, {
                              [classes[`tableCellAlign${align}`]]: align,
                            })}
                            key={`data-table-${field}-${i}`}
                            id={`data-table-${field}-${i}`}
                            width={width}
                          >
                            {i === 0 && (expandable || expandIconVisible) ? (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <IconButton
                                  aria-label="expand row"
                                  size="small"
                                  onClick={() =>
                                    onOpen(index, !open[index], row)
                                  }
                                  className={classes.toggler}
                                >
                                  {open[index] ? <RemoveIcon /> : <AddIcon />}
                                </IconButton>

                                {renderCellValue(cellValue, row)}
                              </Box>
                            ) : (
                              renderCellValue(cellValue, row)
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>

                    {(expandable || expandIconVisible) && open[index] && (
                      <TableRow className={classes.tableRowCollapse}>
                        {renderCheckboxPlaceholder()}

                        <TableCell
                          sx={{ p: 0 }}
                          colSpan={visibleColumns.length}
                        >
                          <Collapse
                            in={open[index]}
                            timeout="auto"
                            unmountOnExit
                            classes={{
                              root: classes.collapse,
                              wrapper: classes.collapseWrapper,
                              entered: classes.collapseEntered,
                            }}
                          >
                            <TableProvider
                              rows={row?.[subDataKey]}
                              columns={
                                typeof subColumns === 'function'
                                  ? subColumns(row, index)
                                  : subColumns
                              }
                              isRoot={false}
                              hideFooter
                              hideSetting
                            >
                              <DataTableCollapse />
                            </TableProvider>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )
              })}
            {!rows?.length && (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length}
                  sx={(theme) => ({
                    textAlign: 'center',
                    color: theme.palette.subText.main,
                  })}
                >
                  {t('dataTable.noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination />
    </>
  )
}

export default (props) => (
  <TableProvider {...props} enableResizable={false} isTableCollapse>
    <DataTableCollapse />
  </TableProvider>
)
