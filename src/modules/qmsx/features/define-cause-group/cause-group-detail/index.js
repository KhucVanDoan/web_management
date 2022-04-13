import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineCauseGroup from '~/modules/qmsx/redux/hooks/useDefineCauseGroup'
import { ROUTE } from '~/modules/qmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_CAUSE_GROUP.LIST.PATH,
    title: ROUTE.DEFINE_CAUSE_GROUP.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_CAUSE_GROUP.DETAIL.PATH,
    title: ROUTE.DEFINE_CAUSE_GROUP.DETAIL.TITLE,
  },
]

function DefineCauseGroupDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, causeGroupDetail },
    actions,
  } = useDefineCauseGroup()

  useEffect(() => {
    const params = {
      id: id,
    }
    actions.getCauseGroupDetailById(params)
    return () => {
      actions.resetCauseGroupDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_CAUSE_GROUP.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineCauseGroupDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCauseGroup.code')}
                value={causeGroupDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCauseGroup.name')}
                value={causeGroupDetail?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCauseGroup.description')}
                multiline
                rows={3}
                value={causeGroupDetail?.description}
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

export default DefineCauseGroupDetail
