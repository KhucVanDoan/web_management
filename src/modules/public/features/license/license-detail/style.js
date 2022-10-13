const style = (theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: '10vh 10%',
    boxSizing: 'border-box',
  },
  copyright: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: '18vh 26%',
    boxSizing: 'border-box',
  },
  copyrightText: {
    fontSize: '16px',
    lineHeight: '32px',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
})

export default style
