/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import useTableSetting from '~/components/DataTable/hooks/useTableSetting'
import TopBar from '~/components/DataTable/TopBar'

import Pagination from '~/components/DataTable/Pagination'
import TableHead from '~/components/DataTable/TableHead'
import { withClasses } from '~/themes'
import style from '~/components/TableCollapse/style'

/**
 * Data Table
 */

const TableCollapse = (props) => {
  const {
    classes,
    columns: rawColumns,
    height,
    total,
    t,
    hideFooter,
    subColumns,
    isRoot,
    type,
    rows = [],
    page,
    pageSize,
    title,
    hideSetting,
    onPageChange,
    onPageSizeChange,
    filters,
  } = props

  const [open, setOpen] = useState({})
  const [sort, setSort] = useState(null)
  const [visibleColumns, setVisibleColumns] = useState([])
  const { tableSetting, updateTableSetting } = useTableSetting()
  const uniqKey = props.uniqKey ?? 'id'

  const handleApplySetting = useCallback((cols = []) => {
    setVisibleColumns(cols)
    updateTableSetting(cols)
  }, [])

  useEffect(() => {
    if (!isRoot) return

    const initVisibleColumns =
      (hideSetting ? null : tableSetting) ||
      (rawColumns || []).reduce((acc, cur) => {
        if (!cur.hide) return [...acc, cur.field]
        return acc
      }, [])

    handleApplySetting(initVisibleColumns)
  }, [rawColumns, handleApplySetting])

  let columns = []
  if (isRoot) {
    columns = rawColumns?.filter((col) => visibleColumns.includes(col.field))
  } else {
    columns = rawColumns?.filter((col) => !col.hide)
  }

  const onOpen = (index, e, row, type) => {
    if (type === 'list') {
      props.handleGetData(row?.id)
    }

    setOpen({
      ...open,
      [index]: e,
    })
  }

  /**
   * Handle change order
   * @param {*} param
   */
  const onSortChange = (newSort) => {
    if (typeof props.onSortChange === 'function') {
      setSort(newSort)
      props.onSortChange(newSort)
    }
  }

  const renderCellValue = (cellValue, row) => {
    if (!row) {
      return null
    } else {
      return cellValue
    }
  }

  return (
    <>
      {(title || filters || !hideSetting) && (
        <TopBar
          title={title}
          columns={rawColumns}
          visibleColumns={visibleColumns}
          onApplySetting={handleApplySetting}
          filters={filters}
        />
      )}
      <TableContainer style={{ height: height ? height : '100%' }}>
        <Table className={classes.table} stickyHeader>
          {columns && (
            <TableHead
              classes={classes}
              uniqKey={uniqKey}
              pageSize={pageSize}
              rows={rows}
              order={sort?.order}
              orderBy={sort?.orderBy}
              onSortChange={onSortChange}
              columns={columns}
            />
          )}
          <TableBody>
            {rows &&
              rows?.length > 0 &&
              rows?.map((row, index) => {
                if (!row) return
                const exandable = row?.details?.length > 0

                return (
                  <React.Fragment>
                    <TableRow
                      tabIndex={-1}
                      key={row[uniqKey] || index}
                      className={clsx(
                        classes.tableRow,
                        classes.tableRowBorder,
                        // classes.tableRowHover,
                        'original',
                        {
                          [classes.tableRowSelected]: open[index],
                          [classes.tableRowRootSelected]: open[index] && isRoot,
                        },
                      )}
                    >
                      {columns?.map((column, i) => {
                        const { field, align, renderCell, width } = column
                        const cellValue = renderCell
                          ? renderCell({ row })
                          : row[field]
                        return (
                          <TableCell
                            className={clsx(classes.tableCell, {
                              [classes[`tableCellAlign${align}`]]: align,
                            })}
                            key={`data-table-${field}-${i}`}
                            id={`data-table-${field}-${i}`}
                            width={width}
                          >
                            {i === 0 && exandable && (
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() =>
                                  onOpen(index, !open[index], row, type)
                                }
                                className={classes.toggler}
                              >
                                {open[index] ? <RemoveIcon /> : <AddIcon />}
                              </IconButton>
                            )}
                            {renderCellValue(cellValue, row)}
                          </TableCell>
                        )
                      })}
                    </TableRow>

                    {exandable && (
                      <TableRow className={classes.tableRowCollapse}>
                        <TableCell sx={{ p: 0 }} colSpan={columns.length}>
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
                            <TableCollapse
                              rows={row?.details}
                              columns={subColumns}
                              classes={classes}
                              isRoot={false}
                              hideFooter
                              hideSetting
                              t={t}
                            />
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
          onChange={(newPage, newPageSize) => {
            onPageChange(newPage)
            onPageSizeChange(newPageSize)
          }}
          total={total}
          pageSize={pageSize}
          page={page}
        />
      )}
    </>
  )
}

TableCollapse.defaultProps = {
  onPageChange: () => {},
  onPageSizeChange: () => {},
}

TableCollapse.propsTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()),
  materialColumns: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
      filterable: PropTypes.bool,
      sortable: PropTypes.bool,
      hide: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']), // default left
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']), // default center
      renderCell: PropTypes.func, // renderCell and replace valueGetter
    }),
  ),
  uniqKey: PropTypes.string,
  total: PropTypes.number,
  pageSize: PropTypes.number, // default: 20
  page: PropTypes.number,
  height: PropTypes.number, // default: 500px
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  hideFooter: PropTypes.bool,
  title: PropTypes.string,
  hideSetting: PropTypes.bool,
  filters: PropTypes.shape(),
}
TableCollapse.defaultProps = {
  pageSize: 20,
  page: 1,
  title: '',
  hideSetting: false,
}

export default withTranslation()(withClasses(style)(TableCollapse))