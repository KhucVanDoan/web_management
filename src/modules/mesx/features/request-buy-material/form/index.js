import React, { Component } from 'react'

import { Button, Divider, FormHelperText, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import isBefore from 'date-fns/isBefore'
import isSameDay from 'date-fns/isSameDay'
import moment from 'moment'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import DateRangePicker from '~/UNSAFE_components/shared/date-range-picker'
import Modal from '~/UNSAFE_components/shared/modal'
import {
  ORDER_STATUS,
  ORDER_STATUS_MAP,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  DATE_FORMAT,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import { getItems, getUsers } from '~/modules/mesx/redux/actions/common.action'
import { searchFactories } from '~/modules/mesx/redux/actions/factory.action'
import {
  confirmRequestBuyMaterialById,
  getRequestBuyMaterialDetailsById,
  rejectRequestBuyMaterialById,
  updateRequestBuyMaterial,
} from '~/modules/mesx/redux/actions/request-by-materials.action'
import { searchSaleOrders } from '~/modules/mesx/redux/actions/sale-order.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  onChangeDate,
  onChangeTextField,
  redirectRouter,
  formatDateTimeUtc,
} from '~/utils'

import ItemsSettingTable from './items-setting-table'
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
class RequestBuyMaterialForm extends Component {
  /**
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      name: '',
      moCode: '',
      moName: '',
      moId: '',
      planMoFrom: '',
      planMoTo: '',
      planFrom: '',
      puchasedAt: '',
      deadline: '',
      purchasedAt: '',
      factoryId: null,
      vendorId: null,
      soId: null,
      items: [{ ...DEFAULT_ITEM }],
      mode: MODAL_MODE.CREATE,
      status: -1,
      createdByUser: {},
      createdByUserId: null,
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      modalAction: () => {},
      isViewOnly: false,
    }
    this.validator = new SimpleReactValidator()
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.REQUEST_BUY_MATERIAL.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.REQUEST_BUY_MATERIAL.EDIT.PATH]: MODAL_MODE.UPDATE,
    }
    const id = this.props.match.params.id
    const path = this.props.match.path
    const search = new URLSearchParams(this.props.location?.search)

    this.props.searchFactories({ isGetAll: 1 })
    this.props.searchSaleOrders({ isGetAll: 1 })
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
    this.getPoDetail()
    this.props.getItems()
    this.props.getUsers()
  }

  getPoDetail = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getRequestBuyMaterialDetailsById(id, (data) => {
        const {
          code,
          name,
          vendorId,
          manufacturingOrder,
          status,
          purchasedAt,
          description,
          purchasedOrderDetails,
        } = data
        if (mode === MODAL_MODE.UPDATE && status !== ORDER_STATUS.PENDING) {
          redirectRouter(ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH + `/${id}`)
        }

        this.setState({
          code,
          name,
          vendorId,
          moCode: manufacturingOrder.code,
          moName: manufacturingOrder.name,
          moId: manufacturingOrder.id,
          planMoFrom: manufacturingOrder.planFrom,
          planMoTo: manufacturingOrder.planTo,
          purchasedAt: manufacturingOrder.planFrom,
          deadline: manufacturingOrder.planTo,
          description,
          factoryId: manufacturingOrder.factoryId,
          soId: manufacturingOrder.saleOrderId,
          status,
          items: purchasedOrderDetails?.map((e, index) => ({
            id: index,
            itemId: e.itemId,
            itemName: e.item.name,
            itemCode: e.item.code,
            quantity: Math.floor(e.quantity),
          })),
          mode: status === ORDER_STATUS.REJECTED ? MODAL_MODE.UPDATE : mode,
        })
      })
  }
  /**
   * Open approve modal
   */
  openApproveModal = () => {
    this.setState({
      isOpenConfirmModal: true,
      confirmMessage: 'common.confirmMessage.confirm',
      modalConfirmType: MODAL_CONFIRM_TYPE.APPROVE,
      modalAction: this.submitConfirmRequestBuyMaterial,
    })
  }
  /**
   * Submit confirm BOQ
   */
  submitConfirmRequestBuyMaterial = () => {
    this.props.confirmRequestBuyMaterialById(this.props.match.params.id, () => {
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
        vendorId,
        manufacturingOrder,
        status,
        deadline,
        purchasedAt,
        description,
        purchasedOrderDetails,
      } = this.props.requestBuyMaterial.requestBuyMaterialDetails

      this.setState({
        code,
        name,
        vendorId,
        moCode: manufacturingOrder.code,
        moName: manufacturingOrder.name,
        planMoFrom: manufacturingOrder.planFrom,
        planMoTo: manufacturingOrder.planTo,
        planFrom: manufacturingOrder.planFrom,
        deadline,
        purchasedAt,
        factoryId: manufacturingOrder.factoryId,
        soId: manufacturingOrder.saleOrderId,
        status,
        description,
        items: purchasedOrderDetails?.map((e, index) => ({
          id: index,
          itemId: e.itemId,
          itemName: e.item.name,
          itemCode: e.item.code,
          quantity: Math.floor(e.quantity),
        })),
        mode: status === ORDER_STATUS.REJECTED ? MODAL_MODE.UPDATE : mode,
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH)
  }

  /**
   *
   */
  goToMovementList = () => {
    redirectRouter(
      ROUTE.REQUEST_BUY_MATERIAL.MOVEMENTS.PATH +
        `/${this.props.match.params.id}`,
    )
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
    this.backToList()
  }
  openRejectModal = () => {
    this.setState({
      isOpenConfirmModal: true,
      confirmMessage: 'common.confirmMessage.reject',
      modalConfirmType: MODAL_CONFIRM_TYPE.REJECT,
      modalAction: this.submitRejectRequestBuyMaterial,
    })
  }
  submitRejectRequestBuyMaterial = () => {
    this.props.rejectRequestBuyMaterialById(this.props.match.params.id, () => {
      this.backToList()
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
        ;<Box>
          <Button variant="contained" onClick={this.backToList}>
            {t('common.close')}
          </Button>
        </Box>
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
          // CONFIRMED
          case ORDER_STATUS.CONFIRMED:
          case ORDER_STATUS.IN_PROGRESS:
          case ORDER_STATUS.COMPLETED:
            return (
              <Box mt={2} display="flex" justifyContent="flex-end">
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
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    if (
      this.validator.allValid() &&
      (isSameDay(
        moment(this.state.planMoTo)._d,
        moment(this.state.deadline)._d,
      ) ||
        isBefore(
          moment(this.state.deadline)._d,
          moment(this.state.planMoTo)._d,
        ))
    ) {
      const { code, name, description, deadline, purchasedAt, items, moId } =
        this.state
      const params = {
        code: code?.trim(),
        name,
        manufacturingOrderId: moId,
        description,
        deadline,
        purchasedAt,
        items: items.map((i) => ({
          id: i.itemId,
          warehouseId: null,
          qcCheck: false,
          quantity: i.quantity,
        })),
      }
      params.id = +this.props.match.params.id
      this.props.updateRequestBuyMaterial(params, this.backToList)
    }
  }

  /**
   * Reset form
   */
  resetForm = () => {
    this.setState({
      code: '',
      name: '',
      pmId: null,
      apmId: null,
      planFrom: '',
      planTo: '',
      description: '',
      items: [{ ...DEFAULT_ITEM }],
      mode: MODAL_MODE.CREATE,
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
        title: 'plan',
      },
      {
        route: ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH,
        title: ROUTE.REQUEST_BUY_MATERIAL.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.REQUEST_BUY_MATERIAL.CREATE.PATH,
          title: ROUTE.REQUEST_BUY_MATERIAL.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH + `/${id}`,
          title: ROUTE.REQUEST_BUY_MATERIAL.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.REQUEST_BUY_MATERIAL.EDIT.PATH + `/${id}`,
          title: ROUTE.REQUEST_BUY_MATERIAL.EDIT.TITLE,
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
        return ROUTE.REQUEST_BUY_MATERIAL.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.REQUEST_BUY_MATERIAL.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.REQUEST_BUY_MATERIAL.EDIT.TITLE
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
      moCode,
      moName,
      planMoFrom,
      planMoTo,
      planFrom,
      deadline,
      purchasedAt,
      factoryId,
      soId,
      items,
      status,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      description,
      modalAction,
    } = this.state
    const { t, classes, defineBOQ, factoriesList, saleOrderList } = this.props

    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    this.validator.purgeFields()

    return (
      <Box>
        <Loading open={defineBOQ?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('menu.' + this.getTitle())}</h2>
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
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
                  mr={2}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('requestBuyMaterial.requestCode')}
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
                        inputProps={{ maxLength: 4 }}
                        disabled={isView}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/**pm */}
              <Grid item xs={12} lg={6} md={6} className={classes.displayFlex}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('requestBuyMaterial.requestName')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
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
                  mr={2}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('requestBuyMaterial.moCode')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="moCode"
                        id="moCode"
                        value={moCode}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        inputProps={{ maxLength: 255 }}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/**APM */}
              <Grid item xs={12} lg={6} md={6} className={classes.displayFlex}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('requestBuyMaterial.moName')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <TextField
                        name="moName"
                        id="moName"
                        value={moName}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        inputProps={{ maxLength: 255 }}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>

              <Grid container>
                {/**plan period */}
                <Grid item xs={12} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mr={1}
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={clsx(classes.labelItem)}>
                        {t('requestBuyMaterial.planMo')}
                      </label>
                    </Box>

                    <Box width={0.7} mx={2} py={2}>
                      <FormControl>
                        <DateRangePicker
                          validator={this.validator}
                          isSubmitForm={isSubmitForm}
                          from={planMoFrom || null}
                          to={planMoTo || null}
                          isRequiredFrom={false}
                          isRequiredTo={false}
                          isDisabled={true}
                          onChangeFrom={(date) =>
                            onChangeDate(this, 'planMoFrom', date)
                          }
                          onChangeTo={(date) =>
                            onChangeDate(this, 'planMoTo', date)
                          }
                        />
                        {/* add rule to validate */}
                        {this.validator.message(
                          'planFrom',
                          planMoFrom,
                          `required`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(planMoFrom, `required`) && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={6}
                  md={6}
                  className={classes.displayFlex}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mr={1}
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('requestBuyMaterial.factory')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth size="small">
                        <TextField
                          name="name"
                          id="name"
                          value={
                            factoriesList.find((f) => f.id === factoryId)?.name
                          }
                          margin="dense"
                          variant="outlined"
                          size="small"
                          inputProps={{ maxLength: 255 }}
                          disabled
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                {/**plan period */}
                <Grid item xs={12} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mr={1}
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={clsx(classes.labelItem)}>
                        {t('requestBuyMaterial.deadline')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} mx={2} py={2}>
                      <FormControl>
                        <DateRangePicker
                          validator={this.validator}
                          isSubmitForm={isSubmitForm}
                          from={purchasedAt || null}
                          to={deadline || null}
                          isRequiredFrom={false}
                          isRequiredTo={false}
                          isDisabled={isView}
                          onChangeFrom={(date) =>
                            onChangeDate(this, 'purchasedAt', date)
                          }
                          onChangeTo={(date) =>
                            onChangeDate(this, 'deadline', date)
                          }
                        />
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          (!isSameDay(
                            moment(deadline)._d,
                            moment(planMoTo)._d,
                          ) ||
                            !isBefore(
                              moment(deadline)._d,
                              moment(planMoTo)._d,
                            )) && (
                            <FormHelperText error>
                              {t('form.maxDate', {
                                to: formatDateTimeUtc(planMoTo, DATE_FORMAT)
                                  .slice(0, 10)
                                  .split('/')
                                  .reverse()
                                  .join('/'),
                              })}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={6}
                  md={6}
                  className={classes.displayFlex}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mr={1}
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={classes.labelItem}>
                        {t('requestBuyMaterial.soName')}
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth size="small">
                        <TextField
                          name="name"
                          id="name"
                          value={saleOrderList.find((s) => s.id === soId)?.name}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          inputProps={{ maxLength: 255 }}
                          disabled
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box
                className={clsx(classes.marginAuto, classes.marginLabel)}
                width={8 / 8}
              >
                <Divider />
                {/** BOQ description */}
                <Box mt={2}>
                  <div className={clsx(classes.marginLabel)}>
                    <label className={classes.labelItem}>
                      {t('requestBuyMaterial.descriptionInput')}
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
            </Grid>
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
  requestBuyMaterial: state.requestBuyMaterial,
  userList: state.commonManagement.userList,
  saleOrderList: state.saleOrder.saleOrderList,
  factoriesList: state.Factory.factoriesList,
})

const mapDispatchToProps = {
  confirmRequestBuyMaterialById,
  getRequestBuyMaterialDetailsById,
  rejectRequestBuyMaterialById,
  updateRequestBuyMaterial,
  getItems,
  getUsers,
  searchFactories,
  searchSaleOrders,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(RequestBuyMaterialForm)),
)
