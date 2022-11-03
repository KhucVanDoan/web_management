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
import Tabs from '~/components/Tabs'
import {
  ACTIVE_STATUS_OPTIONS,
  BUSINESS_TYPE_REQUIRED,
  DATA_TYPE_OPTIONS,
  DEFAULT_FIELD_LIST_WAREHOUSE_EXPORT,
  DEFAULT_FIELD_LIST_WAREHOUSE_IMPORT,
  DEFAULT_FIELD_LIST_WAREHOUSE_TRANSFER,
  PARENT_BUSINESS_TYPE,
  PARENT_BUSINESS_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import useBusinessTypeManagement from '~/modules/wmsx/redux/hooks/useBusinessTypeManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import DefaultFieldList from './default-field-list'
import ItemsSettingTable from './option-field-list/index'
import { defineSchema } from './schema'

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
      parentBusiness: businessTypeDetails?.parentBussiness,
      description: businessTypeDetails?.description || '',
      itemOption:
        businessTypeDetails?.bussinessTypeAttributes
          ?.filter((e) => e?.code === null)
          ?.map((item) => ({
            id: item?.id,
            labelEBS: item?.ebsLabel,
            fieldName: item?.fieldName,
            required: Boolean(item?.required),
            type: {
              id: item?.type,
              text: DATA_TYPE_OPTIONS.find((e) => e?.id === item?.type)?.text,
              type: DATA_TYPE_OPTIONS.find((e) => e?.id === item?.type)?.type,
              tableName: DATA_TYPE_OPTIONS.find((e) => e?.id === item?.type)
                ?.tableName,
              code: DATA_TYPE_OPTIONS.find((e) => e?.id === item?.type)?.code,
            },
          })) || [],
      itemDefault:
        businessTypeDetails?.bussinessTypeAttributes
          ?.filter((e) => e?.code !== null)
          ?.map((item) => ({
            id: item?.id,
            labelEBS: item?.ebsLabel,
            fieldName: item?.fieldName,
            required: Boolean(item?.required),
            show: true,
            type: '',
            code: item?.code,
            columnName: item?.columnName,
            tableName: item?.tableName,
          })) || [],
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
    const parmas = {
      code: values?.code,
      name: values?.name,
      parentBussiness: Number(values?.parentBusiness),
      description: values?.description || null,
      bussinessTypeAttributes: [
        ...values?.itemDefault
          ?.filter((e) => e?.show === true)
          ?.map((item) => ({
            fieldName: t(`${item?.fieldName}`),
            type: 1,
            ebsLabel: item?.labelEBS,
            columnName: item?.columnName,
            tableName: item?.tableName,
            code: item?.code,
            required: item?.required
              ? BUSINESS_TYPE_REQUIRED.REQUIRED
              : BUSINESS_TYPE_REQUIRED.NO_REQUIRED,
          })),
        ...values?.itemOption?.map((item) => ({
          fieldName: item?.fieldName,
          type: item.type?.type,
          ebsLabel: item?.labelEBS,
          columnName: item?.type?.code ? item?.type?.code : null,
          tableName: item?.type?.tableName ? item?.type?.tableName : null,
          required: item?.required
            ? BUSINESS_TYPE_REQUIRED.REQUIRED
            : BUSINESS_TYPE_REQUIRED.NO_REQUIRED,
        })),
      ],
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createBusinessType(parmas, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...parmas,
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
  const handleChangeParentBusiness = (val, setFieldValue) => {
    if (val === PARENT_BUSINESS_TYPE.EXPORT) {
      setFieldValue('itemDefault', DEFAULT_FIELD_LIST_WAREHOUSE_EXPORT)
    } else if (val === PARENT_BUSINESS_TYPE.IMPORT) {
      setFieldValue('itemDefault', DEFAULT_FIELD_LIST_WAREHOUSE_IMPORT)
    } else if (val === PARENT_BUSINESS_TYPE.TRANSFER) {
      setFieldValue('itemDefault', DEFAULT_FIELD_LIST_WAREHOUSE_TRANSFER)
    } else {
      setFieldValue('itemDefault', [])
      setFieldValue('itemOption', [])
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
            {({ handleReset, values, setFieldValue }) => {
              return (
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
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
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
                        getOptionLabel={(opt) =>
                          opt?.text ? t(opt?.text) : ''
                        }
                        getOptionValue={(opt) => opt?.id}
                        onChange={(val) =>
                          handleChangeParentBusiness(val, setFieldValue)
                        }
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

                  <Tabs
                    list={[
                      {
                        label: t('businessTypeManagement.defaultFieldList'),
                      },
                      {
                        label: t('businessTypeManagement.optionFieldList'),
                      },
                    ]}
                    sx={{ mt: 3 }}
                  >
                    {/* Tab 1 */}
                    <Box sx={{ mt: 3 }}>
                      <FieldArray
                        name="itemDefault"
                        render={(arrayHelpers) => (
                          <DefaultFieldList
                            itemDefault={values?.itemDefault || []}
                            arrayHelpers={arrayHelpers}
                            mode={mode}
                            setFieldValue={setFieldValue}
                            values={values}
                          />
                        )}
                      />
                    </Box>

                    {/* Tab 2 */}
                    <Box sx={{ mt: 3 }}>
                      <FieldArray
                        name="itemOption"
                        render={(arrayHelpers) => (
                          <ItemsSettingTable
                            itemOption={values?.itemOption || []}
                            arrayHelpers={arrayHelpers}
                            mode={mode}
                          />
                        )}
                      />
                    </Box>
                  </Tabs>

                  {renderActionBar(handleReset)}
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default BusinessTypeManagementForm
