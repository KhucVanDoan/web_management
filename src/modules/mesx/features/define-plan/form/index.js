/* eslint-disable no-param-reassign */
import React, { Component } from 'react'

import { Button, Divider, FormHelperText, Grid, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { withStyles } from '@mui/styles'
import clsx from 'clsx'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import isEqual from 'date-fns/isEqual'
import { assign, isEmpty } from 'lodash'
import moment from 'moment'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'

import DateRangePicker from '~/UNSAFE_components/shared/date-range-picker'
import Modal from '~/UNSAFE_components/shared/modal'
import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  MODAL_MODE,
  PLAN_STATUS,
  PLAN_STATUS_MAP,
  TEXTFIELD_REQUIRED_LENGTH,
  DATE_FORMAT_2,
} from '~/common/constants'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import Loading from '~/components/Loading'
import TableCollapse from '~/components/TableCollapse'
import producingSteps from '~/modules/mesx/features/producing-steps'
import { getUsers } from '~/modules/mesx/redux/actions/common.action'
import {
  searchMO,
  getMODetailsById,
} from '~/modules/mesx/redux/actions/mo.action'
import {
  createPlan,
  getPlanDetailsById,
  updatePlan,
  confirmPlanById,
  getMoByPlanId,
} from '~/modules/mesx/redux/actions/plan.action'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  onChangeDate,
  onChangeTextField,
  onChangeSelect,
  redirectRouter,
  formatDateTimeUtc,
} from '~/utils'
import addNotification from '~/utils/toast'

import useStyles from './style'

const MODAL_CONFIRM_TYPE = {
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
}
class DefinePlanForm extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      name: '',
      moId: '',
      moName: '',
      saleOrderName: '',
      factoryName: '',
      description: '',
      planFrom: '',
      planTo: '',
      bomTree: [],
      bomChange: [],
      mode: MODAL_MODE.CREATE,
      status: -1,
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      modalAction: () => {},
      isViewOnly: false,
      filters: [],
      sort: null,
    }

    const { t } = this.props
    this.columns = [
      {
        field: 'itemName',
        headerName: t('definePlan.itemName'),
        width: 150,
        align: 'left',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.name
        },
      },
      {
        field: 'bomName',
        headerName: t('definePlan.bomName'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { bom } = params.row
          return bom?.name
        },
      },
      {
        field: 'routingCode',
        headerName: t('definePlan.routingCode'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { routing } = params.row
          return routing?.code
        },
      },
      {
        field: 'quantity',
        headerName: t('definePlan.quantity'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom, quantity } = params.row
          if (planBom !== undefined) {
            return planBom?.quantity
          } else {
            return quantity
          }
        },
      },
      {
        field: 'planQuantity',
        headerName: t('definePlan.planQuantity'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { actualQuantity } = params.row
          return parseInt(actualQuantity)
        },
      },
      {
        field: 'unit',
        headerName: t('definePlan.unit'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { item } = params.row
          return item?.itemUnit
        },
      },
      {
        field: 'planDate',
        headerName: t('definePlan.planDate'),
        align: 'center',
        sortable: false,
      },
      {
        field: 'executeDate',
        headerName: t('definePlan.executeDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return formatDateTimeUtc(planBom?.startAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'endDate',
        headerName: t('definePlan.endDate'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return formatDateTimeUtc(planBom?.endAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'status',
        headerName: t('definePlan.status'),
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { planBom } = params.row
          return planBom?.status
        },
      },
    ]
    this.producingStepColumns = [
      {
        field: 'name',
        headerName: t('definePlan.producingStepName'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { mode } = this.state
          const { producingStep, name } = params.row
          if (producingStep) return producingStep.name
          return name
        },
      },
      {
        field: 'quantity',
        headerName: t('definePlan.quantity'),
        width: 100,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { quantity } = params.row
          return quantity
        },
      },
      {
        field: 'actualQuantity',
        headerName: t('definePlan.actualQuantity'),
        width: 100,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { actualQuantity } = params.row
          return parseInt(actualQuantity)
        },
      },
      {
        field: 'planDate',
        headerName: t('definePlan.planDate'),
        width: 200,
        align: 'center',
        sortable: false,
      },
      {
        field: 'executeDate',
        headerName: t('definePlan.executeDate'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { startAt } = params.row
          return formatDateTimeUtc(startAt, DATE_FORMAT_2)
        },
      },
      {
        field: 'endDate',
        headerName: t('definePlan.endDate'),
        width: 200,
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const { endAt } = params.row
          return formatDateTimeUtc(endAt, DATE_FORMAT_2)
        },
      },
      // {
      //   field: 'workOrder',
      //   headerName: t('definePlan.workOrder'),
      //   width: 200,
      //   align: 'center',
      //   sortable: false,
      //   renderCell: (params) => {
      //     const { data } = params.row;
      //     const { moId, planFrom, planTo, code } = this.state;
      //     const { produceStepName, sumQuantity, producingStep } = params?.row;
      //     const woParams = {
      //       ...data,
      //       producingStep,
      //       moId,
      //       planFrom,
      //       planTo,
      //       code,
      //       produceStepName,
      //       sumQuantity,
      //     };

      //     return (
      //       <Link
      //         to={{
      //           pathname: ROUTE.WORK_ORDER_CREATE.PATH,
      //           state: { woParams },
      //         }}
      //       >
      //         {t('definePlan.workOrder')}
      //       </Link>
      //     );
      //   },
      // },
    ]
    this.validator = new SimpleReactValidator()
  }

  /**
   * componentDidMount
   */
  componentDidMount() {
    const MODE_MAP = {
      [ROUTE.PLAN.CREATE.PATH]: MODAL_MODE.CREATE,
      [ROUTE.PLAN.DETAILS.PATH]: MODAL_MODE.DETAIL,
      [ROUTE.PLAN.EDIT.PATH]: MODAL_MODE.UPDATE,
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
  }

  /**
   * Refresh init data
   */
  refreshData = () => {
    this.getPlanDetails()
    const params = {
      isPlanning: 1,
      filter: JSON.stringify([{ column: 'status', text: '1' }]),
    }
    this.props.searchMO(params)
    this.props.getUsers()
  }

  /**
   * change Mo
   */
  onChangeMo = (event) => {
    const moId = event.target.value
    const moName = event.currentTarget?.dataset.name

    this.setState(
      {
        bomChange: [],
      },
      () => {
        this.props.getMODetailsById(moId, (data) => {
          let { planFrom, planTo, manufacturingOrderDetails } = data
          this.setState(
            {
              moId: moId,
              moName: moName,
              factoryName: data.factory.name,
              saleOrderName: data.saleOrder.name,
              planFrom,
              planTo,
            },
            () => {
              this.props.getMoByPlanId(moId, (data) => {
                let { moList } = this.props.definePlan
                moList.map((i) => {
                  this.recursiveAddPlanDate(i)
                })
                this.nestedLoad(moList, true)
                this.setState({
                  bomTree: moList,
                })
              })
            },
          )
        })
      },
    )
  }

  recursiveAddPlanDate = (node, bomId) => {
    const { planFrom, planTo, mode } = this.state
    if (mode === MODAL_MODE.CREATE)
      Object.assign(node, { planFrom: planFrom, planTo: planTo })
    if (bomId && mode !== MODAL_MODE.DETAIL)
      Object.assign(node, { parentBomId: bomId })
    if (node?.routing?.producingSteps.length > 0) {
      node.routing.producingSteps.map((p) => {
        this.recursiveAddPlanDate(p, node.bom.id)
      })
    }

    if (node?.planBom?.producingStep.length > 0) {
      node.planBom.producingStep.map((p) => {
        this.recursiveAddPlanDate(p, node.bom.id)
      })
    }

    if (node?.subBom?.length > 0) {
      node.subBom.map((item) => {
        this.recursiveAddPlanDate(item, node.bom.id)
      })
    }
  }

  /**
   * nestedLoad
   */
  nestedLoad = (node, isRoot, parentIndex) => {
    const { planFrom, planTo, mode } = this.state
    let bomChange = this.state.bomChange
    node.map((n, index) => {
      let changeData, newPs
      if (mode === MODAL_MODE.CREATE) {
        newPs = n?.routing?.producingSteps.map((item) => ({
          quantity: n.quantity,
          id: item?.id,
          planFrom: item?.planFrom,
          planTo: item?.planTo,
        }))
        changeData = {
          index: index,
          parentIndex: isRoot ? null : parentIndex,
          bomId: n.bom.id,
          moDetailId: n?.moDetailId,
          routingId: n?.routing.id,
          quantity: n?.quantity,
          planFrom: planFrom,
          planTo: planTo,
          producingSteps: newPs,
        }
      } else {
        newPs = n?.planBom?.producingStep.map((item) => ({
          quantity: item.quantity,
          id: item?.producingStep?.id,
          planFrom: item?.workOrders[0].planFrom,
          planTo: item?.workOrders[0].planTo,
        }))
        changeData = {
          index: index,
          parentIndex: isRoot ? null : parentIndex,
          bomId: n.bom.id,
          moDetailId: n?.moDetailId,
          routingId: n?.planBom ? n?.planBom?.routingId : n.routing.id,
          quantity: n?.planBom ? n?.planBom?.quantity : n?.quantity,
          planFrom: n?.planBom?.planFrom,
          planTo: n?.planBom.planTo,
          producingSteps: newPs,
        }
      }
      bomChange.push(changeData)
      if (n?.subBom.length > 0) {
        this.nestedLoad(n.subBom, false, index)
      }
    })
    this.setState({
      bomChange,
    })
  }

  /**
   * Refresh init data
   */
  getPlanDetails = () => {
    const { mode } = this.state
    const { id } = this.props.match.params
    // call api get details
    ;(mode === MODAL_MODE.DETAIL || mode === MODAL_MODE.UPDATE) &&
      this.props.getPlanDetailsById(id, (data) => {
        const {
          code,
          name,
          mo,
          planFrom,
          planTo,
          description,
          status,
          planBoms,
        } = data
        if (mode === MODAL_MODE.UPDATE && status !== PLAN_STATUS.CREATED) {
          redirectRouter(ROUTE.PLAN.DETAILS.PATH, { id: id })
        }

        this.setState(
          {
            code,
            name,
            planFrom,
            planTo,
            moId: mo.id,
            moName: mo.name,
            description,
            status,
            mode: status === PLAN_STATUS.REJECTED ? MODAL_MODE.UPDATE : mode,
          },
          () => {
            if (mode === MODAL_MODE.UPDATE) {
              planBoms.map((i) => {
                this.recursiveAddPlanDate(i)
              })
            }
            this.nestedLoad(planBoms, true)

            this.props.getMODetailsById(this.state.moId, (data) => {
              this.setState({
                bomTree: planBoms,
                factoryName: data.factory.name,
                saleOrderName: data.saleOrder.name,
              })
            })
          },
        )
      })
  }

  /**
   * on submit
   */
  onSubmit = () => {
    this.setState({ isSubmitForm: true })
    const ready = this.checkData(this.state.bomChange)

    if (this.validator.allValid() && ready) {
      const { code, name, planFrom, planTo, moId, description, bomChange } =
        this.state
      const params = {
        code: code?.trim(),
        name,
        moId,
        description,
        planFrom,
        planTo,
        planBoms: bomChange.map((c) => ({
          ...c,
        })),
      }

      if (this.state.mode === MODAL_MODE.CREATE) {
        this.props.createPlan(params, this.backToList)
      } else {
        params.id = +this.props.match.params.id
        this.props.updatePlan(params, this.backToList)
      }
    }
  }

  checkProducingStep = (list, parentPlanFrom, parentPlanTo) => {
    for (let index = 0; index < list.length; index++) {
      let i = list[index]
      if (
        isAfter(moment(i.planFrom)._d, moment(i.planTo)._d) ||
        isBefore(moment(i.planFrom)._d, moment(parentPlanFrom)._d) ||
        isAfter(moment(i.planTo)._d, moment(parentPlanTo)._d)
      )
        return false
      if (index !== list.length - 1) {
        if (
          isAfter(
            moment(list[index].planFrom)._d,

            moment(list[index + 1].planFrom)._d,
          ) ||
          isAfter(
            moment(list[index].planTo)._d,

            moment(list[index + 1].planTo)._d,
          )
        )
          return false
      }
    }
    return true
  }

  checkData = (list) => {
    for (let index = 0; index < list.length; index++) {
      let i = list[index]
      if (this.checkProducingStep(i.producingSteps, i.planFrom, i.planTo)) {
        for (let j = index + 1; j < list.length; j++) {
          if (i.index === j.parentIndex) {
            if (
              isAfter(moment(i.planFrom)._d, moment(j.planFrom)._d) ||
              isBefore(moment(i.planTo)._d, moment(j.planTo)._d)
            )
              return false
          }
        }
      } else return false
    }
    return true
  }

  /**
   * Open approve modal
   */
  openApproveModal = () => {
    this.setState({
      isOpenConfirmModal: true,
      confirmMessage: 'common.confirmMessage.confirm',
      modalConfirmType: MODAL_CONFIRM_TYPE.APPROVE,
      modalAction: this.submitConfirmPlan,
    })
  }

  /**
   * Submit confirm plan
   */
  submitConfirmPlan = () => {
    this.props.confirmPlanById(
      { id: this.props.match.params.id, status: 2 },
      () => {
        this.backToList()
      },
    )
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
      const { code, name, planFrom, planTo, mo, description, id } =
        this.props.definePlan.planDetails

      this.setState({
        code,
        name,
        planFrom,
        planTo,
        moId: mo.id,
        description,
      })

      this.props.getPlanDetailsById(id, (data) => {
        const {
          code,
          name,
          planFrom,
          planTo,
          description,
          mo,
          status,
          planBoms,
        } = data
        this.setState({
          code,
          name,
          planFrom,
          planTo,
          moId: mo.id,
          description,
          status,
          bomTree: planBoms,
          mode: status === PLAN_STATUS.REJECTED ? MODAL_MODE.UPDATE : mode,
        })
        this.nestedLoad(planBoms, true)
      })
    }
  }

  /**
   * Back to list screen
   */
  backToList = () => {
    redirectRouter(ROUTE.PLAN.LIST.PATH)
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
          case PLAN_STATUS.CREATED:
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
          case PLAN_STATUS.APPROVED:
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
          case PLAN_STATUS.REJECTED:
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
          case PLAN_STATUS.CONFIRMED:
          case PLAN_STATUS.IN_PROGRESS:
          case PLAN_STATUS.COMPLETED:
            return (
              <Box mt={2} display="flex" justifyContent="space-between">
                <Box />
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
      moId: '',
      planTo: '',
      pmId: '',
      bomTree: [],
      description: '',
      mode: MODAL_MODE.CREATE,
      isSubmitForm: false,
      pageSize: 10,
      page: 1,
      isOpenConfirmModal: false,
      confirmMessage: '',
      modalConfirmType: '',
      filters: [],
      sort: null,
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
        route: ROUTE.PLAN.LIST.PATH,
        title: ROUTE.PLAN.LIST.TITLE,
      },
    ]

    const id = this.props.match.params.id
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.PLAN.CREATE.PATH,
          title: ROUTE.PLAN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.PLAN.DETAILS.PATH + `/${id}`,
          title: ROUTE.PLAN.DETAILS.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.PLAN.EDIT.PATH + `/${id}`,
          title: ROUTE.PLAN.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  /**
   * nestedUpdate
   */
  nestedUpdate = (node, isRoot, value, index, type, mode, row, isLeaf) => {
    const { bomChange } = this.state
    node.map((n, i) => {
      if (type === 'quantity') {
        let quantity =
          isRoot && index === i
            ? parseInt(value)
            : isLeaf
            ? parseInt(n.multiplier) * parseInt(value)
            : n?.planBom?.quantity

        n['quantity'] = quantity
        if (n['planBom'] !== undefined) {
          n['planBom']['quantity'] = quantity
          n['planBom']['producingStep'].map((p) => {
            p['quantity'] = quantity
          })
        } else {
          n['routing']['producingSteps'].map((ps) => {
            ps['quantity'] = quantity
          })
        }
      }
      bomChange.map((b) => {
        if (b?.bomId === n.bom?.id) {
          b['quantity'] = n['quantity']
          b['producingSteps'] = b.producingSteps?.map((item) => ({
            quantity: n['quantity'],
            id: item?.id,
          }))
        }
      })
      this.setState({
        bomChange,
      })
      if (n?.subBom.length > 0) {
        this.nestedUpdate(
          n.subBom,
          false,
          value,
          index,
          type,
          mode,
          row,
          index === i,
        )
      }
    })
    return node
  }

  /**
   * collectData
   */
  collectData = (row, value, type, index) => {
    const { mode, bomTree } = this.state
    const bom = this.nestedUpdate(
      bomTree,
      true,
      value,
      index,
      type,
      mode,
      row,
      false,
    )
    this.setState({ bomTree: bom })
  }
  /**
   * Get title
   */
  getTitle = () => {
    const { mode } = this.state
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.PLAN.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.PLAN.DETAILS.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.PLAN.EDIT.TITLE
      default:
    }
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const {
      code,
      name,
      moId,
      moName,
      saleOrderName,
      factoryName,
      planFrom,
      planTo,
      description,
      status,
      isSubmitForm,
      mode,
      isOpenConfirmModal,
      confirmMessage,
      modalAction,
      pageSize,
      page,
      bomTree,
      bomChange,
    } = this.state

    const { t, classes, definePlan, moList, userList } = this.props
    const isView = mode === MODAL_MODE.DETAIL
    const isUpdate = mode === MODAL_MODE.UPDATE
    this.validator.purgeFields()

    return (
      <Box>
        <Loading open={definePlan?.isLoading} />
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
                    [classes.blueText]: !(status === PLAN_STATUS.REJECTED),
                    [classes.redText]: status === PLAN_STATUS.REJECTED,
                  })}
                  mr={3}
                >
                  {t(PLAN_STATUS_MAP[status])}
                </Box>
              </Box>
            )}
            <Grid container>
              {/** plan code */}
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
                      {t('definePlan.planCode')}
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
                        inputProps={{ maxLength: 4 }}
                        disabled={isUpdate || isView}
                      />
                      {/* add rule to validate */}
                      {this.validator.message(
                        'code',
                        code?.trim(),
                        `required|alpha_num|max:${TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX}`,
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
                          `max:${TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX}`,
                        ) && (
                          <FormHelperText error>
                            {t('form.maxLength', {
                              max: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                            })}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** moName */}
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
                      {t('definePlan.moName')}
                      <span className={classes.required}> *</span>
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <Select
                        // name="moId"
                        labelId="demo-customized-select-label"
                        // id="moId"
                        variant="outlined"
                        value={moId}
                        className={clsx(classes.widthBoxSelect)}
                        onChange={(event) => this.onChangeMo(event)}
                        disabled={isView}
                      >
                        {mode !== MODAL_MODE.CREATE && (
                          <MenuItem key={moId} value={moId} data-name={moName}>
                            {t(moName)}
                          </MenuItem>
                        )}
                        {moList.map(
                          (item, key) =>
                            (item.id !== moId ||
                              mode === MODAL_MODE.CREATE) && (
                              <MenuItem
                                key={key}
                                value={item.id}
                                data-name={item.name}
                              >
                                {t(item.name)}
                              </MenuItem>
                            ),
                        )}
                      </Select>
                      {/* add rule to validate */}
                      {/* {this.validator.message('moName', moId, `required`)} */}
                      {/* check isValid to show messages */}
                      {/* {isSubmitForm &&
                        !this.validator.check(moId, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )} */}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              {/** plan name */}
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
                      {t('definePlan.planName')}
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
              {/* sale order */}
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
                      {t('definePlan.saleOrder')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth size="small">
                      <TextField
                        name="saleOrderName"
                        id="saleOrderName"
                        margin="dense"
                        variant="outlined"
                        value={saleOrderName}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
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
                      {t('definePlan.planDate')}
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
                        isDisabled
                        onChangeFrom={(date) =>
                          onChangeDate(this, 'planFrom', date)
                        }
                        onChangeTo={(date) =>
                          onChangeDate(this, 'planTo', date)
                        }
                      />
                      {/* check isValid to show messages */}
                      {isSubmitForm &&
                        !this.validator.check(planFrom, `required`) &&
                        !this.validator.check(planFrom, `required`) && (
                          <FormHelperText error>
                            {t('form.required')}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6} md={6}>
                {/*Factory*/}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  mr={2}
                >
                  <Box width={0.3}>
                    <label className={classes.labelItem}>
                      {t('definePlan.moFactory')}
                    </label>
                  </Box>

                  <Box width={0.7} ml={2}>
                    <FormControl fullWidth>
                      <TextField
                        name="factoryName"
                        id="factoryName"
                        margin="dense"
                        variant="outlined"
                        value={factoryName}
                        disabled
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Box
                className={clsx(classes.marginAuto, classes.marginLabel)}
                width={8 / 8}
              >
                <Divider />
                {/** plan description */}
                <Box mt={2}>
                  <div className={clsx(classes.marginLabel)}>
                    <label className={classes.labelItem}>
                      {t('definePlan.descriptionInput')}
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
                  </FormControl>
                </Box>
              </Box>
              <TableCollapse
                rows={bomTree}
                pageSize={pageSize}
                page={page}
                columns={this.columns}
                collectData={this.collectData}
                additionColums={this.additionColums}
                producingStepColumns={this.producingStepColumns}
                handleChangeData={this.handleChangeData}
                isRoot={true}
                isView={isView}
                mode={mode}
                onPageChange={this.onPageChange}
                onPageSizeChange={this.onPageSizeChange}
                onChangeFilter={this.onChangeFilter}
                onChangeSort={this.onChangeSort}
                total={bomTree?.length}
                parent={this}
                parentPlanFrom={planFrom}
                parentPlanTo={planTo}
                bomChange={bomChange}
                parentRows={bomTree}
              />
              <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
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
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  userList: state.commonManagement.userList,
  definePlan: state.definePlan,
  moList: state.Mo.moList,
  moDetails: state.Mo.moDetails,
})

const mapDispatchToProps = {
  createPlan,
  getPlanDetailsById,
  confirmPlanById,
  updatePlan,
  getUsers,
  searchMO,
  getMODetailsById,
  getMoByPlanId,
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(DefinePlanForm)),
)
