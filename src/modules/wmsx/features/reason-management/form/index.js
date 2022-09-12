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
import useReasonManagement from '~/modules/wmsx/redux/hooks/useReasonManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { validateShema } from './schema'

const ReasonManagementForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { detailReasonManagement, isLoading },
    actions,
  } = useReasonManagement()

  const MODE_MAP = {
    [ROUTE.REASON_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.REASON_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.REASON_MANAGEMENT.LIST.PATH)
  }

  useEffect(() => {}, [])
  const initialValues = {
    code: detailReasonManagement?.code || '',
    name: detailReasonManagement?.name || '',
    description: detailReasonManagement?.description || '',
  }
  useEffect(() => {
    if (isUpdate) {
      actions.getDetailReasonManagementById(id)
    }
    return () => {
      actions?.resetReasonManagementState()
    }
  }, [id])

  const handleSubmit = (values) => {
    const params = {
      code: values?.code.trim(),
      name: values?.name?.trim(),
      description: values?.description,
    }
    if (isUpdate) {
      actions.updateReasonManagement({ ...params, id: id }, backToList)
    } else {
      actions.createReasonManagement(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.REASON_MANAGEMENT.LIST.PATH,
        title: ROUTE.REASON_MANAGEMENT.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.REASON_MANAGEMENT.CREATE.PATH,
          title: ROUTE.REASON_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.REASON_MANAGEMENT.EDIT.PATH,
          title: ROUTE.REASON_MANAGEMENT.EDIT.TITLE,
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
        return ROUTE.REASON_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.REASON_MANAGEMENT.EDIT.TITLE
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
                          <Typography>
                            {t('reasonManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={detailReasonManagement?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('reasonManagement.code')}
                      name="code"
                      placeholder={t('reasonManagement.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('reasonManagement.name')}
                      name="name"
                      placeholder={t('reasonManagement.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('reasonManagement.description')}
                      placeholder={t('reasonManagement.description')}
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

export default ReasonManagementForm
