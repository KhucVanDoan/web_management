import React, { useEffect } from 'react'

import { Box, Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { ACTION_MAP, MAINTENANCE_TEAM_TYPE_MAP } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useMaintenanceTeam from '~/modules/mmsx/redux/hooks/useMaintenanceTeam'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.MAINTENANCE_TEAM.LIST.PATH,
    title: ROUTE.MAINTENANCE_TEAM.LIST.TITLE,
  },
  {
    route: ROUTE.MAINTENANCE_TEAM.DETAIL.PATH,
    title: ROUTE.MAINTENANCE_TEAM.DETAIL.TITLE,
  },
]

const MaintenanceTeamDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const mode = MODAL_MODE.DETAIL

  const {
    data: { maintenanceTeamDetail, isLoading },
    actions,
  } = useMaintenanceTeam()

  useEffect(() => {
    actions.getDetailMaintenanceTeamStart(id)
    return () => {
      actions.resetMaintenanceTeam()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.MAINTENANCE_TEAM.LIST.PATH)
  }

  const formattedItems = maintenanceTeamDetail?.members?.map((item) => ({
    username: item?.username,
    role: item?.role,
  }))

  const histories = maintenanceTeamDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`maintenanceTeam.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.maintenanceTeamDetail')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenanceTeam.team.code')}
                  value={maintenanceTeamDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenanceTeam.team.name')}
                  value={maintenanceTeamDetail?.name}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('maintenanceTeam.type')}
                  value={t(
                    MAINTENANCE_TEAM_TYPE_MAP[maintenanceTeamDetail?.type],
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('maintenanceTeam.team.description')}
                  multiline
                  rows={3}
                  value={maintenanceTeamDetail?.description}
                  readOnly
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <ItemSettingTable items={formattedItems || []} mode={mode} />
            </Box>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default MaintenanceTeamDetail
