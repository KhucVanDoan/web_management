import React from 'react'
import { withStyles } from '@mui/styles'
import { Component } from 'react'
import { withTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useStyles from './style'

import { connect } from 'react-redux'
import { formatDateTimeUtc } from 'utils'
import { Divider, Grid } from '@mui/material'
import Modal from 'UNSAFE_components/shared/modal'
import { getMovementsDetailsById } from 'stores/movements/movements.action'
import {
  DATE_FORMAT,
  MOVEMENT_ORDER_TYPE_MAP_TEXT,
  MOVEMENT_TYPE_MAP_TEXT,
} from 'common/constants'
import DataTable from 'components/DataTable'
class MovementsForm extends Component {
  /**
   *
   * @param {object} props
   * @param {int} props.id
   * @param {} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      data: {},

      pageSize: 10,
      page: 1,
      isSubmitForm: false,
    }

    const { t } = this.props

    this.importExportItemsColumns = [
      {
        field: 'id',
        headerName: t('purchasedOrder.item.orderNumber'),
        width: 80,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'code',
        headerName: t('purchasedOrder.item.code'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'name',
        headerName: t('purchasedOrder.item.name'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'itemType',
        headerName: t('purchasedOrder.item.type'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
      {
        field: 'warehouseName',
        headerName: t('purchasedOrder.item.warehouseName'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
      },
      {
        field: 'planQuantity',
        headerName: t('purchasedOrder.item.planQuantity'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        filterable: false,
      },
      {
        field: 'quantity',
        headerName: t('purchasedOrder.item.movementQuantity'),
        width: 200,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
      },
    ]
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    // do nothing
  }

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    // on user id change
    if (
      prevProps.id !== this.props.id &&
      this.props.id &&
      this.props.isOpenModal
    ) {
      this.props.getMovementsDetailsById(this.props.id, (data) => {
        this.setState({
          data,
        })
      })
    }
  }

  /**
   *
   * @returns {object[]}
   */
  getLabels = () => {
    const { data } = this.state
    const { t } = this.props
    return [
      [
        {
          label: t('movements.importExport.movementCode'),
          value: data?.id,
        },
        {
          label: t('movements.importExport.movementType'),
          value:
            data?.movementType === 0 || data?.movementType > 0
              ? t(MOVEMENT_TYPE_MAP_TEXT[data?.movementType])
              : '',
        },
      ],
      [
        {
          label: t('movements.importExport.letterCode'),
          value: data?.order?.id,
        },
        {
          label: t('movements.importExport.letterType'),
          value: t(MOVEMENT_ORDER_TYPE_MAP_TEXT[data?.movementType]),
        },
      ],
      [
        {
          label: t('movements.importExport.warehouseCode'),
          value: data?.warehouse?.code,
        },
        {
          label: t('movements.importExport.warehouseName'),
          value: data?.warehouse?.name,
        },
      ],
      [
        {
          label: t('movements.importExport.createdUser'),
          value: data?.user?.fullName,
        },
        {
          label: t('movements.importExport.movementDate'),
          value: data?.createdAt
            ? formatDateTimeUtc(data?.createdAt, DATE_FORMAT)
            : '',
        },
      ],
      [
        {
          label: '',
          value: '',
        },
        {
          label: t('movements.importExport.confirmDate'),
          value: data?.order?.approvedAt
            ? formatDateTimeUtc(data?.order?.approvedAt, DATE_FORMAT)
            : '',
        },
      ],
    ]
  }

  /**
   * Handle close modal
   */
  onCloseModal = () => {
    this.resetForm()

    // callback action from parent
    this.props.handleCloseModal()
  }

  /**
   * Reset form
   */
  resetForm = () => {
    this.setState({
      data: {},
    })
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

  /**
   * getItemsDataForGrid
   * @returns {object[]}
   */
  getItemsDataForGrid = () => {
    const { data } = this.state
    const items =
      data?.items?.map((item, index) => ({
        id: index + 1,
        code: item?.code,
        name: item?.name,
        itemType: item?.itemType,
        warehouseName: item?.warehouse?.name,
        planQuantity: item?.planQuantity,
        quantity: item?.quantity,
      })) || []
    return items
  }

  render() {
    const { pageSize, page, data } = this.state

    const { isOpenModal, t, classes } = this.props

    const labels = this.getLabels()
    return (
      <Modal
        size={'lg'}
        isOpen={isOpenModal}
        onClose={this.onCloseModal}
        onSubmit={this.onSubmit}
        onCancel={this.onCancelModal}
        hideSubmit={true}
        hideCancel={true}
        title={t('movements.formTitle')}
        isOpenModal={isOpenModal}
      >
        <Box>
          <h1 className={classes.textCenter}>{t('movements.formTitle')}</h1>
          <Divider />
          <Box display="flex" justifyContent="center" my={4}>
            <Box width={6 / 7}>
              <Grid container spacing={2}>
                {labels.map((row) => (
                  <Grid container item>
                    {row.map((item) => (
                      <Grid item xs={12} lg={6} md={6}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mr={1}
                          flex={1}
                        >
                          <Box width={0.4}>
                            <label className={classes.labelItem}>
                              {item?.label}
                            </label>
                          </Box>

                          <Box width={0.6} mx={2}>
                            <FormControl fullWidth>{item?.value}</FormControl>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
              <Box mt={3}>
                <div>
                  <label className={this.props.classes.labelItem}>
                    {t('movements.importExport.description')}
                  </label>
                </div>
                <FormControl fullWidth>
                  <TextField
                    name="description"
                    id="description"
                    margin="dense"
                    variant="outlined"
                    size="small"
                    value={data?.description || ''}
                    rows={5}
                    multiline
                    disabled={true}
                    placeholder={t('movements.importExport.description')}
                  />
                </FormControl>
              </Box>

              <Box my={3}>
                <label className={this.props.classes.labelItem}>
                  {t('itemTypeSetting.itemDetails')}
                </label>
              </Box>
              <DataTable
                rowHeight={80}
                rows={this.getItemsDataForGrid() || []}
                columns={this.importExportItemsColumns}
                pageSize={pageSize}
                page={page}
                onPageChange={this.onPageChange}
                onPageSizeChange={this.onPageSizeChange}
                hideFooter={true}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  movementManagement: state.movementManagement,
})

const mapDispatchToProps = {
  getMovementsDetailsById,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(MovementsForm)),
)
