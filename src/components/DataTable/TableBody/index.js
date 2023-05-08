import React from 'react'

import MuiTableBody from '@mui/material/TableBody'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { useTable } from '~/common/hooks/useTable'

const TableBody = ({ children }) => {
  const { rows, reorderable, onRowsOrderChange = () => {} } = useTable()
  /**
   *
   * @param {*} result
   * @param {*} provided
   * @returns
   */
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const movedItem = rows[result.source.index]

    const tmpItems = rows.filter((_, index) => index !== result.source.index)

    tmpItems.splice(result.destination.index, 0, movedItem)

    onRowsOrderChange(tmpItems)
  }

  if (reorderable) {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(droppableProvided) => (
            <MuiTableBody
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {children}

              {droppableProvided.placeholder}
            </MuiTableBody>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

  return <MuiTableBody>{children}</MuiTableBody>
}

export default TableBody
