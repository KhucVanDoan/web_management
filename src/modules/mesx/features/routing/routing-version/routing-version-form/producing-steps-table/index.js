/* eslint-disable no-param-reassign */
import React from 'react'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { isEmpty, orderBy } from 'lodash'
import { connect } from 'react-redux'
import { Button, FormHelperText, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@mui/material'
import { withStyles } from '@mui/styles'
import { getProducingSteps } from 'modules/mesx/redux/actions/common.action'
import { scrollToBottom, redirectRouter } from 'utils'
import useStyles from './style'

import { MODAL_MODE } from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'
import { RemoveCircleOutlined } from '@mui/icons-material'
import DataTable from 'components/DataTable'
import { NUMBER_FIELD_REQUIRED_SIZE } from 'common/constants'

class ProducingStepsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    const { t } = this.props
    // define column for producingSteps grid
    this.itemColumns = [
      {
        field: 'id',
        headerName: t('routingVersion.operation.orderNumber'),
        width: 80,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        hide: this.props.mode !== MODAL_MODE.DETAIL,
        renderCell: (params) => {
          return params.row?.id
        },
      },
      {
        field: 'code',
        headerName: t('routingVersion.operation.code'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {
          const { operationId, id } = params.row
          const { isSubmitForm } = this.props
          const { producingSteps } = this.props
          const { producingList, classes } = this.props
          const { mode } = this.props
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{this.getItemObject(operationId)?.code || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`code${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <Autocomplete
                  className={classes.displayFlex}
                  size="small"
                  variant="outlined"
                  options={producingList}
                  value={this.getItemObject(operationId) || {}}
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
                    this.onChangeItem(id, 'operationId', value?.id)
                  }
                  getOptionDisabled={(option) => {
                    return producingSteps
                      .map((item) => item?.operationId)
                      .includes(option?.id)
                  }}
                  openOnFocus
                  disabled={isView}
                />
                {/* add rule to validate */}
                {this.props.parent.validator.message(
                  `itemCode${id}`,
                  operationId,
                  `required`,
                )}
                {/* check isValid to show messages */}
                {isSubmitForm &&
                  !this.props.parent.validator.check(
                    operationId,
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
        field: 'name',
        headerName: t('routingVersion.operation.name'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const id = params.row?.id
          const operationId = params.row?.operationId
          const { classes } = this.props
          const { mode } = this.props
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{this.getItemObject(operationId)?.name || ''}</>
          ) : (
            <Box flex={1} alignItems="center" key={`itemName${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  value={this.getItemObject(operationId)?.name || ''}
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
        field: 'order',
        headerName: t('routingVersion.operation.order'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, stepNumber, min, max } = params.row
          const { classes } = this.props
          const isView = this.props.mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{+stepNumber}</>
          ) : (
            <Box flex={1} alignItems="center" key={`stepNumber${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  name="stepNumber"
                  value={+stepNumber}
                  variant="outlined"
                  onChange={(event) =>
                    this.onChangeItem(id, 'stepNumber', +event.target.value)
                  }
                  inputProps={{
                    min,
                    max,
                  }}
                  type="number"
                  disabled={isView || id === 1}
                  margin="dense"
                />
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
        hide: this.props.mode === MODAL_MODE.DETAIL,
        renderCell: (params) => {
          const { classes, producingSteps } = this.props
          const { id } = params.row
          const hide = this.props.mode === MODAL_MODE.DETAIL
          return hide ? null : (
            <IconButton
              type="button"
              className={classes.iconButton}
              onClick={() => this.onRemoveItem(id)}
              disabled={producingSteps?.length === 1}
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
   * componentDidMount
   */
  componentDidMount() {
    this.refreshData()
  }

  componentDidUpdate(prevProps, prevState) {
    // force datagrid update
    if (prevProps.isSubmitForm !== this.props.isSubmitForm) {
      const producingSteps = JSON.parse(
        JSON.stringify(this.props.producingSteps),
      )
      this.props.parent.setState({ producingSteps })
    }
  }

  /**
   * Refresh init data
   */
  refreshData = () => {
    this.props.getProducingSteps()
  }

  /**
   * Add item
   */
  onAddItem = (e, i) => {
    const { producingSteps } = this.props
    let stepNow = 0
    let min = 1
    let max = 1
    for (let i = 0; i < producingSteps.length; i++) {
      stepNow = producingSteps[i].stepNumber + 1
      min = producingSteps[i - 1] ? producingSteps[i - 1]?.stepNumber : 1
      max = producingSteps[i - 1] ? producingSteps[i - 1]?.stepNumber + 1 : 2
    }
    this.props.parent.setState(
      {
        producingSteps: [
          ...producingSteps,
          {
            id: producingSteps.length + 1,
            stepNumber: stepNow,
            operationId: null,
            quantity: 1,
            min,
            max,
          },
        ],
      },
      scrollToBottom,
    )
    const { pageSize, page } = this.state
    // If is the end of page
    if (producingSteps?.length % pageSize === 0) {
      this.setState({ page: page + 1 })
    }
  }

  /**
   * Remove product
   * @param {int} id
   */
  sortOrder = (producingStep) => {
    let newStepNumber = 1
    producingStep = orderBy(producingStep, 'stepNumber', 'asc')

    const newProducingSteps = producingStep
      .map((step, index, stepArr) => {
        if (index > 0 && step.stepNumber > stepArr[index - 1].stepNumber) {
          newStepNumber++
          step.newStep = newStepNumber
        } else {
          step.newStep = newStepNumber
        }
        return step
      })
      .map((step) => {
        const { id, newStep, operationId } = step
        return { id, operationId, stepNumber: newStep }
      })
    return newProducingSteps
  }
  onRemoveItem = (id) => {
    let producingStep = [...this.props.producingSteps]
      .filter((item) => item.id !== id)
      .map((item, index) => ({
        ...item,
        id: index + 1,
      }))
    const newProducingSteps = this.sortOrder(producingStep)
    this.props.parent.setState({ producingSteps: newProducingSteps })
  }

  /**
   * Get item object with code, name...
   * @param {int} id
   * @returns
   */
  getItemObject = (id) => {
    const { producingList } = this.props
    return producingList?.find((item) => item?.id === id)
  }

  /**
   *
   * @param {int} id
   * @param {string} key
   * @param {*} value
   */
  onChangeItem = (id, key, value) => {
    if (!value) {
      value = null
    }
    const producingSteps = [...this.props.producingSteps]
    const indexItemToChange = producingSteps?.findIndex(
      (item) => item?.id === id,
    )

    producingSteps[indexItemToChange][key] = value

    //kiểm tra có tồn tại producing step trước ko nếu có tính lại min max của producing step hiện tại
    if (key === 'stepNumber' && producingSteps[indexItemToChange - 1]) {
      producingSteps[indexItemToChange].min =
        producingSteps[indexItemToChange - 1].stepNumber
      producingSteps[indexItemToChange].max =
        producingSteps[indexItemToChange - 1].stepNumber + 1
    }

    //kiểm tra có tồn tại producing step sau ko nếu có tính lại min max và stepNumber của producing step sau
    if (key === 'stepNumber' && producingSteps[indexItemToChange + 1]) {
      producingSteps[indexItemToChange + 1].min = value
      producingSteps[indexItemToChange + 1].max = value + 1
      if (producingSteps[indexItemToChange + 1].stepNumber < value) {
        producingSteps[indexItemToChange + 1].stepNumber = value
      }
      if (producingSteps[indexItemToChange + 1].stepNumber > value + 1) {
        producingSteps[indexItemToChange + 1].stepNumber = value + 1
      }
    }
    this.props.parent.setState((prevState) => ({
      producingSteps: [
        ...producingSteps.map((a, index) => {
          return Object.assign({}, a)
        }),
      ],
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
   * Handle change rows order
   */
  onChangeRowsOrder = (rows) => {
    this.props.parent.setState({
      producingSteps: rows.map((item, index) => ({
        ...item,
        id: index + 1,
        stepNumber: index + 1,
      })),
    })
  }
  onCreateProducingStep() {
    redirectRouter(ROUTE.PRODUCING_STEP.CREATE.PATH)
  }

  render() {
    const { producingSteps, t, classes, producingList } = this.props
    const { mode } = this.props
    const isView = mode === MODAL_MODE.DETAIL
    return (
      <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h3>
            {t('routingVersion.producingStepsDetails')}
            <span className={classes.required}> *</span>
          </h3>
          <Box display="flex">
            <Box mr={1}>
              {!isView && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onAddItem}
                >
                  {t('routingVersion.operation.addProducingStep')}
                </Button>
              )}
            </Box>
            <Box>
              {!isView && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onCreateProducingStep}
                >
                  {t('routingVersion.createProducingStep')}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        {!isEmpty(producingList) && (
          <DataTable
            rows={producingSteps}
            pageSize={20}
            page={1}
            columns={this.itemColumns}
            onPageChange={this.onPageChange}
            onPageSizeChange={this.onPageSizeChange}
            onChangeFilter={this.onChangeFilter}
            onChangeSort={this.onChangeSort}
            onChangeRowsOrder={this.onChangeRowsOrder}
            total={producingSteps.length}
            hideFooter
            minWidth={1100}
            reorderable={false}
          />
        )}
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  producingList: state.commonManagement.list,
  warehouseTypes: state.appStore.warehouseTypes,
})

const mapDispatchToProps = {
  getProducingSteps,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ProducingStepsTable)),
)
