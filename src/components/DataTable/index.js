import React, { useState, useRef, useMemo, useEffect } from 'react'

import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import useTableSetting from '~/components/DataTable/hooks/useTableSetting'
import { withClasses } from '~/themes'
import { getColumnsInBottomTree } from '~/utils'

import Pagination from './Pagination'
import TableBody from './TableBody'
import TableHead from './TableHead'
import TableRow from './TableRow'
import TopBar from './TopBar'
import Truncate from './Truncate'
import style from './style'

/**
 * Data Table
 */
const DataTable = (props) => {
  const {
    rows,
    classes,
    columns: rawColumns = [],
    height,
    total,
    t,
    hideFooter,
    // striped,
    // hover,
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
    onRowsOrderChange,
    tableSettingKey,
    onSettingChange,
    beforeTopbar,
    afterTopbar,
    bulkActions,
    enableResizable,
    rowSpanMatrix,
    rowGrayMatrix,
  } = props

  const [visibleColumns, setVisibleColumns] = useState([])
  const containerRef = useRef(null)
  const { initTableSetting } = useTableSetting(tableSettingKey)

  const uniqKey = props.uniqKey ?? 'id'
  const checkboxSelection = typeof onSelectionChange === 'function'
  const reorderable = typeof onRowsOrderChange === 'function'
  /**
   * Handle select all
   * @param {*} event
   */
  const handleSelectAllClick = (event) => {
    if (!checkboxSelection) return
    if (event.target.checked) {
      const concatSelected = [...selected, ...rows]
      const uniqueIndexValues = [
        ...new Set(concatSelected.map((item) => item[uniqKey])),
      ]
      const newSelected = uniqueIndexValues.map((indexValue) =>
        concatSelected.find((item) => item[uniqKey] === indexValue),
      )
      onSelectionChange(newSelected)
    } else {
      const newSelected = selected.filter(
        (item) => !rows.find((e) => e[uniqKey] === item[uniqKey]),
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

  const columns = useMemo(
    () =>
      hideSetting
        ? rawColumns.filter((col) => !col.hide)
        : rawColumns.filter((col) => visibleColumns.includes(col.field)),
    [hideSetting, rawColumns, visibleColumns],
  )

  const bodyColumns = useMemo(() => getColumnsInBottomTree(columns), [columns])

  const hasTableHead = useMemo(
    () => columns.some((col) => col.headerName !== undefined),
    [columns],
  )

  const isTableResizable = useMemo(
    () =>
      enableResizable &&
      hasTableHead &&
      columns?.some((col) => col?.resizable !== false),
    [enableResizable, hasTableHead, columns],
  )

  useEffect(() => {
    initTableSetting(rawColumns)
  }, [rawColumns])

  return (
    <>
      {(title || filters || !hideSetting || beforeTopbar || afterTopbar) && (
        <TopBar
          beforeTopbar={beforeTopbar}
          afterTopbar={afterTopbar}
          title={title}
          columns={rawColumns}
          visibleColumns={visibleColumns}
          filters={filters}
          hideSetting={hideSetting}
          selected={selected}
          bulkActions={bulkActions}
          uniqKey={uniqKey}
          tableSettingKey={tableSettingKey}
          setVisibleColumns={setVisibleColumns}
          onSettingChange={onSettingChange}
        />
      )}
      <TableContainer
        ref={containerRef}
        className={classes.tableContainer}
        sx={{
          maxHeight: 'calc(100vh - 160px)',
          ...(height ? { maxHeight: height } : {}),
          '.MuiDialog-container &': {
            maxHeight: 'calc(100vh - 280px)',
          },
        }}
      >
        <Table
          className={classes.table}
          sx={isTableResizable ? { tableLayout: 'fixed', width: '100%' } : {}}
        >
          <TableHead
            uniqKey={uniqKey}
            selected={selected}
            pageSize={pageSize}
            rows={rows}
            order={sort?.order}
            orderBy={sort?.orderBy}
            onSortChange={onSortChange}
            onSelectAllClick={handleSelectAllClick}
            checkboxSelection={checkboxSelection}
            columns={columns}
            rawColumns={rawColumns}
            visibleColumns={visibleColumns}
            reorderable={reorderable}
            enableResizable={enableResizable}
            tableSettingKey={tableSettingKey}
            containerRef={containerRef}
          />

          <TableBody
            rows={rows}
            reorderable={reorderable}
            onRowsOrderChange={onRowsOrderChange}
          >
            {rows?.length > 0 &&
              rows.map((row, index) => {
                const isItemSelected = isSelected(row[uniqKey])
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    key={row[uniqKey] || index}
                    draggableId={row[uniqKey]?.toString()}
                    index={index}
                    reorderable={reorderable}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    className={clsx(
                      classes.tableRow,
                      classes.tableRowBorderGrid,
                      {
                        // [classes.tableRowStriped]: striped,
                        // [classes.tableRowBorder]: !striped,
                        // [classes.tableRowHover]: hover,
                        [classes.tableRowGray]: rowGrayMatrix?.[index],
                      },
                    )}
                    classes={classes}
                  >
                    {checkboxSelection && (
                      <TableCell
                        className={clsx(
                          classes.tableCell,
                          classes.tableCellCheckbox,
                        )}
                        sx={{
                          position: 'sticky',
                          left: reorderable ? 50 : 0,
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
                    {bodyColumns.map((column, i) => {
                      const {
                        field,
                        align,
                        renderCell,
                        width,
                        cellStyle = {},
                        sticky,
                      } = column
                      const cellValue = renderCell
                        ? renderCell({ row }, index)
                        : row[field]

                      const rowSpan = rowSpanMatrix?.[index]?.[i]

                      if (rowSpan === -1) return null // remove td

                      return (
                        <TableCell
                          className={clsx(classes.tableCell, {
                            [classes[`tableCellAlign${align}`]]: align,
                            [classes.lastStickyLeft]:
                              sticky?.left !== undefined &&
                              !bodyColumns[i + 1]?.sticky?.left,
                            [classes.firstStickyRight]:
                              sticky?.right !== undefined &&
                              !bodyColumns[i - 1]?.sticky?.right,
                          })}
                          key={`data-table-${field}-${i}`}
                          id={`data-table-${field}-${i}`}
                          sx={{
                            width: width,
                            minWidth: width,
                            verticalAlign: 'middle',
                            ...(sticky
                              ? {
                                  position: 'sticky',
                                  left: sticky?.left ?? 'auto',
                                  right: sticky?.right ?? 'auto',
                                  zIndex: 10,
                                }
                              : {}),
                            ...cellStyle,
                          }}
                          {...(rowSpan > 1 ? { rowSpan } : {})}
                        >
                          <Truncate value={cellValue} classes={classes} />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}

            {!rows?.length && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (checkboxSelection ? 1 : 0)}
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
          total={parseInt(total) || 0}
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
  onSettingChange: () => {},
  enableResizable: true,
}

DataTable.propsTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        .isRequired,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sortable: PropTypes.bool,
      hide: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
      renderCell: PropTypes.func,
      fixed: PropTypes.bool,
    }),
  ),
  uniqKey: PropTypes.string,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  height: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onSortChange: PropTypes.func,
  onRowsOrderChange: PropTypes.func,
  hideFooter: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  title: PropTypes.string,
  hideSetting: PropTypes.bool,
  sort: PropTypes.shape(),
  selected: PropTypes.array,
  filters: PropTypes.shape(),
  tableSettingKey: PropTypes.string,
  onSettingChange: PropTypes.func,
  beforeTopbar: PropTypes.node,
  afterTopbar: PropTypes.node,
  bulkActions: PropTypes.shape(),
  enableResizable: PropTypes.bool,
}

export default withTranslation()(withClasses(style)(DataTable))
