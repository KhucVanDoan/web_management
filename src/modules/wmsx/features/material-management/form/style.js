const style = (theme) => ({
  uploadText: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  autocompleteDropdownHeader: {
    display: 'flex',
    background: theme.palette.bgPrimaryOpacity,
    borderRight: `1px solid ${theme.palette.text.a2}`,

    '>*': {
      flex: '0 0 16.66%',
      padding: 8,
      boxSizing: 'border-box',
      borderRight: `1px solid ${theme.palette.text.a2}`,
      borderBottom: `1px solid ${theme.palette.text.a2}`,

      '&:last-child': { borderRight: 'none' },
    },
  },
  autocompleteListItemButton: {
    display: 'flex !important',
    alignItems: 'stretch',
    borderRight: `1px solid ${theme.palette.text.a2}`,
    padding: 0,

    '>*': {
      flex: '0 0 16.66%',
      padding: 8,
      boxSizing: 'border-box',
      borderRight: `1px solid ${theme.palette.grayE4.main}`,
      borderBottom: `1px solid ${theme.palette.grayE4.main}`,

      '&:last-child': { borderRight: 'none', borderBottom: 'none' },
    },
  },
  autocompleteListItemButtonSelected: {
    background: theme.palette.primary.a1,

    '&:hover': {
      background: theme.palette.primary.a1,
    },
  },
})

export default style
