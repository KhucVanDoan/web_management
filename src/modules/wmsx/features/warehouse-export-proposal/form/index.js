import React, { useEffect, useMemo } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { sub } from 'date-fns'
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
import TextField from '~/components/TextField'
import {
  ACTIVE_STATUS,
  WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION,
} from '~/modules/wmsx/constants'
import useWarehouseExportProposal from '~/modules/wmsx/redux/hooks/useWarehouseExportProposal'
import { searchConstructionsApi } from '~/modules/wmsx/redux/sagas/construction-management/search-constructions'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  getLocalItem,
  convertFilterParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import ItemSettingTable from './item-setting-table'
import ItemTableCollaspe from './item-table-collaspe'
import { defineSchema } from './schema'

const DEFAULT_ITEM = [
  {
    suppliesCode: '',
    suppliesName: '',
    unit: '',
    details: '',
    quantityRequest: '',
    planExportedQuantity: '',
    importedQuantity: '',
    exportSuppliesCode: '',
    warehouseExport: '',
    lotNumber: '',
    quantityExport: '',
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
      itemDetail: item?.itemDetail,
      supplyCode: item?.itemId ? true : false,
      quantityRequest: item?.requestedQuantity,
      importQuantity: item?.importedQuantity || 0,
      importedQuantity: '',
      importedActualQuantity: item?.importedActualQuantity,
      quantityExport: item?.exportedQuantity,
      quantityExportActual: item?.exportedActualQuantity,
      id: item?.id,
      unit: item?.itemResponse?.itemUnit || item?.itemUnit,
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
              reservation: childrens?.isKeepSlot,
              planExportedQuantity: childrens?.planExportedQuantity || 0,
              exportQuantity: childrens?.exportedQuantity || 0,
              quantityExportActual: childrens?.exportedActualQuantity || 0,
              warehouse: childrens?.warehouseExport || '',
              updatedBy: childrens?.updatedBy,
              dayUpdate: childrens?.updatedAt,
            }))
          : DEFAULT_ITEM
        : DEFAULT_ITEM,
    }),
  )
  const initialValues = useMemo(
    () => ({
      code: warehouseExportProposalDetails?.code,
      unit: warehouseExportProposalDetails?.factory?.name || '',
      dear: warehouseExportProposalDetails?.greetingTitle || '',
      proponent: warehouseExportProposalDetails?.suggestedBy || '',
      departmentSetting:
        warehouseExportProposalDetails?.departmentSetting?.name,
      nameAddressOfRecipient:
        warehouseExportProposalDetails?.receiverInfo || '',
      construction: warehouseExportProposalDetails?.construction || '',
      createdAtPaper: warehouseExportProposalDetails?.receiptDate || new Date(),
      reasonUse: warehouseExportProposalDetails?.reason || '',
      items:
        warehouseExportProposalDetails?.items?.map((item) => ({
          suppliesName: {
            id: item?.itemId,
            code: item?.itemCode || item?.itemResponse?.code,
            name: item?.itemName || item?.itemResponse?.name,
            itemUnit: item?.itemResponse?.itemUnit,
          },
          details: item?.itemDetail,
          quantityRequest: item?.requestedQuantity,
          note: item?.note,
          unit: item?.itemUnit,
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
        switch (warehouseExportProposalDetails?.status) {
          case WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED:
            breadcrumbs.push({
              route: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT_AFTER_CONFIRM.PATH,
              title: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT_AFTER_CONFIRM.TITLE,
            })
            break
          default:
            breadcrumbs.push({
              route: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.PATH,
              title: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.TITLE,
            })
            break
        }
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
        switch (warehouseExportProposalDetails?.status) {
          case WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED:
            return ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT_AFTER_CONFIRM.TITLE
          default:
            return ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.TITLE
        }
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
        itemDetail: item?.details || null,
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
          childrens: item?.details?.map((e) => ({
            id: e?.id || null,
            itemId: e?.exportSuppliesCode?.itemId || e?.exportSuppliesCode?.id,
            exportedQuantity: +e?.quantityExport,
            isKeepSlot: Boolean(e?.isKeepSlot) ? 1 : 0,
            lotNumber: e?.lotNumber,
            warehouseExportId: e?.warehouseExport?.id,
          })),
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
              {({ handleReset, values, setFieldValue }) => {
                return (
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
                                options={
                                  WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION
                                }
                                value={warehouseExportProposalDetails?.status}
                              />
                            }
                          />
                        </Grid>
                      )}

                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="departmentSetting"
                          label={t('warehouseExportProposal.unit')}
                          disabled
                          value={
                            getLocalItem('userInfo')?.departmentSettings?.[0]
                              ?.name
                          }
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="dear"
                          label={t('warehouseExportProposal.dear')}
                          placeholder={t('warehouseExportProposal.dear')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="proponent"
                          label={t('warehouseExportProposal.proponent')}
                          placeholder={t('warehouseExportProposal.proponent')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
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
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                          }}
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
                              filter: convertFilterParams({
                                status: ACTIVE_STATUS.ACTIVE,
                              }),
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
                          maxDate={new Date()}
                          minDate={
                            new Date(
                              sub(new Date(), {
                                years: 1,
                                months: 0,
                                weeks: 0,
                                days: 0,
                                hours: 0,
                                minutes: 0,
                                seconds: 0,
                              }),
                            )
                          }
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
                            setFieldValue={setFieldValue}
                          />
                        )}
                      />
                    </Box>
                    {renderActionBar(handleReset)}
                  </Form>
                )
              }}
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
                {({ handleReset, values, setFieldValue }) => (
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
                      {isUpdate && (
                        <Grid item lg={6} xs={12}>
                          <Field.TextField
                            name="code"
                            label={t('warehouseExportProposal.votes')}
                            disabled
                            required
                          />
                        </Grid>
                      )}
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="departmentSetting"
                          label={t('warehouseExportProposal.unit')}
                          disabled
                          required
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
                              filter: convertFilterParams({
                                status: ACTIVE_STATUS.ACTIVE,
                              }),
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
                            setFieldValue={setFieldValue}
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
            warehouseExportProposalDetails?.status ===
              WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED && (
              <Formik
                initialValues={initialValues}
                // validationSchema={defineSchema(t)}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ handleReset, values, setFieldValue }) => {
                  return (
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
                                options={
                                  WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION
                                }
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
                              warehouseExportProposalDetails?.createdBy
                                ?.username
                            }
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
                            value={
                              warehouseExportProposalDetails?.departmentSetting
                                ?.name
                            }
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <LV
                            label={t('warehouseExportProposal.attachment')}
                            value={''}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <LV
                            label={t('warehouseExportProposal.dear')}
                            value={
                              warehouseExportProposalDetails?.greetingTitle
                            }
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
                            value={
                              warehouseExportProposalDetails?.construction?.name
                            }
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
                        <ItemTableCollaspe
                          itemTableCollaspe={values?.itemTableCollaspe || []}
                          setFieldValue={setFieldValue}
                          mode={mode}
                          values={values}
                        />
                      </Box>
                      {renderActionBar(handleReset)}
                    </Form>
                  )
                }}
              </Formik>
            )}
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptForm
