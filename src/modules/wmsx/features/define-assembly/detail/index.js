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
import useDefineAssembly from '~/modules/wmsx/redux/hooks/useDefineAssembly'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_ASSEMBLY.LIST.PATH,
    title: ROUTE.DEFINE_ASSEMBLY.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_ASSEMBLY.DETAIL.PATH,
    title: ROUTE.DEFINE_ASSEMBLY.DETAIL.TITLE,
  },
]

function DefineAssemblyDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, assemblyDetails },
    actions,
  } = useDefineAssembly()

  useEffect(() => {
    actions.getAssemblyDetailsById(id)
    return () => {
      actions.resetAssemblyDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_ASSEMBLY.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineAssemblyDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineAssembly.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={assemblyDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineAssembly.code')}
                value={assemblyDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineAssembly.name')}
                value={assemblyDetails?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineAssembly.description')}
                multiline
                rows={3}
                value={assemblyDetails?.description}
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

export default DefineAssemblyDetail
