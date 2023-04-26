/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Checkbox, FormHelperText } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import clsx from 'clsx'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import { isEmpty, isEqual } from 'lodash'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import { MODAL_MODE, ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import TopBar from '~/components/DataTable/TopBar'
import { withClasses } from '~/themes'
import { convertUtcDateToLocalTz } from '~/utils'

import Pagination from '../DataTable/Pagination'
import TableHead from '../DataTable/TableHead'
import DateRangePicker from '../DateRangePicker'
import style from '../DataTableCollapse/style'
import Truncate from '../DataTable/Truncate'
import useTableSetting from '~/components/DataTable/hooks/useTableSetting'
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
    additionColums,
    producingStepColumns,
    isRoot,
    type,
    isView,
    mode,
    rootItem,
    parent,
    materialReport,
    materialColumns,
    bomChange,
    parentRows,
    parentPlanFrom,
    parentPlanTo,
    rows,
    page,
    pageSize,
    title,
    hideSetting,
    onPageChange,
    onPageSizeChange,
    filters,
    tableSettingKey,
    onSettingChange,
    enableResizable,
    onSelectionChange,
    selected,
    onRowsOrderChange,
  } = props

  const [open, setOpen] = useState({})
  const [sort, setSort] = useState(null)
  const [visibleColumns, setVisibleColumns] = useState([])
  const containerRef = useRef(null)
  const uniqKey = props.uniqKey ?? 'id'
  const { initTableSetting } = useTableSetting(tableSettingKey)
  const checkboxSelection = typeof onSelectionChange === 'function'
  const reorderable = typeof onRowsOrderChange === 'function'
  const columns = hideSetting
    ? rawColumns?.filter((col) => !col.hide)
    : rawColumns.filter((col) => visibleColumns.includes(col.field))

  const onOpen = (index, o, row, type) => {
    if (type === 'list' && !open[index]) {
      props.handleGetData(row?.id)
    }

    setOpen({
      ...open,
      [index]: o,
    })
  }
  /**
   * Handle select all
   * @param {*} event
   */
  const handleSelectAllClick = (event) => {
    if (!checkboxSelection) return
    if (event.target.checked) {
      console.log('aaa')
      const concatSelected = [...selected, ...rows]
      console.log('concatSelected', concatSelected)
      const uniqueIndexValues = [
        ...new Set(concatSelected.map((item) => item[uniqKey])),
      ]
      console.log('uniqueIndexValues', uniqueIndexValues)

      const newSelected = uniqueIndexValues.map((indexValue) =>
        concatSelected.find((item) => item[uniqKey] === indexValue),
      )
      console.log('newSelected', newSelected)
      onSelectionChange(newSelected)
    } else {
      console.log('dđ')
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

  const onChangeDate = (rawDate, isFrom, row) => {
    let where = isFrom ? 'planFrom' : 'planTo'
    let date = new Date(rawDate).toISOString()
    bomChange.map((i) => {
      if (row?.bom) {
        if (row?.bom?.id === i?.bomId) i[where] = date
      } else {
        if (i?.bomId === row?.parentBomId) {
          i?.producingSteps.map((p) => {
            if (p?.id === row?.id || p?.id === row?.producingStep?.id)
              p[where] = date
          })
        }
      }
    })

    if (mode === MODAL_MODE.CREATE) {
      parentRows.map((i) => {
        if (row?.bom) {
          if (isRoot) {
            if (i?.bom?.id === row?.bom?.id) i[where] = date
          } else if (i?.bom?.id === row?.parentBomId) {
            i.subBom.forEach((item) => {
              if (item?.bom?.id === row?.bom?.id) item[where] = date
            })
          }
        } else {
          if (i?.bom?.id === row?.parentBomId) {
            i?.routing?.producingSteps.forEach((p) => {
              if (p?.id === row?.id) p[where] = date
            })
          }
        }
      })
    } else {
      parentRows.map((i) => {
        if (row?.bom) {
          if (isRoot) {
            if (i?.bom?.id === row?.bom?.id) i.planBom[where] = date
          } else if (i?.bom?.id === row?.parentBomId) {
            i.subBom.forEach((item) => {
              if (item?.bom?.id === row?.bom?.id) item.planBom[where] = date
            })
          }
        } else {
          if (row?.parentBomId === i?.bom?.id) {
            i?.planBom?.producingStep.forEach((p) => {
              if (p?.producingStep?.id === row?.producingStep?.id)
                p.workOrders[0][where] = date
            })
          }
        }
      })
    }

    props.parent.setState({
      bomChange,
      parentRows,
    })
  }

  const renderSpecialField = (field, index, cellValue, row, mode, isRoot) => {
    if (!row) return null
    const { routing, planBom } = row
    if (field === 'planDate') {
      let planFrom = convertUtcDateToLocalTz(row?.planFrom)
      let planTo = convertUtcDateToLocalTz(row?.planTo)
      if (mode !== MODAL_MODE.CREATE && !row?.isProducingStep) {
        planFrom = convertUtcDateToLocalTz(row?.planBom?.planFrom)
        planTo = convertUtcDateToLocalTz(row?.planBom?.planTo)
      } else if (mode !== MODAL_MODE.CREATE && row?.isProducingStep) {
        planFrom = convertUtcDateToLocalTz(row?.workOrders[0]?.planFrom)
        planTo = convertUtcDateToLocalTz(row?.workOrders[0]?.planTo)
      }
      let prevPlanFrom = null
      let prevPlanTo = null
      if (row?.isProducingStep) {
        let res = null
        if (row?.producingStep) {
          res = rows.find((p) => p?.producingStep.id === row?.producingStep.id)
        } else {
          res = rows.find((p) => p?.id === row?.id)
        }
        const prevRow = rows[rows.indexOf(res) - 1]
        if (prevRow && mode === MODAL_MODE.CREATE) {
          prevPlanFrom = prevRow.planFrom
          prevPlanTo = prevRow.planTo
        } else if (prevRow && mode !== MODAL_MODE.CREATE) {
          prevPlanFrom = prevRow.workOrders[0].planFrom
          prevPlanTo = prevRow.workOrders[0].planTo
        }
      }

      const shouldDisableDate = (date) => {
        return (
          (parentPlanFrom && isBefore(date, new Date(parentPlanFrom))) ||
          (parentPlanTo && isAfter(date, new Date(parentPlanTo)))
        )
      }

      return (
        <>
          {mode === MODAL_MODE.DETAIL ? (
            planFrom + ' - ' + planTo
          ) : (
            <DateRangePicker
              value={[planFrom || null, planTo || null]}
              onChange={(value) => {
                onChangeDate(value[0], true, row)
                onChangeDate(value[1], false, row)
              }}
              shouldDisableDate={shouldDisableDate}
              // isDisabled={mode === MODAL_MODE.DETAIL}
            />
          )}

          {/* check isValid to show messages */}
          {prevPlanFrom &&
            isBefore(new Date(planFrom || null), new Date(prevPlanFrom)) && (
              <FormHelperText error>
                {t('form.minDate', {
                  from: convertUtcDateToLocalTz(prevPlanFrom),
                })}
              </FormHelperText>
            )}
          {/* check isValid to show messages */}
          {prevPlanTo &&
            isBefore(new Date(planTo || null), new Date(prevPlanTo)) && (
              <FormHelperText error>
                {t('form.maxDateBigger', {
                  from: convertUtcDateToLocalTz(prevPlanTo),
                })}
              </FormHelperText>
            )}
        </>
      )
    } else {
      return <Truncate value={cellValue} classes={classes} />
    }
  }

  /**
   * handle
   */
  const handleDataProducingStep = (row, index) => {
    if (!row) return []
    let producingSteps = []
    if (row?.planBom) producingSteps = row?.planBom?.producingSteps
    //@Change 31/03/2022: vì BE MESx đổi API row?.planBom?.producingStep -> row?.planBom?.producingSteps
    else if (row?.producingSteps) producingSteps = row?.producingSteps
    else if (row?.routing?.producingSteps)
      producingSteps = row?.routing?.producingSteps
    return producingSteps?.map((p) => {
      p.quantity = row?.planBom ? row?.planBom?.quantity : row.quantity
      p['data'] = {
        subItemName: row?.item?.name,
        rootItemId: props.rootItem || row?.item?.id,
        itemId: row?.item?.id,
        routing: row?.routing?.id,
        id: row?.planBom?.boqPlanId,
        bomId: row?.planBom?.bomId,
      }
      Object.assign(p, { isProducingStep: true })
      return p
    })
  }

  useEffect(() => {
    initTableSetting(rawColumns)
  }, [rawColumns])

  return (
    <>
      {(title || filters || !hideSetting) && (
        <TopBar
          title={title}
          columns={rawColumns}
          visibleColumns={visibleColumns}
          filters={filters}
          selected={selected}
          uniqKey={uniqKey}
          tableSettingKey={tableSettingKey}
          setVisibleColumns={setVisibleColumns}
          onSettingChange={onSettingChange}
        />
      )}
      <TableContainer
        ref={containerRef}
        className={classes.tableContainer}
        style={{ height: height ? height : '100%' }}
        {...(isRoot ? { ref: containerRef } : {})}
      >
        <Table
          className={classes.table}
          stickyHeader
          sx={enableResizable ? { tableLayout: 'fixed', width: '100%' } : {}}
        >
          <TableHead
            uniqKey={uniqKey}
            classes={classes}
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
            reorderable={reorderable}
            onRowsOrderChange={onRowsOrderChange}
          >
            {rows &&
              rows.length > 0 &&
              rows.map((row, index) => {
                const isItemSelected = isSelected(row[uniqKey])
                const labelId = `enhanced-table-checkbox-${index}`
                if (!row) return
                let ps = []
                if (
                  //@Change 31/03/2022: vì BE MESx đổi API row?.planBom?.producingStep -> row?.planBom?.producingSteps
                  row?.planBom?.producingSteps ||
                  row?.producingSteps ||
                  row?.routing?.producingSteps
                ) {
                  ps = handleDataProducingStep(row, index)
                }
                let rowData = []
                let rowMaterial = []

                if (row?.subBoms && materialReport) {
                  if (!!row?.subBoms[0]?.producingSteps && materialReport) {
                    rowMaterial = row?.subBom ? row?.subBom : row?.subBoms
                  } else {
                    rowData = row?.subBom ? row?.subBom : row?.subBoms
                  }
                } else {
                  rowData = row?.subBom ? row?.subBom : row?.subBoms
                }

                return (
                  <React.Fragment>
                    <TableRow
                      index={index}
                      tabIndex={-1}
                      key={row[uniqKey] || index}
                      aria-checked={isItemSelected}
                      reorderable={reorderable}
                      draggableId={row[uniqKey]?.toString()}
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
                      {columns.map((column, i) => {
                        const { field, align, renderCell, width } = column
                        const cellValue = renderCell
                          ? renderCell(
                              { row, parentIndex: index, childIndex: i },
                              i,
                            )
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
                            {i === 0 &&
                            (!isEmpty(ps) ||
                              rowData?.length > 0 ||
                              rowMaterial?.length > 0 ||
                              isRoot) ? (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                }}
                              >
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

                                {renderSpecialField(
                                  field,
                                  index,
                                  cellValue,
                                  row,
                                  mode,
                                  isRoot,
                                )}
                              </Box>
                            ) : (
                              renderSpecialField(
                                field,
                                index,
                                cellValue,
                                row,
                                mode,
                                isRoot,
                              )
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                    {!isEmpty(ps) && (
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
                              enableResizable={false}
                              rows={ps}
                              rootItem={isRoot ? row?.item?.id : rootItem}
                              collectData={props.collectData}
                              columns={producingStepColumns}
                              parentPlanFrom={
                                row?.planFrom
                                  ? row?.planFrom
                                  : row?.planBom?.planFrom
                              }
                              parentPlanTo={
                                row?.planTo ? row?.planTo : row?.planBom?.planTo
                              }
                              isView={true}
                              mode={mode}
                              classes={classes}
                              isRoot={false}
                              hideFooter
                              hideSetting
                              validator={props.validator}
                              t={t}
                              bomChange={
                                bomChange?.length > 0 ? bomChange : null
                              }
                              parent={parent ? parent : null}
                              parentRows={rows}
                            />
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                    {rowData?.length > 0 && (
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
                              enableResizable={false}
                              rows={rowData}
                              collectData={props.collectData}
                              columns={
                                type === 'list' ? additionColums : columns
                              }
                              rootItem={isRoot ? row?.item?.id : rootItem}
                              additionColums={additionColums}
                              producingStepColumns={producingStepColumns}
                              materialColumns={materialColumns}
                              initBomChange={props.initBomChange}
                              parentPlanFrom={
                                row?.planFrom
                                  ? row?.planFrom
                                  : row?.planBom?.planFrom
                              }
                              parentPlanTo={
                                row?.planTo ? row?.planTo : row?.planBom?.planTo
                              }
                              mode={mode}
                              classes={classes}
                              isView={isView}
                              isRoot={false}
                              hideFooter
                              hideSetting
                              validator={props.validator}
                              t={t}
                              materialReport={materialReport}
                              parent={parent ? parent : null}
                              bomChange={
                                bomChange?.length > 0 ? bomChange : null
                              }
                              parentRows={rows}
                            />
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                    {rowMaterial?.length > 0 && (
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
                              enableResizable={false}
                              rows={rowMaterial}
                              collectData={props.collectData}
                              columns={materialColumns}
                              rootItem={isRoot ? row?.item?.id : rootItem}
                              producingStepColumns={producingStepColumns}
                              initBomChange={props.initBomChange}
                              t={t}
                              mode={mode}
                              classes={classes}
                              isView={isView}
                              isRoot={false}
                              hideFooter
                              hideSetting
                              validator={props.validator}
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

TableCollapse.defaultProps = {
  onPageChange: () => {},
  onPageSizeChange: () => {},
  pageSize: ROWS_PER_PAGE_OPTIONS[0],
  page: 1,
  title: '',
  hideSetting: false,
  onSettingChange: () => {},
  enableResizable: false,
  isRoot: true,
  selected: [],
}

TableCollapse.propsTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
      filterable: PropTypes.bool,
      sortable: PropTypes.bool,
      hide: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
      renderCell: PropTypes.func,
    }),
  ),
  uniqKey: PropTypes.string,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  height: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  hideFooter: PropTypes.bool,
  title: PropTypes.string,
  hideSetting: PropTypes.bool,
  filters: PropTypes.shape(),
  tableSettingKey: PropTypes.string,
  onSettingChange: PropTypes.func,
  enableResizable: PropTypes.bool,
  isRoot: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  selected: PropTypes.array,
  onRowsOrderChange: PropTypes.func,
}

export default withTranslation()(withClasses(style)(TableCollapse))
