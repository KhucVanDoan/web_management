import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { CUSTOMER_LEVEL_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineCurrencyUnit from '~/modules/wmsx/redux/hooks/useDefineCurrencyUnit'
import useDefineCustomerLevel from '~/modules/wmsx/redux/hooks/useDefineCustomerLevel'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_CUSTOMER_LEVEL.LIST.PATH,
    title: ROUTE.DEFINE_CUSTOMER_LEVEL.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_CUSTOMER_LEVEL.DETAIL.PATH,
    title: ROUTE.DEFINE_CUSTOMER_LEVEL.DETAIL.TITLE,
  },
]

const DefineCustomerLevelDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, customerLevelDetails },
    actions,
  } = useDefineCustomerLevel()

  const {
    data: { currencyUnitList },
    actions: currActions,
  } = useDefineCurrencyUnit()

  useEffect(() => {
    currActions.searchCurrencyUnits()
  }, [])

  useEffect(() => {
    actions.getCustomerLevelDetailsById(id)
    return () => {
      actions.resetCustomerLevelDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_CUSTOMER_LEVEL.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineCustomerLevelDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineCustomerLevel.status')}
                value={
                  <Status
                    options={CUSTOMER_LEVEL_STATUS_OPTIONS}
                    value={customerLevelDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.code')}
                value={customerLevelDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.name')}
                value={customerLevelDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.date')}
                value={`${t('defineCustomerLevel.minJoinedDays')}
                  ${customerLevelDetails.minJoinedDays} 
                  ${t('defineCustomerLevel.maxJoinedDays')}
                  ${customerLevelDetails.maxJoinedDays}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.discount')}
                value={Number(customerLevelDetails.discount)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.cost')}
                value={`${t('defineCustomerLevel.amountFrom')}
                  ${customerLevelDetails.amountFrom} 
                  ${t('defineCustomerLevel.amountTo')}
                  ${customerLevelDetails.amountTo}`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.unit')}
                value={
                  currencyUnitList.find(
                    (item) => item.id === customerLevelDetails?.currencyUnitId,
                  )?.name
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.createdAt')}
                value={convertUtcDateTimeToLocalTz(
                  customerLevelDetails.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.updatedAt')}
                value={convertUtcDateTimeToLocalTz(
                  customerLevelDetails.updatedAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.createdByUser')}
                value={customerLevelDetails.createdByUser?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCustomerLevel.updatedByUser')}
                value={customerLevelDetails.latestEditedUser?.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCustomerLevel.description')}
                multiline
                rows={3}
                value={customerLevelDetails.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineCustomerLevelDetail
