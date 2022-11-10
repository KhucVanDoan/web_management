import React, { useState } from 'react'

import { Button, Checkbox, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import DataTable from '~/components/DataTable'
import DataTableCollapse from '~/components/DataTableCollapse'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import useWarehouseExportProposal from '~/modules/wmsx/redux/hooks/useWarehouseExportProposal'
import { searchMaterialCategoryApi } from '~/modules/wmsx/redux/sagas/define-material-category/search-material-category'
import { searchMaterialQualityApi } from '~/modules/wmsx/redux/sagas/define-material-quality/search-material-quality'
import { searchObjectCategoryApi } from '~/modules/wmsx/redux/sagas/define-object-category/search-object-category'
import { searchProducingCountryApi } from '~/modules/wmsx/redux/sagas/define-producing-country/search-producing-country'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'
import { getLotNumberItem } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/get-details'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

const ItemTableCollaspe = ({ itemTableCollaspe, mode, setFieldValue }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const [openModal, setOpenModal] = useState(false)
  const { actions } = useWarehouseExportProposal()
  const { id } = useParams()
  const [lotNumberlist, setLotNumberList] = useState([])
  const handleAddRow = (parentData, parentIndex) => {
    const newObj = {
      id: new Date().getTime(),
      exportSuppliesCode: '',
      exportSuppliesName: '',
      unit: '',
      warehouseExport: '',
      lotNumber: '',
      planExportedQuantity: '',
      quantityExport: 0,
      quantityExportActual: '',
      reservation: false,
      updater: '',
      dayUpdate: '',
    }
    itemTableCollaspe[parentIndex].details.push(newObj)
    setFieldValue('itemTableCollaspe', itemTableCollaspe)
  }
  const handleRemoveRow = (params, index, parentIndex) => {
    itemTableCollaspe[parentIndex].details.splice(index, 1)
    setFieldValue('itemTableCollaspe', itemTableCollaspe)
  }
  const handleChangeItem = async (val) => {
    if (val) {
      const lotNumberList = []
      const res = await getLotNumberItem(val?.id)
      if (res?.statusCode === 200) {
        res?.data?.lots?.forEach((item) => {
          lotNumberList.push(item)
        })
      }
      const lotnumbers = lotNumberList.reduce((unique, o) => {
        if (
          !unique.some(
            (obj) => obj.itemId === o.ItemId && obj.lotNumber === o.lotNumber,
          )
        ) {
          unique.push(o)
        }
        return unique
      }, [])
      setLotNumberList(lotnumbers)
    }
  }
  const columns = [
    {
      field: '#',
      headerName: '#',
      width: 50,
    },
    {
      field: 'suppliesCode',
      headerName: t('warehouseExportProposal.items.suppliesCode'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.itemCode
      },
    },
    {
      field: 'suppliesName',
      headerName: t('warehouseExportProposal.items.suppliesName'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.itemName
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseExportProposal.items.unit'),
      width: 100,
      renderCell: (params) => {
        return params?.row?.unit
      },
    },
    {
      field: 'details',
      headerName: t('warehouseExportProposal.details'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.itemDetail
      },
    },
    {
      field: 'quantityRequest',
      headerName: t('warehouseExportProposal.items.quantityRequest'),
      width: 100,
    },
    {
      field: 'quantityExport',
      headerName: t('warehouseExportProposal.items.quantityExport'),
      width: 100,
    },
    {
      field: 'quantityExportActual',
      headerName: t('warehouseExportProposal.items.quantityExportActual'),
      width: 100,
    },
    {
      field: 'importedQuantity',
      headerName: t('warehouseExportProposal.items.importedQuantity'),
      width: 200,
      renderCell: (params, index) => {
        return isView || params?.row?.importQuantity ? (
          params?.row?.importQuantity
        ) : (
          <Field.TextField
            name={`itemTableCollaspe[${index}].importedQuantity`}
            numberProps={{
              thousandSeparator: true,
              decimalScale: 2,
            }}
            // validate={(val) => {
            //   if (!val) {
            //     return t('general:form.required')
            //   }
            //   if (val <= 0) {
            //     return t('general:form.moreThanNumber', {
            //       min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
            //     })
            //   }
            // }}
          />
        )
      },
    },
    {
      field: 'updater',
      headerName: t('warehouseExportProposal.items.updater'),
      width: 150,
    },
    {
      field: 'dayUpdate',
      headerName: t('warehouseExportProposal.items.dayUpdate'),
      width: 150,
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.dayUpdate)
      },
    },
    {
      field: 'supplyCode',
      headerName: t('warehouseExportProposal.items.supplyCode'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.itemId ? (
          <Checkbox checked={true} name="supplyCode" disabled />
        ) : (
          <Field.Checkbox name={`itemTableCollaspe[${index}].supplyCode`} />
        )
      },
    },
    {
      field: 'suppliesType',
      headerName: t('warehouseExportProposal.items.suppliesType'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.itemId ? (
          params?.row?.suppliesType
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${index}].suppliesType`}
            asyncRequest={(s) =>
              searchMaterialCategoryApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            disabled={!params?.row?.supplyCode}
          />
        )
      },
    },
    {
      field: 'categorySubject',
      headerName: t('warehouseExportProposal.items.categorySubject'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.itemId ? (
          params?.row?.categorySubject
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${index}].categorySubject`}
            asyncRequest={(s) =>
              searchObjectCategoryApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            disabled={!params?.row?.supplyCode}
          />
        )
      },
    },
    {
      field: 'producingCountry',
      headerName: t('warehouseExportProposal.items.producingCountry'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.itemId ? (
          params?.row?.producingCountry
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${index}].producingCountry`}
            asyncRequest={(s) =>
              searchProducingCountryApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.code}
            disabled={!params?.row?.supplyCode}
          />
        )
      },
    },
    {
      field: 'materialQuality',
      headerName: t('warehouseExportProposal.items.materialQuality'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.itemId ? (
          params?.row?.materialQuality
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${index}].materialQuality`}
            asyncRequest={(s) =>
              searchMaterialQualityApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
              })
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.code}
            disabled={!params?.row?.supplyCode}
          />
        )
      },
    },
    {
      field: 'suppliesNameNeedGrantCode',
      headerName: t('warehouseExportProposal.items.suppliesNameNeedGrantCode'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.itemId ? (
          params?.row?.suppliesNameNeedGrantCode
        ) : (
          <Field.TextField
            name={`itemTableCollaspe[${index}].suppliesNameNeedGrantCode`}
            disabled={!params?.row?.supplyCode}
          />
        )
      },
    },
  ]
  const producingStepColumns = (parentData, parentIndex) => [
    {
      field: '#',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'exportSuppliesCode',
      headerName: t('warehouseExportProposal.items.exportSuppliesCode'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.itemCode ? (
          params?.row?.itemCode
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${parentIndex}].details[${index}].exportSuppliesCode`}
            placeholder={t('warehouseExportProposal.items.suppliesName')}
            asyncRequest={(s) =>
              searchMaterialsApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  // codeSlice: parentData?.itemCode,
                  status: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            validate={(val) => {
              if (isEmpty(val)) {
                return t('general:form.required')
              }
            }}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.code}
            getOptionSubLabel={(opt) => opt?.name}
            onChange={(val) => handleChangeItem(val)}
          />
        )
      },
    },
    {
      field: 'exportSuppliesName',
      headerName: t('warehouseExportProposal.items.exportSuppliesName'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.itemName || params?.row?.exportSuppliesCode?.name
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseExportProposal.items.unit'),
      width: 150,
      renderCell: (params) => {
        return (
          params?.row?.unit?.name ||
          params?.row?.exportSuppliesCode?.itemUnit?.name
        )
      },
    },
    {
      field: 'warehouseExport',
      headerName: t('warehouseExportProposal.warehouseExport'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.warehouse ? (
          params?.row?.warehouse?.name
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${parentIndex}].details[${index}].warehouseExport`}
            asyncRequest={(s) =>
              searchWarehouseApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  status: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            validate={(val) => {
              if (isEmpty(val)) {
                return t('general:form.required')
              }
            }}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
          />
        )
      },
    },
    {
      field: 'lotNumber',
      headerName: t('warehouseExportProposal.items.lotNumber'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.lotNumbers ? (
          params?.row?.lotNumbers
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${parentIndex}].details[${index}].lotNumber`}
            options={lotNumberlist?.filter(
              (item) =>
                item?.lotNumber &&
                item?.itemId === params?.row?.exportSuppliesCode?.id,
            )}
            disabled={!Boolean(params?.row?.warehouseExport?.manageByLot)}
            validate={(val) => {
              if (Boolean(params?.row?.warehouseExport?.manageByLot)) {
                if (!val) {
                  return t('general:form.required')
                }
              }
            }}
            getOptionLabel={(opt) => opt?.lotNumber}
            getOptionValue={(opt) => opt?.lotNumber}
          />
        )
      },
    },
    {
      field: 'planExportedQuantity',
      headerName: t('warehouseExportProposal.items.planExportedQuantity'),
      width: 100,
    },
    {
      field: 'quantityExport',
      headerName: t('warehouseExportProposal.items.quantityExport'),
      width: 100,
      renderCell: (params, index) => {
        return isView || params?.row?.exportQuantity ? (
          params?.row?.exportQuantity
        ) : (
          <Field.TextField
            name={`itemTableCollaspe[${parentIndex}].details[${index}].quantityExport`}
            numberProps={{
              thousandSeparator: true,
              decimalScale: 2,
            }}
            validate={(val) => {
              if (!val) {
                return t('general:form.required')
              }
              if (val <= 0) {
                return t('general:form.moreThanNumber', {
                  min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                })
              }
            }}
          />
        )
      },
    },
    {
      field: 'quantityExportActual',
      headerName: t('warehouseExportProposal.items.quantityExportActual'),
      width: 100,
    },
    {
      field: 'reservation',
      headerName: t('warehouseExportProposal.items.reservation'),
      width: 150,
      renderCell: (params, index) => {
        return isView ? (
          <Checkbox checked={true} name="supplyCode" disabled />
        ) : (
          <Field.Checkbox
            name={`itemTableCollaspe[${parentIndex}].details[${index}].reservation`}
          />
        )
      },
    },
    {
      field: 'updater',
      headerName: t('warehouseExportProposal.items.updater'),
      width: 150,
      renderCellz: (params) => {
        return params?.row?.updatedBy?.username
      },
    },
    {
      field: 'dayUpdate',
      headerName: t('warehouseExportProposal.items.dayUpdate'),
      width: 150,
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.dayUpdate)
      },
    },
    {
      field: 'action',
      width: 100,
      align: 'center',
      headerName: () => (
        <IconButton
          onClick={() => {
            handleAddRow(parentData, parentIndex)
          }}
          sx={{ color: 'primary' }}
        >
          <Icon name="addRow" />
        </IconButton>
      ),
      hide: isView,
      renderCell: (params, index) => {
        return (
          <IconButton
            onClick={() => {
              handleRemoveRow(params, index, parentIndex)
            }}
            disabled={itemTableCollaspe[parentIndex]?.details?.length === 1}
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]
  const columnsMaterial = [
    {
      field: '#',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'nameMaterialCode',
      headerName: t('warehouseExportProposal.nameMaterialCode'),
      width: 50,
      renderCell: (params) => {
        return params?.row?.suppliesNameNeedGrantCode
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseExportProposal.unit'),
      width: 200,
    },
    {
      field: 'suppliesType',
      headerName: t('warehouseExportProposal.items.suppliesType'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.suppliesType?.code
      },
    },
    {
      field: 'producingCountry',
      headerName: t('warehouseExportProposal.items.producingCountry'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.producingCountry?.code
      },
    },
    {
      field: 'materialQuality',
      headerName: t('warehouseExportProposal.items.materialQuality'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.materialQuality?.code
      },
    },
    {
      field: 'categorySubject',
      headerName: t('warehouseExportProposal.items.categorySubject'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.categorySubject?.name
      },
    },
  ]
  const dataItem = itemTableCollaspe?.filter(
    (item) => item?.supplyCode === true && !item?.itemId,
  )
  const onSubmit = () => {
    const params = {
      id: +id,
      items: itemTableCollaspe?.map((item) => ({
        detailId: +item?.id,
        itemId: item?.itemId,
        unitId: null,
        objectCategoryId: item?.categorySubject?.id,
        manufacturingCountryId: item?.producingCountry?.id,
        itemQuanlityId: item?.materialQuality?.id,
        itemTypeSettingId: null,
      })),
    }
    actions.requestItemCode(params, () => setOpenModal(false))
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" component="span">
          {t('warehouseExportProposal.items.suppliesList')}
        </Typography>
      </Box>
      <DataTableCollapse
        rows={itemTableCollaspe}
        columns={columns}
        subColumns={producingStepColumns}
        hideSetting
        hideFooter
      />
      <Guard
        code={
          FUNCTION_CODE.WAREHOUSE_REQUEST_ITEM_CODE_WAREHOUSE_EXPORT_PROPOSAL
        }
      >
        <Button
          sx={{ mt: 3 }}
          onClick={() => {
            setOpenModal(true)
          }}
        >
          {t('warehouseExportProposal.requestMaterialCode')}
        </Button>
      </Guard>
      <Dialog
        open={openModal}
        title={t('warehouseExportProposal.infoMaterialCode')}
        onCancel={() => setOpenModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmit}
        submitLabel={t('general:common.yes')}
        noBorderBottom
        maxWidth="lg"
      >
        <DataTable
          rows={dataItem}
          columns={columnsMaterial}
          hideFooter
          hideSetting
        />
      </Dialog>
    </>
  )
}

export default ItemTableCollaspe
