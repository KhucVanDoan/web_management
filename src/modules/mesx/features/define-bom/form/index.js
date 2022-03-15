import React, { useEffect, useMemo } from 'react'

import { Button, Grid, Typography, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import TableCollapse from '~/components/TableCollapse'
import Tabs from '~/components/Tabs'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useItemType from '~/modules/mesx/redux/hooks/useItemType'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from '../item-setting-table'
import { validationSchema } from './schema'

const DEFAULT_ITEM = {
  id: 0,
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

  const {
    data: { isLoading, BOMDetails, BOMStructure },
    actions,
  } = useBOM()

  const {
    data: { itemList, routingList },
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
      routingId: values?.routingId,
      itemId: values?.itemId,
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

  const renderActionButtons = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.back')}
            </Button>
            <Button variant="outlined" color="subText" onClick={handleReset}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.back')}
            </Button>
            <Button variant="outlined" color="subText" onClick={handleReset}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </>
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
    actionCommon.getRoutings()
    actionCommon.getItems()
    actionsItemType.searchItemTypes({ isGetAll: 1 })
    return () => actions.resetBomState()
  }, [mode])

  const initialValues = {
    code: BOMDetails?.code || '',
    name: BOMDetails?.name || '',
    routingId: BOMDetails?.routingId || '',
    description: BOMDetails?.description || '',
    itemId: BOMDetails?.itemId || '',
    items: BOMDetails?.bomDetails?.map((e) => ({
      id: e.id,
      itemId: e.itemId,
      quantity: e.quantity,
    })) || [{ ...DEFAULT_ITEM }],
    itemName: '',
  }

  const itemListBOM = itemList.filter((i) => {
    if (mode === MODAL_MODE.UPDATE) {
      return (
        (i.isProductionObject === true && !i.isHasBom) ||
        i.id === BOMDetails?.itemId
      )
    }
    return i.isProductionObject === true && !i.isHasBom
  })

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
                  <Grid item xs={12} lg={6}>
                    <Box>
                      <Field.TextField
                        name="code"
                        label={t('defineBOM.bomCode')}
                        placeholder={t('defineBOM.bomCode')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
                        }}
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
                        options={routingList}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.code || ''}
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
                        options={itemListBOM}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.code || ''}
                        required
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.TextField
                        name="itemName"
                        label={t('defineBOM.item.name')}
                        placeholder={t('defineBOM.item.name')}
                        value={getItemObject(values.itemId)?.name || ''}
                        required
                      />
                    </Box>
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

            <Box mt={2}>
              <Tabs
                list={[t('defineBOM.itemDetails'), t('defineBOM.BOMStructure')]}
              >
                {/* Tab 1 */}
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

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                '& button + button': {
                  ml: 4 / 3,
                },
              }}
            >
              {renderActionButtons(handleReset)}
            </Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default BOMForm
