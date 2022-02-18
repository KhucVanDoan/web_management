/* eslint-disable */

import React, { Component } from 'react'

import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  Checkbox,
} from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import { isBefore, isSameDay } from 'date-fns'
import moment from 'moment'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import DateRangePicker from '~/UNSAFE_components/shared/date-range-picker'
import Modal from '~/UNSAFE_components/shared/modal'
import BasicTabs from '~/UNSAFE_components/shared/tab'
import {
  MO_STATUS,
  MO_STATUS_MAP,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  DATE_FORMAT,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import TableCollapse from '~/components/TableCollapse'
import {
  getItems,
  getUsers,
  createPurchasedOrder,
} from '~/modules/mesx/redux/actions/common'
import { searchFactories } from '~/modules/mesx/redux/actions/factory'
import { searchItemTypes } from '~/modules/mesx/redux/actions/item-type-setting'
import {
  confirmMOById,
  createMO,
  getMODetailsById,
  rejectMOById,
  updateMO,
  getBOMProducingStepStructureById,
  checkMaterialPlanById,
} from '~/modules/mesx/redux/actions/mo.action'
import { searchSaleOrders } from '~/modules/mesx/redux/actions/sale-order'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  onChangeDate,
  onChangeSelect,
  onChangeTextField,
  redirectRouter,
  formatDateTimeUtc,
} from '~/utils'

import ItemsSettingTable from './items-setting-table'
import useStyles from './style'

const DEFAULT_ITEM = {
  id: 0,
  itemId: null,
  quantity: 1,
}

const MODAL_CONFIRM_TYPE = {
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
}
class MOForm extends Component {
  /**
   * @param {object} props
   * @param {int} props.id
   * @param {string} props.mode
   */
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      name: '',
      planFrom: '',
      planTo: '',
      description: '',
      items: [{ ...DEFAULT_ITEM }],
      mode: MODAL_MODE.CREATE,
      status: 0,
      createdByUser: {},
      bomTree: [],
      bomTreeProducingSteps: [],
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      modalAction: () => {},
      isViewOnly: false,
      factoryId: null,
      saleOrderId: null,
      factory: {},
      isOpenCreatePO: false,
      isOpenEnoughMaterial: false,
      soDeadline: null,
      soOrderedAt: null,
      originalSaleOrderId: null,
      originalItemQuantity: {},
      itemSettingReady: false,
    }
    const { t } = this.props
    this.columns = [
      {
        field: 'id',
        headerName: t('Mo.item.orderNumber'),
        align: 'center',
        width: 100,
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.id
        },
      },
      {
        field: 'code',
        headerName: t('Mo.item.code'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.code
        },
      },
      {
        field: 'name',
        headerName: t('Mo.item.name'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.name
        },
      },
      {
        field: 'itemtypeId',
        headerName: t('Mo.item.type'),
        align: 'center',
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const { itemTypeList } = this.props
          const { item } = params.row
          return itemTypeList.find((i) => i.id === item?.itemTypeId)?.name
        },
      },
      {
        field: 'multiler',
        headerName: t('Mo.item.multiler'),
        align: 'center',
        filterable: false,
        sortable: false,
      },
      {
        field: 'planQuantity',
        headerName: t('Mo.item.planQuantity'),
        align: 'center',
        filterable: false,
        sortable: false,
      },
      {
        field: 'remainningQuantity',
        headerName: t('Mo.item.remainingQuantity'),
        align: 'center',
        filterable: false,
        sortable: false,
      },
      {
        field: 'remainningMinQuantity',
        headerName: t('Mo.item.remainingMinQuantity'),
        align: 'center',
        filterable: false,
        sortable: false,
      },
      {
        field: 'planningQuantity',
        headerName: t('Mo.item.planningQuantity'),
        align: 'center',
        filterable: false,
        sortable: false,
      },
      {
        field: 'needInputQuantity',
        headerName: t('Mo.item.needInputQuantity'),
        align: 'center',
        filterable: false,
        sortable: false,
      },
      {
        field: 'itemUnit',
        headerName: t('Mo.item.unitType'),
        align: 'center',
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item.itemUnit
        },
      },
      {
        field: 'isProductionObject',
        headerName: t('Mo.item.isProductionObject'),
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return (
            <Checkbox
              checked={item?.isProductionObject}
              name="isProductionObject"
              color="primary"
              disabled
            />
          )
        },
      },
    ]
    this.producingStepColumns = [
      {
        field: 'code',
        headerName: t('Mo.producingStep.producingStepCode'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { producingStep } = params.row
          return producingStep?.code
        },
      },
      {
        field: 'name',
        headerName: t('Mo.producingStep.producingStepName'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { producingStep } = params.row
          return producingStep?.name
        },
      },
      {
        field: 'planQuantity',
        headerName: t('Mo.producingStep.planQuantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'remainningQuantity',
        headerName: t('Mo.producingStep.remainingQuantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'remainningMinQuantity',
        headerName: t('Mo.producingStep.remainingMinQuantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'planningQuantity',
        headerName: t('Mo.producingStep.planningQuantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'inputQuantity',
        headerName: t('Mo.producingStep.inputQuantity'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'unit',
        headerName: t('Mo.producingStep.unit'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { data } = params
          return data?.itemUnit
        },
      },
    ]
    this.validator = new SimpleReactValidator()
  }
  /**
   * componentDidMount
   */
  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.MO.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.MO.DETAIL.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.MO.EDIT.PATH]: MODAL_MODE.UPDATE,
    }
    const id = this.props.match.params.id
    const path = this.props.match.path
    const search = new URLSearchParams(this.props.location?.search)
    this.setState(
      {
        mode: MODE_MAP[path?.replace(id, ':id')],
        isViewOnly: !!search.get('isViewOnly'),
      },
      this.refreshData,
    )
    this.props.searchItemTypes()
  }
  /**
   * Refresh init data
   */
  refreshData = () => {
    if (this.state.mode === MODAL_MODE.UPDATE) {
      this.setState({
        itemSettingReady: true,
      })
    }
    const saleOrderParams = {
      filter: JSON.stringify([{ column: 'status', text: '1' }]),
    }
    this.getMODetail()
    this.props.searchSaleOrders(saleOrderParams)
    this.props.getItems()
    this.props.getUsers()
    this.props.searchFactories()
  }

  getMODetail = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    if (mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) {
      this.props.getMODetailsById(id, (data) => {
        const {
          code,
          name,
          planFrom,
          planTo,
          description,
          manufacturingOrderDetails,
          status,
          factory,
          saleOrderId,
          createdByUser,
        } = data
        if (mode === MODAL_MODE.UPDATE && status !== MO_STATUS.PENDING) {
          redirectRouter(ROUTE.MO.DETAIL.PATH + `/${id}`)
        }
        const cloneMoItems = JSON.parse(
          JSON.stringify(manufacturingOrderDetails),
        )

        let originalItemQuantity = {}

        if (this.state.originalSaleOrderId === null) {
          cloneMoItems.forEach((i) => {
            let originalQuantity = {
              [i.itemId]: i.quantity,
            }
            Object.assign(originalItemQuantity, originalQuantity)
          })
        }

        this.setState({
          code,
          name,
          factory,
          saleOrderId,
          planFrom,
          planTo,
          description,
          items: cloneMoItems?.map((e, index) => ({
            id: index,
            itemId: e.itemId,
            quantity: e.quantity,
          })),
          status,
          mode: status === MO_STATUS.REJECTED ? MODAL_MODE.UPDATE : mode,
          createdByUser,
          originalSaleOrderId:
            this.state.originalSaleOrderId === null ? saleOrderId : null,
          originalItemQuantity,
        })
      })
      this.props.getBOMProducingStepStructureById(id, (data) => {
        let bomTree = JSON.parse(JSON.stringify(data))

        const recursiveRemoveKey = (object, deleteKey) => {
          delete object[deleteKey]

          Object.values(object).forEach((val) => {
            if (typeof val !== 'object') return

            recursiveRemoveKey(val, deleteKey)
          })
        }

        recursiveRemoveKey(bomTree, 'producingSteps')
        this.setState({ bomTreeProducingSteps: data, bomTree })
      })
    }
  }

  /**
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    if (
      this.validator.allValid() &&
      this.state.itemSettingReady &&
      (isBefore(moment(this.state.planTo)._d, this.state.soDeadline) ||
        isSameDay(moment(this.state.planTo)._d, this.state.soDeadline))
    ) {
      const { code, name, planFrom, planTo, description, items, saleOrderId } =
        this.state
      const params = {
        code: code?.trim(),
        name,
        factoryId: this.state.factory.id,
        saleOrderId,
        planFrom,
        planTo,
        moItems: items.map((item) => ({
          id: item.itemId,
          quantity: +item.quantity,
        })),
        description: description?.trim(),
      }
      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createMO(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updateMO(params, this.backToList)
      }
    }
  }
  /**
   * Open approve modal
   */
  openApproveModal = () => {
    this.setState({
      isOpenConfirmModal: true,
      confirmMessage: 'common.confirmMessage.confirm',
      modalConfirmType: MODAL_CONFIRM_TYPE.APPROVE,
      modalAction: this.submitConfirmMO,
    })
  }
  /**
   * Submit confirm MO
   */
  submitConfirmMO = () => {
    this.props.confirmMOById(this.props.match.params.id, () => {
      this.backToList()
    })
  }
  /**
   * Handle cancel modal
   */
  onCancel = () => {
    const { mode } = this.state
    if (mode === MODAL_MODE.CREATE) {
      this.resetForm()
    }
    if (mode === MODAL_MODE.UPDATE) {
      const {
        code,
        name,
        planFrom,
        planTo,
        description,
        manufacturingOrderDetails,
        createdByUser,
        status,
        factoryId,
        saleOrderId,
        factory,
      } = this.props.Mo.moDetails
      const cloneMoItems = JSON.parse(JSON.stringify(manufacturingOrderDetails))

      this.setState({
        code,
        name,
        planFrom,
        planTo,
        description,
        items: cloneMoItems?.map((e, index) => ({
          id: index,
          itemId: e.itemId,
          quantity: e.quantity,
        })),
        createdByUser,
        factoryId,
        saleOrderId,
        factory,
        status,
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.MO.LIST.PATH)
  }

  /**
   *
   */
  goToMovementList = () => {
    redirectRouter(ROUTE.MO.MOVEMENTS.PATH + `/${this.props.match.params.id}`)
  }

  /**
   * Close confirm modal and back to list
   */
  onCloseConfirmModal = () => {
    this.setState({ isOpenConfirmModal: false })
    this.backToList()
  }
  /**
   * Render action buttons based on mode and status
   * @returns {JSX.Element}
   */
  renderActionButtons = () => {
    const { mode, status } = this.state
    const { t } = this.props
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box display="flex">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  {t('common.create')}
                </Button>
              </Box>
              <Box mr={1}>
                <Button variant="contained" onClick={this.onCancel}>
                  {t('common.cancel')}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={this.backToList}>
                  {t('common.close')}
                </Button>
              </Box>
            </Box>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box display="flex">
              <Box mr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  {t('common.save')}
                </Button>
              </Box>
              <Box mr={1}>
                <Button variant="contained" onClick={this.onCancel}>
                  {t('common.cancel')}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={this.backToList}>
                  {t('common.close')}
                </Button>
              </Box>
            </Box>
          </Box>
        )
      case MODAL_MODE.DETAIL:
        ;<Box>
          <Button variant="contained" onClick={this.backToList}>
            {t('common.close')}
          </Button>
        </Box>
        switch (status) {
          // PENDING
          case MO_STATUS.PENDING:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box mr={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.openApproveModal}
                    >
                      {t('common.accept')}
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // APPROVED
          case MO_STATUS.APPROVED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // REJECTED
          case MO_STATUS.REJECTED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box></Box>
                <Box display="flex">
                  <Box mr={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {}}
                    >
                      {t('common.save')}
                    </Button>
                  </Box>
                  <Box mr={1}>
                    <Button variant="contained" onClick={this.onCancel}>
                      {t('common.cancel')}
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
          // IN_PROGRESS
          // COMPLETED
          // CONFIRMED
          case MO_STATUS.CONFIRMED:
          case MO_STATUS.IN_PROGRESS:
          case MO_STATUS.COMPLETED:
            return (
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Box display="flex">
                  <Box>
                    <Button variant="contained" onClick={this.backToList}>
                      {t('common.close')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            )

          default:
            return
        }
      default:
        break
    }
  }

  /**
   * Reset form
   */
  resetForm = () => {
    this.setState({
      code: '',
      name: '',
      planFrom: '',
      planTo: '',
      description: '',
      bomTree: [],
      items: [{ ...DEFAULT_ITEM }],
      mode: MODAL_MODE.CREATE,
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      factoryId: null,
      saleOrderId: null,
      factory: {},
    })
  }

  /**
   * Render breadcrumb
   */
  getBreadcrumb = () => {
    const { mode } = this.state
    const breadcrumb = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.MO.LIST.PATH,
        title: ROUTE.MO.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.MO.CREATE.PATH,
          title: ROUTE.MO.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.MO.DETAIL.PATH + `/${id}`,
          title: ROUTE.MO.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.MO.EDIT.PATH + `/${id}`,
          title: ROUTE.MO.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  /**
   * Get title
   */
  getTitle = () => {
    const { mode } = this.state
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.MO.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.MO.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MO.EDIT.TITLE
      default:
    }
  }

  checkMaterialPlan = () => {
    this.props.checkMaterialPlanById(
      this.props.Mo.moDetails?.materialPlan?.id,
      (data) => {
        if (this.props.materialCheck) {
          this.setState({
            isOpenCreatePO: true,
          })
        } else {
          this.setState({
            isOpenEnoughMaterial: true,
          })
        }
      },
    )
  }

  createPO = () => {
    const { materialCheck } = this.props

    const params = {
      ...materialCheck,
      createdByUserId: this.state.createdByUser?.id,
    }
    this.props.createPurchasedOrder(params, (data) => {
      redirectRouter(ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH)
    })
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const {
      code,
      name,
      planFrom,
      planTo,
      description,
      items,
      status,
      isSubmitForm,
      bomTree,
      bomTreeProducingSteps,
      page,
      pageSize,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
      factory,
      saleOrderId,
      isOpenCreatePO,
      isOpenEnoughMaterial,
      soDeadline,
    } = this.state
    const { t, classes, Mo, saleOrderList, factoriesList } = this.props

    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    this.validator.purgeFields()

    return (
      <Box>
        <Loading open={Mo?.isLoading} />
        <Breadcrumbs breadcrumbs={this.getBreadcrumb()} />
        <h2>{t('menu.' + this.getTitle())}</h2>
        <form>
          <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
            <Divider />
            {status >= 0 && (
              <Box display="flex" justifyContent="space-between">
                <Box></Box>
                <Box
                  mt={1}
                  p={1}
                  className={clsx(classes.statusBox, {
                    [classes.blueText]: !(status === MO_STATUS.REJECTED),
                    [classes.redText]: status === MO_STATUS.REJECTED,
                  })}
                  mr={3}
                >
                  {t(MO_STATUS_MAP[status])}
                </Box>
              </Box>
            )}
            <Grid container>
              {/** code */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={2}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('Mo.moCode')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="code"
                        id="code"
                        value={code}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 20 }}
                        disabled={isUpdate || isView}
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'code',
                        code?.trim(),
                        `required|alpha_num|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX}`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(code?.trim(), `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                      {isSubmitForm &&
                        !this.validator.check(code?.trim(), 'alpha_num') && (
                          <FormHelperText error>
                            {t('form.validCode')}
                          </FormHelperText>
                        )}
                      {isSubmitForm &&
                        !this.validator.check(
                          code?.trim(),
                          `max:${TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX}`,
                        ) && (
                          <FormHelperText error>
                            {t('form.maxLength', {
                              max: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** factory */}
              <Grid item xs={12} lg={6} md={6} className={classes.displayFlex}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mr={1}
                  flex={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('Mo.moFactory')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="factory"
                        labelId="demo-customized-select-label"
                        id="factory"
                        variant="outlined"
                        value={factory}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {mode !== MODAL_MODE.CREATE && (
                          <MenuItem value={factory}>{factory.name}</MenuItem>
                        )}
                        {factoriesList.map(
                          (item, key) =>
                            (item.id !== factory.id ||
                              mode === MODAL_MODE.CREATE) && (
                              <MenuItem key={key} value={item}>
                                {item.name}
                              </MenuItem>
                            ),
                        )}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message(
                        'moFactory',
                        factory.name,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(factory.name, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              {/** name */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  mr={2}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('Mo.moName')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="name"
                        id="name"
                        value={name}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        onChange={(event) => onChangeTextField(this, event)}
                        inputProps={{ maxLength: 255 }}
                        disabled={isView}
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'name',
                        name,
                        `required|max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(name, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}

                      {isSubmitForm &&
                        !this.validator.check(
                          name,
                          `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                        ) && (
                          <FormHelperText error>
                            {t('form.maxLength', {
                              max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** sale Order */}
              <Grid item xs={12} lg={6} md={6}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  mr={1}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('Mo.soCode')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        name="saleOrderId"
                        labelId="demo-customized-select-label"
                        id="saleOrderId"
                        variant="outlined"
                        value={saleOrderId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => onChangeSelect(this, event)}
                        disabled={isView}
                      >
                        {saleOrderList.map((item) => (
                          <MenuItem value={item.id}>{item.code}</MenuItem>
                        ))}
                      </Select>
                      {/* add rule to validate */}
                      {this.validator.message(
                        'saleOrderId',
                        saleOrderId,
                        `required`,
                      )}
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(saleOrderId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid container>
                {/**plan period */}
                <Grid item xs={12} lg={6} md={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mr={1}
                    flex={1}
                  >
                    <Box width={0.3}>
                      <label className={clsx(classes.labelItem)}>
                        {t('Mo.moPlan')}
                        <span className={classes.required}> *</span>
                      </label>
                    </Box>

                    <Box width={0.7} mx={2} py={2}>
                      <FormControl fullWidth>
                        <DateRangePicker
                          validator={this.validator}
                          isSubmitForm={isSubmitForm}
                          from={planFrom || null}
                          to={planTo || null}
                          isRequiredFrom={false}
                          isRequiredTo={false}
                          isDisabled={isView}
                          onChangeFrom={(date) =>
                            onChangeDate(this, 'planFrom', date)
                          }
                          onChangeTo={(date) =>
                            onChangeDate(this, 'planTo', date)
                          }
                        />
                        {/* add rule to validate */}
                        {this.validator.message(
                          'planTo',
                          moment(planTo),
                          `required`,
                        )}
                        {/* check isValid to show messages */}
                        {isSubmitForm &&
                          !this.validator.check(planTo, `required`) && (
                            <FormHelperText error>
                              {t('form.required')}
                            </FormHelperText>
                          )}
                        {isSubmitForm &&
                          !isBefore(moment(planTo)._d, soDeadline) &&
                          !isSameDay(moment(planTo)._d, soDeadline) && (
                            <FormHelperText error>
                              {t('form.maxDate', {
                                to: formatDateTimeUtc(soDeadline, DATE_FORMAT)
                                  .slice(0, 10)
                                  .split('/')
                                  .reverse()
                                  .join('/'),
                              })}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box
                className={clsx(classes.marginAuto, classes.marginLabel)}
                width={8 / 8}
              >
                <Divider />
                {/** MO description */}
                <Box mt={2}>
                  <div className={clsx(classes.marginLabel)}>
                    <label className={classes.labelItem}>
                      {t('Mo.descriptionInput')}
                    </label>
                  </div>
                  <FormControl fullWidth>
                    <TextField
                      name="description"
                      id="description"
                      value={description}
                      margin="dense"
                      variant="outlined"
                      size="small"
                      onChange={(event) => onChangeTextField(this, event)}
                      disabled={isView}
                      multiline
                      rows={5}
                    />
                    {/* add rule to validate */}
                    {this.validator.message(
                      'description',
                      description,
                      `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                    )}
                    {/* check isValid to show messages */}
                    {isSubmitForm &&
                      !this.validator.check(
                        description,
                        `max:${TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX}`,
                      ) && (
                        <FormHelperText error>
                          {t('form.maxLength', {
                            max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          })}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
              <BasicTabs>
                <ItemsSettingTable
                  parent={this}
                  items={items}
                  saleOrderId={this.state.saleOrderId}
                  isSubmitForm={isSubmitForm}
                >
                  {t('Mo.itemDetails')}
                </ItemsSettingTable>
                <TableCollapse
                  rows={bomTree}
                  pageSize={pageSize}
                  page={page}
                  mode={mode}
                  columns={this.columns}
                  isRoot={true}
                  isView={true}
                >
                  {t('defineBOM.BOMStructure')}
                </TableCollapse>
                <TableCollapse
                  rows={bomTreeProducingSteps}
                  pageSize={pageSize}
                  producingStepColumns={this.producingStepColumns}
                  page={page}
                  mode={mode}
                  columns={this.columns}
                  isRoot={true}
                  isView={true}
                >
                  {t('defineBOM.BOMStructureOperation')}
                </TableCollapse>
              </BasicTabs>

              <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
                {this.state.mode === MODAL_MODE.DETAIL && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.checkMaterialPlan()}
                  >
                    {t('Mo.materialRequest')}
                  </Button>
                )}
                {this.renderActionButtons()}
              </Box>
            </Grid>
          </Box>
        </form>
        <Modal
          isOpen={isOpenConfirmModal}
          title={t('common.notify')}
          size="sm"
          onSubmit={modalAction}
          onClose={this.onCloseConfirmModal}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t(confirmMessage)}
        </Modal>
        <Modal
          isOpen={isOpenCreatePO}
          title={t('Mo.createPOTitle')}
          size="sm"
          onSubmit={() => this.createPO()}
          onClose={() => this.setState({ isOpenCreatePO: false })}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('Mo.createPOConfirm')}
        </Modal>
        <Modal
          isOpen={isOpenEnoughMaterial}
          title={t('Mo.enoughMaterial')}
          size="sm"
          onSubmit={() => this.setState({ isOpenEnoughMaterial: false })}
          onClose={() => this.setState({ isOpenEnoughMaterial: false })}
          submitLabel={t('common.yes')}
          closeLabel={t('common.no')}
          hideCancel
        >
          {t('Mo.enoughMaterialMessage')}
        </Modal>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  Mo: state.Mo,
  materialCheck: state.Mo.materialCheck,
  userList: state.commonManagement.userList,
  saleOrderList: state.saleOrder.saleOrderList,
  factoriesList: state.Factory.factoriesList,
  itemTypeList: state.itemTypeSetting.itemTypeList,
})

const mapDispatchToProps = {
  confirmMOById,
  createMO,
  getMODetailsById,
  updateMO,
  rejectMOById,
  getItems,
  getUsers,
  searchSaleOrders,
  searchFactories,
  getBOMProducingStepStructureById,
  searchItemTypes,
  checkMaterialPlanById,
  createPurchasedOrder,
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MOForm)),
)
