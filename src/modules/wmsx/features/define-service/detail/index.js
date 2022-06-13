import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import NumberFormatText from '~/components/NumberFormat'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { DEFINE_SERVICE_OPTIONS } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useDefineCurrencyUnit from '~/modules/wmsx/redux/hooks/useDefineCurrencyUnit'
import useDefineService from '~/modules/wmsx/redux/hooks/useDefineService'
import useDefineTypeUnit from '~/modules/wmsx/redux/hooks/useDefineTypeUnit'
import useVoucher from '~/modules/wmsx/redux/hooks/useVoucher'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_SERVICE.LIST.PATH,
    title: ROUTE.DEFINE_SERVICE.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_SERVICE.DETAIL.PATH,
    title: ROUTE.DEFINE_SERVICE.DETAIL.TITLE,
  },
]

const DefineServiceDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, serviceDetails },
    actions,
  } = useDefineService()

  const {
    data: { currencyUnitList },
    actions: currencyUnitActions,
  } = useDefineCurrencyUnit()

  const {
    data: { typeUnitsList },
    actions: typeUnitActions,
  } = useDefineTypeUnit()

  const {
    data: { voucherList },
    actions: voucherActions,
  } = useVoucher()

  const {
    data: { typeServiceList },
    actions: commonActions,
  } = useCommonManagement()

  useEffect(() => {
    actions.getServiceDetailById(id)
    currencyUnitActions.searchCurrencyUnits({ isGetAll: 1 })
    typeUnitActions.searchTypeUnits({ isGetAll: 1 })
    voucherActions.searchVoucher({ isGetAll: 1 })
    commonActions.getTypeServices({ isGetAll: 1 })
    return () => {
      actions.resetServiceDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_SERVICE.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.serviceDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineService.status')}
                value={
                  <Status
                    options={DEFINE_SERVICE_OPTIONS}
                    value={serviceDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineService.code')} value={serviceDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineService.name')} value={serviceDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.currencyUnit')}
                value={
                  currencyUnitList?.find(
                    (cru) => cru?.id === serviceDetails?.currencyUnitId,
                  )?.name || ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.pricePerDay')}
                value={<NumberFormatText value={serviceDetails?.pricePerDay} />}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.serviceType')}
                value={
                  typeServiceList?.find(
                    (cru) => cru?.id === serviceDetails?.serviceTypeId,
                  )?.name || ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.pricePerMonth')}
                value={
                  <NumberFormatText value={serviceDetails?.pricePerMonth} />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.rentUnit')}
                value={
                  typeUnitsList?.find(
                    (cru) => cru?.id === serviceDetails?.rentUnitId,
                  )?.name || ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.pricePerQuarter')}
                value={
                  <NumberFormatText value={serviceDetails?.pricePerQuarter} />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.discountCode')}
                value={
                  voucherList?.find(
                    (cru) => cru?.id === serviceDetails?.voucherId,
                  )?.name || ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.pricePerYear')}
                value={
                  <NumberFormatText value={serviceDetails?.pricePerYear} />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.createdAt')}
                value={convertUtcDateTimeToLocalTz(serviceDetails.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.updatedAt')}
                value={convertUtcDateTimeToLocalTz(serviceDetails.updatedAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.createdBy')}
                value={serviceDetails?.createdByUser?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineService.updatedBy')}
                value={serviceDetails?.latestEditedUser?.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineService.descriptionInput')}
                multiline
                rows={3}
                value={serviceDetails.description}
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

export default DefineServiceDetail
