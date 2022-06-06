import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { DEFINE_SERVICE_OPTIONS } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useDefineCurrencyUnit from '~/modules/wmsx/redux/hooks/useDefineCurrencyUnit'
import useDefineService from '~/modules/wmsx/redux/hooks/useDefineService'
import useDefineTypeUnit from '~/modules/wmsx/redux/hooks/useDefineTypeUnit'
import useVoucher from '~/modules/wmsx/redux/hooks/useVoucher'
import { ROUTE } from '~/modules/wmsx/routes/config'

import defineServiceSchema from './schema'

const DefineServiceForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.DEFINE_SERVICE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_SERVICE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { isLoading, serviceDetails },
    actions,
  } = useDefineService()

  const {
    data: { currencyUnitList },
    actions: currencyUnitActions,
  } = useDefineCurrencyUnit()

  const {
    data: { typeUnitsList },
    actions: typeUnitActions,
  } = useDefineTypeUnit()

  const {
    data: { voucherList },
    actions: voucherActions,
  } = useVoucher()

  const {
    data: { typeServiceList },
    actions: commonActions,
  } = useCommonManagement()

  const initialValues = {
    code: serviceDetails?.code || '',
    name: serviceDetails?.name || '',
    currencyUnitId: serviceDetails?.currencyUnitId || '',
    pricePerDay: serviceDetails?.pricePerDay || '',
    serviceTypeId: serviceDetails?.serviceTypeId || '',
    pricePerMonth: serviceDetails?.pricePerMonth || '',
    rentUnitId: serviceDetails?.rentUnitId || '',
    pricePerQuarter: serviceDetails?.pricePerQuarter || '',
    voucherId: serviceDetails?.voucherId || '',
    pricePerYear: serviceDetails?.pricePerYear || '',
    description: serviceDetails?.description || '',
  }

  useEffect(() => {
    currencyUnitActions.searchCurrencyUnits({ isGetAll: 1 })
    typeUnitActions.searchTypeUnits({ isGetAll: 1 })
    voucherActions.searchVoucher({ isGetAll: 1 })
    commonActions.getTypeServices({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getServiceDetailById(id)
    }
    return () => actions.resetServiceDetailState()
  }, [mode])

  const onSubmit = (values) => {
    const convertValue = { ...values, customFields: [] }
    if (mode === MODAL_MODE.CREATE) {
      actions.createService(convertValue, backToList)
    } else {
      actions.updateService({ ...convertValue, id: +id }, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.DEFINE_SERVICE.LIST.PATH,
        title: ROUTE.DEFINE_SERVICE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_SERVICE.CREATE.PATH,
          title: ROUTE.DEFINE_SERVICE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_SERVICE.EDIT.PATH,
          title: ROUTE.DEFINE_SERVICE.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_SERVICE.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DEFINE_SERVICE.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_SERVICE.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.DEFINE_SERVICE.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={defineServiceSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {!isNil(serviceDetails?.status) && isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>{t('defineService.status')}</Typography>
                        }
                        value={
                          <Status
                            options={DEFINE_SERVICE_OPTIONS}
                            value={serviceDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineService.code')}
                      name="code"
                      placeholder={t('defineService.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineService.name')}
                      name="name"
                      placeholder={t('defineService.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="currencyUnitId"
                      label={t('defineService.currencyUnit')}
                      placeholder={t('defineService.currencyUnit')}
                      options={currencyUnitList}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="pricePerDay"
                      label={t('defineService.pricePerDay')}
                      placeholder={t('defineService.pricePerDay')}
                      numberProps={{
                        thousandSeparator: true,
                        decimalScale: 3,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="serviceTypeId"
                      label={t('defineService.serviceType')}
                      placeholder={t('defineService.serviceType')}
                      options={typeServiceList}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="pricePerMonth"
                      label={t('defineService.pricePerMonth')}
                      placeholder={t('defineService.pricePerMonth')}
                      numberProps={{
                        thousandSeparator: true,
                        decimalScale: 3,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="rentUnitId"
                      label={t('defineService.rentUnit')}
                      placeholder={t('defineService.rentUnit')}
                      options={typeUnitsList}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="pricePerQuarter"
                      label={t('defineService.pricePerQuarter')}
                      placeholder={t('defineService.pricePerQuarter')}
                      numberProps={{
                        thousandSeparator: true,
                        decimalScale: 3,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="voucherId"
                      label={t('defineService.discountCode')}
                      placeholder={t('defineService.discountCode')}
                      options={voucherList}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="pricePerYear"
                      label={t('defineService.pricePerYear')}
                      placeholder={t('defineService.pricePerYear')}
                      numberProps={{
                        thousandSeparator: true,
                        decimalScale: 3,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineService.descriptionInput')}
                      placeholder={t('defineService.descriptionInput')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineServiceForm
