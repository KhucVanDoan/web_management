import { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useToggle } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useTransactionHistory from '~/modules/qmsx/redux/hooks/useTransactionHistory'
import { ROUTE } from '~/modules/qmsx/routes/config'
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
    route: ROUTE.TRANSACTION_HISTORY.OUTPUT_QUALITY_DETAIL.PATH,
    title: ROUTE.TRANSACTION_HISTORY.OUTPUT_QUALITY_DETAIL.TITLE,
  },
]

function OutputQualityDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, transactionHistoryDetail },
    actions,
  } = useTransactionHistory()

  const { isOpen, toggle } = useToggle()

  const {
    checkList,
    code,
    consignmentName,
    createdAt,
    errorReportCode,
    formality,
    item,
    itemDetailQC,
    note,
    numberOfTime,
    numberOfTimeQc,
    orderCode,
    orderName,
    userCreate,
    wareHouse,
  } = { ...transactionHistoryDetail }

  const {
    itemUnit,
    planQuantity,
    qcDoneTotalQuantity,
    qcPassQuantity,
    qcPassTotalQuantity,
    qcNeedTotalQuantity,
    qcRejectQuantity,
  } = { ...itemDetailQC }

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
      search: '?tab=qcOutput',
    }

    history.push(location)
  }

  useEffect(() => {
    actions.getDetailOutputQualityTransactionHistory({ id: id }, null, null)

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
                value={userCreate}
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
                label={t(`${transactionHistoryTransKey}.orderCode`)}
                value={orderCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.orderName`)}
                value={orderName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.itemCode`)}
                value={item?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.itemName`)}
                value={item?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.warehouseName`)}
                value={wareHouse}
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
                value={planQuantity}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.itemUnit`)}
                value={itemUnit}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcDoneQuantity`)}
                value={qcDoneTotalQuantity}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcNeedQuantity`)}
                value={qcNeedTotalQuantity}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcPassTotalQuantity`)}
                value={qcPassTotalQuantity}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcPassQuantity`)}
                value={qcPassQuantity}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t(`${transactionHistoryTransKey}.qcRejectQuantity`)}
                value={qcRejectQuantity}
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
                  rows={checkList}
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

export default OutputQualityDetail
