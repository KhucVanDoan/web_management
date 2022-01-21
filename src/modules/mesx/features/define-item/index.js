import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import {
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
  QR_CODE_TYPE,
} from 'common/constants'
import { ROUTE } from 'modules/mesx/routes/config'
import Loading from 'components/Loading'
import withBreadcrumbs from 'components/Breadcrumbs'
import useStyles from './style'
import withStyles from '@mui/styles/withStyles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material'
import Modal from 'UNSAFE_components/shared/modal'
import ItemForm from './item-form'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import {
  deleteItem,
  printQRItems,
  searchItems,
} from 'modules/mesx/redux/actions/define-item.action'
import {
  FormControl,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { formatDateTimeUtc, onChangeTextField, redirectRouter } from 'utils'
import { getBoms } from 'modules/mesx/redux/actions/common.action'
import DataTable from 'components/DataTable'
import { Link } from 'react-router-dom'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: '/database/item/create',
    title: 'itemDefine',
  },
]

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

class DefineItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      isOpenModal: false,
      modalMode: MODAL_MODE.CREATE,
      isOpenConfirmDeleteModal: false,
      isOpenPrintQRModal: false,
      keyword: '',
      pageSize: 20,
      page: 1,
      filters: [],
      sort: null,

      selectedRows: [],
      isSubmitPrintQR: false,
    }

    const { t } = props

    this.columns = [
      {
        field: 'code',
        headerName: t('defineItem.code'),
        width: 200,
        filterable: true,
        sortable: true,
      },
      {
        field: 'name',
        headerName: t('defineItem.name'),
        width: 200,
        filterable: true,
        sortable: true,
      },
      {
        field: 'itemType',
        headerName: t('defineItem.type'),
        width: 200,
        filterable: true,
        sortable: true,
        renderCell: (params) => {
          const { itemType } = params.row
          return itemType.name
        },
      },
      {
        field: 'itemGroup',
        headerName: t('defineItem.group'),
        width: 200,
        filterable: true,
        sortable: true,
        renderCell: (params) => {
          const { itemGroup } = params.row
          return itemGroup.name
        },
      },
      {
        field: 'isDetailed',
        headerName: t('defineItem.isDetailed'),
        width: 150,
        sortable: false,
        renderCell: (params) => {
          const { hasItemDetail } = params.row.itemType
          return hasItemDetail ? checkedIcon : icon
        },
      },
      {
        field: 'isProductionObject',
        headerName: t('defineItem.isProductionObject'),
        width: 250,
        sortable: false,
        renderCell: (params) => {
          const { isProductionObject } = params.row
          return isProductionObject ? checkedIcon : icon
        },
      },
      {
        field: 'isHasBom',
        headerName: t('defineItem.isHasBom') + '?',
        width: 200,
        sortable: false,
        renderCell: (params) => {
          const { isHasBom } = params.row
          return isHasBom ? checkedIcon : icon
        },
      },
      {
        field: 'description',
        headerName: t('defineItem.description'),
        width: 400,
        sortable: false,
      },
      {
        field: 'createdAt',
        headerName: t('defineItem.createdAt'),
        width: 200,
        renderCell: (params) => {
          const createdAt = params.row.createdAt
          return formatDateTimeUtc(createdAt)
        },
      },
      {
        field: 'action',
        headerName: t('common.action'),
        disableClickEventBubbling: true,
        width: 300,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { isHasBom } = params?.row
          return (
            <div>
              <IconButton
                type="button"
                onClick={() => this.onClickViewDetails(params.row.id)}
                size="large"
              >
                <Visibility />
              </IconButton>
              {!isHasBom && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickEdit(params.row.id)}
                  size="large"
                >
                  <Edit />
                </IconButton>
              )}
              {!isHasBom && (
                <IconButton
                  type="button"
                  onClick={() => this.onClickDelete(params.row.id)}
                  size="large"
                >
                  <Delete />
                </IconButton>
              )}
            </div>
          )
        },
      },
      {
        field: 'bom',
        headerName: t('defineItem.bom'),
        width: 100,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const id = params.row?.id
          const { BOMList } = this.props
          const isProductionObject = params.row?.isProductionObject
          const isHasBom = params.row?.isHasBom
          const itemHasBom = BOMList.filter((n) => n.itemId === id).map(
            (m) => m.id,
          )
          return isHasBom ? (
            <Link onClick={() => this.onClickViewDetailsBom(itemHasBom[0])}>
              {t('defineItem.bom')}
            </Link>
          ) : !isHasBom && isProductionObject ? (
            <Link to={ROUTE.DEFINE_BOM.CREATE.PATH + '?itemId=' + id}>
              {t('defineItem.bom')}
            </Link>
          ) : null
        },
      },
    ]
    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.refreshData()
    this.props.getBoms({ isGetAll: 1 })
  }

  /**
   * Refresh data
   */
  refreshData = () => {
    const { keyword, page, pageSize, filters, sort } = this.state

    const filterData = filters?.map((item) => ({
      column: item.field,
      text: '' + item?.value?.trim(),
    }))

    const sortData = sort
      ? [
          {
            column: sort?.orderBy,
            order: sort?.order?.toUpperCase(),
          },
        ]
      : []

    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: JSON.stringify(filterData),
      sort: JSON.stringify(sortData),
    }
    this.props.searchItems(params)
  }

  /**
   * Handle key down event
   * @param {*} e
   */
  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.refreshData()
    }
  }

  /**
   * handleCreateOpenModal
   */
  handleCreateOpenModal = () => {
    this.setState({ isOpenModal: true, modalMode: MODAL_MODE.CREATE })
  }

  /**
   * handleOpenPrintQRModal
   */
  handleOpenPrintQRModal = () => {
    this.setState({ isOpenPrintQRModal: true })
  }

  /**
   * handleClosePrintQRModal
   */
  handleClosePrintQRModal = () => {
    this.setState({ isOpenPrintQRModal: false })
  }

  /**
   * handleSubmitPrintQR
   */
  handleSubmitPrintQR = () => {
    this.setState({ isSubmitPrintQR: true })
    if (this.validator.allValid()) {
      const { selectedRows } = this.state
      const params = {
        items: selectedRows.map((item) => ({
          id: item.id,
          quantity: item.amount,
        })),
        type: QR_CODE_TYPE.ITEM,
      }
      this.props.printQRItems(params, () => {
        this.setState(
          { isOpenPrintQRModal: false, isSubmitPrintQR: false },
          this.clearQRAmounts,
        )
      })
    }
  }

  /**
   * Clear selected row amount
   */
  clearQRAmounts = () => {
    const { selectedRows } = this.state
    this.setState({
      selectedRows: selectedRows.map((item) => ({ ...item, amount: 1 })),
    })
  }

  /**
   *
   * @param {int} index
   * @param {int} value
   */
  onChangeItemAmount = (index, value) => {
    const items = this.state.selectedRows.slice()
    const itemToChange = items[index]
    itemToChange.amount = value
    this.setState({ selectedRows: items })
  }

  /**
   * handleCloseModal
   */

  /**
   *
   * @param {boolean} refresh
   */
  handleCloseModal = (refresh = false) => {
    this.setState({ isOpenModal: false, id: null })
    refresh && this.refreshData()
  }

  /**
   * onClickViewDetails
   * @param {int} id
   */
  onClickViewDetails = (id) => {
    this.setState({ id, modalMode: MODAL_MODE.DETAIL, isOpenModal: true })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  onClickEdit = (id) => {
    this.setState({ id, modalMode: MODAL_MODE.UPDATE, isOpenModal: true })
  }

  /**
   *
   * @param {int} id
   */
  onClickDelete = (id) => {
    this.setState({ id, isOpenConfirmDeleteModal: true })
  }

  /**
   * onSubmitDelete
   */
  onSubmitDelete = () => {
    this.props.deleteItem(this.state.id, () => {
      this.setState({ isOpenConfirmDeleteModal: false })
      this.refreshData()
    })
    this.setState({ id: null })
  }

  /**
   * onCancelDelete
   */
  onCancelDelete = () => {
    this.setState({ isOpenConfirmDeleteModal: false, id: null })
  }

  /**
   *
   * @param {array} selectedRows
   */
  onChangeSelectedRows = (selectedRows) => {
    this.setState({
      selectedRows: selectedRows.map((item) => ({ ...item, amount: 1 })),
    })
  }

  /**
   *
   * @param {int} pageSize
   */
  onPageSizeChange = ({ pageSize }) => {
    this.setState({ pageSize }, this.refreshData)
  }

  /**
   *
   * @param {int} page
   */
  onPageChange = ({ page }) => {
    this.setState({ page }, this.refreshData)
  }

  /**
   * Handle change filter
   * @param {array} filters
   */
  onChangeFilter = (filters) => {
    this.setState({ filters }, this.refreshData)
  }

  /**
   * Handle change sort
   * @param {object} sort
   */
  onChangeSort = (sort) => {
    this.setState({ sort }, this.refreshData)
  }

  /**
   * onClickViewDetailsBom
   * @param {int} id
   */
  onClickViewDetailsBom = (id) => {
    redirectRouter(ROUTE.DEFINE_BOM.DETAIL.PATH, { id })
    window.location.reload()
  }
  /**
   *
   * @returns {JSX.Element}
   */
  render() {
    const {
      isOpenModal,
      modalMode,
      id,
      isOpenConfirmDeleteModal,
      isOpenPrintQRModal,
      selectedRows,
      isSubmitPrintQR,
      page,
      pageSize,
    } = this.state
    const { classes, defineItem, t } = this.props
    this.validator.purgeFields()
    return (
      <>
        <div>
          <h2>{t('defineItem.title')}</h2>
        </div>
        <div className={classes.searchBox}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            placeholder={t('defineItem.searchPlaceholder')}
            variant="outlined"
            size="small"
            onKeyDown={this.onKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    variant="contained"
                    color="primary"
                    aria-label="search"
                    onClick={this.refreshData}
                    size="large"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            name="keyword"
            onChange={(event) => onChangeTextField(this, event)}
          />
        </div>
        <div className={classes.createBox}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleCreateOpenModal}
            startIcon={<AddCircle />}
          >
            {t('defineItem.createButton')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleOpenPrintQRModal}
            disabled={selectedRows.length === 0}
          >
            {t('defineItem.printQRButton')}
          </Button>
        </div>
        <DataTable
          rows={defineItem.itemList}
          pageSize={pageSize}
          page={page}
          columns={this.columns}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onChangeFilter={this.onChangeFilter}
          onChangeSort={this.onChangeSort}
          onChangeSelectedRows={this.onChangeSelectedRows}
          total={defineItem.total}
          checkboxSelection
        />
        <Loading open={defineItem?.isLoading} />
        <ItemForm
          modalMode={modalMode}
          id={id}
          isOpenModal={isOpenModal}
          handleCloseModal={this.handleCloseModal}
        />
        <Modal
          isOpen={isOpenConfirmDeleteModal}
          title={t('defineItem.deleteModalTitle')}
          size="sm"
          onSubmit={this.onSubmitDelete}
          onClose={this.onCancelDelete}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('defineItem.deleteConfirm')}
        </Modal>
        <Modal
          isOpen={isOpenPrintQRModal}
          title={t('defineItem.printQRModalTitle')}
          size="md"
          onSubmit={this.handleSubmitPrintQR}
          onClose={this.handleClosePrintQRModal}
          submitLabel={t('common.print')}
          closeLabel={t('common.no')}
          onCancel={this.clearQRAmounts}
          cancelLabel={t('common.cancel')}
        >
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>{t('defineItem.orderNumber')}</TableCell>
                  <TableCell>{t('defineItem.code')}</TableCell>
                  <TableCell>{t('defineItem.name')}</TableCell>
                  <TableCell>{t('defineItem.productAmount')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedRows.map((row, i) => {
                  return (
                    <TableRow hover key={i}>
                      <TableCell>{i}</TableCell>
                      <TableCell>{row?.code}</TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <TextField
                            name="amount"
                            id="amount"
                            value={row?.amount}
                            margin="dense"
                            variant="outlined"
                            size="small"
                            onChange={(event) =>
                              this.onChangeItemAmount(i, +event.target.value)
                            }
                            inputProps={{
                              min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER
                                .MIN,
                            }}
                            type="number"
                          />
                          {/* add rule to validate */}
                          {this.validator.message(
                            `itemAmount${i}`,
                            row?.amount,
                            `required|numeric|integer|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN},num`,
                          )}
                          {/* check isValid to show messages */}
                          {isSubmitPrintQR &&
                            !this.validator.check(row?.amount, `required`) && (
                              <FormHelperText error>
                                {t('form.required')}
                              </FormHelperText>
                            )}
                          {/* check isValid to show messages */}
                          {isSubmitPrintQR &&
                            !this.validator.check(
                              row?.amount,
                              `numeric|integer|min:${NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN},num`,
                            ) && (
                              <FormHelperText error>
                                {t('form.minNumber', {
                                  min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER
                                    .MIN,
                                })}
                              </FormHelperText>
                            )}
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  defineItem: state.defineItem,
  itemGroups: state.appStore.itemGroups,
  itemTypes: state.appStore.itemTypes,
  BOMList: state.commonManagement.BOMList,
})

const mapDispatchToProps = {
  searchItems,
  deleteItem,
  printQRItems,
  getBoms,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(DefineItem)),
  ),
  breadcrumbs,
)
