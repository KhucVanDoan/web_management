const style = {
  paper: {
    width: '100%',
    overflowX: 'auto',
    position: 'relative',
  },
  table: {
    minWidth: 1800,
    '& * .MuiTableCell-root': {
      border: '1px solid #00000014',
      padding: '10px 24px 10px 24px',
    },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableRow: {
    '&$selected, &$selected:hover': {
      backgroundColor: '#00000014',
    },
  },

  tableRowEven: {
    '&$selected, &$selected:hover': {
      backgroundColor: '#00000014',
    },
    backgroundColor: '#00000007',
  },
  selected: {},
  headerCell: {
    backgroundColor: '#bad9eb',
    fontWeight: 'bold',
    height: '50px',
  },
  emptyTableMessage: {
    position: 'absolute',
    left: '50%',
    top: '40%',
  },
  truncateCell: {
    wordBreak: 'break-all',
  },
  inputFilter: {
    width: 200,
  },
  removeCell: {
    border: 'none !important',
    backgroundColor: 'while',
  },
  headerRemoveCell: {
    backgroundColor: 'white',
    border: 'none !important',
    height: '70px',
  },
}
export default style
