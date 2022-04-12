const style = (isEmptySubMenu) => (theme) => {
  return {
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      pointerEvents: 'auto',
      padding: '10px 0px',
      marginLeft: 10,
      overflow: 'visible',
      ...(isEmptySubMenu
        ? {
            background: theme.palette.text.main,
            color: '#fff',
            padding: 10,
            marginTop: 5,
            '&:before': {
              content: '""',
              width: 0,
              height: 0,
              borderBottom: `8px solid ${theme.palette.text.main}`,
              borderLeft: '8px solid transparent',
              position: 'absolute',
              top: 15,
              left: -4,
              transform: 'rotate(-225deg)',
            },
          }
        : {
            '&:before': {
              content: '""',
              height: '100%',
              width: 10,
              background: 'transparent',
              left: -10,
              top: 0,
              position: 'absolute',
            },
          }),
      '.active': {
        background: theme.palette.bgPrimaryOpacity,
        borderRadius: '3px 0px 0px 3px',
        position: 'relative',
        fontWeight: 'bold',

        '&:hover': {
          background: theme.palette.bgPrimaryOpacity,
        },
      },
      '.active::before': {
        content: '""',
        height: '100%',
        width: '3px',
        background: theme.palette.primary.main,
        right: 0,
        top: 0,
        position: 'absolute',
      },
    },
  }
}
export default style
