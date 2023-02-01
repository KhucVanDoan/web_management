const style = (isEmptySubMenu) => (theme) => {
  return {
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      pointerEvents: 'auto',
      padding: '5px',
      marginLeft: 10,
      overflow: 'visible',
      background: '#164285',
      ...(isEmptySubMenu
        ? {
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

      '.MuiListItemButton-root': {
        borderRadius: '4px',

        '&:hover': {
          background: 'rgba(9,123,220,0.3)',
        },

        '&.active': {
          background: '#097BDC !important',
        },
      },
    },
  }
}
export default style
