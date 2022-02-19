import React, { Component } from 'react'

import { Button, Divider, FormHelperText, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import DateRangePicker from '~/UNSAFE_components/shared/date-range-picker'
import Modal from '~/UNSAFE_components/shared/modal'
import {
  DETAIL_SCHEDULE_STATUS,
  DETAIL_SCHEDULE_STATUS_MAP,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import {
  createDetailSchedule,
  generateDetailSchedule,
  getDetailScheduleDetailsById,
  updateDetailSchedule,
} from '~/modules/mesx/redux/actions/detail-schedule.action'
import {
  searchWorkOrders,
  getWorkOrderDetailsById,
} from '~/modules/mesx/redux/actions/work-order'
import { ROUTE } from '~/modules/mesx/routes/config'
import { onChangeTextField, redirectRouter } from '~/utils'

import ItemsSettingTable from './items-setting-table'
import useStyles from './style'

const MODAL_CONFIRM_TYPE = {
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
}
class DetailScheduleForm extends Component {
  /**
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      workOrderId: null,
      description: '',
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
      workCenterId: '',
      workOrderScheduleDetailsId: '',
    }
    this.validator = new SimpleReactValidator()
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    const workOrderId = parseInt(params.woId)
    this.props.getWorkOrderDetailsById(workOrderId, (res) => {
      this.setState({
        workOrderDetail: this.props.workOrder.workOrderDetails,
      })
    })
    this.genScheduleDetailForCreate(workOrderId)
    const MODE_MAP = {
      [ROUTE.DETAIL_SCHEDULE.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.DETAIL_SCHEDULE.DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.DETAIL_SCHEDULE.EDIT.PATH]: MODAL_MODE.UPDATE,
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
    this.getScheduleDetail()
    this.props.searchWorkOrders()
  }
  genScheduleDetailForCreate = (workOrderId) => {
    this.props.getDetailScheduleDetailsById(workOrderId, (data) => {
      const {
        id,
        workOrder,
        workOrderScheduleDetails,
        actualQuantity,
        quantity,
      } = data
      const cloneWorkOrder = JSON.parse(JSON.stringify(workOrder))
      const workOrderId = cloneWorkOrder.id
      this.props.getWorkOrderDetailsById(workOrderId, (res) => {
        this.setState({
          workOrderDetail: this.props.workOrder.workOrderDetails,
        })
      })
      this.setState({
        id,
        workOrderScheduleDetails: workOrderScheduleDetails.map((value, i) => ({
          ...value,
          index: i + 1,
        })),
        workOrderId: cloneWorkOrder.id,
        cloneWorkOrder,
        woQuantity: quantity,
        woActualQuantity: actualQuantity,
      })
    })
  }
  getScheduleDetail = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getDetailScheduleDetailsById(id, (data) => {
        const {
          id,
          workOrder,
          workOrderScheduleDetails,
          actualQuantity,
          quantity,
        } = data
        const cloneWorkOrder = JSON.parse(JSON.stringify(workOrder))
        const workOrderId = cloneWorkOrder.id
        this.props.getWorkOrderDetailsById(workOrderId, (res) => {
          this.setState({
            workOrderDetail: this.props.workOrder.workOrderDetails,
          })
        })
        this.setState({
          id,
          workOrderScheduleDetails: workOrderScheduleDetails.map(
            (value, i) => ({
              ...value,
              index: i + 1,
            }),
          ),
          workOrderId: cloneWorkOrder.id,
          cloneWorkOrder,
          woQuantity: quantity,
          woActualQuantity: actualQuantity,
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
        workOrderId,
        description,
        createdByUserId,
        workOrderDetail,
        workOrderScheduleDetails,
      } = this.state
      const params = {
        code: code?.trim(),
        planFrom: workOrderDetail.planFrom,
        planTo: workOrderDetail.planTo,
        workOrderId: +workOrderId,
        description,
        createdByUserId,
        scheduleDetails: workOrderScheduleDetails?.map((i) => ({
          workCenterId: i.workCenter.id,
          quantity: i.quantity,
          moderationQuantity: i.moderationQuantity,
        })),
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createDetailSchedule(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateDetailSchedule(params, this.backToList)
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
      modalAction: this.submitConfirmBOQ,
    })
  }
  /**
   * Submit confirm detail schedule
   */
  submitConfirmDetailSchedule = () => {
    this.props.confirmDetailScheduleById(this.props.match.params.id, () => {
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
        id,
        workOrder,
        workOrderScheduleDetails,
        status,
        actualQuantity,
        quantity,
      } = this.props.detailSchedule.detailScheduleDetails
      const cloneWorkOrder = JSON.parse(JSON.stringify(workOrder))
      const workOrderId = cloneWorkOrder.id
      this.props.getWorkOrderDetailsById(workOrderId, (res) => {
        this.setState({
          workOrderDetail: this.props.workOrder.workOrderDetails,
        })
      })
      this.setState({
        id,
        workOrderScheduleDetails: workOrderScheduleDetails.map((value, i) => ({
          ...value,
          index: i + 1,
        })),
        workOrderId: cloneWorkOrder.id,
        cloneWorkOrder,
        woQuantity: quantity,
        woActualQuantity: actualQuantity,
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.DETAIL_SCHEDULE.LIST.PATH)
  }

  /**
   *
   */
  goToWorkCenterPlan = () => {
    redirectRouter(`/${this.props.match.params.id}`)
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
    const { mode } = this.state
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
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box>
              <Button variant="contained" onClick={this.backToList}>
                {t('common.close')}
              </Button>
            </Box>
          </Box>
        )

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
      workOrderId: null,
      description: '',
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
        route: ROUTE.DETAIL_SCHEDULE.LIST.PATH,
        title: ROUTE.DETAIL_SCHEDULE.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DETAIL_SCHEDULE.CREATE.PATH,
          title: ROUTE.DETAIL_SCHEDULE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.DETAIL_SCHEDULE.DETAIL.PATH + `/${id}`,
          title: ROUTE.DETAIL_SCHEDULE.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DETAIL_SCHEDULE.EDIT.PATH + `/${id}`,
          title: ROUTE.DETAIL_SCHEDULE.EDIT.TITLE,
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
        return ROUTE.DETAIL_SCHEDULE.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DETAIL_SCHEDULE.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DETAIL_SCHEDULE.EDIT.TITLE
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
      description,
      status,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      woQuantity,
      workOrderDetail,
      workOrderScheduleDetails,
      modalAction,
    } = this.state
    const { t, classes, detailSchedule, workOrder } = this.props
    const checkSubItem =
      workOrderDetail?.bom?.itemName !== workOrderDetail?.moDetail?.itemName
    const isCreate = mode === MODAL_MODE.CREATE
    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    this.validator.purgeFields()
    return (
      <Box>
        {/* <Loading open={detailSchedule?.isLoading} /> */}
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
                    [classes.blueText]: !(
                      status === DETAIL_SCHEDULE_STATUS.REJECTED
                    ),
                    [classes.redText]:
                      status === DETAIL_SCHEDULE_STATUS.REJECTED,
                  })}
                  mr={3}
                >
                  {t(DETAIL_SCHEDULE_STATUS_MAP[status])}
                </Box>
              </Box>
            )}
            {!isCreate && (
              <Grid container>
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
                        {t('detailSchedule.code')}
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
                          disabled={true}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}
            <Grid container>
              {/** workOrder code */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={2}
                  flex={1}
                  mt={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('detailSchedule.workOrderCode')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <TextField
                        name="name"
                        id="name"
                        value={workOrderDetail?.code || null}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        disabled={true}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/**mo code  */}
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
                      {t('detailSchedule.moCode')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <TextField
                        name="name"
                        id="name"
                        value={workOrderDetail?.mo?.code || ''}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 255 }}
                        disabled={true}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** item name */}
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
                      {t('detailSchedule.itemName')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="name"
                        id="name"
                        value={workOrderDetail?.moDetail?.itemName || ''}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        disabled={true}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/**producing step */}
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
                      {t('detailSchedule.producingSteps')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <TextField
                        name="name"
                        id="name"
                        value={workOrderDetail?.producingStep?.name || ''}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        disabled={true}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>

              <Grid container>
                {/** subItem name */}
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
                        {t('detailSchedule.subItemName')}
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth>
                        <TextField
                          name="subItemName"
                          id="subItemName"
                          value={
                            checkSubItem ? workOrderDetail?.bom?.itemName : ''
                          }
                          margin="dense"
                          variant="outlined"
                          size="small"
                          disabled={true}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
                {/**plan period */}
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
                      <label className={clsx(classes.labelItem)}>
                        {t('detailSchedule.workPlan')}
                      </label>
                    </Box>

                    <Box width={0.7}>
                      <FormControl fullWidth>
                        <DateRangePicker
                          isSubmitForm={isSubmitForm}
                          from={workOrderDetail?.planFrom || null}
                          to={workOrderDetail?.planTo || null}
                          isRequiredFrom={false}
                          isRequiredTo={false}
                          isDisabled={true}
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
                {/** detail schedule description */}
                <Box mt={2}>
                  <div className={clsx(classes.marginLabel)}>
                    <label className={classes.labelItem}>
                      {t('detailSchedule.descriptionInput')}
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
                data={workOrderScheduleDetails}
                woQuantity={woQuantity}
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
  detailSchedule: state.detailSchedule,
  workOrder: state.workOrder,
})

const mapDispatchToProps = {
  searchWorkOrders,
  createDetailSchedule,
  generateDetailSchedule,
  getDetailScheduleDetailsById,
  updateDetailSchedule,
  getWorkOrderDetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(DetailScheduleForm)),
)
