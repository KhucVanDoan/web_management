import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  TextField,
} from '@mui/material'
import { withStyles } from '@mui/styles'
import {
  DATE_TIME_12_HOURS_FORMAT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  WORK_CENTER_STATUS,
  WORK_CENTER_STATUS_MAP,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'

import { Breadcrumbs } from 'components/Breadcrumbs'
import Loading from 'components/Loading'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import {
  deleteWorkCenter,
  createWorkCenter,
  updateWorkCenter,
  getWorkCenterDetailsById,
} from 'modules/mesx/redux/actions/work-center.action'
import {
  getUsers,
  getFactories,
} from 'modules/mesx/redux/actions/common.action'
import { searchProducingSteps } from 'modules/mesx/redux/actions/index.action'
import useStyles from './style'
import clsx from 'clsx'
import {
  formatDateTimeUtc,
  onChangeSelect,
  onChangeTextField,
  redirectRouter,
} from 'utils'
import { Autocomplete } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ShiftTable from './work-center-shifts'
import BreakTimeTable from './break-time'
import { max, groupBy, uniq, isEmpty } from 'lodash'

const DEFAULT_SHIFT = {
  id: 0,
  name: null,
  startAt: null,
  endAt: null,
  pricePerHour: '',
  priceUnit: '',
  breakTimes: [{ from: null, to: null }],
}
const DEFAULT_BREAK_TIME = {
  id: 0,
}
class WorkCenterForm extends Component {
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
      members: [],
      factoryId: null,
      leaderId: null,
      producingStepId: null,
      description: '',
      workPerformance: null,
      workingCapacity: null,
      oeeTarget: null,
      costPerHour: '',
      preProductionTime: '',
      postProductionTime: '',
      workingHours: '',
      mode: MODAL_MODE.CREATE,
      status: 0,
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      modalAction: () => {},
      isViewOnly: false,
      createdAt: '',
      updatedAt: '',
      tabValue: '1',
      shifts: [{ ...DEFAULT_SHIFT }],
      breakTimes: [{ ...DEFAULT_BREAK_TIME }],
    }
    this.validator = new SimpleReactValidator()
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.WORK_CENTER.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.WORK_CENTER.DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.WORK_CENTER.EDIT.PATH]: MODAL_MODE.UPDATE,
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
    this.getWorkCenterDetail()
    this.props.getUsers({ isGetAll: 1 })
    this.props.getFactories()
    this.props.searchProducingSteps({ isGetAll: 1 })
  }
  getWorkCenterDetail = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getWorkCenterDetailsById(id, (data) => {
        const {
          code,
          name,
          members,
          factoryId,
          leaderId,
          description,
          performance,
          productivityIndex,
          oeeIndex,
          cost,
          preProductionTime,
          postProductionTime,
          producingStep,
          workingHours,
          workCenterShifts,
          workCenterShiftRelaxTimes,
          createdAt,
          updatedAt,
        } = data
        const cloneProducingStep = JSON.parse(JSON.stringify(producingStep))
        const cloneWorkCenterShifts = JSON.parse(
          JSON.stringify(workCenterShifts),
        )
        const cloneWorkCenterShiftsRelaxTimes = JSON.parse(
          JSON.stringify(workCenterShiftRelaxTimes),
        )

        const breakTimes = []
        if (!isEmpty(cloneWorkCenterShiftsRelaxTimes)) {
          const relaxTimeGroupByShift = groupBy(
            cloneWorkCenterShiftsRelaxTimes,
            'workCenterShiftId',
          )
          const numberElementOfBreakTime = max(
            uniq(
              Object.values(relaxTimeGroupByShift).map(
                (relaxGroup) => relaxGroup.length,
              ),
            ),
          )
          for (let id = 0; id < numberElementOfBreakTime; id++) {
            breakTimes.push({
              id,
            })
          }
        }
        this.setState({
          code,
          name,
          members,
          factoryId,
          leaderId,
          description,
          producingStepId: cloneProducingStep.id,
          shifts: cloneWorkCenterShifts?.map((e, index) => ({
            id: index,
            name: e.name,
            pricePerHour: e.pricePerHour,
            priceUnit: e.priceUnit,
            startAt: new Date('1970-01-01T' + e.startAt).getTime(),
            endAt: new Date('1970-01-01T' + e.endAt).getTime(),
            breakTimes: cloneWorkCenterShiftsRelaxTimes
              .filter((b) => b.workCenterShiftId === e.id)
              .map((a, ind) => ({
                id: ind,
                name: a.name,
                from: new Date('1970-01-01T' + a.startAt).getTime(),
                to: new Date('1970-01-01T' + a.endAt).getTime(),
              })),
          })),
          breakTimes,
          workPerformance: performance,
          productivityIndex,
          oeeIndex,
          costPerHour: cost,
          preProductionTime,
          postProductionTime,
          workingHours,
          createdAt,
          updatedAt,
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
        members,
        factoryId,
        leaderId,
        description,
        workPerformance,
        producingStepId,
        productivityIndex,
        oeeIndex,
        costPerHour,
        preProductionTime,
        postProductionTime,
        workingHours,
        shifts,
      } = this.state
      const params = {
        code: code?.trim(),
        name,
        members: members.map((i) => ({ id: i.id })),
        factoryId,
        leaderId,
        description,
        producingStepId: +producingStepId,
        performance: +workPerformance,
        workingCapacity: +productivityIndex,
        oeeTarget: +oeeIndex,
        cost: +costPerHour,
        preProductionTime,
        postProductionTime,
        workingHours,
        workCenterShifts: shifts.map((i) => ({
          name: i.name,
          startAt: new Date(i.startAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
          endAt: new Date(i.endAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
          pricePerHour: +i.pricePerHour,
          priceUnit: i.priceUnit,
          relaxTimes: i.breakTimes.map((a) => ({
            name: a.name,
            startAt: new Date(a.from).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }),
            endAt: new Date(a.to).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }),
          })),
        })),
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createWorkCenter(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateWorkCenter(params, this.backToList)
      }
    }
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
      this.getWorkCenterDetail()
    }
  }
  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.WORK_CENTER.LIST.PATH)
  }
  /**
   * Handle change multiple value
   */
  handleChangeMultiple = (event, values) => {
    this.setState({
      members: values,
    })
  }
  handleChangeTabValue = (event, value) => {
    this.setState({
      tabValue: value,
    })
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
      members: [],
      factoryId: null,
      leaderId: null,
      producingStepId: null,
      description: '',
      workPerformance: '',
      workingCapacity: '',
      oeeTarget: '',
      costPerHour: '',
      preProductionTime: '',
      postProductionTime: '',
      workingHours: '',
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      shifts: [{ ...DEFAULT_SHIFT }],
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
        route: ROUTE.WORK_CENTER.LIST.PATH,
        title: ROUTE.WORK_CENTER.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.WORK_CENTER.CREATE.PATH,
          title: ROUTE.WORK_CENTER.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.WORK_CENTER.DETAIL.PATH + `/${id}`,
          title: ROUTE.WORK_CENTER.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.WORK_CENTER.EDIT.PATH + `/${id}`,
          title: ROUTE.WORK_CENTER.EDIT.TITLE,
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
        return ROUTE.WORK_CENTER.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.WORK_CENTER.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WORK_CENTER.EDIT.TITLE
      default:
    }
  }
  render() {
    const {
      code,
      name,
      description,
      leaderId,
      shifts,
      oeeIndex,
      members,
      factoryId,
      producingStepId,
      productivityIndex,
      isSubmitForm,
      mode,
      createdAt,
      updatedAt,
      tabValue,
      breakTimes,
      status,
    } = this.state
    const { t, classes, userList, workCenter, factoryList, producingStep } =
      this.props
    const producingStepList = producingStep?.list
    const memberIds = members?.map((i) => i.id)
    const userListFilter = userList?.filter((i) => !memberIds?.includes(i.id))
    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    this.validator.purgeFields()
    return (
      <Box>
        <Loading open={workCenter?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('menu.' + this.getTitle())}</h2>
        <Divider />
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            {status >= 0 && (
              <Box display="flex" justifyContent="space-between">
                <Box></Box>
                <Box
                  mt={1}
                  p={1}
                  className={clsx(classes.statusBox, {
                    [classes.blueText]: !(
                      status === WORK_CENTER_STATUS.REJECTED
                    ),
                    [classes.redText]: status === WORK_CENTER_STATUS.REJECTED,
                  })}
                  mr={3}
                >
                  {t(WORK_CENTER_STATUS_MAP[status])}
                </Box>
              </Box>
            )}
            {/** work center code */}
            <Grid container>
              <Grid item xs={12} lg={7} md={7}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml={10}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workCenter.code')}
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
                        inputProps={{ maxLength: 50 }}
                        disabled={isUpdate || isView}
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
            {/** work center name */}
            <Grid container>
              <Grid item xs={12} md={7} lg={7}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  ml={10}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workCenter.name')}
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
            {/** Member */}
            <Grid container>
              <Grid item xs={12} md={7} lg={7}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  ml={10}
                  mt={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workCenter.member')}
                    </label>
                    <span className={classes.required}> *</span>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <Autocomplete
                        multiple
                        id="members"
                        name="members"
                        size="small"
                        options={userListFilter}
                        getOptionLabel={(option) =>
                          option.fullName ? option.fullName : option.username
                        }
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                        onChange={this.handleChangeMultiple}
                        value={members}
                        disabled={isView}
                      />
                      {/* add rule to validate */}
                      {this.validator.message('members', members, `required`)}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(members, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/** factories */}
            <Grid container>
              <Grid item xs={12} md={7} lg={7}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml={10}
                  flex={1}
                  mt={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workCenter.factoryName')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="factoryId"
                        labelId="demo-customized-select-label"
                        id="factoryId"
                        value={factoryId}
                        variant="outlined"
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {factoryList.map((m, key) => {
                          return (
                            <MenuItem key={key} value={m.id}>
                              {m.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message(
                        'factoryId',
                        factoryId,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(factoryId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/** leader */}
            <Grid container>
              <Grid item xs={12} md={7} lg={7}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml={10}
                  mt={2}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workCenter.leader')}
                    </label>
                    <span className={classes.required}> *</span>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="leaderId"
                        labelId="demo-customized-select-label"
                        id="leaderId"
                        variant="outlined"
                        value={leaderId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {userList
                          .filter((i) => memberIds?.includes(i.id))
                          .map((m, key) => {
                            return (
                              <MenuItem key={key} value={m.id}>
                                {m.fullName ? m.fullName : m.username}
                              </MenuItem>
                            )
                          })}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message('leaderId', leaderId, `required`)}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(leaderId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/** producing step */}
            <Grid container>
              <Grid item xs={12} md={7} lg={7}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml={10}
                  mt={2}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workCenter.producingStep')}
                    </label>
                    <span className={classes.required}> *</span>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="producingStepId"
                        labelId="demo-customized-select-label"
                        id="producingStepId"
                        variant="outlined"
                        value={producingStepId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {producingStepList.map((m, key) => {
                          return (
                            <MenuItem key={key} value={m.id}>
                              {m.name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message(
                        'producingStepId',
                        producingStepId,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(producingStepId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/** device code */}
            <Grid container>
              <Grid item xs={12} md={7} lg={7}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml={10}
                  mt={2}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workCenter.deviceCode')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="deviceCode"
                        labelId="demo-customized-select-label"
                        id="deviceCode"
                        variant="outlined"
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        <MenuItem></MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/** device series */}
            <Grid container>
              <Grid item xs={12} md={7} lg={7}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml={10}
                  mt={2}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('workCenter.deviceSeries')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="deviceSeries"
                        labelId="demo-customized-select-label"
                        id="deviceSeries"
                        variant="outlined"
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        <MenuItem></MenuItem>
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
              {/** work center description */}
              <Box mt={2}>
                <div className={clsx(classes.marginLabel)}>
                  <label className={classes.labelItem}>
                    {t('workCenter.description')}
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
              {/**Details */}
              <Box width={8 / 8}>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={this.handleChangeTabValue}>
                      <Tab
                        label={
                          <React.Fragment>
                            <span>
                              {t('workCenter.detailInfo')}{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </span>
                          </React.Fragment>
                        }
                        value="1"
                      />
                      <Tab
                        label={
                          <React.Fragment>
                            <span>
                              {t('workCenter.timeSetup')}{' '}
                              <span style={{ color: 'red' }}>*</span>
                            </span>
                          </React.Fragment>
                        }
                        value="2"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="1" className={classes.tabPanel}>
                    <Grid container>
                      {/**OEE target */}
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
                              {t('workCenter.oeeGoal')}
                              <span className={classes.required}> *</span>
                            </label>
                          </Box>

                          <Box width={0.7} ml={2}>
                            <FormControl fullWidth>
                              <OutlinedInput
                                name="oeeIndex"
                                id="oeeIndex"
                                margin="dense"
                                variant="outlined"
                                size="small"
                                value={oeeIndex}
                                onChange={(event) =>
                                  onChangeTextField(this, event)
                                }
                                inputProps={{ maxLength: 5 }}
                                disabled={isView}
                                endAdornment={
                                  <InputAdornment position="end">
                                    {t('workCenter.ardornment.percent')}
                                  </InputAdornment>
                                }
                              />
                              {/* add rule to validate */}
                              {this.validator.message(
                                'oeeIndex',
                                oeeIndex,
                                `required`,
                              )}
                              {/* check isValid to show messages */}
                              {isSubmitForm &&
                                !this.validator.check(oeeIndex, `required`) && (
                                  <FormHelperText error>
                                    {t('form.required')}
                                  </FormHelperText>
                                )}
                            </FormControl>
                          </Box>
                        </Box>
                      </Grid>
                      {/**work capacity */}
                      <Grid item xs={12} lg={6} md={6}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          flex={1}
                          ml={2}
                        >
                          <Box width={0.3}>
                            <label className={classes.labelItem}>
                              {t('workCenter.workCapacity')}
                              <span className={classes.required}> *</span>
                            </label>
                          </Box>

                          <Box width={0.7} ml={2}>
                            <FormControl fullWidth>
                              <OutlinedInput
                                name="productivityIndex"
                                id="productivityIndex"
                                value={productivityIndex}
                                margin="dense"
                                variant="outlined"
                                size="small"
                                onChange={(event) =>
                                  onChangeTextField(this, event)
                                }
                                inputProps={{ maxLength: 5 }}
                                disabled={isView}
                              />
                              {/* add rule to validate */}
                              {this.validator.message(
                                'productivityIndex',
                                productivityIndex,
                                `required`,
                              )}
                              {/* check isValid to show messages */}
                              {isSubmitForm &&
                                !this.validator.check(
                                  productivityIndex,
                                  `required`,
                                ) && (
                                  <FormHelperText error>
                                    {t('form.required')}
                                  </FormHelperText>
                                )}
                            </FormControl>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="2" className={classes.tabPanel}>
                    <ShiftTable
                      shifts={shifts}
                      parent={this}
                      isSubmitForm={isSubmitForm}
                    />
                    {shifts.length > 0 && (
                      <BreakTimeTable
                        shifts={shifts}
                        parent={this}
                        breakTimes={breakTimes}
                        isSubmitForm={isSubmitForm}
                      />
                    )}
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
            {isView && (
              <Box display="flex">
                <Box fontWeight="bold" mr={2}>
                  {t('common.createdAt')}
                </Box>
                <Box
                  fontStyle="italic"
                  className={classes.textUppercase}
                  mr={4}
                >
                  {formatDateTimeUtc(createdAt, DATE_TIME_12_HOURS_FORMAT)}
                </Box>
                <Box fontWeight="bold" mr={2}>
                  {t('common.updatedAt')}
                </Box>
                <Box fontStyle="italic" className={classes.textUppercase}>
                  {formatDateTimeUtc(updatedAt, DATE_TIME_12_HOURS_FORMAT)}
                </Box>
              </Box>
            )}
            <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
              {this.renderActionButtons()}
            </Box>
          </Box>
        </form>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  workCenter: state.workCenter,
  userList: state.commonManagement.userList,
  factoryList: state.commonManagement.factoryList,
  producingStep: state.producingStep,
})

const mapDispatchToProps = {
  getUsers,
  getFactories,
  deleteWorkCenter,
  createWorkCenter,
  updateWorkCenter,
  getWorkCenterDetailsById,
  searchProducingSteps,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(WorkCenterForm)),
)
