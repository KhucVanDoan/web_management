/* eslint-disable */

import React from 'react'

import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Box from '@mui/material/Box'
import { withStyles } from '@mui/styles'
import { getItems } from 'modules/mesx/redux/actions/common.action'
import { normalizeDecimal } from 'utils'
import useStyles from './style'

import { MODAL_MODE } from 'common/constants'
import DataTable from 'components/DataTable'

class ItemSettingTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 5,
      page: 1,
    }
  }
  getColumns = () => {
    const { t } = this.props
    return [
      {
        field: 'id',
        headerName: t('requestBuyMaterial.item.orderNumber'),
        width: 60,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          return params.row?.id + 1
        },
      },
      {
        field: 'itemCode',
        headerName: t('requestBuyMaterial.item.code'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
      },
      {
        field: 'itemName',
        headerName: t('requestBuyMaterial.item.name'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'itemType',
        headerName: t('requestBuyMaterial.item.type'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { itemList } = this.props
          const { itemId } = params.row
          return itemList.find((i) => i.id === itemId)?.itemType?.name
        },
      },
      {
        field: 'quantity',
        headerName: t('requestBuyMaterial.item.quantity'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
      },
      {
        field: 'unitType',
        headerName: t('requestBuyMaterial.item.unitType'),
        width: 100,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { itemId } = params.row
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return <>{this.getItemObject(itemId)?.itemUnit?.name || ''}</>
        },
      },
    ]
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
   * Refresh init data
   */
  refreshData = () => {
    this.props.getItems({})
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
      <>
        <Box width={8 / 8}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h3>
              {t('requestBuyMaterial.itemsDetails')}
              <span className={classes.required}> *</span>
            </h3>
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
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  itemList: state.commonManagement.itemList,
})

const mapDispatchToProps = {
  getItems,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ItemSettingTable)),
)
