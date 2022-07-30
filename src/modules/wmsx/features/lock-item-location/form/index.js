import React, { useMemo } from 'react'

import { Box, FormControlLabel, Grid, Radio } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { omit, pickBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { BLOCK_ITEM_LOCATION_TYPE } from '~/modules/wmsx/constants'
import useBlockItemLocation from '~/modules/wmsx/redux/hooks/useBlockItemLocation'
import { ROUTE } from '~/modules/wmsx/routes/config'

import validateSchema from '../form/schema/schema'
import LockItemTable from './lock-item-setting-table'
import LocklocationTable from './lock-location-setting-table'
const LockItemLocaionForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const {
    data: { blockItemDetail },
  } = useBlockItemLocation()
  const MODE_MAP = {
    [ROUTE.LOCK_ITEM_LOCATION.CREATE.PATH]: MODAL_MODE.CREATE,
  }
  const mode = MODE_MAP[routeMatch.path]

  const DEFAULT_LOCK_ITEM = [
    {
      id: new Date().getTime(),
      itemId: null,
      warehouseId: null,
      quantity: 1,
      lotNumber: '',
      packageId: null,
      mfg: '',
    },
  ]
  const DEFAULT_LOCATION = [
    {
      id: new Date().getTime(),
      factoryId: null,
      warehouseId: null,
      warehouseSector: null,
      warehouseShelf: null,
      warehouseFloor: null,
    },
  ]
  const { actions } = useBlockItemLocation()
  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        route: ROUTE.LOCK_ITEM_LOCATION.LIST.PATH,
        title: ROUTE.LOCK_ITEM_LOCATION.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.LOCK_ITEM_LOCATION.CREATE.PATH,
          title: ROUTE.LOCK_ITEM_LOCATION.CREATE.TITLE,
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
        return ROUTE.LOCK_ITEM_LOCATION.CREATE.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.LOCK_ITEM_LOCATION.LIST.PATH)
  }
  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
            }}
            mode={MODAL_MODE.CREATE}
          />
        )
      default:
        break
    }
  }
  const initialValues = useMemo(
    () => ({
      lockItems: DEFAULT_LOCK_ITEM,
      locations: DEFAULT_LOCATION,
      switchMode: '0',
    }),
    [blockItemDetail],
  )
  const removeNullValue = (object) => {
    var cleanObject = pickBy(object, function (value) {
      return !(value === null || value === undefined)
    })
    return omit(cleanObject, ['id', 'key'])
  }
  const handleSubmit = (values) => {
    let params = {}
    let locationParams = []
    values?.locations?.forEach((location) => {
      locationParams.push(removeNullValue(location))
    })
    if (Number(values?.switchMode) === BLOCK_ITEM_LOCATION_TYPE.ITEM) {
      params = {
        description: values?.description?.trim() || null,
        items: values?.lockItems.map((item) => ({
          itemId: item.itemId,
          warehouseId: item.warehouseId,
          quantity: +item.quantity,
          packageId: +item.packageId,
          mfg: item.mfg,
          lotNumber: item.lotNumber,
        })),
      }
      actions.createBlockItem(params, backToList)
    } else {
      params = {
        description: values?.description?.trim(),
        locations: locationParams.map((item) => ({
          ...item,
          warehouseShelfId: item?.warehouseShelf?.id,
          warehouseFloorId: item?.warehouseFloor?.id,
          warehouseSectorId: item?.warehouseSector?.id,
        })),
      }
      actions.createBlockLocation(params, backToList)
    }
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item xs={12} lg={6}>
                      <Field.RadioGroup name="switchMode">
                        <Box sx={{ display: 'flex' }}>
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label={t('blockItemLocation.blockItem')}
                            onChange={(e, checked) => {
                              if (checked) {
                                setFieldValue('locations', DEFAULT_LOCATION)
                              }
                            }}
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label={t('blockItemLocation.blockLocation')}
                            sx={{ ml: 2 }}
                            onChange={(e, checked) => {
                              if (checked) {
                                setFieldValue('lockItems', DEFAULT_LOCK_ITEM)
                              }
                            }}
                          />
                        </Box>
                      </Field.RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('blockItemLocation.description')}
                        placeholder={t('blockItemLocation.description')}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {Number(values?.switchMode) === BLOCK_ITEM_LOCATION_TYPE.ITEM && (
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="lockItems"
                    render={(arrayHelpers) => (
                      <LockItemTable
                        lockItems={values?.lockItems}
                        mode={mode}
                        arrayHelpers={arrayHelpers}
                        setFieldValue={setFieldValue}
                        values={values}
                      />
                    )}
                  />
                </Box>
              )}
              {Number(values?.switchMode) ===
                BLOCK_ITEM_LOCATION_TYPE.LOCATION && (
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="locations"
                    render={(arrayHelpers) => (
                      <LocklocationTable
                        locations={values?.locations}
                        mode={mode}
                        arrayHelpers={arrayHelpers}
                        setFieldValue={setFieldValue}
                        values={values}
                      />
                    )}
                  />
                </Box>
              )}
              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default LockItemLocaionForm
