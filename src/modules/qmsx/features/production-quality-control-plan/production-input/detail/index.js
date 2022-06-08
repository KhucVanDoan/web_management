import React, { useEffect } from 'react'

import { Grid, Hidden } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import {
  PRODUCTION_QC_PLAN_STATUS,
  STAGE_OPTION_MAP,
} from '~/modules/qmsx/constants'
import useProductionQualityControlPlan from '~/modules/qmsx/redux/hooks/useProductionQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils/date-time'

import MaterialPlanDetailTable from '../material-plan-detail-table'
import PreviousPlanDetailTable from '../previous-plan-detail-table'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_INPUT.PATH,
    title: ROUTE.PRODUCTION_QUALITY_CONTROL_PLAN.DETAIL_PRODUCTION_INPUT.TITLE,
  },
]

const ENDPOINT_PATCH_GET_DETAIL_PRODUCTION_INPUT = 'production-step-input'

function ProductionInputQualityControlPlanDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { productionQcPlanDetail, isLoading },
    actions,
  } = useProductionQualityControlPlan()

  const TAB_PRODUCT_QC_PLAN_LIST = [
    {
      label: t('productionQualityControlPlan.tabs.productPrevious'),
    },
    {
      label: t('productionQualityControlPlan.tabs.material'),
    },
  ]

  useEffect(() => {
    const paramsGetdetail = {
      id: id,
      endpointPatch: ENDPOINT_PATCH_GET_DETAIL_PRODUCTION_INPUT,
    }
    actions.getProductionQcPlanDetailById(paramsGetdetail, _, backToList)
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
      title={t('menu.productionInputQualityControlPlanDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
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
                value={`${convertUtcDateToLocalTz(
                  productionQcPlanDetail?.mo?.planFrom,
                )} - ${convertUtcDateToLocalTz(
                  productionQcPlanDetail?.mo?.planTo,
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
        </Grid>
      </Grid>
      <Tabs list={TAB_PRODUCT_QC_PLAN_LIST} sx={{ mt: 3 }}>
        <Box>
          <PreviousPlanDetailTable
            planBomPrevious={productionQcPlanDetail?.planBomPrevious}
            mode={MODAL_MODE.DETAIL}
          />
        </Box>
        <Box>
          <MaterialPlanDetailTable
            planBomMaterials={productionQcPlanDetail?.planBomMaterials}
            mode={MODAL_MODE.DETAIL}
          />
        </Box>
      </Tabs>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default ProductionInputQualityControlPlanDetail
