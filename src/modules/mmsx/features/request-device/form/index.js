import React, { useEffect } from 'react'

import { FormControlLabel, Grid, Paper } from '@mui/material'
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
  DEVICE_REQUEST_TICKET_STATUS_OPTION,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useRequestDevice from '~/modules/mmsx/redux/hooks/useRequestDevice'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateShema } from './schema'

const RequestDeviceForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { isLoading, requestDeviceDetail },
    actions,
  } = useRequestDevice()

  const {
    data: { userList, deviceList, workCenterList },
    actions: commonAction,
  } = useCommonInfo()
  const MODE_MAP = {
    [ROUTE.REQUEST_DEVICE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.REQUEST_DEVICE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.REQUEST_DEVICE.LIST.PATH)
  }

  const initialValues = {
    code: requestDeviceDetail?.code || '',
    name: requestDeviceDetail?.name || '',
    description: requestDeviceDetail?.description || '',
    device: requestDeviceDetail?.device?.id || '',
    deviceName: requestDeviceDetail?.device?.name || '',
    user: requestDeviceDetail?.user?.id,
    quantity: requestDeviceDetail?.quantity,
    workCenter: requestDeviceDetail?.workCenter?.id,
    useInProduction: Boolean(requestDeviceDetail?.device?.type === 1),
  }

  useEffect(() => {
    if (id) {
      actions.getRequestDeviceDetail(id)
    }
    return () => {
      actions.resetStateRequestDevice()
    }
  }, [mode])

  useEffect(() => {
    commonAction.getAllDevice()
    commonAction.getUserList()
    commonAction.getAllWorkCenter()
  }, [])

  const onChangeDevice = (deviceId, setFieldValue) => {
    const device = deviceList.find((x) => x?.id === deviceId)
    setFieldValue('deviceName', device?.name)
    setFieldValue('useInProduction', device?.type === 1)
    setFieldValue('quantity', device?.type === 1 ? 1 : '')
  }

  const handleSubmit = (values) => {
    const params = {
      name: values?.name ? values?.name.trim() : '',
      description: values?.description ? values?.description.trim() : '',
      userId: values?.user,
      quantity: values?.quantity,
      workCenterId: values?.workCenter,
      deviceId: values?.device,
    }
    if (isUpdate) {
      actions.updateRequestDeviceDetail({ ...params, id: id }, backToList)
    } else {
      actions.createRequestDevice(params, backToList)
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
          route: ROUTE.REQUEST_DEVICE.CREATE.PATH,
          title: ROUTE.REQUEST_DEVICE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.REQUEST_DEVICE.EDIT.PATH,
          title: ROUTE.REQUEST_DEVICE.EDIT.TITLE,
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
        return ROUTE.REQUEST_DEVICE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.REQUEST_DEVICE.EDIT.TITLE
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

  const histories = requestDeviceDetail?.histories?.map((item) => ({
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
              {({ handleReset, setFieldValue, values }) => (
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
                              options={DEVICE_REQUEST_TICKET_STATUS_OPTION}
                              value={requestDeviceDetail?.status}
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
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('requestDevice.form.field.deviceCode')}
                        name="device"
                        placeholder={t('requestDevice.form.field.deviceCode')}
                        options={deviceList}
                        getOptionValue={(opt) => opt?.id || ''}
                        getOptionLabel={(opt) => opt?.code || ''}
                        onChange={(val) => onChangeDevice(val, setFieldValue)}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestDevice.form.field.deviceName')}
                        name="deviceName"
                        placeholder={t('requestDevice.form.field.deviceName')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        disabled
                      />
                    </Grid>

                    {values?.useInProduction && (
                      <Grid item lg={6} xs={12}>
                        <FormControlLabel
                          control={<Field.Checkbox name="useInProduction" />}
                          label={t('requestDevice.form.field.useInProduction')}
                          disabled
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('requestDevice.form.field.count')}
                        name="quantity"
                        placeholder={t('requestDevice.form.field.count')}
                        type="number"
                        allow={TEXTFIELD_ALLOW.NUMERIC}
                        disabled={values?.useInProduction}
                        required
                      />
                    </Grid>

                    {values?.useInProduction && (
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          label={t('requestDevice.form.field.factoryUsing')}
                          name="workCenter"
                          placeholder={t(
                            'requestDevice.form.field.factoryUsing',
                          )}
                          options={workCenterList}
                          getOptionValue={(opt) => opt?.id || ''}
                          getOptionLabel={(opt) => opt?.name || ''}
                          onChange={(val) => {
                            const selectedCenterData = workCenterList?.find(
                              (x) => x.id === val,
                            )
                            if (selectedCenterData) {
                              setFieldValue(
                                'user',
                                selectedCenterData?.leader?.id,
                              )
                            }
                            setFieldValue('workCenter', val)
                          }}
                          required
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('requestDevice.form.field.personUsing')}
                        name="user"
                        placeholder={t('requestDevice.form.field.personUsing')}
                        options={userList}
                        getOptionValue={(opt) => opt?.id || ''}
                        getOptionLabel={(opt) => opt?.username || ''}
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

export default RequestDeviceForm
