import React from 'react'
import { Component } from 'react'

// import DateFnsUtils from '@date-io/date-fns' // choose your lib

// import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers' // @TODO: use mui v5 instead

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, FormHelperText } from '@mui/material'
import { Autocomplete } from '@mui/material'
import Box from '@mui/material/Box'
import CheckBox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import Modal from '~/UNSAFE_components/shared/modal'
import {
  DATE_TIME_12_HOURS_FORMAT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { getFactoriesByCompany } from '~/modules/mesx/redux/actions/common.action'
import {
  getWarehouses,
  getWarehousesByFactories,
} from '~/modules/mesx/redux/actions/common.action'
import {
  createUser,
  updateUser,
  deleteUser,
  getUserDetailsById,
} from '~/modules/mesx/redux/actions/user-management.action'
import { formatDateTimeUtc } from '~/utils'
import { onChangeTextField } from '~/utils'

import useStyles from './style'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const MAX_DATE_OF_BIRTHDAY = new Date().setFullYear(
  new Date().getFullYear() - 18,
)
class UserForm extends Component {
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
      username: '',
      dateOfBirth: null,
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      email: '',
      fullName: '',
      phone: '',
      companyId: null,
      factoryIds: [],
      userRoleId: null,
      departmentIds: [],
      warehouseIds: [],
      createdAt: '',
      updatedAt: '',

      isSubmitForm: false,
    }

    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.props.getWarehouses()
  }

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    // on user id change
    if (
      prevProps.id !== this.props.id &&
      this.props.id &&
      this.props.isOpenModal
    ) {
      this.props.getUserDetailsById(this.props.id, (data) => {
        const {
          code,
          companyId,
          email,
          factories,
          fullName,
          userRoleSettings,
          username,
          userWarehouses,
          departmentSettings,
          phone,
          dateOfBirth,
          createdAt,
          updatedAt,
        } = data
        this.setState({
          code,
          companyId,
          email,
          factories,
          fullName,
          username,
          userRoleId:
            userRoleSettings?.length > 0 ? userRoleSettings[0]?.id : null,
          departmentIds: departmentSettings?.map(
            (department) => department?.id,
          ),
          factoryIds: factories?.map((factory) => factory?.id),
          warehouseIds: userWarehouses?.map((warehouse) => warehouse.id),
          phone,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          createdAt,
          updatedAt,
        })
      })
    }
    if (prevProps.id !== this.props.id && !this.props.id) {
      this.resetForm()
    }
  }

  onChangeDepartmentIds = (event, values) => {
    this.setState({ departmentIds: values?.map((item) => item?.id) })
  }

  onChangeWarehouseIds = (event, values) => {
    this.setState({ warehouseIds: values?.map((item) => item?.id) })
  }

  /**
   * Handle date change
   * @param {Date} date
   */
  handleDateChange = (date) => {
    this.setState({
      dateOfBirth: new Date(date),
    })
  }

  /**
   * Toggle show password
   */
  handleToggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  handleToggleShowConfirmPassword = () => {
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword,
    })
  }

  handleChangeCompany = (value) => {
    this.setState({ factoryIds: [], warehouseIds: [], companyId: value })
  }

  handleChangeFactory = (event, values) => {
    this.setState({
      factoryIds: values?.map((item) => item?.id),
      warehouseIds: [],
    })
  }

  getWarehouseValueObject = () => {
    const { warehouseIds } = this.state
    const warehouseList = this.props.warehouses
    return warehouseList
      ?.filter((item) => warehouseIds?.includes(item?.id))
      ?.map((item2) => {
        return { id: item2.id, name: item2.name }
      })
  }

  getFactoryValueObject = () => {
    const { factoryIds } = this.state
    const { factories } = this.props
    return factories?.filter((item) => factoryIds?.includes(item?.id))
  }

  getUserRoleValueObject = () => {
    const { userRoleId } = this.state
    const { roles } = this.props
    if (userRoleId === null) return ''
    return roles?.find((i) => i?.id === userRoleId)
  }

  getDepartmentValueObject = () => {
    const { departmentIds } = this.state
    const { deparments } = this.props
    return deparments?.filter((item) => departmentIds?.includes(item?.id))
  }

  getCompanyValueObject = () => {
    const { companyId } = this.state
    const { companies } = this.props
    if (companyId === null) return ''
    return companies?.find((i) => i?.id === companyId)
  }
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    const { password, confirmPassword } = this.state
    if (this.validator.allValid() && password === confirmPassword) {
      const {
        code,
        username,
        dateOfBirth,
        email,
        fullName,
        phone,
        companyId,
        factoryIds,
        warehouseIds,
        departmentIds,
        userRoleId,
      } = this.state
      const params = {
        code: code?.trim(),
        username: username?.trim(),
        dateOfBirth,
        password,
        email: email?.trim(),
        fullName: fullName?.trim(),
        phone: phone?.trim(),
        companyId,
        factories: factoryIds?.map((factoryId) => {
          return { id: factoryId }
        }),
        departmentSettings: departmentIds?.map((departmentId) => {
          return { id: departmentId }
        }),
        userRoleSettings: [{ id: userRoleId }],
        userWarehouses: warehouseIds?.map((warehouseId) => {
          return { id: warehouseId }
        }),
      }
      if (this.props.modalMode === MODAL_MODE.CREATE) {
        this.props.createUser(params, () => {
          this.onCloseModal()
          this.props.handleCloseModal(true)
        })
      } else {
        params.id = this.props.id
        this.props.updateUser(params, () => {
          this.props.handleCloseModal(true)
        })
      }
    }
  }

  onCloseModal = () => {
    this.resetForm()

    // callback action from parent
    this.props.handleCloseModal(true)
  }

  /**
   * Handle cancel modal
   */
  onCancelModal = () => {
    const { modalMode } = this.props
    if (modalMode === MODAL_MODE.CREATE) {
      this.resetForm()
    }
    if (modalMode === MODAL_MODE.UPDATE) {
      const {
        code,
        companyId,
        email,
        factories,
        fullName,
        userRoleSettings,
        username,
        userWarehouses,
        departmentSettings,
        phone,
        dateOfBirth,
        createdAt,
        updatedAt,
      } = this.props.userManagement.userDetails
      this.setState({
        code,
        companyId,
        email,
        factories,
        fullName,
        username,
        userRoleId:
          userRoleSettings?.length > 0 ? userRoleSettings[0]?.id : null,
        departmentIds: departmentSettings?.map((department) => department?.id),
        factoryIds: factories?.map((factory) => factory?.id),
        warehouseIds: userWarehouses?.map((warehouse) => warehouse.id),
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        createdAt,
        updatedAt,
      })
    }
  }

  resetForm = () => {
    this.setState({
      code: '',
      username: '',
      dateOfBirth: null,
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      email: '',
      fullName: '',
      phone: '',
      companyId: null,
      factoryIds: [],
      userRoleId: null,
      warehouseIds: [],
      departmentIds: [],
      createdAt: '',
      updatedAt: '',

      isSubmitForm: false,
    })
  }

  render() {
    const {
      code,
      username,
      dateOfBirth,
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      email,
      fullName,
      phone,
      companyId,
      factoryIds,
      userRoleId,
      departmentIds,
      createdAt,
      updatedAt,
    } = this.state

    const {
      title,
      isOpenModal,
      cancelLabel,
      submitLabel,
      modalMode,
      t,
      classes,
    } = this.props
    // const { warehouseByFactoryList } = this.props.commonManagement;
    const warehouseList = this.props.warehouses
    const { companies, factories, deparments, roles } = this.props

    const isView = modalMode === MODAL_MODE.DETAIL
    const isCreate = modalMode === MODAL_MODE.CREATE
    const isUpdate = modalMode === MODAL_MODE.UPDATE

    this.validator.purgeFields()

    return (
      <Modal
        title={title}
        size={'lg'}
        isOpen={isOpenModal}
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
        onClose={this.onCloseModal}
        onSubmit={this.onSubmit}
        onCancel={this.onCancelModal}
        hideSubmit={isView}
        hideCancel={isView}
        leftButton={
          isUpdate ? (
            <Button
              variant="contained"
              color="primary"
              autoFocus
              className={classes.leftButton}
            >
              {t('userManagement.changePasswordLabel')}
            </Button>
          ) : null
        }
      >
        <form className="UserForm">
          <Box className={classes.marginAuto} width={3 / 4}>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <label className={classes.labelItem}>
                {t('userManagement.code')}
                <span className={classes.required}> *</span>
              </label>
              <FormControl className={classes.textField}>
                <TextField
                  name="code"
                  id="code"
                  margin="dense"
                  placeholder={t('userManagement.code')}
                  value={code}
                  variant="outlined"
                  size="small"
                  onChange={(event) => onChangeTextField(this, event)}
                  disabled={isView || isUpdate}
                />
                {/* add rule to validate */}
                {this.validator.message(
                  'code',
                  code?.trim(),
                  `required|alpha_num|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX}`,
                )}
                {/* check isValid to show messages */}
                {this.state.isSubmitForm &&
                  !this.validator.check(code?.trim(), 'required') && (
                    <FormHelperText error>{t('form.required')}</FormHelperText>
                  )}

                {this.state.isSubmitForm &&
                  !this.validator.check(code?.trim(), 'alpha_num') && (
                    <FormHelperText error>{t('form.validCode')}</FormHelperText>
                  )}

                {this.state.isSubmitForm &&
                  !this.validator.check(
                    code?.trim(),
                    `max:${TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX}`,
                  ) && (
                    <FormHelperText error>
                      {t('form.maxLength', {
                        max: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                      })}
                    </FormHelperText>
                  )}
              </FormControl>
            </div>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <label className={classes.labelItem}>
                {t('userManagement.username')}
                <span className={classes.required}> *</span>
              </label>
              <FormControl className={classes.textField}>
                <TextField
                  name="username"
                  id="username"
                  autoComplete="off"
                  margin="dense"
                  placeholder={t('userManagement.username')}
                  value={username}
                  variant="outlined"
                  size="small"
                  onChange={(event) => onChangeTextField(this, event)}
                  disabled={isView || isUpdate}
                />
                {/* add rule to validate */}
                {this.validator.message(
                  'username',
                  username?.trim(),
                  `required|max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                )}
                {/* check isValid to show messages */}
                {this.state.isSubmitForm &&
                  !this.validator.check(username?.trim(), 'required') && (
                    <FormHelperText error>{t('form.required')}</FormHelperText>
                  )}

                {this.state.isSubmitForm &&
                  !this.validator.check(
                    username?.trim(),
                    `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                  ) && (
                    <FormHelperText error>
                      {t('form.maxLength', {
                        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      })}
                    </FormHelperText>
                  )}
              </FormControl>
            </div>
            {isCreate && (
              <>
                <div className={clsx(classes.boxItem, classes.marginLabel)}>
                  <label className={classes.labelItem}>
                    {t('userManagement.password')}
                    <span className={classes.required}> *</span>
                  </label>
                  <FormControl size="small" className={classes.textField}>
                    <OutlinedInput
                      name="password"
                      value={password}
                      autoComplete="off"
                      id="outlined-adornment-password"
                      placeholder={t('userManagement.password')}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleToggleShowPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      onChange={(event) => onChangeTextField(this, event)}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'password',
                      password,
                      `required|alpha_num|min:${TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MIN}|max:${TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX}`,
                    )}
                    {/* check isValid to show messages */}
                    {this.state.isSubmitForm &&
                      !this.validator.check(password, 'required') && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}

                    {this.state.isSubmitForm &&
                      !this.validator.check(password, 'alpha_num') && (
                        <FormHelperText error>
                          {t('form.validPassword')}
                        </FormHelperText>
                      )}

                    {this.state.isSubmitForm &&
                      !this.validator.check(
                        password,
                        `min:${TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MIN}`,
                      ) && (
                        <FormHelperText error>
                          {t('form.minLength', {
                            min: TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MIN,
                          })}
                        </FormHelperText>
                      )}

                    {this.state.isSubmitForm &&
                      !this.validator.check(
                        password,
                        `max:${TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX}`,
                      ) && (
                        <FormHelperText error>
                          {t('form.maxLength', {
                            max: TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX,
                          })}
                        </FormHelperText>
                      )}
                  </FormControl>
                </div>
                <div className={clsx(classes.boxItem, classes.marginLabel)}>
                  <label className={classes.labelItem}>
                    {t('userManagement.comfirmPassword')}
                    <span className={classes.required}> *</span>
                  </label>
                  <FormControl size="small" className={classes.textField}>
                    <OutlinedInput
                      name="confirmPassword"
                      value={confirmPassword}
                      id="outlined-adornment-password"
                      placeholder={t('userManagement.comfirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleToggleShowConfirmPassword}
                            edge="end"
                            size="large"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      onChange={(event) => onChangeTextField(this, event)}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'confirmPassword',
                      confirmPassword,
                      `required`,
                    )}
                    {/* check isValid to show messages */}
                    {this.state.isSubmitForm &&
                      !this.validator.check(password, 'required') && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}

                    {this.state.isSubmitForm &&
                      confirmPassword !== password && (
                        <FormHelperText error>
                          {t('form.mappingPassword')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </div>
              </>
            )}
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <label className={classes.labelItem}>
                {t('userManagement.fullName')}
              </label>
              <FormControl className={classes.textField}>
                <TextField
                  name="fullName"
                  id="fullName"
                  value={fullName}
                  margin="dense"
                  placeholder={t('userManagement.fullName')}
                  variant="outlined"
                  size="small"
                  onChange={(event) => onChangeTextField(this, event)}
                  disabled={isView}
                />
                {/* add rule to validate */}
                {this.validator.message(
                  'fullName',
                  fullName?.trim(),
                  `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                )}
                {/* check isValid to show messages */}
                {this.state.isSubmitForm &&
                  !this.validator.check(
                    fullName?.trim(),
                    `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                  ) && (
                    <FormHelperText error>
                      {t('form.maxLength', {
                        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      })}
                    </FormHelperText>
                  )}
              </FormControl>
            </div>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <label className={classes.labelItem}>
                {t('userManagement.email')}
                <span className={classes.required}> *</span>
              </label>
              <FormControl className={classes.textField}>
                <TextField
                  name="email"
                  id="email"
                  margin="dense"
                  value={email}
                  placeholder={t('userManagement.email')}
                  variant="outlined"
                  size="small"
                  onChange={(event) => onChangeTextField(this, event)}
                  disabled={isView}
                />
                {/* add rule to validate */}
                {this.validator.message(
                  'email',
                  email?.trim(),
                  `required|email|min:${TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN}|max:${TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX}`,
                )}
                {/* check isValid to show messages */}
                {this.state.isSubmitForm &&
                  !this.validator.check(email?.trim(), `required`) && (
                    <FormHelperText error>{t('form.required')}</FormHelperText>
                  )}

                {this.state.isSubmitForm &&
                  !this.validator.check(
                    email?.trim(),
                    `min:${TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN}`,
                  ) && (
                    <FormHelperText error>
                      {t('form.minLength', {
                        min: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN,
                      })}
                    </FormHelperText>
                  )}

                {this.state.isSubmitForm &&
                  !this.validator.check(
                    email?.trim(),
                    `max:${TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX}`,
                  ) && (
                    <FormHelperText error>
                      {t('form.maxLength', {
                        max: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
                      })}
                    </FormHelperText>
                  )}

                {this.state.isSubmitForm &&
                  !this.validator.check(email?.trim(), `email`) && (
                    <FormHelperText error>
                      {t('form.validEmail')}
                    </FormHelperText>
                  )}
              </FormControl>
            </div>
          </Box>
          <Box
            className={clsx(classes.marginAuto, classes.marginLabel)}
            width={6 / 7}
          >
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <Box width={1 / 2} className={classes.boxItem}>
                <label className={classes.labelItem}>
                  {t('userManagement.dateOfBirth')}
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        name="dateOfBirth"
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        placeholder={t('userManagement.dateOfBirth')}
                        margin="dense"
                        size="small"
                        maxDate={MAX_DATE_OF_BIRTHDAY}
                        value={dateOfBirth}
                        onChange={this.handleDateChange}
                        disabled={isView}
                      />
                    </MuiPickersUtilsProvider> */}
                  </FormControl>
                </Box>
              </Box>
              <Box width={1 / 2} className={classes.boxItem}>
                <label
                  className={clsx(classes.labelItem, classes.marginLeftItem)}
                >
                  {t('userManagement.phone')}
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth>
                    <TextField
                      name="phone"
                      id="phoneNumber"
                      value={phone}
                      margin="dense"
                      placeholder={t('userManagement.phone')}
                      variant="outlined"
                      size="small"
                      onChange={(event) => onChangeTextField(this, event)}
                      inputProps={{ maxLength: 20 }}
                      disabled={isView}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'phone',
                      phone?.trim(),
                      `phone|max:${TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX}`,
                    )}
                    {/* check isValid to show messages */}
                    {this.state.isSubmitForm &&
                      !this.validator.check(phone?.trim(), `phone`) && (
                        <FormHelperText error>
                          {t('form.validPhone')}
                        </FormHelperText>
                      )}

                    {this.state.isSubmitForm &&
                      !this.validator.check(
                        phone?.trim(),
                        `max:${TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX}`,
                      ) && (
                        <FormHelperText error>
                          {t('form.maxLength', {
                            max: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                          })}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
            </div>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <Box width={1 / 2} className={classes.boxItem}>
                <label className={classes.labelItem}>
                  {t('userManagement.companyName')}{' '}
                  <span className={classes.required}> *</span>
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      size="small"
                      name="companyId"
                      id="checkboxes-tags-demo"
                      variant="outlined"
                      value={this.getCompanyValueObject()}
                      options={companies}
                      isOptionEqualToValue={(option, value) => {
                        return option.id === value.id
                      }}
                      getOptionLabel={(option) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder={t('userManagement.companyName')}
                        />
                      )}
                      onChange={(event, value) =>
                        this.handleChangeCompany(value?.id)
                      }
                      disabled={isView}
                    />
                    {/* add rule to validate */}
                    {this.validator.message('companyId', companyId, `required`)}
                    {/* check isValid to show messages */}
                    {this.state.isSubmitForm &&
                      !this.validator.check(companyId, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
              <Box width={1 / 2} className={classes.boxItem}>
                <label
                  className={clsx(classes.labelItem, classes.marginLeftItem)}
                >
                  {t('userManagement.factoryNames')}
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      size="small"
                      name="factoryIds"
                      multiple
                      id="checkboxes-tags-demo"
                      variant="outlined"
                      options={factories.filter(
                        (item) => item?.companyId === companyId,
                      )}
                      isOptionEqualToValue={(option, value) => {
                        return option.id === value.id
                      }}
                      value={this.getFactoryValueObject()}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option?.name}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <CheckBox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                            color="primary"
                          />
                          {option.name}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder={t('userManagement.factoryNames')}
                        />
                      )}
                      disabled={!companyId || isView}
                      onChange={this.handleChangeFactory}
                    />
                  </FormControl>
                </Box>
              </Box>
            </div>
            <div className={clsx(classes.boxItem, classes.marginLabel)}>
              <Box width={1 / 2} className={classes.boxItem}>
                <label className={classes.labelItem}>
                  {t('userManagement.departmentNames')}{' '}
                  <span className={classes.required}> *</span>
                </label>
                <Box width={2 / 3}>
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      size="small"
                      name="departmentIds"
                      multiple
                      id="checkboxes-tags-demo"
                      variant="outlined"
                      options={deparments}
                      value={this.getDepartmentValueObject()}
                      disableCloseOnSelect
                      isOptionEqualToValue={(option, value) => {
                        return option.id === value.id
                      }}
                      getOptionLabel={(option) => option?.name}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <CheckBox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                            color="primary"
                          />
                          {option.name}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder={t('userManagement.departmentNames')}
                        />
                      )}
                      disabled={isView}
                      onChange={this.onChangeDepartmentIds}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'departmentIds',
                      departmentIds,
                      `required`,
                    )}
                    {/* check isValid to show messages */}
                    {this.state.isSubmitForm &&
                      !this.validator.check(departmentIds, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
              <Box width={1 / 2} className={classes.boxItem}>
                <label
                  className={clsx(classes.labelItem, classes.marginLeftItem)}
                >
                  {t('userManagement.role')}
                </label>
                <Box width={2 / 3}>
                  <FormControl size="small" fullWidth>
                    <Autocomplete
                      size="small"
                      name="userRoleId"
                      labelId="demo-customized-select-label"
                      id="role"
                      variant="outlined"
                      value={this.getUserRoleValueObject()}
                      options={roles}
                      isOptionEqualToValue={(option, value) => {
                        return option?.id === value?.id
                      }}
                      getOptionLabel={(option) => option?.name}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>{option.name}</React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder={t('userManagement.role')}
                        />
                      )}
                      className={clsx(classes.widthBoxSelect)}
                      onChange={(event, value) =>
                        this.setState({ userRoleId: value?.id })
                      }
                      disabled={isView}
                    />
                  </FormControl>
                </Box>
              </Box>
            </div>
            <Box className={clsx(classes.marginLabel, classes.boxItem)}>
              <Box width={1 / 6}>
                <label
                  className={clsx(classes.labelItem, classes.widthLabelItem)}
                >
                  {t('userManagement.warehouseNames')}
                </label>
              </Box>
              <Box width={5 / 6}>
                <FormControl size="small" fullWidth>
                  <Autocomplete
                    size="small"
                    name="warehouseIds"
                    multiple
                    id="checkboxes-tags-demo"
                    variant="outlined"
                    options={warehouseList
                      ?.filter((item) => factoryIds.includes(item?.factoryId))
                      ?.map((item2) => {
                        return { id: item2.id, name: item2.name }
                      })}
                    value={this.getWarehouseValueObject()}
                    disableCloseOnSelect
                    isOptionEqualToValue={(option, value) => {
                      return option.id === value.id
                    }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <CheckBox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                          color="primary"
                        />
                        {option.name}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder={t('userManagement.warehouseNames')}
                      />
                    )}
                    disabled={!companyId || !factoryIds || isView}
                    onChange={this.onChangeWarehouseIds}
                  />
                </FormControl>
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
          </Box>
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  userManagement: state.userManagement,
  commonManagement: state.commonManagement,
  companies: state.appStore.companies,
  factories: state.appStore.factories,
  deparments: state.appStore.deparments,
  roles: state.appStore.roles,
  warehouses: state.appStore.warehouseTypes,
})

const mapDispatchToProps = {
  createUser,
  updateUser,
  deleteUser,
  getUserDetailsById,
  getWarehousesByFactories,
  getFactoriesByCompany,
  getWarehouses,
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(UserForm)),
)
