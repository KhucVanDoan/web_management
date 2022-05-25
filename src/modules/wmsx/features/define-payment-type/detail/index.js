import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { DEFINE_PAYMENT_TYPE_STATUS_MAP } from '~/modules/wmsx/constants'
import useDefinePaymentType from '~/modules/wmsx/redux/hooks/useDefinePaymentType'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'
const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_PAYMENT_TYPE.LIST.PATH,
    title: ROUTE.DEFINE_PAYMENT_TYPE.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_PAYMENT_TYPE.DETAIL.PATH,
    title: ROUTE.DEFINE_PAYMENT_TYPE.DETAIL.TITLE,
  },
]
function DefinePaymentTypeDetail() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const {
    data: { isLoading, paymentTypeDetails },
    actions,
  } = useDefinePaymentType()

  useEffect(() => {
    actions.getPaymentTypeDetailsById(id)
    return () => actions.resetStatePaymentType()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_PAYMENT_TYPE.LIST.PATH)
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
            {!isNil(paymentTypeDetails?.status) && (
              <Grid item xs={12}>
                <LabelValue
                  label={t('definePaymentType.status')}
                  value={
                    <Status
                      options={DEFINE_PAYMENT_TYPE_STATUS_MAP}
                      value={paymentTypeDetails?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('definePaymentType.code')}
                value={paymentTypeDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('definePaymentType.name')}
                value={paymentTypeDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('definePaymentType.percentage')}
                value={paymentTypeDetails?.discount}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('definePaymentType.createAt')}
                value={convertUtcDateTimeToLocalTz(
                  paymentTypeDetails?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('definePaymentType.updateAt')}
                value={convertUtcDateTimeToLocalTz(
                  paymentTypeDetails?.updatedAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('definePaymentType.createdBy')}
                value={
                  paymentTypeDetails?.createdByUser?.fullName ||
                  paymentTypeDetails?.createdByUser?.username
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('definePaymentType.updatedBy')}
                value={
                  paymentTypeDetails?.latestEditedUser?.fullName ||
                  paymentTypeDetails?.latestEditedUser?.username
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('productionOrder.description')}
                multiline
                value={paymentTypeDetails?.description}
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

export default DefinePaymentTypeDetail
