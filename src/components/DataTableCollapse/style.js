import dataTableStyle from '~/components/DataTable/style'

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
      borderLeft: `1px solid ${theme.palette.grayE4.main}`,
      borderBottom: 'none',
      position: 'relative',

      '&:after': {
        content: '""',
        display: 'inline-block',
        width: 54,
        height: 1,
        backgroundColor: theme.palette.grayE4.main,
        position: 'absolute',
        bottom: 0,
        left: 0,
      },
    },
  },
  tableRowSelected: {
    '~ .original:not(.original + .original)': {
      borderTop: `1px solid ${theme.palette.grayF4.main}`,
    },
  },
  tableRowRootSelected: {
    '&>.MuiTableCell-root': {
      backgroundColor: '#E6EFF7',
    },
    '&:hover>.MuiTableCell-root': {
      backgroundColor: '#E6EFF7',
    },
  },
  collapse: {
    paddingLeft: 50,
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
      left: 50,
      height: 1,
      backgroundColor: theme.palette.grayF4.main,
    },
  },
  collapseWrapper: {
    borderLeft: `1px solid ${theme.palette.grayF4.main}`,
  },
})
export default style
