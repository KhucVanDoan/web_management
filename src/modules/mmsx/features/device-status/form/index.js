import React, { useEffect, useMemo } from 'react'

import { Box, Grid, Paper } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useDeviceStatus from '~/modules/mmsx/redux/hooks/useDeviceStatus'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import { validateShema } from './schema'

const breadcrumbs = [
  {
    title: 'serialDeviceManagement',
  },
  {
    route: ROUTE.DEVICE_STATUS.LIST.PATH,
    title: ROUTE.DEVICE_STATUS.LIST.TITLE,
  },
  {
    route: ROUTE.DEVICE_STATUS.EDIT.PATH,
    title: ROUTE.DEVICE_STATUS.EDIT.TITLE,
  },
]

const DeviceStatusForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    date: null,
    moId: '',
    status: null,
    manufacturedDevice: 0,
    passedDevice: 0,
  }

  const {
    data: { deviceStatusDetail, isLoading, infoData },
    actions,
  } = useDeviceStatus()

  useEffect(() => {
    actions.getInfoData(id)
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEVICE_STATUS.DETAIL.PATH.replace(':id', `${id}`))
  }

  const initialValues = useMemo(
    () => ({
      items: [{ ...DEFAULT_ITEM }],
    }),
    [deviceStatusDetail],
  )

  useEffect(() => {
    actions.getDetailDeviceStatus(id)
    return () => {
      actions.resetDeviceStatus()
    }
  }, [id])

  const handleSubmit = (values) => {
    const convertValues = {
      deviceAssignmentId: id,
      actives: values.items?.map((item) => ({
        startDate: item.date[0],
        endDate: item.date[1],
        moId: item?.moId,
        status: Number(item?.status),
        actualQuantity: Number(item?.manufacturedDevice),
        passQuantity: Number(item?.passedDevice),
        attributes: [],
      })),
    }
    actions.createInfoDeviceStatus(convertValues, backToList)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceStatusEdit')}
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
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('deviceStatus.form.serial')}
                        value={deviceStatusDetail?.serial}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('deviceStatus.form.deviceName')}
                        value={deviceStatusDetail?.deviceName}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemSettingTable
                          items={values?.items || []}
                          arrayHelpers={arrayHelpers}
                          infoData={infoData}
                        />
                      )}
                    />
                  </Box>
                  <ActionBar
                    onBack={backToList}
                    onCancel={handleReset}
                    mode={MODAL_MODE.UPDATE}
                  />
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </Page>
  )
}

export default DeviceStatusForm
