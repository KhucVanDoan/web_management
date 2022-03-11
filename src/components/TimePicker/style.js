const style = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    borderRadius: 3,
    border: `1px solid ${theme.palette.grayF4.main}`,
    cursor: 'text',
    background: '#fff',
    '& span': {
      lineHeight: 4 / 3,
    },
    '&: hover': {
      borderColor: theme.palette.borderField,
      '& span': {
        opacity: 1,
      },
    },
  },
  error: {
    border: `1px solid ${theme.palette.error.main}`,
    '&: hover': {
      borderColor: theme.palette.error.main,
    },
  },
  focus: {
    borderColor: theme.palette.borderField,
    '&: hover': {
      borderColor: theme.palette.borderField,
    },
  },
  textField: {
    display: 'flex',
    flex: 1,
    padding: '7px 16px',
    alignItems: 'center',
    minWidth: 0,
    '& .react-time-input-picker-wrapper': {
      padding: 0,
      margin: 0,
      border: 0,
      height: 'unset',
      '& .react-time-input-picker ': {
        fontSize: 'unset',
      },
      '& input': {
        fontFamily: "'Inter', sans-serif",
        maxWidth: 25,
        minWidth: 'unset',
        '&:focus': {
          backgroundColor: 'unset',
          caretColor: 'unset',
        },
      },
    },
  },
  iconCalendar: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 10,
  },
  paper: {
    marginTop: 12,
    boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
  },
  formControl: {
    '& .MuiFormHelperText-root': {
      margin: theme.spacing(1 / 3, 0, 0),
    },
  },
  disabled: {
    background: theme.palette.grayF4.main,
    borderColor: `${theme.palette.grayF4.main} !important`,
    cursor: 'unset',
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
