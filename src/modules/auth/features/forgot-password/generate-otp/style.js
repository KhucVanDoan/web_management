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
  linkBackToLogin: {
    textDecoration: 'none',
    color: 'gray',
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
  linkButton: {
    textDecoration: 'none',
    color: 'white',
  },
  backToLogin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLogin: {
    display: 'flex',
    justifyContent: 'center',
  },
  subText: {
    color: '#666666',
  },
})

export default useStyles
