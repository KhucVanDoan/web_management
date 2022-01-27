const style = (theme) => ({
  root: {
    width: '100%',
    boxShadow: '0px 8px 8px rgb(102 102 102 / 5%)',
    display: 'flex',
    borderRadius: 3,
    border: `1px solid ${theme.palette.grayF4.main}`,
    cursor: 'pointer',
    '& span': {
      lineHeight: 20 / 14,
    },
  },
  error: {
    border: `1px solid ${theme.palette.error.main}`,
  },
  textField: {
    display: 'flex',
    flex: 1,
    padding: '9px 16px',
    alignItems: 'center',
  },
  iconCalendar: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
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
    width: `calc(100% + ${theme.spacing(2)})`,
    marginLeft: theme.spacing(-2),

    '& .MuiFormLabel-root': {
      color: theme.palette.text.main,
      marginTop: 10,
      marginRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      boxSizing: 'border-box',
    },
  },
})

export default style
