import React, { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'
import { searchWarehousesApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouses'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { inventoryCalendarSchema } from './schema'

const InventoryCalendarForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, inventoryCalendarDetails },
    actions,
  } = useInventoryCalendar()

  const initialValues = useMemo(
    () => ({
      code: inventoryCalendarDetails?.code || '',
      name: inventoryCalendarDetails?.name || '',
      warehouses: inventoryCalendarDetails?.warehouses || [],
      executionDay: inventoryCalendarDetails?.executionDay || null,
      description: inventoryCalendarDetails?.description || '',
    }),
    [inventoryCalendarDetails],
  )

  const MODE_MAP = {
    [ROUTE.INVENTORY_CALENDAR.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.INVENTORY_CALENDAR.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'orderManagement',
      },
      {
        route: ROUTE.INVENTORY_CALENDAR.LIST.PATH,
        title: ROUTE.INVENTORY_CALENDAR.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.INVENTORY_CALENDAR.CREATE.PATH,
          title: ROUTE.INVENTORY_CALENDAR.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.INVENTORY_CALENDAR.EDIT.PATH,
          title: ROUTE.INVENTORY_CALENDAR.EDIT.TITLE,
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
      actions.getInventoryCalendarDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetInventoryCalendarDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.INVENTORY_CALENDAR.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.INVENTORY_CALENDAR.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.INVENTORY_CALENDAR.LIST.PATH)
  }

  const onSubmit = (values) => {
    const id = Number(params?.id)

    const convertValues = {
      ...values,
      id,
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createInventoryCalendar(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateInventoryCalendar(convertValues, backToList)
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
            validationSchema={inventoryCalendarSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('inventoryCalendar.code')}
                      name="code"
                      placeholder={t('inventoryCalendar.code')}
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
                      label={t('inventoryCalendar.name')}
                      placeholder={t('inventoryCalendar.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouses"
                      label={t('inventoryCalendar.warehouses')}
                      placeholder={t('inventoryCalendar.warehouses')}
                      options={inventoryCalendarDetails?.warehouses}
                      asyncRequest={(s) =>
                        searchWarehousesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionDisabled={(opt) =>
                        values?.warehouses?.some((i) => i?.id === opt?.id)
                      }
                      getOptionLabel={(opt) => opt?.name}
                      multiple
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DatePicker
                      name="executionDay"
                      label={t('inventoryCalendar.executionDay')}
                      placeholder={t('inventoryCalendar.executionDay')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('inventoryCalendar.description')}
                      placeholder={t('inventoryCalendar.description')}
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

export default InventoryCalendarForm
