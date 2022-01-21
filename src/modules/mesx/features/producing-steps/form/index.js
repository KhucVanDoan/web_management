import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import clsx from 'clsx'
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  Checkbox,
  MenuItem,
  Select,
} from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import { Breadcrumbs } from 'components/Breadcrumbs'
import Loading from 'components/Loading'
import Modal from 'UNSAFE_components/shared/modal'
import {
  createProducingStep,
  updateProducingStep,
  getProducingStepDetailsById,
} from 'modules/mesx/redux/actions/index.action'
import {
  MODAL_MODE,
  PRODUCING_STEP_STATUS,
  PRODUCING_STEP_STATUS_MAP,
  STAGES_OPTION,
  TEXTFIELD_REQUIRED_LENGTH,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'
import useStyles from './style'

import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import { onChangeTextField, redirectRouter, onChangeSelect } from 'utils'
import { searchWorkCenter } from 'modules/mesx/redux/actions/work-center.action'
import NumberFormat from 'react-number-format'
import { searchQualityPoints } from 'modules/mesx/redux/actions/common.action'

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      allowNegative={false}
      decimalScale={2}
      isAllowed={(values) => values.value < 100}
      onValueChange={(values) => {
        onChange({
          currentTarget: {
            name: 'productionTimePerItem',
          },
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator
      suffix=" Phút"
    />
  )
}

function ItemNumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      allowNegative={false}
      isAllowed={(values) => values.value < 100}
      onValueChange={(values) => {
        onChange({
          currentTarget: {
            name: 'completeItems',
          },
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator
      suffix=" %"
    />
  )
}
class ProducingStepForm extends Component {
  /**
   *
   * @param {object} props
   * @param {string} props.mode
   */

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      name: '',
      switchMode: '',
      workCenterId: null,
      completeItems: '',
      qcQuantityRule: '',
      qcCheck: false,
      isAll: true,
      description: '',
      isSubmitForm: false,
      mode: MODAL_MODE.CREATE,
      status: '-1',
      qualityPoint: null,
      productionTimePerItem: '',
      qcCriteriaId: null,
    }
    this.validator = new SimpleReactValidator()
  }

  /**
   * Render breadcrumb
   */
  getBreadcrumb = () => {
    const { mode } = this.state
    const breadcrumb = [
      {
        title: 'ProducingStep',
      },
      {
        route: ROUTE.PRODUCING_STEP.LIST.PATH,
        title: 'producingStep',
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.PRODUCING_STEP.CREATE.PATH,
          title: ROUTE.PRODUCING_STEP.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.PRODUCING_STEP.DETAIL.PATH + `/${id}`,
          title: ROUTE.PRODUCING_STEP.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.PRODUCING_STEP.EDIT.PATH + `/${id}`,
          title: ROUTE.PRODUCING_STEP.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  /**
   * get title
   */
  getTitle = () => {
    const { mode } = this.state
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.PRODUCING_STEP.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.PRODUCING_STEP.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.PRODUCING_STEP.EDIT.TITLE
      default:
    }
  }

  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.PRODUCING_STEP.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.PRODUCING_STEP.DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.PRODUCING_STEP.EDIT.PATH]: MODAL_MODE.UPDATE,
    }
    const id = this.props.match.params.id
    const path = this.props.match.path
    this.setState(
      {
        mode: MODE_MAP[path?.replace(id, ':id')],
      },
      this.refreshData,
    )
    this.props.searchWorkCenter()
    this.props.searchQualityPoints({
      isGetAll: 1,
    })
  }

  /**
   * handleChangeRadio
   */

  handleChangeRadio = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleChangeQCMode = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  /**
   *
   * @param {*} event
   */
  onToggleQcCheck = (event) => {
    const { qcCheck } = this.state
    this.setState({ qcCheck: !!event.target.checked })
  }

  /**
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    const { qcCheck } = this.state
    if (!qcCheck) {
      this.validator.purgeFields('qcCriteriaId')
      if (this.validator.allValid()) {
        const {
          code,
          name,
          description,
          workCenterId,
          switchMode,
          qcQuantityRule,
          qcCheck,
          productionTimePerItem,
          qcCriteriaId,
          completeItems,
        } = this.state

        const params = {
          code: code?.trim(),
          name,
          workCenterId,
          switchMode,
          qcCheck: qcCheck ? '1' : '0',
          description,
          qcQuantityRule: +qcQuantityRule,
          status: '0',
          productionTimePerItem: +productionTimePerItem,
          completeItems: +completeItems,
          qcCriteriaId,
        }
        if (this.state.mode === MODAL_MODE.CREATE) {
          this.props.createProducingStep(params, this.backToList)
        } else {
          params.id = +this.props.match.params.id
          this.props.updateProducingStep(params, this.backToList)
        }
      }
    } else {
      if (this.validator.allValid()) {
        const {
          code,
          name,
          description,
          workCenterId,
          switchMode,
          qcQuantityRule,
          qcCheck,
          productionTimePerItem,
          qcCriteriaId,
          completeItems,
        } = this.state

        const params = {
          code: code?.trim(),
          name,
          workCenterId,
          switchMode,
          qcCheck: qcCheck ? '1' : '0',
          description,
          qcQuantityRule: +qcQuantityRule,
          status: '0',
          productionTimePerItem: +productionTimePerItem,
          completeItems: +completeItems,
          qcCriteriaId,
        }
        if (this.state.mode === MODAL_MODE.CREATE) {
          this.props.createProducingStep(params, this.backToList)
        } else {
          params.id = +this.props.match.params.id
          this.props.updateProducingStep(params, this.backToList)
        }
      }
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.PRODUCING_STEP.LIST.PATH)
  }

  /**
   * refreshData
   */
  refreshData = () => {
    this.getProducingStepDetails()
  }

  /**
   * get details
   */
  getProducingStepDetails = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getProducingStepDetailsById(id, (data) => {
        const {
          code,
          name,
          switchMode,
          workCenterId,
          qcCheck,
          description,
          qcQuantityRule,
          status,
          productionTimePerItem,
          qcCriteriaId,
          completeItems,
        } = data
        this.setState({
          code,
          name,
          switchMode: switchMode.toString(),
          workCenterId,
          qcCheck: qcCheck === '1' ? true : false,
          description,
          qcQuantityRule: qcQuantityRule.toString(),
          status,
          productionTimePerItem: productionTimePerItem,
          qcCriteriaId,
          completeItems,
        })
      })
  }
  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
    this.backToList()
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
        switchMode,
        qcCheck,
        workCenterId,
        description,
        qcQuantityRule,
        productionTimePerItem,
        qcCriteriaId,
        completeItems,
        // qualityPoint,
      } = this.props.producingStep.details
      this.setState({
        code,
        name,
        qcCheck: qcCheck === '1' ? true : false,
        description,
        workCenterId,
        switchMode: switchMode.toString(),
        qcQuantityRule: qcQuantityRule.toString(),
        productionTimePerItem,
        qcCriteriaId,
        completeItems,
        // qualityPoint,
      })
    }
  }

  /**
   * Reset form
   */
  resetForm = () => {
    this.setState({
      code: '',
      name: '',
      switchMode: '',
      workCenterId: null,
      completeItems: '',
      qcQuantityRule: '',
      qcCheck: false,
      description: '',
      isSubmitForm: false,
      mode: MODAL_MODE.CREATE,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      qualityPoint: null,
      productionTimePerItem: '',
      qcCriteriaId: null,
    })
  }

  render() {
    const {
      code,
      name,
      switchMode,
      workCenterId,
      completeItems,
      qcCheck,
      qcQuantityRule,
      description,
      isSubmitForm,
      mode,
      isAll,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
      status,
      qualityPoint,
      productionTimePerItem,
      qcCriteriaId,
    } = this.state
    const { t, classes, producingStep, wcList, qcList } = this.props
    const isView = mode === MODAL_MODE.DETAIL
    const isCreate = mode === MODAL_MODE.CREATE
    const isUpdate = mode === MODAL_MODE.UPDATE
    return (
      <Box>
        <Loading open={producingStep?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('menu.' + this.getTitle())}</h2>
        <Divider />
        {status >= 0 && (
          <Box display="flex" justifyContent="space-between">
            <Box></Box>
            <Box
              mt={1}
              p={1}
              className={clsx(classes.statusBox, {
                [classes.blueText]: !(
                  status === PRODUCING_STEP_STATUS.REJECTED
                ),
                [classes.redText]: status === PRODUCING_STEP_STATUS.REJECTED,
              })}
              mr={3}
            >
              {t(PRODUCING_STEP_STATUS_MAP[status])}
            </Box>
          </Box>
        )}
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
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
                    <label className={clsx(classes.labelItem)}>
                      {t('producingStep.code')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
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
                      {/* add rule to validate */}
                      {this.validator.message(
                        'code',
                        code,
                        `required|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX}`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(code, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}

                      {isSubmitForm &&
                        !this.validator.check(
                          code,
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
                    <label className={clsx(classes.labelItem)}>
                      {t('producingStep.name')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
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

              {/** switchMode */}
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
                      {t('producingStep.switchMode')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
                    <FormControl fullWidth>
                      <RadioGroup
                        aria-label="switchMode"
                        name="switchMode"
                        value={switchMode}
                        onChange={(event) => this.handleChangeRadio(event)}
                      >
                        <FormControlLabel
                          label={t('producingStep.allItemComplete') + '?'}
                          key={0}
                          value="0"
                          disabled={isView}
                          control={<Radio color="primary" />}
                        />
                        <FormControlLabel
                          label={t('producingStep.someItemComplete') + '?'}
                          key={1}
                          value="1"
                          disabled={isView}
                          control={<Radio color="primary" />}
                        />
                      </RadioGroup>
                      {/* add rule to validate */}
                      {this.validator.message(
                        `switchMode`,
                        switchMode,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(switchMode, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** ten xuong */}
              <Grid item xs={12} lg={6} md={6}></Grid>

              {/** completeItems */}
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
                      {t('producingStep.completeItems')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="completeItems"
                        id="completeItems"
                        value={completeItems}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled={isView}
                        InputProps={{
                          inputComponent: ItemNumberFormatCustom,
                        }}
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'completeItems',
                        completeItems,
                        `required`,
                      )}

                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(completeItems, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/* thoi gian thuc hien 1 san pham/cong doan */}
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
                      {t('producingStep.timePerProduct')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="productionTimePerItem"
                        id="productionTimePerItem"
                        value={productionTimePerItem}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 255 }}
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                        disabled={isView}
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'productionTimePerItem',
                        productionTimePerItem,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(
                          productionTimePerItem,
                          `required`,
                        ) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}

                      {isSubmitForm &&
                        !this.validator.check(
                          productionTimePerItem,
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
              {/** ten xuong */}
              {/* <Grid item xs={12} lg={6} md={6}> */}
              {/*   <Box */}
              {/*     display="flex" */}
              {/*     justifyContent="space-between" */}
              {/*     alignItems="center" */}
              {/*     mr={1} */}
              {/*     flex={1} */}
              {/*   > */}
              {/*     <Box width={0.3}> */}
              {/*       <label className={clsx(classes.labelItem)}> */}
              {/*         {t('producingStep.typeCalculation')} */}
              {/*         <span className={classes.required}> *</span> */}
              {/*       </label> */}
              {/*     </Box> */}

              {/*     <Box width={0.7} mx={2} py={2}> */}
              {/*       <FormControl fullWidth> */}
              {/*         <RadioGroup aria-label="gender" name="gender1" value={typeCalculation} onChange={this.handleChangeRadio}> */}
              {/*           <FormControlLabel value="automatic" control={<Radio />} label="Tự tính theo thời gian thực" /> */}
              {/*           <FormControlLabel value="schedule" control={<Radio />} label="Đặt khoảng thời gian mặc định" /> */}
              {/*         </RadioGroup> */}
              {/*         {/1* add rule to validate *1/} */}
              {/*         {this.validator.message('typeCalculation', typeCalculation, `required`)} */}
              {/*         {/1* check isValid to show messages *1/} */}
              {/*         {isSubmitForm && */}
              {/*           !this.validator.check('typeCalculation', `required`) && ( */}
              {/*             <FormHelperText error> */}
              {/*               {t('form.required')} */}
              {/*             </FormHelperText> */}
              {/*           )} */}
              {/*       </FormControl> */}
              {/*     </Box> */}
              {/*   </Box> */}
              {/* </Grid> */}

              {/** time calculation */}
              {/* <Grid item xs={12} lg={6} md={6}> */}
              {/*   <Box */}
              {/*     display="flex" */}
              {/*     justifyContent="space-between" */}
              {/*     alignItems="center" */}
              {/*     mr={1} */}
              {/*     flex={1} */}
              {/*   > */}
              {/*     <Box width={0.3}> */}
              {/*       <label className={clsx(classes.labelItem)}> */}
              {/*         {t('producingStep.timeCalculation')} */}
              {/*       </label> */}
              {/*     </Box> */}

              {/*     <Box width={0.7} mx={2} py={2}> */}
              {/*       <FormControl fullWidth> */}
              {/*         <TextField */}
              {/*           name="timeCalculation" */}
              {/*           id="timeCalculation" */}
              {/*           value={timeCalculation} */}
              {/*           margin="dense" */}
              {/*           variant="outlined" */}
              {/*           size="small" */}
              {/*           onChange={(event) => onChangeTextField(this, event)} */}
              {/*           inputProps={{maxLength: 20}} */}
              {/*           disabled={isView} */}
              {/*         /> */}
              {/*       </FormControl> */}
              {/*     </Box> */}
              {/*   </Box> */}
              {/* </Grid> */}
              {/** qcQuantityRule */}
              {/* <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={clsx(classes.labelItem)}>
                      {t('producingStep.qcQuantityRule')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
                    <FormControl fullWidth>
                      <RadioGroup
                        aria-label="qcQuantityRule"
                        name="qcQuantityRule"
                        value={qcQuantityRule}
                        id="qcQuantityRule"
                        onChange={(event) => this.handleChangeQCMode(event)}
                      >
                        {[
                          {
                            id: '100',
                            name: t('producingStep.qcRule.all') + '?',
                          },
                          { id: '1', name: t('producingStep.qcRule.random') },
                        ].map((datum) => (
                          <FormControlLabel
                            label={datum.name}
                            key={datum.id}
                            value={datum.id}
                            control={<Radio color="primary" />}
                            disabled={isView || !qcCheck}
                          />
                        ))}
                      </RadioGroup> */}
              {/* add rule to validate */}
              {/* {this.validator.message(
                        `qcQuantityRule`,
                        qcQuantityRule,
                        `required`,
                      )} */}
              {/* check isValid to show messages */}
              {/* {qcCheck &&
                        isSubmitForm &&
                        !this.validator.check(qcQuantityRule, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid> */}
              {/** qcCheck */}
              <Grid item xs={12} lg={6} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={qcCheck}
                      onChange={(event) => this.onToggleQcCheck(event)}
                      name="qcCheck"
                      color="primary"
                      disabled={isView}
                    />
                  }
                  label={t('producingStep.processQc') + '?'}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={clsx(classes.labelItem)}>
                      {t('producingStep.qcCriteria')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} mx={2} py={2}>
                    <FormControl fullWidth>
                      <Select
                        name="qcCriteriaId"
                        labelId="demo-customized-select-label"
                        id="qcCriteriaId"
                        variant="outlined"
                        value={qcCriteriaId || ''}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView || !qcCheck}
                      >
                        {qcList
                          .filter((i) => i.stage === STAGES_OPTION.PRODUCTION)
                          .map((item) => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          ))}
                      </Select>
                      {/* add rule to validate */}
                      {qcCheck &&
                        this.validator.message(
                          'qcCriteriaId',
                          qcCriteriaId,
                          `required`,
                        )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        qcCheck &&
                        !this.validator.check(qcCriteriaId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** QC user */}
              {/*<Grid item xs={12} lg={6} md={6}> */}
              {/*  <Box */}
              {/*    display="flex" */}
              {/*    justifyContent="space-between" */}
              {/*    alignItems="center" */}
              {/*    mr={1} */}
              {/*    flex={1} */}
              {/*  > */}
              {/*    <Box width={0.3}> */}
              {/*      <label className={clsx(classes.labelItem)}> */}
              {/*        {t('producingStep.userQcId')} */}
              {/*        <span className={classes.required}> *</span> */}
              {/*      </label> */}
              {/*    </Box> */}

              {/*    <Box width={0.7} mx={2} py={2}> */}
              {/*      <FormControl fullWidth> */}
              {/*        <Select */}
              {/*          name="userQcId" */}
              {/*          labelId="demo-customized-select-label" */}
              {/*          id="userQcId" */}
              {/*          variant="outlined" */}
              {/*          value={userQcId} */}
              {/*          className={clsx(classes.widthBoxSelect)} */}
              {/*          onChange={(event) => onChangeSelect(this, event)} */}
              {/*          disabled={!isCreate} */}
              {/*        > */}
              {/*          {[{id: 1, name: 'Lan'}, {id: 2, name: 'Điệp'}].map((item) => ( */}
              {/*            <MenuItem value={item.id}>{item.name}</MenuItem> */}
              {/*          ))} */}
              {/*        </Select> */}
              {/*        {/1* add rule to validate *1/} */}
              {/*        {this.validator.message('userQcId', userQcId, `required`)} */}
              {/*        {/1* check isValid to show messages *1/} */}
              {/*        {isSubmitForm && */}
              {/*          !this.validator.check('userQcId', `required`) && ( */}
              {/*            <FormHelperText error> */}
              {/*              {t('form.required')} */}
              {/*            </FormHelperText> */}
              {/*          )} */}
              {/*      </FormControl> */}
              {/*    </Box> */}
              {/*  </Box> */}
              {/*</Grid> */}
              {/*{/1** amountQc *1/} */}
              {/*<Grid item xs={12} lg={6} md={6}> */}
              {/*  <Box */}
              {/*    display="flex" */}
              {/*    justifyContent="space-between" */}
              {/*    alignItems="center" */}
              {/*    mr={1} */}
              {/*    flex={1} */}
              {/*  > */}
              {/*    <Box width={0.3}> */}
              {/*      <label className={clsx(classes.labelItem)}> */}
              {/*        {t('producingStep.amountQc')} */}
              {/*        <span className={classes.required}> *</span> */}
              {/*      </label> */}
              {/*    </Box> */}

              {/*    <Box width={0.7} mx={2} py={2}> */}
              {/*      <FormControl fullWidth> */}
              {/*        <TextField */}
              {/*          name="amountQc" */}
              {/*          id="amountQc" */}
              {/*          value={amountQc} */}
              {/*          margin="dense" */}
              {/*          variant="outlined" */}
              {/*          size="small" */}
              {/*          onChange={(event) => onChangeTextField(this, event)} */}
              {/*          inputProps={{maxLength: 20}} */}
              {/*          disabled={isView} */}
              {/*        /> */}
              {/*        {/1* check isValid to show messages *1/} */}
              {/*        {isSubmitForm && */}
              {/*          !this.validator.check(amountQc, `required`) && ( */}
              {/*            <FormHelperText error> */}
              {/*              {t('form.required')} */}
              {/*            </FormHelperText> */}
              {/*          )} */}
              {/*      </FormControl> */}
              {/*    </Box> */}
              {/*  </Box> */}
              {/*</Grid> */}
            </Grid>
            <Divider />
          </Box>

          <Box
            className={clsx(classes.marginAuto, classes.marginLabel)}
            mt={10}
          >
            {/** report warehouse note */}
            <Box mt={2}>
              <div>
                <label className={clsx(classes.labelItem)}>
                  {t('producingStep.description')}
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
            <input type="file" />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            {(isCreate || isUpdate) && (
              <>
                <Box m={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    {isCreate && t('common.create')}
                    {isUpdate && t('common.save')}
                  </Button>
                </Box>
                <Box m={1}>
                  <Button variant="contained" onClick={this.onCancel}>
                    {t('common.cancel')}
                  </Button>
                </Box>
              </>
            )}
            {(isCreate || isUpdate || isView) && (
              <Box m={1}>
                <Button variant="contained" onClick={this.backToList}>
                  {t('common.close')}
                </Button>
              </Box>
            )}
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
  producingStep: state.producingStep,
  wcList: state.workCenter.wcList,
  qcList: state.commonManagement.qcList,
})

const mapDispatchToProps = {
  createProducingStep,
  updateProducingStep,
  getProducingStepDetailsById,
  searchWorkCenter,
  searchQualityPoints,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ProducingStepForm)),
)
