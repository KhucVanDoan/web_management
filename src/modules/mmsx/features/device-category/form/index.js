import React, { useEffect } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTION_MAP,
  DEVICE_CATEGORY_STATUS_OPTION,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useDeviceCategory from '~/modules/mmsx/redux/hooks/useDeviceCategory'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateShema } from './schema'

const DeviceCategoryForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { deviceCategoryDetail, isLoading },
    actions,
  } = useDeviceCategory()

  const {
    data: { responsibleSubject },
    actions: CommonAction,
  } = useCommonInfo()
  const MODE_MAP = {
    [ROUTE.DEVICE_CATEGORY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEVICE_CATEGORY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.DEVICE_CATEGORY.LIST.PATH)
  }

  const initialValues = {
    code: deviceCategoryDetail?.code || '',
    name: deviceCategoryDetail?.name || '',
    responsibleUser: deviceCategoryDetail?.responsibleUser?.id,
    description: deviceCategoryDetail?.description || '',
  }

  useEffect(() => {
    actions.getDeviceCategoryDetail(id)
    return () => {
      actions.resetDeviceCategory()
    }
  }, [mode])
  useEffect(() => {
    CommonAction.getResponsibleSubject()
  }, [])
  const handleSubmit = (values) => {
    if (isUpdate) {
      const params = {
        id: id,
        body: {
          id: id,
          code: values?.code.trim(),
          name: values?.name ? values.name.trim() : '',
          description: values?.description ? values?.description.trim() : '',
          responsibleUser: {
            id: values?.responsibleUser?.id,
            type: values?.responsibleUser?.type,
          },
        },
      }
      actions.updateDetailDeviceCategory(params, backToList)
    } else {
      const params = {
        code: values?.code.trim(),
        name: values?.name ? values?.name.trim() : '',
        description: values?.description ? values?.description.trim() : '',
        responsibleUser: {
          id: values?.responsibleUser?.id,
          type: values?.responsibleUser?.type,
        },
      }
      actions.createDeviceCategory(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEVICE_CATEGORY.LIST.PATH,
        title: ROUTE.DEVICE_CATEGORY.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_CATEGORY.CREATE.PATH,
          title: ROUTE.DEVICE_CATEGORY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_CATEGORY.EDIT.PATH,
          title: ROUTE.DEVICE_CATEGORY.EDIT.TITLE,
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
        return ROUTE.DEVICE_CATEGORY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEVICE_CATEGORY.EDIT.TITLE
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
  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('deviceCategory.button.device')}
          </Button>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('deviceCategory.button.job')}
          </Button>
        </Box>
      </>
    )
  }
  const histories = deviceCategoryDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`deviceCategory.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    id: item?.userId,
    username: item?.username,
  }))
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
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
                                  {t('deviceCategory.form.status')}
                                </Typography>
                              }
                              value={
                                <Status
                                  options={DEVICE_CATEGORY_STATUS_OPTION}
                                  value={deviceCategoryDetail?.status}
                                />
                              }
                            />
                          </Grid>
                        )}
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('deviceCategory.form.field.code')}
                            name="code"
                            placeholder={t('deviceCategory.form.field.code')}
                            disabled={mode === MODAL_MODE.UPDATE}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
                            }}
                            allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            label={t('deviceCategory.form.field.name')}
                            name="name"
                            placeholder={t('deviceCategory.form.field.name')}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                            }}
                            required
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field.TextField
                            name="description"
                            label={t('deviceCategory.form.field.description')}
                            placeholder={t(
                              'deviceCategory.form.field.description',
                            )}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                            }}
                            multiline
                            rows={3}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field.Autocomplete
                            name="responsibleUser"
                            label={t('deviceCategory.responsibleUser')}
                            placeholder={t('deviceCategory.responsibleUser')}
                            options={responsibleSubject?.responsibleUsers}
                            getOptionLabel={(opt) => opt?.username}
                            getOptionValue={(opt) => ({
                              id: opt?.id,
                              type: opt?.type,
                            })}
                          />
                        </Grid>
                      </Grid>
                      {renderActionBar(handleReset)}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
      {isUpdate && <Activities data={histories} />}
    </Page>
  )
}

export default DeviceCategoryForm
