const style = (theme) => ({
  headerCell: {
    background: theme.palette.bgPrimaryOpacity,
    padding: '8px 16px',
    border: 'none',
    borderImageWidth: 0,
    textAlign: 'left',
    zIndex: 10,
    whiteSpace: 'nowrap',
  },
  headerCellCheckbox: {
    padding: '8px 7px',
  },
  headerCellAlignright: {
    textAlign: 'right !important',
  },
  headerCellAligncenter: {
    textAlign: 'center !important',
  },
  headerNameContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  sortIcon: {
    display: 'block',
    width: 18,
    height: 12,
    flex: '0 0 18px',
    position: 'relative',
    '&:before': {
      content: '""',
      width: 0,
      height: 0,
      borderBottom: '5px solid',
      borderBottomColor: theme.palette.text.a3,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      position: 'absolute',
      top: 0,
      right: 0,
    },
    '&:after': {
      content: '""',
      width: 0,
      height: 0,
      borderTop: '5px solid',
      borderTopColor: theme.palette.text.a3,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  },
  sortIconAsc: {
    '&:before': {
      borderBottomColor: theme.palette.text.main,
    },
  },
  sortIconDesc: {
    '&:after': {
      borderTopColor: theme.palette.text.main,
    },
  },
  checkbox: {
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'inline-block',
      width: 16,
      height: 16,
      background: '#fff',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: -1,
      pointerEvents: 'none',
    },
  },
})

export default style
