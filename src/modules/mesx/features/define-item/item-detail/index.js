import React, { useEffect } from 'react'

import { Grid, FormControlLabel, Checkbox } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import {
  DEFAULT_UNITS_MAP,
  WEIGHT_UNITS_MAP,
} from '~/modules/mesx/constants/index'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useDefineItem from '~/modules/mesx/redux/hooks/useDefineItem'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_ITEM.LIST.PATH,
    title: ROUTE.DEFINE_ITEM.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_ITEM.DETAIL.PATH,
    title: ROUTE.DEFINE_ITEM.DETAIL.TITLE,
  },
]

function DefineItemDetail() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()

  const { id } = useParams()
  const {
    data: { isLoading, itemDetails },
    actions,
  } = useDefineItem()

  const {
    data: {
      warehouseList,
      warehouseSectorList,
      warehouseShelfList,
      detailList,
    },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    actions.getItemDetailsById(id)
    commonManagementActions.getWarehouses()
    commonManagementActions.getWarehousesSector()
    commonManagementActions.getWarehousesShelf()
    commonManagementActions.getDetails()
    return () => {
      actions.resetItemDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_ITEM.LIST.PATH)
  }

  const getWarehouseName = (id) => {
    return warehouseList.find((item) => item?.id === id)
  }

  const getWarehouseSectorName = (id) => {
    return warehouseSectorList.find((item) => item?.id === id)
  }

  const getWarehouseShelfName = (id) => {
    return warehouseShelfList.find((item) => item?.id === id)
  }

  const getItemDetailName = (id) => {
    return detailList.find((item) => item.id === id)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineItemDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Tabs
            labels={[
              t('defineItem.commonInfo'),
              t('defineItem.storage'),
              t('defineItem.storageInfo'),
              t('defineItem.detail'),
            ]}
          >
            {/* Tab 1 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item xs={12} lg={6}>
                  <LV label={t('defineItem.code')} value={itemDetails?.code} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV label={t('defineItem.name')} value={itemDetails?.name} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineItem.typeCode')}
                    value={itemDetails?.itemType?.code}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineItem.typeName')}
                    value={itemDetails?.itemType?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineItem.typeCode')}
                    value={itemDetails?.itemGroup?.code}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineItem.typeName')}
                    value={itemDetails?.itemGroup?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineItem.unit')}
                    value={itemDetails?.itemUnit?.name}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineItem.price')}
                    value={itemDetails?.price}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineItem.expiry')}
                    value={itemDetails?.dayExpire}
                  />
                </Grid>
                <Grid item lg={6} xs={12} display="flex">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={itemDetails?.isProductionObject}
                        name="isProductionObject"
                        disabled
                      />
                    }
                    label={t('defineItem.isProductionObject')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label={t('defineItem.description')}
                    multiline
                    rows={3}
                    value={itemDetails?.description}
                    readOnly
                    sx={{
                      'label.MuiFormLabel-root': {
                        color: (theme) => theme.palette.subText.main,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV label={t('defineItem.user')} value={itemDetails?.user} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineItem.createTime')}
                    value={formatDateTimeUtc(itemDetails?.createdAt)}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Tab 2 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={itemDetails.hasStorageSpace}
                        name="storage"
                        disabled
                      />
                    }
                    label={t('defineItem.storage')}
                  />
                </Grid>
                {itemDetails.hasStorageSpace && (
                  <>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineItem.long')}
                        value={
                          itemDetails?.long?.value +
                          ' ' +
                          t(DEFAULT_UNITS_MAP[itemDetails?.long?.unit])
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineItem.height')}
                        value={
                          itemDetails?.height?.value +
                          ' ' +
                          t(DEFAULT_UNITS_MAP[itemDetails?.height?.unit])
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineItem.width')}
                        value={
                          itemDetails?.width?.value +
                          ' ' +
                          t(DEFAULT_UNITS_MAP[itemDetails?.width?.unit])
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineItem.weight')}
                        value={
                          itemDetails?.weight?.value +
                          ' ' +
                          t(WEIGHT_UNITS_MAP[itemDetails?.weight?.unit])
                        }
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>

            {/* Tab 3 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!itemDetails.itemWarehouseLocation}
                        name="isLocation"
                        disabled
                      />
                    }
                    label={t('defineItem.storageLocation')}
                  />
                </Grid>
                {!!itemDetails.itemWarehouseLocation && (
                  <>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineItem.warehouseName')}
                        value={
                          getWarehouseName(
                            itemDetails.itemWarehouseLocation?.warehouseId,
                          )?.name
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineItem.locationName')}
                        value={
                          getWarehouseSectorName(
                            itemDetails.itemWarehouseLocation
                              ?.warehouseSectorId,
                          )?.name
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineItem.shelfName')}
                        value={
                          getWarehouseShelfName(
                            itemDetails.itemWarehouseLocation?.warehouseShelfId,
                          )?.name
                        }
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>

            {/* Tab 4 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!itemDetails.itemDetails?.length}
                        name="isDetailed"
                        disabled
                      />
                    }
                    label={t('defineItem.isDetailed')}
                  />
                </Grid>
                {!!itemDetails.itemDetails &&
                  itemDetails.itemDetails?.map((item) => (
                    <>
                      <Grid item xs={12} lg={6}>
                        <LV
                          label={t('defineItem.detailName')}
                          value={getItemDetailName(item.itemDetailId)?.name}
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <LV
                          label={t('defineItem.detailAmount')}
                          value={Number(item.quantity)}
                        />
                      </Grid>
                    </>
                  ))}
              </Grid>
            </Box>
          </Tabs>

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={backToList} color="grayF4">
              {t('common.close')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineItemDetail
