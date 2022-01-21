/* eslint-disable no-param-reassign */
import React from 'react'

import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
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
      pageSize: 20,
      page: 1,
      items: [],
      producingStepQuantityTotal: {},
    }
  }

  getColumns = () => {
    const { t, producingStepList } = this.props

    let columns = [
      {
        field: 'id',
        headerName: t('bomProducingStep.material.orderNumber'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          return params.row?.id + 1
        },
      },
      {
        field: 'materialName',
        headerName: t('bomProducingStep.material.name'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'materialCode',
        headerName: t('bomProducingStep.material.code'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'total',
        headerName: t('bomProducingStep.material.total'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'unit',
        headerName: t('bomProducingStep.material.unit'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
      },
    ]

    if (producingStepList) {
      producingStepList.forEach((i) => {
        columns.push({
          field: 'quantity',
          headerName: i.producingStep.name,
          sortable: false,
          filterable: false,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => {
            const { mode } = this.props
            const { producingSteps, index } = params.row
            if (!producingSteps) return 0
            const isView = mode === MODAL_MODE.DETAIL
            return isView ? (
              producingSteps[i.producingStep.name]
            ) : (
              <TextField
                name={i.producingStep.name}
                id={i.producingStep.name}
                value={producingSteps[i.producingStep.name]}
                margin="dense"
                variant="outlined"
                size="small"
                onChange={(event) =>
                  this.onChangeProducingStepQuantity(event, index)
                }
                inputProps={{ maxLength: 20 }}
                disabled={isView}
                type="number"
              />
            )
          },
        })
      })
    }
    return columns
  }

  onChangeProducingStepQuantity = (event, index) => {
    const { producingStepQuantityTotal, items } = this.state
    const producingStepName = event.currentTarget.name
    const value = event.target.value
    const materialCode = items[index].materialCode
    const currentTotal =
      parseInt(producingStepQuantityTotal[materialCode]) +
      parseInt(items[index].producingSteps[producingStepName])

    if (!value) {
      producingStepQuantityTotal[materialCode] += parseInt(
        items[index].producingSteps[producingStepName],
      )
      items[index].producingSteps[producingStepName] = 0
      this.setState(
        {
          items,
          producingStepQuantityTotal,
        },
        () => {
          this.props.parent.setState({
            items,
          })
        },
      )
      return
    }

    if (value < currentTotal) {
      producingStepQuantityTotal[materialCode] =
        parseInt(items[index].producingSteps[producingStepName]) -
        parseInt(value) +
        parseInt(producingStepQuantityTotal[materialCode])
      items[index].producingSteps[producingStepName] = value
    } else if (value >= currentTotal) {
      items[index].producingSteps[producingStepName] = currentTotal
      producingStepQuantityTotal[materialCode] = 0
    }

    this.setState(
      {
        items,
        producingStepQuantityTotal,
      },
      () => {
        this.props.parent.setState({
          items,
        })
      },
    )
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

    if (prevProps.items !== this.props.items) {
      let producingStepQuantityTotal = {}
      this.props.items.forEach((i) => {
        if (
          this.props.parent.state.mode === MODAL_MODE.UPDATE &&
          prevProps.items === []
        ) {
          i = {
            materialCode: i.materialCode,
            total: 0,
          }
        }
        let producingStepTotal = {
          [i.materialCode]: i.total,
        }
        Object.assign(producingStepQuantityTotal, producingStepTotal)
      })

      this.setState({
        producingStepQuantityTotal,
      })

      if (prevProps.items !== []) {
        this.createBOM()
      }
    }
  }

  /**
   * Refresh init data
   */
  refreshData = () => {
    this.props.getItems({})
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

  /**
   * Add item
   */
  createBOM = () => {
    const { items } = this.props
    this.setState({
      items,
    })
  }

  render() {
    const { t, classes } = this.props
    const { mode } = this.props.parent.state
    const { items } = this.state
    const isCreate = mode === MODAL_MODE.CREATE
    return (
      <Box width={8 / 8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h3>
            {t('bomProducingStep.itemsDetails')}
            <span className={classes.required}> *</span>
          </h3>
          <Box>
            {isCreate && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.createBOM}
              >
                {t('bomProducingStep.createBOM')}
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
