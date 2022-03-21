import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ROUTING_STATUS_OPTIONS } from '~/modules/mesx/constants'
import useRouting from '~/modules/mesx/redux/hooks/useRouting'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.ROUTING.LIST.PATH,
    title: ROUTE.ROUTING.LIST.TITLE,
  },
  {
    route: ROUTE.ROUTING.DETAIL.PATH,
    title: ROUTE.ROUTING.DETAIL.TITLE,
  },
]

const RoutingDetail = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { isLoading, routingDetails },
    actions,
  } = useRouting()

  useEffect(() => {
    actions.getRoutingDetailsById(id)
    return () => {
      actions.resetRoutingDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.ROUTING.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.routingDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('routing.status')}
                value={
                  <Status
                    options={ROUTING_STATUS_OPTIONS}
                    value={routingDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV label={t('routing.code')} value={routingDetails.code} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV label={t('routing.name')} value={routingDetails.name} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('routing.createdByUser')}
                // value={routingDetails}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('routing.createdAt')}
                value={routingDetails.createdAt}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('routing.description')}
                placeholder={t('routing.description')}
                multiline
                readOnly
                rows={3}
                value={routingDetails.description}
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
      <Box sx={{ mt: 3 }}>
        <ItemsSettingTable
          items={routingDetails?.producingSteps || []}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default RoutingDetail
