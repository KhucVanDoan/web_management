import React, { useEffect } from 'react'

import { Grid, InputAdornment, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { SPACE_UNITS } from '~/modules/wmsx/constants'
import useDefineWarehouse from '~/modules/wmsx/redux/hooks/useDefineWarehouse'
import useWarehouseArea from '~/modules/wmsx/redux/hooks/useWarehouseArea'
import { ROUTE } from '~/modules/wmsx/routes/config'

import warehouseAreaSchema from './schema'

const WarehouseAreaForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_AREA.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_AREA.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { warehouseAreaDetails, isLoading },
    actions,
  } = useWarehouseArea()

  const {
    data: { warehouseList, warehouseDetails },
    actions: defineWarehouseActions,
  } = useDefineWarehouse()

  const initialValues = {
    code: warehouseAreaDetails?.code || '',
    name: warehouseAreaDetails?.name || '',
    warehouseId: warehouseAreaDetails?.warehouseId || '',
    factoryName:
      warehouseList?.find((i) => i.id === warehouseAreaDetails?.warehouseId)
        ?.name || '',
    description: warehouseAreaDetails?.description || '',
    width: warehouseAreaDetails?.width?.value || '',
    long: warehouseAreaDetails?.long?.value || '',
    height: warehouseAreaDetails?.height?.value || '',
    front: warehouseAreaDetails?.frontMargin?.value || '',
    behind: warehouseAreaDetails?.behindMargin?.value || '',
    top: warehouseAreaDetails?.topMargin?.value || '',
    bottom: warehouseAreaDetails?.bottomMargin?.value || '',
    left: warehouseAreaDetails?.leftMargin?.value || '',
    right: warehouseAreaDetails?.rightMargin?.value || '',
  }
  useEffect(() => {
    defineWarehouseActions.searchWarehouses({ isGetAll: 1 })
  }, [])
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getWarehouseAreaDetailById(id, (response) => {
        defineWarehouseActions.getWarehouseDetailsById(response?.warehouseId)
      })
    }
    return () => {
      actions.resetWarehouseAreaState()
      defineWarehouseActions.resetWarehouseState()
    }
  }, [mode])

  const onSubmit = (values) => {
    const params = {
      code: values?.code,
      name: values?.name,
      description: values?.description || '',
      warehouseId: Number(values?.warehouseId),
      width: {
        value: parseFloat(values?.width) || 0,
        unit: warehouseDetails?.width?.unit || SPACE_UNITS[0].id,
      },
      height: {
        value: parseFloat(values?.height),
        unit: warehouseDetails?.height?.unit || SPACE_UNITS[0].id,
      },
      long: {
        value: parseFloat(values?.long) || 0,
        unit: warehouseDetails?.long?.unit || SPACE_UNITS[0].id,
      },
      frontMargin: {
        value: parseFloat(values?.front) || 0,
        unit: warehouseDetails?.long?.unit || SPACE_UNITS[0].id,
      },
      behindMargin: {
        value: parseFloat(values?.behind) || 0,
        unit: warehouseDetails?.long?.unit || SPACE_UNITS[0].id,
      },
      leftMargin: {
        value: parseFloat(values?.left) || 0,
        unit: warehouseDetails?.width?.unit || SPACE_UNITS[0].id,
      },
      rightMargin: {
        value: parseFloat(values?.right) || 0,
        unit: warehouseDetails?.width?.unit || SPACE_UNITS[0].id,
      },
      topMargin: {
        value: parseFloat(values?.top) || 0,
        unit: warehouseDetails?.height?.unit || SPACE_UNITS[0].id,
      },
      bottomMargin: {
        value: parseFloat(values?.bottom),
        unit: warehouseDetails?.height?.unit || SPACE_UNITS[0].id,
      },
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseArea(params, backToList)
    } else {
      params.id = +id
      actions.updateWarehouseArea(params, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'warehouseSetup',
      },
      {
        route: ROUTE.WAREHOUSE_AREA.LIST.PATH,
        title: ROUTE.WAREHOUSE_AREA.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_AREA.CREATE.PATH,
          title: ROUTE.WAREHOUSE_AREA.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_AREA.EDIT.PATH,
          title: ROUTE.WAREHOUSE_AREA.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
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
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_AREA.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.WAREHOUSE_AREA.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_AREA.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_AREA.LIST.PATH)
  }
  const handleOnChange = async (val, setFieldValue) => {
    defineWarehouseActions.getWarehouseDetailsById(val)
    if (val) {
      const warehouse = warehouseList?.find((i) => i.id === val)
      setFieldValue('factoryName', warehouse?.factory?.name)
    } else {
      setFieldValue('factoryName', '')
    }
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={warehouseAreaSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.code')}
                        name="code"
                        placeholder={t('warehouseArea.code')}
                        disabled={isUpdate}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.name')}
                        name="name"
                        placeholder={t('warehouseArea.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('warehouseArea.warehouseName')}
                        name="warehouseId"
                        placeholder={t('warehouseArea.warehouseName')}
                        options={warehouseList}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name}
                        getOptionSubLabel={(opt) => opt?.code}
                        sx={{ mt: 4 / 3 }}
                        onChange={(val) => handleOnChange(val, setFieldValue)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.factoryName')}
                        name="factoryName"
                        placeholder={t('warehouseArea.factoryName')}
                        disabled={true}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" component="span">
                        {t('warehouseArea.storageSpace.title')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.storageSpace.long')}
                        name="long"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.long?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                        required
                      />
                    </Grid>{' '}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.storageSpace.width')}
                        name="width"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.width?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>{' '}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.storageSpace.height')}
                        name="height"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.height?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" component="span">
                        {t('warehouseArea.sortDistance.title')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.sortDistance.front')}
                        name="front"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.long?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>{' '}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.sortDistance.behind')}
                        name="behind"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.long?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>{' '}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.sortDistance.left')}
                        name="left"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.width?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>{' '}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.sortDistance.right')}
                        name="right"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.width?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.sortDistance.top')}
                        name="top"
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.height?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('warehouseArea.sortDistance.bottom')}
                        name="bottom"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ ml: 0, pr: 1 }}
                            >
                              {warehouseDetails
                                ? SPACE_UNITS?.find(
                                    (x) =>
                                      x.id === warehouseDetails?.height?.unit,
                                  )?.name
                                : ''}
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('warehouseArea.description')}
                        placeholder={t('warehouseArea.description')}
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
          )
        }}
      </Formik>
    </Page>
  )
}

export default WarehouseAreaForm
