import React, { useEffect } from 'react'

import { Grid, Hidden } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  CHECK_POINT_DATA_TYPE_MAP,
  INVENTORY_CALENDAR_STATUS_OPTIONS,
  INVENTORY_TYPE,
  INVENTORY_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import ItemSettingTableRecipt from './item-setting-table-recipt'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.INVENTORY_CALENDAR.LIST.PATH,
    title: ROUTE.INVENTORY_CALENDAR.LIST.TITLE,
  },
  {
    route: ROUTE.INVENTORY_CALENDAR.DETAIL.PATH,
    title: ROUTE.INVENTORY_CALENDAR.DETAIL.TITLE,
  },
  {
    route: ROUTE.INVENTORY_CALENDAR.DETAIL_RECIPT.PATH,
    title: ROUTE.INVENTORY_CALENDAR.DETAIL_RECIPT.TITLE,
  },
]

const ReciptDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { inventoryCalendarDetails, isLoading },
    actions,
  } = useInventoryCalendar()

  useEffect(() => {
    actions.getInventoryCalendarDetailsById(id)
    return () => {
      actions.resetInventoryCalendarDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.INVENTORY_CALENDAR.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventorySheet')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('inventoryCalendar.status')}
                value={
                  <Status
                    options={INVENTORY_CALENDAR_STATUS_OPTIONS}
                    value={inventoryCalendarDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.code')}
                value={inventoryCalendarDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.name')}
                value={inventoryCalendarDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.inventoryType')}
                value={t(INVENTORY_TYPE_MAP[inventoryCalendarDetails?.type])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.executionDay')}
                value={convertUtcDateTimeToLocalTz(
                  inventoryCalendarDetails?.executionDay,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.warehouses')}
                value={inventoryCalendarDetails?.warehouses
                  ?.map((w) => w?.name)
                  .join(',')}
              />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12}></Grid>
            </Hidden>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.createdByUser')}
                value={inventoryCalendarDetails?.createdByUser?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.createdAt')}
                value={convertUtcDateTimeToLocalTz(
                  inventoryCalendarDetails?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.confirmByUser')}
                value={inventoryCalendarDetails?.confirmer?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.confirmedAt')}
                value={convertUtcDateTimeToLocalTz(
                  inventoryCalendarDetails?.confirmedAt,
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('inventoryCalendar.description')}
                multiline
                rows={3}
                value={inventoryCalendarDetails?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
            {inventoryCalendarDetails?.type === INVENTORY_TYPE.PERIODIC && (
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('inventoryCalendar.dataClosing')}
                  value={
                    CHECK_POINT_DATA_TYPE_MAP[
                      inventoryCalendarDetails?.checkPointDataType
                    ]
                  }
                />
              </Grid>
            )}
          </Grid>
          <ItemSettingTableRecipt />
        </Grid>
      </Grid>

      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default ReciptDetail