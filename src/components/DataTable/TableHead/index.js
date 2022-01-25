import React from 'react'

import { Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Box } from '@mui/system'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { useClasses } from '~/themes'

import style from './style'

const ORDER_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
}

/**
 *
 * @param {*} props
 * @returns
 */
const TableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    onChangeSort,
    checkboxSelection,
    columns,
    selected,
    rows,
    indexCol,
    pageSize,
    reorderable,
  } = props

  const classes = useClasses(style)

  const onClickSort = (field) => {
    let newSort

    if (field !== orderBy) {
      newSort = {
        orderBy: field,
        order: ORDER_DIRECTION.ASC,
      }
    } else if (order === ORDER_DIRECTION.ASC) {
      newSort = {
        orderBy: field,
        order: ORDER_DIRECTION.DESC,
      }
    }
    onChangeSort(newSort)
  }

  /**
   * Check if field is sorted
   * @param {string} field
   * @returns
   */
  const isSorted = (field) => {
    return orderBy === field
  }

  /**
   * Check if current page is selected all
   * @returns {bool}
   */
  const isSelectedAllCurrentPage = () => {
    return (
      rows.length > 0 &&
      rows.every(
        (item) =>
          !!selected.find(
            (selectedItem) => selectedItem[indexCol] === item[indexCol],
          ),
      )
    )
  }

  /**
   * Check if current page is checked some rows
   * @returns {bool}
   */
  const isSelectedSomeCurrentPage = () => {
    const currentPageSelectedRows = rows.filter(
      (item) =>
        !!selected.find(
          (selectedItem) => selectedItem[indexCol] === item[indexCol],
        ),
    )
    return (
      rows.length > 0 &&
      currentPageSelectedRows.length > 0 &&
      currentPageSelectedRows.length <
        (pageSize === rows.length ? pageSize : rows.length)
    )
  }

  return (
    <MuiTableHead>
      <TableRow>
        {reorderable && <TableCell className={classes.headerCell}></TableCell>}

        {checkboxSelection && (
          <TableCell
            className={clsx(classes.headerCell, classes.headerCellCheckbox)}
          >
            <Checkbox
              indeterminate={isSelectedSomeCurrentPage()}
              checked={isSelectedAllCurrentPage()}
              onChange={onSelectAllClick}
              className={classes.checkbox}
            />
          </TableCell>
        )}

        {columns.map((column, i) => {
          const { headerAlign, align, field, headerName, width, sortable } =
            column
          const sorted = isSorted(field)
          return (
            <TableCell
              key={i}
              className={clsx(classes.headerCell, {
                [classes[`headerCellAlign${headerAlign || align}`]]:
                  headerAlign || align,
              })}
              sx={{ minWidth: width }}
            >
              {sortable === true || sortable === undefined ? (
                <Box
                  onClick={() => onClickSort(field)}
                  className={classes.headerNameContainer}
                >
                  <Typography variant="h5" component="span">
                    {headerName}
                  </Typography>

                  <span
                    className={clsx(classes.sortIcon, {
                      [classes.sortIconAsc]:
                        sorted && order === ORDER_DIRECTION.ASC,
                      [classes.sortIconDesc]:
                        sorted && order === ORDER_DIRECTION.DESC,
                    })}
                  ></span>
                </Box>
              ) : (
                <Typography variant="h5" component="span">
                  {headerName}
                </Typography>
              )}
            </TableCell>
          )
        })}
      </TableRow>
    </MuiTableHead>
  )
}
TableHead.defaultProps = {
  onChangeSort: () => {},
  onSelectAllClick: () => {},
}

TableHead.propTypes = {
  onChangeSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
}

export default TableHead
