import React, { createRef, useRef, useEffect, useCallback } from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Typography, Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import clsx from 'clsx'

import { ORDER_DIRECTION } from '~/common/constants'
import { useTable } from '~/common/hooks/useTable'
import {
  DEFAULT_MIN_COLUMN_WIDTH,
  DEFAULT_MAX_COLUMN_WIDTH,
  DEFAULT_TR_HEIGHT,
  RESIZE_LINE_WIDTH,
} from '~/contexts/TableContext'
import { useClasses } from '~/themes'

import style from './style'

/**
 *
 * @param {*} props
 * @returns
 */
const TableHead = ({ onSortChange: _onSortChange }) => {
  const {
    rows,
    uniqKey,
    pageSize,
    sort,
    onSortChange,
    containerRef,
    visibleColumns,
    selected,
    isTableResizable,
    checkboxSelection,
    reorderable,
    onSelectionChange,
    setting,
    updateSetting,
    isVisible,
    visibleColumnKeys,
    hideSetting,
  } = useTable()

  const { order, orderBy } = sort || {}

  const classes = useClasses(style)

  const columnRefs = visibleColumns.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.field]: createRef(),
    }),
    {},
  )

  const isResizing = useRef('')

  const autoAdjustWidth = () => {
    const actualWidth = setting.reduce((acc, cur) => {
      if (isVisible(cur, true)) return acc + cur.width

      return acc
    }, 0)

    const containerWidth = containerRef?.current?.clientWidth || 0
    const shortageWidth =
      containerWidth -
      (actualWidth + (checkboxSelection ? 50 : 0) + (reorderable ? 50 : 0))

    if (shortageWidth === 0) return
    if (shortageWidth > 0) {
      const qty =
        setting.filter((c) => c.resizable !== false && isVisible(c, true))
          ?.length || 1
      const growWidth = Math.floor(shortageWidth / qty)

      setting.forEach((col) => {
        const newWidth =
          col.width +
          (col.resizable !== false && isVisible(col, true) ? growWidth : 0)

        if (columnRefs[col.field]?.current?.parentElement) {
          columnRefs[col.field].current.parentElement.style.width =
            newWidth + 'px'
        }
      })
    } else {
      setting.forEach((col) => {
        if (columnRefs[col.field]?.current?.parentElement) {
          columnRefs[col.field].current.parentElement.style.width =
            col.width + 'px'
        }
      })
    }
  }

  const manualAdjustWidth = (field, width) => {
    if (columnRefs[field]?.current?.parentElement) {
      const minWidth =
        setting.find((col) => col.field === field)?.minWidth ??
        DEFAULT_MIN_COLUMN_WIDTH
      const maxWidth = DEFAULT_MAX_COLUMN_WIDTH
      const getNewWidth = () => {
        if (width > maxWidth) return maxWidth
        if (width < minWidth) return minWidth
        return width
      }

      const actualWidth = setting.reduce((acc, cur) => {
        if (cur.field === field) return acc + getNewWidth()
        if (isVisible(cur, true)) return acc + cur.width
        return acc
      }, 0)

      const containerWidth = containerRef?.current?.clientWidth || 0
      const shortageWidth =
        containerWidth -
        (actualWidth + (checkboxSelection ? 50 : 0) + (reorderable ? 50 : 0))

      if (shortageWidth > 0) return
      columnRefs[field].current.parentElement.style.width = getNewWidth() + 'px'
    }
  }

  const setCursorDocument = (isResizing) => {
    document.body.style.cursor = isResizing ? 'col-resize' : 'auto'
  }

  const handleMouseMove = useCallback(
    (e) => {
      if (!isResizing.current) return

      const newWidth =
        e.clientX -
        columnRefs[
          isResizing.current
        ]?.current?.parentElement?.getBoundingClientRect().left +
        RESIZE_LINE_WIDTH

      manualAdjustWidth(isResizing.current, Math.floor(newWidth || 0))
    },
    [isResizing.current, columnRefs],
  )

  const handleMouseUp = useCallback(() => {
    setCursorDocument(false)
    if (!isResizing.current) return
    isResizing.current = ''

    const st = setting?.map((s) => ({
      ...s,
      width:
        columnRefs[s.field]?.current?.parentElement?.offsetWidth || s.width,
    }))

    updateSetting(st)
  }, [isResizing.current, columnRefs, visibleColumns, setting])

  const startResize = (field) => {
    isResizing.current = field
    setCursorDocument(true)
  }

  useEffect(() => {
    if (isTableResizable) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [handleMouseMove, handleMouseUp, isTableResizable])

  useEffect(() => {
    if (!isTableResizable) return
    autoAdjustWidth()
  }, [checkboxSelection, reorderable, isTableResizable, visibleColumnKeys])

  const onClickSort = (field) => {
    let newSort

    if (field !== orderBy) {
      newSort = {
        orderBy: field,
        order: ORDER_DIRECTION.ASC,
      }
    } else if (order === ORDER_DIRECTION.ASC) {
      newSort = {
        orderBy: field,
        order: ORDER_DIRECTION.DESC,
      }
    }

    if (typeof _onSortChange === 'function') {
      _onSortChange(newSort)
    } else {
      onSortChange(newSort)
    }
  }

  /**
   * Check if field is sorted
   * @param {string} field
   * @returns
   */
  const isSorted = (field) => {
    return orderBy === field
  }

  /**
   * Handle select all
   * @param {*} event
   */
  const onSelectAllClick = (event) => {
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
   * Check if current page is selected all
   * @returns {bool}
   */
  const isSelectedAllCurrentPage = () => {
    return (
      rows.length > 0 &&
      rows.every((item) =>
        selected?.some(
          (selectedItem) => selectedItem[uniqKey] === item[uniqKey],
        ),
      )
    )
  }

  /**
   * Check if current page is checked some rows
   * @returns {bool}
   */
  const isSelectedSomeCurrentPage = () => {
    const currentPageSelectedRows = rows.filter((item) =>
      selected?.some((selectedItem) => selectedItem[uniqKey] === item[uniqKey]),
    )
    return (
      rows.length > 0 &&
      currentPageSelectedRows.length > 0 &&
      currentPageSelectedRows.length <
        (pageSize === rows.length ? pageSize : rows.length)
    )
  }

  const parseColumnsByLevel = (cols = []) => {
    const childCols = cols?.reduce((acc, cur) => {
      if (Array.isArray(cur?.columns))
        return [...acc, ...cur?.columns?.filter((c) => isVisible(c))]
      return acc
    }, [])

    if (childCols?.length) {
      return [cols, ...parseColumnsByLevel(childCols)]
    }

    return [cols]
  }

  const getColSpan = (col) => {
    let x = 1

    if (Array.isArray(col?.columns) && col?.columns?.length) {
      col.columns.forEach((c) => {
        x += getColSpan(c)
      })

      return x - 1
    }
    return x
  }

  const tableRows = parseColumnsByLevel(visibleColumns)
  const depth = tableRows.length

  if (visibleColumns.every((col) => !col.headerName)) return null

  return (
    <MuiTableHead className={classes.tableHead}>
      {tableRows.map((trColumns, trIndex) => (
        <TableRow key={trIndex} sx={{ zIndex: depth - trIndex }}>
          {trIndex === 0 && reorderable && (
            <TableCell
              className={clsx(classes.headerCell, classes.headerCellReorder)}
              rowSpan={depth}
              sx={{ zIndex: 30, top: 0, left: 0 }}
            />
          )}

          {trIndex === 0 && checkboxSelection && (
            <TableCell
              className={clsx(classes.headerCell, classes.headerCellCheckbox)}
              rowSpan={depth}
              sx={{ zIndex: 30, top: 0, left: reorderable ? 50 : 0 }}
            >
              <Checkbox
                indeterminate={isSelectedSomeCurrentPage()}
                checked={isSelectedAllCurrentPage()}
                onChange={onSelectAllClick}
                className={classes.checkbox}
              />
            </TableCell>
          )}

          {trColumns.map((column) => {
            const {
              headerAlign,
              align,
              field,
              headerName,
              headerTooltip,
              width,
              minWidth,
              sortable,
              resizable,
            } = column
            const sorted = isSorted(field)

            let colWidth = 0
            let colMinWidth = 0
            let colHeaderName = ''
            let colSticky = ''
            let colStickyLeft =
              (reorderable ? 50 : 0) + (checkboxSelection ? 50 : 0)
            let colStickyRight = 0

            if (hideSetting && !isTableResizable) {
              colWidth = width || minWidth
              colMinWidth = minWidth || width || DEFAULT_MIN_COLUMN_WIDTH
              colHeaderName = headerName
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
              const colSetting = setting?.find((s) => s.field === field)

              colWidth = colSetting?.width
              colMinWidth = colSetting?.minWidth
              colHeaderName = colSetting?.aliasName || headerName
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

            const renderHeaderContent = () => (
              <>
                {typeof headerName === 'function' ? (
                  headerName()
                ) : (
                  <Typography variant="h5" noWrap title={colHeaderName}>
                    {colHeaderName}
                  </Typography>
                )}
                {headerTooltip && (
                  <Box
                    component="span"
                    sx={{
                      ml: 0.5,
                      position: 'relative',
                      top: 3,
                    }}
                  >
                    <Tooltip title={headerTooltip} arrow placement="top">
                      <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                    </Tooltip>
                  </Box>
                )}
              </>
            )
            return (
              <TableCell
                key={field}
                className={clsx(classes.headerCell, {
                  [classes[`headerCellAlign${headerAlign || align}`]]:
                    headerAlign || align,
                  [classes.firstStickyRight]:
                    colSticky === 'right' &&
                    setting?.find((s) => s?.sticky === 'right')?.field ===
                      field,
                })}
                sx={{
                  width: colWidth,
                  minWidth: colMinWidth,
                  top: (DEFAULT_TR_HEIGHT + 1) * trIndex,
                  zIndex: trIndex === 0 ? 20 : 19,
                  ...(colSticky
                    ? {
                        position: 'sticky',
                        [colSticky]:
                          colSticky === 'left' ? colStickyLeft : colStickyRight,
                        zIndex: 30,
                      }
                    : {}),
                }}
                {...(column?.columns
                  ? { colSpan: getColSpan(column) }
                  : { rowSpan: depth - trIndex })}
              >
                {sortable ? (
                  <Box
                    onClick={() => onClickSort(field)}
                    className={classes.headerNameContainer}
                    sx={{ cursor: 'pointer' }}
                  >
                    {renderHeaderContent()}

                    <span
                      className={clsx(classes.sortIcon, {
                        [classes.sortIconAsc]:
                          sorted && order === ORDER_DIRECTION.ASC,
                        [classes.sortIconDesc]:
                          sorted && order === ORDER_DIRECTION.DESC,
                      })}
                    ></span>
                  </Box>
                ) : (
                  <Box className={classes.headerNameContainer}>
                    {renderHeaderContent()}
                  </Box>
                )}

                {trIndex === 0 && isTableResizable && resizable !== false && (
                  <Box
                    onMouseDown={() => startResize(field)}
                    ref={columnRefs[field]}
                    className={classes.resizeLine}
                    sx={{
                      height: DEFAULT_TR_HEIGHT * depth,
                      width: RESIZE_LINE_WIDTH,
                    }}
                  />
                )}
              </TableCell>
            )
          })}
        </TableRow>
      ))}
    </MuiTableHead>
  )
}

export default TableHead
