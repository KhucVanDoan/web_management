import React, { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION,
} from '~/modules/wmsx/constants'
import useWarehouseExportProposal from '~/modules/wmsx/redux/hooks/useWarehouseExportProposal'
import { searchConstructionsApi } from '~/modules/wmsx/redux/sagas/construction-management/search-constructions'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTable from './item-setting-table'
import ItemTableCollaspe from './item-table-collaspe'
import { defineSchema } from './schema'

const DEFAULT_ITEM = [
  {
    id: '',
    suppliesCode: '',
    suppliesName: '',
    unit: '',
    details: '',
    quantityRequest: '',
    planExportedQuantity: '',
    note: '',
  },
]
function WarehouseExportReceiptForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, warehouseExportProposalDetails },
    actions,
  } = useWarehouseExportProposal()

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_PROPOSAL.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isCreate = mode === MODAL_MODE.CREATE

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
  const initialValues = useMemo(
    () => ({
      unit: warehouseExportProposalDetails?.factory?.name || '',
      dear: warehouseExportProposalDetails?.greetingTitle || '',
      proponent: warehouseExportProposalDetails?.suggestedBy || '',
      nameAddressOfRecipient:
        warehouseExportProposalDetails?.receiverInfo || '',
      construction: warehouseExportProposalDetails?.construction || '',
      createdAtPaper: warehouseExportProposalDetails?.receiptDate || '',
      reasonUse: warehouseExportProposalDetails?.reason || '',
      items:
        warehouseExportProposalDetails?.items?.map((item) => ({
          suppliesName: {
            id: item?.itemId,
            code: item?.itemCode || item?.itemResponse?.code,
            name: item?.itemName || item?.itemResponse?.name,
            itemUnit: item?.itemResponse?.itemUnit,
          },
          quantityRequest: item?.requestedQuantity,
          note: item?.note,
          itemCode: item?.itemCode,
          itemName: item?.itemName,
        })) || DEFAULT_ITEM,
      itemTableCollaspe: dataItemTableCollaspe || [],
    }),
    [warehouseExportProposalDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        route: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.PATH,
        title: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.CREATE.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getWarehouseExportProposaltDetailsById(id)
    }
    return () => {
      actions.resetWarehouseExportProposalState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_EXPORT_PROPOSAL.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.PATH)
  }
  const onSubmit = (values) => {
    const parmas = {
      receiptNumber: '',
      greetingTitle: values?.dear,
      suggestedBy: values?.proponent,
      constructionId: values?.construction?.id,
      receiptDate: values?.createdAtPaper,
      reason: values?.reasonUse,
      receiverInfo: values?.nameAddressOfRecipient,
      items: values?.items?.map((item) => ({
        itemName: item?.suppliesName?.name || null,
        itemId: item?.suppliesName?.id,
        itemCode: item?.suppliesCode || item?.suppliesName?.code || null,
        unitId: item?.unit?.id || item?.unit || null,
        requestedQuantity: +item?.quantityRequest,
        note: item?.note,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseExportProposal(parmas, backToList)
    } else if (
      mode === MODAL_MODE.UPDATE &&
      warehouseExportProposalDetails?.status !==
        WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED
    ) {
      const paramUpdate = {
        ...parmas,
        id: +id,
      }
      actions.updateWarehouseExportProposal(paramUpdate, backToList)
    } else {
      const params = {
        id: id,
        receiptNumber: '',
        greetingTitle: values?.dear,
        suggestedBy: values?.proponent,
        constructionId: values?.construction?.id,
        receiptDate: values?.createdAtPaper,
        reason: values?.reasonUse,
        receiverInfo: values?.nameAddressOfRecipient,
        items: values?.itemTableCollaspe?.map((item) => ({
          id: item?.id,
          itemId: item?.itemId,
          importedQuantity: +item?.importedQuantity,
          childrens: item?.details,
        })),
      }
      actions.updateWarehouseExportProposalQuantity(params, backToList)
    }
  }
  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          {isCreate && (
            <Formik
              initialValues={initialValues}
              validationSchema={defineSchema(t)}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ handleReset, values }) => (
                <Form>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportProposal.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION}
                              value={warehouseExportProposalDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="unit"
                        label={t('warehouseExportProposal.unit')}
                        disabled
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="dear"
                        label={t('warehouseExportProposal.dear')}
                        placeholder={t('warehouseExportProposal.dear')}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="proponent"
                        label={t('warehouseExportProposal.proponent')}
                        placeholder={t('warehouseExportProposal.proponent')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="nameAddressOfRecipient"
                        label={t(
                          'warehouseExportProposal.nameAddressOfRecipient',
                        )}
                        placeholder={t(
                          'warehouseExportProposal.nameAddressOfRecipient',
                        )}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="construction"
                        label={t('warehouseExportProposal.construction')}
                        placeholder={t('warehouseExportProposal.construction')}
                        asyncRequest={(s) =>
                          searchConstructionsApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => opt?.code}
                        getOptionSubLabel={(opt) => opt?.name}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.DatePicker
                        name="createdAtPaper"
                        label={t('warehouseExportProposal.createdAtPaper')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="reasonUse"
                        label={t('warehouseExportProposal.reasonUse')}
                        placeholder={t(
                          'warehouseExportProposal.placeholderReasonUse',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemSettingTable
                          items={values?.items || []}
                          arrayHelpers={arrayHelpers}
                          mode={mode}
                        />
                      )}
                    />
                  </Box>
                  {renderActionBar(handleReset)}
                </Form>
              )}
            </Formik>
          )}
          {isUpdate &&
            warehouseExportProposalDetails?.status !==
              WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED && (
              <Formik
                initialValues={initialValues}
                validationSchema={defineSchema(t)}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ handleReset, values }) => (
                  <Form>
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportProposal.status')}
                            </Typography>
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
                        <Field.TextField
                          name="unit"
                          label={t('warehouseExportProposal.unit')}
                          disabled
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="dear"
                          label={t('warehouseExportProposal.dear')}
                          placeholder={t('warehouseExportProposal.dear')}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="proponent"
                          label={t('warehouseExportProposal.proponent')}
                          placeholder={t('warehouseExportProposal.proponent')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="nameAddressOfRecipient"
                          label={t(
                            'warehouseExportProposal.nameAddressOfRecipient',
                          )}
                          placeholder={t(
                            'warehouseExportProposal.nameAddressOfRecipient',
                          )}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="construction"
                          label={t('warehouseExportProposal.construction')}
                          placeholder={t(
                            'warehouseExportProposal.construction',
                          )}
                          asyncRequest={(s) =>
                            searchConstructionsApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(opt) => opt?.name}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.DatePicker
                          name="createdAtPaper"
                          label={t('warehouseExportProposal.createdAtPaper')}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field.TextField
                          name="reasonUse"
                          label={t('warehouseExportProposal.reasonUse')}
                          placeholder={t(
                            'warehouseExportProposal.placeholderReasonUse',
                          )}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          multiline
                          required
                          rows={3}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                      <FieldArray
                        name="items"
                        render={(arrayHelpers) => (
                          <ItemSettingTable
                            items={values?.items || []}
                            arrayHelpers={arrayHelpers}
                            mode={mode}
                            values={values}
                          />
                        )}
                      />
                    </Box>
                    {renderActionBar(handleReset)}
                  </Form>
                )}
              </Formik>
            )}
          {isUpdate &&
            warehouseExportProposalDetails?.status ===
              WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED && (
              <Formik
                initialValues={initialValues}
                // validationSchema={defineSchema(t)}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ handleReset, values, setFieldValue }) => (
                  <Form>
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportProposal.status')}
                            </Typography>
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
                              {t(
                                'warehouseExportProposal.statusWarehouseExport',
                              )}
                            </Typography>
                          }
                          value={
                            <Status
                              options={
                                WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION
                              }
                              value={
                                warehouseExportProposalDetails?.exportStatus
                              }
                            />
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('warehouseExportProposal.creator')}
                          value={
                            warehouseExportProposalDetails?.createdBy?.username
                          }
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
                          label={t(
                            'warehouseExportProposal.nameAddressOfRecipient',
                          )}
                          value={warehouseExportProposalDetails?.receiverInfo}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={t('warehouseExportProposal.votes')}
                          value={''}
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
                          value={
                            warehouseExportProposalDetails?.construction?.name
                          }
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                      <ItemTableCollaspe
                        itemTableCollaspe={values?.itemTableCollaspe || []}
                        setFieldValue={setFieldValue}
                        mode={mode}
                      />
                    </Box>
                    {renderActionBar(handleReset)}
                  </Form>
                )}
              </Formik>
            )}
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptForm
