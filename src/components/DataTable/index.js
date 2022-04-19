import React, { useState, useEffect, useCallback } from 'react'

import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import TruncateMarkup from 'react-truncate-markup'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import useTableSetting from '~/components/DataTable/hooks/useTableSetting'
import { withClasses } from '~/themes'

import Pagination from './Pagination'
import TableBody from './TableBody'
import TableHead from './TableHead'
import TableRow from './TableRow'
import TopBar from './TopBar'
import style from './style'

/**
 * Data Table
 */
const DataTable = (props) => {
  const {
    rows,
    classes,
    columns: rawColumns,
    height,
    total,
    t,
    hideFooter,
    reorderable,
    striped,
    hover,
    title,
    hideSetting,
    page,
    pageSize,
    sort,
    selected,
    filters,
    onSortChange,
    onPageChange,
    onPageSizeChange,
    onSelectionChange,
    tableSettingKey,
  } = props

  const [visibleColumns, setVisibleColumns] = useState([])
  const { tableSetting, updateTableSetting } = useTableSetting(tableSettingKey)
  const indexCol = props.indexCol || 'id'
  const checkboxSelection = typeof onSelectionChange === 'function'

  /**
   * Handle select all
   * @param {*} event
   */
  const handleSelectAllClick = (event) => {
    if (!checkboxSelection) return
    if (event.target.checked) {
      const concatSelected = [...selected, ...rows]
      const uniqueIndexValues = [
        ...new Set(concatSelected.map((item) => item[indexCol])),
      ]
      const newSelected = uniqueIndexValues.map((indexValue) =>
        concatSelected.find((item) => item[indexCol] === indexValue),
      )
      onSelectionChange(newSelected)
    } else {
      const newSelected = selected.filter(
        (item) => !rows.find((e) => e[indexCol] === item[indexCol]),
      )
      onSelectionChange(newSelected)
    }
  }

  /**
   * Handle select or deselect row
   * @param {*} indexValue
   * @returns
   */
  const handleSelectOrDeselectRow = (indexValue) => {
    if (!checkboxSelection) return
    const selectedIndex = selected.findIndex(
      (item) => item[indexCol] === indexValue,
    )
    let newSelected = []

    const newValueData = rows.find((item) => item[indexCol] === indexValue)

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
   * @param {*} indexColValue
   * @returns
   */
  const isSelected = (indexColValue) => {
    return selected.findIndex((item) => item[indexCol] === indexColValue) !== -1
  }

  const handleApplySetting = useCallback((cols = []) => {
    setVisibleColumns(cols)

    if (!hideSetting) {
      updateTableSetting(cols)
    }
  }, [])

  useEffect(() => {
    const initVisibleColumns =
      (!hideSetting && tableSetting) ||
      (rawColumns || []).reduce((acc, cur) => {
        if (!cur.hide) return [...acc, cur.field]
        return acc
      }, [])

    handleApplySetting(initVisibleColumns)
  }, [rawColumns, handleApplySetting])

  const columns = rawColumns.filter((col) => visibleColumns.includes(col.field))

  const rowSpanMatrix = props.rowSpanMatrix

  return (
    <>
      {(title || filters || !hideSetting) && (
        <TopBar
          title={title}
          columns={rawColumns}
          visibleColumns={visibleColumns}
          onApplySetting={handleApplySetting}
          filters={filters}
          hideSetting={hideSetting}
        />
      )}
      <TableContainer
        sx={{
          maxHeight: 'calc(100vh - 160px)',
          ...(height ? { maxHeight: height } : { flex: 1, overflow: 'auto' }),
        }}
      >
        <Table className={classes.table} stickyHeader>
          <TableHead
            indexCol={indexCol}
            selected={selected}
            pageSize={pageSize}
            rows={rows}
            order={sort?.order}
            orderBy={sort?.orderBy}
            onSortChange={onSortChange}
            onSelectAllClick={handleSelectAllClick}
            checkboxSelection={checkboxSelection}
            columns={columns}
            reorderable={reorderable}
          />
          <TableBody
            rows={rows}
            reorderable={reorderable}
            onChangeRowsOrder={props.onChangeRowsOrder}
          >
            {rows?.length > 0 &&
              rows.map((row, index) => {
                const isItemSelected = isSelected(row[indexCol])
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    key={row[indexCol] || index}
                    draggableId={row[indexCol]?.toString()}
                    index={index}
                    reorderable={reorderable}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    className={clsx(classes.tableRow, {
                      [classes.tableRowStriped]: striped,
                      [classes.tableRowBorder]: !striped,
                      [classes.tableRowHover]: hover,
                      [classes.tableRowGray]: props.rowGrayMatrix?.[index],
                    })}
                    classes={classes}
                  >
                    {checkboxSelection && (
                      <TableCell
                        className={clsx(
                          classes.tableCell,
                          classes.tableCellCheckbox,
                        )}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          onClick={() =>
                            handleSelectOrDeselectRow(row[indexCol])
                          }
                        />
                      </TableCell>
                    )}
                    {columns.map((column, i) => {
                      const {
                        field,
                        align,
                        renderCell,
                        width,
                        cellStyle = {},
                      } = column
                      const cellValue = renderCell
                        ? renderCell({ row }, index)
                        : row[field]

                      const canTruncated = typeof cellValue === 'string'

                      const rowSpan = rowSpanMatrix?.[index]?.[i]

                      if (rowSpan === -1) return null // remove td

                      return (
                        <TableCell
                          className={clsx(classes.tableCell, {
                            [classes[`tableCellAlign${align}`]]: align,
                          })}
                          key={`data-table-${field}-${i}`}
                          id={`data-table-${field}-${i}`}
                          sx={{ minWidth: width, ...cellStyle }}
                          {...(rowSpan > 1 ? { rowSpan } : {})}
                        >
                          {canTruncated ? (
                            <TruncateMarkup
                              lines={2}
                              ellipsis={(rootEl) => (
                                <Box
                                  title={rootEl.props.original}
                                  component="span"
                                  sx={{
                                    display: 'inline-block',
                                    '>span': {
                                      display: 'inline !important',
                                    },
                                  }}
                                >
                                  {rootEl.props.children}...
                                </Box>
                              )}
                            >
                              <div
                                className={classes.truncateCell}
                                original={cellValue}
                              >
                                <span className={classes.originText}>
                                  {cellValue}
                                </span>
                              </div>
                            </TruncateMarkup>
                          ) : (
                            cellValue
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}

            {!rows?.length && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
      {!hideFooter && (
        <Pagination
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          total={total}
          pageSize={pageSize}
          page={page}
        />
      )}
    </>
  )
}

DataTable.defaultProps = {
  striped: true,
  hover: false,
  hideSetting: false,
  page: 1,
  pageSize: ROWS_PER_PAGE_OPTIONS[0],
  sort: {},
  selected: [],
  onSortChange: () => {},
  onPageChange: () => {},
  onPageSizeChange: () => {},
}

DataTable.propsTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sortable: PropTypes.bool,
      hide: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
      renderCell: PropTypes.func,
      fixed: PropTypes.bool,
    }),
  ),
  indexCol: PropTypes.string,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  height: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onSortChange: PropTypes.func,
  hideFooter: PropTypes.bool,
  reorderable: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  title: PropTypes.string,
  hideSetting: PropTypes.bool,
  sort: PropTypes.shape(),
  selected: PropTypes.array,
  filters: PropTypes.shape(),
  tableSettingKey: PropTypes.string,
}

export default withTranslation()(withClasses(style)(DataTable))
