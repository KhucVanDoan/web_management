const useStyles = (theme) => ({
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alightItems: 'center',
  },
  divRight: {
    display: 'flex',
    justifyContent: 'center',
    // marginTop: theme.spacing(5),
  },
  itemRightBox: {
    display: 'flex',
    maxWidth: 600,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
  },
  boxForgot: {
    // padding: theme.spacing(3),
    minWidth: 600,
    margin: 'auto',
  },
  // margin: theme.spacing(1),
  submitForm: {
    // padding: theme.spacing(2),
  },
  decorImage: {
    display: 'inherit',
    width: '100%',
    height: '100%',
  },
  inputText: {
    fontSize: '18px',
    letterSpacing: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resendOTP: {
    display: 'flex',
    justifyContent: 'center',
  },
  footerLogin: {
    display: 'flex',
    justifyContent: 'center',
  },
  subText: {
    color: '#666666',
  },
  linkResend: {
    textDecoration: 'none',
    color: '#0761ad',
  },
})

export default useStyles
