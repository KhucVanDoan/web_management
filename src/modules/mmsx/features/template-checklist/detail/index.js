import React, { useEffect } from 'react'

import { Box, Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { ACTION_MAP, CHECK_TYPE_MAP } from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useTemplateChecklist from '~/modules/mmsx/redux/hooks/useTemplateChecklist'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.TEMPLATE_CHECKLIST.LIST.PATH,
    title: ROUTE.TEMPLATE_CHECKLIST.LIST.TITLE,
  },
  {
    route: ROUTE.TEMPLATE_CHECKLIST.DETAIL.PATH,
    title: ROUTE.TEMPLATE_CHECKLIST.DETAIL.TITLE,
  },
]

const TemplateChecklistDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const mode = MODAL_MODE.DETAIL

  const {
    data: { templateChecklistDetail, isLoading },
    actions,
  } = useTemplateChecklist()

  useEffect(() => {
    actions.getTemplateCheckList(id)
    return () => {
      actions.resetTemplateChecklist()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.TEMPLATE_CHECKLIST.LIST.PATH)
  }

  const formattedItems = templateChecklistDetail?.details?.map((detail) => ({
    title: detail.title,
    descriptionDetail: detail.description,
    obligatory: detail.obligatory === 1 ? true : false,
  }))

  const histories = templateChecklistDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`templateChecklist.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.templateChecklistDetail')}
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
                  label={t('templateChecklist.form.code')}
                  value={templateChecklistDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('templateChecklist.form.name')}
                  value={templateChecklistDetail?.name}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('templateChecklist.form.checkType')}
                  value={t(CHECK_TYPE_MAP[templateChecklistDetail?.checkType])}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('templateChecklist.form.description')}
                  multiline
                  rows={3}
                  value={templateChecklistDetail?.description}
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

export default TemplateChecklistDetail
