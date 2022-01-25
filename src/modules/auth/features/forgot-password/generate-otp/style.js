const style = (theme) => ({
  paper: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2.5, 4, 4),
  },

  goBackBox: {
    textAlign: 'center',
  },

  goBack: {
    display: 'inline-flex',
    alignItems: 'center',
    margin: 'auto',
    fontSize: 13,
    color: theme.palette.subText.main,
    textDecoration: 'none',

    '&:hover': {
      color: theme.palette.primary.main,

      '.x-icon svg path': {
        fill: theme.palette.primary.main,
      },
    },
  },
})

export default style
