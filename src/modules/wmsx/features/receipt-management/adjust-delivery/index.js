import React, { useEffect, useMemo, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import {
  MODAL_MODE,
  NOTIFICATION_TYPE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTIVE_STATUS,
  RECEIPT_MANAGEMENT_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useReceiptManagement from '~/modules/wmsx/redux/hooks/useReceiptManagement'
import { searchApi } from '~/modules/wmsx/redux/sagas/reason-management/search'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'
import addNotification from '~/utils/toast'

import ItemSettingTableAdjustDelivery from './items-setting-table'
import { formSchema } from './schema'

const breadcrumbs = [
  {
    route: ROUTE.RECEIPT_MANAGEMENT.LIST.PATH,
    title: ROUTE.RECEIPT_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.RECEIPT_MANAGEMENT.ADJUST_DELIVERY.PATH,
    title: ROUTE.RECEIPT_MANAGEMENT.ADJUST_DELIVERY.TITLE,
  },
]

const AdjustDeliveryForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, receiptDetail },
    actions,
  } = useReceiptManagement()
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    actions.getReceiptDetailsById(id)
    return () => {
      actions.resetReceiptDetailsState()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`))
  }
  const initialValues = useMemo(() => {
    return {
      description: `${t(`menu.adjustDelivery`)} [${convertUtcDateToLocalTz(
        receiptDetail?.receiptDate,
      )}]`,
      reason: null,
      isReturned: false,
      items: receiptDetail?.items?.map((item) => ({
        ...item,
        code: item?.item?.code,
        name: item?.item?.name,
        unit: item?.item?.itemUnit,
        quantity: +item?.quantity,
        creditAccount: item?.creditAccount,
        debitAccount: item?.debitAccount,
        returnQuantity: +item?.payAbleQuantity,
        payAbleQuantity: +item?.payAbleQuantity,
      })),
    }
  }, [receiptDetail, id])
  const onSubmit = (values) => {
    const checkQuantityReturn = values?.items?.filter(
      (e) => e?.returnQuantity !== 0,
    )
    if (!isEmpty(checkQuantityReturn)) {
      const params = {
        id: +id,
        explainationReturn: values?.description,
        reasonId: +values?.reason?.id,
        isReturned: values?.isReturned,
        items: values?.items?.map((item) => ({
          receiptDetailId: +item?.id,
          itemId: item?.itemId,
          adjustedDeliveries: [
            {
              receiptDetailId: +item?.id,
              itemId: item?.itemId,
              quantityPaid: item?.returnQuantity,
            },
          ],
        })),
      }
      actions.adujustDeliverReceipt(
        params,
        (data) => {
          if (data?.statusCode === 200) {
            history.push(
              ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
            )
          } else {
            setOpenModal(true)
          }
        },
        (data) => {
          if (data?.statusCode === 500) {
            setOpenModal(true)
          }
        },
      )
    } else {
      addNotification(
        t('receiptManagement.receiptMessageQuantityReturn'),
        NOTIFICATION_TYPE.ERROR,
      )
    }
  }
  const handleclickretryEBS = () => {
    actions.receiptEBSById(id, (data) => {
      if (data?.statusCode === 200) {
        history.push(
          ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
        )
      } else {
        setOpenModal(true)
      }
    })
  }
  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onBack={backToList}
        onCancel={handleReset}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('receiptManagement.adjustDelivery')}
      onBack={backToList}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={formSchema(t)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item xs={12}>
                      <LV
                        label={t('general.status')}
                        value={
                          <Status
                            options={RECEIPT_MANAGEMENT_STATUS_OPTIONS}
                            value={Number(receiptDetail?.status)}
                          />
                        }
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('receiptManagement.receiptNo')}
                        value={receiptDetail?.receiptNumber}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('receiptManagement.code')}
                        value={receiptDetail?.code}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('receiptManagement.receiptDate')}
                        value={convertUtcDateToLocalTz(
                          receiptDetail?.receiptDate,
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('receiptManagement.deliver')}
                        value={receiptDetail?.deliver}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('receiptManagement.warehouseCode')}
                        value={receiptDetail?.warehouse?.code}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('receiptManagement.department')}
                        value={receiptDetail?.department}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={t('receiptManagement.contractNo')}
                        value={receiptDetail?.contractNumber}
                      />
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="reason"
                        label={t('receiptManagement.purpose')}
                        placeholder={t('receiptManagement.purpose')}
                        asyncRequest={(s) =>
                          searchApi({
                            keyword: s,
                            // limit: ASYNC_SEARCH_LIMIT,
                            isGetAll: ACTIVE_STATUS.ACTIVE,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                            sort: convertSortParams({
                              order: 'asc',
                              orderBy: 'code',
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('materialManagement.description')}
                        multiline
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <ItemSettingTableAdjustDelivery
                  items={values?.items || []}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </Box>
              {renderActionBar()}
              <Dialog
                open={openModal}
                title={t('receiptManagement.syncAdjustDelivery')}
                onCancel={() => {
                  setOpenModal(false)
                  history.push(
                    ROUTE.RECEIPT_MANAGEMENT.DETAIL.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }}
                cancelLabel={t('receiptManagement.closed')}
                onSubmit={handleclickretryEBS}
                submitLabel={t('receiptManagement.retry')}
                noBorderBottom
              >
                {t('receiptManagement.retrySyncEBSMessage')}
              </Dialog>
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default AdjustDeliveryForm
