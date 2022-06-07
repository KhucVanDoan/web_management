const style = (theme) => ({
  imageBox: {
    width: 104,
    height: 104,
    border: `1px dashed ${theme.palette.grayF5.main}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    position: 'absolute',
    opacity: 0,
    width: 86,
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
})

export default style
