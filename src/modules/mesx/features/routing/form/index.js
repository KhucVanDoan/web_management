import React, { Component } from 'react'

import { Button, Divider, FormHelperText, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { generatePath } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  NOTIFICATION_TYPE,
  MODAL_MODE,
  ROUTING_STATUS,
  ROUTING_STATUS_MAP,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import { getItems, getWarehouses } from '~/modules/mesx/redux/actions/common'
import {
  confirmRoutingById,
  createRouting,
  getRoutingDetailsById,
  updateRouting,
} from '~/modules/mesx/redux/actions/routing.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import { onChangeTextField, redirectRouter } from '~/utils'
import addNotification from '~/utils/toast'

import ProducingStepsTable from '../routing-version/routing-version-form/producing-steps-table'
import useStyles from './style'

const MODAL_CONFIRM_TYPE = {
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
}

const DEFAULT_PRODUCING_STEP = {
  id: 1,
  operationId: null,
  order: 1,
  stepNumber: 1,
  min: 1,
  max: 1,
}

class RoutingForm extends Component {
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
      createdAt: null,
      mode: MODAL_MODE.CREATE,
      status: -1,
      producingSteps: [{ ...DEFAULT_PRODUCING_STEP }],
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      modalAction: () => {},
    }

    // this.validator = new SimpleReactValidator();

    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.ROUTING_CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.ROUTING_DETAILS.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.ROUTING_EDIT.PATH]: MODAL_MODE.UPDATE,
    }
    const path = this.props.match?.path
    const search = new URLSearchParams(this.props.location?.search)
    this.setState(
      {
        mode: MODE_MAP[path],
        isViewOnly: !!search.get('isViewOnly'),
      },
      this.refreshData,
    )
  }

  /**
   *
   * @param {array} data
   * @returns
   */
  convertProducingSteps = (data) => {
    return data
      .sort((a, b) => a?.stepNumber - b?.stepNumber)
      .map((step, index) => ({
        ...step,
        id: index + 1,
        operationId: step?.id,
        min: data[index - 1] ? data[index - 1].stepNumber : 1,
        max: data[index - 1] ? data[index - 1].stepNumber + 1 : 2,
      }))
  }

  /**
   * Refresh init data
   */
  refreshData = () => {
    this.getRoutingDetails()
  }

  /**
   * getRoutingDetails
   */
  getRoutingDetails = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getRoutingDetailsById(id, (data) => {
        const { code, name, description, createdAt, status, producingSteps } =
          data
        if (mode === MODAL_MODE.UPDATE && status !== ROUTING_STATUS.CREATED) {
          redirectRouter(ROUTE.ROUTING_DETAILS.PATH, { id })
        }
        this.setState({
          code,
          name,
          description,
          createdAt,
          status,
          producingSteps: this.convertProducingSteps(producingSteps),
        })
      })
  }

  /**
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    // if (this.validator.allValid() && this.checkDuplicateOrderCode()) {
    if (this.validator.allValid()) {
      const { code, name, description, producingSteps } = this.state
      const params = {
        code: code?.trim(),
        name,
        description,
        producingSteps: producingSteps.map((item) => ({
          id: item.operationId,
          stepNumber: item.stepNumber,
        })),
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        const length = producingSteps.length
        if (!this.isGrow(producingSteps, length)) {
          addNotification(
            'routingVersion.softOrderErr',
            NOTIFICATION_TYPE.ERROR,
          )
          return false
        }

        if (producingSteps[0].stepNumber !== 1) {
          addNotification('routingVersion.errorOrder', NOTIFICATION_TYPE.ERROR)
          return false
        } else {
          this.props.createRouting(params, this.backToList)
        }
      } else {
        params.id = +this.props.match.params.id
        const length = producingSteps.length
        if (!this.isGrow(producingSteps, length)) {
          addNotification(
            'routingVersion.softOrderErr',
            NOTIFICATION_TYPE.ERROR,
          )
          return false
        }

        if (producingSteps[0].stepNumber !== 1) {
          addNotification('routingVersion.errorOrder', NOTIFICATION_TYPE.ERROR)
          return false
        } else {
          this.props.updateRouting(params, this.backToList)
        }
      }
    }
  }

  isGrow(a, n) {
    let count = 0
    for (let i = 0; i < n - 1; i++) {
      if (
        a[i + 1].stepNumber === a[i].stepNumber ||
        a[i + 1].stepNumber - a[i].stepNumber === 1
      )
        count++
    }
    if (count === n - 1) return true
    else return false
  }

  /**
   * Open approve modal
   */
  openApproveModal = () => {
    this.setState({
      isOpenConfirmModal: true,
      confirmMessage: 'common.confirmMessage.confirm',
      modalConfirmType: MODAL_CONFIRM_TYPE.APPROVE,
      modalAction: this.submitConfirmRouting,
    })
  }

  /**
   * Submit confirm production order
   */
  submitConfirmRouting = () => {
    this.props.confirmRoutingById(this.props.match.params.id, () => {
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
      const { code, name, description, createdAt, status } =
        this.props.routing.routingDetails
      this.setState({
        code,
        name,
        description,
        createdAt,
        status,
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.ROUTING.PATH)
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
    this.backToList()
  }

  /**
   * Go to routing version management
   */
  goToRoutingVersionList = () => {
    redirectRouter(ROUTE.ROUTING_VERSION.PATH, {
      id: this.props.match.params.id,
    })
  }

  /**
   * Render action buttons based on mode and status
   * @returns {JSX.Element}
   */
  renderActionButtons = () => {
    const { mode, status, producingSteps, isSubmitForm } = this.state
    const { t } = this.props
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
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
          <Box mt={2} display="flex" justifyContent="flex-end">
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
          // CREATED
          case ROUTING_STATUS.CREATED:
            return (
              <Box mt={2} display="flex" justifyContent="flex-end">
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
          case ROUTING_STATUS.CONFIRMED:
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
   * Reset form
   */
  resetForm = () => {
    this.setState({
      code: '',
      name: '',
      description: '',

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
        title: 'database',
      },
      {
        route: ROUTE.ROUTING.PATH,
        title: ROUTE.ROUTING.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.ROUTING_CREATE.PATH,
          title: ROUTE.ROUTING_CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: generatePath(ROUTE.ROUTING_DETAILS.PATH, { id }),
          title: ROUTE.ROUTING_DETAILS.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: generatePath(ROUTE.ROUTING_EDIT.PATH, { id }),
          title: ROUTE.ROUTING_EDIT.TITLE,
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
        return ROUTE.ROUTING_CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.ROUTING_DETAILS.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ROUTING_EDIT.TITLE
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
      status,
      producingSteps,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
    } = this.state

    const { t, classes, routing } = this.props

    const isView = mode === MODAL_MODE.DETAIL
    this.validator.purgeFields()

    return (
      <Box>
        <Loading open={routing?.isLoading} />
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
                  className={clsx(classes.statusBox, classes.blueText)}
                  mr={3}
                >
                  {t(ROUTING_STATUS_MAP[status])}
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
                  flex={1}
                  mt={1}
                  mb={2}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('routing.code')}
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
                        `required|alpha_num|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX}`,
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
                          `max:${TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX}`,
                        ) && (
                          <FormHelperText error>
                            {t('form.maxLength', {
                              max: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              {/** name */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  mb={2}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('routing.name')}
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
                        disabled={isView}
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'name',
                        name,
                        `required|max:${TEXTFIELD_REQUIRED_LENGTH.NAME.MAX}`,
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
                          `max:${TEXTFIELD_REQUIRED_LENGTH.NAME.MAX}`,
                        ) && (
                          <FormHelperText error>
                            {t('form.maxLength', {
                              max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Divider />
          </Box>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            {/** Routing description */}
            <Box mt={2}>
              <div className={clsx(classes.marginLabel)}>
                <label className={classes.labelItem}>
                  {t('routing.descriptionInput')}
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
              <ProducingStepsTable
                parent={this}
                producingSteps={producingSteps}
                isSubmitForm={isSubmitForm}
                mode={mode}
              />
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
  routing: state.routing,
  factories: state.appStore.factories,
})

const mapDispatchToProps = {
  createRouting,
  updateRouting,
  getRoutingDetailsById,
  getItems,
  getWarehouses,
  confirmRoutingById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(RoutingForm)),
)
