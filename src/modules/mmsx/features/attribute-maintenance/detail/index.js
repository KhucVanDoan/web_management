import { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { ACTION_MAP } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useAttributeMaintenance from '~/modules/mmsx/redux/hooks/useAttributeMaintenance'
import { ROUTE } from '~/modules/mmsx/routes/config'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.ATTRIBUTE_MAINTENANCE.LIST.PATH,
    title: ROUTE.ATTRIBUTE_MAINTENANCE.LIST.TITLE,
  },
  {
    route: ROUTE.ATTRIBUTE_MAINTENANCE.DETAIL.PATH,
    title: ROUTE.ATTRIBUTE_MAINTENANCE.DETAIL.TITLE,
  },
]
function AttributeMaintenanceDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { attributeMaintainDetail, isLoading },
    actions,
  } = useAttributeMaintenance()

  useEffect(() => {
    actions.getDetailAttributeMaintenance(id)
    return () => actions.resetState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.ATTRIBUTE_MAINTENANCE.LIST.PATH)
  }

  const histories = attributeMaintainDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`attributeMaintenance.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.attributeMaintenanceDetail')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12} lg={6}>
                <LabelValue
                  label={t('attributeMaintenance.table.code')}
                  value={attributeMaintainDetail?.code}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LabelValue
                  label={t('attributeMaintenance.table.name')}
                  value={attributeMaintainDetail?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('attributeMaintenance.form.description')}
                  placeholder={t('attributeMaintenance.form.description')}
                  multiline
                  readOnly
                  rows={3}
                  value={attributeMaintainDetail?.description}
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
        <ActionBar onBack={backToList} />
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default AttributeMaintenanceDetail
