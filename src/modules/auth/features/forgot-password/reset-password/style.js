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
    color: 'rgba(0,0,0,0.87)',
    fontSize: '16px',
    letterSpacing: '0.5px',
    lineHeight: '28px',
    textAlign: 'center',
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
