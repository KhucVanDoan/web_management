/* eslint-disable no-param-reassign */
import React, { Component } from 'react'

import { Button, Divider, FormHelperText, Grid } from '@mui/material'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  MODAL_MODE,
  ORDER_STATUS,
  ORDER_STATUS_MAP,
  ORDER_TYPE,
  SALE_ORDER_STATUS,
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import ItemsSettingTable from '~/modules/mesx/features/so-export/form/items-setting-table'
import {
  getItems,
  getSaleOrders,
  getCustomers,
} from '~/modules/mesx/redux/actions/common.action'
import { getSaleOrderDetailsById } from '~/modules/mesx/redux/actions/sale-order.action'
import {
  confirmSOExportById,
  createSOExport,
  getSOExportDetailsById,
  rejectSOExportById,
  updateSOExport,
} from '~/modules/mesx/redux/actions/so-export.action'
import { ROUTE } from '~/modules/mesx/routes/config'
// import { DatePicker } from '@material-ui/pickers' // @TODO: use mui v5 instead
import { onChangeTextField, redirectRouter } from '~/utils'

import useStyles from './style'

const DEFAULT_ITEM = {
  id: 0,
  itemId: null,
  quantity: 1,
  qcCriteria: '',
  qcCheck: false,
  qcCriteriaId: null,
}

const MODAL_CONFIRM_TYPE = {
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
}

class SOExportForm extends Component {
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
      saleOrderId: null,
      // export only
      type: ORDER_TYPE[1].id,
      orderedAt: null,
      deadline: null,
      items: [{ ...DEFAULT_ITEM }],
      itemSO: {},
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
      [ROUTE.SO_EXPORT.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.SO_EXPORT.DETAILS.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.SO_EXPORT.EDIT.PATH]: MODAL_MODE.UPDATE,
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
   * componentDidUpdate
   */
  componentDidUpdate() {
    const { items } = this.state
    /* add rule to validate */
    items.forEach((i) => {
      {
        this.validator.message(`itemId${i?.id}`, i?.itemId, `required`)
      }
      {
        this.validator.message(
          `warehouseId${i?.id}`,
          i?.warehouseId,
          `required`,
        )
      }
      {
        this.validator.message(
          `quantity${i?.id}`,
          i?.quantity,
          `required|numeric|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN},num|max:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX},num`,
        )
      }
    })
  }

  /**
   * Refresh init data
   */
  refreshData = () => {
    this.getSOExportDetails()
    this.props.getSaleOrders({ isGetAll: 1 })
    this.props.getCustomers()
  }

  /**
   * getSOExportDetails
   */
  getSOExportDetails = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getSOExportDetailsById(id, (data) => {
        const {
          code,
          name,
          description,
          companyId,
          customerId,
          type,
          orderedAt,
          deadline,
          saleOrderExportWarehouseDetails,
          createdByUser,
          approver,
          confirmer,
          createdAt,
          saleOrderId,
          status,
        } = data
        if (mode === MODAL_MODE.UPDATE && status !== ORDER_STATUS.PENDING) {
          redirectRouter(ROUTE.SO_EXPORT.DETAILS.PATH + `/${id}`)
        }
        const cloneSaleOrderExportWarehouseDetails = JSON.parse(
          JSON.stringify(saleOrderExportWarehouseDetails),
        )
        this.props.getSaleOrderDetailsById(saleOrderId, (res) => {
          this.setState({
            itemSO: this.props.saleOrder.saleOrderDetails,
          })
        })
        this.setState({
          code,
          name,
          description,
          companyId,
          customerId,
          type,
          orderedAt,
          deadline,
          items: cloneSaleOrderExportWarehouseDetails?.map((e, index) => ({
            id: index,
            itemId: e.itemId,
            warehouseId: e.warehouseId,
            actualQuantity: e.actualQuantity,
            confirmQuantity: e.confirmQuantity,
            quantity: e.quantity,
            qcCheck: e.qcCheck === 1 ? true : false,
            qcCriteria: e?.qcCriteria?.name,
            qcCriteriaId: e?.qcCriteria?.id,
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
      const { code, name, description, items, itemSO } = this.state
      const params = {
        code: code?.trim(),
        name,
        description,
        type: itemSO?.type,
        saleOrderId: itemSO?.id,
        companyId: itemSO?.company?.id,
        customerId: itemSO?.customer?.id,
        orderedAt: itemSO?.orderedAt,
        deadline: itemSO?.deadline,
        items: items.map((item) => ({
          id: item.itemId,
          warehouseId: item.warehouseId,
          quantity: +item.quantity,
          qcCheck: item.qcCheck ? '1' : '0',
          qcCriteriaId: item.qcCriteriaId || null,
        })),
      }
      params?.items?.map((i) => {
        if (i.qcCheck === '0') {
          delete i.qcCriteriaId
        }
      })
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createSOExport(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateSOExport(params, this.backToList)
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
      modalAction: this.submitConfirmSOExport,
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
      modalAction: this.submitRejectSOExport,
    })
  }

  /**
   * Submit confirm sale order
   */
  submitConfirmSOExport = () => {
    this.props.confirmSOExportById(this.props.match.params.id, () => {
      this.backToList()
    })
  }

  /**
   * Submit reject sale order
   */
  submitRejectSOExport = () => {
    this.props.rejectSOExportById(this.props.match.params.id, () => {
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
        saleOrderExportWarehouseDetails,
        createdByUser,
        approver,
        confirmer,
        createdAt,
        status,
      } = this.props.soExport.soExportDetails

      const itemSO = this.props.saleOrder.saleOrderDetails

      const soExportWarehouseDetailsCopy = JSON.parse(
        JSON.stringify(saleOrderExportWarehouseDetails),
      )
      this.setState({
        code,
        name,
        description,
        companyId,
        customerId,
        type,
        orderedAt,
        deadline,
        items: soExportWarehouseDetailsCopy?.map((e, index) => ({
          id: index,
          itemId: e.itemId,
          warehouseId: e.warehouseId,
          actualQuantity: e.actualQuantity,
          confirmQuantity: e.confirmQuantity,
          quantity: e.quantity,
          qcCheck: false,
          qcCriteria: '',
          qcCriteriaId: '',
        })),
        approver,
        confirmer,
        createdByUser,
        createdAt,
        status,
        itemSO,
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.SO_EXPORT.LIST.PATH)
  }

  /**
   *
   */
  goToMovementList = () => {
    redirectRouter(
      ROUTE.SO_EXPORT.MOVEMENTS.PATH + `/${this.props.match.params.id}`,
    )
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
    this.backToList()
  }
  onChangeItem = (key, value) => {
    this.setState({ [key]: value })
    this.setState({
      items: [{ ...DEFAULT_ITEM }],
    })
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
                  <Box mr={1}>
                    <Button variant="contained" onClick={this.openRejectModal}>
                      {t('common.reject')}
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
      companyId: '',
      customerId: '',
      // export only
      type: ORDER_TYPE[1].id,
      orderedAt: null,
      deadline: null,
      items: [{ ...DEFAULT_ITEM }],
      itemSO: {},
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
        route: ROUTE.SO_EXPORT.LIST.PATH,
        title: ROUTE.SO_EXPORT.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SO_EXPORT.CREATE.PATH,
          title: ROUTE.SO_EXPORT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.SO_EXPORT.DETAILS.PATH + `/${id}`,
          title: ROUTE.SO_EXPORT.DETAILS.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SO_EXPORT.EDIT.PATH + `/${id}`,
          title: ROUTE.SO_EXPORT.EDIT.TITLE,
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
        return ROUTE.SO_EXPORT.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.SO_EXPORT.DETAILS.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SO_EXPORT.EDIT.TITLE
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
      items,
      itemSO,
      status,
      isSubmitForm,
      createdAt,
      confirmedAt,
      createdByUser,
      confirmer,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      companyId,
      customerId,
      modalAction,
    } = this.state
    const { t, classes, soExport, soList, companies, customerList } = this.props
    const soListFilter = soList.filter(
      (i) => i.status === SALE_ORDER_STATUS.CONFIRMED,
    )
    const isView = mode === MODAL_MODE.DETAIL
    const companyDetails = companies?.find((item) => item.id === companyId)
    const customerDetails = customerList?.find((item) => item.id === customerId)
    this.validator.purgeFields()

    return (
      <Box>
        <Loading open={soExport?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('menu.' + this.getTitle())}</h2>
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            <h1 className={classes.textCenter}>{t('soExport.formTitle')}</h1>
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
                      {t('soExport.code')}
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
                        disabled={isView}
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
                      {t('soExport.name')}
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
              {/** SO code */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  mr={1}
                  mt={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('soExport.soCode')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <Autocomplete
                        size="small"
                        name="itemName"
                        id="itemName"
                        value={itemSO}
                        margin="dense"
                        variant="outlined"
                        options={soListFilter}
                        getOptionLabel={(option) => option.code}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        renderOption={(option, { selected }) => (
                          <React.Fragment>{option.code}</React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                        onChange={(event, value) => {
                          if (value) {
                            this.onChangeItem('itemSO', value)
                          }
                        }}
                        disabled={isView}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  mt={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('soExport.soName')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="soName"
                        variant="outlined"
                        size="small"
                        value={itemSO?.name || ''}
                        disabled={true}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid xs={12} lg={6} md={6}></Grid>
              <Grid xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('soExport.deliveryDate')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      {/* <DatePicker
                        name="deliveryDate"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        margin="dense"
                        size="small"
                        value={itemSO?.deadline || null}
                        disabled={true}
                      /> */}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {isView && (
              <Grid container>
                {/** createdBy username */}
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
                        {t('saleOrder.createdByUser')}
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth>
                        <TextField
                          name="code"
                          id="code"
                          value={createdByUser?.fullName || ''}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          onChange={(event) => onChangeTextField(this, event)}
                          inputProps={{ maxLength: 20 }}
                          disabled={true}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                {/** createdAt */}
                <Grid item xs={12} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('saleOrder.createdAt')}
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
                          value={createdAt}
                          disabled={true}
                        /> */}
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}
            {isView && (
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
            <Divider />
          </Box>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            <Grid container>
              {/** Vendor */}
              <Grid item xs={12} lg={6} md={6}>
                <h3>{t('soExport.vendor.title')}</h3>
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
                      {t('soExport.vendor.companyName')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <TextField
                        name="companyId"
                        labelId="demo-customized-select-label"
                        id="companyName"
                        variant="outlined"
                        value={itemSO?.company?.name || ''}
                        disabled={true}
                        size="small"
                      ></TextField>
                    </FormControl>
                  </Box>
                </Box>
                {isView && (
                  <>
                    {/** company location */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mr={1}
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('saleOrder.vendor.location')}
                        </label>
                      </Box>

                      <Box width={0.7} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name="code"
                            id="code"
                            value={companyDetails?.address || ''}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Box>

                    {/** company phone number */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mr={1}
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('saleOrder.vendor.phone')}
                        </label>
                      </Box>

                      <Box width={0.7} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name="code"
                            id="code"
                            value={companyDetails?.phone || ''}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    {/** company email */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mr={1}
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('saleOrder.vendor.email')}
                        </label>
                      </Box>

                      <Box width={0.7} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name="code"
                            id="code"
                            value={companyDetails?.email || ''}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    {/** company fax */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mr={1}
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('saleOrder.vendor.fax')}
                        </label>
                      </Box>

                      <Box width={0.7} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name="code"
                            id="code"
                            value={companyDetails?.fax || ''}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  </>
                )}
              </Grid>
              {/** Customer */}
              <Grid item xs={12} lg={6} md={6}>
                <h3>{t('soExport.customer.title')}</h3>

                {/** customer name */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('soExport.customer.name')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <TextField
                        name="customerId"
                        labelId="demo-customized-select-label"
                        id="customerId"
                        variant="outlined"
                        value={itemSO?.customer?.name || ''}
                        disabled={true}
                        size="small"
                      ></TextField>
                    </FormControl>
                  </Box>
                </Box>
                {isView && (
                  <>
                    {/** customer location */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('saleOrder.customer.location')}
                        </label>
                      </Box>

                      <Box width={0.7} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name="code"
                            id="code"
                            value={customerDetails?.address || ''}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    {/** customer phone number */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('saleOrder.customer.phone')}
                        </label>
                      </Box>

                      <Box width={0.7} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name="code"
                            id="code"
                            value={customerDetails?.phone || ''}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    {/** customer email */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('saleOrder.customer.email')}
                        </label>
                      </Box>

                      <Box width={0.7} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name="code"
                            id="code"
                            value={customerDetails?.email || ''}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    {/** customer fax */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      flex={1}
                    >
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('saleOrder.customer.fax')}
                        </label>
                      </Box>

                      <Box width={0.7} ml={2}>
                        <FormControl fullWidth>
                          <TextField
                            name="code"
                            id="code"
                            value={customerDetails?.fax || ''}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  </>
                )}
                {/** orderedAt */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('soExport.orderedAt')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      {/* <DatePicker
                        name="orderedAt"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        margin="dense"
                        size="small"
                        value={itemSO?.orderedAt || null}
                        disabled={true}
                      /> */}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            {/** soExport description */}
            <Box mt={2}>
              <div className={clsx(classes.marginLabel)}>
                <label className={classes.labelItem}>
                  {t('soExport.descriptionInput')}
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
            itemIds={itemSO?.itemIds}
            itemSO={itemSO}
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
  soExport: state.soExport,
  customerList: state.commonManagement.customerList,
  companies: state.appStore.companies,
  soList: state.commonManagement.soList,
  saleOrder: state.saleOrder,
})

const mapDispatchToProps = {
  createSOExport,
  updateSOExport,
  getSOExportDetailsById,
  getItems,
  getSaleOrders,
  confirmSOExportById,
  rejectSOExportById,
  getCustomers,
  getSaleOrderDetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(SOExportForm)),
)
