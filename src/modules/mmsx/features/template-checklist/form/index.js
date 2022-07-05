import React, { useEffect } from 'react'

import { createFilterOptions, Grid, Paper } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ACTION_MAP, CHECK_TYPE_OPTIONS } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import useTemplateChecklist from '~/modules/mmsx/redux/hooks/useTemplateChecklist'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validateShema } from './schema'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  title: '',
  descriptionDetail: '',
  obligatory: false,
}

const TemplateChecklistForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { templateChecklistDetail, isLoading },
    actions,
  } = useTemplateChecklist()

  const {
    data: { deviceList },
    actions: deviceActs,
  } = useDefineDevice()

  const MODE_MAP = {
    [ROUTE.TEMPLATE_CHECKLIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.TEMPLATE_CHECKLIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.TEMPLATE_CHECKLIST.LIST.PATH)
  }

  const initialValues = {
    code: templateChecklistDetail?.code || '',
    name: templateChecklistDetail?.name || '',
    deviceName: templateChecklistDetail?.devices || '',
    checkType: templateChecklistDetail?.checkType,
    description: templateChecklistDetail?.description || '',
    items: templateChecklistDetail?.details?.map((detail, index) => ({
      id: index,
      title: detail.title,
      descriptionDetail: detail.description,
      obligatory: detail.obligatory === 1 ? true : false,
    })) || [{ ...DEFAULT_ITEM }],
  }

  useEffect(() => {
    deviceActs.searchDevice()
  }, [])

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getTemplateCheckList(id)
    }
    return () => {
      if (isUpdate) actions.resetTemplateChecklist()
    }
  }, [id])

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      id,
      deviceId: values.deviceName?.id,
      details: values.items.map((item) => ({
        title: item.title,
        description: item.descriptionDetail,
        obligatory: item.obligatory === true ? 1 : 0,
      })),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createTemplateChecklist(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateTemplateChecklist(convertValues, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.TEMPLATE_CHECKLIST.LIST.PATH,
        title: ROUTE.TEMPLATE_CHECKLIST.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.TEMPLATE_CHECKLIST.CREATE.PATH,
          title: ROUTE.TEMPLATE_CHECKLIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.TEMPLATE_CHECKLIST.EDIT.PATH,
          title: ROUTE.TEMPLATE_CHECKLIST.EDIT.TITLE,
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
        return ROUTE.TEMPLATE_CHECKLIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.TEMPLATE_CHECKLIST.EDIT.TITLE
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

  const histories = templateChecklistDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`templateChecklist.actionHistory.${ACTION_MAP[item?.action]}`)
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
              {({ handleReset, values }) => (
                <Form>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('templateChecklist.form.code')}
                        name="code"
                        placeholder={t('templateChecklist.form.code')}
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
                        label={t('templateChecklist.form.name')}
                        name="name"
                        placeholder={t('templateChecklist.form.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="deviceName"
                        label={t('templateChecklist.form.deviceName')}
                        placeholder={t('templateChecklist.form.deviceName')}
                        options={deviceList}
                        getOptionLabel={(opt) => opt?.name}
                        filterOptions={createFilterOptions({
                          stringify: (opt) => `${opt?.code}|${opt?.name}`,
                        })}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="deviceName.code"
                        label={t('templateChecklist.form.deviceCode')}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="checkType"
                        label={t('templateChecklist.form.checkType')}
                        placeholder={t('templateChecklist.form.checkType')}
                        options={CHECK_TYPE_OPTIONS}
                        getOptionLabel={(opt) =>
                          opt?.text ? t(opt?.text) : ''
                        }
                        getOptionValue={(opt) => opt?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('templateChecklist.form.description')}
                        placeholder={t('templateChecklist.form.description')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>
                  {renderActionBar(handleReset)}
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

export default TemplateChecklistForm
