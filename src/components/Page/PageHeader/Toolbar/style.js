const style = (theme) => ({
  root: {
    display: 'flex',
    marginLeft: 'auto',
    '& button + button': {
      marginLeft: 16,
    },
  },
  badge: {
    position: 'absolute',
    top: 7,
    left: 21,
    borderRadius: 5,
    minWidth: 10,
    height: 10,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
    fontSize: 9,
    lineHeight: '10px',
    textAlign: 'center',
    padding: '0 1px',
    boxSizing: 'border-box',
  },
})

export default style
