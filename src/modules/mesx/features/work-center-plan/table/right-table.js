import React, { Component } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import TableHead from '~/components/DataTable/TableHead'

import useStyles from './style'
/**
 * Data Table
 */
class NewTable extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    const { rows } = this.props
    this.setState({ items: rows })
  }

  onChangeItem = (row, index, value, key) => {
    const items = [...this.state.items]
    const itemToChange = items[index]
    const offset = itemToChange[key] - parseInt(value)
    itemToChange['sum'] = itemToChange['sum'] - offset
    itemToChange[key] = parseInt(value)
    items[index] = itemToChange
    this.setState(items)
    this.props.handleOnChange(items)
  }
  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const { classes, columns, mode } = this.props
    const { items, indexCol } = this.state
    const isEdit = mode === MODAL_MODE.UPDATE

    return (
      // <Paper className={classes.paper}>
      <TableContainer>
        <Table
          style={{ borderRight: '1px solid rgba(0,0,0,0.1)' }}
          className={classes.table}
          stickyHeader
        >
          <TableHead
            classes={classes}
            indexCol={indexCol}
            rows={items}
            columns={columns}
          />
          <TableBody>
            {items?.length > 0 &&
              items.map((row, index) => {
                return (
                  <TableRow
                    tabIndex={-1}
                    key={row[indexCol]}
                    className={clsx(classes.tableRow, {
                      [classes.tableRowEven]: index % 2 === 1,
                    })}
                  >
                    {columns
                      .filter((item) => !item.hide)
                      .map((column, i) => {
                        const { field, align, renderCell } = column
                        const today = new moment()
                        const cellValue = renderCell
                          ? renderCell({ row })
                          : row[field]
                        return (
                          <TableCell
                            align={align || 'left'}
                            id={`data-table-${field}-${i}`}
                          >
                            <TextField
                              value={cellValue}
                              variant="outlined"
                              onChange={(event) =>
                                this.onChangeItem(
                                  row,
                                  index,
                                  event.target.value,
                                  field,
                                )
                              }
                              type="number"
                              margin="dense"
                              disabled={
                                !(isEdit && index % 3 === 0) ||
                                field === 'sum' ||
                                today.isAfter(new moment(field), 'date')
                              }
                            />
                          </TableCell>
                        )
                      })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      // </Paper>
    )
  }
}

NewTable.propsTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number,
      filterable: PropTypes.bool,
      sortable: PropTypes.bool,
      hide: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']), // default left
      headerAlign: PropTypes.oneOf(['left', 'center', 'right']), // default center
      renderCell: PropTypes.func, // renderCell and replace valueGetter
    }),
  ),
  indexCol: PropTypes.string,
  checkboxSelection: PropTypes.bool, // default: false
  total: PropTypes.number,
  autoHeight: PropTypes.bool, // default: false
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onChangeFilter: PropTypes.func,
  onChangeSelectedRows: PropTypes.func,
  hideFooter: PropTypes.bool,
  reorderable: PropTypes.bool, // default false
}

export default withTranslation()(withStyles(useStyles)(NewTable))
