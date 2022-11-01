import React from 'react'

import ReorderIcon from '@mui/icons-material/Reorder'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import MuiTableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

const TableRow = ({
  children,
  reorderable,
  draggableId,
  index,
  classes,
  ...props
}) => {
  const theme = useTheme()
  if (reorderable) {
    return (
      <Draggable draggableId={draggableId} index={index}>
        {(draggableProvided, snapshot) => {
          return (
            <MuiTableRow
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
              style={{
                ...draggableProvided.draggableProps.style,
                ...(snapshot.isDragging
                  ? { background: theme.palette.bgSecondaryOpacity }
                  : {}),
              }}
              {...props}
            >
              {reorderable && (
                <TableCell
                  className={classes.tableCell}
                  sx={{
                    verticalAlign: 'middle',
                    textAlign: 'center !important',
                    position: 'sticky',
                    left: 0,
                    zIndex: 10,
                  }}
                >
                  <Box
                    {...draggableProvided.dragHandleProps}
                    sx={{ display: 'inline-flex', mt: '5px' }}
                  >
                    <ReorderIcon color="subText" />
                  </Box>
                </TableCell>
              )}
              {children}
            </MuiTableRow>
          )
        }}
      </Draggable>
    )
  }

  return <MuiTableRow {...props}>{children}</MuiTableRow>
}

TableRow.defaultProps = {
  children: null,
  reorderable: false,
}

TableRow.propsTypes = {
  children: PropTypes.node,
  reorderable: PropTypes.bool,
  draggableId: PropTypes.string,
  index: PropTypes.number,
  classes: PropTypes.shape(),
}

export default TableRow
