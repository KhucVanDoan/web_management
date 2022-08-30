const style = (theme) => ({
  listItem: {
    borderBottom: `1px solid ${theme.palette.grayEE.main}`,
    backgroundColor: '#fff',
    transition: 'all .3s ease',
    alignItems: 'flex-start',

    '&:hover': {
      backgroundColor: theme.palette.grayF5.main,
    },

    '&:last-of-type': {
      borderBottom: 'none',
    },
  },
  listItemButton: {
    width: '100%',
    display: 'flex',
    padding: '16px 16px 16px 0',
    position: 'relative',
    cursor: 'pointer',
  },
  readOneContainer: {
    flex: '0 0 40px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 8,
  },
  readOne: {
    '&:before': {
      content: '""',
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      border: `1px solid ${theme.palette.primary.main}`,
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.a2,

      '&:before': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  actions: {
    marginTop: theme.spacing(4 / 3),
    'button + button': {
      marginLeft: theme.spacing(2 / 3),
    },
  },
})

export default style
