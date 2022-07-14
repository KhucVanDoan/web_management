import { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { ACTION_MAP, PRIORITY_LEVEL_MAP } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useDefect from '~/modules/mmsx/redux/hooks/useDefect'
import { ROUTE } from '~/modules/mmsx/routes/config'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.DEFECT_LIST.LIST.PATH,
    title: ROUTE.DEFECT_LIST.LIST.TITLE,
  },
  {
    route: ROUTE.DEFECT_LIST.DETAIL.PATH,
    title: ROUTE.DEFECT_LIST.DETAIL.TITLE,
  },
]
function DefectListDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { defectDetail, isLoading },
    actions,
  } = useDefect()

  useEffect(() => {
    actions.getDefect(id)
    return () => actions.resetDefectState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFECT_LIST.LIST.PATH)
  }

  const histories = defectDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`defectList.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defectListDetail')}
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
                  label={t('defectList.table.code')}
                  value={defectDetail?.code}
                />
                <LabelValue
                  label={t('defectList.table.name')}
                  value={defectDetail?.name}
                  mt={4 / 3}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LabelValue
                  label={t('defectList.form.deviceCode')}
                  value={defectDetail?.devices?.code}
                />
                <LabelValue
                  label={t('defectList.form.deviceName')}
                  value={defectDetail?.devices?.name}
                  mt={4 / 3}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <LabelValue
                  label={t('defectList.form.priority')}
                  value={t(PRIORITY_LEVEL_MAP[defectDetail?.priority])}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('defectList.form.description')}
                  placeholder={t('defectList.form.description')}
                  multiline
                  readOnly
                  rows={3}
                  value={defectDetail?.description}
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

export default DefectListDetail
