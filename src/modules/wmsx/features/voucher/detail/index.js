import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useVoucher from '~/modules/wmsx/redux/hooks/useVoucher'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz, convertUtcDateToLocalTz } from '~/utils'
const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_VOUCHER.LIST.PATH,
    title: ROUTE.DEFINE_VOUCHER.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_VOUCHER.DETAIL.PATH,
    title: ROUTE.DEFINE_VOUCHER.DETAIL.TITLE,
  },
]
function DefineVoucherDetail() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const {
    data: { isLoading, voucher },
    actions,
  } = useVoucher()

  useEffect(() => {
    actions.getVoucherById(id)
    return () => actions.resetVoucherDetailState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_VOUCHER.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.DEFINE_VOUCHER.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineVoucher.code')}
                value={voucher?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineVoucher.name')}
                value={voucher?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineVoucher.percentage')}
                value={voucher?.percentage}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('defineVoucher.date')}>
                {convertUtcDateToLocalTz(voucher.dateFrom)} -{' '}
                {convertUtcDateToLocalTz(voucher.dateTo)}
              </LabelValue>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineVoucher.createdBy')}
                value={voucher?.createdByUser?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineVoucher.createdAt')}
                value={convertUtcDateTimeToLocalTz(voucher?.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('productionOrder.description')}
                multiline
                value={voucher?.description}
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

export default DefineVoucherDetail
