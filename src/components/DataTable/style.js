const style = (theme) => ({
  paper: {
    width: '100%',
    overflowX: 'auto',
    position: 'relative',
  },
  table: {
    borderCollapse: 'collapse',
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

  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grayF4.main,
    },
  },

  tableRowGray: {
    backgroundColor: theme.palette.grayF4.main,
    '>.MuiTableCell-root': {
      borderBottomColor: theme.palette.subText.a1,
    },
  },

  tableCell: {
    padding: 16,
    fontSize: 14,
    lineHeight: 22 / 14,
    textAlign: 'left',
  },

  tableCellCheckbox: {
    padding: '16px 7px',

    '.MuiCheckbox-root': {
      margin: '-9px 0',
    },
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
})
export default style
