import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { UOM_ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineUom from '~/modules/wmsx/redux/hooks/useDefineUom'
import { ROUTE } from '~/modules/wmsx/routes/config'

function DefineUomDetail() {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const history = useHistory()
  const {
    data: { isLoading, uomDetails },
    actions,
  } = useDefineUom()
  const breadcrumbs = [
    {
      title: 'database',
    },
    {
      route: ROUTE.DEFINE_UOM.LIST.PATH,
      title: ROUTE.DEFINE_UOM.LIST.TITLE,
    },
    {
      route: ROUTE.DEFINE_UOM.DETAIL.PATH,
      title: ROUTE.DEFINE_UOM.DETAIL.TITLE,
    },
  ]

  useEffect(() => {
    actions.getUomDetailsById(id)
    return () => {
      actions.resetUomDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_UOM.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineUomDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineUom.status')}
                value={
                  <Status
                    options={UOM_ACTIVE_STATUS_OPTIONS}
                    value={uomDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineUom.code')} value={uomDetails?.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineUom.name')} value={uomDetails?.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineUom.shortName')}
                value={uomDetails?.shortName}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex">
                <TextField
                  name="description"
                  label={t('defineUom.description')}
                  multiline
                  value={uomDetails.description}
                  rows={3}
                  readOnly
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}
export default DefineUomDetail
