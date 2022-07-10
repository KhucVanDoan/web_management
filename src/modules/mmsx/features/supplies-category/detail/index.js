import React, { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ACTION_MAP,
  SUPPLIES_CATEGORY_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useSuppliesCategory from '~/modules/mmsx/redux/hooks/useSuppliesCategory'
import { ROUTE } from '~/modules/mmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.SUPPLIES_CATEGORY.LIST.PATH,
    title: ROUTE.SUPPLIES_CATEGORY.LIST.TITLE,
  },
  {
    route: ROUTE.SUPPLIES_CATEGORY.DETAIL.PATH,
    title: ROUTE.SUPPLIES_CATEGORY.DETAIL.TITLE,
  },
]

const SuppliesCategoryDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { suppliesCategoryDetail, isLoading },
    actions,
  } = useSuppliesCategory()

  useEffect(() => {
    actions.getDetailSuppliesCategory(id)
    return () => {
      actions.resetSuppliesCategory()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.SUPPLIES_CATEGORY.LIST.PATH)
  }

  const histories = suppliesCategoryDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`suppliesCategory.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.suppliesCategoryDetail')}
      onBack={backToList}
      loading={isLoading}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('deviceCategory.form.status')}
                  value={
                    <Status
                      options={SUPPLIES_CATEGORY_STATUS_OPTIONS}
                      value={suppliesCategoryDetail?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesCategory.form.code')}
                  value={suppliesCategoryDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('suppliesCategory.form.name')}
                  value={suppliesCategoryDetail?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('suppliesCategory.form.description')}
                  multiline
                  rows={3}
                  value={suppliesCategoryDetail?.description}
                  readOnly
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <LV
                  label={t('suppliesCategory.responsibleUser')}
                  value={suppliesCategoryDetail?.responsibleUser?.name}
                />
              </Grid>
            </Grid>
            <ActionBar onBack={backToList} />
          </Grid>
        </Grid>
      </Paper>
      <Activities data={histories} />
    </Page>
  )
}

export default SuppliesCategoryDetail
