import React from 'react'

import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import {
  Button,
  FormHelperText,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Autocomplete } from '@mui/material'
import { withStyles } from '@mui/styles'
import { getItems } from 'modules/mesx/redux/actions/common.action'
import { normalizeDecimal, scrollToBottom } from 'utils'
import useStyles from './style'

import {
  DEFAULT_ITEM_TYPE_ENUM,
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
} from 'common/constants'
import DataTable from 'components/DataTable'

class ItemSettingTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 5,
      page: 1,
    }
  }

  getColumns = () => {
    const { t } = this.props
    return [
      {
        field: 'title',
        headerName: t('detailSchedule.item.plan'),
        width: 100,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'totalQuantity',
        headerName: t('detailSchedule.item.totalPlanQuantity'),
        width: 100,
        sortable: false,
        filterable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'quantity',
        headerName: t('detailSchedule.item.quantity'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
        renderCell: (params) => {
          const { id, quantity } = params.row
          const { isSubmitForm } = this.props
          const { classes } = this.props
          const { mode } = this.props.parent.state
          const isView = mode === MODAL_MODE.DETAIL
          return isView ? (
            <>{+quantity}</>
          ) : (
            <Box flex={1} alignItems="center" key={`quantity${id}`}>
              <FormControl fullWidth className={classes.displayFlex}>
                <TextField
                  name="quantity"
                  value={+quantity}
                  variant="outlined"
                  onChange={(event) =>
                    this.onChangeItem(id, 'quantity', +event.target.value)
                  }
                  inputProps={{
                    min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                  }}
                  type="number"
                  disabled={isView}
                  margin="dense"
                />
                {/* add rule to validate */}
                {this.props.parent.validator.message(
                  `quantity${id}`,
                  quantity,
                  `required|numeric|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN},num|max:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX},num`,
                )}
                {/* check isValid to show messages */}
                {isSubmitForm &&
                  !this.props.parent.validator.check(quantity, `required`) && (
                    <FormHelperText error>{t('form.required')}</FormHelperText>
                  )}
                {isSubmitForm &&
                  !this.props.parent.validator.check(
                    quantity,
                    `numeric|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN},num`,
                  ) && (
                    <FormHelperText error>
                      {t('form.greaterThanZero')}
                    </FormHelperText>
                  )}
                {isSubmitForm &&
                  !this.props.parent.validator.check(
                    quantity,
                    `numeric|max:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX},num`,
                  ) && (
                    <FormHelperText error>
                      {t('form.maxNumber', {
                        max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
                      })}
                    </FormHelperText>
                  )}
              </FormControl>
            </Box>
          )
        },
      },
    ]
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.refreshData()
  }
  /**
   * Refresh init data
   */
  refreshData = () => {
    this.props.getItems({})
  }
  /**
   *
   * @param {int} index
   * @param {string} key
   * @param {*} value
   */
  onChangeItem = (index, key, value) => {
    const items = [...this.props.data]
    const itemToChange = items[index - 1]
    itemToChange[key] = value
    items[index - 1] = itemToChange
    this.props.parent.setState((prevState) => ({
      workOrderScheduleDetails: [...items.map((a) => Object.assign({}, a))],
    }))
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
    const { items, t, classes, data, cloneWorkOrder, woQuantity } = this.props
    const { mode } = this.props.parent.state
    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    return (
      <Box width={8 / 8}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h3>
            {t('detailSchedule.workCenterPlanDetail')}
            <span className={classes.required}> *</span>
          </h3>
        </Box>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head" className={classes.header}>
                {t('detailSchedule.item.plan')}
              </TableCell>
              <TableCell variant="head" className={classes.header}>
                {t('detailSchedule.item.totalPlanQuantity')}
              </TableCell>
              {data?.map((i) => (
                <TableCell className={classes.header}>
                  {i.workCenter.name}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                {t('detailSchedule.item.actualQuantity')}
              </TableCell>

              <TableCell>{woQuantity}</TableCell>

              {data?.map((i) =>
                isView ? (
                  <TableCell>{i.quantity}</TableCell>
                ) : (
                  <TableCell>
                    <TextField
                      key={i.workCenter.id}
                      name="quantity"
                      value={+i.quantity}
                      variant="outlined"
                      onChange={(event) =>
                        this.onChangeItem(
                          i.index,
                          'quantity',
                          +event.target.value,
                        )
                      }
                      inputProps={{
                        min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                      }}
                      type="number"
                      disabled={isView}
                      margin="dense"
                    />
                  </TableCell>
                ),
              )}
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                {t('detailSchedule.item.moderationQuantity')}
              </TableCell>

              <TableCell>{woQuantity}</TableCell>

              {data?.map((i) => (
                <TableCell>{i.moderationQuantity}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  itemList: state.commonManagement.itemList,
})

const mapDispatchToProps = {
  getItems,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ItemSettingTable)),
)
