const style = (theme) => ({
  root: {
    width: '100%',
    boxShadow: '0px 8px 8px rgb(102 102 102 / 5%)',
    display: 'flex',
    borderRadius: 3,
    border: `1px solid ${theme.palette.grayF4.main}`,
    cursor: 'pointer',
    background: '#fff',
    '& span': {
      lineHeight: 20 / 14,
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
    padding: '8px 16px',
    alignItems: 'center',
    minWidth: 0,
  },
  iconCalendar: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
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
