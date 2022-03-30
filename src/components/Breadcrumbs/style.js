const style = (theme) => ({
  root: {
    fontSize: 12,
    lineHeight: 20 / 12,

    '& li:nth-of-type(2)': {
      display: 'none',
    },
  },
  home: {
    display: 'flex',
    marginRight: 8,

    '&:hover svg path': {
      fill: theme.palette.primary.main,
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: 12,

    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
})

export default style
