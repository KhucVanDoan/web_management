import React, { Component } from 'react'

import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  Autocomplete,
} from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { isAfter, isBefore, isSameDay } from 'date-fns'
import moment from 'moment'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import DateRangePicker from '~/UNSAFE_components/shared/date-range-picker'
import Modal from '~/UNSAFE_components/shared/modal'
import {
  MODAL_MODE,
  WORK_ORDER_STATUS,
  WORK_ORDER_STATUS_MAP,
  DATE_FORMAT,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import { getMODetailsById } from '~/modules/mesx/redux/actions/mo.action'
import { getWorkCenterDetailsById } from '~/modules/mesx/redux/actions/work-center.action'
import {
  confirmWorkOrderById,
  createWorkOrder,
  getWorkOrderDetailsById,
  updateWorkOrder,
} from '~/modules/mesx/redux/actions/work-order'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  onChangeTextField,
  redirectRouter,
  onChangeSelect,
  onChangeDate,
  formatDateTimeUtc,
} from '~/utils'

import useStyles from './style'

// import { DatePicker } from '@material-ui/pickers' // @TODO: use mui v5 instead

const MODAL_CONFIRM_TYPE = {
  APPROVE: 'APPROVE',
}

class WorkOrderForm extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      moPlanId: '',
      subItemName: '',
      listItem: [],
      nameMo: '',
      itemId: null,
      code: '',
      bomId: null,
      name: '',
      description: '',
      moId: '',
      routingId: '',
      childBoms: [],
      bomName: '',
      routingName: '',
      quantity: 0.0,
      moDetailId: '',
      planFrom: '',
      planTo: '',
      isTransfer: false,
      producingSteps: [],
      approver: {},
      confirmer: {},
      createdAt: null,
      confirmedAt: null,
      mode: MODAL_MODE.CREATE,
      status: -1,
      isSubmitForm: false,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      keyword: '',
      pageSize: 20,
      page: 1,
      filters: [],
      sort: [],
      modalAction: () => {},
      soName: '',
      members: [],
      leaderId: null,
      workCenterName: '',
      factoryName: '',
      moPlanCode: null,
      itemName: '',
      startAt: '',
      endAt: '',
      workCenterIds: [],
    }

    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.WORK_ORDER_CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.WORK_ORDER_DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.WORK_ORDER_EDIT.PATH]: MODAL_MODE.UPDATE,
    }
    const { id } = this.props.match.params
    const path = this.props.match.path

    const createParams = this.props.location?.state
    if (createParams) {
      const {
        bomId,
        moId,
        code,
        id,
        itemId,
        rootItemId,
        subItemName,
        producingStep,
        sumQuantity,
        routing,
        routingVersionId,
      } = createParams?.woParams
      this.onFillBoqPlan(id)
      if (rootItemId !== itemId) {
        this.setState({
          subItemName,
        })
      }
      this.setState({
        quantity: parseInt(sumQuantity),
        moPlanId: id,
        moPlanCode: code,
        moId,
        itemId: rootItemId,
        bomId,
        routingId: routing,
        producingStepId: producingStep.id,
      })
    }
    this.setState(
      { mode: MODE_MAP[path?.replace(id, ':id')] },
      this.refreshData,
    )
  }

  /**
   * Refresh init data
   */
  refreshData = () => {
    this.getWorkOrderDetails()
  }

  /**
   * getWorkOrderDetails
   */
  getWorkOrderDetails = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getWorkOrderDetailsById(id, (data) => {
        const {
          mo,
          moPlan,
          code,
          name,
          planFrom,
          planTo,
          bom,
          moPlanBom,
          quantity,
          producingStep,
          description,
          routing,
          moDetail,
          approver,
          createdAt,
          factory,
          status,
          so,
          startAt,
          endAt,
          workCenters,
        } = data
        // if (
        //   mode === MODAL_MODE.UPDATE &&
        //   status !== WORK_ORDER_STATUS.CREATED
        // ) {
        //   redirectRouter(ROUTE.WORK_ORDER_DETAIL.PATH + `/${id}`);
        // }
        if (moDetail.itemName !== bom.itemName) {
          this.setState({
            subItemName: bom.itemName,
          })
        }
        if (producingStep?.id) {
          this.props.getWorkCenterDetailsById(producingStep?.id, (data) => {
            const { name, members, leaderId } = data
            this.setState({
              members,
              leaderId,
              workCenterName: name,
            })
          })
        }
        if (mo?.id) {
          this.props.getMODetailsById(mo?.id, (data) => {
            const { planFrom, planTo } = data
            this.setState({
              planFrom,
              planTo,
            })
          })
        }
        this.setState({
          moId: mo?.id,
          moName: mo?.name,
          producingStepId: producingStep?.id,
          producingStepName: producingStep?.name,
          quantity,
          code,
          moPlanBomId: moPlanBom?.id,
          moPlanId: moPlan?.id,
          moPlanCode: moPlan?.code,
          bomId: bom?.id,
          routingId: routing?.id,
          planWOFrom: planFrom,
          planWOTo: planTo,
          name,
          description,
          approver,
          itemId: moDetail?.itemId,
          itemName: moDetail?.itemName,
          routingCode: routing?.code,
          moDetailId: moDetail?.id,
          createdAt,
          status,
          soName: so.name,
          bomName: bom?.name,
          factoryName: factory?.name,
          startAt,
          endAt,
          workCenterIds: workCenters?.map((workCenter) => workCenter.id),
        })
      })
  }

  getWorkCenterValueObject = () => {
    const { workCenterIds } = this.state
    const workCenter = this.props.workCenter
    return workCenter.wcList
      ?.filter((item) => workCenterIds?.includes(item?.id))
      ?.map((item2) => {
        return { id: item2.id, name: item2.name }
      })
  }
  /**
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    // if (this.validator.allValid() && this.checkDuplicateOrderCode()) {
    if (this.validator.allValid() && this.validatemaxDate()) {
      const {
        name,
        quantity,
        description,
        planWOFrom,
        planWOTo,
        routingId,
        producingStepId,
        bomId,
        moId,
        moPlanId,
        moDetailId,
      } = this.state
      const params = {
        name,
        quantity: parseInt(quantity),
        description,
        planFrom: planWOFrom,
        planTo: planWOTo,
        routingId,
        producingStepId,
        bomId,
        moId,
        moPlanId,
        moDetailId,
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createWorkOrder(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateWorkOrder(params, this.backToList)
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
      modalAction: this.submitConfirmWorkOrder,
    })
  }

  /**
   * Submit confirm production order
   */
  submitConfirmWorkOrder = () => {
    this.props.confirmWorkOrderById(this.props.match.params.id, () => {
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
        mo,
        moPlan,
        code,
        name,
        planFrom,
        planTo,
        bom,
        moPlanBom,
        quantity,
        producingStep,
        description,
        routing,
        moDetail,
        approver,
        createdAt,
        status,
      } = this.props.workOrder.workOrderDetails
      this.setState({
        moId: mo?.id,
        producingStepId: producingStep?.id,
        quantity,
        code,
        moPlanBomId: moPlanBom?.id,
        moPlanId: moPlan?.id,
        bomId: bom?.id,
        routingId: routing?.id,
        planWOFrom: planFrom,
        planWOTo: planTo,
        name,
        description,
        approver,
        itemId: moDetail?.itemId,
        createdAt,
        status,
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.WORK_ORDER.PATH)
  }

  /**
   *
   */
  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
    this.backToList()
  }

  /**
   * getWarehouseObjects
   * @returns {object[]}
   */

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

          case WORK_ORDER_STATUS.CREATED:
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

          case WORK_ORDER_STATUS.COMPLETED:
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
          // COMPLETED
          case WORK_ORDER_STATUS.IN_PROGRESS:
          case WORK_ORDER_STATUS.COMPLETE:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box display="flex">
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          case WORK_ORDER_STATUS.CONFIRMED:
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
      name: '',
      quantity: null,
      description: '',
      planFrom: null,
      planTo: null,
      routingId: null,
      producingStepId: null,
      bomId: null,
      moId: null,
      moPlanId: null,
      moDetailId: null,
      isSubmitForm: false,
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
        route: ROUTE.WORK_ORDER.PATH,
        title: ROUTE.WORK_ORDER.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.WORK_ORDER_CREATE.PATH,
          title: ROUTE.WORK_ORDER_CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.WORK_ORDER_DETAIL.PATH + `/${id}`,
          title: ROUTE.WORK_ORDER_DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.WORK_ORDER_EDIT.PATH + `/${id}`,
          title: ROUTE.WORK_ORDER_EDIT.TITLE,
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
        return ROUTE.WORK_ORDER_CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.WORK_ORDER_DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WORK_ORDER_EDIT.TITLE
      default:
    }
  }
  clearData = () => {
    this.setState({
      apm: null,
      pm: null,
      quantity: null,
      description: '',
      routingId: null,
      producingStepId: null,
      bomId: null,
      itemId: null,
      listItem: [],
      moDetailId: null,
    })
  }

  onChangeProducingStep = (event) => {
    onChangeSelect(this, event)
    const nameCpn = event.target?.value

    if (nameCpn) {
      // Xử lý get Work Center Phase 3
    }
  }

  validatemaxDate = () => {
    const { planTo, planWOTo } = this.state
    const end = new moment(planWOTo)
    const start = new moment(new Date(planTo))
    return end.isSameOrBefore(start, 'day')
  }
  handleChangeMultiple = (event, values) => {
    this.setState({
      members: values,
    })
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
      status,
      moPlanCode,
      quantity,
      subItemName,
      planFrom,
      moName,
      planTo,
      planWOTo,
      planWOFrom,
      routingCode,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
      soName,
      members,
      itemName,
      factoryName,
      bomName,
      producingStepName,
      startAt,
      endAt,
    } = this.state
    const { t, classes, workOrder, workCenter } = this.props
    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    return (
      <Box>
        <Loading open={workOrder?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('workOrder.' + this.getTitle())}</h2>
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            <Divider />
            {status >= 0 && (
              <Box display="flex" justifyContent="space-between">
                <Box></Box>
                <Box
                  mt={1}
                  p={1}
                  className={clsx(classes.statusBox, classes.blueText)}
                  mr={3}
                >
                  {t(WORK_ORDER_STATUS_MAP[status])}
                </Box>
              </Box>
            )}
            <Box mt={4}></Box>
            <Grid container>
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
                      {t('workOrder.lblcodeWorkOrder')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
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
                        disabled
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
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workOrder.codeKH')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <FormControl fullWidth>
                        <TextField
                          name="moPlanCode"
                          id="moPlanCode"
                          value={moPlanCode}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          onChange={(event) => onChangeTextField(this, event)}
                          inputProps={{ maxLength: 20 }}
                          disabled
                        />
                      </FormControl>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              {/** workorder */}
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
                      {t('workOrder.mameCV')}
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="name"
                        id="name"
                        value={name}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled={isView}
                      />
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(name?.trim(), `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
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
                      {t('workOrder.moName')}
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="moId"
                        id="moId"
                        value={moName}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        inputProps={{ maxLength: 20 }}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>

              {/** pm */}
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
                      {t('workOrder.factory')}
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="factoryName"
                        id="factoryName"
                        value={factoryName || ''}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled
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
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workOrder.soName')}
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="soName"
                        id="soName"
                        value={soName || ''}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
                    <label className={clsx(classes.labelItem)}>
                      {t('workOrder.planMo')}
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
                    <FormControl fullWidth>
                      <DateRangePicker
                        validator={this.validator}
                        isSubmitForm={isSubmitForm}
                        from={planFrom}
                        to={planTo}
                        isRequiredFrom={false}
                        isRequiredTo={false}
                        isDisabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>{' '}
              {/** acceptedAt */}
            </Grid>
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
                      {t('workOrder.nameTP')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth size="small">
                      <TextField
                        name="itemName"
                        id="itemName"
                        value={itemName || ''}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled
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
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workOrder.nameBTP')}
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="subItemName"
                        id="subItemName"
                        value={subItemName}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
                      {t('workOrder.codeBom')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth size="small">
                      <FormControl fullWidth>
                        <TextField
                          name="bomName"
                          id="bomName"
                          value={bomName}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          onChange={(event) => onChangeTextField(this, event)}
                          inputProps={{ maxLength: 20 }}
                          disabled
                        />
                      </FormControl>
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
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workOrder.codeRouting')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="routingCode"
                        id="routingCode"
                        value={routingCode}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
                      {t('workOrder.nameCD')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth size="small">
                      <FormControl fullWidth>
                        <TextField
                          name="producingStepName"
                          id="producingStepName"
                          value={producingStepName}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          onChange={(event) => onChangeTextField(this, event)}
                          inputProps={{ maxLength: 20 }}
                          disabled
                        />
                      </FormControl>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
                      {t('workOrder.lblquantityPlan')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="quantity"
                        id="quantity"
                        value={quantity}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled
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
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workOrder.nameWorkshop')}
                      {/* <span className={classes.required}> *</span> */}
                    </label>
                  </Box>

                  <Box width={0.7} mx={2}>
                    <FormControl fullWidth>
                      <Autocomplete
                        size="small"
                        name="warehouseIds"
                        multiple
                        id="checkboxes-tags-demo"
                        variant="outlined"
                        options={workCenter.wcList?.map((item2) => {
                          return { id: item2.id, name: item2.name }
                        })}
                        value={this.getWorkCenterValueObject()}
                        disableCloseOnSelect
                        isOptionEqualToValue={(option, value) => {
                          return option.id === value.id
                        }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder={t('workOrder.nameWorkshop')}
                          />
                        )}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              {/**datePlan */}
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
                      {t('workOrder.planCV')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
                    <FormControl fullWidth>
                      <DateRangePicker
                        validator={this.validator}
                        isSubmitForm={isSubmitForm}
                        from={new Date(planWOFrom)}
                        to={new Date(planWOTo)}
                        isDisabled={isView}
                        onChangeFrom={(date) =>
                          onChangeDate(this, 'planWOFrom', date)
                        }
                        onChangeTo={(date) =>
                          onChangeDate(this, 'planWOTo', date)
                        }
                      />
                      {!isBefore(new Date(planWOTo), new Date(planTo)) &&
                        !isSameDay(new Date(planWOTo), new Date(planTo)) && (
                          <FormHelperText error>
                            {t('form.maxDate', {
                              to: formatDateTimeUtc(planTo, DATE_FORMAT),
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>{/** acceptedAt */}</Grid>
            <Grid container>
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  height={70}
                >
                  {startAt && (
                    <>
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('workOrder.dataStart')}
                        </label>
                      </Box>

                      <Box
                        width={0.7}
                        mx={2}
                        height={1}
                        display="flex"
                        alignItems="center"
                      >
                        <FormControl fullWidth>
                          {/* <DatePicker
                            name="productionDate"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin="dense"
                            size="small"
                            value={startAt || null}
                            fullWidth
                            onChange={(date) =>
                              onChangeDate(this, 'startAt', startAt)
                            }
                            clearable="true"
                            disabled
                          /> */}
                        </FormControl>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  height={70}
                >
                  {endAt && (
                    <>
                      <Box width={0.3}>
                        <label className={classes.labelItem}>
                          {t('workOrder.dateEnd')}
                        </label>
                      </Box>

                      <Box
                        width={0.7}
                        mx={2}
                        height={1}
                        display="flex"
                        alignItems="center"
                      >
                        <FormControl fullWidth>
                          {/* <DatePicker
                            name="productionDate"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin="dense"
                            size="small"
                            value={endAt || null}
                            fullWidth
                            onChange={(date) =>
                              onChangeDate(this, 'endAt', endAt)
                            }
                            clearable="true"
                            disabled
                          /> */}
                        </FormControl>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box mt={4}></Box>
            <Divider />
          </Box>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            {/** WorkOrder description */}
            <Box mt={2}>
              <div className={clsx(classes.marginLabel)}>
                <label className={classes.labelItem}>
                  {t('workOrder.description')}
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
              </FormControl>
            </Box>
          </Box>
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
  workOrder: state.workOrder,
  defineBOQ: state.defineBOQ,
  routingVersion: state.routingVersion,
  definePlan: state.definePlan,
  userList: state.commonManagement.userList,
  workCenter: state.workCenter,
})

const mapDispatchToProps = {
  createWorkOrder,
  updateWorkOrder,
  getWorkOrderDetailsById,
  confirmWorkOrderById,
  getWorkCenterDetailsById,
  getMODetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(WorkOrderForm)),
)
