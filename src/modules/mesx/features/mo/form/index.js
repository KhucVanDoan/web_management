import React, { useState, useEffect } from 'react'

import { Grid, Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import { MO_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import useItemType from '~/modules/mesx/redux/hooks/useItemType'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc, redirectRouter } from '~/utils'

import BomProducingStepTable from './bom-producing-step-table'
import BomTable from './bom-table'
import ItemsSettingTable from './items-setting-table'
import PriceTable from './price-table'
import { validationSchema } from './schema'

const MOForm = () => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const { path } = useRouteMatch()
  const [mode, setMode] = useState(MODAL_MODE.CREATE)
  const [saleOrders, setSaleOrders] = useState([])
  const [saleOrder, setSaleOrder] = useState({})
  const [isSubmitForm] = useState(false)
  const MODE_MAP = {
    [ROUTE.MO.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MO.DETAIL.PATH]: MODAL_MODE.DETAIL,
    [ROUTE.MO.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isView = mode === MODAL_MODE.DETAIL

  const {
    data: { masterPlanList },
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
    masterPlanActions.searchMasterPlans()
  }, [])

  useEffect(() => {
    if (isUpdate || isView) {
      actions.getMODetailsById(id)
      actions.getBOMProducingStepStructureById(id)
      actions.getPriceStructureById(id)
      actionsItemType.searchItemTypes({ isGetAll: 1 })
    }
    return () => {
      actions.resetMoDetail()
    }
  }, [mode])

  const backToList = () => {
    redirectRouter(ROUTE.MO.LIST.PATH)
  }

  const renderActionBar = (resetForm) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={resetForm}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={resetForm}
            mode={MODAL_MODE.UPDATE}
          />
        )
      case MODAL_MODE.DETAIL:
        return <ActionBar onBack={backToList} />
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
      case MODAL_MODE.DETAIL:
        return ROUTE.MO.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MO.EDIT.TITLE
      default:
    }
  }

  const handleChangePlan = (value, setFieldValue) => {
    masterPlanActions.getMasterPlanDetailsById(value, (response) => {
      setSaleOrders(response.saleOrderSchedules)
      setFieldValue('moPlan', [response.dateFrom, response.dateTo])
      setFieldValue('moFactory', response.factory?.name)
    })
  }

  const handleChangeSaleOrder = (value) => {
    const saleOrder = saleOrders.find((so) => so.saleOrderId === value)
    setSaleOrder(saleOrder)
  }

  const initialValues = {
    code: moDetails?.code || '',
    name: moDetails?.name || '',
    moPlan: [moDetails?.planFrom, moDetails?.planTo] || null,
    description: moDetails?.description || '',
    itemIds: [],
    masterPlanId: moDetails?.materialPlan?.name || null,
    moFactory: moDetails?.factory?.name || '',
    saleOrderId: moDetails?.saleOrder?.name || null,
  }

  const handleSubmit = (values) => {
    const payload = {
      ...values,
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
        {({ resetForm, setFieldValue }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isView && !isNil(moDetails?.status) && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={t('defineBOM.status')}
                        value={
                          <Status
                            options={MO_STATUS_OPTIONS}
                            value={moDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}

                  <Grid item lg={6} xs={12}>
                    {isView ? (
                      <LabelValue
                        label={t('Mo.moCode')}
                        value={moDetails?.code}
                      />
                    ) : (
                      <Field.TextField
                        name="code"
                        label={t('Mo.moCode')}
                        placeholder={t('Mo.moCode')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                        }}
                        disabled={isUpdate}
                        required
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isView ? (
                      <LabelValue
                        label={t('Mo.planName')}
                        value={moDetails?.materialPlan?.name}
                      />
                    ) : (
                      <Field.Autocomplete
                        name="masterPlanId"
                        label={t('Mo.planName')}
                        placeholder={t('Mo.planName')}
                        options={masterPlanList || []}
                        getOptionLabel={(option) => option?.name || ''}
                        getOptionValue={(option) => option?.id}
                        required
                        onChange={(value) =>
                          handleChangePlan(value, setFieldValue)
                        }
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isView ? (
                      <LabelValue
                        label={t('Mo.moName')}
                        value={moDetails?.name}
                      />
                    ) : (
                      <Field.TextField
                        name="name"
                        label={t('Mo.moName')}
                        placeholder={t('Mo.moName')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        disabled={isUpdate}
                        required
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isView ? (
                      <LabelValue
                        label={t('Mo.moFactory')}
                        value={moDetails?.factory?.name}
                      />
                    ) : (
                      <Field.TextField
                        name="moFactory"
                        label={t('Mo.moFactory')}
                        placeholder={t('Mo.moFactory')}
                        disabled={true}
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isView ? (
                      <LabelValue label={t('Mo.moPlan')}>
                        {formatDateTimeUtc(moDetails?.planFrom)} -{' '}
                        {formatDateTimeUtc(moDetails?.planTo)}
                      </LabelValue>
                    ) : (
                      <Field.DateRangePicker
                        name="moPlan"
                        label={t('Mo.moPlan')}
                        placeholder={t('definePlanBasis.moPlan')}
                        required
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {isView ? (
                      <LabelValue
                        label={t('saleOrder.name')}
                        value={moDetails?.saleOrder?.name}
                      />
                    ) : (
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
                    )}
                  </Grid>
                  {isView && (
                    <Grid item lg={6} xs={12}>
                      <LabelValue
                        label={t('Mo.creator')}
                        value={moDetails?.createdByUser?.fullName}
                      />
                    </Grid>
                  )}
                  {isView && (
                    <Grid item lg={6} xs={12}>
                      <LabelValue
                        label={t('Mo.createAt')}
                        value={formatDateTimeUtc(moDetails?.createdAt)}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {isView ? (
                      <TextField
                        name="description"
                        label={t('Mo.descriptionInput')}
                        multiline
                        value={moDetails?.description}
                        rows={3}
                        readOnly
                        sx={{
                          'label.MuiFormLabel-root': {
                            color: (theme) => theme.palette.subText.main,
                          },
                        }}
                      />
                    ) : (
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
                    )}
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
                  isView={isView}
                  isUpdate={isUpdate}
                  moDetails={moDetails}
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
            )}
            {renderActionBar(resetForm)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default MOForm
