import { ListItemButton } from '@mui/material'
import { styled } from '@mui/system'

const ListModuleStyled = styled(ListItemButton)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '22px 6px',
    opacity: '0.3',
    transition: 'all .3s ease',

    '&.active': {
      background: 'rgba(0,0,0,0.2)',
      boxShadow: 'inset 0px 4px 6px rgba(0, 0, 0, 0.15)',
      opacity: '1',
    },
    '&:hover': {
      opacity: '1',
    },
  }
})

export default ListModuleStyled
