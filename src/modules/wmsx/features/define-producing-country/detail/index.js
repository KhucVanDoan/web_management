import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineProducingCountry from '~/modules/wmsx/redux/hooks/useDefineProducingCountry'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_PRODUCING_COUNTRY.LIST.PATH,
    title: ROUTE.DEFINE_PRODUCING_COUNTRY.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_PRODUCING_COUNTRY.DETAIL.PATH,
    title: ROUTE.DEFINE_PRODUCING_COUNTRY.DETAIL.TITLE,
  },
]

function DefineProducingCountryDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, producingCountryDetails },
    actions,
  } = useDefineProducingCountry()

  useEffect(() => {
    actions.getProducingCountryDetailsById(id)
    return () => {
      actions.resetProducingCountryDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_PRODUCING_COUNTRY.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineProducingCountryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineProducingCountry.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={producingCountryDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineProducingCountry.code')}
                value={producingCountryDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineProducingCountry.name')}
                value={producingCountryDetails.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineProducingCountry.description')}
                multiline
                rows={3}
                value={producingCountryDetails.description}
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

export default DefineProducingCountryDetail
