/* eslint-disable  */

import React from 'react'

import { RemoveCircleOutlined } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Autocomplete,
} from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { MODAL_MODE, NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { ORDER_STATUS, STAGES_OPTION } from '~/modules/mesx/constants'
import {
  getItems,
  getWarehouses,
  getItemQualityPoint,
} from '~/modules/mesx/redux/actions/common'
import { getSaleOrderDetailsById } from '~/modules/mesx/redux/actions/sale-order'
import { normalizeDecimal, scrollToBottom } from '~/utils'

import style from './style'

class ItemSettingTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 5,
      page: 1,
      maxQuantity: 1,
    }
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.refreshData()
  }

  componentDidUpdate(prevProps, prevState) {
    // force datagrid update
    if (prevProps.isSubmitForm !== this.props.isSubmitForm) {
      const items = JSON.parse(JSON.stringify(this.props.items))
      this.props.parent.setState({ items })
    }
  }

  /**
   * Get columns
   */
  getColumns = () => {
    const { t } = this.props

    return [
      {
        field: 'id',
        headerName: t('soExport.item.orderNumber'),
        width: 80,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          return params.row?.id + 1
        },
      },
      {
        field: 'code',
        headerName: t('soExport.item.code'),
        width: 180,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {
          const { itemId, id, warehouseId } = params.row
          const { isSubmitForm, items, itemList, classes, itemIds } = this.props
          const itemListFilter = itemList.filter((i) => itemIds?.includes(i.id))
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{this.getItemObject(itemId)?.code || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`code${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <Autocomplete
                  className={classes.displayFlex}
                  size="small"
                  variant="outlined"
                  options={itemListFilter}
                  value={this.getItemObject(itemId) || {}}
                  getOptionLabel={(option) => option?.code}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  renderOption={(option, { selected }) => {
                    return <React.Fragment>{option?.code}</React.Fragment>
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  onChange={(event, value) => {
                    if (value?.id) {
                      const { itemSO } = this.props
                      this.props.getSaleOrderDetailsById(itemSO?.id, (res) => {
                        const quantity = res?.saleOrderDetails.find(
                          (i) => i.itemId === value?.id,
                        )?.quantity
                        this.onChangeItem(id, 'itemId', value?.id)
                        this.onChangeItem(id, 'quantity', quantity)
                        this.setState({
                          maxQuantity: quantity,
                        })
                      })
                    } else {
                      this.onChangeItem(id, 'itemId', '')
                      this.onChangeItem(id, 'quantity', 1)
                      this.setState({
                        maxQuantity: 1,
                      })
                    }
                  }}
                  getOptionDisabled={(option) => {
                    return (
                      items.filter((item) => item?.itemId === option?.id)
                        .length === 2 ||
                      (items.find((item) => item?.itemId === option?.id)
                        ?.warehouseId === warehouseId &&
                        !!warehouseId) ||
                      (items.find((item) => item?.itemId === option?.id) &&
                        !warehouseId)
                    )
                  }}
                  openOnFocus
                  disabled={isView}
                />
                {/* check isValid to show messages */}
                {isSubmitForm &&
                  !this.props.parent.validator.check(itemId, `required`) && (
                    <FormHelperText error>{t('form.required')}</FormHelperText>
                  )}
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'itemName',
        headerName: t('soExport.item.name'),
        width: 180,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const id = params.row?.id
          const itemId = params.row?.itemId
          const { classes } = this.props
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{this.getItemObject(itemId)?.name || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`itemName${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  value={this.getItemObject(itemId)?.name || ''}
                  variant="outlined"
                  disabled={true}
                  margin="dense"
                ></TextField>
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'itemType',
        headerName: t('soExport.item.type'),
        width: 180,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, itemId } = params.row
          const { classes } = this.props
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{this.getItemObject(itemId)?.itemType?.name || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`itemType${id}`}>
              <FormControl
                size="small"
                fullWidth
                className={classes.displayFlex}
              >
                <TextField
                  value={this.getItemObject(itemId)?.itemType?.name || ''}
                  variant="outlined"
                  disabled={true}
                  margin="dense"
                ></TextField>
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'warehouseName',
        headerName: t('soExport.item.warehouseName'),
        width: 180,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, warehouseId, itemId } = params.row
          const { warehouseList, classes, isSubmitForm, items } = this.props
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{this.getWarehouseObject(warehouseId)?.name || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`warehouseName${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <Autocomplete
                  className={classes.displayFlex}
                  size="small"
                  variant="outlined"
                  options={warehouseList}
                  value={this.getWarehouseObject(warehouseId) || {}}
                  getOptionLabel={(option) => option?.name}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  renderOption={(option, { selected }) => {
                    return <React.Fragment>{option?.name}</React.Fragment>
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                  onChange={(event, value) =>
                    this.onChangeItem(id, 'warehouseId', value?.id)
                  }
                  getOptionDisabled={(option) => {
                    return (
                      items.find((i) => i.itemId === itemId).warehouseId ===
                      option?.id
                    )
                  }}
                  openOnFocus
                  disabled={isView}
                />
                {/* check isValid to show messages */}
                {isSubmitForm &&
                  !this.props.parent.validator.check(
                    warehouseId,
                    `required`,
                  ) && (
                    <FormHelperText error>{t('form.required')}</FormHelperText>
                  )}
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'warehouseType',
        headerName: t('soExport.item.warehouseType'),
        width: 250,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, warehouseId } = params.row
          const { classes } = this.props
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{this.getWarehouseTypeNames(warehouseId) || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`warehouseType${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  value={this.getWarehouseTypeNames(warehouseId) || ''}
                  variant="outlined"
                  disabled={true}
                  margin="dense"
                ></TextField>
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'quantity',
        headerName: t('soExport.item.quantity'),
        width: 180,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        renderCell: (params) => {
          const { id, quantity } = params.row
          const { isSubmitForm, classes } = this.props
          const { maxQuantity } = this.state
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL

          return isView ? (
            <>{+quantity}</>
          ) : (
            <Box flex={1} alignItems="center" key={`quantity${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  name="quantity"
                  value={+quantity}
                  variant="outlined"
                  onChange={(event) =>
                    this.onChangeItem(id, 'quantity', +event.target.value)
                  }
                  inputProps={{
                    min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                    max: maxQuantity,
                  }}
                  type="number"
                  disabled={isView}
                  margin="dense"
                />
                {/* check isValid to show messages */}
                {isSubmitForm &&
                  !this.props.parent.validator.check(quantity, `required`) && (
                    <FormHelperText error>{t('form.required')}</FormHelperText>
                  )}
                {isSubmitForm &&
                  !this.props.parent.validator.check(
                    quantity,
                    `numeric|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN},num`,
                  ) && (
                    <FormHelperText error>
                      {t('form.greaterThanZero')}
                    </FormHelperText>
                  )}
                {isSubmitForm &&
                  !this.props.parent.validator.check(
                    quantity,
                    `numeric|max:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX},num`,
                  ) && (
                    <FormHelperText error>
                      {t('form.maxNumber', {
                        max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
                      })}
                    </FormHelperText>
                  )}
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'remainQuantity',
        headerName: t('soExport.item.remainQuantity'),
        width: 180,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        hide: ![
          ORDER_STATUS.IN_PROGRESS,
          ORDER_STATUS.APPROVED,
          ORDER_STATUS.COMPLETED,
        ].includes(this.props.parent.state.status),
        renderCell: (params) => {
          const { quantity, actualQuantity } = params.row
          return +quantity - actualQuantity
        },
      },
      {
        field: 'actualQuantity',
        headerName: t('soExport.item.actualQuantity'),
        width: 180,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        hide: ![
          ORDER_STATUS.IN_PROGRESS,
          ORDER_STATUS.APPROVED,
          ORDER_STATUS.COMPLETED,
        ].includes(this.props.parent.state.status),
        renderCell: (params) => {
          const { actualQuantity } = params.row
          return +actualQuantity
        },
      },
      {
        field: 'unitType',
        headerName: t('soExport.item.unitType'),
        width: 180,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, itemId } = params.row
          const { classes } = this.props
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{this.getItemObject(itemId)?.itemUnit?.name || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`unitType${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  value={this.getItemObject(itemId)?.itemUnit?.name || ''}
                  variant="outlined"
                  disabled={true}
                  margin="dense"
                ></TextField>
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'qcCheck',
        headerName: t('soExport.item.qcCheck'),
        width: 50,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, qcCheck, itemId, warehouseId } = params.row
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          const { items } = this.props.parent.state
          const find = items.find(
            (e) => e.itemId === itemId && e.warehouseId === warehouseId,
          )

          return (
            <FormControlLabel
              key={`qcCheck${id}`}
              control={
                <Checkbox
                  checked={find?.qcCheck || qcCheck}
                  onChange={(event) =>
                    this.onChangeItem(id, 'qcCheck', event.target.checked)
                  }
                  name="qcCheck"
                  color="primary"
                  disabled={isView}
                />
              }
            />
          )
        },
      },
      {
        field: 'qcCriteria',
        headerName: t('soExport.item.qcCriteria'),
        width: 180,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { qcCheck, itemId } = params.row
          const { items } = this.props.parent.state
          const find = items.find((e) => e.itemId === itemId)
          return qcCheck && find !== undefined ? find?.qcCriteria : ''
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        hide: this.props.parent.state.mode === MODAL_MODE.DETAIL,
        renderCell: (params) => {
          const { classes, items } = this.props
          const { id } = params.row
          const hide = this.props.parent.state.mode === MODAL_MODE.DETAIL
          return hide ? null : (
            <IconButton
              type="button"
              className={classes.iconButton}
              onClick={() => this.onRemoveProduct(id)}
              disabled={items?.length === 1}
              size="large"
            >
              <RemoveCircleOutlined />
            </IconButton>
          )
        },
      },
    ]
  }

  /**
   * Refresh init data
   */
  refreshData = () => {
    this.props.getItems({})
    this.props.getWarehouses({})
  }

  /**
   * Add item
   */
  onAddItem = (e, i) => {
    const { items } = this.props
    this.props.parent.setState(
      {
        items: [
          ...items,
          {
            id: items.length,
            itemId: null,
            quantity: 1,
            qcCriteria: '',
            qcCheck: false,
            qcCriteriaId: '',
          },
        ],
      },
      scrollToBottom,
    )
    const { pageSize, page } = this.state
    // If is the end of page
    if (items?.length % pageSize === 0) {
      this.setState({ page: page + 1 })
    }
  }

  /**
   * Remove product
   * @param {int} id
   */
  onRemoveProduct = (id) => {
    const items = [...this.props.items]
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index }))
    this.props.parent.setState({ items })
  }

  /**
   * Get item object with code, name...
   * @param {int} id
   * @returns
   */
  getItemObject = (id) => {
    const { itemList } = this.props
    return itemList?.find((item) => item?.id === id)
  }

  /**
   * Get warehouse object with code, name...
   * @param {int} id
   * @returns
   */
  getWarehouseObject = (id) => {
    const { warehouseList } = this.props
    return warehouseList?.find((item) => item?.id === id)
  }

  /**
   * getWarehouseTypeNames by warehouseId
   * @param {int} warehouseId
   * @returns
   */
  getWarehouseTypeNames = (warehouseId) => {
    const { warehouseList, warehouseTypes } = this.props
    const warehouse = warehouseList?.find((item) => item?.id === warehouseId)

    return warehouse?.warehouseTypes?.length > 0
      ? warehouse?.warehouseTypes
          ?.map(
            (warehouseType) =>
              warehouseTypes?.find((item) => item?.id === warehouseType?.id)
                ?.name,
          )
          ?.join(', ')
      : ''
  }

  /**
   *
   * @param {int} index
   * @param {string} key
   * @param {*} value
   */
  onChangeItem = (index, key, value) => {
    if (key === 'quantity') {
      value = normalizeDecimal(value)
    }
    if (!value) {
      value = null
    }
    const items = [...this.props.items]
    const itemToChange = items[index]
    if (key === 'itemId') {
      itemToChange['qcCheck'] = false
    }
    if (key === 'qcCheck' && value) {
      const filterData = [
        {
          column: 'itemId',
          text: `${itemToChange?.itemId}`,
        },
        {
          column: 'stageId',
          text: `${STAGES_OPTION.SO_EXPORT}`,
        },
      ]

      const params = {
        page: 1,
        limit: 20,
        filter: JSON.stringify(filterData),
      }
      this.props.getItemQualityPoint(params, (data) => {
        if (data?.items) {
          const itemQuality = data?.items[0]
          itemToChange['qcCriteria'] = itemQuality?.name
          itemToChange['qcCriteriaId'] = itemQuality?.id
          items[index] = itemToChange
          this.props.parent.setState((prevState) => ({
            items: [...items.map((a) => Object.assign({}, a))],
          }))
        }
      })
    }

    itemToChange[key] = value
    items[index] = itemToChange
    this.props.parent.setState((prevState) => ({
      items: [...items.map((a) => Object.assign({}, a))],
    }))
  }
  /**
   *
   * @param {int} pageSize
   */
  onPageSizeChange = ({ pageSize }) => {
    this.setState({ pageSize })
  }

  /**
   *
   * @param {int} page
   */
  onPageChange = ({ page }) => {
    this.setState({ page })
  }

  render() {
    const { items, t, classes } = this.props
    const { mode } = this.props.parent.state
    const isView = mode === MODAL_MODE.DETAIL
    return (
      <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h3>
            {t('soExport.itemsDetails')}
            <span className={classes.required}> *</span>
          </h3>
          <Box>
            {!isView && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.onAddItem}
              >
                {t('soExport.item.addItem')}
              </Button>
            )}
          </Box>
        </Box>
        <DataTable
          rows={items}
          pageSize={20}
          page={1}
          columns={this.getColumns()}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={items.length}
          hideFooter
        />
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  itemList: state.commonManagement.itemList,
  warehouseList: state.commonManagement.warehouseList,
  warehouseTypes: state.appStore.warehouseTypes,
})

const mapDispatchToProps = {
  getItems,
  getWarehouses,
  getItemQualityPoint,
  getSaleOrderDetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(style)(ItemSettingTable)),
)
