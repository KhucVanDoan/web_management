import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
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
  RECEIPT_DEPARTMENT_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import useReceiptDepartmentManagement from '~/modules/wmsx/redux/hooks/useReceiptDepartmentManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { defineSchema } from './schema'

function ReceiptDepartmentManagementForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, receiptDepartmentDetails },
    actions,
  } = useReceiptDepartmentManagement()

  const MODE_MAP = {
    [ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: receiptDepartmentDetails?.code || '',
      name: receiptDepartmentDetails?.name || '',
      departmentType: receiptDepartmentDetails?.departmentType || '',
      description: receiptDepartmentDetails?.description || '',
    }),
    [receiptDepartmentDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.PATH,
        title: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.PATH,
          title: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.PATH,
          title: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getReceiptDepartmentDetailsById(id)
    }
    return () => {
      actions.resetReceiptDepartmentDetailsState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      departmentType: +values.departmentType,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createReceiptDepartment(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...convertValues,
        id: +id,
      }
      actions.updateReceiptDepartment(paramUpdate, backToList)
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
            {({ handleReset }) => (
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
                            {t('receiptDepartmentManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={receiptDepartmentDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('receiptDepartmentManagement.code')}
                      placeholder={t('receiptDepartmentManagement.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('receiptDepartmentManagement.name')}
                      placeholder={t('receiptDepartmentManagement.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="departmentType"
                      label={t('receiptDepartmentManagement.departmentType')}
                      placeholder={t(
                        'receiptDepartmentManagement.departmentType',
                      )}
                      options={RECEIPT_DEPARTMENT_TYPE_OPTIONS}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('receiptDepartmentManagement.description')}
                      placeholder={t('receiptDepartmentManagement.description')}
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

export default ReceiptDepartmentManagementForm
