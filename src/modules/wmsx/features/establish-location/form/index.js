import { useEffect, useMemo } from 'react'

import { Box, FormControlLabel, Grid } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
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
import { searchItemsApi } from '~/modules/database/redux/sagas/define-item/search-items'
import { LOCATION_SETTING_TYPE } from '~/modules/wmsx/constants'
import useLocationSetting from '~/modules/wmsx/redux/hooks/useLocationSetting'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTableDetail from '../item-setting-table'
import { schema } from './schema'

function EstablishLocationForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, locationSettingsDetails },
    actions,
  } = useLocationSetting()

  const DEFAULT_ITEM = {
    id: new Date().getTime(),
    warehouse: null,
    area: null,
    shelf: null,
    floor: null,
  }

  const initialValues = useMemo(
    () => ({
      code: locationSettingsDetails?.code || '',
      name: locationSettingsDetails?.name || '',
      isWarehouseType: !isEmpty(locationSettingsDetails)
        ? locationSettingsDetails?.type === LOCATION_SETTING_TYPE.EVEN
        : true,
      description: locationSettingsDetails?.description || '',
      target: locationSettingsDetails?.items || [],
      items: locationSettingsDetails?.itemLocations?.map((item) => ({
        warehouse: item?.warehouse,
        area: item?.warehouseSetor || null,
        shelf: item?.warehouseShelf || null,
        floor: item?.warehouseShelfFloor || null,
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [locationSettingsDetails],
  )

  const MODE_MAP = {
    [ROUTE.ESTABLISH_LOCATION.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ESTABLISH_LOCATION.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.WAREHOUSE_SETUP.TITLE,
      },
      {
        route: ROUTE.ESTABLISH_LOCATION.LIST.PATH,
        title: ROUTE.ESTABLISH_LOCATION.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.ESTABLISH_LOCATION.CREATE.PATH,
          title: ROUTE.ESTABLISH_LOCATION.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.ESTABLISH_LOCATION.EDIT.PATH,
          title: ROUTE.ESTABLISH_LOCATION.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getLocationSettingDetailsById(id)
    }
    return () => actions.resetLocationSettingState()
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.ESTABLISH_LOCATION.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ESTABLISH_LOCATION.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.ESTABLISH_LOCATION.LIST.PATH)
  }

  const onSubmit = (value) => {
    const params = {
      code: value.code,
      name: value.name,
      description: value.description,
      type: value.isWarehouseType ? 0 : 1,
      itemIds: value.target.map((item) => item?.id || item?.itemId),
      itemLocations: value.items.map((item) => ({
        warehouseId: item.warehouse.id,
        warehouseSetorId: item?.area?.id,
        warehouseShelfId: item?.shelf?.id,
        warehouseShelfFloorId: item?.floor?.id,
      })),
    }
    if (isUpdate) {
      actions.updateLocationSetting({ ...params, id: Number(id) }, backToList)
    } else {
      actions.createLocationSetting(params, backToList)
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

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={schema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => (
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
                      label={t('locationSetting.settingCode')}
                      name="code"
                      placeholder={t('locationSetting.settingCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <FormControlLabel
                      label={t('locationSetting.cantBeSeparated')}
                      control={<Field.Checkbox name="isWarehouseType" />}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('locationSetting.settingName')}
                      name="name"
                      placeholder={t('locationSetting.settingName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="target"
                      label={t('locationSetting.target')}
                      placeholder={t('locationSetting.target')}
                      asyncRequest={(s) =>
                        searchItemsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) =>
                        opt?.id === val?.itemId
                      }
                      getOptionLabel={(opt) => opt?.name}
                      getOptionSubLabel={(opt) => opt?.code}
                      multiple
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('locationSetting.description')}
                      placeholder={t('locationSetting.descriptionInput')}
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
            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemSettingTableDetail
                    items={values?.items || []}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                    setFieldValue={setFieldValue}
                  />
                )}
              />
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default EstablishLocationForm
