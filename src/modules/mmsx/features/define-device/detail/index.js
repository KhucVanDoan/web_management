import React, { useEffect } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { isEqual } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import {
  ACTION_MAP,
  DEVICE_STATUS_OPTION,
  SUPPLIES_ACCESSORY_OPTION,
  SUPPLIES_ACCESSORY_OPTION_MAP,
  TYPE_ITEM,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useAttributeType from '~/modules/mmsx/redux/hooks/useAttributeType'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import useTemplateInstall from '~/modules/mmsx/redux/hooks/useTemplateInstall'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import MaintainTable from '../form/maintain-table'

const breadcrumbs = [
  {
    title: ROUTE.DEVICE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEVICE_LIST.LIST.PATH,
    title: ROUTE.DEVICE_LIST.LIST.TITLE,
  },
  {
    route: ROUTE.DEVICE_LIST.DETAIL.PATH,
    title: ROUTE.DEVICE_LIST.DETAIL.TITLE,
  },
]

const DefineDeviceDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, deviceDetail, deviceInStore },
    actions,
  } = useDefineDevice()

  const {
    // data,
    actions: commonActions,
  } = useCommonInfo()

  const {
    data: { attributeTypeList },
    actions: attributeTypeActions,
  } = useAttributeType()

  const {
    data: { installList },
    actions: installActions,
  } = useTemplateInstall()

  useEffect(() => {
    actions.getDeviceDetailById(id)
    attributeTypeActions.getAttributeTypeList({})
    installActions.getListTemplateInstall({})
    commonActions.getAllSuppliesConfirm({})

    return () => {
      actions.resetDeviceState()
    }
  }, [id])

  useEffect(() => {
    if (deviceDetail) {
      const suppliesAndAccessoriesTransform =
        deviceDetail?.suppliesAndAccessories?.map((ele) => {
          return {
            supplyId: ele?.supply?.id,
            type: ele?.supply?.type,
            quantity: ele?.quantity,
            useDate: ele?.useDate,
            disableMttf: ele?.canRepair,
          }
        })
      actions.setSuppliesAndAccessoryList(suppliesAndAccessoriesTransform)
      const firstRowTableMaintainance = {
        supplyId: null,
        name: deviceDetail?.name,
        type: TYPE_ITEM.DEVICE,
        mtbfIndex: deviceDetail?.mtbfIndex?.indexValue,
        mttaIndex: deviceDetail?.mttaIndex,
        mttfIndex: deviceDetail?.mttfIndex?.indexValue,
        mttrIndex: deviceDetail?.mttrIndex,
        disableMttf: deviceDetail?.canRepair,
        maintenancePeriod: deviceDetail?.maintenancePeriod,
      }
      actions.passDeviceToStore(firstRowTableMaintainance)
    }
  }, [deviceDetail])

  const suppliesAndAccessorieColumns = [
    {
      field: 'name',
      headerName: t('deviceList.infoList.name'),
      renderCell: (params) => {
        return params.row?.supply?.name
      },
    },
    {
      field: 'type',
      headerName: t('deviceList.list.type'),
      renderCell: (params) => {
        return t(`${SUPPLIES_ACCESSORY_OPTION_MAP[params?.row?.supply?.type]}`)
      },
    },
    {
      field: 'quantity',
      headerName: t('deviceList.list.quantity'),
      align: 'right',
      renderCell: (params) => {
        return params?.row?.quantity
      },
    },
    {
      field: 'useDate',
      headerName: t('deviceList.infoList.useDate'),
      align: 'right',
      renderCell: (params) => {
        return params?.row?.supply?.type === SUPPLIES_ACCESSORY_OPTION[0].value
          ? `${params?.row?.useDate} ${t('common.suffix.minute')}`
          : ''
      },
    },
    {
      field: 'canRepair',
      headerName: t('deviceList.infoList.canRepair'),
      align: 'center',
      renderCell: (params) => {
        return params?.row?.canRepair ? (
          <CheckBoxIcon />
        ) : (
          <CheckBoxOutlineBlankIcon />
        )
      },
    },
  ]

  const backToList = () => {
    history.push(ROUTE.DEVICE_LIST.LIST.PATH)
  }

  const histories = deviceDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`deviceList.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  const renderHeaderRight = () => (
    <>
      <Button
        onClick={() => history.push(ROUTE.DEVICE_CATEGORY.PATH)}
        variant="outlined"
        sx={{ mr: 4 / 3 }}
      >
        {t('deviceList.form.deviceCategoryButtonTitle')}
      </Button>
      <Button onClick={() => history.push(ROUTE.DEVICE_ASSIGN.PATH)}>
        {t('deviceList.form.assignButtonTitle')}
      </Button>
    </>
  )

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceDetail')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
      renderHeaderRight={renderHeaderRight}
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('deviceList.device.status')}
                  value={
                    <Status
                      options={DEVICE_STATUS_OPTION}
                      value={deviceDetail?.status}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.device.code')}
                  value={deviceDetail.code}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.device.deviceCategory')}
                  value={deviceDetail?.deviceGroup?.name}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.device.name')}
                  value={deviceDetail.name}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box display="flex">
                  <FormControlLabel
                    control={<Checkbox sx={{ my: '-9px' }} />}
                    label={t('deviceList.checkbox')}
                    checked={Boolean(deviceDetail?.type)}
                    disabled
                    sx={{ pointerEvents: 'none' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.attributeName')}
                  value={deviceDetail?.maintenanceAttribute?.name}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.price')}
                  value={
                    deviceDetail?.price
                      ? `${deviceDetail?.price} ${t(
                          'common.suffix.denominations',
                        )}`
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.frequency')}
                  value={
                    deviceDetail?.frequency
                      ? `${deviceDetail?.frequency}
                     ${deviceDetail?.maintenanceAttribute?.name} / ${t(
                          'common.suffix.minute',
                        )}`
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.periodicCheck')}
                  value={
                    deviceDetail?.periodicInspectionTime
                      ? `${deviceDetail?.periodicInspectionTime} ${t(
                          'common.suffix.day',
                        )}`
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box display="flex">
                  <FormControlLabel
                    control={<Checkbox sx={{ my: '-9px' }} />}
                    label={t('deviceList.checkboxMttf')}
                    checked={Boolean(deviceDetail?.canRepair)}
                    disabled
                    sx={{ pointerEvents: 'none' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.attributeType')}
                  value={attributeTypeList
                    .filter((item) =>
                      (deviceDetail?.attributeType || []).includes(item.id),
                    )
                    .map((item) => item.name)
                    .join(',')}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.installTemplate')}
                  value={
                    installList.find((item) =>
                      isEqual(deviceDetail?.installTemplate, item.id),
                    )?.name
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LV
                  label={t('deviceList.templateChecklist')}
                  value={deviceDetail?.checkListTemplate?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('deviceList.device.descriptionForm')}
                  placeholder={t('deviceList.device.descriptionForm')}
                  multiline
                  readOnly
                  rows={3}
                  value={deviceDetail.description}
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Tabs
              list={[
                t('deviceList.tab.formDetail'),
                t('deviceList.tab.formMaintain'),
              ]}
              sx={{ mt: 3 }}
            >
              {/* Tab 1 */}
              <Box>
                <Grid container columnSpacing={4} rowSpacing={4 / 3}>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceList.provider')}
                      value={deviceDetail?.vendor?.name}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceList.importDate')}
                      value={convertUtcDateToLocalTz(deviceDetail?.importDate)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceList.producer')}
                      value={deviceDetail?.brand}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceList.insuranceDay')}
                      value={`${deviceDetail?.warrantyPeriod} ${t(
                        'common.suffix.day',
                      )}`}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceList.proDate')}
                      value={convertUtcDateToLocalTz(
                        deviceDetail?.productionDate,
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={t('deviceList.model')}
                      value={deviceDetail?.model}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('deviceList.listTitle')}
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <DataTable
                    rows={deviceDetail?.suppliesAndAccessories}
                    columns={suppliesAndAccessorieColumns}
                    total={deviceDetail?.suppliesAndAccessories?.length}
                    striped={false}
                    hideSetting
                    hideFooter
                  />
                </Box>
              </Box>

              {/* Tab 2 */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="h4" mb={2}>
                  {t('deviceList.maintenanceInformation')}
                </Typography>
                <MaintainTable
                  accessoriesMaintenanceInformation={[
                    ...(deviceDetail?.accessoriesMaintenanceInformation || []),
                    deviceInStore,
                  ]}
                  mode={MODAL_MODE.DETAIL}
                  deviceDetail={deviceDetail}
                />
              </Box>
            </Tabs>

            <LV
              label={t('deviceList.responsibleUser')}
              value={deviceDetail?.responsibleSubject?.name}
              sx={{ mt: 4 }}
            />

            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default DefineDeviceDetail
