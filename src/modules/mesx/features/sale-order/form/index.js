import React, { Component } from 'react'

import { Button, Divider, FormHelperText, Grid, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
// import { DatePicker } from '@material-ui/pickers' // @TODO: use mui v5 instead
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  BOQ_STATUS,
  MODAL_MODE,
  ORDER_STATUS,
  ORDER_STATUS_MAP,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import ItemsSettingTable from '~/modules/mesx/features/sale-order/form/items-setting-table'
import {
  getCustomers,
  getItems,
  getWarehouses,
} from '~/modules/mesx/redux/actions/common'
import { searchBOQ } from '~/modules/mesx/redux/actions/define-boq'
import {
  confirmSaleOrderById,
  createSaleOrder,
  getSaleOrderDetailsById,
  rejectSaleOrderById,
  updateSaleOrder,
} from '~/modules/mesx/redux/actions/sale-order.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  onChangeDate,
  onChangeSelect,
  onChangeTextField,
  redirectRouter,
} from '~/utils'

import useStyles from './style'

const DEFAULT_ITEM = {
  id: 0,
  itemId: null,
  quantity: 1,
}

const MODAL_CONFIRM_TYPE = {
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
}

class SaleOrderForm extends Component {
  /**
   *
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      name: '',
      description: '',
      companyId: '',
      customerId: '',
      boqId: '',
      orderedAt: null,
      deadline: null,
      items: [{ ...DEFAULT_ITEM }],
      createdByUser: {},
      approver: {},
      confirmer: {},
      createdAt: null,
      approvedAt: null,
      confirmedAt: null,
      mode: MODAL_MODE.CREATE,
      status: -1,

      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      modalAction: () => {},
    }

    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.SALE_ORDER.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.SALE_ORDER.DETAILS.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.SALE_ORDER.EDIT.PATH]: MODAL_MODE.UPDATE,
    }
    const id = this.props.match.params.id
    const path = this.props.match.path
    const search = new URLSearchParams(this.props.location?.search)
    this.setState(
      {
        mode: MODE_MAP[path?.replace(id, ':id')],
        isViewOnly: !!search.get('isViewOnly'),
      },
      this.refreshData,
    )
  }

  /**
   * Refresh init data
   */
  refreshData = () => {
    const filterData = [
      {
        column: 'status',
        text: BOQ_STATUS.IN_PROGRESS + ',' + BOQ_STATUS.CONFIRMED,
      },
    ]
    const params = {
      isGetAll: 1,
      filter: JSON.stringify(filterData),
    }
    this.props.getCustomers()
    this.getSaleOrderDetail()
    this.props.searchBOQ(params)
  }

  /**
   * getSaleOrderDetails
   */
  getSaleOrderDetail = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getSaleOrderDetailsById(id, (data) => {
        const {
          code,
          name,
          description,
          companyId,
          customerId,
          boqId,
          type,
          orderedAt,
          deadline,
          saleOrderDetails,
          createdByUser,
          approver,
          confirmer,
          createdAt,
          status,
        } = data
        if (mode === MODAL_MODE.UPDATE && status !== ORDER_STATUS.PENDING) {
          redirectRouter(ROUTE.SALE_ORDER.DETAILS.PATH + `/${id}`)
        }
        const cloneSaleOrderDetails = JSON.parse(
          JSON.stringify(saleOrderDetails),
        )
        this.setState({
          code,
          name,
          description,
          companyId,
          customerId,
          boqId,
          type,
          orderedAt,
          deadline,
          items: cloneSaleOrderDetails?.map((e, index) => ({
            id: index,
            itemId: e.itemId,
            actualQuantity: e.actualQuantity,
            quantity: e.quantity,
          })),
          approver,
          confirmer,
          createdByUser,
          createdAt,
          status,
          mode: status === ORDER_STATUS.REJECTED ? MODAL_MODE.UPDATE : mode,
        })
      })
  }

  /**
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    if (this.validator.allValid()) {
      const {
        code,
        name,
        description,
        companyId,
        customerId,
        boqId,
        type,
        orderedAt,
        deadline,
        items,
      } = this.state
      const params = {
        code: code?.trim(),
        name,
        description,
        companyId,
        customerId,
        boqId,
        type,
        orderedAt,
        deadline,
        items: items.map((item) => ({
          id: item.itemId,
          warehouseId: item.warehouseId,
          quantity: +item.quantity,
        })),
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createSaleOrder(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateSaleOrder(params, this.backToList)
      }
    }
  }

  /**
   * Open approve modal
   */
  openApproveModal = () => {
    this.setState({
      isOpenConfirmModal: true,
      confirmMessage: 'common.confirmMessage.confirm',
      modalConfirmType: MODAL_CONFIRM_TYPE.APPROVE,
      modalAction: this.submitConfirmSaleOrder,
    })
  }

  /**
   * Open reject modal
   */
  openRejectModal = () => {
    this.setState({
      isOpenConfirmModal: true,
      confirmMessage: 'common.confirmMessage.reject',
      modalConfirmType: MODAL_CONFIRM_TYPE.REJECT,
      modalAction: this.submitRejectSaleOrder,
    })
  }

  /**
   * Submit confirm sale order
   */
  submitConfirmSaleOrder = () => {
    this.props.confirmSaleOrderById(this.props.match.params.id, () => {
      this.backToList()
    })
  }

  /**
   * Submit reject sale order
   */
  submitRejectSaleOrder = () => {
    this.props.rejectSaleOrderById(this.props.match.params.id, () => {
      this.backToList()
    })
  }

  /**
   * Handle cancel modal
   */
  onCancel = () => {
    const { mode } = this.state
    if (mode === MODAL_MODE.CREATE) {
      this.resetForm()
    }
    if (mode === MODAL_MODE.UPDATE) {
      const {
        code,
        name,
        description,
        companyId,
        customerId,
        type,
        orderedAt,
        deadline,
        saleOrderDetails,
        createdByUser,
        approver,
        confirmer,
        createdAt,
        boqId,
        status,
      } = this.props.saleOrder.saleOrderDetails
      const saleOrderDetailsCopy = JSON.parse(JSON.stringify(saleOrderDetails))
      this.setState({
        code,
        name,
        description,
        companyId,
        customerId,
        type,
        orderedAt,
        deadline,
        boqId,
        items: saleOrderDetailsCopy?.map((e, index) => ({
          id: index,
          itemId: e.itemId,
          warehouseId: e.warehouseId,
          actualQuantity: e.actualQuantity,
          confirmQuantity: e.confirmQuantity,
          quantity: e.quantity,
        })),
        approver,
        confirmer,
        createdByUser,
        createdAt,
        status,
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.SALE_ORDER.LIST.PATH)
  }

  /**
   *
   */
  goToMovementList = () => {
    redirectRouter(
      ROUTE.SALE_ORDER_MOVEMENTS.PATH + `/${this.props.match.params.id}`,
    )
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
    this.backToList()
  }

  /**
   * Render action buttons based on mode and status
   * @returns {JSX.Element}
   */
  renderActionButtons = () => {
    const { mode, status } = this.state
    const { t } = this.props
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box display="flex">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  {t('common.create')}
                </Button>
              </Box>
              <Box mr={1}>
                <Button variant="contained" onClick={this.onCancel}>
                  {t('common.cancel')}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={this.backToList}>
                  {t('common.close')}
                </Button>
              </Box>
            </Box>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box display="flex">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  {t('common.save')}
                </Button>
              </Box>
              <Box mr={1}>
                <Button variant="contained" onClick={this.onCancel}>
                  {t('common.cancel')}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={this.backToList}>
                  {t('common.close')}
                </Button>
              </Box>
            </Box>
          </Box>
        )
      case MODAL_MODE.DETAIL:
        switch (status) {
          // PENDING
          case ORDER_STATUS.PENDING:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box mr={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.openApproveModal}
                    >
                      {t('common.accept')}
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // APPROVED
          case ORDER_STATUS.APPROVED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // REJECTED
          case ORDER_STATUS.REJECTED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box mr={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {}}
                    >
                      {t('common.save')}
                    </Button>
                  </Box>
                  <Box mr={1}>
                    <Button variant="contained" onClick={this.onCancel}>
                      {t('common.cancel')}
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // IN_PROGRESS
          // COMPLETED
          case ORDER_STATUS.CONFIRMED:
          case ORDER_STATUS.IN_PROGRESS:
          case ORDER_STATUS.COMPLETED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )

          default:
            return
        }
      default:
        break
    }
  }

  /**
   * Reset form
   */
  resetForm = () => {
    this.setState({
      code: '',
      name: '',
      description: '',
      companyId: null,
      customerId: null,
      boqId: null,
      orderedAt: null,
      deadline: null,
      items: [{ ...DEFAULT_ITEM }],
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
    })
  }

  /**
   * Render breadcrumb
   */
  getBreadcrumb = () => {
    const { mode } = this.state
    const breadcrumb = [
      {
        title: 'productionInformationManagement',
      },
      {
        route: ROUTE.SALE_ORDER.LIST.PATH,
        title: ROUTE.SALE_ORDER.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SALE_ORDER.CREATE.PATH,
          title: ROUTE.SALE_ORDER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.SALE_ORDER.DETAILS.PATH + `/${id}`,
          title: ROUTE.SALE_ORDER.DETAILS.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SALE_ORDER.EDIT.PATH + `/${id}`,
          title: ROUTE.SALE_ORDER.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  /**
   * Get title
   */
  getTitle = () => {
    const { mode } = this.state
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.SALE_ORDER.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.SALE_ORDER.DETAILS.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SALE_ORDER.EDIT.TITLE
      default:
    }
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const {
      code,
      name,
      description,
      companyId,
      customerId,
      orderedAt,
      deadline,
      boqId,
      items,
      status,
      confirmedAt,
      confirmer,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
    } = this.state
    const { t, classes, companies, customerList, saleOrder, boqList } =
      this.props
    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    this.validator.purgeFields()

    return (
      <Box>
        <Loading open={saleOrder?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('menu.' + this.getTitle())}</h2>
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            <h1 className={classes.textCenter}>{t('saleOrder.formTitle')}</h1>
            <Divider />
            {status >= 0 && (
              <Box display="flex" justifyContent="space-between">
                <Box></Box>
                <Box
                  mt={1}
                  p={1}
                  className={clsx(classes.statusBox, {
                    [classes.blueText]: !(status === ORDER_STATUS.REJECTED),
                    [classes.redText]: status === ORDER_STATUS.REJECTED,
                  })}
                  mr={3}
                >
                  {t(ORDER_STATUS_MAP[status])}
                </Box>
              </Box>
            )}
            <Grid container>
              {/** code */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('saleOrder.code')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="code"
                        id="code"
                        value={code}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled={isView || isUpdate}
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'code',
                        code?.trim(),
                        `required|alpha_num|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX}`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(code?.trim(), `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                      {isSubmitForm &&
                        !this.validator.check(code?.trim(), 'alpha_num') && (
                          <FormHelperText error>
                            {t('form.validCode')}
                          </FormHelperText>
                        )}
                      {isSubmitForm &&
                        !this.validator.check(
                          code?.trim(),
                          `max:${TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX}`,
                        ) && (
                          <FormHelperText error>
                            {t('form.maxLength', {
                              max: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** name */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('saleOrder.name')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="name"
                        id="name"
                        value={name}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 255 }}
                        disabled={isView}
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'name',
                        name,
                        `required|max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(name, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}

                      {isSubmitForm &&
                        !this.validator.check(
                          name,
                          `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                        ) && (
                          <FormHelperText error>
                            {t('form.maxLength', {
                              max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              {/** orderedAt */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  mr={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('saleOrder.orderedAt')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      {/* <DatePicker
                        name="saleDate"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        margin="dense"
                        size="small"
                        value={orderedAt || null}
                        onChange={(date) =>
                          onChangeDate(this, 'orderedAt', date)
                        }
                        disabled={isView}
                      /> */}

                      {/* add rule to validate */}
                      {this.validator.message(
                        'orderedAt',
                        orderedAt,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(orderedAt, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>

              <Grid xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  mt={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('saleOrder.boqCode')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="boqId"
                        labelId="demo-customized-select-label"
                        id="boqId"
                        variant="outlined"
                        value={boqId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {boqList.map((m, key) => {
                          return (
                            <MenuItem key={key} value={m.id}>
                              {m.code}
                            </MenuItem>
                          )
                        })}
                      </Select>
                      {this.validator.message('boqId', boqId, `required`)}
                      {isSubmitForm &&
                        !this.validator.check(boqId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {isUpdate && !status === ORDER_STATUS.PENDING && (
              <Grid container>
                {/** accepted by username */}
                <Grid item xs={12} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mr={1}
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('saleOrder.acceptedByUser')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth>
                        <TextField
                          name="code"
                          id="code"
                          value={confirmer?.username || ''}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          onChange={(event) => onChangeTextField(this, event)}
                          inputProps={{ maxLength: 20 }}
                          disabled={isView}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                {/** acceptedAt */}
                <Grid item xs={12} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('saleOrder.acceptedAt')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth>
                        {/* <DatePicker
                          name="saleDate"
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          margin="dense"
                          size="small"
                          value={confirmedAt}
                          disabled={isView}
                        /> */}
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}
            <br />
            <Divider />
          </Box>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            <Grid container>
              {/** Customer */}
              <Grid item xs={12} lg={6} md={6}>
                <h3>{t('saleOrder.vendor.title')}</h3>
                {/** company name */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('saleOrder.vendor.name')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="companyId"
                        labelId="demo-customized-select-label"
                        id="companyName"
                        variant="outlined"
                        value={companyId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {companies.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message(
                        'companyId',
                        companyId,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(companyId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** Vendor */}
              <Grid item xs={12} lg={6} md={6}>
                <h3>{t('saleOrder.customer.title')}</h3>

                {/** customer name */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('saleOrder.customer.name')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="customerId"
                        labelId="demo-customized-select-label"
                        id="customerId"
                        variant="outlined"
                        value={customerId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {customerList.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message(
                        'customerId',
                        customerId,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(customerId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>

                {/** deadline */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('saleOrder.deadline')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      {/* <DatePicker
                        name="deadline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        margin="dense"
                        size="small"
                        value={deadline}
                        onChange={(date) =>
                          onChangeDate(this, 'deadline', date)
                        }
                        disabled={isView}
                      /> */}
                      {/* add rule to validate */}
                      {this.validator.message('deadline', deadline, `required`)}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(deadline, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            {/** SaleOrder description */}
            <Box mt={2}>
              <div className={clsx(classes.marginLabel)}>
                <label className={classes.labelItem}>
                  {t('saleOrder.descriptionInput')}
                </label>
              </div>
              <FormControl fullWidth>
                <TextField
                  name="description"
                  id="description"
                  value={description}
                  margin="dense"
                  variant="outlined"
                  size="small"
                  onChange={(event) => onChangeTextField(this, event)}
                  disabled={isView}
                  multiline
                  rows={5}
                />
                {/* add rule to validate */}
                {this.validator.message(
                  'description',
                  description,
                  `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                )}
                {/* check isValid to show messages */}
                {isSubmitForm &&
                  !this.validator.check(
                    description,
                    `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                  ) && (
                    <FormHelperText error>
                      {t('form.maxLength', {
                        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      })}
                    </FormHelperText>
                  )}
              </FormControl>
            </Box>
          </Box>
          <ItemsSettingTable
            parent={this}
            items={items}
            isSubmitForm={isSubmitForm}
          />
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            {this.renderActionButtons()}
          </Box>
        </form>
        <Modal
          isOpen={isOpenConfirmModal}
          title={t('common.notify')}
          size="sm"
          onSubmit={modalAction}
          onClose={this.onCloseConfirmModal}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t(confirmMessage)}
        </Modal>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  saleOrder: state.saleOrder,
  customerList: state.commonManagement.customerList,
  companies: state.appStore.companies,
  boqList: state.defineBOQ.boqList,
})

const mapDispatchToProps = {
  createSaleOrder,
  updateSaleOrder,
  getSaleOrderDetailsById,
  getItems,
  getWarehouses,
  getCustomers,
  confirmSaleOrderById,
  rejectSaleOrderById,
  searchBOQ,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(SaleOrderForm)),
)
