const style = (theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    marginRight: 16,
    maxWidth: '70%',
    position: 'relative',

    form: {
      width: '100%',

      '.MuiOutlinedInput-root': {
        background: theme.palette.grayEE.main,
        boxShadow: 'none',

        input: {
          paddingLeft: 9,
        },

        '.MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      },
    },
  },
})

export default style
