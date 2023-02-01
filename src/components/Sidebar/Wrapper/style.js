import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'

export const DrawerHeader = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px 0 11px',
}))

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'isMinimal',
})(
  ({
    //  theme,
    isMinimal,
  }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    position: 'static',
    transition: 'all .3s ease',

    '& .MuiDrawer-paper': {
      position: 'static',
      backgroundColor: 'transparent',
    },

    ...(isMinimal
      ? {
          width: 75,
        }
      : {
          width: 272,
        }),

    // [theme.breakpoints.down('md')]: {
    //   position: 'absolute',
    //   zIndex: 99,
    //   height: '100%',
    //   top: 0,
    //   left: 0,
    //   width: 272,

    //   ...(isMinimal
    //     ? {
    //         transform: 'translateX(-100%)',
    //       }
    //     : {
    //         transform: 'translateX(0)',
    //       }),
    // },
  }),
)
