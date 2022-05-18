const style = (theme) => ({
  container: {
    width: 440,
  },
  btn: {
    width: 40,
    minWidth: 40,
    height: 40,
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
  },
  list: {
    minHeight: 100,
    maxHeight: 'calc(100vh - 200px)',
    overflow: 'auto',
    padding: 0,
    position: 'relative',
  },
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
    display: 'block',
    padding: '16px 16px 16px 0',
    position: 'relative',
    cursor: 'pointer',
  },
  readOneContainer: {
    flex: '0 0 40px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 14,
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
