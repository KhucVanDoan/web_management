import React, { useState } from 'react'

import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import TruncateMarkup from 'react-truncate-markup'

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
    checkboxSelection,
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
  } = props

  const indexCol = props.indexCol || 'id'
  const { tableSetting } = useTableSetting()
  const initVisibleColumns = (rawColumns || []).reduce(
    (accumulator, currentValue) => {
      if (!currentValue.hide) return [...accumulator, currentValue.field]
      return accumulator
    },
    [],
  )
  const [visibleColumns, setVisibleColumns] = useState(
    tableSetting || initVisibleColumns,
  )

  const columns = rawColumns.filter((col) => visibleColumns.includes(col.field))

  /**
   * Handle select all
   * @param {*} event
   */
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const concatSelected = [...selected, ...rows]
      const uniqueIndexValues = [
        ...new Set(concatSelected.map((item) => item[indexCol])),
      ]
      const newSelected = uniqueIndexValues.map((indexValue) =>
        concatSelected.find((item) => item[indexCol] === indexValue),
      )
      props.onChangeSelectedRows && props.onChangeSelectedRows(newSelected)
    } else {
      const newSelected = selected.filter(
        (item) => !rows.find((e) => e[indexCol] === item[indexCol]),
      )
      props.onChangeSelectedRows && props.onChangeSelectedRows(newSelected)
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

    props.onChangeSelectedRows && props.onChangeSelectedRows(newSelected)
  }

  /**
   * Check if row is selected
   * @param {*} indexColValue
   * @returns
   */
  const isSelected = (indexColValue) => {
    return selected.findIndex((item) => item[indexCol] === indexColValue) !== -1
  }

  return (
    <>
      {(title || filters || !hideSetting) && (
        <TopBar
          title={title}
          columns={rawColumns}
          visibleColumns={visibleColumns}
          onApplySetting={(cols) => setVisibleColumns(cols)}
          filters={filters}
        />
      )}
      <TableContainer
        sx={{
          ...(height ? { height: height } : { flex: 1, overflow: 'auto' }),
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
            onChangeSort={(newSort) => props.onChangeSort(newSort)}
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
                    key={row[indexCol]?.toString()}
                    draggableId={row[indexCol]?.toString()}
                    index={index}
                    reorderable={reorderable}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    className={clsx(classes.tableRow, {
                      [classes.tableRowStriped]: striped,
                      [classes.tableRowBorder]: !striped,
                      [classes.tableRowHover]: hover,
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
                      const { field, align, renderCell } = column
                      const cellValue = renderCell
                        ? renderCell({ row })
                        : row[field]

                      const canTruncated = typeof cellValue === 'string'

                      return (
                        <TableCell
                          className={clsx(classes.tableCell, {
                            [classes[`tableCellAlign${align}`]]: align,
                          })}
                          key={`data-table-${field}-${i}`}
                          id={`data-table-${field}-${i}`}
                        >
                          {canTruncated ? (
                            <TruncateMarkup
                              lines={2}
                              tokenize="words"
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
                  sx={{ textAlign: 'center', color: 'subText' }}
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
          onChange={(page, pageSize) => {
            props.onPageChange({ page, pageSize })
            props.onPageSizeChange({ page, pageSize })
          }}
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
  pageSize: 20,
  sort: {},
  selected: [],
}

DataTable.propsTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      filterable: PropTypes.bool,
      sortable: PropTypes.bool,
      hide: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']), // default left
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']), // default center
      renderCell: PropTypes.func, // renderCell and replace valueGetter
      fixed: PropTypes.bool,
    }),
  ),
  indexCol: PropTypes.string,
  checkboxSelection: PropTypes.bool, // default: false
  total: PropTypes.number,
  pageSize: PropTypes.number, // default: 20
  page: PropTypes.number,
  height: PropTypes.number, // default: 500px
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onChangeSelectedRows: PropTypes.func,
  hideFooter: PropTypes.bool,
  reorderable: PropTypes.bool, // default false
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  title: PropTypes.string,
  hideSetting: PropTypes.bool,
  sort: PropTypes.shape(),
  selected: PropTypes.array,
  filters: PropTypes.shape(),
}

export default withTranslation()(withClasses(style)(DataTable))
