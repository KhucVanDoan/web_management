const style = (theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      padding: 0,
      boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',

      '.MuiAutocomplete-input': {
        padding: '9px 16px',
      },
    },
  },
  rootMultiple: {
    'div.MuiOutlinedInput-root': {
      padding: 0,
      maxHeight: 118,
      overflow: 'auto',
      border: '1px solid',
      borderColor: theme.palette.grayF4.main,

      '&:hover, &.Mui-focused': {
        borderColor: theme.palette.borderField,
      },
      '&.Mui-disabled': {
        borderColor: theme.palette.grayF4.main,
      },
      '&.Mui-error': {
        borderColor: theme.palette.error.main,
      },

      '.MuiAutocomplete-input': {
        padding: '9px 16px',
      },

      '.MuiOutlinedInput-notchedOutline': {
        display: 'none !important',
      },
    },
  },
  listbox: {
    '& ul': {
      width: 'auto !important',
    },
    '& .MuiAutocomplete-option': {
      justifyContent: 'space-between',
    },
  },
  tag: {
    borderRadius: 3,
    backgroundColor: theme.palette.grayF4.main,
  },
  titleOption: {
    display: 'flex',
    boxSizing: 'border-box',
    position: 'sticky',
    top: -8,
    zIndex: 1,
    padding: '6px 16px',
    background: theme.palette.primary.contrastText,
    justifyContent: 'space-between',
  },
})

export default style
