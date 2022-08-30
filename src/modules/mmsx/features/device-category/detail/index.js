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
  DEVICE_CATEGORY_STATUS_OPTION,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useDeviceCategory from '~/modules/mmsx/redux/hooks/useDeviceCategory'
import { ROUTE } from '~/modules/mmsx/routes/config'
const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEVICE_CATEGORY.LIST.PATH,
    title: ROUTE.DEVICE_CATEGORY.LIST.TITLE,
  },
  {
    route: ROUTE.DEVICE_CATEGORY.DETAIL.PATH,
    title: ROUTE.DEVICE_CATEGORY.DETAIL.TITLE,
  },
]

const DeviceCategoryDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { deviceCategoryDetail, isLoading },
    actions,
  } = useDeviceCategory()
  useEffect(() => {
    actions.getDeviceCategoryDetail(id)
    return () => {
      actions.resetDeviceCategory()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.DEVICE_CATEGORY.LIST.PATH)
  }
  // const renderHeaderRight = () => {
  //   return (
  //     <>
  //       <Box>
  //         <Button variant="outlined" sx={{ ml: 4 / 3 }}>
  //           {t('deviceCategory.button.device')}
  //         </Button>
  //         <Button variant="outlined" sx={{ ml: 4 / 3 }}>
  //           {t('deviceCategory.button.job')}
  //         </Button>
  //       </Box>
  //     </>
  //   )
  // }
  const histories = deviceCategoryDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`deviceCategory.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceCategoryDetail')}
      onBack={backToList}
      loading={isLoading}
      // renderHeaderRight={renderHeaderRight}
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
                      options={DEVICE_CATEGORY_STATUS_OPTION}
                      value={deviceCategoryDetail?.status}
                    />
                  }
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceCategory.form.field.code')}
                  value={deviceCategoryDetail?.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('deviceCategory.form.field.name')}
                  value={deviceCategoryDetail?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('deviceCategory.form.field.description')}
                  multiline
                  rows={3}
                  value={deviceCategoryDetail?.description}
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
                  label={t('deviceCategory.responsibleUser')}
                  value={deviceCategoryDetail?.responsibleUser?.name}
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

export default DeviceCategoryDetail
