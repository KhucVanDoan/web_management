import React, { useEffect, useMemo } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Link, useParams, useHistory } from 'react-router-dom'

import { DATE_FORMAT } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  OUTPUT_QC_PLAN_STATUS,
  STAGE_OPTION_MAP,
} from '~/modules/qmsx/constants'
import useOutputQualityControlPlan from '~/modules/qmsx/redux/hooks/useOutputQualityControlPlan'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { formatDateTimeUtc } from '~/utils/date-time'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.PATH,
    title: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.DETAIL.PATH,
    title: ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.DETAIL.TITLE,
  },
]
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

function OutputQualityControlPlanDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, outputQcPlanDetail },
    actions,
  } = useOutputQualityControlPlan()

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
        headerName: t('outputQualityControlPlan.headerDetailTable.productName'),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { item } = params?.row
          return item?.name
        },
      },
      {
        field: 'itemUnit',
        headerName: t('outputQualityControlPlan.headerDetailTable.itemUnit'),
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
          'outputQualityControlPlan.headerDetailTable.warehouseName',
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
        headerName: t('outputQualityControlPlan.headerDetailTable.qcCheck'),
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
          'outputQualityControlPlan.headerDetailTable.qualityControlPoint',
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
          'outputQualityControlPlan.headerDetailTable.numberOfTimesQc',
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
        headerName: t('outputQualityControlPlan.headerDetailTable.userQc1st'),
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
        headerName: t('outputQualityControlPlan.headerDetailTable.userQc2nd'),
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
        headerName: t('outputQualityControlPlan.headerDetailTable.qcPlanDate'),
        width: 180,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return `${formatDateTimeUtc(
            qualityPlanIOqcDetails[0]?.planFrom,
            DATE_FORMAT,
          )} - ${formatDateTimeUtc(
            qualityPlanIOqcDetails[0]?.planTo,
            DATE_FORMAT,
          )}  `
        },
      },
      {
        field: 'planErrorRate',
        headerName: t(
          'outputQualityControlPlan.headerDetailTable.planErrorRate',
        ),
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const { qualityPlanIOqcDetails } = params?.row
          return +qualityPlanIOqcDetails[0]?.planErrorRate
        },
      },
      {
        field: 'outputPlanQuantity',
        headerName: t(
          'outputQualityControlPlan.headerDetailTable.outputPlanQuantity',
        ),
        width: 150,
        align: 'center',
        renderCell: (params) => {
          const { planQuantity } = params?.row
          return +planQuantity
        },
      },
      {
        field: 'actualOutputQuantity',
        headerName: t(
          'outputQualityControlPlan.headerDetailTable.actualOutputQuantity',
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
          'outputQualityControlPlan.headerDetailTable.needQcQuantity',
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
          'outputQualityControlPlan.headerDetailTable.qcPlanQuantity',
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
          'outputQualityControlPlan.headerDetailTable.qcDoneQuantity',
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
          'outputQualityControlPlan.headerDetailTable.qcPassQuantity',
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
        headerName: t('outputQualityControlPlan.headerDetailTable.errorReport'),
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
              {t('outputQualityControlPlan.headerDetailTable.errorReport')}
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
    actions.getOutputQcPlanDetailById(params)
    return () => {
      actions.resetOutputQcPlanDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.OUTPUT_QUALITY_CONTROL_PLAN.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.outputQualityControlPlanDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(outputQcPlanDetail?.status) && (
              <Grid item xs={12}>
                <LV
                  label={t('outputQualityControlPlan.status')}
                  value={
                    <Status
                      options={OUTPUT_QC_PLAN_STATUS}
                      value={outputQcPlanDetail?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('outputQualityControlPlan.code')}
                value={outputQcPlanDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('outputQualityControlPlan.name')}
                value={outputQcPlanDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('outputQualityControlPlan.stageQc')}
                value={t(STAGE_OPTION_MAP[+outputQcPlanDetail?.qcStageId])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('outputQualityControlPlan.orderName')}
                value={outputQcPlanDetail?.order?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('outputQualityControlPlan.description')}
                multiline
                rows={3}
                value={outputQcPlanDetail?.description}
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
              <Box
                sx={{
                  display: 'block',
                  mb: 2,
                }}
              >
                <Typography variant="h4" component="span">
                  {t('outputQualityControlPlan.planDetailTableTitle')}
                </Typography>
              </Box>
              <DataTable
                rows={outputQcPlanDetail?.qualityPlanIOqcs}
                columns={columns}
                total={outputQcPlanDetail?.qualityPlanIOqcs?.length}
                striped={false}
                hideSetting
                hideFooter
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default OutputQualityControlPlanDetail
