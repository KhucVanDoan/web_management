import React, { useEffect } from 'react'

import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  QUALITY_ALERT_STATUS,
  STAGE_OPTION_MAP,
  TYPE_QC_VALUE_TO_API,
} from '~/modules/qmsx/constants'
import useDefineQualityAlert from '~/modules/qmsx/redux/hooks/useDefineQualityAlert'
import { ROUTE } from '~/modules/qmsx/routes/config'

const breadcrumbs = [
  {
    title: 'qualityControl',
  },
  {
    route: ROUTE.DEFINE_QUALITY_ALERT.LIST.PATH,
    title: ROUTE.DEFINE_QUALITY_ALERT.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_PRODUCTION_INPUT.PATH,
    title: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_PRODUCTION_INPUT.TITLE,
  },
]

function DefineQualityAlertProductionInputDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, qualityAlertDetail },
    actions,
  } = useDefineQualityAlert()

  useEffect(() => {
    const params = {
      id: id,
      type: TYPE_QC_VALUE_TO_API.PRODUCTION,
    }
    actions.getQualityAlertDetailById(params)
    return () => {
      actions.resetQualityAlertDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_QUALITY_ALERT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineQualityAlertProductionInputDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineQualityAlert.status')}
                value={
                  <Status
                    options={QUALITY_ALERT_STATUS}
                    value={qualityAlertDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.code')}
                value={qualityAlertDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.name')}
                value={qualityAlertDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.stageQc')}
                value={t(STAGE_OPTION_MAP[+qualityAlertDetail?.stage])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineQualityAlert.productType')}>
                <RadioGroup
                  value={String(qualityAlertDetail?.productType)}
                  name="radio-buttons-group-number-of-time"
                >
                  <FormControlLabel
                    value={'1'}
                    control={<Radio />}
                    label={t(
                      'defineQualityAlert.productTypeOptionText.material',
                    )}
                    sx={{ pointerEvents: 'none', mt: '-9px' }}
                  />
                  <FormControlLabel
                    value={'2'}
                    control={<Radio />}
                    label={t(
                      'defineQualityAlert.productTypeOptionText.productPrevious',
                    )}
                    sx={{ pointerEvents: 'none' }}
                  />
                </RadioGroup>
              </LV>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.moName')}
                value={qualityAlertDetail?.manufacturingOrder?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.productCode')}
                value={qualityAlertDetail?.item?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.routingName')}
                value={qualityAlertDetail?.routing?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.producingStepName')}
                value={qualityAlertDetail?.producingStep?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineQualityAlert.alertContent')}
                multiline
                rows={3}
                value={qualityAlertDetail?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineQualityAlertProductionInputDetail
