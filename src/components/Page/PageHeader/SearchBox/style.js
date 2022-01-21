const style = (theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    backgroundColor: theme.palette.grayEE.main,
    borderRadius: 3,
    alignItems: 'center',
    marginRight: 16,
    maxWidth: '83%',
    position: 'relative',
  },
  input: {
    height: '100%',
    outline: 'none',
    border: 'none',
    background: 'inherit',
    fontSize: 14,
    fontWeight: 'normal',
    paddingLeft: 36,
    flex: 1,
    '::placeholder': {
      color: theme.palette.text.a4,
    },
  },
})

export default style
