import React, { useEffect, useMemo } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { startOfToday } from 'date-fns'
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
import { ACTION_MAP, SUPPLY_REQUEST_STATUS } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useDefineSupplies from '~/modules/mmsx/redux/hooks/useDefineSupplies'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from '../form/itemSetting-table'
import { validateShema } from './schema'
const DEFAULT_ITEM = [
  {
    id: new Date().getTime(),
    materialCode: '',
    requireAmount: '',
  },
]
const SuppliesRequestForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const {
    data: { suppliesRequestDetail, isLoading, jobList },
    actions,
  } = useSuppliesRequest()

  const { actions: actionDefineSupplies } = useDefineSupplies()
  const MODE_MAP = {
    [ROUTE.SUPPLIES_REQUEST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SUPPLIES_REQUEST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.SUPPLIES_REQUEST.LIST.PATH)
  }
  useEffect(() => {
    actions.getJobListInSuppliesRequest()
    actionDefineSupplies.searchListSupplies({ isGetAll: 1 })
  }, [])

  const initialValues = useMemo(
    () => ({
      jobCode: isUpdate
        ? {
            id: suppliesRequestDetail?.jobId,
            name: suppliesRequestDetail?.jobName,
            code: suppliesRequestDetail?.jobCode,
            deviceAssignment: {
              name: suppliesRequestDetail?.deviceName,
              serial: suppliesRequestDetail?.serial,
              factory: {
                name: suppliesRequestDetail?.factory,
              },
              workCenter: {
                name: suppliesRequestDetail?.workCenter,
              },
            },
          }
        : null,
      name: suppliesRequestDetail?.name || '',
      requestedBy: suppliesRequestDetail?.requestedBy || '',
      jobName: suppliesRequestDetail?.jobName || '',
      team: suppliesRequestDetail?.team || '',
      deviceName: suppliesRequestDetail?.deviceName || '',
      serial: suppliesRequestDetail?.serial || '',
      factory: suppliesRequestDetail?.factory || '',
      workCenter: suppliesRequestDetail?.workCenter || '',
      receiveExpectedDate: suppliesRequestDetail?.receiveExpectedDate || '',
      description: suppliesRequestDetail?.description || '',
      items:
        suppliesRequestDetail?.supplies?.map((item) => ({
          id: item?.id,
          materialCode: item?.id,
          requireAmount: item?.quantity,
        })) || DEFAULT_ITEM,
    }),
    [suppliesRequestDetail],
  )

  useEffect(() => {
    if (isUpdate) {
      actions.getSuppliesRequestDetail(id)
    }
    return () => {
      if (isUpdate) {
        actions.resetStateSuppliesRequest()
      }
    }
  }, [mode])
  const handleSubmit = (values) => {
    const params = {
      jobId: values?.jobCode?.id,
      name: values?.name?.trim(),
      description: values?.description?.trim(),
      receiveExpectedDate: values?.receiveExpectedDate,
      supplies: values?.items?.map((data) => ({
        supplyId: data?.materialCode?.trim(),
        quantity: data?.requireAmount,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createSuppliesRequest(params, backToList)
    } else {
      actions.updateSuppliesRequest({ ...params, id }, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'deviceSerialManagement',
      },
      {
        route: ROUTE.SUPPLIES_REQUEST.LIST.PATH,
        title: ROUTE.SUPPLIES_REQUEST.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_REQUEST.CREATE.PATH,
          title: ROUTE.SUPPLIES_REQUEST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_REQUEST.EDIT.PATH,
          title: ROUTE.SUPPLIES_REQUEST.EDIT.TITLE,
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
        return ROUTE.SUPPLIES_REQUEST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SUPPLIES_REQUEST.EDIT.TITLE
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
  const histories =
    suppliesRequestDetail?.histories?.map((item) => ({
      content: ACTION_MAP[item?.action]
        ? t(`deviceAssign.comment.${ACTION_MAP[item?.action]}`)
        : '',
      createdAt: item?.createdAt,
      id: item?.userId,
      username: item?.username,
    })) || []

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
        <Formik
          initialValues={initialValues}
          validationSchema={validateShema(t)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleReset, values, setFieldValue }) => (
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
                              {t('suppliesCategory.form.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={SUPPLY_REQUEST_STATUS}
                              value={suppliesRequestDetail?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="jobCode"
                        label={t('suppliesRequest.form.field.jobCode')}
                        placeholder={t('suppliesRequest.form.field.jobCode')}
                        options={jobList}
                        getOptionLabel={(opt) => opt?.code}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('suppliesRequest.table.name')}
                        name="name"
                        placeholder={t('suppliesRequest.table.name')}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('suppliesRequest.form.field.requestedBy')}
                        name="requestedBy"
                        placeholder={t(
                          'suppliesRequest.form.field.requestedBy',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        disabled
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="jobCode.name"
                        label={t('suppliesRequest.form.field.jobName')}
                        placeholder={t('suppliesRequest.form.field.jobName')}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="team"
                        label={t('suppliesRequest.form.field.team')}
                        placeholder={t('suppliesRequest.form.field.team')}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="jobCode.deviceAssignment.name"
                        label={t('suppliesRequest.form.field.deviceName')}
                        placeholder={t('suppliesRequest.form.field.deviceName')}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="jobCode.deviceAssignment.serial"
                        label={t('suppliesRequest.form.field.serial')}
                        placeholder={t('suppliesRequest.form.field.serial')}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="jobCode.deviceAssignment.factory.name"
                        label={t('suppliesRequest.form.field.factory')}
                        placeholder={t('suppliesRequest.form.field.factory')}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="jobCode.deviceAssignment.workCenter.name"
                        label={t('suppliesRequest.form.field.workCenter')}
                        placeholder={t('suppliesRequest.form.field.workCenter')}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        name="receiveExpectedDate"
                        label={t(
                          'suppliesRequest.form.field.receiveExpectedDate',
                        )}
                        placeholder={t(
                          'suppliesRequest.form.field.receiveExpectedDate',
                        )}
                        minDate={startOfToday()}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('suppliesRequest.form.field.description')}
                        placeholder={t(
                          'suppliesRequest.form.field.description',
                        )}
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

              <Box mt={2}>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <ItemSettingTable
                      jobCode={values?.jobCode?.id}
                      items={values?.items || []}
                      arrayHelpers={arrayHelpers}
                      setFieldValue={setFieldValue}
                      mode={mode}
                    />
                  )}
                />
              </Box>
              {renderActionBar(handleReset)}
            </Form>
          )}
        </Formik>
      </Paper>
      {isUpdate && <Activities data={histories} />}
    </Page>
  )
}

export default SuppliesRequestForm
