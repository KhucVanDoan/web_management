import React, { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTION_MAP,
  DEVICE_RETURN_TICKET_STATUS_OPTION,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validateShema } from './schema'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  itemId: '',
}

const ReturnDeviceForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { isLoading, returnDeviceDetail },
    actions,
  } = useRequestDevice()

  const MODE_MAP = {
    [ROUTE.REQUEST_DEVICE.RETURN_CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.REQUEST_DEVICE.LIST.PATH)
  }

  const initialValues = {
    name: returnDeviceDetail?.name || '',
    description: returnDeviceDetail?.description || '',
    items: returnDeviceDetail?.deviceAssignments?.map((item) => ({
      ...item,
      itemId: item?.id,
    })) || [{ ...DEFAULT_ITEM }],
  }

  useEffect(() => {
    if (id) {
      actions.getReturnDeviceDetail(id)
    }
    return () => {
      actions.resetStateReturnRequestDevice()
    }
  }, [mode])

  const handleSubmit = (values) => {
    const params = {
      name: values?.name ? values?.name.trim() : '',
      description: values?.description ? values?.description.trim() : '',
      deviceAssignmentIds: values?.items.map((item) => item?.itemId),
    }
    if (isUpdate) {
      actions.updateReturnDeviceDetail({ ...params, id: id }, backToList)
    } else {
      actions.createReturnDevice(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.REQUEST_DEVICE.LIST.PATH,
        title: ROUTE.REQUEST_DEVICE.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.REQUEST_DEVICE.RETURN_CREATE.PATH,
          title: ROUTE.REQUEST_DEVICE.RETURN_CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH,
          title: ROUTE.REQUEST_DEVICE.RETURN_EDIT.TITLE,
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
        return ROUTE.REQUEST_DEVICE.RETURN_CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.REQUEST_DEVICE.RETURN_EDIT.TITLE
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
          <Button
            variant="outlined"
            sx={{ ml: 4 / 3 }}
            onClick={() => history.push(ROUTE.DEVICE_LIST.LIST.PATH)}
          >
            {t('requestDevice.buttonTitle.device')}
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 4 / 3 }}
            onClick={() => history.push(ROUTE.DEVICE_ASSIGN.LIST.PATH)}
          >
            {t('requestDevice.buttonTitle.assignment')}
          </Button>
        </Box>
      </>
    )
  }

  const histories = returnDeviceDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`requestDevice.comment.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
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
              {({ handleReset, values }) => (
                <Form>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LabelValue
                          label={t('requestDevice.category.status')}
                          value={
                            <Status
                              options={DEVICE_RETURN_TICKET_STATUS_OPTION}
                              value={returnDeviceDetail?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestDevice.form.field.name')}
                        name="name"
                        placeholder={t('requestDevice.form.field.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('requestDevice.form.field.description')}
                        placeholder={t('requestDevice.form.field.description')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemsSettingTable
                          items={values?.items || []}
                          mode={mode}
                          arrayHelpers={arrayHelpers}
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
      </Paper>
      {isUpdate && <Activities data={histories} />}
    </Page>
  )
}

export default ReturnDeviceForm
