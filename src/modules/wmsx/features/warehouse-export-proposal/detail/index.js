import React, { useEffect } from 'react'

import { Box, Button, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, NOTIFICATION_TYPE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION,
} from '~/modules/wmsx/constants'
import useWarehouseExportProposal from '~/modules/wmsx/redux/hooks/useWarehouseExportProposal'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { api } from '~/services/api'
import { convertUtcDateToLocalTz } from '~/utils'
import { getFileNameFromHeader } from '~/utils/api'
import addNotification from '~/utils/toast'

import ItemSettingTable from '../form/item-setting-table'
import ItemTableCollaspe from '../form/item-table-collaspe'

const breadcrumbs = [
  {
    title: 'receiptCommandManagement',
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.DETAIL.TITLE,
  },
]

function WarehouseExportProposalDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_PROPOSAL.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]
  const {
    data: { isLoading, warehouseExportProposalDetails },
    actions,
  } = useWarehouseExportProposal()

  useEffect(() => {
    actions.getWarehouseExportProposaltDetailsById(id)
    return () => {
      actions.resetWarehouseExportProposalState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.PATH)
  }
  const dataItemTableCollaspe = warehouseExportProposalDetails?.items?.map(
    (item) => ({
      itemCode: item?.itemCode || item?.itemResponse?.code,
      itemName: item?.itemName || item?.itemResponse?.name,
      itemId: item?.itemId,
      note: item?.note,
      itemDetail: item?.itemDetail,
      quantityRequest: item?.requestedQuantity,
      importQuantity: item?.importedQuantity || 0,
      importedQuantity: '',
      importedActualQuantity: item?.importedActualQuantity,
      quantityExport: item?.exportedQuantity,
      quantityExportActual: item?.exportedActualQuantity,
      id: item?.id,
      unit: item?.itemResponse?.itemUnit?.name,
      dayUpdate: item?.updatedAt,
      updatedBy: item?.updatedBy,
      suppliesType: item?.itemTypeSetting?.name,
      categorySubject: item?.objectCategory?.name,
      producingCountry: item?.manufacturingCountry?.name,
      materialQuality: item?.itemQuanlity?.name,
      suppliesNameNeedGrantCode: '',
      details: item?.itemId
        ? item?.childrens?.length > 0
          ? item?.childrens?.map((childrens) => ({
              id: childrens?.id,
              itemCode: childrens?.itemCode || childrens?.itemResponse?.code,
              itemName: childrens?.itemName || childrens?.itemResponse?.name,
              itemId: childrens?.itemId,
              unit: childrens?.itemResponse?.itemUnit,
              lotNumbers: childrens?.lotNumber,
              reservation: Boolean(childrens?.isKeepSlot) ? 1 : 0,
              planExportedQuantity: childrens?.planExportedQuantity || 0,
              exportQuantity: childrens?.exportedQuantity || 0,
              quantityExportActual: childrens?.exportedActualQuantity || 0,
              warehouse: childrens?.warehouseExport || '',
              updatedBy: item?.updatedBy,
              dayUpdate: item?.updatedAt,
            }))
          : []
        : [],
    }),
  )
  const itemSettingTable = warehouseExportProposalDetails?.items?.map(
    (item) => ({
      suppliesName: {
        id: item?.itemId,
        code: item?.itemCode || item?.itemResponse?.code,
        name: item?.itemName || item?.itemResponse?.name,
        itemUnit: item?.itemResponse?.itemUnit,
      },
      itemUnit: item?.itemResponse?.itemUnit?.name,
      details: item?.itemDetail,
      quantityRequest: item?.requestedQuantity,
      note: item?.note,
      itemCode: item?.itemCode,
      itemName: item?.itemName,
    }),
  )
  const dowFile = async (params) => {
    const uri = `/v1/warehouses/warehouse-export-proposals/export/${params}`
    const res = await api.get(
      uri,
      {},
      {
        responseType: 'blob',
        getHeaders: true,
      },
    )
    if (res.status === 500) {
      addNotification(res?.statusText, NOTIFICATION_TYPE.ERROR)
    } else {
      const filename = getFileNameFromHeader(res)
      const blob = new Blob([res?.data])
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const nameFile = decodeURI(filename)
      link.setAttribute('download', nameFile)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(url)
    }
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Button sx={{ ml: 4 / 3 }} color="grayF4" onClick={() => dowFile(id)}>
          {t('warehouseExportProposal.dowload')}
        </Button>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportProposalDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={
                  <Typography>{t('warehouseExportProposal.status')}</Typography>
                }
                value={
                  <Status
                    options={WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION}
                    value={warehouseExportProposalDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={
                  <Typography>
                    {t('warehouseExportProposal.statusWarehouseExport')}
                  </Typography>
                }
                value={
                  <Status
                    options={
                      WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION
                    }
                    value={warehouseExportProposalDetails?.exportStatus}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.creator')}
                value={warehouseExportProposalDetails?.createdBy?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.createAt')}
                value={convertUtcDateToLocalTz(
                  warehouseExportProposalDetails?.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.unit')}
                value={warehouseExportProposalDetails?.departmentSetting?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.dear')}
                value={warehouseExportProposalDetails?.greetingTitle}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.proponent')}
                value={warehouseExportProposalDetails?.suggestedBy}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.nameAddressOfRecipient')}
                value={warehouseExportProposalDetails?.receiverInfo}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.votes')}
                value={warehouseExportProposalDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.createdAtPaper')}
                value={convertUtcDateToLocalTz(
                  warehouseExportProposalDetails?.receiptDate,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.construction')}
                value={warehouseExportProposalDetails?.construction?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="reasonUse"
                label={t('warehouseExportProposal.reasonUse')}
                multiline
                rows={3}
                value={warehouseExportProposalDetails?.reason}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            {warehouseExportProposalDetails?.status ===
            WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED ? (
              <ItemTableCollaspe
                itemTableCollaspe={dataItemTableCollaspe || []}
                mode={mode}
              />
            ) : (
              <ItemSettingTable items={itemSettingTable || []} mode={mode} />
            )}
          </Box>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportProposalDetail
