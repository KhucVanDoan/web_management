import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useCompanyManagement from '~/modules/wmsx/redux/hooks/useCompanyManagement'
import useSourceManagement from '~/modules/wmsx/redux/hooks/useSourceManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validateShema } from './schema'

const SourceManagementForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { detailSourceManagement, isLoading },
    actions,
  } = useSourceManagement()

  const {
    data: { companyList },
    actions: companyAction,
  } = useCompanyManagement()
  const MODE_MAP = {
    [ROUTE.SOURCE_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SOURCE_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.SOURCE_MANAGEMENT.LIST.PATH)
  }

  useEffect(() => {
    companyAction.searchCompanies()
  }, [])
  const initialValues = useMemo(
    () => ({
      code: detailSourceManagement?.code || '',
      name: detailSourceManagement?.name || '',
      description: detailSourceManagement?.description || '',
      effectiveDate: !isEmpty(detailSourceManagement)
        ? [detailSourceManagement?.dateFrom, detailSourceManagement?.dateTo]
        : '',
      accountIdentifier: detailSourceManagement?.accountIdentifier || '',
      companyId: detailSourceManagement?.company || '',
      produceTypeCode: detailSourceManagement?.produceTypeCode || '0000',
      branchCode: detailSourceManagement?.branchCode || '000000',
      productCode: detailSourceManagement?.productCode || '0000',
      costCenterCode: detailSourceManagement?.costCenterCode || '000',
      factorialCode: detailSourceManagement?.factorialCode || '000',
      accountant: detailSourceManagement?.accountant || '',
      internalDepartmentCode:
        detailSourceManagement?.internalDepartmentCode || '000000',
      departmentBackupCode:
        detailSourceManagement?.departmentBackupCode || '0000',
      EVNBackupCode: detailSourceManagement?.EVNBackupCode || '0000',
    }),
    [detailSourceManagement],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getDetailSourceManagementById(id)
    }
    return () => {
      actions?.resetSourceManagementState()
    }
  }, [id])

  const handleSubmit = (values) => {
    const params = {
      code: values?.code.trim(),
      name: values?.name?.trim(),
      dateFrom: values?.effectiveDate[0],
      dateTo: values?.effectiveDate[1],
      createdFrom: '0',
      produceTypeCode: values?.produceTypeCode || '0000',
      branchCode: values?.branchCode || '000000',
      productCode: values?.productCode || '0000',
      costCenterCode: values?.costCenterCode || '000',
      factorialCode: values?.factorialCode || '000',
      accountant: values?.accountant || '',
      internalDepartmentCode: values?.internalDepartmentCode || '000000',
      departmentBackupCode: values?.departmentBackupCode || '0000',
      EVNBackupCode: values?.EVNBackupCode || '0000',
      companyId: values?.companyId?.id,
      description: values?.description,
    }
    if (isUpdate) {
      actions.updateSourceManagement({ ...params, id: id }, backToList)
    } else {
      actions.createSourceManagement(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.SOURCE_MANAGEMENT.LIST.PATH,
        title: ROUTE.SOURCE_MANAGEMENT.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SOURCE_MANAGEMENT.CREATE.PATH,
          title: ROUTE.SOURCE_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SOURCE_MANAGEMENT.EDIT.PATH,
          title: ROUTE.SOURCE_MANAGEMENT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.SOURCE_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SOURCE_MANAGEMENT.EDIT.TITLE
      default:
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
  const getCodeAcount = (values) => {
    const companyId = values?.companyId?.code || ''
    const branchCode = values?.branchCode || ''
    const costCenterCode = values?.costCenterCode || ''
    const accountant = values?.accountant || ''
    const produceTypeCode = values?.produceTypeCode || ''
    const productCode = values?.productCode || ''
    const factorialCode = values?.factorialCode || ''
    const internalDepartmentCode = values?.internalDepartmentCode || ''
    const departmentBackupCode = values?.departmentBackupCode || ''
    const EVNBackupCode = values?.EVNBackupCode || ''

    return `${companyId ? `${companyId}` : ''}${
      branchCode ? `.${branchCode}` : ''
    }${costCenterCode ? `.${costCenterCode}` : ''}${
      accountant ? `.${accountant}` : ''
    }${produceTypeCode ? `.${produceTypeCode}` : ''}${
      productCode ? `.${productCode}` : ''
    }${factorialCode ? `.${factorialCode}` : ''}${
      internalDepartmentCode ? `.${internalDepartmentCode}` : ''
    }${departmentBackupCode ? `.${departmentBackupCode}` : ''}${
      EVNBackupCode ? `.${EVNBackupCode}` : ''
    }`
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
        validationSchema={validateShema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>
                            {t('sourceManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={detailSourceManagement?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.code')}
                      name="code"
                      placeholder={t('sourceManagement.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.name')}
                      name="name"
                      placeholder={t('sourceManagement.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_100.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.accountIdentifier')}
                      name="accountIdentifier"
                      placeholder={t('sourceManagement.accountIdentifier')}
                      value={getCodeAcount(values)}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DateRangePicker
                      name="effectiveDate"
                      label={t('sourceManagement.effectiveDate')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" component="span">
                      {t('sourceManagement.accountDetail')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="companyId"
                      label={t('sourceManagement.companyId')}
                      placeholder={t('sourceManagement.companyId')}
                      options={companyList}
                      getOptionLabel={(opt) => `${opt?.code}-${opt?.name}`}
                      getOptionValue={(opt) => opt}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.produceTypeCode')}
                      name="produceTypeCode"
                      placeholder={t('sourceManagement.produceTypeCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.branchCode')}
                      name="branchCode"
                      placeholder={t('sourceManagement.branchCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_6.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.productCode')}
                      name="productCode"
                      placeholder={t('sourceManagement.productCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.costCenterCode')}
                      name="costCenterCode"
                      placeholder={t('sourceManagement.costCenterCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_3.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.factorialCode')}
                      name="factorialCode"
                      placeholder={t('sourceManagement.factorialCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_3.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.accountant')}
                      name="accountant"
                      placeholder={t('sourceManagement.accountant')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.internalDepartmentCode')}
                      name="internalDepartmentCode"
                      placeholder={t('sourceManagement.internalDepartmentCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_6.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.departmentBackupCode')}
                      name="departmentBackupCode"
                      placeholder={t('sourceManagement.departmentBackupCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>{' '}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('sourceManagement.EVNBackupCode')}
                      name="EVNBackupCode"
                      placeholder={t('sourceManagement.EVNBackupCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('sourceManagement.description')}
                      placeholder={t('sourceManagement.descriptionPlaceholder')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default SourceManagementForm
