import React, { useEffect, useMemo, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { sub } from 'date-fns'
import { Formik, Form, FieldArray } from 'formik'
import { uniq, map, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
// import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
// import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTIVE_STATUS,
  CODE_TYPE_DATA_FATHER_JOB,
  PARENT_BUSINESS_TYPE,
  TABLE_NAME_ENUM,
  WAREHOUSE_EXPORT_RECEIPT_STATUS_OPTIONS,
  WAREHOUSE_EXPORT_RECEIPT_STATUS,
  ruleEBS,
  CODE_RECEIPT_DEPARTMENT_DEFAULT,
  COMPANY_CODE,
  LENGTH_DEBITACCOUNT,
} from '~/modules/wmsx/constants'
import useDefineExpenditureOrg from '~/modules/wmsx/redux/hooks/useDefineExpenditureOrg'
import useReceiptDepartmentManagement from '~/modules/wmsx/redux/hooks/useReceiptDepartmentManagement'
import useSourceManagement from '~/modules/wmsx/redux/hooks/useSourceManagement'
import useWarehouseExportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseExportReceipt'
import useWarehouseImportReceipt from '~/modules/wmsx/redux/hooks/useWarehouseImportReceipt'
import { searchBusinessTypesApi } from '~/modules/wmsx/redux/sagas/business-type-management/search-business-types'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchApi } from '~/modules/wmsx/redux/sagas/reason-management/search'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { getSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/get-detail'
import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { getWarehouseExportProposalDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/get-details'
import { getWarehouseImportReceiptByConditions } from '~/modules/wmsx/redux/sagas/warehouse-export-receipt/create'
import { getWarehouseImportReceiptDetailsApi } from '~/modules/wmsx/redux/sagas/warehouse-import-receipt/get-details'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
  convertUtcDateToLocalTz,
  getLocalItem,
} from '~/utils'

import ItemSettingTableDetail from '../detail/item-setting-table'
import displayFollowBusinessTypeManagement from './display-field'
import ItemSettingTable from './item-setting-table'
import { formSchema } from './schema'
const DEFAULT_ITEMS = [
  {
    id: '',
    itemCode: '',
    itemName: '',
    unit: '',
    lotNumber: '',
    quantityRequest: '',
    quantityExport: '',
    planExportedQuantity: '',
    unitPriceRefer: '',
    totalMoney: '',
    debitAccount: '',
    creditAccount: '',
  },
]
function WarehouseExportReceiptForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const [debitAccount, setDebitAccount] = useState('')
  const [modal, setModal] = useState(false)
  const [warehouseExportProposalId, setWarehouseExportProposalId] = useState()
  const [isOpenModalUpdateHeader, setIsOpenModalUpdateHeade] = useState(false)
  const [isOpenModalConfirmEBS, setIsOpenModalConfirmEBS] = useState(false)
  const {
    data: { isLoading, warehouseExportReceiptDetails },
    actions,
  } = useWarehouseExportReceipt()

  const {
    data: { attributesBusinessTypeDetails },
    actions: warehouseImportRecipt,
  } = useWarehouseImportReceipt()
  const loggedInUserInfo = getLocalItem('userInfo')
  const {
    data: { receiptDepartmentList },
    actions: receiptDepartmentListAction,
  } = useReceiptDepartmentManagement()
  const {
    data: { expenditureOrgList },
    actions: expenditureOrgListAction,
  } = useDefineExpenditureOrg()

  const MODE_MAP = {
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH]: MODAL_MODE.UPDATE,
    [ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT_HEADER.PATH]: MODAL_MODE.UPDATE_HEADER,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isUpdateHeader = mode === MODAL_MODE.UPDATE_HEADER
  const [itemWarehouseExport, setItemWarehouseExport] = useState([])
  const [itemWarehouseExportProposal, setItemWarehouseExportProposal] =
    useState([])
  const [warehouseList, setWarehouseList] = useState([])
  const { actions: sourceAction } = useSourceManagement()
  const isEdit =
    warehouseExportReceiptDetails?.status ===
      WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED ||
    warehouseExportReceiptDetails?.status ===
      WAREHOUSE_EXPORT_RECEIPT_STATUS.IN_COLLECTING ||
    warehouseExportReceiptDetails?.status ===
      WAREHOUSE_EXPORT_RECEIPT_STATUS.COLLECTED
  const codereceiptDepartment = () => {
    switch (loggedInUserInfo?.company?.code) {
      case COMPANY_CODE.VTA:
        return CODE_RECEIPT_DEPARTMENT_DEFAULT.VTA
      case COMPANY_CODE.BKU:
        return CODE_RECEIPT_DEPARTMENT_DEFAULT.BKU
      case COMPANY_CODE.MDU:
        return CODE_RECEIPT_DEPARTMENT_DEFAULT.MDU
      case COMPANY_CODE.PMY:
        return CODE_RECEIPT_DEPARTMENT_DEFAULT.PMY
      case COMPANY_CODE.EPS:
        return CODE_RECEIPT_DEPARTMENT_DEFAULT.EPS
      default:
        return CODE_RECEIPT_DEPARTMENT_DEFAULT.VTA
    }
  }

  const initialValues = useMemo(
    () => ({
      code: warehouseExportReceiptDetails?.code,
      receiptDate: warehouseExportReceiptDetails?.receiptDate
        ? new Date(warehouseExportReceiptDetails?.receiptDate)
        : new Date(),
      deliver: warehouseExportReceiptDetails?.receiver || '',
      businessTypeId: warehouseExportReceiptDetails?.businessType
        ? {
            ...warehouseExportReceiptDetails?.businessType,
            bussinessTypeAttributes: warehouseExportReceiptDetails?.attributes,
          }
        : null,
      departmentReceiptId: !isEmpty(
        warehouseExportReceiptDetails?.departmentReceipt,
      )
        ? warehouseExportReceiptDetails?.departmentReceipt
        : receiptDepartmentList?.find(
            (e) => e?.code === codereceiptDepartment(),
          ) || null,
      warehouseId: warehouseExportReceiptDetails?.warehouse || null,
      reasonId: warehouseExportReceiptDetails?.reason || null,
      sourceId: warehouseExportReceiptDetails?.source || null,
      explanation:
        isUpdate || isUpdateHeader
          ? warehouseExportReceiptDetails?.explaination || ''
          : `${t(
              `warehouseExportReceipt.warehouseExportDate`,
            )} [${convertUtcDateToLocalTz(new Date().toISOString())}]`,
      project: warehouseExportReceiptDetails?.project || '',
      task: warehouseExportReceiptDetails?.task || '',
      suggestExport: warehouseExportReceiptDetails?.suggestExport || '',
      receiptNo: warehouseExportReceiptDetails?.receiptNo || '',
      warehouseExportReceipt:
        warehouseExportReceiptDetails?.warehouseExportReceipt || '',
      warehouseExportReceiptEBS: warehouseExportReceiptDetails?.ebsId || '',
      numberEBS: warehouseExportReceiptDetails?.transactionNumberCreated || '',
      items:
        warehouseExportReceiptDetails?.saleOrderExportWarehouseLots?.map(
          (item) => ({
            itemId: item?.itemId || item?.id,
            itemName: item?.name || item?.item?.name,
            unit: item?.item?.itemUnit,
            price: item?.price,
            money: item?.amount,
            lotNumber: item?.lotNumber,
            quantityExport: item?.quantity,
            quantityRequest: warehouseExportReceiptDetails?.attributes?.find(
              (item) =>
                item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL &&
                item?.value,
            )
              ? Math.round(
                  item?.requestedQuantityWarehouseExportProposal * 100,
                ) / 100
              : '',
            planExportedQuantity: item?.exportableQuantity || 0,
            debitAccount:
              isEdit && warehouseExportReceiptDetails?.ebsId
                ? item?.debitAccount?.length === LENGTH_DEBITACCOUNT
                  ? item?.debitAccount?.toString()?.slice(18, 43)
                  : item?.debitAccount
                : item?.debitAccount?.toString()?.slice(18, 43),
            creditAccount: item?.creditAccount,
            itemCode: {
              ...item?.item,
              itemId: item?.itemId || item?.id,
              id: item?.itemId || item?.id,
              item: { ...item?.item },
              requestedQuantity:
                warehouseExportReceiptDetails?.attributes?.find(
                  (item) =>
                    item?.tableName ===
                      TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL && item?.value,
                )
                  ? Math.round(
                      item?.requestedQuantityWarehouseExportProposal * 100,
                    ) / 100
                  : '',
            },
          }),
        ) || DEFAULT_ITEMS,
    }),
    [
      warehouseExportReceiptDetails,
      attributesBusinessTypeDetails,
      receiptDepartmentList,
      expenditureOrgList,
    ],
  )
  warehouseExportReceiptDetails?.attributes?.forEach((item) => {
    if (
      item.tableName &&
      attributesBusinessTypeDetails[item.tableName] &&
      attributesBusinessTypeDetails[item.tableName] instanceof Array
    ) {
      initialValues[`${item.id}`] = attributesBusinessTypeDetails[
        item.tableName
      ]?.find((itemDetail) => itemDetail.id + '' === item.value)
    } else {
      initialValues[`${item.id}`] = item.value || null
    }
  })
  useEffect(() => {
    const params = {
      filter: convertFilterParams({
        code: codereceiptDepartment(),
      }),
    }
    receiptDepartmentListAction.searchReceiptDepartment(params)

    expenditureOrgListAction.searchExpenditureOrg({
      filter: convertFilterParams({
        code: loggedInUserInfo?.company?.code,
      }),
    })
  }, [])
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'receiptCommandManagement',
      },
      {
        route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH,
        title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.TITLE,
        })
        break
      case MODAL_MODE.UPDATE_HEADER:
        breadcrumbs.push({
          route: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT_HEADER.PATH,
          title: ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT_HEADER.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate || isUpdateHeader) {
      actions.getWarehouseExportReceiptDetailsById(id, async (data) => {
        const res = await getSourceManagementApi(data?.source?.id)
        setDebitAccount(
          [
            res?.data?.accountant,
            res?.data?.produceTypeCode,
            res?.data?.productCode,
            res?.data?.factorialCode,
          ].join('.'),
        )
        const attributes = data?.attributes?.filter(
          (e) => e?.tableName && e?.value,
        )
        const params = {
          filter: JSON.stringify(
            uniq(map(attributes, 'tableName'))?.map((item) => ({
              tableName: item,
              id: attributes
                ?.filter((e) => e?.tableName === item)
                ?.map((d) => d?.value)
                .toString(),
            })),
          ),
        }
        warehouseImportRecipt.getAttribuiteBusinessTypeDetailsById(params)
      })
    }
    return () => {
      actions.resetWarehouseExportReceiptState()
    }
  }, [id])
  useEffect(async () => {
    if (!isEmpty(warehouseExportReceiptDetails)) {
      if (
        !isEmpty(
          warehouseExportReceiptDetails?.attributes?.find(
            (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.PO_IMPORT_ID,
          ),
        )
      ) {
        const res = await getWarehouseImportReceiptDetailsApi(
          Number(
            warehouseExportReceiptDetails?.attributes?.find(
              (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.PO_IMPORT_ID,
            )?.value,
          ),
        )
        setItemWarehouseExport(res?.data?.purchasedOrderImportDetails)
      }
      if (
        warehouseExportReceiptDetails?.attributes?.find(
          (item) =>
            item?.code ===
              CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID &&
            item?.value,
        )
      ) {
        const res = await getWarehouseExportProposalDetailsApi(
          warehouseExportReceiptDetails?.attributes?.find(
            (item) =>
              item?.code ===
                CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID &&
              item?.value,
          )?.value,
        )
        const warehouseList = []
        setWarehouseExportProposalId(res?.data?.id)
        res?.data?.items?.forEach((item) => {
          item?.childrens?.forEach((children) => {
            const findWarehouse = warehouseList?.find(
              (w) => w?.id === children?.warehouseExport?.id,
            )
            if (isEmpty(findWarehouse)) {
              warehouseList.push({
                ...children?.warehouseExport,
              })
            }
          })
        })
        setWarehouseList(warehouseList)
        const itemWarehouseExportProposal = []
        res?.data?.items?.forEach((item) => {
          item?.childrens?.forEach((chil) => {
            // const findItem = itemWarehouseExportProposal?.find(
            //   (w) =>
            //     w?.itemId === chil?.itemId &&
            //     w?.warehouseExport?.id === chil?.warehouseExport?.id,
            // )
            itemWarehouseExportProposal.push({
              item: {
                itemId: chil?.itemId,
                code: chil?.itemResponse?.code || chil?.itemCode,
                name: chil?.itemResponse?.name || chil?.itemName,
                itemUnit: chil?.itemResponse?.itemUnit?.name,
                exportedQuantity: chil?.exportedQuantity,
                requestedQuantity: chil?.requestedQuantity,
              },
              itemUnit: chil?.itemResponse?.itemUnit,
              itemId: chil?.itemId,
              warehouseExportProposalChildId: chil?.id,
              code: chil?.itemResponse?.code || chil?.itemCode,
              name: chil?.itemResponse?.name || chil?.itemName,
              warehouseExport: chil?.warehouseExport,
              requestedQuantity: chil?.requestedQuantity,
              lotNumber: chil?.lotNumber,
            })
          })
        })
        setItemWarehouseExportProposal(itemWarehouseExportProposal)
      }
    }
  }, [warehouseExportReceiptDetails, id])
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.WAREHOUSE_EXPORT_RECEIPT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT.TITLE
      case MODAL_MODE.UPDATE_HEADER:
        return ROUTE.WAREHOUSE_EXPORT_RECEIPT.EDIT_HEADER.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.WAREHOUSE_EXPORT_RECEIPT.LIST.PATH)
  }

  const onSubmit = async (values) => {
    if (mode === MODAL_MODE.CREATE) {
      const payload = {
        warehouseId: values?.warehouseId?.id,
        receiptDate: values?.receiptDate,
        itemIds: values?.items?.map(
          (item) => item?.itemCode?.itemId || +item?.itemCode?.id,
        ),
      }
      const res = await getWarehouseImportReceiptByConditions(payload)
      if (!isEmpty(res?.data)) {
        setModal(true)
      } else {
        const params = {
          receiver: values?.deliver,
          businessTypeId: values?.businessTypeId?.id,
          reasonId: values?.reasonId?.id,
          explaination: values?.explanation || '',
          receiptDate: values?.receiptDate.toISOString(),
          departmentReceiptId: values?.departmentReceiptId?.id,
          sourceId: values?.sourceId?.id,
          warehouseId: values?.warehouseId?.id,
          items: JSON.stringify(
            values?.items?.map((item) => ({
              warehouseExportProposalChildId:
                item?.itemCode?.warehouseExportProposalChildId,
              id: +item?.itemCode?.itemId || +item?.itemCode?.id,
              itemCode: item?.itemCode?.item?.code || item?.itemCode?.code,
              lotNumber: item?.lotNumber || null,
              quantity: +item?.quantityExport,
              price: item?.price,
              debitAccount: debitAccount || null,
              creditAccount: item?.creditAccount?.replace(
                /^(\d*?[1-9])0+$/,
                '$1',
              ),
              warehouseId: values?.warehouseId?.id,
            })),
          ),
        }
        values?.businessTypeId?.bussinessTypeAttributes?.forEach(
          (att, index) => {
            // if (values[att.tableName]?.id) {
            //   params[`attributes[${index}].id`] = att.id
            //   params[`attributes[${index}].value`] = values[att.tableName]?.id
            // }
            if (values[att.id]) {
              params[`attributes[${index}].id`] = att.id
              params[`attributes[${index}].value`] =
                values[att.id]?.id || values[att.id]
            }
          },
        )
        if (mode === MODAL_MODE.CREATE) {
          actions.createWarehouseExportReceipt(params, backToList)
        } else if (mode === MODAL_MODE.UPDATE) {
          const paramUpdate = {
            ...params,
            code: warehouseExportReceiptDetails?.code,
            id: +id,
          }
          actions.updateWarehouseExportReceipt(paramUpdate, backToList)
        }
      }
    } else if (mode === MODAL_MODE.UPDATE) {
      const payload = {
        warehouseId: values?.warehouseId?.id,
        receiptDate: values?.receiptDate,
        itemIds: values?.items?.map(
          (item) => item?.itemCode?.itemId || +item?.itemCode?.id,
        ),
      }

      const res = await getWarehouseImportReceiptByConditions(payload)
      if (!isEmpty(res?.data)) {
        setModal(true)
      } else {
        const params = {
          receiver: values?.deliver,
          businessTypeId: values?.businessTypeId?.id,
          reasonId: values?.reasonId?.id,
          explaination: values?.explanation || '',
          receiptDate: values?.receiptDate.toISOString(),
          departmentReceiptId: values?.departmentReceiptId?.id,
          sourceId: values?.sourceId?.id,
          warehouseId: values?.warehouseId?.id,
          items: JSON.stringify(
            values?.items?.map((item) => ({
              id: +item?.itemCode?.itemId || +item?.itemCode?.id,
              itemCode: item?.itemCode?.item?.code || item?.itemCode?.code,
              lotNumber: item?.lotNumber || null,
              quantity: +item?.quantityExport,
              price: item?.price,
              debitAccount: debitAccount || null,
              creditAccount: item?.creditAccount?.replace(
                /^(\d*?[1-9])0+$/,
                '$1',
              ),
              warehouseId: values?.warehouseId?.id,
            })),
          ),
        }
        values?.businessTypeId?.bussinessTypeAttributes?.forEach(
          (att, index) => {
            // if (values[att.tableName]?.id) {
            //   params[`attributes[${index}].id`] = att.id
            //   params[`attributes[${index}].value`] = values[att.tableName]?.id
            // }
            if (values[att.id]) {
              params[`attributes[${index}].id`] = att.id
              params[`attributes[${index}].value`] =
                values[att.id]?.id || values[att.id]
            }
          },
        )
        if (
          warehouseExportReceiptDetails?.status ===
          WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED
        ) {
          const paramUpdate = {
            ...params,
            code: warehouseExportReceiptDetails?.code,
            id: +id,
            status: WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED,
          }
          actions.updateWarehouseExportReceipt(paramUpdate, backToList)
        } else {
          const paramUpdate = {
            ...params,
            code: warehouseExportReceiptDetails?.code,
            id: +id,
          }
          actions.updateWarehouseExportReceipt(paramUpdate, backToList)
        }
      }
    } else {
      if (
        warehouseExportReceiptDetails?.status ===
        WAREHOUSE_EXPORT_RECEIPT_STATUS.COMPLETED
      ) {
        setIsOpenModalUpdateHeade(true)
      } else {
        const paramsUpdateHeader = {
          receiver: values?.deliver || warehouseExportReceiptDetails?.receiver,
          businessTypeId:
            values?.businessTypeId?.id ||
            warehouseExportReceiptDetails?.businessType?.id,
          reasonId:
            values?.reasonId?.id || warehouseExportReceiptDetails?.reason?.id,
          explaination: values?.explanation || '',
          receiptDate:
            values?.receiptDate.toISOString() ||
            warehouseExportReceiptDetails?.receiptDate,
          departmentReceiptId: values?.departmentReceiptId?.id,
          sourceId:
            values?.sourceId?.id || warehouseExportReceiptDetails?.source?.id,
          warehouseId:
            values?.warehouseId?.id ||
            warehouseExportReceiptDetails?.warehouse?.id,
          ebsId: values?.warehouseExportReceiptEBS || '',
          transactionNumberCreated: values?.numberEBS || '',
          items: JSON.stringify(
            values?.items?.map((item) => ({
              itemId: item?.itemId,
              lotNumber: item?.lotNumber,
              debitAccount: item?.debitAccount || '',
            })),
          ),
        }
        values?.businessTypeId?.bussinessTypeAttributes?.forEach(
          (att, index) => {
            // if (values[att.tableName]?.id) {
            //   params[`attributes[${index}].id`] = att.id
            //   params[`attributes[${index}].value`] = values[att.tableName]?.id
            // }
            paramsUpdateHeader[`attributes[${index}].id`] = att.id
            paramsUpdateHeader[`attributes[${index}].value`] =
              values[att.id]?.id || values[att.id] || ''
          },
        )
        actions.updateHeaderWarehouseExportReceipt(
          {
            ...paramsUpdateHeader,
            id: id,
          },
          backToList,
        )
      }
    }
  }
  const onSubmitUpdateHeader = (values, setFieldError) => {
    const paramsUpdateHeader = {
      receiver: values?.deliver || warehouseExportReceiptDetails?.receiver,
      businessTypeId:
        values?.businessTypeId?.id ||
        warehouseExportReceiptDetails?.businessType?.id,
      reasonId:
        values?.reasonId?.id || warehouseExportReceiptDetails?.reason?.id,
      explaination: values?.explanation || '',
      receiptDate:
        values?.receiptDate.toISOString() ||
        warehouseExportReceiptDetails?.receiptDate,
      departmentReceiptId: values?.departmentReceiptId?.id,
      sourceId:
        values?.sourceId?.id || warehouseExportReceiptDetails?.source?.id,
      warehouseId:
        values?.warehouseId?.id || warehouseExportReceiptDetails?.warehouse?.id,
      ebsId: values?.warehouseExportReceiptEBS || '',
      transactionNumberCreated: values?.numberEBS || '',
      items: JSON.stringify(
        values?.items?.map((item) => ({
          itemId: item?.itemId,
          lotNumber: item?.lotNumber,
          debitAccount: item?.debitAccount || '',
        })),
      ),
    }
    values?.businessTypeId?.bussinessTypeAttributes?.forEach((att, index) => {
      // if (values[att.tableName]?.id) {
      //   params[`attributes[${index}].id`] = att.id
      //   params[`attributes[${index}].value`] = values[att.tableName]?.id
      // }
      if (values[att.id]) {
        paramsUpdateHeader[`attributes[${index}].id`] = att.id
        paramsUpdateHeader[`attributes[${index}].value`] =
          values[att.id]?.id || values[att.id]
      }
    })
    actions.updateHeaderWarehouseExportReceipt(
      {
        ...paramsUpdateHeader,
        id: id,
      },
      backToList,
      (val) => {
        setIsOpenModalUpdateHeade(false)
        if (val?.data?.ebsError) {
          setIsOpenModalConfirmEBS(true)
        } else if (val?.message === ruleEBS?.numberEbs) {
          setFieldError('warehouseExportReceiptEBS', ' ')
        } else if (val?.message === ruleEBS.transactionEbs) {
          setFieldError('numberEBS', ' ')
        } else if (val?.message === ruleEBS.warehouse) {
          setFieldError('warehouseExportReceiptEBS', ' ')
          setFieldError('numberEBS', ' ')
        } else if (val?.message === ruleEBS.reason) {
          setFieldError('reasonId', ' ')
          setFieldError('warehouseExportReceiptEBS', ' ')
          setFieldError('numberEBS', ' ')
        }
      },
    )
    setIsOpenModalUpdateHeade(false)
  }
  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
            // elBefore={
            //   <Button sx={{ mr: 'auto' }}>
            //     <Icon name="print" mr={1} />
            //     {t(`warehouseTransfer.view`)}
            //   </Button>
            // }
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
            // elBefore={
            //   <Button sx={{ mr: 'auto' }}>
            //     <Icon name="print" mr={1} />
            //     {t(`warehouseTransfer.view`)}
            //   </Button>
            // }
          />
        )
      case MODAL_MODE.UPDATE_HEADER:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
            // elBefore={
            //   <Button sx={{ mr: 'auto' }}>
            //     <Icon name="print" mr={1} />
            //     {t(`warehouseTransfer.view`)}
            //   </Button>
            // }
          />
        )
      default:
        break
    }
  }
  const handleChangeSource = (val) => {
    if (val) {
      sourceAction.getDetailSourceManagementById(val?.id, (data) => {
        setDebitAccount(
          [
            data?.accountant,
            data?.produceTypeCode,
            data?.productCode,
            data?.factorialCode,
          ].join('.'),
        )
      })
    }
  }
  const handleChangeWarehouse = async (val, setFieldValue) => {
    setFieldValue('items', DEFAULT_ITEMS)
    setFieldValue('sourceId', null)
  }
  const handleChangeBusinessType = (val, setFieldValue, values) => {
    setFieldValue('items', DEFAULT_ITEMS)
    setItemWarehouseExport([])
    setWarehouseList([])

    const receiptDate = convertUtcDateToLocalTz(
      values?.receiptDate.toISOString(),
    )
    const explaination = `${
      receiptDate
        ? `${t('warehouseExportReceipt.warehouseExportDate')} [${receiptDate}]`
        : ''
    }`
    setFieldValue('explanation', explaination)
    if (!isEmpty(val)) {
      val?.bussinessTypeAttributes?.forEach((item) => {
        const expenditureOrgDefault =
          expenditureOrgList?.find(
            (e) => e?.code === loggedInUserInfo?.company?.code,
          ) || null
        if (
          item?.id &&
          item?.tableName !== TABLE_NAME_ENUM.ORGANIZATION_PAYMENT
        ) {
          setFieldValue(item?.id, null)
        } else {
          setFieldValue(item?.id, expenditureOrgDefault)
        }
      })
    }
  }
  const handleChangeReceiptDate = (val, values, setFieldValue) => {
    const warehouseExportProposal =
      values[
        values?.businessTypeId?.bussinessTypeAttributes?.find(
          (item) =>
            item?.tableName === TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
        )?.id
      ]?.code
    const warehouseExportReceipt =
      values[
        values?.businessTypeId?.bussinessTypeAttributes?.find(
          (item) => item?.tableName === TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
        )?.id
      ]?.code
    const receiptDate = convertUtcDateToLocalTz(val.toISOString())
    const explaination = `${
      receiptDate
        ? `${t('warehouseExportReceipt.warehouseExportDate')} [${receiptDate}]`
        : ''
    }${
      warehouseExportProposal
        ? ` ${t(
            'warehouseExportReceipt.receiptBy',
          )} [${warehouseExportProposal}]`
        : ''
    }${
      warehouseExportReceipt
        ? ` ${t(
            'warehouseExportReceipt.receiptBy',
          )} [${warehouseExportReceipt}]`
        : ''
    }`
    setFieldValue('explanation', explaination)
  }
  const onSubmitConfirm = (values) => {
    const params = {
      receiver: values?.deliver,
      businessTypeId: values?.businessTypeId?.id,
      reasonId: values?.reasonId?.id,
      explaination: values?.explanation || '',
      receiptDate: values?.receiptDate.toISOString(),
      departmentReceiptId: values?.departmentReceiptId?.id,
      sourceId: values?.sourceId?.id,
      warehouseId: values?.warehouseId?.id,
      items: JSON.stringify(
        values?.items?.map((item) => ({
          id: +item?.itemCode?.itemId || +item?.itemCode?.id,
          itemCode: item?.itemCode?.item?.code || item?.itemCode?.code,
          lotNumber: item?.lotNumber || null,
          quantity: +item?.quantityExport,
          price: item?.price,
          debitAccount: debitAccount || null,
          creditAccount: item?.creditAccount?.replace(/^(\d*?[1-9])0+$/, '$1'),
          warehouseId: values?.warehouseId?.id,
        })),
      ),
    }
    values?.businessTypeId?.bussinessTypeAttributes?.forEach((att, index) => {
      // if (values[att.tableName]?.id) {
      //   params[`attributes[${index}].id`] = att.id
      //   params[`attributes[${index}].value`] = values[att.tableName]?.id
      // }
      if (values[att.id]) {
        params[`attributes[${index}].id`] = att.id
        params[`attributes[${index}].value`] =
          values[att.id]?.id || values[att.id]
      }
    })
    if (mode === MODAL_MODE.CREATE) {
      actions.createWarehouseExportReceipt(params, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...params,
        code: warehouseExportReceiptDetails?.code,
        id: +id,
      }
      actions.updateWarehouseExportReceipt(paramUpdate, backToList)
    }
    setModal(false)
  }

  const onCloseModal = (setFieldError) => {
    setModal(false)
    setFieldError('receiptDate', ' ')
  }
  const items = warehouseExportReceiptDetails?.itemsSync?.map((item) => ({
    ...item,
    price: warehouseExportReceiptDetails?.saleOrderExportWarehouseLots?.find(
      (e) => e?.itemId === item?.id,
    )?.price,
    amount: warehouseExportReceiptDetails?.saleOrderExportWarehouseLots?.find(
      (e) => e?.itemId === item?.id,
    )?.amount,
  }))

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema(t, isEdit)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values, setFieldValue, setFieldError }) => {
              const warehouseImportReceipt =
                values?.businessTypeId?.bussinessTypeAttributes?.find(
                  (item) =>
                    item?.tableName === TABLE_NAME_ENUM.PURCHASED_ODER_IMPORT,
                )?.id
              const warehouseExprotProposal =
                values?.businessTypeId?.bussinessTypeAttributes?.find(
                  (item) =>
                    item?.tableName ===
                    TABLE_NAME_ENUM.WAREHOUSE_EXPORT_PROPOSAL,
                )?.id
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
                              {t('warehouseExportReceipt.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={WAREHOUSE_EXPORT_RECEIPT_STATUS_OPTIONS}
                              value={warehouseExportReceiptDetails?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    {isEdit && (
                      <Grid item xs={12} lg={6}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportReceipt.receiptId')}
                            </Typography>
                          }
                          value={warehouseExportReceiptDetails?.code}
                        />
                      </Grid>
                    )}
                    {isUpdate && (
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('warehouseExportReceipt.receiptId')}
                          name="code"
                          placeholder={t('warehouseExportReceipt.receiptId')}
                          disabled={isUpdate}
                          required
                        />
                      </Grid>
                    )}
                    {isEdit ? (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportReceipt.receiptDate')}
                            </Typography>
                          }
                          value={convertUtcDateToLocalTz(
                            warehouseExportReceiptDetails?.receiptDate,
                          )}
                        />
                      </Grid>
                    ) : (
                      <Grid item lg={6} xs={12}>
                        <Field.DatePicker
                          name="receiptDate"
                          label={t('warehouseExportReceipt.receiptDate')}
                          placeholder={t('warehouseExportReceipt.receiptDate')}
                          maxDate={new Date()}
                          minDate={
                            new Date(
                              sub(new Date(), {
                                years: 0,
                                months: 3,
                                weeks: 0,
                                days: 0,
                                hours: 0,
                                minutes: 0,
                                seconds: 0,
                              }),
                            )
                          }
                          onChange={(val) =>
                            handleChangeReceiptDate(val, values, setFieldValue)
                          }
                          required
                        />
                      </Grid>
                    )}
                    {(isUpdate || isUpdateHeader) && (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportReceipt.createdAt')}
                            </Typography>
                          }
                          value={convertUtcDateTimeToLocalTz(
                            warehouseExportReceiptDetails?.createdAt,
                          )}
                        />
                      </Grid>
                    )}
                    {(isUpdate || isUpdateHeader) && (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportReceipt.createdByUser')}
                            </Typography>
                          }
                          value={
                            warehouseExportReceiptDetails?.createdByUser
                              ?.fullName
                          }
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.TextField
                        name="deliver"
                        label={t('warehouseExportReceipt.nameOfReceiver')}
                        placeholder={t('warehouseExportReceipt.nameOfReceiver')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="departmentReceiptId"
                        label={t('warehouseExportReceipt.departmentReception')}
                        placeholder={t(
                          'warehouseExportReceipt.departmentReception',
                        )}
                        asyncRequest={(s) =>
                          searchReceiptDepartmentApi({
                            keyword: s,
                            limit: ASYNC_SEARCH_LIMIT,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    {isEdit ? (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportReceipt.typeBusiness')}
                            </Typography>
                          }
                          value={`${warehouseExportReceiptDetails?.businessType?.code} - ${warehouseExportReceiptDetails?.businessType?.name}`}
                        />
                      </Grid>
                    ) : (
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="businessTypeId"
                          label={t('warehouseExportReceipt.typeBusiness')}
                          placeholder={t('warehouseExportReceipt.typeBusiness')}
                          asyncRequest={(s) =>
                            searchBusinessTypesApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                status: ACTIVE_STATUS.ACTIVE,
                                parentBusiness: PARENT_BUSINESS_TYPE.EXPORT,
                              }),
                            })
                          }
                          onChange={(val) =>
                            handleChangeBusinessType(val, setFieldValue, values)
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          getOptionLabel={(opt) =>
                            `${opt?.code} - ${opt?.name}`
                          }
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                          disabled={
                            warehouseExportReceiptDetails?.status ===
                            WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED
                          }
                          required
                        />
                      </Grid>
                    )}
                    {isEdit ? (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportReceipt.warehouseExport')}
                            </Typography>
                          }
                          value={`${warehouseExportReceiptDetails?.warehouse?.code} - ${warehouseExportReceiptDetails?.warehouse?.name}`}
                        />
                      </Grid>
                    ) : (
                      <Grid item lg={6} xs={12}>
                        {!isEmpty(values[warehouseExprotProposal]) ? (
                          <Field.Autocomplete
                            name="warehouseId"
                            label={t('warehouseExportReceipt.warehouseExport')}
                            placeholder={t(
                              'warehouseExportReceipt.warehouseExport',
                            )}
                            options={warehouseList}
                            g
                            getOptionLabel={(opt) =>
                              `${opt?.code} - ${opt?.name}`
                            }
                            onChange={(val) =>
                              handleChangeWarehouse(val, setFieldValue, values)
                            }
                            isOptionEqualToValue={(opt, val) =>
                              opt?.id === val?.id
                            }
                            disabled={
                              warehouseExportReceiptDetails?.status ===
                              WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED
                            }
                            required
                          />
                        ) : (
                          <Field.Autocomplete
                            name="warehouseId"
                            label={t('warehouseExportReceipt.warehouseExport')}
                            placeholder={t(
                              'warehouseExportReceipt.warehouseExport',
                            )}
                            asyncRequest={(s) =>
                              searchWarehouseApi({
                                keyword: s,
                                limit: ASYNC_SEARCH_LIMIT,
                                filter: convertFilterParams({
                                  status: ACTIVE_STATUS.ACTIVE,
                                  userWarehouse: ACTIVE_STATUS.ACTIVE,
                                }),
                                sort: convertSortParams({
                                  order: 'asc',
                                  orderBy: 'code',
                                }),
                              })
                            }
                            asyncRequestHelper={(res) => res?.data?.items}
                            disabled={
                              warehouseExportReceiptDetails?.status ===
                                WAREHOUSE_EXPORT_RECEIPT_STATUS.CONFIRMED ||
                              values[warehouseImportReceipt]
                            }
                            getOptionLabel={(opt) =>
                              `${opt?.code} - ${opt?.name}`
                            }
                            isOptionEqualToValue={(opt, val) =>
                              opt?.id === val?.id
                            }
                            onChange={(val) =>
                              handleChangeWarehouse(val, setFieldValue, values)
                            }
                            required
                          />
                        )}
                      </Grid>
                    )}
                    {isEdit && warehouseExportReceiptDetails?.ebsId ? (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseImportReceipt.source')}
                            </Typography>
                          }
                          value={`${warehouseExportReceiptDetails?.source?.code} - ${warehouseExportReceiptDetails?.source?.name}`}
                        />
                      </Grid>
                    ) : (
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="sourceId"
                          label={t('warehouseExportReceipt.suorceAccountant')}
                          placeholder={t(
                            'warehouseExportReceipt.suorceAccountant',
                          )}
                          asyncRequest={(s) =>
                            searchSourceManagementApi({
                              keyword: s,
                              limit: ASYNC_SEARCH_LIMIT,
                              filter: convertFilterParams({
                                warehouseId: values?.warehouseId?.id,
                                status: ACTIVE_STATUS.ACTIVE,
                              }),
                              sort: convertSortParams({
                                order: 'asc',
                                orderBy: 'code',
                              }),
                            })
                          }
                          asyncRequestHelper={(res) => res?.data?.items}
                          asyncRequestDeps={values?.warehouseId}
                          getOptionLabel={(opt) =>
                            `${opt?.code} - ${opt?.name}`
                          }
                          getOptionSubLabel={(opt) => opt?.accountIdentifier}
                          isOptionEqualToValue={(opt, val) =>
                            opt?.id === val?.id
                          }
                          onChange={(val) => handleChangeSource(val)}
                          disabled={isEmpty(values?.warehouseId)}
                          required
                        />
                      </Grid>
                    )}
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="reasonId"
                        label={t(
                          'warehouseExportReceipt.warehouseExportReason',
                        )}
                        placeholder={t(
                          'warehouseExportReceipt.warehouseExportReason',
                        )}
                        asyncRequest={(s) =>
                          searchApi({
                            keyword: s,
                            // limit: ASYNC_SEARCH_LIMIT,
                            isGetAll: 1,
                            filter: convertFilterParams({
                              status: ACTIVE_STATUS.ACTIVE,
                            }),
                            sort: convertSortParams({
                              order: 'asc',
                              orderBy: 'code',
                            }),
                          })
                        }
                        asyncRequestHelper={(res) => res?.data?.items}
                        getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                        required
                      />
                    </Grid>
                    {isEdit && (
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="warehouseExportReceiptEBS"
                          label={t(
                            'warehouseExportReceipt.warehouseExportReceipt',
                          )}
                          placeholder={t(
                            'warehouseExportReceipt.warehouseExportReceipt',
                          )}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                          }}
                          disabled={!warehouseExportReceiptDetails?.ebsId}
                          validate={(val) => {
                            if (warehouseExportReceiptDetails?.ebsId) {
                              if (!val) {
                                return t('general:form.required')
                              }
                            }
                          }}
                        />
                      </Grid>
                    )}
                    {isEdit && (
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="numberEBS"
                          label={t('warehouseExportReceipt.number')}
                          placeholder={t('warehouseExportReceipt.number')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                          }}
                          disabled={!warehouseExportReceiptDetails?.ebsId}
                          validate={(val) => {
                            if (warehouseExportReceiptDetails?.ebsId) {
                              if (!val) {
                                return t('general:form.required')
                              }
                            }
                          }}
                        />
                      </Grid>
                    )}

                    {isEdit && (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t(
                                'warehouseExportReceipt.warehouseExportReceiptOld',
                              )}
                            </Typography>
                          }
                          value={warehouseExportReceiptDetails?.oldEbsId || ''}
                        />
                      </Grid>
                    )}
                    {isEdit && (
                      <Grid item lg={6} xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('warehouseExportReceipt.numberOld')}
                            </Typography>
                          }
                          value={
                            warehouseExportReceiptDetails?.oldTransactionNumberCreated ||
                            ''
                          }
                        />
                      </Grid>
                    )}

                    {displayFollowBusinessTypeManagement(
                      values?.businessTypeId?.bussinessTypeAttributes,
                      t,
                      values,
                      setItemWarehouseExport,
                      setFieldValue,
                      setWarehouseList,
                      setItemWarehouseExportProposal,
                      setWarehouseExportProposalId,
                      warehouseExportReceiptDetails,
                      attributesBusinessTypeDetails,
                      isEdit,
                    )}
                    <Grid item xs={12}>
                      <Field.TextField
                        name="explanation"
                        label={t('warehouseExportReceipt.explain')}
                        placeholder={t(
                          'warehouseExportReceipt.placeholderExplain',
                        )}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                  {isEdit ? (
                    <Box sx={{ mt: 3 }}>
                      <ItemSettingTableDetail
                        items={items || []}
                        mode={mode}
                        isEdit={isEdit}
                        setFieldValue={setFieldValue}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ mt: 3 }}>
                      <FieldArray
                        name="items"
                        render={(arrayHelpers) => (
                          <ItemSettingTable
                            items={values?.items || []}
                            arrayHelpers={arrayHelpers}
                            itemList={itemWarehouseExport}
                            itemWarehouseExportProposal={
                              itemWarehouseExportProposal
                            }
                            setFieldValue={setFieldValue}
                            debitAccount={debitAccount}
                            values={values}
                            mode={mode}
                            warehouseExportProposalId={
                              warehouseExportProposalId
                            }
                          />
                        )}
                      />
                    </Box>
                  )}
                  {renderActionBar(handleReset)}
                  <Dialog
                    open={modal}
                    title={t('warehouseExportReceipt.messageWarningCreate')}
                    onCancel={() => onCloseModal(setFieldError)}
                    cancelLabel={t('general:common.no')}
                    onSubmit={() => onSubmitConfirm(values)}
                    submitLabel={t('general:common.yes')}
                    noBorderBottom
                  >
                    {t('warehouseExportReceipt.messageWarning')}
                  </Dialog>
                  <Dialog
                    open={isOpenModalUpdateHeader}
                    title={t('warehouseImportReceipt.updateHeaderTitlePopup')}
                    onCancel={() => setIsOpenModalUpdateHeade(false)}
                    cancelLabel={t('general:common.no')}
                    onSubmit={() => onSubmitUpdateHeader(values, setFieldError)}
                    submitLabel={t('general:common.yes')}
                    noBorderBottom
                  >
                    {t('warehouseImportReceipt.updateHeaderConfirm')}
                  </Dialog>
                  <Dialog
                    open={isOpenModalConfirmEBS}
                    title={t(
                      'warehouseImportReceipt.updateHeaderTitlePopupEbs',
                    )}
                    onCancel={() => setIsOpenModalConfirmEBS(false)}
                    cancelLabel={t('general:common.no')}
                    onSubmit={() => {
                      onSubmitUpdateHeader(values, setFieldError)
                      setIsOpenModalConfirmEBS(false)
                    }}
                    submitLabel={t('general:common.yes')}
                    noBorderBottom
                  >
                    {t('warehouseImportReceipt.updateHeaderConfirmEbs')}
                  </Dialog>
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default WarehouseExportReceiptForm
