import { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ACTION_MAP, PRIORITY_LEVEL_OPTIONS } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useDefect from '~/modules/mmsx/redux/hooks/useDefect'
import { searchDeviceListApi } from '~/modules/mmsx/redux/sagas/define-device/search-device-list'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

function DefectListForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { defectDetail, isLoading },
    actions,
  } = useDefect()

  const MODE_MAP = {
    [ROUTE.DEFECT_LIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFECT_LIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    code: defectDetail?.code || '',
    name: defectDetail?.name || '',
    description: defectDetail?.description || '',
    deviceId: defectDetail?.devices || null,
    priority: defectDetail?.priority || null,
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getDefect(id)
    }
    return () => actions.resetDefectState()
  }, [id])

  const handleSubmit = (val) => {
    const params = {
      ...val,
      deviceId: val?.deviceId?.id,
    }
    if (isUpdate) {
      actions.updateDefect({ ...params, id }, backToList)
    } else {
      actions.createDefect(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.SETTING.TITLE,
      },
      {
        route: ROUTE.DEFECT_LIST.LIST.PATH,
        title: ROUTE.DEFECT_LIST.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFECT_LIST.CREATE.PATH,
          title: ROUTE.DEFECT_LIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFECT_LIST.EDIT.PATH,
          title: ROUTE.DEFECT_LIST.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFECT_LIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFECT_LIST.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFECT_LIST.LIST.PATH)
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

  const histories = defectDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`defectList.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema(t)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleReset }) => (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('defectList.form.code')}
                        name="code"
                        placeholder={t('defectList.form.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        disabled={isUpdate}
                        required
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      />
                      <Field.TextField
                        label={t('defectList.form.name')}
                        name="name"
                        placeholder={t('defectList.form.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                        sx={{
                          mt: 4 / 3,
                        }}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        label={t('defectList.form.deviceName')}
                        name="deviceId"
                        placeholder={t('defectList.form.deviceName')}
                        asyncRequest={(s) =>
                          searchDeviceListApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        required
                      />
                      <Field.TextField
                        label={t('defectList.form.deviceCode')}
                        name="deviceId.code"
                        placeholder={t('defectList.form.deviceCode')}
                        disabled
                        sx={{
                          mt: 4 / 3,
                        }}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        label={t('defectList.form.priority')}
                        name="priority"
                        placeholder={t('defectList.form.priority')}
                        options={PRIORITY_LEVEL_OPTIONS}
                        getOptionLabel={(opt) => t(opt?.title)}
                        getOptionValue={(opt) => opt?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('defectList.form.description')}
                        placeholder={t('defectList.form.description')}
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
              {renderActionBar(handleReset)}
            </Form>
          )}
        </Formik>
      </Paper>
      {isUpdate && <Activities data={histories} />}
    </Page>
  )
}

export default DefectListForm
