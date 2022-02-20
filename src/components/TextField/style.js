const style = (readOnly) => (theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
      borderRadius: 3,
      paddingRight: 0,
      boxSizing: 'border-box',
      color: theme.palette.text.main,
      background: '#fff',
      border: 'none',
      input: {
        padding: '9px 16px',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px !important',
      borderColor: theme.palette.grayF4.main,
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
      '&:hover .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline':
        {
          borderColor: readOnly
            ? theme.palette.grayF4.main
            : theme.palette.borderField,
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

    '& .MuiFormLabel-root': {
      color: theme.palette.text.main,
      marginTop: 10,
      marginRight: theme.spacing(2),
      boxSizing: 'border-box',
    },
  },
})

export default style
