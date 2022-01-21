import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import useStyles from './style'
import { withStyles } from '@mui/styles'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onChangeTextField, redirectRouter } from 'utils'
import SimpleReactValidator from 'simple-react-validator'
import { Card, FormHelperText, Grid, IconButton } from '@mui/material'
import { TEXTFIELD_REQUIRED_LENGTH } from 'common/constants'
import { ROUTE } from 'modules/auth/routes/config'
import { ArrowBackIosOutlined } from '@mui/icons-material'
import { generateOTP } from 'modules/mesx/redux/actions/user-management.action'

class GenerateOTP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isSubmitForm: false,
    }

    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    // do nothing
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
  onSendOTP = () => {
    this.setState({ isSubmitForm: true })
    if (this.validator.allValid()) {
      const { email } = this.state
      const params = {
        email: email?.trim(),
      }
      this.props.generateOTP(params, (res) => {
        this.goToVerifyOTP(email)
      })
    }
  }
  goToVerifyOTP = (email) => {
    redirectRouter(ROUTE.VERIFY_OTP.PATH + '?email=' + email)
  }
  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const { classes, t } = this.props
    const { email, isSubmitForm } = this.state
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
                <h2>{t('forgotPassword.generateOTP.title')}</h2>
                <p>{t('forgotPassword.generateOTP.text')}</p>
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
                      <label>{t('forgotPassword.generateOTP.account')}</label>
                      <FormControl className={classes.textField}>
                        <TextField
                          name="email"
                          id="email"
                          margin="dense"
                          value={email}
                          placeholder={t(
                            'forgotPassword.generateOTP.placeholder',
                          )}
                          variant="outlined"
                          size="small"
                          onChange={(event) => onChangeTextField(this, event)}
                          className={classes.textInput}
                        />
                        {/* add rule to validate */}
                        {this.validator.message(
                          'email',
                          email?.trim(),
                          `required|email|min:${TEXTFIELD_REQUIRED_LENGTH.EMAIL.MIN}|max:${TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX}`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(email?.trim(), `required`) && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}

                        {isSubmitForm &&
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

                        {isSubmitForm &&
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

                        {isSubmitForm &&
                          !this.validator.check(email?.trim(), `email`) && (
                            <FormHelperText error>
                              {t('form.validEmail')}
                            </FormHelperText>
                          )}
                      </FormControl>
                      <br />

                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.onSendOTP}
                        disabled={!email}
                      >
                        {t('forgotPassword.generateOTP.continue')}
                      </Button>
                    </Grid>
                  </form>
                </div>
              </Card>
              <Grid container className={classes.backToLogin}>
                <IconButton
                  type="button"
                  className={classes.iconButton}
                  size="large"
                >
                  <ArrowBackIosOutlined />
                </IconButton>
                <Link className={classes.linkBackToLogin} to={'/login'}>
                  {t('forgotPassword.generateOTP.backToLogin')}
                </Link>
              </Grid>
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

const mapDispatchToProps = { generateOTP }

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(GenerateOTP)),
)
