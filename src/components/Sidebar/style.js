import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'

const openedMixin = (theme) => ({
  width: 272,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  position: 'inherit',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  position: 'inherit',
  width: 75,
})

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '30px 0 20px 15px',
}))

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'isMinimal',
})(({ theme, isMinimal }) => ({
  width: 272,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(!isMinimal && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(isMinimal && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
