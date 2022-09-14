import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useLocationManagement from '~/modules/wmsx/redux/hooks/useLocationManagement'
import { searchCompaniesApi } from '~/modules/wmsx/redux/sagas/company-management/search-companies'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { formSchema } from './schema'

function LocationManagementForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, locationDetails },
    actions,
  } = useLocationManagement()

  const MODE_MAP = {
    [ROUTE.LOCATION_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.LOCATION_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: locationDetails?.code || '',
      warehouse: locationDetails?.warehouse || null,
      assembly: locationDetails?.assembly || null,
      drawer: locationDetails?.drawer || null,
      shelf: locationDetails?.shelf || null,
      bin: locationDetails?.bin || null,
      description: locationDetails?.description || '',
    }),
    [locationDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.LOCATION_MANAGEMENT.LIST.PATH,
        title: ROUTE.LOCATION_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.LOCATION_MANAGEMENT.CREATE.PATH,
          title: ROUTE.LOCATION_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.LOCATION_MANAGEMENT.EDIT.PATH,
          title: ROUTE.LOCATION_MANAGEMENT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getLocationDetailsById(id)
    }
    return () => {
      actions.resetLocationDetailsState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.LOCATION_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.LOCATION_MANAGEMENT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.LOCATION_MANAGEMENT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      warehouseId: values?.warehouse?.id,
      assemblyId: values?.assembly?.id,
      drawerId: values?.drawer?.id,
      shelfId: values?.shelf?.id,
      binId: values?.bin?.id,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createLocation(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateLocation({ ...convertValues, id: Number(id) }, backToList)
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

  const getCodeValue = (values) => {
    const assemblyCode = values?.assembly?.code || ''
    const drawerCode = values?.drawer?.code || ''
    const shelfCode = values?.shelf?.code || ''
    const binCode = values?.bin?.code || ''

    return `${assemblyCode}${drawerCode ? `-${drawerCode}` : ''}${
      shelfCode ? `-${shelfCode}` : ''
    }${binCode ? `-${binCode}` : ''}`
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
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
                            {t('locationManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={locationDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('locationManagement.code')}
                      placeholder={t('locationManagement.code')}
                      value={getCodeValue(values)}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="warehouse"
                      label={t('locationManagement.warehouseCode')}
                      placeholder={t('locationManagement.warehouseCode')}
                      asyncRequest={(s) =>
                        //@TODO update api
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('locationManagement.description')}
                      placeholder={t('locationManagement.description')}
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

            <Grid
              container
              sx={(theme) => ({
                justifyContent: 'center',
                bgcolor: 'grayF4.main',
                borderRadius: 1,
                my: 2,
                pt: 1,
                pb: 2,

                [theme.breakpoints.down('xl')]: {
                  px: 2,
                },
              })}
            >
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="assembly"
                      label={t('locationManagement.assemblyCode')}
                      placeholder={t('locationManagement.assemblyCode')}
                      asyncRequest={(s) =>
                        //@TODO update api
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="drawer"
                      label={t('locationManagement.drawerCode')}
                      placeholder={t('locationManagement.drawerCode')}
                      asyncRequest={(s) =>
                        //@TODO update api
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="shelf"
                      label={t('locationManagement.shelfCode')}
                      placeholder={t('locationManagement.shelfCode')}
                      asyncRequest={(s) =>
                        //@TODO update api
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="bin"
                      label={t('locationManagement.binCode')}
                      placeholder={t('locationManagement.binCode')}
                      asyncRequest={(s) =>
                        //@TODO update api
                        searchCompaniesApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
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

export default LocationManagementForm