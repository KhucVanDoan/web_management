import React, { useEffect } from 'react'

import { Grid, Hidden } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { DATE_FORMAT, MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  PRODUCTION_QC_PLAN_STATUS,
  STAGE_OPTION_MAP,
} from '~/modules/qmsx/constants'
import useProductionQualityControlPlan from '~/modules/qmsx/redux/hooks/useProductionQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { formatDateTimeUtc } from '~/utils/date-time'

import PlanDetailTable from '../plan-detail-table'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_OUTPUT.PATH,
    title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_OUTPUT.TITLE,
  },
]

const ENDPOINT_PATCH_GET_DETAIL_PRODUCTION_OUTPUT = 'production-step-output'

function ProductionOutputQualityControlPlanDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { productionQcPlanDetail, isLoading },
    actions,
  } = useProductionQualityControlPlan()

  useEffect(() => {
    const paramsGetdetail = {
      id: id,
      endpointPatch: ENDPOINT_PATCH_GET_DETAIL_PRODUCTION_OUTPUT,
    }
    actions.getProductionQcPlanDetailById(paramsGetdetail)
    return () => {
      actions.resetProductionQcPlanDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.productionOutputQualityControlPlanDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(productionQcPlanDetail?.status) && (
              <Grid item xs={12}>
                <LV
                  label={t('productionQualityControlPlan.status')}
                  value={
                    <Status
                      options={PRODUCTION_QC_PLAN_STATUS}
                      value={productionQcPlanDetail?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('productionQualityControlPlan.code')}
                value={productionQcPlanDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('productionQualityControlPlan.name')}
                value={productionQcPlanDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('productionQualityControlPlan.stageQc')}
                value={t(STAGE_OPTION_MAP[+productionQcPlanDetail?.qcStageId])}
              />
            </Grid>
            <Hidden lgDown>
              <Grid item lg={6} xs={12}></Grid>
            </Hidden>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('productionQualityControlPlan.moCode')}
                value={productionQcPlanDetail?.mo?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('productionQualityControlPlan.moName')}
                value={productionQcPlanDetail?.mo?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('productionQualityControlPlan.moPlanDate')}
                value={`${formatDateTimeUtc(
                  productionQcPlanDetail?.mo?.planFrom,
                  DATE_FORMAT,
                )} - ${formatDateTimeUtc(
                  productionQcPlanDetail?.mo?.planTo,
                  DATE_FORMAT,
                )} `}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('productionQualityControlPlan.productionPlanCode')}
                value={productionQcPlanDetail?.moPlan?.code}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('productionQualityControlPlan.description')}
                multiline
                rows={3}
                value={productionQcPlanDetail?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={5 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ my: 2 }}
          >
            {/* Table */}
            <Grid item lg={12} xs={12}>
              <PlanDetailTable
                items={productionQcPlanDetail?.planBomOutputs}
                mode={MODAL_MODE.DETAIL}
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default ProductionOutputQualityControlPlanDetail
