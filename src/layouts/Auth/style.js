import BackgroundImg from '~/assets/images/auth/BackgroundLogin.jpg'

const style = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    background: theme.palette.background.main,
  },
  leftPanel: {
    width: '45%',
    height: '100%',
    backgroundImage: `url(${BackgroundImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(255, 255, 255, 0.3)',
    },

    '&>*': {
      position: 'relative',
    },
  },
  rightPanel: {
    flex: 1,
    overflow: 'hidden',
  },
  slider: {
    height: '100%',
    padding: '25vh 22% 0',
    boxSizing: 'border-box',

    [theme.breakpoints.down('lg')]: {
      padding: '15vh 10% 0',
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    padding: '18vh 26% 10vh 14%',
    boxSizing: 'border-box',

    [theme.breakpoints.down('lg')]: {
      padding: '10vh 10% 10vh 10%',
    },
  },
  box: {
    width: '100%',
    max: 616,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  copyright: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 48,
    marginTop: 'auto',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    padding: '25vh 10% 0',

    img: {
      maxWidth: '100%',
    },
  },
})

export default style
