import { List } from '@mui/material'
import { styled } from '@mui/system'

const ListMenuStyled = styled(List)((props) => {
  const { open, theme } = props
  return {
    padding: '8px 5px',
    flex: 1,
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      width: 8,
      height: 8,
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: '#ccc',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.a6,
    },

    '.MuiListItemButton-root': {
      borderRadius: '4px',

      '&:hover': {
        background: 'rgba(9,123,220,0.3)',
      },

      '&.active': {
        background: '#097BDC !important',
      },
    },

    a: {
      textDecoration: 'none',
    },
    ...(!open && {
      '& .MuiListItemIcon-root': {
        transition: 'all 300ms ease',
        marginLeft: 10,
        marginRight: 20,
      },
    }),
  }
})

export default ListMenuStyled
