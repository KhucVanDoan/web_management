import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineDetail from '~/modules/wmsx/redux/hooks/useDefineDetail'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'defineCategory',
  },
  {
    route: ROUTE.DEFINE_DETAIL.LIST.PATH,
    title: ROUTE.DEFINE_DETAIL.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_DETAIL.DETAIL.PATH,
    title: ROUTE.DEFINE_DETAIL.DETAIL.TITLE,
  },
]

const DefineDetailDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, detailDetails },
    actions,
  } = useDefineDetail()

  useEffect(() => {
    actions.getDetailDetailsById(id)
    return () => {
      actions.resetDetailDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_DETAIL.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineDetailDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineDetail.code')} value={detailDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineDetail.name')} value={detailDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineDetail.createdAt')}
                value={convertUtcDateTimeToLocalTz(detailDetails.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineDetail.updatedAt')}
                value={convertUtcDateTimeToLocalTz(detailDetails.updatedAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineDetail.description')}
                multiline
                rows={3}
                value={detailDetails.description}
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

export default DefineDetailDetail
