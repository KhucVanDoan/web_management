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
import { BOQ_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

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

const BOQDetail = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { isLoading, boqDetails },
    actions,
  } = useDefineBOQ()

  useEffect(() => {
    actions.getBOQDetailsById(id)
    return () => {
      actions.resetBOQDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_BOQ.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.DEFINE_BOQ.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineBOQ.status')}
                value={
                  <Status
                    options={BOQ_STATUS_OPTIONS}
                    value={boqDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV label={t('defineBOQ.boqCode')} value={boqDetails.code} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.boqPm')}
                value={
                  boqDetails?.pm?.fullName
                    ? boqDetails?.pm?.fullName
                    : boqDetails?.pm?.username
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV label={t('defineBOQ.boqName')} value={boqDetails.name} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.boqApm')}
                value={
                  boqDetails?.apm?.fullName
                    ? boqDetails?.apm?.fullName
                    : boqDetails?.apm?.username
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.boqPlanFrom')}
                value={convertUtcDateTimeToLocalTz(boqDetails?.planFrom)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.boqPlanTo')}
                value={convertUtcDateTimeToLocalTz(boqDetails?.planTo)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.user')}
                value={boqDetails.createdByUser?.username}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.createdAt')}
                value={convertUtcDateTimeToLocalTz(boqDetails.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineBOQ.descriptionInput')}
                placeholder={t('defineBOQ.descriptionInput')}
                multiline
                readOnly
                rows={3}
                value={boqDetails.description}
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
          items={boqDetails?.boqDetails || []}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>

      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default BOQDetail
