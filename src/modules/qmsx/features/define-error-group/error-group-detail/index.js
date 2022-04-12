import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineErrorGroup from '~/modules/qmsx/redux/hooks/useDefineErrorGroup'
import { ROUTE } from '~/modules/qmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_ERROR_GROUP.LIST.PATH,
    title: ROUTE.DEFINE_ERROR_GROUP.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_ERROR_GROUP.DETAIL.PATH,
    title: ROUTE.DEFINE_ERROR_GROUP.DETAIL.TITLE,
  },
]

function DefineErrorGroupDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, errorGroupDetail },
    actions,
  } = useDefineErrorGroup()

  useEffect(() => {
    const params = {
      id: id,
    }
    actions.getErrorGroupDetailById(params)
    return () => {
      actions.resetErrorGroupDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_ERROR_GROUP.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineErrorGroupDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineErrorGroup.code')}
                value={errorGroupDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineErrorGroup.name')}
                value={errorGroupDetail?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineErrorGroup.description')}
                multiline
                rows={3}
                value={errorGroupDetail?.description}
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

export default DefineErrorGroupDetail
