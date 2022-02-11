/* eslint-disable no-param-reassign */

import React from 'react'

import { RemoveCircleOutlined } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
// import { TimePicker } from '@material-ui/pickers'
import { cloneDeep, flatMap, uniqBy } from 'lodash'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import {
  getItems,
  getWarehouses,
  getBoms,
} from '~/modules/mesx/redux/actions/common'
import { scrollToBottom } from '~/utils'

import useStyles from './style'

class BreakTimeTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 5,
      page: 1,
    }
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.refreshData()
  }

  componentDidUpdate(prevProps, prevState) {
    // force datagrid update
    if (prevProps.isSubmitForm !== this.props.isSubmitForm) {
      const breakTimes = JSON.parse(JSON.stringify(this.props.breakTimes))
      this.props.parent.setState({ breakTimes })
    }
  }

  getColumns = () => {
    const { t, shifts } = this.props
    const removeColumns = [
      {
        field: 'remove',
        headerName: '',
        width: 50,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        hide: this.props.parent.state.mode === MODAL_MODE.DETAIL,
        renderCell: (params) => {
          const { classes, breakTimes } = this.props
          const { id } = params.row
          const hide = this.props.parent.state.mode === MODAL_MODE.DETAIL
          return hide ? null : (
            <IconButton
              type="button"
              className={classes.iconButton}
              onClick={() => this.onRemoveProduct(id)}
              disabled={breakTimes?.length === 1}
              size="large"
            >
              <RemoveCircleOutlined />
            </IconButton>
          )
        },
      },
    ]

    const columns = [
      {
        field: 'name',
        headerName: t('workCenter.relaxName'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id } = params.row
          const { classes, shifts } = this.props
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          const relaxTimes = uniqBy(flatMap(shifts, 'breakTimes'), 'id')
          const name = relaxTimes[id]?.name
          return isView ? (
            <>{name}</>
          ) : (
            <Box flex={1} alignItems="center">
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  onChange={(event) =>
                    this.onChangeItem(id, 'name', event.target.value, id)
                  }
                  variant="outlined"
                  margin="dense"
                  defaultValue={name ?? ''}
                />
              </FormControl>
            </Box>
          )
        },
      },
    ]

    if (shifts) {
      shifts.forEach((shift, shiftIndex) => {
        columns.push({
          field: shiftIndex,
          headerName: shift.name,
          sortable: false,
          filterable: false,
          align: 'center',
          headerAlign: 'center',
          renderCell: (params) => {
            const { mode, classes } = this.props
            const { id } = params.row

            const isView = mode === MODAL_MODE.DETAIL
            return isView ? (
              <>hihi</>
            ) : (
              <Box flex={1} alignItems="center" key={shiftIndex}>
                <FormControl fullWidth className={classes.displayFlex}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flex={1}
                  >
                    <Box width={0.4}>
                      {/* <TimePicker
                        disableIgnoringDatePartForTimeValidation
                        ampm={false}
                        onChange={(event) =>
                          this.onChangeItem(id, 'from', +event, shiftIndex)
                        }
                        value={shift.breakTimes[id]?.from ?? null}
                        renderInput={(params) => <TextField {...params} />}
                        inputVariant="outlined"
                        margin="dense"
                      /> */}
                    </Box>
                    <Box mx={1} display="flex" alignItems="center">
                      {t('form.to')}
                    </Box>
                    <Box width={0.5}>
                      {/* <TimePicker
                        disableIgnoringDatePartForTimeValidation
                        ampm={false}
                        onChange={(event) =>
                          this.onChangeItem(id, 'to', +event, shiftIndex)
                        }
                        value={shift.breakTimes[id]?.to ?? null}
                        renderInput={(params) => <TextField {...params} />}
                        inputVariant="outlined"
                        margin="dense"
                      /> */}
                    </Box>
                  </Box>
                </FormControl>
              </Box>
            )
          },
        })
      })
    }
    return columns.concat(removeColumns)
  }

  /**
   * Refresh init data
   */
  refreshData = () => {}

  /**
   * Add item
   */
  onAddItem = (e, i) => {
    const { breakTimes } = this.props
    this.props.parent.setState(
      {
        breakTimes: [
          ...breakTimes,
          {
            id: breakTimes.length,
          },
        ],
      },
      scrollToBottom,
    )
    const { pageSize, page } = this.state
    // If is the end of page
    if (breakTimes?.length % pageSize === 0) {
      this.setState({ page: page + 1 })
    }
  }

  /**
   * Remove product
   * @param {int} id
   */
  onRemoveProduct = (id) => {
    const breakTimes = [...this.props.breakTimes]
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index }))
    this.props.parent.setState({ breakTimes })
  }

  /**
   *
   * @param {int} index
   * @param {string} key
   * @param {*} value
   */
  onChangeItem = (id, key, value, shiftIndex) => {
    const cloneShift = cloneDeep(this.props.shifts)
    let breakTime = cloneShift[shiftIndex]?.breakTimes[id]
    if (!breakTime) {
      cloneShift[shiftIndex]?.breakTimes.push({
        name: key === 'name' ? value : undefined,
        from: key === 'from' ? value : undefined,
        to: key === 'to' ? value : undefined,
      })
    } else {
      breakTime[key] = value
    }
    if (key === 'name') {
      cloneShift.map((shift, index) => {
        const breakTime = shift.breakTimes[id]
        if (breakTime) {
          shift.breakTimes[id].name = value
        } else {
          shift.breakTimes.push({
            name: value,
            from: undefined,
            to: undefined,
          })
        }
      })
    }
    this.props.parent.setState({ shifts: cloneShift })
  }

  /**
   *
   * @param {int} pageSize
   */
  onPageSizeChange = ({ pageSize }) => {
    this.setState({ pageSize })
  }

  /**
   *
   * @param {int} page
   */
  onPageChange = ({ page }) => {
    this.setState({ page })
  }

  render() {
    const { t, classes, shifts, breakTimes } = this.props
    const newRows = [{ id: 0, name: '', from: null, to: null }]

    const { mode } = this.props.parent.state
    const isView = mode === MODAL_MODE.DETAIL
    return (
      <Box
        className={clsx(classes.marginAuto, classes.marginLabel)}
        width={8 / 8}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h3>
            {t('workCenter.breakTime')}
            <span className={classes.required}> *</span>
          </h3>
          <Box>
            {!isView && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.onAddItem}
              >
                {t('workCenter.timeSetup')}
              </Button>
            )}
          </Box>
        </Box>
        <DataTable
          height={250}
          rows={breakTimes}
          pageSize={20}
          page={1}
          columns={this.getColumns()}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={breakTimes.length}
          hideFooter
        />
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  itemList: state.commonManagement.itemList,
  warehouseList: state.commonManagement.warehouseList,
  warehouseTypes: state.appStore.warehouseTypes,
  BOMList: state.commonManagement.BOMList,
})

const mapDispatchToProps = {
  getItems,
  getWarehouses,
  getBoms,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(BreakTimeTable)),
)
