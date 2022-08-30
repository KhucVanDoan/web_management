import React, { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

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
import {
  ACTIVE_STATUS_OPTIONS,
  PARENT_BUSINESS_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import useBusinessTypeManagement from '~/modules/wmsx/redux/hooks/useBusinessTypeManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { defineSchema } from './schema'

const DEFAULT_ITEM = {
  id: '',
  fieldName: '',
  code: '',
  type: '',
  columnName: '',
  tableName: '',
  required: true,
  show: true,
}

function BusinessTypeManagementForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, businessTypeDetails },
    actions,
  } = useBusinessTypeManagement()

  const MODE_MAP = {
    [ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: businessTypeDetails?.code || '',
      name: businessTypeDetails?.name || '',
      parentBusiness: businessTypeDetails?.parentBusiness || '',
      description: businessTypeDetails?.description || '',
      items: businessTypeDetails?.bussinessTypeAttributes?.map((item) => ({
        ...item,
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [businessTypeDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.PATH,
        title: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.PATH,
          title: ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.PATH,
          title: ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getBusinessTypeDetailsById(id)
    }
    return () => {
      actions.resetBusinessTypeDetailsState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.BUSINESS_TYPE_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.BUSINESS_TYPE_MANAGEMENT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      bussinessTypeAttributes: values.items.map((item) => ({ ...item })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createBusinessType(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...convertValues,
        id: +id,
      }
      actions.updateBusinessType(paramUpdate, backToList)
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
            validationSchema={defineSchema(t)}
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
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>
                            {t('businessTypeManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={businessTypeDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('businessTypeManagement.code')}
                      placeholder={t('businessTypeManagement.code')}
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
                      label={t('businessTypeManagement.name')}
                      placeholder={t('businessTypeManagement.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="parentBusiness"
                      label={t('businessTypeManagement.parentBusiness')}
                      placeholder={t('businessTypeManagement.parentBusiness')}
                      options={PARENT_BUSINESS_TYPE_OPTIONS}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('businessTypeManagement.description')}
                      placeholder={t('businessTypeManagement.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemsSettingTable
                        items={values?.items || []}
                        arrayHelpers={arrayHelpers}
                        mode={mode}
                      />
                    )}
                  />
                </Box>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default BusinessTypeManagementForm
