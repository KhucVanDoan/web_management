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

    '& .MuiFormLabel-root': {
      color: theme.palette.text.main,
      marginTop: 10,
      marginRight: theme.spacing(2),
      boxSizing: 'border-box',
    },
  },
  textField: {
    '&:hover': {
      '& .MuiInputAdornment-root': {
        display: 'flex',
      },
    },
  },
})

export default style
