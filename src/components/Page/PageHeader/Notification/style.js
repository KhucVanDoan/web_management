const style = (theme) => ({
  container: {
    width: 440,
  },
  btn: {
    width: 40,
    minWidth: 40,
    height: 40,
    padding: 10,
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
  header: {
    padding: '6px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 46,
    boxSizing: 'border-box',
  },
})

export default style
