const style = (theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2.5, 4, 4),
  },

  logoBox: {
    marginBottom: theme.spacing(2.5),
    textAlign: 'center',
  },

  extraBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1, 0),
  },

  linkForgotPassword: {
    textDecoration: 'none',
  },
})

export default style
