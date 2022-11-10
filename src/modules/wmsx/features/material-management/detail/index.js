import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Box } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useParams,
  useHistory,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Guard from '~/components/Guard'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import QRCodeGenerator from '~/components/QRCodeGenerator'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  MATERIAL_ACTIVE_STATUS_OPTIONS,
  UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE,
  CREATE_ITEM_WAREHOUSE_SOURCE_PERMISSION,
  UPDATE_ITEM_WAREHOUSE_SOURCE_PERMISSION,
} from '~/modules/wmsx/constants'
import useMaterialManagement from '~/modules/wmsx/redux/hooks/useMaterialManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { getLocalItem } from '~/utils'

import ItemsSettingTable from '../form/items-setting-table'
const DEFAULT_ITEM = {
  id: new Date().getTime(),
  itemId: '',
}

function MaterialManagementDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const search = useLocation().search
  const type = new URLSearchParams(search).get('type')
  const [isPermittedToUpdateWarehouse, setIsPermittedToUpdateWarehouse] =
    useState(false)
  const [isPermittedToUpdateSource, setIsPermittedToUpdateSource] =
    useState(false)

  const MODE_MAP = {
    [ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH]: MODAL_MODE.UPDATE,
    [ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]

  const {
    data: { isLoading, materialDetails },
    actions,
  } = useMaterialManagement()

  useEffect(() => {
    const userInfo = getLocalItem('userInfo')
    const isPermittedToUpdateWarehouse = userInfo?.userPermissions?.some(
      (permission) =>
        permission.code === CREATE_ITEM_WAREHOUSE_SOURCE_PERMISSION,
    )
    const isPermittedToUpdateSource = userInfo?.userPermissions?.some(
      (permission) =>
        permission.code === UPDATE_ITEM_WAREHOUSE_SOURCE_PERMISSION,
    )
    setIsPermittedToUpdateWarehouse(isPermittedToUpdateWarehouse)
    setIsPermittedToUpdateSource(isPermittedToUpdateSource)
  }, [])

  useEffect(() => {
    actions.getMaterialDetailsById(id)
    return () => {
      actions.resetMaterialDetailsState()
    }
  }, [id])

  const backToList = () => {
    if (mode === MODAL_MODE.DETAIL) {
      history.push(ROUTE.MATERIAL_MANAGEMENT.LIST.PATH)
    } else {
      history.push(
        ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
      )
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        route: ROUTE.MATERIAL_MANAGEMENT.LIST.PATH,
        title: ROUTE.MATERIAL_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.DETAIL:
        breadcrumbs.push({
          route: ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH,
          title: ROUTE.MATERIAL_MANAGEMENT.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH,
          title: ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.UPDATE:
        return ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.MATERIAL_MANAGEMENT.DETAIL.TITLE
      default:
        break
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.DETAIL:
        return <ActionBar onBack={backToList} />
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

  const renderHeaderRight = () =>
    mode === MODAL_MODE.DETAIL ? (
      <>
        <Guard code={FUNCTION_CODE.UPDATE_ITEM_WAREHOUSE_SOURCE_PERMISSION}>
          <Button
            onClick={() =>
              history.push(
                `${ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH.replace(
                  ':id',
                  `${id}`,
                )}?type=${UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE.UPDATE_SOURCE}`,
              )
            }
            sx={{ ml: 4 / 3 }}
            icon="edit"
            disabled={!isPermittedToUpdateSource}
          >
            {t('materialManagement.updateSource')}
          </Button>
        </Guard>
        <Guard code={FUNCTION_CODE.CREATE_ITEM_WAREHOUSE_SOURCE_PERMISSION}>
          <Button
            onClick={() =>
              history.push(
                `${ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH.replace(
                  ':id',
                  `${id}`,
                )}?type=${UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE.UPDATE_WAREHOUSE}`,
              )
            }
            sx={{ ml: 4 / 3 }}
            icon="edit"
            disabled={!isPermittedToUpdateWarehouse}
          >
            {t('materialManagement.updateWarehouse')}
          </Button>
        </Guard>
      </>
    ) : (
      ''
    )

  const initialValues = useMemo(
    () => ({
      itemWarehouseSources: materialDetails?.itemWarehouseSources || [
        { ...DEFAULT_ITEM },
      ],
    }),
    [materialDetails],
  )

  const handleSubmit = (values) => {
    const { itemWarehouseSources } = values
    const payload = itemWarehouseSources.map((item) => ({
      itemId: Number(id),
      warehouseId: item?.warehouse?.id,
      accounting: item?.accounting,
    }))
    switch (type) {
      case UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE.UPDATE_WAREHOUSE:
        actions.createItemWarehouseSource({ data: payload }, () => {
          backToList()
        })
        break
      case UPDATE_ITEM_WAREHOUSE_SOURCE_TYPE.UPDATE_SOURCE:
        actions.updateItemWarehouseSource({ data: payload }, () => {
          backToList()
        })
        break
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('materialManagement.status')}
                value={
                  <Status
                    options={MATERIAL_ACTIVE_STATUS_OPTIONS}
                    value={materialDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.code')}
                value={materialDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.name')}
                value={materialDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.normalizedCode')}
                value={materialDetails?.normalizeCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.country')}
                value={
                  materialDetails?.manufacturingCountry &&
                  materialDetails?.manufacturingCountry?.code +
                    ' - ' +
                    materialDetails?.manufacturingCountry?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.materialCategory')}
                value={`${materialDetails?.itemType?.code}.${materialDetails?.itemType?.mainGroupCode}.${materialDetails?.itemType?.subGroupCode}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.materialQuality')}
                value={
                  materialDetails?.itemQuality &&
                  materialDetails?.itemQuality?.code +
                    ' - ' +
                    materialDetails?.itemQuality?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.objectCategory')}
                value={
                  materialDetails?.objectCategory &&
                  materialDetails?.objectCategory?.code +
                    ' - ' +
                    materialDetails?.objectCategory?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.files')}
                value={materialDetails?.files}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.uom')}
                value={materialDetails?.itemUnit?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.materialImage')}
                value={materialDetails?.materialImage}
              />
            </Grid>
            <Grid item xs={12}>
              <LV
                label={t('materialManagement.qrCode')}
                value={<QRCodeGenerator value={'something'} />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('materialManagement.description')}
                multiline
                rows={3}
                value={materialDetails?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Box sx={{ mt: 3 }}>
                  <FieldArray
                    name="itemWarehouseSources"
                    render={(arrayHelpers) => (
                      <ItemsSettingTable
                        items={
                          values?.itemWarehouseSources.map((item, index) => ({
                            id: index,
                            ...item,
                          })) || []
                        }
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
    </Page>
  )
}

export default MaterialManagementDetail
