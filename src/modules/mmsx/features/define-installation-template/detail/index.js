import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineInstallationTemplate from '~/modules/mmsx/redux/hooks/useDefineInstallationTemplate'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemSettingTable from '../form/item-setting-table'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.INSTALLATION_TEMPLATE.LIST.PATH,
    title: ROUTE.INSTALLATION_TEMPLATE.LIST.TITLE,
  },
  {
    route: ROUTE.INSTALLATION_TEMPLATE.DETAIL.PATH,
    title: ROUTE.INSTALLATION_TEMPLATE.DETAIL.TITLE,
  },
]

const DefineInstallationTemplateDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const mode = MODAL_MODE.DETAIL
  const {
    data: { installDetail, isLoading },
    actions,
  } = useDefineInstallationTemplate()
  useEffect(() => {
    actions.getDetailTemplateInstall(id)
    return () => {
      actions.resetTempalteInstall()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.INSTALLATION_TEMPLATE.LIST.PATH)
  }
  const items = installDetail?.details?.map((data) => ({
    title: data?.title.trim(),
    description: data?.description.trim(),
    isRequire: data?.isRequire ? true : false,
  }))
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.templateInstallDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateInstall.form.field.code')}
                value={installDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('templateInstall.form.field.name')}
                value={installDetail?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('templateInstall.form.field.description')}
                multiline
                rows={3}
                value={installDetail?.description}
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
            <ItemSettingTable items={items} mode={mode} />
          </Box>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineInstallationTemplateDetail
