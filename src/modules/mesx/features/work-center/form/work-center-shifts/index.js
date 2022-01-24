import React from 'react'

import { RemoveCircleOutlined } from '@mui/icons-material'
import { Button, FormHelperText, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
// import { TimePicker } from '@material-ui/pickers';
import { isAfter } from 'date-fns'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { END_TIME, MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { scrollToBottom } from '~/utils'

import useStyles from './style'

class ShiftTable extends React.Component {
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
      const shifts = JSON.parse(JSON.stringify(this.props.shifts))
      this.props.parent.setState({ shifts })
    }
  }
  onChangeItem = (index, key, value) => {
    const shifts = [...this.props.shifts]
    const itemToChange = shifts[index]
    itemToChange[key] = value
    shifts[index] = itemToChange
    this.props.parent.setState((prevState) => ({
      shifts: [...shifts.map((a) => Object.assign({}, a))],
    }))
  }
  /**
   * Get columns
   */
  getColumns = () => {
    const { t } = this.props

    return [
      {
        field: 'id',
        headerName: '#',
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          return params.row?.id + 1
        },
      },
      {
        field: 'shiftName',
        headerName: t('workCenter.shiftName'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { itemId, id, name } = params.row
          const { isSubmitForm, shifts, classes } = this.props
          const shiftObject = shifts?.find((x) => x.id === id)
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{shiftObject?.name}</>
          ) : (
            <Box flex={1} alignItems="center" key={`name${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  value={name}
                  onChange={(event) =>
                    this.onChangeItem(id, 'name', event.target.value)
                  }
                  variant="outlined"
                  margin="dense"
                />
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'startAt',
        headerName: t('workCenter.startTime'),
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {
          const { itemId, id, startAt, endAt } = params.row
          const { isSubmitForm, shifts, classes } = this.props
          const shiftObject = shifts?.find((x) => x.id === id)
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>
              {new Date(shiftObject?.startAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </>
          ) : (
            <Box flex={1} alignItems="center" key={`startAt${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                {/* <TimePicker
                  minTime={new Date(shifts[id - 1]?.endAt)}
                  disableIgnoringDatePartForTimeValidation
                  ampm={false}
                  value={startAt}
                  onChange={(event) => this.onChangeItem(id, 'startAt', +event)}
                  renderInput={(params) => <TextField {...params} />}
                  inputVariant="outlined"
                  margin="dense"
                /> */}
              </FormControl>
              {/* {id > 0 &&
                new Date(shifts[id]?.startAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }) !==
                  new Date(shifts[id - 1]?.endAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }) && (
                  <FormHelperText error>
                    {t('form.invalidTimeStart')}
                  </FormHelperText>
                )}

              {startAt && endAt && isAfter(startAt, endAt) && (
                <FormHelperText error>
                  {t('form.invalidTimeRange')}
                </FormHelperText>
              )} */}
            </Box>
          )
        },
      },
      {
        field: 'endAt',
        headerName: t('workCenter.endTime'),
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {
          const { itemId, id, endAt } = params.row
          const { isSubmitForm, shifts, classes } = this.props
          const shiftObject = shifts?.find((x) => x.id === id)
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>
              {new Date(shiftObject?.endAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </>
          ) : (
            <Box flex={1} alignItems="center" key={`endAt${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                {/* <TimePicker
                  disableIgnoringDatePartForTimeValidation
                  ampm={false}
                  value={endAt}
                  onChange={(event) => this.onChangeItem(id, 'endAt', +event)}
                  renderInput={(params) => <TextField {...params} />}
                  inputVariant="outlined"
                  margin="dense"
                /> */}
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'price',
        headerName: t('workCenter.pricePerHour'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, itemId, pricePerHour } = params.row
          const { classes, shifts } = this.props
          const { mode } = this.props.parent.state
          const shiftObject = shifts?.find((x) => x.id === id)
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{shiftObject?.pricePerHour}</>
          ) : (
            <Box flex={1} alignItems="center" key={`pricePerHour${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  value={+pricePerHour}
                  onChange={(event) =>
                    this.onChangeItem(id, 'pricePerHour', +event.target.value)
                  }
                  variant="outlined"
                  margin="dense"
                  type="number"
                />
              </FormControl>
            </Box>
          )
        },
      },
      {
        field: 'unit',
        headerName: t('workCenter.priceUnit'),
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, itemId, priceUnit } = params.row
          const { classes, shifts } = this.props
          const shiftObject = shifts?.find((x) => x.id === id)
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{shiftObject?.priceUnit}</>
          ) : (
            <Box flex={1} alignItems="center" key={`pricePerHour${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  value={priceUnit}
                  onChange={(event) =>
                    this.onChangeItem(id, 'priceUnit', event.target.value)
                  }
                  variant="outlined"
                  margin="dense"
                />
              </FormControl>
            </Box>
          )
        },
      },
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
          const { classes, shifts } = this.props
          const { id } = params.row
          const hide = this.props.parent.state.mode === MODAL_MODE.DETAIL
          return hide ? null : (
            <IconButton
              type="button"
              className={classes.iconButton}
              onClick={() => this.onRemoveShift(id)}
              disabled={shifts?.length === 1}
              size="large"
            >
              <RemoveCircleOutlined />
            </IconButton>
          )
        },
      },
    ]
  }

  /**
   * Refresh init data
   */
  refreshData = () => {}

  /**
   * Add item
   */
  onAddItem = (e, i) => {
    const { shifts } = this.props
    this.props.parent.setState(
      {
        shifts: [
          ...shifts,
          {
            id: shifts.length,
            startAt: null,
            endAt: null,
            pricePerHour: '',
            priceUnit: '',
            breakTimes: [{ from: null, to: null }],
          },
        ],
      },
      scrollToBottom,
    )
    const { pageSize, page } = this.state
    // If is the end of page
    if (shifts?.length % pageSize === 0) {
      this.setState({ page: page + 1 })
    }
  }

  /**
   * Remove shift
   * @param {int} id
   */
  onRemoveShift = (id) => {
    const shifts = [...this.props.shifts]
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index }))
    this.props.parent.setState({ shifts })
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
    const { shifts, t, classes } = this.props
    const { mode } = this.props.parent.state
    const shiftEnd =
      new Date(shifts[shifts?.length - 1].endAt).getHours() +
      ':' +
      new Date(shifts[shifts?.length - 1].endAt).getMinutes()

    const checkDisableButton = shiftEnd === END_TIME
    const isView = mode === MODAL_MODE.DETAIL
    return (
      <Box
        className={clsx(classes.marginAuto, classes.marginLabel)}
        width={8 / 8}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h3>
            {t('workCenter.workCenterShift')}
            <span className={classes.required}> *</span>
          </h3>
          <Box>
            {!isView && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.onAddItem}
                disabled={checkDisableButton}
              >
                {t('workCenter.addWorkCenterShift')}
              </Button>
            )}
          </Box>
        </Box>
        <DataTable
          height={250}
          rows={shifts}
          pageSize={20}
          page={1}
          columns={this.getColumns()}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          total={shifts.length}
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

const mapDispatchToProps = {}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ShiftTable)),
)
