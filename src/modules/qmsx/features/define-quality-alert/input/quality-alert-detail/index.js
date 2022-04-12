import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
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
    route: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_INPUT.PATH,
    title: ROUTE.DEFINE_QUALITY_ALERT.DETAIL_INPUT.TITLE,
  },
]

function DefineQualityAlertInputDetail() {
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
      type: TYPE_QC_VALUE_TO_API.INPUT,
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
      title={t('menu.defineQualityAlertInputDetail')}
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
              <LV
                label={t('defineQualityAlert.orderCode')}
                value={qualityAlertDetail?.purchasedOrder?.code}
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
                label={t('defineQualityAlert.warehouseName')}
                value={qualityAlertDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.alertRelatedUsers')}
                value={qualityAlertDetail?.alertRelatedUsers
                  ?.map((x) => x?.username)
                  .join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityAlert.errorReportName')}
                value={qualityAlertDetail?.errorReport?.name}
              />
            </Grid>
            {qualityAlertDetail?.purchasedOrder?.vendor && (
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('defineQualityAlert.vendorName')}
                  value={qualityAlertDetail?.purchasedOrder?.vendor}
                />
              </Grid>
            )}
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
            {qualityAlertDetail?.errorReport?.id && (
              <Grid item lg={6} xs={12}>
                <Button
                  variant="text"
                  size="small"
                  bold={false}
                  component={Link}
                  to={ROUTE.DEFINE_ERROR_REPORT.DETAIL.PATH.replace(
                    ':id',
                    `${qualityAlertDetail?.errorReport?.id}`,
                  )}
                  sx={{ ml: '-10px' }}
                >
                  {t('defineQualityAlert.errorReportTitleLink')}
                </Button>
              </Grid>
            )}
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineQualityAlertInputDetail
