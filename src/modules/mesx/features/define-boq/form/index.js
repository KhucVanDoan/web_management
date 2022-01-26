import React, { Component } from 'react'

import { Button, Divider, FormHelperText, Grid, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import DateRangePicker from '~/UNSAFE_components/shared/date-range-picker'
import Modal from '~/UNSAFE_components/shared/modal'
import {
  BOQ_STATUS,
  BOQ_STATUS_MAP,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  USER_ROLE,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import Page from '~/components/Page'
import { getItems, getUsers } from '~/modules/mesx/redux/actions/common.action'
import {
  confirmBOQById,
  createBOQ,
  getBOQDetailsById,
  rejectBOQById,
  updateBOQ,
} from '~/modules/mesx/redux/actions/define-boq'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  onChangeDate,
  onChangeSelect,
  onChangeTextField,
  redirectRouter,
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
class BOQForm extends Component {
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
      pmId: null,
      apmId: null,
      planFrom: '',
      planTo: '',
      description: '',
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
      [ROUTE.DEFINE_BOQ.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.DEFINE_BOQ.DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.DEFINE_BOQ.EDIT.PATH]: MODAL_MODE.UPDATE,
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
    this.getBOQDetail()
    this.props.getItems()
    this.props.getUsers()
  }

  getBOQDetail = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getBOQDetailsById(id, (data) => {
        const {
          code,
          name,
          pmId,
          apmId,
          planFrom,
          planTo,
          description,
          boqDetails,
          createdByUser,
          createdByUserId,
          status,
        } = data
        if (mode === MODAL_MODE.UPDATE && status !== BOQ_STATUS.PENDING) {
          redirectRouter(ROUTE.DEFINE_BOQ.DETAIL.PATH + `/${id}`)
        }
        const cloneBoqItems = JSON.parse(JSON.stringify(boqDetails))

        this.setState({
          code,
          name,
          pmId,
          apmId,
          planFrom,
          planTo,
          description,
          items: cloneBoqItems?.map((e, index) => ({
            id: index,
            itemId: e.itemId,
            quantity: e.quantity,
          })),
          createdByUser,
          createdByUserId,
          status,
          mode: status === BOQ_STATUS.REJECTED ? MODAL_MODE.UPDATE : mode,
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
        pmId,
        apmId,
        planFrom,
        planTo,
        description,
        createdByUserId,
        items,
      } = this.state
      const params = {
        code: code?.trim(),
        name,
        pmId,
        apmId,
        planFrom,
        planTo,
        boqItems: items.map((item) => ({
          id: item.itemId,
          quantity: +item.quantity,
        })),
        description,
        createdByUserId,
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createBOQ(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateBOQ(params, this.backToList)
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
   * Submit confirm BOQ
   */
  submitConfirmBOQ = () => {
    this.props.confirmBOQById(this.props.match.params.id, () => {
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
        pmId,
        apmId,
        planFrom,
        planTo,
        description,
        boqDetails,
        createdByUser,
        createdByUserId,
        status,
      } = this.props.defineBOQ.boqDetails
      const cloneBoqItems = JSON.parse(JSON.stringify(boqDetails))

      this.setState({
        code,
        name,
        pmId,
        apmId,
        planFrom,
        planTo,
        description,
        items: cloneBoqItems?.map((e, index) => ({
          id: index,
          itemId: e.itemId,
          quantity: e.quantity,
        })),
        createdByUser,
        createdByUserId,
        status,
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.DEFINE_BOQ.LIST.PATH)
  }

  /**
   *
   */
  goToMovementList = () => {
    redirectRouter(
      ROUTE.DEFINE_BOQ.MOVEMENTS.PATH + `/${this.props.match.params.id}`,
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
        ;<Box>
          <Button variant="contained" onClick={this.backToList}>
            {t('common.close')}
          </Button>
        </Box>
        switch (status) {
          // PENDING
          case BOQ_STATUS.PENDING:
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
          case BOQ_STATUS.APPROVED:
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
          case BOQ_STATUS.REJECTED:
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
          case BOQ_STATUS.CONFIRMED:
          case BOQ_STATUS.IN_PROGRESS:
          case BOQ_STATUS.COMPLETED:
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
        route: ROUTE.DEFINE_BOQ.LIST.PATH,
        title: ROUTE.DEFINE_BOQ.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOQ.CREATE.PATH,
          title: ROUTE.DEFINE_BOQ.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOQ.DETAIL.PATH + `/${id}`,
          title: ROUTE.DEFINE_BOQ.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOQ.EDIT.PATH + `/${id}`,
          title: ROUTE.DEFINE_BOQ.EDIT.TITLE,
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
        return ROUTE.DEFINE_BOQ.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DEFINE_BOQ.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_BOQ.EDIT.TITLE
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
      pmId,
      apmId,
      planFrom,
      planTo,
      description,
      items,
      status,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
    } = this.state
    const { t, classes, defineBOQ, userList } = this.props

    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    this.validator.purgeFields()
    return (
      <Page
        breadcrumbs={this.getBreadcrumb()}
        title={t('menu.' + this.getTitle())}
        loading={defineBOQ?.isLoading}
        onBack={() => {}}
      >
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            {status >= 0 && (
              <Box display="flex" justifyContent="space-between">
                <Box></Box>
                <Box
                  mt={1}
                  p={1}
                  className={clsx(classes.statusBox, {
                    [classes.blueText]: !(status === BOQ_STATUS.REJECTED),
                    [classes.redText]: status === BOQ_STATUS.REJECTED,
                  })}
                  mr={3}
                >
                  {t(BOQ_STATUS_MAP[status])}
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
                      {t('defineBOQ.boqCode')}
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
                        disabled={isUpdate || isView}
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
                      {t('defineBOQ.boqPm')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="pmId"
                        labelId="demo-customized-select-label"
                        id="pmId"
                        variant="outlined"
                        value={pmId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {userList.map((m, key) => {
                          return (
                            <MenuItem key={key} value={m.id}>
                              {m.fullName ? m.fullName : m.username}
                            </MenuItem>
                          )
                        })}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message('pmId', pmId, `required`)}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(pmId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
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
                  mr={2}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('defineBOQ.boqName')}
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
                      {t('defineBOQ.boqApm')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="apmId"
                        labelId="demo-customized-select-label"
                        id="apmId"
                        variant="outlined"
                        value={apmId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {userList.map((m, key) => {
                          return (
                            <MenuItem key={key} value={m.id}>
                              {m.fullName ? m.fullName : m.username}
                            </MenuItem>
                          )
                        })}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message('apmId', apmId, `required`)}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(apmId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
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
                        {t('defineBOQ.planList')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} mx={2} py={2}>
                      <FormControl fullWidth>
                        <DateRangePicker
                          validator={this.validator}
                          isSubmitForm={isSubmitForm}
                          from={planFrom || null}
                          to={planTo || null}
                          isRequiredFrom={false}
                          isRequiredTo={false}
                          isDisabled={isView}
                          onChangeFrom={(date) =>
                            onChangeDate(this, 'planFrom', date)
                          }
                          onChangeTo={(date) =>
                            onChangeDate(this, 'planTo', date)
                          }
                        />
                        {/* add rule to validate */}
                        {this.validator.message(
                          'planFrom',
                          planFrom,
                          `required`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(planFrom, `required`) && (
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
                        {t('defineBOQ.boqUserPermission')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} ml={2}>
                      <FormControl fullWidth size="small">
                        <Select
                          name="userPermission"
                          labelId="demo-customized-select-label"
                          id="userPermission"
                          variant="outlined"
                          className={clsx(classes.widthBoxSelect)}
                          onChange={(event) => onChangeSelect(this, event)}
                          disabled={true}
                        >
                          <MenuItem>Hello</MenuItem>
                        </Select>
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
                      {t('defineBOQ.descriptionInput')}
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
                      rows={4}
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
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  defineBOQ: state.defineBOQ,
  userList: state.commonManagement.userList,
})

const mapDispatchToProps = {
  confirmBOQById,
  createBOQ,
  getBOQDetailsById,
  updateBOQ,
  rejectBOQById,
  getItems,
  getUsers,
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(BOQForm)),
)
