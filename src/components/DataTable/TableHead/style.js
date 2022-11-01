const style = (theme) => ({
  tableHead: {},
  headerCell: {
    background: theme.palette.bgPrimaryOpacity,
    padding: 8,
    borderImageWidth: 0,
    textAlign: 'left',
    position: 'sticky',
    whiteSpace: 'nowrap',
    borderRight: `1px solid ${theme.palette.text.a2}`,
    borderBottom: `1px solid ${theme.palette.text.a2}`,
    borderTop: 'none',
    borderLeft: 'none',
    boxSizing: 'border-box',
    userSelect: 'none',

    'tr:first-child &': {
      borderTop: `1px solid ${theme.palette.text.a2}`,
    },
  },
  headerCellCheckbox: {
    padding: '0 5px',
    width: 50,
  },
  headerCellReorder: {
    padding: '0 5px',
    width: 50,
  },
  headerCellOffset: {
    padding: 0,
    border: 'none',
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
    overflow: 'hidden',
    maxWidth: '100%',
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
  resizeLine: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 9,
    cursor: 'col-resize',
    '&:hover': {
      backgroundColor: '#0AA1DD',
    },
    '&:active': {
      backgroundColor: '#0AA1DD',
    },
  },

  lastStickyLeft: {
    borderRight: `2px solid ${theme.palette.primary.a3} !important`,
  },
  firstStickyRight: {
    borderLeft: `2px solid ${theme.palette.primary.a3} !important`,
  },
})

export default style
