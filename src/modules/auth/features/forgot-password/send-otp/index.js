import React, { Component } from 'react'

import { Card, FormHelperText, Grid, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'

import { ROUTE } from '~/modules/auth/routes/config'
import {
  generateOTP,
  verifyOTP,
} from '~/modules/mesx/redux/actions/user-management.action'
import { onChangeTextField, redirectRouter } from '~/utils'

import useStyles from './style'

class VerifyOTP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      code: '',
      isSubmitForm: false,
      hasCode: false,
    }

    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    const email = params?.email
    this.setState({
      email: email,
    })
  }

  /**
   * Handle key down event
   * @param {*} e
   */
  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSendOTP()
    }
  }
  backToLogin = () => {
    redirectRouter('/login')
  }
  onSubmitOTP = () => {
    this.setState({ isSubmitForm: true })
    if (this.validator.allValid()) {
      const { code, email } = this.state
      const params = {
        code: code?.trim(),
        email: email,
      }
      this.props.verifyOTP(params, (res) => {
        this.goToResetPassword(params)
      })
    }
  }
  goToResetPassword = (params) => {
    redirectRouter(
      ROUTE.RESET_PASSWORD.PATH +
        '?code=' +
        params?.code +
        '&email=' +
        params?.email,
    )
  }
  resendOTP = () => {
    const email = this.state.email
    const params = {
      email: email,
    }
    this.props.generateOTP(params, (res) => {
      this.goToVerifyOTP(email)
    })
  }
  goToVerifyOTP = (email) => {
    redirectRouter(ROUTE.VERIFY_OTP.PATH + '?email=' + email)
  }
  resetForm = () => {
    this.setState({
      isSubmitForm: false,
      code: '',
    })
  }
  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const { classes, t } = this.props
    const { code, isSubmitForm, email } = this.state
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
                <h2>{t('forgotPassword.verifyOTP.title')}</h2>
                <p>{t('forgotPassword.verifyOTP.text')}</p>
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
                      <label>{t('forgotPassword.verifyOTP.verifyCode')}</label>
                      <FormControl className={classes.textField}>
                        <TextField
                          name="code"
                          id="code"
                          margin="dense"
                          value={code}
                          inputProps={{
                            className: classes.inputText,
                            maxLength: 6,
                          }}
                          variant="outlined"
                          size="small"
                          onChange={(event) => onChangeTextField(this, event)}
                        />
                        {/* add rule to validate */}
                        {this.validator.message(
                          `code`,
                          code,
                          `required|integer|numeric`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(code, `required`) && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}
                        {isSubmitForm &&
                          !this.validator.check(code, `numeric|integer`) && (
                            <FormHelperText error>
                              {t('form.integer')}
                            </FormHelperText>
                          )}
                      </FormControl>
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        fullWidth
                        onClick={this.onSubmitOTP}
                        disabled={!code}
                      >
                        {t('forgotPassword.verifyOTP.continue')}
                      </Button>
                      <br />
                      <div className={classes.resendOTP}>
                        <p>
                          {t('forgotPassword.verifyOTP.notReceived')}
                          <Link
                            onClick={this.resendOTP}
                            className={classes.linkResend}
                          >
                            {t('forgotPassword.verifyOTP.resend')}
                          </Link>
                        </p>
                      </div>
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

const mapDispatchToProps = { generateOTP, verifyOTP }

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(VerifyOTP)),
)
