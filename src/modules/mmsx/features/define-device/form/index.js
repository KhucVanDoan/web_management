import React, { useEffect, useMemo } from 'react'

import {
  Box,
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
} from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  CODE_SETTINGS,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { TYPE_ITEM, ACTION_MAP } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useAttributeType from '~/modules/mmsx/redux/hooks/useAttributeType'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useDefineDevice from '~/modules/mmsx/redux/hooks/useDefineDevice'
import useDeviceCategory from '~/modules/mmsx/redux/hooks/useDeviceCategory'
import useTemplateInstall from '~/modules/mmsx/redux/hooks/useTemplateInstall'
import { searchTemplateListApi } from '~/modules/mmsx/redux/sagas/template-checklist/search-template-checklist'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { searchVendorsApi } from '~/modules/wmsx/redux/sagas/define-vendor/search-vendors'

import ItemsSettingTable from './items-setting-table'
import MaintainTable from './maintain-table'
import { deviceSchema } from './schema'

const DEFAULT_ITEM = {
  supplyId: null,
  quantity: 1,
}
const DefineDeviceForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, deviceDetail, deviceInStore },
    actions,
  } = useDefineDevice()

  const {
    data: { deviceCategoryList },
    actions: deviceCategoryActions,
  } = useDeviceCategory()

  const {
    data: { attributeMaintainList, responsibleSubject },
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

  const MODE_MAP = {
    [ROUTE.DEVICE_LIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEVICE_LIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const histories = deviceDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`deviceCategory.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  const initialValues = useMemo(
    () => ({
      name: deviceDetail?.name || '',
      code: isUpdate ? deviceDetail?.code : CODE_SETTINGS.ITEM.PREFIX,
      deviceCategory: deviceDetail?.deviceGroup?.id || '',
      useInProduction: deviceDetail?.type || false,
      attributeMaintenance: deviceDetail?.maintenanceAttribute?.id || '',
      price: deviceDetail?.price || '',
      frequency: deviceDetail?.frequency || '',
      periodicCheck: deviceDetail?.periodicInspectionTime || '',
      disableMttf: deviceDetail?.canRepair || false,
      attributeType: deviceDetail?.attributeType || '',
      installTemplate: deviceDetail?.installTemplate || '',
      templateChecklist: isUpdate ? deviceDetail?.checkListTemplate : null,
      description: deviceDetail?.description || '',
      supplier: deviceDetail?.vendor || null,
      importDate: deviceDetail?.importDate || '',
      manufacturer: deviceDetail?.brand || '',
      insuranceDay: deviceDetail?.warrantyPeriod || '',
      productionDate: deviceDetail?.productionDate || '',
      model: deviceDetail?.model || '',
      responsibleUser: deviceDetail?.responsibleSubject?.id || '',

      accessoriesMaintenanceInformation: [
        ...(deviceDetail?.accessoriesMaintenanceInformation?.map((item) => ({
          ...item,
          mtbfIndex: item?.mtbfIndex?.indexValue,
          mttfIndex: item?.mttfIndex?.indexValue,
        })) || []),
        deviceDetail?.name
          ? {
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
          : {
              supplyId: null,
              name: '',
              type: TYPE_ITEM.DEVICE,
              mtbfIndex: '',
              mttaIndex: '',
              mttfIndex: '',
              mttrIndex: '',
              disableMttf: false,
              maintenancePeriod: '',
            },
      ],
      items: deviceDetail?.suppliesAndAccessories?.map((p) => ({
        supplyId: p.supply.id,
        type: p.supply.type,
        quantity: p.quantity,
        useDate: p.useDate,
        disableMttf: p.canRepair,
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [deviceDetail, isUpdate],
  )

  useEffect(() => {
    deviceCategoryActions.searchDeviceCategory({})
    commonActions.getAttributeMaintain()
    commonActions.getResponsibleSubject()
    attributeTypeActions.getAttributeTypeList({})
    installActions.getListTemplateInstall({})
  }, [])

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getDeviceDetailById(id)
    }
    return () => {
      if (isUpdate) actions.resetDeviceState()
    }
  }, [params?.id])

  const responsibleSubjectList = useMemo(() => {
    if (responsibleSubject) {
      const responsibleUsers =
        responsibleSubject?.responsibleUsers?.map((item) => ({
          ...item,
          group: t('common.groupSelectResponsibleSubject.user'),
        })) || []
      const responsibleMaintenanceTeams =
        responsibleSubject?.responsibleMaintenanceTeams?.map((item) => ({
          ...item,
          group: t('common.groupSelectResponsibleSubject.maintenanceTeam'),
        })) || []

      return [...responsibleUsers, ...responsibleMaintenanceTeams]
    }
    return []
  }, [responsibleSubject])

  const onSubmit = (values) => {
    const id = params?.id
    let subject = null
    if (values?.responsibleUser) {
      const findUser = responsibleSubject?.responsibleUsers?.find(
        (e) => e.id === values?.responsibleUser,
      )
      const findMaintainTeam =
        responsibleSubject?.responsibleMaintenanceTeams?.find(
          (e) => e.id === values?.responsibleUser,
        )
      subject = findUser || findMaintainTeam
    }

    const accessoriesMaintenanceInformation =
      values?.accessoriesMaintenanceInformation
        ?.filter((i) => i?.type !== TYPE_ITEM.DEVICE)
        ?.map((item) => {
          const accessoryItem = (values?.items || []).find(
            (obj) => obj?.supplyId === item?.supply?.id,
          )
          if (accessoryItem && !accessoryItem?.disableMttf)
            return {
              ...item,
              supplyId: item?.supply?.id,
              type: accessoryItem?.type,
            }
          return {
            ...item,
            supplyId: item?.supply?.id,
            type: item?.supply?.type,
            mttfIndex: '',
          }
        })

    const firstItemResult = values.accessoriesMaintenanceInformation.find(
      (item) => item.type === TYPE_ITEM.DEVICE,
    )

    const convertValues = {
      ...values,
      ...(mode === MODAL_MODE.CREATE
        ? { code: values?.code?.substring(2) }
        : {}),
      price: values?.price ? +values?.price : null,
      deviceGroupId: values?.deviceCategory, // Id Nhóm thiết bị
      type: values?.useInProduction ? 1 : 0, //Được dùng trong sản xuất
      factoryId: values?.factory, // Id Nhà máy
      maintenanceAttributeId: values?.attributeMaintenance, // Id Thuộc tính bảo trì
      periodicInspectionTime: +values?.periodicCheck, // Kiểm tra định kỳ sau
      frequency: +values?.frequency, //Tấn suất
      attributeType: values?.attributeType || [], //Loại giá trị
      installTemplate: values?.installTemplate, //Mẫu phiếu cài đặt

      vendor: values?.supplier?.id, //Nhà cung cấp
      brand: values?.manufacturer, //Hãng sản xuất
      productionDate: values?.productionDate || null,
      importDate: values?.importDate || null,
      warrantyPeriod: +values.insuranceDay, //Thời hạn bảo hành
      model: values?.model, //Model

      maintenancePeriod: +firstItemResult.maintenancePeriod, // Tần suất bảo trì THIẾT BỊ
      mttrIndex: +firstItemResult.mttrIndex, //Chỉ số của THIẾT BỊ
      mttaIndex: +firstItemResult.mttaIndex, //Chỉ số của THIẾT BỊ
      mttfIndex: !deviceDetail?.disableMttf ? +firstItemResult.mttfIndex : null, //Chỉ số của THIẾT BỊ
      mtbfIndex: +firstItemResult.mtbfIndex, //Chỉ số của THIẾT BỊ
      id,
      accessoriesMaintenanceInformation,
      //Danh sách vật tư phụ tùng
      suppliesAndAccessories: values?.items?.map((item) => ({
        ...item,
        canRepair: item?.disableMttf,
      })),

      //Người chịu trách nhiệm
      responsibleSubject: {
        id: subject?.id || '',
        type: subject?.type || '',
      },

      canRepair: values?.disableMttf, //Có cho sửa chữa hay không,
      checkListTemplateId: values?.templateChecklist?.id,
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createDevice(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateDevice(convertValues, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.DEVICE_MANAGEMENT.TITLE,
      },
      {
        route: ROUTE.DEVICE_LIST.LIST.PATH,
        title: ROUTE.DEVICE_LIST.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEVICE_LIST.CREATE.PATH,
          title: ROUTE.DEVICE_LIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEVICE_LIST.EDIT.PATH,
          title: ROUTE.DEVICE_LIST.EDIT.TITLE,
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
        return ROUTE.DEVICE_LIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEVICE_LIST.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEVICE_LIST.LIST.PATH)
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
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
      freeSolo
      renderHeaderRight={renderHeaderRight}
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={deviceSchema(t)}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ handleReset, setFieldValue, values }) => (
                <Form>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        label={t('deviceList.device.code')}
                        name="code"
                        placeholder={t('deviceList.device.code')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
                        }}
                        disabled={isUpdate}
                        required
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        onInput={(val) => {
                          if (val?.indexOf(CODE_SETTINGS.ITEM.PREFIX) !== 0) {
                            return
                          }
                          setFieldValue('code', val)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="deviceCategory"
                        label={t('deviceList.device.deviceCategory')}
                        placeholder={t('deviceList.device.deviceCategory')}
                        options={deviceCategoryList}
                        getOptionValue={(opt) => opt?.id || ''}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="name"
                        label={t('deviceList.device.name')}
                        placeholder={t('deviceList.device.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        onChange={(val) => {
                          setFieldValue('name', val)
                          if (val) {
                            const params = {
                              name: val,
                              id: null,
                              code: null,
                              type: 2,
                              disableMttf: values?.disableMttf || false,
                            }
                            actions.passDeviceToStore(params)
                            setFieldValue('accessoriesMaintenanceInformation', [
                              params,
                            ])
                          } else {
                            actions.passDeviceToStore(null)
                            setFieldValue(
                              'accessoriesMaintenanceInformation',
                              [],
                            )
                          }
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormControlLabel
                        label={t('deviceList.checkbox')}
                        control={<Field.Checkbox name="useInProduction" />}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="attributeMaintenance"
                        label={t('deviceList.attributeName')}
                        placeholder={t('deviceList.attributeName')}
                        options={attributeMaintainList}
                        getOptionValue={(opt) => opt?.id || ''}
                        getOptionLabel={(opt) => opt?.name || ''}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="price"
                        label={t('deviceList.price')}
                        placeholder={t('deviceList.placeholder.price')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {t('VNĐ')}
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                        allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="frequency"
                        label={t('deviceList.frequency')}
                        placeholder={t('deviceList.placeholder.frequency')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {`/ ${t('common.suffix.minute')}`}
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                        allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="periodicCheck"
                        label={t('deviceList.periodicCheck')}
                        placeholder={t('deviceList.placeholder.periodicCheck')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {t('common.suffix.day')}
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                        allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <FormControlLabel
                        label={t('deviceList.checkboxMttf')}
                        control={
                          <Field.Checkbox
                            name="disableMttf"
                            onChange={(val) => {
                              const accessoriesList =
                                values?.accessoriesMaintenanceInformation.map(
                                  (item) => {
                                    if (item?.type === TYPE_ITEM.DEVICE) {
                                      return { ...item, disableMttf: val }
                                    }
                                    return item
                                  },
                                )
                              setFieldValue('disableMttf', val)
                              setFieldValue(
                                'accessoriesMaintenanceInformation',
                                accessoriesList,
                              )
                              actions.passDeviceToStore({
                                ...deviceInStore,
                                disableMttf: val,
                              })
                            }}
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="attributeType"
                        label={t('deviceList.attributeType')}
                        placeholder={t('deviceList.placeholder.attributeType')}
                        options={attributeTypeList}
                        getOptionValue={(opt) => opt?.id || ''}
                        getOptionLabel={(opt) => opt?.name || ''}
                        multiple
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="installTemplate"
                        label={t('deviceList.installTemplate')}
                        placeholder={t(
                          'deviceList.placeholder.installTemplate',
                        )}
                        options={installList}
                        getOptionValue={(opt) => opt?.id || ''}
                        getOptionLabel={(opt) => opt?.name || ''}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="templateChecklist"
                        label={t('deviceList.templateChecklist')}
                        placeholder={t(
                          'deviceList.placeholder.templateChecklist',
                        )}
                        asyncRequest={(s) =>
                          searchTemplateListApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('deviceList.device.descriptionForm')}
                        placeholder={t('deviceList.device.descriptionForm')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
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
                          <Field.Autocomplete
                            name="supplier"
                            label={t('deviceList.provider')}
                            placeholder={t('deviceList.placeholder.provider')}
                            asyncRequest={(s) =>
                              searchVendorsApi({
                                keyword: s,
                                limit: ASYNC_SEARCH_LIMIT,
                              })
                            }
                            asyncRequestHelper={(res) => res?.data?.items}
                            getOptionLabel={(opt) => opt?.name || ''}
                            required
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <Field.DatePicker
                            name="importDate"
                            label={t('deviceList.importDate')}
                            placeholder={t('deviceList.importDate')}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="manufacturer"
                            label={t('deviceList.producer')}
                            placeholder={t(
                              'deviceList.placeholder.manufacturer',
                            )}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="insuranceDay"
                            label={t('deviceList.insuranceDay')}
                            placeholder={t(
                              'deviceList.placeholder.insuranceDay',
                            )}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  sx={{ ml: 0, pr: 1 }}
                                >
                                  {t('common.suffix.day')}
                                </InputAdornment>
                              ),
                            }}
                            type="number"
                            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                            required
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <Field.DatePicker
                            name="productionDate"
                            label={t('deviceList.proDate')}
                            placeholder={t('deviceList.proDate')}
                          />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Field.TextField
                            name="model"
                            label={t('deviceList.model')}
                            placeholder={t('deviceList.placeholder.model')}
                            inputProps={{
                              maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                            }}
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
                              setFieldValue={setFieldValue}
                              accessoriesMaintenanceInformation={
                                values?.accessoriesMaintenanceInformation
                              }
                            />
                          )}
                        />
                      </Box>
                    </Box>

                    {/* Tab 2 */}
                    <Box sx={{ mt: 2 }}>
                      <MaintainTable
                        accessoriesMaintenanceInformation={
                          values?.name
                            ? values?.accessoriesMaintenanceInformation
                            : []
                        }
                        mode={mode}
                        deviceDetail={deviceDetail}
                      />
                    </Box>
                  </Tabs>
                  <Box mt={3}>
                    <Field.Autocomplete
                      name="responsibleUser"
                      label={t('deviceList.responsibleUser')}
                      placeholder={t('deviceList.placeholder.responsibleUser')}
                      options={responsibleSubjectList}
                      getOptionValue={(opt) => opt?.id || ''}
                      // groupBy={(option) => option?.group}
                      getOptionLabel={(opt) => opt?.name || opt?.username || ''}
                      required
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

export default DefineDeviceForm
