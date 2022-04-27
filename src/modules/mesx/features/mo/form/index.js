import React, { useState, useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import { MASTER_PLAN_STATUS } from '~/modules/mesx/constants'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import useItemType from '~/modules/mesx/redux/hooks/useItemType'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { getMasterPlanDetailsApi } from '~/modules/mesx/redux/sagas/define-master-plan/get-master-plan-details'
import { searchMasterPlansApi } from '~/modules/mesx/redux/sagas/define-master-plan/search-master-plans'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams } from '~/utils'
import qs from '~/utils/qs'

import BomProducingStepTable from './bom-producing-step-table'
import BomTable from './bom-table'
import ItemsSettingTable from './items-setting-table'
import PriceTable from './price-table'
import { validationSchema } from './schema'

const MOForm = () => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const { path } = useRouteMatch()
  const history = useHistory()
  const [mode, setMode] = useState(MODAL_MODE.CREATE)
  const location = useLocation()
  const urlSearchParams = qs.parse(location.search)

  const [saleOrders, setSaleOrders] = useState([])
  const [saleOrder, setSaleOrder] = useState({})
  const [moFactory, setMoFactory] = useState()
  const [dataPlan, setDataPlan] = useState()
  const masterPlanId = +urlSearchParams.masterPlanId
  const { cloneId } = urlSearchParams
  const [isSubmitForm] = useState(false)
  const MODE_MAP = {
    [ROUTE.MO.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MO.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { masterPlanDetails },
    actions: masterPlanActions,
  } = useDefineMasterPlan()
  const {
    data: { isLoading, moDetails, BOMStructure, PriceStructure },
    actions,
  } = useMo()

  const {
    data: { itemTypeList },
    actions: actionsItemType,
  } = useItemType()

  useEffect(() => {
    setMode(MODE_MAP[path?.replace(id, ':id')])
  }, [])

  useEffect(() => {
    if (isUpdate || cloneId) {
      const moId = id || cloneId
      actions.getMODetailsById(moId)
      actions.getBOMProducingStepStructureById(moId)
      actions.getPriceStructureById(moId)
      actionsItemType.searchItemTypes({ isGetAll: 1 })
    }

    return () => {
      actions.resetMoDetail()
      masterPlanActions.resetMasterPlanDetails()
    }
  }, [mode, cloneId])

  const backToList = () => {
    history.push(ROUTE.MO.LIST.PATH)
  }

  const getMasterDetail = () => {
    masterPlanActions.getMasterPlanDetailsById(
      moDetails?.masterPlan?.id,
      (data) => {
        setSaleOrders(data.saleOrderSchedules)
        const saleOrder = data.saleOrderSchedules.find(
          (so) => so.saleOrderId === moDetails?.saleOrderId,
        )
        setSaleOrder(saleOrder)
        setMoFactory(data?.factory?.name)
      },
    )
  }

  const getMasterCreate = () => {
    masterPlanActions.getMasterPlanDetailsById(masterPlanId, (data) => {
      setSaleOrders(data.saleOrderSchedules)
      const saleOrder = data.saleOrderSchedules.find(
        (so) => so.saleOrderId === moDetails?.saleOrderId,
      )
      setSaleOrder(saleOrder)
      setMoFactory(data?.factory?.name)
      setDataPlan(data)
    })
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              setSaleOrders(masterPlanDetails?.saleOrderSchedules)
              setSaleOrder({})
              setMoFactory(masterPlanDetails?.factory?.name)
            }}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              getMasterDetail()
            }}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.MO.LIST.PATH,
        title: ROUTE.MO.LIST.TITLE,
      },
    ]

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

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.MO.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MO.EDIT.TITLE
      default:
    }
  }

  useEffect(() => {
    if (isUpdate || cloneId) {
      getMasterDetail()
    }
  }, [moDetails?.masterPlan?.id])

  useEffect(() => {
    if (masterPlanId) {
      masterPlanActions.getMasterPlanDetailsById(masterPlanId)
    }
  }, [masterPlanId])

  useEffect(() => {
    if (mode === MODAL_MODE.CREATE && masterPlanId) {
      getMasterCreate()
    }
  }, [masterPlanId])

  const handleChangePlan = async (id, setFieldValue) => {
    setSaleOrder({})
    const res = await getMasterPlanDetailsApi(id)
    setSaleOrders(res?.data?.saleOrderSchedules)
    setFieldValue('moPlan', [res?.data?.dateFrom, res?.data?.dateTo])
    setMoFactory(res?.data?.factory?.name)
  }

  const handleChangeSaleOrder = (value) => {
    const saleOrder = saleOrders.find((so) => so.saleOrderId === value)
    setSaleOrder(saleOrder)
  }

  const initialValues = {
    code: isUpdate ? moDetails?.code : '',
    name: moDetails?.name || '',
    moPlan:
      isUpdate || cloneId
        ? [moDetails?.planFrom, moDetails?.planTo]
        : [dataPlan?.dateFrom, dataPlan?.dateTo],
    description: moDetails?.description || '',
    itemIds: [],
    // masterPlanId: moDetails?.masterPlan || null,
    masterPlanId:
      moDetails?.masterPlan ||
      (isEmpty(masterPlanDetails) ? null : masterPlanDetails) ||
      null,
    saleOrderId: moDetails?.saleOrderId || null,
    moFactory: '',
  }

  const handleSubmit = (values) => {
    const payload = {
      name: values?.name,
      code: values?.code,
      itemIds: values?.itemIds,
      description: values?.description,
      saleOrderId: values?.saleOrderId,
      masterPlanId: values?.masterPlanId?.id,
      planFrom: values?.moPlan ? values?.moPlan[0] : '',
      planTo: values?.moPlan ? values?.moPlan[1] : '',
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createMO(payload, () => {
        backToList()
      })
    } else if (isUpdate) {
      actions.updateMO({ id: Number(id), ...payload }, () => backToList())
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      isLoading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ handleReset, setFieldValue, errors, touched }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('Mo.moCode')}
                      placeholder={t('Mo.moCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="masterPlanId"
                      label={t('Mo.planName')}
                      placeholder={t('Mo.planName')}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      asyncRequest={(s) =>
                        searchMasterPlansApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            status: [
                              MASTER_PLAN_STATUS.CONFIRMED,
                              MASTER_PLAN_STATUS.IN_PROGRESS,
                            ].join(','),
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.masterPlans}
                      required
                      onChange={(val) => {
                        handleChangePlan(val?.id, setFieldValue)
                        setFieldValue('itemIds', [])
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('Mo.moName')}
                      placeholder={t('Mo.moName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <TextField
                      name="moFactory"
                      label={t('Mo.moFactory')}
                      placeholder={t('Mo.moFactory')}
                      disabled={true}
                      value={moFactory}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="moPlan"
                      label={t('Mo.moPlan')}
                      placeholder={t('definePlanBasis.moPlan')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="saleOrderId"
                      label={t('saleOrder.name')}
                      placeholder={t('saleOrder.name')}
                      options={saleOrders || []}
                      getOptionLabel={(option) => option?.saleOrderName || ''}
                      getOptionValue={(option) => option?.saleOrderId}
                      required
                      onChange={handleChangeSaleOrder}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('Mo.descriptionInput')}
                      placeholder={t('Mo.descriptionInput')}
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
            {mode === MODAL_MODE.CREATE ? (
              <Box sx={{ mt: 3 }}>
                <ItemsSettingTable
                  saleOrder={saleOrder}
                  isSubmitForm={isSubmitForm}
                  updateSelectedItems={(itemIds) =>
                    setFieldValue('itemIds', itemIds)
                  }
                />
              </Box>
            ) : (
              <Box sx={{ mt: 3 }}>
                <Tabs
                  list={[
                    t('Mo.itemDetails'),
                    t('Mo.bom'),
                    t('Mo.bomProducingStep'),
                    t('Mo.priceBom'),
                  ]}
                >
                  <ItemsSettingTable
                    saleOrder={saleOrder}
                    isSubmitForm={isSubmitForm}
                    updateSelectedItems={(itemIds) =>
                      setFieldValue('itemIds', itemIds)
                    }
                    isUpdate={isUpdate}
                    moDetails={moDetails}
                    errors={errors}
                    touched={touched}
                  />
                  <BomTable
                    BOMStructure={BOMStructure}
                    itemTypeList={itemTypeList}
                  />
                  <BomProducingStepTable
                    BOMStructure={BOMStructure}
                    itemTypeList={itemTypeList}
                  />
                  <PriceTable
                    PriceStructure={PriceStructure}
                    itemTypeList={itemTypeList}
                  />
                </Tabs>
              </Box>
            )}

            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default MOForm
