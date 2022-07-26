import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  LETTER_TYPE_MAP,
  RETURN_ORDER_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useReturnOrder from '~/modules/wmsx/redux/hooks/useReturnOrder'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import ItemSettingTable from '../form/item-setting-table'

const breadcrumbs = [
  {
    title: 'orderManagement',
  },
  {
    route: ROUTE.RETURN_ORDER.LIST.PATH,
    title: ROUTE.RETURN_ORDER.LIST.TITLE,
  },
  {
    route: ROUTE.RETURN_ORDER.DETAIL.PATH,
    title: ROUTE.RETURN_ORDER.DETAIL.TITLE,
  },
]

const ReturnOrderDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const mode = MODAL_MODE.DETAIL

  const { id } = useParams()
  const {
    data: { returnOrderDetails, isLoading },
    actions,
  } = useReturnOrder()

  const {
    data: { itemList },
    actions: commonActions,
  } = useCommonManagement()

  useEffect(() => {
    commonActions.getItems({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    actions.getReturnOrderDetailsById(id)
    return () => {
      actions.resetReturnOrder()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.RETURN_ORDER.LIST.PATH)
  }

  const formattedItems = returnOrderDetails?.returnOrderWarehouseLots?.map(
    (roItem) => {
      const item = itemList.find((i) => i.id === roItem?.itemId)
      return {
        itemName: item?.name,
        itemCode: item?.code,
        lotNumber: roItem?.lotNumber,
        mfg: roItem?.mfg,
        packageId: roItem?.package?.code,
        planQuantity: roItem?.quantity,
        actualQuantity: roItem?.actualQuantity,
        unit: item?.itemUnit?.name,
        evenRow: roItem?.isEven === 1 ? true : false,
        palletId: roItem?.pallet?.code,
        location: roItem?.suggestItemLocation?.name,
      }
    },
  )

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.returnOrderDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('returnOrder.status')}
                value={
                  <Status
                    options={RETURN_ORDER_STATUS_OPTIONS}
                    value={returnOrderDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.code')}
                value={returnOrderDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.name')}
                value={returnOrderDetails?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <LV
                label={t('returnOrder.letterType')}
                value={t(LETTER_TYPE_MAP[returnOrderDetails?.returnType])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.letterCode')}
                value={returnOrderDetails?.order?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.letterName')}
                value={returnOrderDetails?.order?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.orderCode')}
                value={returnOrderDetails?.orderDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.orderName')}
                value={returnOrderDetails?.orderDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.warehouse')}
                value={
                  returnOrderDetails?.returnOrderWarehouseDetails?.[0]
                    ?.warehouse?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.planDate')}
                value={convertUtcDateTimeToLocalTz(
                  returnOrderDetails?.deadline,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.createdByUser')}
                value={returnOrderDetails?.createdByUser?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('returnOrder.confirmByUser')}
                value={returnOrderDetails?.confirmByUser?.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('returnOrder.description')}
                multiline
                rows={3}
                value={returnOrderDetails?.description}
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
      <Box sx={{ mt: 3 }}>
        <ItemSettingTable items={formattedItems || []} mode={mode} />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default ReturnOrderDetail
