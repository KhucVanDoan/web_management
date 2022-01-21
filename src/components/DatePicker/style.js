const style = (theme) => ({
  paper: {
    marginTop: 12,
    '& .PrivatePickersFadeTransitionGroup-root': {
      whiteSpace: 'nowrap',
    },
  },

  formControl: {
    '& .MuiFormHelperText-root': {
      margin: theme.spacing(1 / 3, 0, 0),
    },
  },

  vertical: {
    '& .MuiFormLabel-root': {
      fontSize: 12,
      marginBottom: 8,

      '&:not(.Mui-error)': {
        color: theme.palette.subText.main,
      },
    },
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    width: `calc(100% + ${theme.spacing(2)})`,
    marginLeft: theme.spacing(-2),

    '& .MuiFormLabel-root': {
      color: theme.palette.text.main,
      flex: '0 0 33.333333%',
      marginTop: 10,
      marginRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      boxSizing: 'border-box',
    },
  },
})

export default style
