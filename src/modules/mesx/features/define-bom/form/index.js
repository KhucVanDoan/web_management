import React, { useEffect, useMemo } from 'react'

import { Grid, Typography, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  ENUM_BOOLEAN,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TableCollapse from '~/components/TableCollapse'
import Tabs from '~/components/Tabs'
import useItemType from '~/modules/database/redux/hooks/useItemType'
import { searchItemsApi } from '~/modules/database/redux/sagas/define-item/search-items'
import { BOM_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { getRoutingsApi } from '~/modules/mesx/redux/sagas/common/get-routings'
import { ROUTE } from '~/modules/mesx/routes/config'
import qs from '~/utils/qs'

import ItemsSettingTable from '../item-setting-table'
import { validationSchema } from './schema'

const DEFAULT_ITEM = {
  id: 0,
  itemType: '',
  itemId: '',
  quantity: 1,
}

function BOMForm() {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const MODE_MAP = {
    [ROUTE.DEFINE_BOM.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_BOM.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const location = useLocation()
  const urlSearchParams = qs.parse(location.search)
  const itemId = +urlSearchParams.itemId

  const {
    data: { isLoading, BOMDetails, BOMStructure },
    actions,
  } = useBOM()

  const {
    data: { itemList },
    actions: actionCommon,
  } = useCommonManagement()

  const {
    data: { itemTypeList },
    actions: actionsItemType,
  } = useItemType()

  const backToList = () => {
    history.push(ROUTE.DEFINE_BOM.LIST.PATH)
  }
  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('defineBOM.item.orderNumber'),
        width: 50,
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return item?.id
        },
      },
      {
        field: 'code',
        headerName: t('defineBOM.item.code'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return item?.code
        },
      },
      {
        field: 'name',
        headerName: t('defineBOM.item.name'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return item?.name
        },
      },
      {
        field: 'quantity',
        headerName: t('defineBOM.item.quantity'),
        width: 150,
        align: 'center',
      },
      {
        field: 'unitType',
        headerName: t('defineBOM.item.unitType'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return item?.itemUnitName
        },
      },
      {
        field: 'itemType',
        headerName: t('defineBOM.item.type'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return itemTypeList.find((i) => i.id === item?.itemTypeId)?.name
        },
      },
      {
        field: 'isProductionObject',
        headerName: t('defineBOM.item.isProductionObject'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { item } = params.row
          return item?.isProductionObject ? (
            <IconButton>
              <Icon name="tick" />
            </IconButton>
          ) : null
        },
      },
    ],
    [itemList],
  )

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'producingInfo',
      },
      {
        route: ROUTE.DEFINE_BOM.LIST.PATH,
        title: ROUTE.DEFINE_BOM.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOM.CREATE.PATH,
          title: ROUTE.DEFINE_BOM.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOM.EDIT.PATH + `/${id}`,
          title: ROUTE.DEFINE_BOM.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_BOM.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_BOM.EDIT.TITLE
      default:
    }
  }

  const handleSubmit = (values) => {
    const params = {
      code: values?.code.trim(),
      name: values?.name,
      description: values?.description,
      routingId: values?.routingId?.id,
      itemId: values?.itemId?.itemId || values?.itemId?.id,
      bomItems: values?.items?.map((item) => ({
        id: item?.itemId,
        quantity: Number(item?.quantity),
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createBOM(params, backToList)
    } else {
      actions.updateBOM({ ...params, id: Number(id) }, backToList)
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

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getBOMDetailsById(id)
      actions.getBOMStructureById(id)
    }
    // actionCommon.getRoutings()
    actionCommon.getItems()
    actionsItemType.searchItemTypes({ isGetAll: 1 })
    return () => actions.resetBomState()
  }, [mode])

  const initialValues = {
    code: BOMDetails?.code || '',
    name: BOMDetails?.name || '',
    routingId: BOMDetails?.routing || '',
    description: BOMDetails?.description || '',
    itemId: BOMDetails?.item || itemId || null,
    items: BOMDetails?.bomDetails?.map((e) => ({
      id: e.id,
      itemId: e.itemId,
      quantity: e.quantity,
      itemType: getItemObject(e.itemId)?.itemType?.code,
    })) || [{ ...DEFAULT_ITEM }],
    itemName: '',
    itemQuanlity: '',
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {mode === MODAL_MODE.UPDATE && (
                    <Grid item xs={12}>
                      <LV
                        label={<Typography>{t('defineBOM.status')}</Typography>}
                        value={
                          <Status
                            options={BOM_STATUS_OPTIONS}
                            value={BOMDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Box>
                      <Field.TextField
                        name="code"
                        label={t('defineBOM.bomCode')}
                        placeholder={t('defineBOM.bomCode')}
                        disabled={mode === MODAL_MODE.UPDATE}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        required
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.TextField
                        name="name"
                        label={t('defineBOM.bomName')}
                        placeholder={t('defineBOM.bomName')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.Autocomplete
                        name="routingId"
                        label={t('defineBOM.routingCode')}
                        placeholder={t('defineBOM.routingCode')}
                        asyncRequest={(s) =>
                          getRoutingsApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionSubLabel={(opt) => opt?.name}
                        getOptionLabel={(opt) => opt?.code}
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Box>
                      <Field.Autocomplete
                        name="itemId"
                        label={t('defineBOM.item.code')}
                        placeholder={t('defineBOM.item.code')}
                        asyncRequest={(s) =>
                          searchItemsApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: JSON.stringify([
                              {
                                column: 'isHasBom',
                                text: ENUM_BOOLEAN.false,
                              },
                              {
                                column: 'isProductionObject',
                                text: ENUM_BOOLEAN.true,
                              },
                            ]),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        required
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.TextField
                        name="itemName"
                        label={t('defineBOM.item.name')}
                        placeholder={t('defineBOM.item.name')}
                        value={getItemObject(values.itemId?.id)?.name || ''}
                        required
                        disabled
                      />
                    </Box>
                    {/* @TODO: <linh.taquang> wait BA comfirm this field */}
                    {/* <Box mt={4 / 3}>
                      <Field.TextField
                        name="itemQuanlity"
                        label={t('defineBOM.item.quantity')}
                        placeholder={t('defineBOM.item.quantity')}
                        type="number"
                        required
                      />
                    </Box> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineBOM.descriptionInput')}
                      placeholder={t('defineBOM.descriptionInput')}
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
            {mode === MODAL_MODE.CREATE && (
              <Box mt={2}>
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <ItemsSettingTable
                      items={values?.items || []}
                      mode={mode}
                      arrayHelpers={arrayHelpers}
                    />
                  )}
                />
              </Box>
            )}
            {mode === MODAL_MODE.UPDATE && (
              <Box mt={2}>
                <Tabs
                  list={[
                    t('defineBOM.itemDetails'),
                    t('defineBOM.BOMStructure'),
                  ]}
                >
                  {/* Tab 1 */}
                  <FieldArray
                    name="items"
                    render={(arrayHelpers, handleReset, DEFAULT_ITEM) => (
                      <ItemsSettingTable
                        items={values?.items || []}
                        mode={mode}
                        arrayHelpers={arrayHelpers}
                        handleReset={handleReset}
                        DEFAULT_ITEM={DEFAULT_ITEM}
                      />
                    )}
                  />

                  {/* Tab 2 */}
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h4" component="span">
                        {t('defineBOQ.itemsDetails')}
                      </Typography>
                    </Box>
                    <TableCollapse
                      rows={BOMStructure || []}
                      columns={getColumns}
                      isRoot={true}
                      isView={true}
                      hideSetting
                      hideFooter
                    />
                  </Box>
                </Tabs>
              </Box>
            )}

            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default BOMForm
