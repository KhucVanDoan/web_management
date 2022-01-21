const style = (theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
      borderRadius: 3,
      paddingRight: 0,
      boxSizing: 'border-box',
      color: theme.palette.text.main,
      input: {
        padding: '9px 16px',
      },
      '&:not(.Mui-error)': {
        border: `1px solid ${theme.palette.grayF4.main}`,
      },
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
    },
    '& .MuiFormLabel-root': {
      wordBreak: 'break-word',
    },
    '& .MuiFormHelperText-root': {
      margin: theme.spacing(1 / 3, 0, 0),
    },
  },
  normal: {
    '& .MuiOutlinedInput-root': {
      fieldset: {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent',
      },
    },
  },
  disabled: {
    '& .MuiOutlinedInput-root': {
      background: theme.palette.grayF4.main,
      fieldset: {
        borderColor: `${theme.palette.grayF4.main} !important`,
      },
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
