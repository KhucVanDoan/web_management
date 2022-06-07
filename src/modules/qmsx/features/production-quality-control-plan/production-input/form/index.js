import React, { useEffect, useState } from 'react'

import { Grid, Hidden, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik'
import { isNil, isEmpty, cloneDeep } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  NOTIFICATION_TYPE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import {
  PRODUCTION_QC_PLAN_STATUS_OPTIONS,
  STAGE_OPTION,
  PRODUCTION_QC_PLAN_STATUS,
  STAGES,
} from '~/modules/qmsx/constants'
import useProductionQualityControlPlan from '~/modules/qmsx/redux/hooks/useProductionQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils/date-time'
import addNotification from '~/utils/toast'

import MaterialPlanDetailTable from '../material-plan-detail-table'
import PreviousPlanDetailTable from '../previous-plan-detail-table'
import { productionInputQualityControlPlanSchema } from './schema'

const ENDPOINT_PATCH_GET_DETAIL_PRODUCTION_INPUT = 'production-step-input'
const ENDPOINT_PATCH_GET_DETAIL_MO_PLAN_INPUT = 'mo-plan-input'

function ProductionInputQualityControlPlanForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { productionQcPlanDetail, isLoading, inputMoList },
    actions,
  } = useProductionQualityControlPlan()
  const [productionPlanList, setProductionPlanList] = useState([])
  const [formPreviousInitDetail, setFormPrevious] = useState({})
  const [formMaterialInitDetail, setFormMaterial] = useState({})
  const initialValues = {
    status: null,
    code: '',
    name: '',
    stageQc: STAGE_OPTION.PRODUCTION_INPUT,
    mo: null,
    productionPlan: null,
    description: '',
    items: [],
    formPrevious: {},
    formMaterial: {},
  }
  const [initialValuesForm, setInitialValuesForm] = useState(initialValues)
  const [saveInitLoadDetail, setSaveInitLoadDetail] = useState({})

  const MODE_MAP = {
    [ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_INPUT.PATH]:
      MODAL_MODE.CREATE,
    [ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_INPUT.PATH]:
      MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const TAB_PRODUCT_QC_PLAN_LIST = [
    {
      label: t('productionQualityControlPlan.tabs.productPrevious'),
    },
    {
      label: t('productionQualityControlPlan.tabs.material'),
    },
  ]

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH,
        title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route:
            ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_INPUT.PATH,
          title:
            ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_INPUT.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route:
            ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_INPUT.PATH,
          title:
            ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_INPUT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    actions.getInputMo()
    if (mode === MODAL_MODE.UPDATE) {
      const paramsGetdetail = {
        id: params?.id,
        endpointPatch: ENDPOINT_PATCH_GET_DETAIL_PRODUCTION_INPUT,
      }
      actions.getProductionQcPlanDetailById(
        paramsGetdetail,
        (data) => {
          if (+data.status !== PRODUCTION_QC_PLAN_STATUS_OPTIONS.PENDING)
            return backToList()
          getProductionPlan(data?.mo?.id)
          getFormPreviousData(data?.planBomPrevious)
          getFormMaterialData(data?.planBomMaterials)
        },
        backToList,
      )
    }
    return () => {
      if (isUpdate) actions.resetProductionQcPlanDetailState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.CREATE_PRODUCTION_INPUT
          .TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.EDIT_PRODUCTION_INPUT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH)
  }

  const onSubmit = (values) => {
    let moPlanBomsTransform = []
    //Transform data: Với bảng "Sản phẩm công đoạn trước"
    Object.values(values?.formPrevious).forEach((v) => {
      moPlanBomsTransform.push({
        id: v?.id || undefined,
        //bonus data for BE
        type: v?.type,
        bomId: v?.bomId,
        routingId: v?.routingId,
        producingStepId: v?.producingStepId,
        itemId: v?.itemId,
        workOrderId: v?.workOrderId,
        qualityPointId: v?.qualityPointId,
        keyBomTree: v?.keyBomTree,
        planningQuantity: v?.planningQuantity,
        actualQuantityProducingStep: v?.actualQuantityProducingStep,
        //field was edited on table data
        planErrorRate: +v?.planErrorRate,
        planQcQuantity: +v?.planQcQuantity,
        qualityPlanBomQualityPointUser1s: v?.userQc1st?.map((x) => ({
          userId: x,
        })),
        qualityPlanBomQualityPointUser2s: v?.userQc2nd?.map((x) => ({
          userId: x,
        })),
        planFrom: v?.productionQcPlanDate
          ? v?.productionQcPlanDate[0]
          : undefined,
        planTo: v?.productionQcPlanDate
          ? v?.productionQcPlanDate[1]
          : undefined,
      })
    })
    //Transform data: Với bảng "Nguyên vật liệu"
    Object.keys(values?.formMaterial).forEach((k1) => {
      let arrayObj = []
      Object.keys(values?.formMaterial[k1]).forEach((k2) => {
        if (
          k2 !== 'userQc1st' &&
          k2 !== 'userQc2nd' &&
          k2 !== 'materialLength' &&
          k2 !== 'numberOfTime'
        ) {
          const obj = {
            ...cloneDeep(values?.formMaterial[k1][k2]),
            ...(values?.formMaterial[k1].userQc1st
              ? {
                  qualityPlanBomQualityPointUser1s: [
                    ...values?.formMaterial[k1].userQc1st,
                  ],
                }
              : null),
            ...(values?.formMaterial[k1].userQc2nd
              ? {
                  qualityPlanBomQualityPointUser2s: [
                    ...values?.formMaterial[k1].userQc2nd,
                  ],
                }
              : null),
          }
          if (!isEmpty(obj.qualityPlanBomQualityPointUser1s)) {
            obj.qualityPlanBomQualityPointUser1s =
              obj?.qualityPlanBomQualityPointUser1s.map((x) => ({ userId: x }))
          }
          if (!isEmpty(obj.qualityPlanBomQualityPointUser2s)) {
            obj.qualityPlanBomQualityPointUser2s =
              obj?.qualityPlanBomQualityPointUser2s.map((x) => ({ userId: x }))
          }
          if (!isEmpty(obj.productionQcPlanDate)) {
            obj.planFrom = obj?.productionQcPlanDate[0]
            obj.planTo = obj?.productionQcPlanDate[1]
          }
          if (!isEmpty(obj.planErrorRate)) {
            obj.planErrorRate = +obj?.planErrorRate
          }
          arrayObj.push(obj)
        }
      })
      moPlanBomsTransform.push(...arrayObj)
    })
    //Form data submit for BE
    const transformData = {
      code: values?.code,
      name: values?.name,
      description: values?.description,
      qcStageId: values?.stageQc,
      moId: values?.mo,
      moPlanId: values?.productionPlan,
      moPlanBoms: moPlanBomsTransform,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createProductionQcPlan(transformData, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...transformData,
        id,
      }
      actions.updateProductionQcPlan(paramUpdate, backToList)
    }
  }

  const renderActionButtons = ({ handleReset, validateForm }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button
              onClick={() => {
                setInitialValuesForm(initialValues)
                handleReset()
              }}
              variant="outlined"
              color="subText"
              sx={(theme) => ({
                border: `1px solid ${theme.palette.subText.a3} !important`,
              })}
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button
              type="submit"
              onClick={() => {
                validateForm().then((res) => {
                  if (!isEmpty(res?.formPrevious)) {
                    addNotification(
                      'qmsx:productionQualityControlPlan.notification.tablePreviousDetailIsNotValid',
                      NOTIFICATION_TYPE.ERROR,
                    )
                  } else if (!isEmpty(res?.formMaterial)) {
                    addNotification(
                      'qmsx:productionQualityControlPlan.notification.tableMaterialDetailIsNotValid',
                      NOTIFICATION_TYPE.ERROR,
                    )
                  }
                })
              }}
              icon="save"
            >
              {t('general:actionBar.create')}
            </Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button
              onClick={() => {
                setInitialValuesForm(saveInitLoadDetail)
                handleReset()
              }}
              variant="outlined"
              color="subText"
              sx={(theme) => ({
                border: `1px solid ${theme.palette.subText.a3} !important`,
              })}
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button
              type="submit"
              icon="save"
              onClick={() => {
                validateForm().then((res) => {
                  if (!isEmpty(res?.formPrevious)) {
                    addNotification(
                      'qmsx:productionQualityControlPlan.notification.tablePreviousDetailIsNotValid',
                      NOTIFICATION_TYPE.ERROR,
                    )
                  } else if (!isEmpty(res?.formMaterial)) {
                    addNotification(
                      'qmsx:productionQualityControlPlan.notification.tableMaterialDetailIsNotValid',
                      NOTIFICATION_TYPE.ERROR,
                    )
                  }
                })
              }}
            >
              {t('general:actionBar.save')}
            </Button>
          </>
        )
      default:
        break
    }
  }

  //Transform data lấy về từ api xem chi tiết, ra dạng form data để submit: bảng sản phẩm công đoạn trước
  const getFormPreviousData = (data) => {
    data?.forEach((rowItem) => {
      rowItem?.planBom?.producingSteps?.forEach((rowProducingStep) => {
        if (rowProducingStep?.isQc) {
          setFormPrevious((prevState) => ({
            ...prevState,
            [`${rowProducingStep?.keyBomTree}-${rowProducingStep?.producingStep?.id}`]:
              {
                id:
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.id ||
                  undefined,
                type: rowProducingStep?.type,
                bomId: rowProducingStep?.bomId,
                routingId: rowProducingStep?.routingId,
                producingStepId: rowProducingStep?.producingStep?.id,
                itemId: rowProducingStep?.itemId,
                workOrderId: !isEmpty(rowProducingStep?.workOrders)
                  ? rowProducingStep?.workOrders[0]?.id
                  : null,
                qualityPointId:
                  rowProducingStep?.producingStep?.qualityPoint?.id,
                numberOfTime:
                  rowProducingStep?.producingStep?.qualityPoint?.numberOfTime,
                formalityRate:
                  rowProducingStep?.producingStep?.qualityPoint?.formalityRate,
                keyBomTree: rowProducingStep?.keyBomTree,
                planningQuantity: rowProducingStep?.planningQuantity,
                actualQuantityProducingStep:
                  rowProducingStep?.actualQuantityProducingStep,
                //form-edit
                planErrorRate:
                  +rowProducingStep?.producingStep?.qualityPlanBom[0]
                    ?.planErrorRate,
                planQcQuantity:
                  +rowProducingStep?.producingStep?.qualityPlanBom[0]
                    ?.planQcQuantity,
                userQc1st:
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser1s?.map(
                    (x) => x?.userId,
                  ),
                userQc2nd:
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser2s?.map(
                    (x) => x?.userId,
                  ),
                productionQcPlanDate: [
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.planFrom,
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.planTo,
                ],
              },
          }))
        }
      })
      if (rowItem?.subBom.length > 0) {
        getFormPreviousData(rowItem?.subBom)
      }
    })
  }

  //Transform data lấy về từ api xem chi tiết, ra dạng form data để submit: bảng nguyên vật liệu
  const getFormMaterialData = (data) => {
    data?.forEach((rowItem) => {
      rowItem?.planBom?.producingSteps?.forEach((rowProducingStep) => {
        if (rowProducingStep?.isQc) {
          const obj = {}
          rowProducingStep?.producingStep?.qualityPlanBom?.forEach(
            (rowMaterial) => {
              obj[`_${rowMaterial.itemMaterialId}`] = {
                id: rowMaterial?.id,
                itemMaterialId: rowMaterial?.itemMaterialId,
                planErrorRate: +rowMaterial?.planErrorRate,
                planQcQuantity: +rowMaterial?.planQcQuantity,
                productionQcPlanDate: [
                  rowMaterial?.planFrom,
                  rowMaterial?.planTo,
                ],
                type: rowProducingStep?.type,
                bomId: rowProducingStep?.bomId,
                routingId: rowProducingStep?.routingId,
                producingStepId: rowProducingStep?.producingStep?.id,
                itemId: rowProducingStep?.itemId,
                workOrderId: !isEmpty(rowProducingStep?.workOrders)
                  ? rowProducingStep?.workOrders[0]?.id
                  : null,
                qualityPointId:
                  rowProducingStep?.producingStep?.qualityPoint?.id,
                keyBomTree: rowProducingStep?.keyBomTree,
                planningQuantity: rowProducingStep?.planningQuantity,
              }
            },
          )
          setFormMaterial((prevState) => ({
            ...prevState,
            [`${rowProducingStep?.keyBomTree}-${rowProducingStep?.producingStep?.id}`]:
              {
                userQc1st:
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser1s?.map(
                    (x) => x?.userId,
                  ),
                userQc2nd:
                  rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser2s?.map(
                    (x) => x?.userId,
                  ),
                numberOfTime:
                  rowProducingStep?.producingStep?.qualityPoint?.numberOfTime,
                materialLength: rowProducingStep?.materials?.length,
                ...obj,
              },
          }))
        }
      })
      if (rowItem?.subBom.length > 0) {
        getFormMaterialData(rowItem?.subBom)
      }
    })
  }

  //Initial-data: Tạo data khởi tạo cho bảng kế hoạch chi tiết "Sản phẩm công đoạn trước"
  const convertFormPreviousData = (data) => {
    let result = {}
    data?.forEach((rowItem) => {
      rowItem?.planBom?.producingSteps?.forEach((rowProducingStep) => {
        if (rowProducingStep?.isQc) {
          result[
            `${rowProducingStep?.keyBomTree}-${rowProducingStep?.producingStep?.id}`
          ] = {
            id:
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.id ||
              undefined,
            type: rowProducingStep?.type,
            bomId: rowProducingStep?.bomId,
            routingId: rowProducingStep?.routingId,
            producingStepId: rowProducingStep?.producingStep?.id,
            itemId: rowProducingStep?.itemId,
            workOrderId: !isEmpty(rowProducingStep?.workOrders)
              ? rowProducingStep?.workOrders[0]?.id
              : null,
            qualityPointId: rowProducingStep?.producingStep?.qualityPoint?.id,
            numberOfTime:
              rowProducingStep?.producingStep?.qualityPoint?.numberOfTime,
            formalityRate:
              rowProducingStep?.producingStep?.qualityPoint?.formalityRate,
            keyBomTree: rowProducingStep?.keyBomTree,
            planningQuantity: rowProducingStep?.planningQuantity,
            actualQuantityProducingStep:
              rowProducingStep?.actualQuantityProducingStep,
            //form-edit
            planErrorRate:
              +rowProducingStep?.producingStep?.qualityPlanBom[0]
                ?.planErrorRate || null,
            planQcQuantity:
              +rowProducingStep?.producingStep?.qualityPlanBom[0]
                ?.planQcQuantity || null,
            userQc1st: rowProducingStep?.producingStep?.qualityPlanBom[0]
              ?.qualityPlanBomQualityPointUser1s
              ? rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser1s?.map(
                  (x) => x?.userId,
                )
              : [],
            userQc2nd: rowProducingStep?.producingStep?.qualityPlanBom[0]
              ?.qualityPlanBomQualityPointUser2s
              ? rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser2s?.map(
                  (x) => x?.userId,
                )
              : [],
            productionQcPlanDate: [
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.planFrom ||
                null,
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.planTo ||
                null,
            ],
          }
        }
      })
      if (rowItem?.subBom.length > 0) {
        result = {
          ...result,
          ...convertFormPreviousData(rowItem?.subBom),
        }
      }
    })
    return result
  }

  //Initial-data: Tạo data khởi tạo cho bảng kế hoạch chi tiết "Nguyên vật liệu"
  const convertFormMaterialData = (data) => {
    let result = {}
    data?.forEach((rowItem) => {
      rowItem?.planBom?.producingSteps?.forEach((rowProducingStep) => {
        if (rowProducingStep?.isQc) {
          let obj = {}
          if (!isEmpty(rowProducingStep?.producingStep?.qualityPlanBom)) {
            rowProducingStep?.producingStep?.qualityPlanBom?.forEach(
              (rowMaterial) => {
                obj[`_${rowMaterial.itemMaterialId}`] = {
                  id: rowMaterial?.id,
                  itemMaterialId: rowMaterial?.itemMaterialId,
                  type: rowProducingStep?.type,
                  bomId: rowProducingStep?.bomId,
                  routingId: rowProducingStep?.routingId,
                  producingStepId: rowProducingStep?.producingStep?.id,
                  itemId: rowProducingStep?.itemId,
                  workOrderId: !isEmpty(rowProducingStep?.workOrders)
                    ? rowProducingStep?.workOrders[0]?.id
                    : null,
                  qualityPointId:
                    rowProducingStep?.producingStep?.qualityPoint?.id,
                  numberOfTime:
                    rowProducingStep?.producingStep?.qualityPoint?.numberOfTime,
                  formalityRate:
                    rowProducingStep?.producingStep?.qualityPoint
                      ?.formalityRate,
                  keyBomTree: rowProducingStep?.keyBomTree,
                  planningQuantity: rowProducingStep?.planningQuantity,
                  planErrorRate: +rowMaterial?.planErrorRate,
                  planQcQuantity: +rowMaterial?.planQcQuantity,
                  productionQcPlanDate: [
                    rowMaterial?.planFrom,
                    rowMaterial?.planTo,
                  ],
                }
              },
            )
          } else {
            rowProducingStep?.materials.forEach((material) => {
              obj[`_${material.itemMaterialId}`] = {
                itemMaterialId: material?.itemMaterialId,
                type: rowProducingStep?.type,
                bomId: rowProducingStep?.bomId,
                routingId: rowProducingStep?.routingId,
                producingStepId: rowProducingStep?.producingStep?.id,
                itemId: rowProducingStep?.itemId,
                workOrderId: !isEmpty(rowProducingStep?.workOrders)
                  ? rowProducingStep?.workOrders[0]?.id
                  : null,
                qualityPointId:
                  rowProducingStep?.producingStep?.qualityPoint?.id,
                numberOfTime:
                  rowProducingStep?.producingStep?.qualityPoint?.numberOfTime,
                formalityRate:
                  rowProducingStep?.producingStep?.qualityPoint?.formalityRate,
                keyBomTree: rowProducingStep?.keyBomTree,
                planningQuantity: rowProducingStep?.planningQuantity,
                planErrorRate: null,
                planQcQuantity: null,
                productionQcPlanDate: [null, null],
              }
            })
          }

          result[
            `${rowProducingStep?.keyBomTree}-${rowProducingStep?.producingStep?.id}`
          ] = {
            userQc1st:
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser1s?.map(
                (x) => x?.userId,
              ) || [],
            userQc2nd:
              rowProducingStep?.producingStep?.qualityPlanBom[0]?.qualityPlanBomQualityPointUser2s?.map(
                (x) => x?.userId,
              ) || [],
            numberOfTime:
              rowProducingStep?.producingStep?.qualityPoint?.numberOfTime,
            materialLength: rowProducingStep?.materials?.length,
            ...obj,
          }
        }
      })
      if (rowItem?.subBom.length > 0) {
        result = {
          ...result,
          ...convertFormMaterialData(rowItem?.subBom),
        }
      }
    })
    return result
  }

  //Setting initial data cho Formmik khi mode = UPDATE
  useEffect(() => {
    if (!isEmpty(productionQcPlanDetail)) {
      const initDetail = {
        status: productionQcPlanDetail?.status,
        code: productionQcPlanDetail?.code,
        name: productionQcPlanDetail?.name,
        stageQc: productionQcPlanDetail?.qcStageId,
        mo: productionQcPlanDetail?.mo?.id,
        moName: productionQcPlanDetail?.mo?.name,
        moPlanDate: !isEmpty(productionQcPlanDetail?.mo)
          ? `${convertUtcDateToLocalTz(
              productionQcPlanDetail?.mo?.planFrom,
            )} - ${convertUtcDateToLocalTz(
              productionQcPlanDetail?.mo?.planTo,
            )} `
          : null,
        productionPlan: productionQcPlanDetail?.moPlan?.id,
        description: productionQcPlanDetail?.description,
        planBomPrevious: productionQcPlanDetail?.planBomPrevious,
        planBomMaterials: productionQcPlanDetail?.planBomMaterials,
        formPrevious: formPreviousInitDetail,
        formMaterial: formMaterialInitDetail,
      }
      setSaveInitLoadDetail(initDetail)
      setInitialValuesForm(initDetail)
    }
  }, [productionQcPlanDetail, formPreviousInitDetail, formMaterialInitDetail])

  //Handle onChange Autocomplete
  const onChangeMo = (moId, setFieldValue) => {
    if (!isNil(moId)) {
      const recordMo = inputMoList.find((x) => x.id === moId)
      setFieldValue('moName', recordMo?.name)
      setFieldValue(
        'moPlanDate',
        `${convertUtcDateToLocalTz(
          recordMo?.planFrom,
        )} - ${convertUtcDateToLocalTz(recordMo?.planTo)} `,
      )
      getProductionPlan(moId, setFieldValue)
    } else {
      // setProductionPlanList([])
      setFieldValue('moName', null) //"Tên lệnh sản xuất"
      setFieldValue('moPlanDate', null) //"Ngày kế hoạch của lệnh sản xuất"
      setFieldValue('productionPlan', null) //"Bảng kế hoạch chi tiết"
    }
    setFieldValue('planBomPrevious', [])
    setFieldValue('planBomMaterials', [])
    setFieldValue('formPrevious', {})
    setFieldValue('formMaterial', {})
  }

  const onChangeProductionPlan = (productionPlanId, setFieldValue, values) => {
    if (!isNil(productionPlanId)) {
      getProductionPlanDetail(productionPlanId, values)
    }
    setFieldValue('planBomPrevious', [])
    setFieldValue('planBomMaterials', [])
    setFieldValue('formPrevious', {})
    setFieldValue('formMaterial', {})
  }

  //Get data production-plan when onChange "Lệnh sản xuất(Mo)"
  const getProductionPlan = (moId) => {
    const params = {
      moId,
    }
    actions.getProductionPlanByMoId(params, (data) => {
      setProductionPlanList(data)
    })
  }

  //Get data production-plan-detail(Bảng) when onChange "Mã kế hoạch sản xuất"
  const getProductionPlanDetail = (productionPlanId, values) => {
    const params = {
      id: productionPlanId,
      endpointPatch: ENDPOINT_PATCH_GET_DETAIL_MO_PLAN_INPUT,
    }

    actions.getProductionPlanDetail(params, (data) => {
      setInitialValuesForm({
        ...values,
        productionPlan: productionPlanId,
        formPrevious: convertFormPreviousData(data?.planBomPrevious),
        planBomPrevious: data?.planBomPrevious,
        formMaterial: convertFormMaterialData(data?.planBomMaterials),
        planBomMaterials: data?.planBomMaterials,
      })
    })
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValuesForm}
        validationSchema={productionInputQualityControlPlanSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
        validateOnMount
      >
        {({ handleReset, setFieldValue, values, validateForm }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>
                            {t('productionQualityControlPlan.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={PRODUCTION_QC_PLAN_STATUS}
                            value={values?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('productionQualityControlPlan.code')}
                      placeholder={t('productionQualityControlPlan.code')}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('productionQualityControlPlan.name')}
                      placeholder={t('productionQualityControlPlan.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="stageQc"
                      label={t('productionQualityControlPlan.stageQc')}
                      disabled
                      options={STAGES || []}
                      getOptionValue={(option) => option?.value}
                      getOptionLabel={(option) => t(option?.text)}
                    />
                  </Grid>
                  <Hidden lgDown>
                    <Grid item lg={6} xs={12}></Grid>
                  </Hidden>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="mo"
                      label={t('productionQualityControlPlan.moCode')}
                      placeholder={t('productionQualityControlPlan.moCode')}
                      required
                      options={inputMoList || []}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.code}
                      onChange={(value) => onChangeMo(value, setFieldValue)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="moName"
                      label={t('productionQualityControlPlan.moName')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="moPlanDate"
                      label={t('productionQualityControlPlan.moPlanDate')}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="productionPlan"
                      label={t(
                        'productionQualityControlPlan.productionPlanCode',
                      )}
                      placeholder={t(
                        'productionQualityControlPlan.productionPlanCode',
                      )}
                      required
                      options={productionPlanList || []}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) => option?.code}
                      onChange={(value) =>
                        onChangeProductionPlan(value, setFieldValue, values)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('productionQualityControlPlan.description')}
                      placeholder={t(
                        'productionQualityControlPlan.description',
                      )}
                      multiline
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Tabs list={TAB_PRODUCT_QC_PLAN_LIST} sx={{ mt: 3 }}>
              <Box>
                <PreviousPlanDetailTable
                  planBomPrevious={values?.planBomPrevious}
                  mode={mode}
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </Box>
              <Box>
                <MaterialPlanDetailTable
                  planBomMaterials={values?.planBomMaterials}
                  mode={mode}
                  setFieldValue={setFieldValue}
                  values={values}
                />
              </Box>
            </Tabs>
            <ActionBar
              onBack={backToList}
              elAfter={renderActionButtons({ handleReset, validateForm })}
            />
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default ProductionInputQualityControlPlanForm
