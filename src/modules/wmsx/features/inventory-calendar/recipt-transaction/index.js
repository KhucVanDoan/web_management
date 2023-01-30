import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  CHECK_POINT_DATA_TYPE_MAP,
  INVENTORY_CALENDAR_STATUS,
  INVENTORY_CALENDAR_STATUS_OPTIONS,
  INVENTORY_TYPE,
  INVENTORY_TYPE_MAP,
} from '~/modules/wmsx/constants'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'
import { checkItemNotExecutedApi } from '~/modules/wmsx/redux/sagas/inventory-calendar/check-items-not-executed'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz, convertUtcDateToLocalTz } from '~/utils'

import ItemSettingTableRecipt from './item-setting-table-recipt'

const ReciptDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const [openModal, setOpenModal] = useState(false)
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
  const breadcrumbs = [
    {
      title: 'receiptCommandManagement',
    },
    {
      route: ROUTE.INVENTORY_CALENDAR.LIST.PATH,
      title: ROUTE.INVENTORY_CALENDAR.LIST.TITLE,
    },
    {
      route: ROUTE.INVENTORY_CALENDAR.DETAIL.PATH.replace(':id', id),
      title: ROUTE.INVENTORY_CALENDAR.DETAIL.TITLE,
    },
    {
      route: ROUTE.INVENTORY_CALENDAR.DETAIL_RECIPT.PATH,
      title: ROUTE.INVENTORY_CALENDAR.DETAIL_RECIPT.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.INVENTORY_CALENDAR.LIST.PATH)
  }
  const handleClick = async () => {
    const res = await checkItemNotExecutedApi(id)
    if (res?.statusCode === 200) {
      actions.approveInventoryCalendarById(id, backToList)
    } else {
      setOpenModal(true)
    }
  }
  const onSubmit = () => {
    actions.approveInventoryCalendarById(id, backToList)
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
                label={t('inventoryCalendar.closingDay')}
                value={convertUtcDateTimeToLocalTz(
                  inventoryCalendarDetails?.checkPointDate,
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
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.impersonators')}
                value={inventoryCalendarDetails?.impersonators
                  ?.map((w) => w?.fullName)
                  .join(',')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.executionDay')}
                value={`${convertUtcDateToLocalTz(
                  inventoryCalendarDetails?.executeFrom,
                )}-${convertUtcDateToLocalTz(
                  inventoryCalendarDetails?.executeTo,
                )}`}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.createdByUser')}
                value={inventoryCalendarDetails?.createdByUser?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.createdAt')}
                value={convertUtcDateToLocalTz(
                  inventoryCalendarDetails?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.updatedByUser')}
                value={inventoryCalendarDetails?.updatedBy?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.updatedAt')}
                value={convertUtcDateToLocalTz(
                  inventoryCalendarDetails?.updatedAt,
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
                  value={`${t(
                    CHECK_POINT_DATA_TYPE_MAP[
                      inventoryCalendarDetails?.checkPointDataType
                    ],
                  )}`}
                />
              </Grid>
            )}
          </Grid>
          <Box mt={2}>
            <ItemSettingTableRecipt />
          </Box>
        </Grid>
      </Grid>
      <ActionBar
        onBack={backToList}
        elAfter={
          inventoryCalendarDetails?.status ===
          INVENTORY_CALENDAR_STATUS.IN_PROGRESS ? (
            <Button onClick={handleClick}>
              <Icon name="confirm" mr={1} />
              {t(`inventoryCalendar.approve`)}
            </Button>
          ) : (
            ''
          )
        }
      />
      <Dialog
        open={openModal}
        title={t('general:common.notify')}
        onCancel={() => setOpenModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmit}
        submitLabel={t('general:common.yes')}
        noBorderBottom
        submitProps={{
          color: 'error',
        }}
      >
        {t('inventoryCalendar.titleApprove')}
      </Dialog>
    </Page>
  )
}

export default ReciptDetail
