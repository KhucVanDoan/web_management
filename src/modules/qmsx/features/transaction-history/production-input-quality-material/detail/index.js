import { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { isArray } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useToggle } from '~/common/hooks/useToggle'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useTransactionHistory from '~/modules/qmsx/redux/hooks/useTransactionHistory'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { toNumberIgnoreNaN } from '~/modules/qmsx/utils'
import { formatDateTimeUtc } from '~/utils'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.TRANSACTION_HISTORY.LIST.PATH,
    title: ROUTE.TRANSACTION_HISTORY.LIST.TITLE,
  },
  {
    route:
      ROUTE.TRANSACTION_HISTORY.PRODUCTION_INPUT_QUALITY_MATERIAL_DETAIL.PATH,
    title:
      ROUTE.TRANSACTION_HISTORY.PRODUCTION_INPUT_QUALITY_MATERIAL_DETAIL.TITLE,
  },
]

function ProductionInputQualityMaterialDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, transactionHistoryDetail },
    actions,
  } = useTransactionHistory()

  const { isOpen, toggle } = useToggle()

  const {
    code,
    createdAt,
    pic,
    qcStageName,
    errorReportCode,
    workOrder,
    formality,
    consignmentName,
    numberOfTime,
    numberOfTimeQc,
    qcPassQuantity,
    qcRejectQuantity,
    totalPlanQuantity,
    totalQcPassQuantity,
    totalQcQuantity,
    totalUnQcQuantity,
    producedQuantity,
    note,
    materialItem,
    checkListDetails,
  } = { ...transactionHistoryDetail }

  const { mo, bom, producingStep, workCenters } = { ...workOrder }
  const { code: moCode, name: moName } = { ...mo }
  const { item: bomItem, parentBom } = { ...bom }
  const { code: producingStepCode, name: producingStepName } = {
    ...producingStep,
  }
  const { name: bomItemName, itemUnitName } = { ...bomItem }

  const transactionHistoryTransKey = 'transactionHistory.detail'
  const checkListTransKey = `${transactionHistoryTransKey}.checkList`

  const checkListColumns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
    },
    {
      field: 'title',
      headerName: t(`${checkListTransKey}.title`),
      width: 150,
    },
    {
      field: 'qcPassQuantity',
      headerName: t(`${checkListTransKey}.qcPassQuantity`),
      width: 150,
    },
    {
      field: 'qcRejectQuantity',
      headerName: t(`${checkListTransKey}.qcRejectQuantity`),
      width: 150,
    },
    {
      field: 'errorGroup',
      headerName: t(`${checkListTransKey}.errorType`),
      width: 150,
      renderCell: (params) => params?.row?.errorGroup?.name,
    },
  ]

  const backToList = () => {
    const location = {
      pathname: ROUTE.TRANSACTION_HISTORY.LIST.PATH,
      search: '?tab=qcProductionInputMaterial',
    }

    history.push(location)
  }

  useEffect(() => {
    actions.getDetailProductionInputQualityMaterialTransactionHistory(
      { id: id },
      null,
      null,
    )

    return () => {
      actions.resetTransactionHistoryState()
    }
  }, [id])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.transactionHistoryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid
            container
            rowSpacing={4 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ my: 2 }}
          >
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.code`)}
                value={code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.createdAt`)}
                value={formatDateTimeUtc(createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.createdBy`)}
                value={pic?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcStage`)}
                value={qcStageName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.errorReportCode`)}
                value={errorReportCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.moCode`)}
                value={moCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.moName`)}
                value={moName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.parentBomName`)}
                value={bomItemName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.bomName`)}
                value={parentBom?.item?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.material`)}
                value={materialItem?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.producingStepCode`)}
                value={producingStepCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.producingStepName`)}
                value={producingStepName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.workCenterName`)}
                value={isArray(workCenters) ? workCenters[0]?.name : ''}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcFormality`)}
                value={formality}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.consignmentName`)}
                value={consignmentName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.numberOfTimeSearch`)}
                value={
                  numberOfTimeQc && numberOfTime
                    ? `${numberOfTimeQc}/${numberOfTime}`
                    : ''
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.planQuantity`)}
                value={toNumberIgnoreNaN(totalPlanQuantity)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.itemUnit`)}
                value={itemUnitName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.producedQuantity`)}
                value={toNumberIgnoreNaN(producedQuantity)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcDoneQuantity`)}
                value={toNumberIgnoreNaN(totalQcQuantity)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.totalNonQcQuantity`)}
                value={toNumberIgnoreNaN(totalUnQcQuantity)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcPassTotalQuantity`)}
                value={toNumberIgnoreNaN(totalQcPassQuantity)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcPassQuantity`)}
                value={toNumberIgnoreNaN(qcPassQuantity)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcRejectQuantity`)}
                value={toNumberIgnoreNaN(qcRejectQuantity)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.note`)}
                value={note}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ my: 2 }}
          >
            <Grid item lg={12} xs={12}>
              <Button
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
                onClick={toggle}
              >
                {t(`${checkListTransKey}.label`)}
              </Button>
              {isOpen && (
                <DataTable
                  rows={checkListDetails}
                  columns={checkListColumns}
                  striped={false}
                  hideSetting
                  hideFooter
                />
              )}
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
            <Button variant="contained" onClick={backToList} color="grayF4">
              {t('common.close')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}

export default ProductionInputQualityMaterialDetail
