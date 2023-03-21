import React, { createRef, useRef, useEffect, useCallback } from 'react'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Typography, Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { ORDER_DIRECTION } from '~/common/constants'
import useTableSetting from '~/components/DataTable/hooks/useTableSetting'
import { useClasses } from '~/themes'

import style from './style'

const DEFAULT_MIN_COLUMN_WIDTH = 80
const DEFAULT_MAX_COLUMN_WIDTH = 1000
const DEFAULT_TR_HEIGHT = 41
const DEFAULT_SCROLL_BAR_WIDTH = 8
const RESIZE_LINE_WIDTH = 3
/**
 *
 * @param {*} props
 * @returns
 */
const TableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    onSortChange,
    checkboxSelection,
    columns = [],
    selected,
    rows,
    uniqKey,
    pageSize,
    reorderable,
    enableResizable,
    tableSettingKey,
    containerRef,
    rawColumns = [],
    visibleColumns,
  } = props

  const classes = useClasses(style)
  const { getTableSetting, updateTableSetting, initTableSetting } =
    useTableSetting(tableSettingKey)

  const columnRefs = columns.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.field]: createRef(),
    }),
    {},
  )

  const isResizing = useRef('')

  const isTableResizable =
    enableResizable && columns?.some((col) => col?.resizable !== false)

  const hasVerticalScrollbar = () =>
    containerRef?.current &&
    containerRef?.current?.scrollHeight > containerRef?.current?.clientHeight

  const autoAdjustWidth = (setting = []) => {
    const actualWidth = setting.reduce((acc, cur) => {
      if (cur.visible) return acc + cur.width
      return acc
    }, 0)
    const containerWidth = containerRef?.current?.offsetWidth || 0
    const shortageWidth =
      containerWidth -
      (actualWidth + (checkboxSelection ? 50 : 0) + (reorderable ? 50 : 0)) -
      (hasVerticalScrollbar() ? DEFAULT_SCROLL_BAR_WIDTH : 0) -
      2

    if (shortageWidth > 0) {
      const qty =
        setting.filter((c) => c.resizable !== false && c.visible)?.length || 1
      const growWidth = Math.floor(shortageWidth / qty)

      setting.forEach((col) => {
        const newWidth =
          col.width + (col.resizable !== false && col.visible ? growWidth : 0)
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
      const column = columns.find((col) => col.field === field)
      const minWidth = column?.minWidth ?? DEFAULT_MIN_COLUMN_WIDTH
      const maxWidth = column?.maxWidth ?? DEFAULT_MAX_COLUMN_WIDTH
      const getNewWidth = () => {
        if (width > maxWidth) return maxWidth
        if (width < minWidth) return minWidth
        return width
      }

      const setting = getTableSetting() || []
      const actualWidth = setting.reduce((acc, cur) => {
        if (cur.field === field) return acc + getNewWidth()
        if (cur.visible) return acc + cur.width
        return acc
      }, 0)
      const containerWidth = containerRef?.current?.offsetWidth || 0
      const shortageWidth =
        containerWidth -
        (actualWidth + (checkboxSelection ? 50 : 0) + (reorderable ? 50 : 0)) -
        (hasVerticalScrollbar() ? DEFAULT_SCROLL_BAR_WIDTH : 0) -
        2

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
        RESIZE_LINE_WIDTH +
        1

      manualAdjustWidth(isResizing.current, Math.floor(newWidth || 0))
    },
    [isResizing.current, columnRefs],
  )

  const handleMouseUp = useCallback(() => {
    setCursorDocument(false)
    if (!isResizing.current) return
    isResizing.current = ''

    const tbSetting = getTableSetting()

    let newSetting = []

    if (Array.isArray(tbSetting) && tbSetting?.length) {
      newSetting = tbSetting?.map((s) => ({
        ...s,
        width:
          columnRefs[s.field]?.current?.parentElement?.offsetWidth || s.width,
      }))
    } else {
      newSetting = columns?.map((c) => ({
        field: c.field,
        visible: true,
        width:
          columnRefs[c.field]?.current?.parentElement?.offsetWidth || c.width,
      }))
    }

    updateTableSetting(newSetting)
  }, [isResizing.current, columnRefs, columns])

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

    autoAdjustWidth(initTableSetting(rawColumns))
  }, [
    rawColumns,
    checkboxSelection,
    reorderable,
    columnRefs,
    isTableResizable,
    visibleColumns,
  ])

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
    onSortChange(newSort)
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
        return [...acc, ...cur?.columns?.filter((c) => !c.hide)]
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

  const tableRows = parseColumnsByLevel(columns)
  const depth = tableRows.length

  if (columns.every((col) => !col.headerName)) return null

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

          {trColumns.map((column, thIndex) => {
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
              sticky,
            } = column
            const sorted = isSorted(field)

            const getColumnWidth = () => {
              if (isTableResizable)
                return (
                  getTableSetting()?.find((s) => s.field === field)?.width ||
                  width ||
                  minWidth
                )

              return width || 'auto'
            }

            const renderHeaderContent = () => (
              <>
                {typeof headerName === 'function' ? (
                  headerName()
                ) : (
                  <Typography variant="h5" noWrap title={headerName}>
                    {headerName}
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
                key={thIndex}
                className={clsx(classes.headerCell, {
                  [classes[`headerCellAlign${headerAlign || align}`]]:
                    headerAlign || align,
                  [classes.lastStickyLeft]:
                    sticky?.left !== undefined &&
                    !trColumns[thIndex + 1]?.sticky?.left,
                  [classes.firstStickyRight]:
                    sticky?.right !== undefined &&
                    !trColumns[thIndex - 1]?.sticky?.right,
                })}
                sx={{
                  width: getColumnWidth(),
                  minWidth: minWidth || width, // for tableLayout auto
                  top: (DEFAULT_TR_HEIGHT + 1) * trIndex,
                  zIndex: trIndex === 0 ? 20 : 19,
                  ...(sticky
                    ? {
                        position: 'sticky',
                        left: sticky?.left ?? 'auto',
                        right: sticky?.right ?? 'auto',
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

          {/* {trIndex === 0 && isTableResizable && (
            <TableCell className={classes.headerCellOffset} rowSpan={depth} />
          )} */}
        </TableRow>
      ))}
    </MuiTableHead>
  )
}

TableHead.defaultProps = {
  onSortChange: () => {},
  onSelectAllClick: () => {},
  rows: [],
  enableResizable: false,
}

TableHead.propTypes = {
  onSortChange: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  enableResizable: PropTypes.bool,
  onResizeFinished: PropTypes.func,
  tableSettingKey: PropTypes.string,
}

export default TableHead
