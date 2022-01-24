import React, { Component } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Card,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import { ROUTE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { resetPassword } from '~/modules/mesx/redux/actions/user-management.action'
import { onChangeTextField, redirectRouter } from '~/utils'

import useStyles from './style'
class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      isSubmitForm: false,
    }

    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    this.setState({
      email: params?.email,
      code: params?.code,
    })
  }
  onClickResetPassword = () => {
    this.setState({ isSubmitForm: true })
    const { password, confirmPassword } = this.state
    if (this.validator.allValid() && password === confirmPassword) {
      const { code, email, password } = this.state
      const params = {
        code: code?.trim(),
        email: email,
        password: password,
      }
      this.props.resetPassword(params, (res) => {
        this.backToLogin()
      })
    }
  }
  backToLogin = () => {
    redirectRouter('/login')
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
  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const { classes, t } = this.props
    const {
      code,
      isSubmitForm,
      email,
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
    } = this.state
    return (
      <Grid container>
        <Grid lg={5} sm={12} xs={12}></Grid>
        <Grid
          lg={7}
          sm={12}
          xs={12}
          className={classes.rightBox}
          container
          direction="column"
        >
          <div className={classes.divRight}>
            <Grid className={classes.itemRightBox} container>
              <div className={classes.labelLogin}>
                <h2>{t('forgotPassword.resetPassword.title')}</h2>
                <p>{t('forgotPassword.resetPassword.text')}</p>
              </div>
              <Card className={classes.boxForgot}>
                <div className={classes.submitForm}>
                  <form>
                    <Grid
                      className={classes.passwordItem}
                      container
                      justifyContent="space-between"
                      direction="column"
                    >
                      <label>
                        {t('forgotPassword.resetPassword.newPassword')}
                      </label>
                      <FormControl size="small" className={classes.textField}>
                        <OutlinedInput
                          name="password"
                          value={password}
                          autoComplete="off"
                          id="outlined-adornment-password"
                          placeholder={t(
                            'forgotPassword.resetPassword.password',
                          )}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleToggleShowPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
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
                          'password',
                          password,
                          `required|alpha_num|min:${TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MIN}|max:${TEXTFIELD_REQUIRED_LENGTH.PASSWORD.MAX}`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(password, 'required') && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}

                        {isSubmitForm &&
                          !this.validator.check(password, 'alpha_num') && (
                            <FormHelperText error>
                              {t('form.validPassword')}
                            </FormHelperText>
                          )}

                        {isSubmitForm &&
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

                        {isSubmitForm &&
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
                      <br />
                      <label>
                        {t('forgotPassword.resetPassword.confirmNewPassword')}
                      </label>
                      <FormControl size="small" className={classes.textField}>
                        <OutlinedInput
                          name="confirmPassword"
                          value={confirmPassword}
                          id="outlined-adornment-password"
                          placeholder={t(
                            'forgotPassword.resetPassword.confirmNewPassword',
                          )}
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
                        {isSubmitForm &&
                          !this.validator.check(password, 'required') && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}

                        {isSubmitForm && confirmPassword !== password && (
                          <FormHelperText error>
                            {t('form.mappingPassword')}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={this.onClickResetPassword}
                        disable={!password}
                      >
                        {t('forgotPassword.resetPassword.finish')}
                      </Button>
                    </Grid>
                  </form>
                </div>
              </Card>
            </Grid>
          </div>
          <div></div>
          <div className={classes.footerLogin}>
            <span className={classes.subText}>{t('login.footerText')}</span>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  userManagement: state.userManagement,
})

const mapDispatchToProps = { resetPassword }

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ResetPassword)),
)
