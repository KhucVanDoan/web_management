// import BackgroundImg from '~/assets/images/auth/BackgroundLogin.jpg'

const style = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    // backgroundImage: `url(${BackgroundImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(255, 255, 255, 0.2)',
    },

    '&>*': {
      position: 'relative',
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: theme.spacing(4),
      overflow: 'auto',
      boxSizing: 'border-box',
    },
  },
  leftPanel: {
    width: '45%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'auto',
      marginBottom: theme.spacing(4),
    },
  },
  rightPanel: {
    flex: 1,
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'auto',
      flex: 'auto',
      overflow: 'visible',
    },
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    overflow: 'auto',
    padding: '0 26% 0 14%',
    boxSizing: 'border-box',

    [theme.breakpoints.down('lg')]: {
      padding: '0 10%',
    },

    [theme.breakpoints.down('md')]: {
      height: 'auto',
      padding: 0,
    },
  },
  box: {
    width: '100%',
    maxWidth: 616,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logo: {
    width: '60%',
    textAlign: 'center',

    img: {
      maxWidth: '100%',
      maxHeight: '100%',
    },

    [theme.breakpoints.down('md')]: {
      width: 'auto',
      height: 150,
    },
  },
})

export default style
