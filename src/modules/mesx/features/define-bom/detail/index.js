import { useEffect, useMemo } from 'react'

import { Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { BOM_STATUS_OPTIONS, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TableCollapse from '~/components/TableCollapse'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useItemType from '~/modules/mesx/redux/hooks/useItemType'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemSettingTable from '../item-setting-table'

function detailBOM() {
  const { id } = useParams()
  const { t } = useTranslation(['mesx'])
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

  const mode = MODAL_MODE.DETAIL

  useEffect(() => {
    actionCommon.getItems({})
    actionsItemType.searchItemTypes({ isGetAll: 1 })
    return () => actions.resetBomState()
  }, [id])

  const history = useHistory()
  const breadcrumbs = [
    {
      title: 'producingInfo',
    },
    {
      route: ROUTE.DEFINE_BOM.LIST.PATH,
      title: ROUTE.DEFINE_BOM.LIST.TITLE,
    },
    {
      route: ROUTE.DEFINE_BOM.DETAIL.PATH,
      title: ROUTE.DEFINE_BOM.DETAIL.TITLE,
    },
  ]

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
        sortable: false,
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
        sortable: false,
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

  useEffect(() => {
    actions.getBOMDetailsById(id)
    actions.getBOMStructureById(id)
    return () => {
      actions.resetBomState()
    }
  }, [id])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.DEFINE_BOM.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(BOMDetails?.status) && (
              <Grid item xs={12}>
                <LV
                  label={t('defineBOM.status')}
                  value={
                    <Status
                      options={BOM_STATUS_OPTIONS}
                      value={BOMDetails?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LV label={t('defineBOM.bomCode')} value={BOMDetails?.code} />
              <LV
                label={t('defineBOM.bomName')}
                value={BOMDetails?.name}
                mt={4 / 3}
              />
              <LV
                label={t('defineBOM.routingCode')}
                value={BOMDetails?.routingId}
                mt={4 / 3}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineBOM.item.code')}
                value={BOMDetails?.item?.code}
              />
              <LV
                label={t('defineBOM.item.name')}
                value={BOMDetails?.item?.name}
                mt={4 / 3}
              />
              <LV
                label={t('defineBOM.item.quantity')}
                value={BOMDetails?.item?.remainingQuantity}
                mt={4 / 3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineBOM.descriptionInput')}
                multiline
                value={BOMDetails.description}
                rows={3}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Tabs
        list={[t('defineBOM.itemDetails'), t('defineBOM.BOMStructure')]}
        sx={{ mt: 2 }}
      >
        {/* Tab 1 */}
        <ItemSettingTable items={BOMDetails?.bomDetails || []} mode={mode} />

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
            rows={BOMStructure}
            columns={getColumns}
            isRoot={true}
            isView={true}
            hideSetting
            hideFooter
          />
        </Box>
      </Tabs>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button onClick={backToList} color="grayF4">
          {t('common.back')}
        </Button>
      </Box>
    </Page>
  )
}

export default detailBOM
