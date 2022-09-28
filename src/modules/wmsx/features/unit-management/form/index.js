import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
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
import useManagementUnit from '~/modules/wmsx/redux/hooks/useManagementUnit'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validateShema } from './schema'

const ManagementUnitForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { detailManagementUnit, isLoading },
    actions,
  } = useManagementUnit()

  const MODE_MAP = {
    [ROUTE.UNIT_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.UNIT_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.UNIT_MANAGEMENT.LIST.PATH)
  }

  useEffect(() => {}, [])
  const initialValues = {
    code: detailManagementUnit?.code || '',
    name: detailManagementUnit?.name || '',
    description: detailManagementUnit?.description || '',
  }
  useEffect(() => {
    if (isUpdate) {
      actions.getDetailManagementUnitById(id)
    }
    return () => {
      actions?.resetManagementUnitState()
    }
  }, [id])

  const handleSubmit = (values) => {
    const params = {
      code: values?.code.trim(),
      name: values?.name?.trim(),
      description: values?.description,
    }
    if (isUpdate) {
      actions.updateManagementUnit({ ...params, id: id }, backToList)
    } else {
      actions.createManagementUnit(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.UNIT_MANAGEMENT.LIST.PATH,
        title: ROUTE.UNIT_MANAGEMENT.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.UNIT_MANAGEMENT.CREATE.PATH,
          title: ROUTE.UNIT_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.UNIT_MANAGEMENT.EDIT.PATH,
          title: ROUTE.UNIT_MANAGEMENT.EDIT.TITLE,
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
        return ROUTE.UNIT_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.UNIT_MANAGEMENT.EDIT.TITLE
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
        {({ handleReset }) => (
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
                          <Typography>{t('managementUnit.status')}</Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={detailManagementUnit?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('managementUnit.code')}
                      name="code"
                      placeholder={t('managementUnit.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_9.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('managementUnit.name')}
                      name="name"
                      placeholder={t('managementUnit.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('managementUnit.description')}
                      placeholder={t('managementUnit.description')}
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

export default ManagementUnitForm
