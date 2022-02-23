import React, { useEffect } from 'react'

import { Typography, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useRouting from '~/modules/mesx/redux/hooks/useRouting'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.DEFINE_BOQ.LIST.PATH,
    title: ROUTE.DEFINE_BOQ.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_BOQ.DETAIL.PATH,
    title: ROUTE.DEFINE_BOQ.DETAIL.TITLE,
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
            <Grid item xs={12} lg={6}>
              <LV label={t('routing.code')} value={routingDetails.code} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <LV label={t('routing.name')} value={routingDetails.name} />
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
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={backToList} color="grayF4">
          {t('common.close')}
        </Button>
      </Box>
    </Page>
  )
}

export default RoutingDetail
