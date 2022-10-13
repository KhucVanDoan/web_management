import BackgroundLicense from '~/assets/images/auth/BackgroundLicense.png'

const style = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    background: theme.palette.background.main,
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2.5, 4, 4),
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
    padding: '18vh 26%',
    boxSizing: 'border-box',
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${BackgroundLicense})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
})

export default style
