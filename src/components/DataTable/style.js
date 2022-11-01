const style = (theme) => ({
  paper: {
    width: '100%',
    overflowX: 'auto',
    position: 'relative',
  },
  tableContainer: {
    overflow: 'auto',
    border: `1px solid ${theme.palette.grayE4.main}`,
    borderTop: 'none',
    boxSizing: 'border-box',
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: 0,
    minWidth: '100%',
  },

  tableRow: {
    verticalAlign: 'top',
  },

  tableRowStriped: {
    '&:nth-child(even)': {
      backgroundColor: theme.palette.grayF4.main,
    },
    '>.MuiTableCell-root': {
      border: 'none',
    },
  },

  tableRowBorder: {
    '>.MuiTableCell-root': {
      borderBottomColor: theme.palette.grayF4.main,
    },
  },
  tableRowBorderGrid: {
    '.MuiTableCell-root': {
      borderRight: `1px solid ${theme.palette.grayE4.main}`,
      borderBottom: `1px solid ${theme.palette.grayE4.main}`,
      borderLeft: 'none',
      borderTop: 'none',
    },
  },

  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grayF4.main,
    },
  },

  tableRowGray: {
    backgroundColor: theme.palette.grayF4.main,
    // '>.MuiTableCell-root': {
    //   borderBottomColor: theme.palette.subText.a1,
    // },
  },

  tableCell: {
    padding: 8,
    fontSize: 14,
    lineHeight: 22 / 14,
    textAlign: 'left',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  tableCellCheckbox: {
    padding: '0 5px',
    verticalAlign: 'middle',
    width: 50,
  },

  tableCellAlignright: {
    textAlign: 'right',
  },

  tableCellAligncenter: {
    textAlign: 'center',
  },

  truncateCell: {
    wordBreak: 'break-word',
  },

  originText: {
    whiteSpace: 'pre-line',
    '&:not(:last-child)': {
      display: 'none !important',
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
