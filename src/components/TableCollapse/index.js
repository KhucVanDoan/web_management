/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, FormHelperText } from '@mui/material'
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
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import { MODAL_MODE, DATE_FORMAT } from '~/common/constants'
import useTableSetting from '~/components/DataTable/hooks/useTableSetting'
import TopBar from '~/components/DataTable/TopBar'
import { formatDateTimeUtc } from '~/utils'

import Pagination from '../DataTable/Pagination'
import TableHead from '../DataTable/TableHead'
import { withClasses } from '~/themes'
import DateRangePicker from '../DateRangePicker'
import style from './style'

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
  } = props

  const [open, setOpen] = useState({})
  const [sort, setSort] = useState(null)
  const [visibleColumns, setVisibleColumns] = useState([])
  const { tableSetting, updateTableSetting } = useTableSetting(tableSettingKey)
  const indexCol = props.indexCol || 'id'

  const handleApplySetting = useCallback((cols = []) => {
    setVisibleColumns(cols)

    if (!hideSetting) {
      updateTableSetting(cols)
    }
  }, [])

  useEffect(() => {
    if (!isRoot) return

    const initVisibleColumns =
      (!hideSetting && tableSetting) ||
      (rawColumns || []).reduce((acc, cur) => {
        if (!cur.hide) return [...acc, cur.field]
        return acc
      }, [])

    handleApplySetting(initVisibleColumns)
  }, [rawColumns, handleApplySetting])

  let columns = []
  if (isRoot) {
    columns = rawColumns.filter((col) => visibleColumns.includes(col.field))
  } else {
    columns = rawColumns.filter((col) => !col.hide)
  }

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
   * Handle change order
   * @param {*} param
   */
  const onChangeSort = (newSort) => {
    if (typeof props.onChangeSort === 'function') {
      setSort(newSort)
      props.onChangeSort(newSort)
    }
  }

  //@ not used
  // const onChangeItem = (i, value, row) => {
  //   this.setState({
  //     fake: this.state.quantity,
  //     quantity: {
  //       ...this.state.quantity,
  //       [i]: value,
  //     },
  //   })
  //   props.collectData(row, value, 'quantity', i)
  // }

  // const changeRoutingVersion = (e, i, row) => {
  //   const { routingVersions } = row?.routing
  //   const { producingSteps } = this.state
  //   const check = routingVersions.find((r) => r.id === e.target.value)
  //   if (check) {
  //     const newPs = check?.producingSteps
  //     const { actualQuantity, item } = row
  //     newPs.map((p) => {
  //       p['quantity'] = row?.quantity
  //       p['planQuantity'] = parseInt(actualQuantity)
  //       p['unit'] = item?.itemUnit
  //       p['bomId'] = row?.bom?.id
  //       p['boqDetailId'] = row?.boqDetailId
  //       p['isProducingStep'] = true
  //     })
  //     producingSteps[i] = newPs
  //     this.setState({
  //       producingSteps,
  //       routingId: {
  //         ...this.state.routingId,
  //         [i]: e.target.value,
  //       },
  //     })
  //   }
  //   props.collectData(row, e.target.value, 'routingId', i)
  // }

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
      let planFrom = formatDateTimeUtc(row?.planFrom, DATE_FORMAT)
      let planTo = formatDateTimeUtc(row?.planTo, DATE_FORMAT)
      if (mode !== MODAL_MODE.CREATE && !row?.isProducingStep) {
        planFrom = formatDateTimeUtc(row?.planBom?.planFrom, DATE_FORMAT)
        planTo = formatDateTimeUtc(row?.planBom?.planTo, DATE_FORMAT)
      } else if (mode !== MODAL_MODE.CREATE && row?.isProducingStep) {
        planFrom = formatDateTimeUtc(row?.workOrders[0]?.planFrom, DATE_FORMAT)
        planTo = formatDateTimeUtc(row?.workOrders[0]?.planTo, DATE_FORMAT)
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
                  from: formatDateTimeUtc(prevPlanFrom, DATE_FORMAT),
                })}
              </FormHelperText>
            )}
          {/* check isValid to show messages */}
          {prevPlanTo &&
            isBefore(new Date(planTo || null), new Date(prevPlanTo)) && (
              <FormHelperText error>
                {t('form.maxDateBigger', {
                  from: formatDateTimeUtc(prevPlanTo, DATE_FORMAT),
                })}
              </FormHelperText>
            )}
        </>
      )
    } else {
      return cellValue
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
              indexCol={indexCol}
              pageSize={pageSize}
              rows={rows}
              order={sort?.order}
              orderBy={sort?.orderBy}
              onChangeSort={onChangeSort}
              columns={columns}
            />
          )}
          <TableBody>
            {rows &&
              rows.length > 0 &&
              rows.map((row, index) => {
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
                      tabIndex={-1}
                      key={row[indexCol]}
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
                      {columns.map((column, i) => {
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
      align: PropTypes.oneOf(['left', 'center', 'right']), // default left
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']), // default center
      renderCell: PropTypes.func, // renderCell and replace valueGetter
    }),
  ),
  indexCol: PropTypes.string,
  total: PropTypes.number,
  pageSize: PropTypes.number, // default: 20
  page: PropTypes.number,
  height: PropTypes.number, // default: 500px
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onChangeFilter: PropTypes.func,
  hideFooter: PropTypes.bool,
  title: PropTypes.string,
  hideSetting: PropTypes.bool,
  filters: PropTypes.shape(),
  tableSettingKey: PropTypes.string,
}
TableCollapse.defaultProps = {
  pageSize: 20,
  page: 1,
  title: '',
  hideSetting: false,
}

export default withTranslation()(withClasses(style)(TableCollapse))
