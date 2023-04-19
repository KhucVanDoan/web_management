import React, { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
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
import ItemsSettingTable from '~/modules/wmsx/features/inventory-calendar/detail/items-setting-table'
import useInventoryCalendar from '~/modules/wmsx/redux/hooks/useInventoryCalendar'
import { ROUTE } from '~/modules/wmsx/routes/config'
import theme from '~/themes'
import { convertUtcDateToLocalTz } from '~/utils'

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
]

const InventoryCalendarDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
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
  const renderHeaderRight = () => {
    const hasEditDeleteBtn =
      inventoryCalendarDetails?.status === INVENTORY_CALENDAR_STATUS.PENDING ||
      inventoryCalendarDetails?.status === INVENTORY_CALENDAR_STATUS.REJECTED
    const isConfirmed =
      inventoryCalendarDetails?.status === INVENTORY_CALENDAR_STATUS.PENDING
    const isRejected =
      inventoryCalendarDetails?.status === INVENTORY_CALENDAR_STATUS.PENDING
    return (
      <>
        {isRejected && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_REJECT_INVENTORY}>
            <Button
              onClick={() => setIsOpenRejectedModal(true)}
              sx={{
                ml: 4 / 3,
                borderColor: theme.palette.borderButtonRemove,
                color: theme.palette.borderButtonRemove,
              }}
              variant="outlined"
              // icon="add"
            >
              {t('warehouseExportReceipt.rejected')}
            </Button>
          </Guard>
        )}
        {isConfirmed && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_CONFIRM_INVENTORY}>
            <Button
              onClick={() => setIsOpenConfirmModal(true)}
              sx={{
                ml: 4 / 3,
              }}

              // icon="add"
            >
              {t('warehouseExportReceipt.confirmed')}
            </Button>
          </Guard>
        )}
        {hasEditDeleteBtn && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_DELETE_INVENTORY}>
            <Button
              onClick={() => setIsOpenDeleteModal(true)}
              sx={{
                ml: 4 / 3,
              }}
              color="error"
              // icon="add"
            >
              {t('warehouseExportReceipt.deleted')}
            </Button>
          </Guard>
        )}
        {hasEditDeleteBtn && (
          <Guard code={FUNCTION_CODE.WAREHOUSE_UPDATE_INVENTORY}>
            <Button
              onClick={() =>
                history.push(
                  ROUTE.INVENTORY_CALENDAR.EDIT.PATH.replace(':id', `${id}`),
                )
              }
              sx={{
                ml: 4 / 3,
              }}
              color="grayEE"
              // icon="add"
            >
              {t('warehouseExportReceipt.update')}
            </Button>
          </Guard>
        )}
      </>
    )
  }

  const onSubmitDelete = () => {
    actions.deleteInventoryCalendar(inventoryCalendarDetails?.id, () => {
      actions.getInventoryCalendarDetailsById(id)
    })
    setIsOpenDeleteModal(false)
  }

  const submitConfirm = () => {
    actions.confirmInventoryCalendarById(inventoryCalendarDetails?.id, () => {
      actions.getInventoryCalendarDetailsById(id)
    })
    setIsOpenConfirmModal(false)
  }

  const onSubmitRejected = () => {
    actions.rejectInventoryCalendarById(inventoryCalendarDetails?.id, () => {
      actions.getInventoryCalendarDetailsById(id)
    })
    setIsOpenRejectedModal(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inventoryCalendarDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
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
                value={convertUtcDateToLocalTz(
                  inventoryCalendarDetails?.checkPointDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inventoryCalendar.executionDay')}
                value={`${convertUtcDateToLocalTz(
                  inventoryCalendarDetails?.executeFrom,
                )} - ${convertUtcDateToLocalTz(
                  inventoryCalendarDetails?.executeTo,
                )}`}
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
            {inventoryCalendarDetails?.status ===
              INVENTORY_CALENDAR_STATUS.CONFIRMED && (
              <>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('inventoryCalendar.confirmByUser')}
                    value={inventoryCalendarDetails?.confirmer?.fullName}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('inventoryCalendar.confirmedAt')}
                    value={convertUtcDateToLocalTz(
                      inventoryCalendarDetails?.confirmedAt,
                    )}
                  />
                </Grid>
              </>
            )}
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
                  value={t(
                    `${
                      CHECK_POINT_DATA_TYPE_MAP[
                        inventoryCalendarDetails?.checkPointDataType
                      ]
                    }`,
                  )}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {inventoryCalendarDetails?.type === INVENTORY_TYPE.UNEXPECTED && (
        <Box sx={{ mt: 3 }}>
          <ItemsSettingTable />
        </Box>
      )}
      <ActionBar
        onBack={backToList}
        sx={{ justifyContent: 'space-between' }}
        elBefore={
          <Button
            onClick={() =>
              history.push(
                ROUTE.INVENTORY_CALENDAR.DETAIL_RECIPT.PATH.replace(
                  ':id',
                  `${id}`,
                ),
              )
            }
          >
            {t(`inventoryCalendar.transactionListDetail`)}
          </Button>
        }
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('inventoryCalendar.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('inventoryCalendar.deleteConfirm')}
        <LV
          label={t('inventoryCalendar.code')}
          value={inventoryCalendarDetails?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventoryCalendar.name')}
          value={inventoryCalendarDetails?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('inventoryCalendar.code')}
          value={inventoryCalendarDetails?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventoryCalendar.name')}
          value={inventoryCalendarDetails?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenRejectedModal}
        title={t('inventoryCalendar.rejectedModalTitle')}
        onCancel={() => setIsOpenRejectedModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitRejected}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('inventoryCalendar.rejectedConfirm')}
        <LV
          label={t('inventoryCalendar.code')}
          value={inventoryCalendarDetails?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('inventoryCalendar.name')}
          value={inventoryCalendarDetails?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default InventoryCalendarDetail
