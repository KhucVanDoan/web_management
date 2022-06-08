import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { DEFINE_CURRENCY_UNIT_OPTIONS } from '~/modules/wmsx/constants'
import useDefineCurrencyUnit from '~/modules/wmsx/redux/hooks/useDefineCurrencyUnit'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_CURRENCY_UNIT.LIST.PATH,
    title: ROUTE.DEFINE_CURRENCY_UNIT.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_CURRENCY_UNIT.DETAIL.PATH,
    title: ROUTE.DEFINE_CURRENCY_UNIT.DETAIL.TITLE,
  },
]

const DefineCurrencyUnitDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, currencyUnitDetails },
    actions,
  } = useDefineCurrencyUnit()

  useEffect(() => {
    actions.getCurrencyUnitDetailsById(id)
    return () => {
      actions.resetCurrencyUnitState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_CURRENCY_UNIT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.typeUnitDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineCurrencyUnit.status')}
                value={
                  <Status
                    options={DEFINE_CURRENCY_UNIT_OPTIONS}
                    value={currencyUnitDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCurrencyUnit.code')}
                value={currencyUnitDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCurrencyUnit.name')}
                value={currencyUnitDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCurrencyUnit.createdAt')}
                value={convertUtcDateTimeToLocalTz(
                  currencyUnitDetails.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCurrencyUnit.updatedAt')}
                value={convertUtcDateTimeToLocalTz(
                  currencyUnitDetails.updatedAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCurrencyUnit.createdBy')}
                value={currencyUnitDetails?.createdByUser?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCurrencyUnit.updatedBy')}
                value={currencyUnitDetails?.latestEditedUser?.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCurrencyUnit.description')}
                multiline
                rows={3}
                value={currencyUnitDetails.description}
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

export default DefineCurrencyUnitDetail
