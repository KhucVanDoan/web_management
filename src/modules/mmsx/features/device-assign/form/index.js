import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { addMinutes, endOfDay, startOfDay, subMonths } from 'date-fns'
import { Form, Formik } from 'formik'
import { isEmpty, isNumber } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Autocomplete from '~/components/Autocomplete'
import DateRangePicker from '~/components/DateRangePicker'
import { Field } from '~/components/Formik'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import {
  ACTION_MAP,
  DEVICE_ASSIGN_STATUS_OPTION,
  DEVICE_REQUEST_LIST_STATUS,
  SUPPLIES_ACCESSORY,
  WORK_TIME_DATA_SOURCE_TYPE,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useDeviceAssign from '~/modules/mmsx/redux/hooks/useDeviceAssign'
import { maintainInfoDeviceAssign } from '~/modules/mmsx/redux/sagas/device-assign/get-maintain-info'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

import TableMaintenance from '../table-maintenance'
import DeviceAssignFormHistory from './form-history'
import { validateShema } from './schema'
import TableMo from './table-mo'

const DeviceAssignForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const [listDevice, setListDevice] = useState([])
  const [requestOptions, setRequestOptions] = useState([])
  const [maintainList, setMaintainList] = useState([])
  const [maintainInfo, setMaintainInfo] = useState({})
  const [usageTime, setUsageTime] = useState(null)
  const [dateWorkCenter, setDateWorkCenter] = useState([
    subMonths(new Date(), 6),
    new Date(),
  ])
  const [selectedMO, setSelectedMO] = useState([])

  const {
    data: { isLoading, deviceAssignDetail, logTimeByMo },
    actions,
  } = useDeviceAssign()

  const {
    data: { responsibleSubject, moListByWorkCenter },
    actions: actionsCommon,
  } = useCommonInfo()

  const MODE_MAP = {
    [ROUTE.DEVICE_ASSIGN.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEVICE_ASSIGN.EDIT.PATH]: MODAL_MODE.UPDATE,
    [ROUTE.DEVICE_ASSIGN.REASSIGN.PATH]: 'reassign',
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isReassign = mode === 'reassign'

  const backToList = () => {
    history.push(ROUTE.DEVICE_ASSIGN.LIST.PATH)
  }

  const formatSubAccessories = (data, time) => {
    const accessories = []
    data?.forEach((item) => {
      if (item?.type === SUPPLIES_ACCESSORY.ACCESSORY) {
        accessories.push({
          ...item,
          nextMaintain: time
            ? convertUtcDateToLocalTz(
                addMinutes(new Date(time), item?.maintenancePeriod || 0),
              )
            : null,
          replaceDate: time
            ? convertUtcDateToLocalTz(
                addMinutes(new Date(time), item?.mttfIndex || 0),
              )
            : null,
        })
      }
    })
    return accessories
  }

  const initialValues = {
    code: deviceAssignDetail?.requestId || null,
    assignDate: deviceAssignDetail?.assignedAt,
    codeAssign: deviceAssignDetail?.deviceCode,
    assignUser: deviceAssignDetail?.assignUser?.username,
    deviceName: deviceAssignDetail?.deviceName || null,
    usageTime: deviceAssignDetail?.usedAt,
    serial: deviceAssignDetail?.serial || null,
    model: deviceAssignDetail?.model || null,
    workTimeDataSource: deviceAssignDetail?.workTimeDataSource || null,
    responsibleUser: deviceAssignDetail?.responsibleUser?.userId,
    oee: deviceAssignDetail?.oee || null,
    productivityTarget: deviceAssignDetail?.productivityTarget || null,
    hasMO: deviceAssignDetail?.deviceType === 1 || false,
  }

  const getMaintainInfoDeviceAssign = async () => {
    if (!isEmpty(deviceAssignDetail)) {
      setUsageTime(deviceAssignDetail?.usedAt)
      const params = {
        id: deviceAssignDetail?.deviceId,
        deviceAssignId: deviceAssignDetail?.id,
      }
      const response = await maintainInfoDeviceAssign(params)
      if (response?.data) {
        const data = response?.data
        setMaintainList([
          {
            details: formatSubAccessories(
              data?.details,
              deviceAssignDetail?.usedAt,
            ),
            name: data?.name,
            nextMaintain: convertUtcDateToLocalTz(
              addMinutes(
                new Date(deviceAssignDetail?.usedAt),
                data?.maintenancePeriod || 0,
              ),
            ),
            mtbf: Math.round(data?.mtbfIndex),
            mttf: +data?.mttfIndex ? Math.round(data?.mttfIndex) : null,
            mtta: Math.round(data?.mttaIndex),
            mttr: Math.round(data?.mttrIndex),
            maintenancePeriod: data?.maintenancePeriod,
            replaceDate: convertUtcDateToLocalTz(
              addMinutes(
                new Date(deviceAssignDetail?.usedAt),
                data?.mttfIndex || 0,
              ),
            ),
          },
        ])
      }
    }
  }

  useEffect(() => {
    getMaintainInfoDeviceAssign()
  }, [deviceAssignDetail])

  useEffect(() => {
    if (id) {
      actions.detailDeviceAssign(id)
    }
    if (mode === MODAL_MODE.CREATE || mode === MODAL_MODE.UPDATE) {
      actions.getDeviceRequest(null, (data) => {
        const optionTemp = []
        data?.items?.forEach((item) => {
          if (
            item.status === DEVICE_REQUEST_LIST_STATUS.AWAITINGASSIGNMENT &&
            item?.actualImportQuantity > item?.assignedQuantity
          ) {
            optionTemp.push({ title: item.code, value: item.id })
          }
        })
        setRequestOptions(optionTemp)
        setListDevice(data.items)
      })
    }
    return () => {
      actions.resetDeviceAssignState()
    }
  }, [mode, id])

  useEffect(() => {
    actionsCommon.getResponsibleSubject()
  }, [])

  useEffect(() => {
    if (!isEmpty(moListByWorkCenter)) setSelectedMO([moListByWorkCenter[0].id])
  }, [moListByWorkCenter])

  const handleSubmit = (values) => {
    if (isUpdate) {
      const params = {
        id: id,
        deviceRequestId: values?.code,
        serial: values?.serial,
        assignedAt: values?.assignDate,
        oee: values?.oee,
        productivityTarget: values?.productivityTarget,
        usedAt: values?.usageTime,
        responsibleUserId: values?.responsibleUser.toString(),
        workTimeDataSource: values?.workTimeDataSource,
        isReassign,
      }
      actions.updateDeviceAssign(params, backToList)
    } else {
      const params = {
        deviceRequestId: values?.code,
        serial: values?.serial,
        assignedAt: values?.assignDate,
        oee: values?.oee,
        productivityTarget: values?.productivityTarget,
        usedAt: values?.usageTime,
        responsibleUserId: values?.responsibleUser.toString(),
        workTimeDataSource: values?.workTimeDataSource,
      }
      actions.createDeviceAssign(params, backToList)
    }
  }

  useEffect(() => {
    setSelectedMO([])
    const startOfDay1 = startOfDay(dateWorkCenter[0])
    const endOfDay2 = endOfDay(dateWorkCenter[1])
    const params = {
      filter:
        JSON.stringify([
          {
            column: 'plan',
            text: `${startOfDay1.toISOString()}|${endOfDay2.toISOString()}`,
          },
          {
            column: 'workCenterId',
            text: `${
              deviceAssignDetail?.workCenter?.id || maintainInfo?.workCenter?.id
            }`,
          },
        ]) || [],
    }
    actionsCommon?.getMoByWorkCenter(params)
  }, [dateWorkCenter, deviceAssignDetail?.workCenter, maintainInfo?.workCenter])

  useEffect(() => {
    const params = {
      wcId: deviceAssignDetail?.workCenter?.id || maintainInfo?.workCenter?.id,
      moIds: selectedMO.join(','),
    }

    actions?.getLogTimeByMo(params)
  }, [selectedMO, deviceAssignDetail?.workCenter, maintainInfo?.workCenter])

  const handleRequestSelectChange = (val, setFieldValue) => {
    const data = listDevice.find((item) => item.id === val)
    setFieldValue('hasMO', data?.devices[0].type === 1)
    setFieldValue('workCenterMO', data?.workCenter)
    setFieldValue('factoryMO', data?.workCenter?.factory)

    // setHasMO(data?.devices[0].type === 1)
    // setWorkCenterMO(data?.workCenter)
    // setFactorMO(data?.workCenter?.factory)
    // setRequestCode(data?.code)

    setFieldValue('codeAssign', data?.devices[0].code)
    setFieldValue('deviceName', data?.devices[0].name)
    setFieldValue('assignUser', data?.devices[0].user?.username)
    setFieldValue('serial', data?.devices[0].serial)
    setFieldValue('model', data?.devices[0].model)

    if (!isReassign) {
      const params = { deviceCode: data.devices[0]?.code }
      actions.getGeneratedSerial(params, (data) => {
        setFieldValue('serial', data.serial)
      })
    }
    const paramsMaintainInfo = {
      id: data.devices[0]?.id,
    }
    actions.getMaintainInfoDeviceAssign(paramsMaintainInfo, (resp) => {
      setMaintainInfo({
        maintainTableName: resp?.name,
        mtbfIndex: resp?.mtbfIndex,
        mttfIndex: resp?.mttfIndex,
        mttaIndex: resp?.mttaIndex,
        mttrIndex: resp?.mttrIndex,
        maintenancePeriod: resp?.maintenancePeriod,
        subTableData: resp?.details,
        workCenter: data?.workCenter,
      })
    })
  }

  const handleChangeUsageTime = (val, setFieldValue) => {
    if (setFieldValue) {
      setFieldValue('usageTime', val)
    }
    setUsageTime(val)
    setMaintainList((prev) => {
      return prev?.map((item) => ({
        ...item,
        details: formatSubAccessories(item?.details, val),
        nextMaintain: convertUtcDateToLocalTz(
          addMinutes(new Date(val), item?.maintenancePeriod || 0),
        ),
        replaceDate: convertUtcDateToLocalTz(
          addMinutes(new Date(val), item?.mttf || 0),
        ),
      }))
    })
  }

  useEffect(() => {
    if (!isEmpty(maintainInfo)) {
      setMaintainList([
        {
          details: formatSubAccessories(maintainInfo.subTableData),
          name: maintainInfo.maintainTableName,
          nextMaintain: usageTime
            ? convertUtcDateToLocalTz(
                addMinutes(
                  new Date(usageTime),
                  maintainInfo?.maintenancePeriod || 0,
                ),
              )
            : null,
          mtbf: maintainInfo.mtbfIndex,
          mttf: maintainInfo.mttfIndex,
          mtta: maintainInfo.mttaIndex,
          mttr: maintainInfo.mttrIndex,
          replaceDate: usageTime
            ? convertUtcDateToLocalTz(
                addMinutes(new Date(usageTime), maintainInfo?.mttfIndex || 0),
              )
            : null,
        },
      ])
    }
  }, [maintainInfo])

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('deviceAssign.assign.name'),
        width: 150,
        align: 'center',
      },
      {
        field: 'nextMaintain',
        headerName: t('deviceAssign.maintainTable.nextMaintainEstimate'),
        width: 150,
        align: 'center',
      },
      {
        field: 'mtbf',
        headerName: t('deviceList.form.mtbf'),
        headerTooltip: t('deviceList.tooltipHeader.mtbf'),
        width: 150,
        align: 'center',
      },
      {
        field: 'mttr',
        headerName: t('deviceList.form.mttr'),
        headerTooltip: t('deviceList.tooltipHeader.mttr'),
        width: 150,
        align: 'center',
      },
      {
        field: 'mtta',
        headerName: t('deviceList.form.mtta'),
        headerTooltip: t('deviceList.tooltipHeader.mtta'),
        width: 150,
        align: 'center',
      },
      {
        field: 'mttf',
        headerName: t('deviceList.form.mttf'),
        headerTooltip: t('deviceList.tooltipHeader.mttf'),
        width: 150,
        align: 'center',
      },
      {
        field: 'replaceDate',
        headerName: t('deviceAssign.maintainTable.estimatedReplacementDate'),
        width: 150,
        align: 'center',
      },
    ],
    [deviceAssignDetail, maintainList],
  )

  const subColumns = [
    {
      field: 'name',
      headerName: t('deviceAssign.assign.componentTitle'),
      width: 150,
    },
    {
      field: 'nextMaintain',
      headerName: t('deviceAssign.maintainTable.nextMaintainEstimate'),
      width: 150,
      align: 'center',
    },
    {
      field: 'mtbfIndex',
      headerName: t('deviceList.form.mtbf'),
      headerTooltip: t('deviceList.tooltipHeader.mtbf'),
      width: 150,
      align: 'center',
    },
    {
      field: 'mttrIndex',
      headerName: t('deviceList.form.mttr'),
      headerTooltip: t('deviceList.tooltipHeader.mttr'),
      width: 150,
      align: 'center',
    },
    {
      field: 'mttaIndex',
      headerName: t('deviceList.form.mtta'),
      headerTooltip: t('deviceList.tooltipHeader.mtta'),
      width: 150,
      align: 'center',
    },
    {
      field: 'mttfIndex',
      headerName: t('deviceList.form.mttf'),
      headerTooltip: t('deviceList.tooltipHeader.mttf'),
      width: 150,
      align: 'center',
    },
    {
      field: 'replaceDate',
      headerName: t('deviceAssign.maintainTable.estimatedReplacementDate'),
      width: 150,
      align: 'center',
    },
  ]

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.DEVICE_ASSIGN.LIST.PATH,
        title: ROUTE.DEVICE_ASSIGN.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_ASSIGN.CREATE.PATH,
          title: ROUTE.DEVICE_ASSIGN.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEVICE_ASSIGN.EDIT.PATH,
          title: ROUTE.DEVICE_ASSIGN.EDIT.TITLE,
        })
        break
      case 'reassign':
        breadcrumb.push({
          route: ROUTE.DEVICE_ASSIGN.REASSIGN.PATH,
          title: ROUTE.DEVICE_ASSIGN.REASSIGN.TITLE,
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
        return ROUTE.DEVICE_ASSIGN.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEVICE_ASSIGN.EDIT.TITLE
      case 'reassign':
        return ROUTE.DEVICE_ASSIGN.REASSIGN.TITLE
      default:
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              setMaintainList([])
              setUsageTime(null)
            }}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
      case 'reassign':
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              handleChangeUsageTime(deviceAssignDetail?.usedAt)
            }}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  // const renderHeaderRight = () => {
  //   return (
  //     <>
  //       <Box>
  //         <Button
  //           variant="outlined"
  //           sx={{ ml: 4 / 3 }}
  //           onClick={() => history.push(ROUTE.DEVICE_LIST.PATH)}
  //         >
  //           {t('deviceCategory.button.device')}
  //         </Button>
  //         <Button
  //           sx={{ ml: 4 / 3 }}
  //           onClick={() => history.push(ROUTE.REQUEST_DEVICE.PATH)}
  //         >
  //           {t('menu.requestDevice')}
  //         </Button>
  //       </Box>
  //     </>
  //   )
  // }

  const histories = deviceAssignDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`deviceAssign.comment.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    id: item?.userId,
    username: item?.username,
  }))

  const historyMaintenance = deviceAssignDetail?.histories?.reduce(
    (acc, cur) => {
      if (cur?.action === 1 && cur?.planCode && cur?.jobType) {
        return [
          ...acc,
          {
            code: cur?.planCode,
            date: cur?.createdAt,
            type: cur?.jobType,
            id: cur?.jobId,
          },
        ]
      }
      return acc
    },
    [],
  )

  const getContentTabs = (values) => {
    const tab1 = (
      <Box sx={{ mb: 2 }}>
        <TableMaintenance
          rows={maintainList}
          columns={columns}
          subColumns={subColumns}
          striped={false}
          hideSetting
          hideFooter
        />
      </Box>
    )
    const tab2 = (
      <Box sx={{ mb: 2 }}>
        <DeviceAssignFormHistory items={historyMaintenance} />
      </Box>
    )
    const tab3 = (
      <Box sx={{ mb: 2 }}>
        <Grid container columnSpacing={4} rowSpacing={4 / 3}>
          <Grid item lg={6} xs={12}>
            <LabelValue
              label={t('deviceAssign.assign.workCenter')}
              value={
                deviceAssignDetail?.workCenter?.name ||
                values?.workCenterMO?.name
              }
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Field.TextField
              name="oee"
              label={t('deviceAssign.assign.oeeTarget')}
              placeholder={t('deviceAssign.assign.oeeTarget')}
              type="number"
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              required
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <LabelValue
              label={t('deviceAssign.assign.factory')}
              value={
                deviceAssignDetail?.factory?.name || values?.factoryMO?.name
              }
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Field.TextField
              name="productivityTarget"
              label={t('deviceAssign.assign.productivityTarget')}
              placeholder={t('deviceAssign.assign.productivityTarget')}
              type="number"
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ my: 1 }}>
              {t('deviceAssign.lookProductInfo')}
            </Typography>
          </Grid>
          <Grid item lg={6} xs={12}>
            <DateRangePicker
              value={dateWorkCenter}
              label={t('deviceAssign.moTable.date')}
              onChange={(val) => setDateWorkCenter(val)}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Autocomplete
              name="attributeMaintenance"
              label={t('deviceAssign.moTable.code')}
              placeholder={t('deviceAssign.moPlaceHolder')}
              options={moListByWorkCenter}
              getOptionValue={(opt) => opt?.id || ''}
              getOptionLabel={(opt) => opt?.name || ''}
              value={selectedMO}
              multiple
              onChange={(e) => setSelectedMO(e)}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <LabelValue
              label={t('deviceAssign.actualOee')}
              value={
                isNumber(logTimeByMo?.oee)
                  ? logTimeByMo?.oee.toFixed(2) + ' %'
                  : ''
              }
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <TableMo items={logTimeByMo?.logTimes || []} />
        </Box>
      </Box>
    )

    return [
      tab1,
      ...(mode === MODAL_MODE.UPDATE ? [tab2] : []),
      ...(values?.hasMO || deviceAssignDetail?.deviceType === 1 ? [tab3] : []),
    ]
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
      // renderHeaderRight={renderHeaderRight}
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
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="code"
                        label={t('deviceAssign.assign.assignCode')}
                        placeholder={t('deviceAssign.assign.assignCode')}
                        options={
                          isUpdate
                            ? [
                                ...requestOptions,
                                {
                                  title: deviceAssignDetail?.requestCode,
                                  value: deviceAssignDetail?.requestId,
                                },
                              ]
                            : requestOptions
                        }
                        getOptionLabel={(opt) => opt?.title}
                        getOptionValue={(opt) => opt?.value}
                        onChange={(val) =>
                          handleRequestSelectChange(val, setFieldValue)
                        }
                        getOptionDisabled={(opt) =>
                          opt?.value === deviceAssignDetail?.requestId
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        label={t('deviceAssign.assign.assignDate')}
                        name="assignDate"
                        placeholder={t('deviceAssign.assign.assignDate')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('deviceAssign.assign.code')}
                        name="codeAssign"
                        placeholder={t('deviceAssign.assign.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('deviceAssign.assign.usageUser')}
                        name="assignUser"
                        placeholder={t('deviceAssign.assign.usageUser')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('deviceAssign.assign.name')}
                        name="deviceName"
                        placeholder={t('deviceAssign.assign.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.DatePicker
                        label={t('deviceAssign.assign.usageTime')}
                        name="usageTime"
                        placeholder={t('deviceAssign.assign.usageTime')}
                        onChange={(val) =>
                          handleChangeUsageTime(val, setFieldValue)
                        }
                        minDate={
                          isUpdate
                            ? new Date(deviceAssignDetail?.usedAt)
                            : new Date()
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('deviceAssign.assign.serial')}
                        name="serial"
                        placeholder={t('deviceAssign.assign.serial')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="status"
                        label={t('deviceAssign.assign.status')}
                        placeholder={t('deviceAssign.assign.status')}
                        options={DEVICE_ASSIGN_STATUS_OPTION}
                        getOptionLabel={(opt) => t(opt.text)}
                        getOptionValue={(opt) => opt?.id}
                        value={
                          deviceAssignDetail
                            ? DEVICE_ASSIGN_STATUS_OPTION[0]?.id
                            : deviceAssignDetail?.status
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('deviceAssign.assign.model')}
                        name="model"
                        placeholder={t('deviceAssign.assign.model')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        disabled
                      />
                    </Grid>
                    {(values?.hasMO ||
                      deviceAssignDetail?.deviceType === 1) && (
                      <Grid item xs={12} lg={6}>
                        <Field.Autocomplete
                          name="workTimeDataSource"
                          label={t('deviceAssign.assign.workTimeDataSource')}
                          placeholder={t(
                            'deviceAssign.assign.workTimeDataSource',
                          )}
                          options={WORK_TIME_DATA_SOURCE_TYPE}
                          getOptionLabel={(opt) => t(opt?.text)}
                          getOptionValue={(opt) => opt?.value}
                          required
                        />
                      </Grid>
                    )}
                  </Grid>

                  <Tabs
                    list={[
                      t('viewAssignTabDisplay.maintain'),
                      ...(mode === MODAL_MODE.UPDATE
                        ? [t('viewAssignTabDisplay.history')]
                        : []),
                      ...(values?.hasMO || deviceAssignDetail?.deviceType === 1
                        ? [t('viewAssignTabDisplay.mo')]
                        : []),
                    ]}
                    sx={{ mt: 3 }}
                  >
                    {getContentTabs(values)}
                  </Tabs>
                  <Grid item xs={12}>
                    <Field.Autocomplete
                      name="responsibleUser"
                      label={t('deviceCategory.responsibleUser')}
                      placeholder={t('deviceCategory.responsibleUser')}
                      options={responsibleSubject?.responsibleUsers}
                      getOptionLabel={(opt) => opt?.username}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  {renderActionBar(handleReset)}
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
      {(isUpdate || isReassign) && <Activities data={histories} />}
    </Page>
  )
}

export default DeviceAssignForm
