const style = (theme) => ({
  root: {
    '& .MuiOutlinedInput-root': {
      padding: 0,
      maxHeight: 118,
      overflow: 'auto',

      '.MuiAutocomplete-input': {
        padding: '9px 16px',
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
