const style = () => ({
  root: {
    display: 'flex',
    marginLeft: 'auto',
    '& button + button': {
      marginLeft: 16,
    },
  },
  btn: {
    width: 40,
    minWidth: 40,
    height: 40,
  },
})

export default style
