import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { DEFINE_INVOICE_TYPE_STATUS_OPTION } from '~/modules/wmsx/constants'
import useInvoiceType from '~/modules/wmsx/redux/hooks/useInvoiceType'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'
const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.INVOICE_TYPE.LIST.PATH,
    title: ROUTE.INVOICE_TYPE.LIST.TITLE,
  },
  {
    route: ROUTE.INVOICE_TYPE.DETAIL.PATH,
    title: ROUTE.INVOICE_TYPE.DETAIL.TITLE,
  },
]
function InvoiceTypeDetail() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const {
    data: { isLoading, invoiceTypeDetail },
    actions,
  } = useInvoiceType()

  useEffect(() => {
    actions.getInvoiceTypeDetailById(id)
    return () => actions.resetInvoiceTypeDetail()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.INVOICE_TYPE.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.DEFINE_PAYMENT_TYPE.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LabelValue
                label={t('invoiceType.status')}
                value={
                  <Status
                    options={DEFINE_INVOICE_TYPE_STATUS_OPTION}
                    value={invoiceTypeDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('invoiceType.code')}
                value={invoiceTypeDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('invoiceType.name')}
                value={invoiceTypeDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('invoiceType.createAt')}
                value={convertUtcDateTimeToLocalTz(
                  invoiceTypeDetail?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('invoiceType.updateAt')}
                value={convertUtcDateTimeToLocalTz(
                  invoiceTypeDetail?.updatedAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('invoiceType.createdBy')}
                value={
                  invoiceTypeDetail?.createdByUser?.fullName ||
                  invoiceTypeDetail?.createdByUser?.username
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('invoiceType.updatedBy')}
                value={
                  invoiceTypeDetail?.latestEditedUser?.fullName ||
                  invoiceTypeDetail?.latestEditedUser?.username
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('invoiceType.description')}
                multiline
                value={invoiceTypeDetail?.description}
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
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default InvoiceTypeDetail
