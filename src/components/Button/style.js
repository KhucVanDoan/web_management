const style = () => ({
  disabled: {
    opacity: 0.3,
    pointerEvents: 'none',
    boxShadow: 'none',
  },
  loading: {
    opacity: 0.3,
    pointerEvents: 'none',
    boxShadow: 'none',
  },
  bold: {
    fontWeight: 600,
  },
  iconOnly: {
    padding: 10,
    minWidth: 0,
    '& .MuiButton-startIcon': {
      margin: 0,
    },
  },
})

export default style
