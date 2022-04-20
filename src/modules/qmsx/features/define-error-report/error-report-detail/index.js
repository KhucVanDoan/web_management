import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  ERROR_REPORT_STATUS,
  PRIORITY_MAP,
  STAGE_OPTION,
  TYPE_QUALITY_PLAN_BOM,
} from '~/modules/qmsx/constants'
import useDefineErrorReport from '~/modules/qmsx/redux/hooks/useDefineErrorReport'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'qualityControl',
  },
  {
    route: ROUTE.DEFINE_ERROR_REPORT.LIST.PATH,
    title: ROUTE.DEFINE_ERROR_REPORT.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_ERROR_REPORT.DETAIL.PATH,
    title: ROUTE.DEFINE_ERROR_REPORT.DETAIL.TITLE,
  },
]

function DefineErrorReportDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, errorReportDetail },
    actions,
  } = useDefineErrorReport()

  const {
    status,
    code,
    name,
    createdBy,
    createdAt,
    qcStageName,
    qcStageId,
    errorReportStageDetail,
    errorReportIoqcDetail,
    wcName,
    consignmentName,
    formality,
    errorReportErrorList,
    numberOfTimeQc,
  } = { ...errorReportDetail }

  const {
    errorReportErrorDetails,
    priority,
    errorDescription,
    assignedTo,
    repairDeadline,
  } = {
    ...errorReportErrorList,
  }

  const {
    moCode,
    moName,
    producingStepName,
    routingName,
    producingProcessType,
    material,
    itemName: qcProductionItemName,
    workOrder: qcProductionWo,
  } = {
    ...errorReportStageDetail,
  }

  const {
    orderCode,
    orderName,
    warehouseName,
    customerName,
    deliveredAt,
    itemName: qcIoItemName,
    workOrder: qcIoWo,
  } = {
    ...errorReportIoqcDetail,
  }

  const columns = [
    {
      field: 'errorGroupName',
      headerName: t('defineErrorReport.errorGroupName'),
      width: 150,
      renderCell: (params) => {
        const { errorGroup } = params?.row

        return errorGroup?.name
      },
    },
    {
      field: 'causeGroupName',
      headerName: t('defineErrorReport.causeGroupName'),
      width: 150,
      renderCell: (params) => {
        const { causeGroup } = params?.row

        return causeGroup?.name
      },
    },
    {
      field: 'errorItemQuantity',
      headerName: t('defineErrorReport.errorItemQuantity'),
      width: 150,
    },
    {
      field: 'repairItemQuantity',
      headerName: t('defineErrorReport.repairItemQuantity'),
      width: 150,
      hide: qcStageId !== STAGE_OPTION.PRODUCTION_OUTPUT,
      renderCell: (params) => {
        const { repairItemQuantity } = params?.row
        return repairItemQuantity
      },
    },
  ]

  useEffect(() => {
    const params = {
      id: id,
    }
    actions.getErrorReportDetailById(params)
    return () => {
      actions.resetErrorReportDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_ERROR_REPORT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineErrorReportDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid
            container
            rowSpacing={4 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ mb: 2 }}
          >
            <Grid item lg={12} xs={12}>
              <LV
                label={t('defineErrorReport.status')}
                value={
                  <Status
                    options={ERROR_REPORT_STATUS}
                    value={+status}
                    variant="contained"
                  />
                }
              />
            </Grid>
            {/* Content 1 */}
            <Grid item lg={6} xs={12}>
              <LV label={t('defineErrorReport.code')} value={code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineErrorReport.name')} value={name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineErrorReport.createdBy')} value={createdBy} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineErrorReport.createdAt')}
                value={convertUtcDateTimeToLocalTz(createdAt)}
              />
            </Grid>
            {/* Content 2 */}
            <Grid item lg={6} xs={12}>
              <LV label={t('defineErrorReport.qcStages')} value={qcStageName} />
            </Grid>
            {qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT ||
            qcStageId === STAGE_OPTION.PRODUCTION_INPUT ? (
              <>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.woCode')}
                    value={qcProductionWo?.code || qcIoWo?.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.woName')}
                    value={qcProductionWo?.name || qcIoWo?.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV label={t('defineErrorReport.moName')} value={moName} />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV label={t('defineErrorReport.moCode')} value={moCode} />
                </Grid>
                <Grid item lg={6} xs={12}>
                  {producingProcessType ===
                  TYPE_QUALITY_PLAN_BOM.INPUT_MATERIAL ? (
                    <LV
                      label={t('defineErrorReport.materialName')}
                      value={material?.name}
                    />
                  ) : (
                    <LV
                      label={t('defineErrorReport.productName')}
                      value={qcProductionItemName}
                    />
                  )}
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.routingName')}
                    value={routingName}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.workCenterName')}
                    value={wcName}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.operation')}
                    value={producingStepName}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.orderCode')}
                    value={orderCode}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.orderName')}
                    value={orderName}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.productName')}
                    value={qcIoItemName}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.warehouseName')}
                    value={warehouseName}
                  />
                </Grid>
                {qcStageId !== STAGE_OPTION.PRO_IMPORT &&
                  qcStageId !== STAGE_OPTION.PRO_EXPORT && (
                    <Grid item lg={6} xs={12}>
                      <LV
                        label={
                          errorReportDetail?.qcStageId ===
                          STAGE_OPTION.SO_EXPORT
                            ? t('defineErrorReport.customerName')
                            : t('defineErrorReport.supplier')
                        }
                        value={customerName}
                      />
                    </Grid>
                  )}
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineErrorReport.deliveryDate')}
                    value={convertUtcDateTimeToLocalTz(deliveredAt)}
                  />
                </Grid>
              </>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineErrorReport.consignmentName')}
                value={consignmentName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineErrorReport.formality')} value={formality} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineErrorReport.numberOfTimeQc')}
                value={numberOfTimeQc}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ mt: 2 }}
          >
            {/* Content 3: Chi tiết lỗi */}
            <Grid item lg={12} xs={12}>
              <Box
                sx={{
                  display: 'block',
                  mb: 2,
                }}
              >
                <Typography variant="h4" component="span">
                  {t('defineErrorReport.detailErrorTitle')}
                </Typography>
              </Box>
              <DataTable
                rows={errorReportErrorDetails}
                columns={columns}
                striped={true}
                hideSetting
                hideFooter
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ mt: 2 }}
          >
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineErrorReport.priority')}
                value={t(PRIORITY_MAP[priority])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineErrorReport.receiver')}
                value={assignedTo?.userName}
              />
            </Grid>
            {qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT && (
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('defineErrorReport.repairDeadline')}
                  value={convertUtcDateTimeToLocalTz(repairDeadline)}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                name="errorDescription"
                label={t('defineErrorReport.errorDescription')}
                multiline
                rows={3}
                value={errorDescription}
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

export default DefineErrorReportDetail
