import { List } from '@mui/material'
import { styled } from '@mui/system'

const ListMenuStyled = styled(List)((props) => {
  const { theme, open } = props
  return {
    marginTop: 10,
    paddingTop: 0,
    flex: 1,
    overflow: 'auto',
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
    a: {
      textDecoration: 'none',
    },
    ...(!open && {
      '& .MuiListItemIcon-root': {
        transition: 'all 300ms ease',
        marginLeft: 10,
        marginRight: 20,
      },

      '&>.active:before': { display: 'none' },
    }),
  }
})

export default ListMenuStyled
