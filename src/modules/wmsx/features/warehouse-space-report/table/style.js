const style = (theme) => ({
  rangeTitle: {
    backgroundColor: theme.palette.primary.a5,
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0px 0px 3px 3px',
    marginBottom: '22px',
    marginTop: '22px',
  },
  rangeTitleText: {
    marginLeft: '32px',
  },
  colFloors: {
    marginRight: '30px',
  },
  warehouseFullment: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.grayF5.main,
    alignItems: 'center',
    minHeight: '80px',
    '>span': {
      fontSize: '24px',
      fontWeight: 'bold',
    },
  },
  sectorFullment: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.grayF5.main,
    alignItems: 'center',
    minHeight: '150px',
    minWidth: '218px',
    borderRadius: '3px',
  },
})
export default style
