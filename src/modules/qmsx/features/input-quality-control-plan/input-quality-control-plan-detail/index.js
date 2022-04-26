import React, { useEffect, useMemo } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Link, useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  INPUT_QC_PLAN_STATUS,
  STAGE_OPTION_MAP,
} from '~/modules/qmsx/constants'
import useInputQualityControlPlan from '~/modules/qmsx/redux/hooks/useInputQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils/date-time'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.INPUT_QUALITY_CONTROL_PLAN.DETAIL.PATH,
    title: ROUTE.INPUT_QUALITY_CONTROL_PLAN.DETAIL.TITLE,
  },
]
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

function InputQualityControlPlanDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, inputQcPlanDetail },
    actions,
  } = useInputQualityControlPlan()

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'itemName',
        headerName: t('inputQualityControlPlan.headerDetailTable.productName'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { item } = params?.row
          return item?.name
        },
      },
      {
        field: 'itemUnit',
        headerName: t('inputQualityControlPlan.headerDetailTable.itemUnit'),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { item } = params?.row
          return item?.unit
        },
      },
      {
        field: 'warehouseName',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.warehouseName',
        ),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { warehouse } = params?.row
          return warehouse?.name
        },
      },
      {
        field: 'qcCheck',
        headerName: t('inputQualityControlPlan.headerDetailTable.qcCheck'),
        width: 50,
        align: 'center',
        renderCell: (params) => {
          const { qcCheck } = params?.row
          return qcCheck ? checkedIcon : icon
        },
      },
      {
        field: 'qualityControlPoint',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.qualityControlPoint',
        ),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { qualityPoint } = params?.row
          return qualityPoint?.name
        },
      },
      {
        field: 'numberOfTimesQc',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.numberOfTimesQc',
        ),
        width: 50,
        align: 'center',
        renderCell: (params) => {
          const { qualityPoint } = params?.row
          return qualityPoint?.numberOfTime
        },
      },
      {
        field: 'userQc1st',
        headerName: t('inputQualityControlPlan.headerDetailTable.userQc1st'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return qualityPlanIOqcDetails[0]?.qualityPlanIOqcQualityPointUser1s
            ?.map((x) => x?.username)
            ?.join(', ')
        },
      },
      {
        field: 'userQc2nd',
        headerName: t('inputQualityControlPlan.headerDetailTable.userQc2nd'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return qualityPlanIOqcDetails[0]?.qualityPlanIOqcQualityPointUser2s
            ?.map((x) => x?.username)
            ?.join(', ')
        },
      },
      {
        field: 'qcPlanDate',
        headerName: t('inputQualityControlPlan.headerDetailTable.qcPlanDate'),
        width: 180,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return `${convertUtcDateToLocalTz(
            qualityPlanIOqcDetails[0]?.planFrom,
          )} - ${convertUtcDateToLocalTz(qualityPlanIOqcDetails[0]?.planTo)}  `
        },
      },
      {
        field: 'planErrorRate',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.planErrorRate',
        ),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return +qualityPlanIOqcDetails[0]?.planErrorRate
        },
      },
      {
        field: 'inputPlanQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.inputPlanQuantity',
        ),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { planQuantity } = params?.row
          return +planQuantity
        },
      },
      {
        field: 'actualInputQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.actualInputQuantity',
        ),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { actualQuantity } = params?.row
          return +actualQuantity
        },
      },
      {
        field: 'needQcQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.needQcQuantity',
        ),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { needQCQuantity } = params?.row
          return needQCQuantity
        },
      },
      {
        field: 'qcPlanQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.qcPlanQuantity',
        ),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return +qualityPlanIOqcDetails[0]?.planQcQuantity
        },
      },
      {
        field: 'qcDoneQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.qcDoneQuantity',
        ),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return +qualityPlanIOqcDetails[0]?.qcDoneQuantity
        },
      },
      {
        field: 'qcPassQuantity',
        headerName: t(
          'inputQualityControlPlan.headerDetailTable.qcPassQuantity',
        ),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return +qualityPlanIOqcDetails[0]?.qcPassQuantity
        },
      },
      {
        field: 'errorReport',
        headerName: t('inputQualityControlPlan.headerDetailTable.errorReport'),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { errorReportId } = params?.row
          return errorReportId?.length > 0 ? (
            <Button
              variant="text"
              size="small"
              bold={false}
              component={Link}
              to={
                ROUTE.DEFINE_ERROR_REPORT.LIST.PATH +
                '?errorReportId=' +
                errorReportId
              }
            >
              {t('inputQualityControlPlan.headerDetailTable.errorReport')}
            </Button>
          ) : (
            ''
          )
        },
      },
    ],
    [],
  )

  useEffect(() => {
    const params = {
      id: id,
    }
    actions.getInputQcPlanDetailById(params, _, backToList)
    return () => {
      actions.resetInputQcPlanDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.INPUT_QUALITY_CONTROL_PLAN.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.inputQualityControlPlanDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(inputQcPlanDetail?.status) && (
              <Grid item xs={12}>
                <LV
                  label={t('inputQualityControlPlan.status')}
                  value={
                    <Status
                      options={INPUT_QC_PLAN_STATUS}
                      value={inputQcPlanDetail?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inputQualityControlPlan.code')}
                value={inputQcPlanDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inputQualityControlPlan.name')}
                value={inputQcPlanDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inputQualityControlPlan.stageQc')}
                value={t(STAGE_OPTION_MAP[+inputQcPlanDetail?.qcStageId])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('inputQualityControlPlan.orderName')}
                value={inputQcPlanDetail?.order?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('inputQualityControlPlan.description')}
                multiline
                rows={3}
                value={inputQcPlanDetail?.description}
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
      <Grid
        container
        rowSpacing={4 / 3}
        columnSpacing={{ xl: 8, xs: 4 }}
        sx={{ my: 2 }}
      >
        {/* Table */}
        <Grid item lg={12} xs={12}>
          <Box
            sx={{
              display: 'block',
              mb: 2,
            }}
          >
            <Typography variant="h4" component="span">
              {t('inputQualityControlPlan.planDetailTableTitle')}
            </Typography>
          </Box>
          <DataTable
            rows={inputQcPlanDetail?.qualityPlanIOqcs}
            columns={columns}
            total={inputQcPlanDetail?.qualityPlanIOqcs?.length}
            striped={false}
            hideSetting
            hideFooter
          />
        </Grid>
      </Grid>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default InputQualityControlPlanDetail
