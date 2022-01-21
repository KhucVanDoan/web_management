import dataTableStyle from 'components/DataTable/style'

const style = (theme) => ({
  ...dataTableStyle(theme),
  toggler: {
    marginLeft: -5,
    marginRight: theme.spacing(1),
    position: 'relative',
    top: -7,
    verticalAlign: 'top',
  },
  tableRowCollapse: {
    '&>.MuiTableCell-root': {
      borderBottom: 'none',
    },
  },
  tableRowSelected: {
    '~ .original:not(.original + .original)': {
      borderTop: `1px solid ${theme.palette.grayF4.main}`,
    },
  },
  tableRowRootSelected: {
    backgroundColor: theme.palette.primary.a1,

    '&:hover': {
      backgroundColor: theme.palette.primary.a1,
    },
  },
  collapse: {
    paddingLeft: 54,
    '&:not(.MuiCollapse-root *)': {
      borderRight: `1px solid ${theme.palette.grayF4.main}`,
    },

    '.MuiTableCell-head': {
      backgroundColor: theme.palette.grayF4.main,
      zIndex: 1,
    },

    '.MuiTableContainer-root': {
      overflow: 'hidden',
    },
  },
  collapseEntered: {
    position: 'relative',

    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 54,
      height: 1,
      backgroundColor: theme.palette.grayF4.main,
    },
  },
  collapseWrapper: {
    borderLeft: `1px solid ${theme.palette.grayF4.main}`,
  },
})
export default style
