import React, { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
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
      quantityRequest: item?.requestedQuantity,
      importedQuantity: item?.importedQuantity || 0,
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
        ? item?.childrens?.map((childrens) => ({
            id: childrens?.id,
            itemCode: childrens?.itemCode || null,
            itemName: childrens?.itemName || null,
            itemId: childrens?.itemId,
            unit: childrens?.itemResponse?.itemUnit?.name,
            lotNumber: childrens?.lotNumber,
            isKeepSlot: childrens?.isKeepSlot,
            planExportedQuantity: childrens?.planExportedQuantity || 0,
            quantityExport: childrens?.exportedQuantity || 0,
            quantityExportActual: childrens?.exportedActualQuantity || 0,
            warehouseExport: childrens?.warehouseExport,
            reservation: false,
            updatedBy: item?.updatedBy,
            dayUpdate: item?.updatedAt,
          }))
        : [],
    }),
  )
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportProposalDetail')}
      onBack={backToList}
      loading={isLoading}
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
                value={warehouseExportProposalDetails?.createdAt}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.unit')}
                value={warehouseExportProposalDetails?.factory?.name}
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
                value={warehouseExportProposalDetails?.receiptNumber}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('warehouseExportProposal.createdAtPaper')}
                value={warehouseExportProposalDetails?.receiptDate}
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
              <ItemSettingTable
                items={warehouseExportProposalDetails?.items || []}
                mode={mode}
              />
            )}
          </Box>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportProposalDetail