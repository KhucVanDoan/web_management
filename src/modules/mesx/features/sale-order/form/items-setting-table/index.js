/* eslint-disable no-param-reassign */

import React from 'react'

import { RemoveCircleOutlined } from '@mui/icons-material'
import { Button, FormHelperText, IconButton, Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import {
  BOM_STATUS,
  DEFAULT_ITEM_TYPE_ENUM,
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import DataTable from '~/components/DataTable'
import {
  getItems,
  getWarehouses,
  getBoms,
} from '~/modules/mesx/redux/actions/common.action'
import { normalizeDecimal, scrollToBottom } from '~/utils'

import useStyles from './style'

class ItemSettingTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 5,
      page: 1,
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
        headerName: '#',
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
        headerName: t('saleOrder.item.code'),
        width: 180,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {
          const { itemId, id } = params.row
          const { isSubmitForm, items, itemList, classes, BOMList } = this.props
          const listBomConfirmed = BOMList.filter(
            (i) => i.status === BOM_STATUS.CONFIRMED,
          ).map((n) => n.itemId)
          const itemListFilter = itemList.filter(
            (n) =>
              listBomConfirmed.includes(n.id) &&
              n?.itemType?.code === DEFAULT_ITEM_TYPE_ENUM.PRODUCT.code,
          )
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
                  onChange={(event, value) =>
                    this.onChangeItem(id, 'itemId', value?.id)
                  }
                  getOptionDisabled={(option) => {
                    return items
                      .map((item) => item?.itemId)
                      .includes(option?.id)
                  }}
                  openOnFocus
                  disabled={isView}
                />
                {/* add rule to validate */}
                {this.props.parent.validator.message(
                  `itemCode${id}`,
                  itemId,
                  `required`,
                )}
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
        headerName: t('saleOrder.item.name'),
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
        field: 'quantity',
        headerName: t('saleOrder.item.quantity'),
        width: 180,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        renderCell: (params) => {
          const { id, quantity } = params.row
          const { isSubmitForm } = this.props
          const { classes } = this.props
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
                  }}
                  type="number"
                  disabled={isView}
                  margin="dense"
                />
                {/* add rule to validate */}
                {this.props.parent.validator.message(
                  `quantity${id}`,
                  quantity,
                  `required|numeric|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN},num|max:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX},num`,
                )}
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
        field: 'unitType',
        headerName: t('saleOrder.item.unitType'),
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
        field: 'itemPrice',
        headerName: t('saleOrder.item.itemPrice'),
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
            <>{this.getItemObject(itemId)?.price || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`itemPrice${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  value={this.getItemObject(itemId)?.price || ''}
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
    this.props.getBoms({ isGetAll: 1 })
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
            warehouseId: null,
            quantity: 1,
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
            {t('saleOrder.itemsDetails')}
            <span className={classes.required}> *</span>
          </h3>
          <Box>
            {!isView && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.onAddItem}
              >
                {t('saleOrder.item.addItem')}
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
  BOMList: state.commonManagement.BOMList,
})

const mapDispatchToProps = {
  getItems,
  getWarehouses,
  getBoms,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ItemSettingTable)),
)
