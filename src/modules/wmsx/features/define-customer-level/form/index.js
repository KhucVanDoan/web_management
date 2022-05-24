import React, { useEffect, useMemo } from 'react'

import { createFilterOptions, Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useDefineCurrencyUnit from '~/modules/wmsx/redux/hooks/useDefineCurrencyUnit'
import useDefineCustomerLevel from '~/modules/wmsx/redux/hooks/useDefineCustomerLevel'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { defineCustomerLevelSchema } from './schema'

const DefineCustomerLevelForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const MODE_MAP = {
    [ROUTE.DEFINE_CUSTOMER_LEVEL.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_CUSTOMER_LEVEL.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const {
    data: { isLoading, customerLevelDetails },
    actions,
  } = useDefineCustomerLevel()

  const {
    data: { currencyUnitList },
    actions: currActions,
  } = useDefineCurrencyUnit()

  useEffect(() => {
    currActions.searchCurrencyUnits()
  }, [])

  const initialValues = useMemo(
    () => ({
      name: customerLevelDetails?.name || '',
      code: customerLevelDetails?.code || '',
      minJoinedDays: customerLevelDetails?.minJoinedDays || null,
      maxJoinedDays: customerLevelDetails?.maxJoinedDays || null,
      amountFrom: Number(customerLevelDetails?.amountFrom) || null,
      amountTo: Number(customerLevelDetails?.amountTo) || null,
      discount: Number(customerLevelDetails?.discount) || 0,
      currencyUnitId: customerLevelDetails?.currencyUnitId || null,
      description: customerLevelDetails?.description || '',
    }),
    [customerLevelDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.DEFINE_CUSTOMER_LEVEL.LIST.PATH,
        title: ROUTE.DEFINE_CUSTOMER_LEVEL.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_CUSTOMER_LEVEL.CREATE.PATH,
          title: ROUTE.DEFINE_CUSTOMER_LEVEL.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_CUSTOMER_LEVEL.EDIT.PATH,
          title: ROUTE.DEFINE_CUSTOMER_LEVEL.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getCustomerLevelDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetCustomerLevelDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_CUSTOMER_LEVEL.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_CUSTOMER_LEVEL.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_CUSTOMER_LEVEL.LIST.PATH)
  }

  const onSubmit = (values) => {
    const id = Number(params?.id)

    const convertValues = {
      ...values,
      id,
      customFields: [],
      minJoinedDays: Number(values?.minJoinedDays),
      maxJoinedDays: Number(values?.maxJoinedDays),
      discount: Number(values?.discount),
      amountFrom: Number(values?.amountFrom),
      amountTo: Number(values?.amountTo),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createCustomerLevel(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateCustomerLevel(convertValues, backToList)
    }
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

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={defineCustomerLevelSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('defineCustomerLevel.code')}
                      name="code"
                      placeholder={t('defineCustomerLevel.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineCustomerLevel.name')}
                      placeholder={t('defineCustomerLevel.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      {t('defineCustomerLevel.date')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="minJoinedDays"
                      label={t('defineCustomerLevel.minJoinedDays')}
                      placeholder={t('defineCustomerLevel.minJoinedDays')}
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="maxJoinedDays"
                      label={t('defineCustomerLevel.maxJoinedDays')}
                      placeholder={t('defineCustomerLevel.maxJoinedDays')}
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      {t('defineCustomerLevel.cost')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="amountFrom"
                      label={t('defineCustomerLevel.amountFrom')}
                      placeholder={t('defineCustomerLevel.amountFrom')}
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="amountTo"
                      label={t('defineCustomerLevel.amountTo')}
                      placeholder={t('defineCustomerLevel.amountTo')}
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="discount"
                      label={t('defineCustomerLevel.discount')}
                      placeholder={t('defineCustomerLevel.discount')}
                      type="number"
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="currencyUnitId"
                      label={t('defineCustomerLevel.unit')}
                      placeholder={t('defineCustomerLevel.unit')}
                      options={currencyUnitList}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name || opt?.code}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineCustomerLevel.description')}
                      placeholder={t('defineCustomerLevel.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineCustomerLevelForm
