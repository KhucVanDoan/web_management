import React, { useMemo } from 'react'

import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { useTable } from '~/common/hooks/useTable'
import {
  TableProvider,
  DEFAULT_MIN_COLUMN_WIDTH,
} from '~/contexts/TableContext'
import { useClasses } from '~/themes'

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
const DataTable = () => {
  const { t } = useTranslation()
  const classes = useClasses(style)

  const {
    rows,
    visibleColumns,
    height,
    selected,
    onSelectionChange,
    rowSpanMatrix,
    rowGrayMatrix,
    containerRef,
    uniqKey,
    isTableResizable,
    checkboxSelection,
    reorderable,
    isVisible,
    hideSetting,
    setting,
  } = useTable()

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

  const getColumnsInBottomTree = (cols = []) => {
    const childCols = cols?.reduce((acc, cur) => {
      if (
        Array.isArray(cur?.columns) &&
        cur?.columns?.some((c) => isVisible(c))
      ) {
        return [...acc, ...cur?.columns?.filter((c) => isVisible(c))]
      }
      return [...acc, cur]
    }, [])

    if (childCols?.some((x) => x?.columns)) {
      return getColumnsInBottomTree(childCols)
    }

    return childCols
  }

  const bodyColumns = useMemo(
    () => getColumnsInBottomTree(visibleColumns),
    [visibleColumns],
  )

  const hasStickyCol = useMemo(
    () => visibleColumns.some((c) => c?.sticky),
    [visibleColumns],
  )

  return (
    <>
      <TopBar />

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
          stickyHeader
          className={classes.table}
          sx={
            isTableResizable || hasStickyCol
              ? { tableLayout: 'fixed', width: '100%' }
              : {}
          }
        >
          <TableHead />

          <TableBody>
            {rows?.length > 0 &&
              rows.map((row, index) => {
                const isItemSelected = isSelected(row[uniqKey])
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    key={row[uniqKey] || index}
                    draggableId={row[uniqKey]?.toString()}
                    index={index}
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
                        minWidth,
                        cellStyle = {},
                      } = column
                      const cellValue = renderCell
                        ? renderCell({ row }, index)
                        : row[field]

                      let colWidth = 0
                      let colMinWidth = 0
                      let colSticky = ''
                      let colStickyLeft =
                        (reorderable ? 50 : 0) + (checkboxSelection ? 50 : 0)
                      let colStickyRight = 0

                      if (hideSetting && !isTableResizable) {
                        colWidth = width || minWidth
                        colMinWidth =
                          minWidth || width || DEFAULT_MIN_COLUMN_WIDTH
                        colSticky = column.sticky
                        colStickyLeft = 0
                        colStickyRight = 0

                        for (let c of visibleColumns || []) {
                          if (c?.field === field) break

                          if (c?.sticky === 'left' && isVisible(c)) {
                            colStickyLeft += c?.width || 0
                          }
                        }

                        for (let c of [...(setting || [])].reverse()) {
                          if (c?.field === field) break

                          if (c?.sticky === 'right' && isVisible(c)) {
                            colStickyRight += c?.width || 0
                          }
                        }
                      } else {
                        const colSetting = setting?.find(
                          (s) => s.field === field,
                        )

                        colWidth = colSetting?.width
                        colMinWidth = colSetting?.minWidth
                        colSticky = colSetting?.sticky

                        for (let c of setting || []) {
                          if (c?.field === field) break

                          if (c?.sticky === 'left' && isVisible(c, true)) {
                            colStickyLeft += c?.width || 0
                          }
                        }

                        for (let c of [...(setting || [])].reverse()) {
                          if (c?.field === field) break

                          if (c?.sticky === 'right' && isVisible(c, true)) {
                            colStickyRight += c?.width || 0
                          }
                        }
                      }

                      const rowSpan = rowSpanMatrix?.[index]?.[i]

                      if (rowSpan === -1) return null // remove td

                      return (
                        <TableCell
                          className={clsx(classes.tableCell, {
                            [classes[`tableCellAlign${align}`]]: align,

                            [classes.firstStickyRight]:
                              colSticky === 'right' &&
                              setting?.find((s) => s?.sticky === 'right')
                                ?.field === field,
                          })}
                          key={`data-table-${field}-${i}`}
                          id={`data-table-${field}-${i}`}
                          sx={{
                            width: colWidth,
                            minWidth: colMinWidth,
                            verticalAlign: 'middle',
                            ...(colSticky
                              ? {
                                  position: 'sticky',
                                  [colSticky]:
                                    colSticky === 'left'
                                      ? colStickyLeft
                                      : colStickyRight,
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
                  colSpan={visibleColumns.length + (checkboxSelection ? 1 : 0)}
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
  <TableProvider {...props}>
    <DataTable />
  </TableProvider>
)
