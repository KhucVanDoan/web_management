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
import NumberFormatText from '~/components/NumberFormat'
import { ACTIVE_STATUS } from '~/modules/wmsx/constants'
import useWarehouseExportProposal from '~/modules/wmsx/redux/hooks/useWarehouseExportProposal'
import { searchMaterialQualityApi } from '~/modules/wmsx/redux/sagas/define-material-quality/search-material-quality'
import { searchProducingCountryApi } from '~/modules/wmsx/redux/sagas/define-producing-country/search-producing-country'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchMaterialsApi } from '~/modules/wmsx/redux/sagas/material-management/search-materials'
import { getLotNumberItem } from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/get-details'
import { getItemWarehouseStockAvailableApi } from '~/modules/wmsx/redux/sagas/warehouse-transfer/get-item-warehouse-stock-available'
import { api } from '~/services/api'
import { convertFilterParams, convertUtcDateToLocalTz } from '~/utils'

const ItemTableCollaspe = ({ itemTableCollaspe, mode, setFieldValue }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE
  const [openModal, setOpenModal] = useState(false)
  const { actions } = useWarehouseExportProposal()
  const { id } = useParams()
  const [lotNumberlist, setLotNumberList] = useState([])
  const handleAddRow = (parentData, parentIndex) => {
    const newObj = {
      exportSuppliesCode: null,
      exportSuppliesName: null,
      unit: '',
      warehouseExport: null,
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
  const getSubGroupApi = (params) => {
    const uri = `/v1/items/item-type-settings/sub-groups`
    return api.get(uri, params)
  }
  const handleRemoveRow = (params, index, parentIndex) => {
    itemTableCollaspe[parentIndex].details.splice(index, 1)
    setFieldValue('itemTableCollaspe', itemTableCollaspe)
  }
  const handleChangeItem = async (val, params, parentIndex, index) => {
    setFieldValue(
      `itemTableCollaspe[${parentIndex}].details[${index}].warehouseExport`,
      null,
    )
    if (val) {
      const res = await getLotNumberItem(val?.id)
      if (res?.statusCode === 200) {
        res?.data?.lots
          ?.filter((l) => l?.lotNumber !== null)
          ?.forEach((item) => {
            const findItem = lotNumberlist?.find(
              (lot) =>
                lot?.itemId === item?.itemId &&
                lot?.lotNumber === item?.lotNumber,
              // &&
              // new Date(`${lot?.mfg}`).toISOString() ===
              //   new Date(`${item?.mfg}`).toISOString(),
            )
            if (isEmpty(findItem)) {
              lotNumberlist.push({
                ...item,
              })
            }
          })
      }

      setLotNumberList(lotNumberlist)
      if (!isEmpty(params?.row?.warehouseExport)) {
        const payload = {
          items: [
            {
              itemId: val?.itemId || val?.id,
              warehouseId:
                params?.row?.warehouseExport?.id ||
                params?.row?.warehouseExport?.warehouse?.id,
            },
          ],
        }
        const res = await getItemWarehouseStockAvailableApi(payload)
        setFieldValue(
          `itemTableCollaspe[${parentIndex}].details[${index}].planExportedQuantity`,
          res?.data[0]?.quantity,
        )
      }
    }
  }
  const handleChangeWarehouse = async (val, params, parentIndex, index) => {
    if (!isEmpty(val)) {
      if (!isEmpty(params?.row?.exportSuppliesCode)) {
        const payload = {
          items: [
            {
              itemId:
                params?.row?.exportSuppliesCode?.itemId ||
                params?.row?.exportSuppliesCode?.id,
              warehouseId: val?.id || val?.warehouse?.id,
            },
          ],
        }
        const res = await getItemWarehouseStockAvailableApi(payload)
        setFieldValue(
          `itemTableCollaspe[${parentIndex}].details[${index}].planExportedQuantity`,
          res?.data[0]?.quantity,
        )
      }
    }
  }
  const handleChangeLotNumber = async (val, params, parentIndex, index) => {
    if (
      !isEmpty(params?.row?.exportSuppliesCode) &&
      !isEmpty(params?.row?.warehouseExport)
    ) {
      const payload = {
        items: [
          {
            itemId:
              params?.row?.exportSuppliesCode?.itemId ||
              params?.row?.exportSuppliesCode?.id,
            warehouseId:
              params?.row?.warehouseExport?.id ||
              params?.row?.warehouseExport?.warehouse?.id,
            lotNumber: val,
          },
        ],
      }
      const res = await getItemWarehouseStockAvailableApi(payload)
      setFieldValue(
        `itemTableCollaspe[${parentIndex}].details[${index}].planExportedQuantity`,
        res?.data[0]?.quantity,
      )
    }
  }
  const columns = [
    {
      field: '#',
      headerName: '#',
      width: 50,
      renderCell: (_, index) => {
        return index + 1
      },
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
        return params?.row?.unit?.name
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
      align: 'right',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <NumberFormatText value={row?.quantityRequest} formatter="quantity" />
      ),
    },
    {
      field: 'quantityExport',
      headerName: t('warehouseExportProposal.items.quantityExport'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <NumberFormatText value={row?.quantityExport} formatter="quantity" />
      ),
    },
    {
      field: 'quantityExportActual',
      headerName: t('warehouseExportProposal.items.quantityExportActual'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <NumberFormatText
          value={row?.quantityExportActual}
          formatter="quantity"
        />
      ),
    },
    {
      field: 'importedQuantity',
      headerName: t('warehouseExportProposal.items.importedQuantity'),
      width: 200,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return isView || params?.row?.importQuantity ? (
          <NumberFormatText
            value={params?.row?.importQuantity}
            formatter="quantity"
          />
        ) : (
          <Field.TextField
            name={`itemTableCollaspe[${index}].importedQuantity`}
            formatter="quantity"
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
      renderCell: (params) => {
        return params?.row?.updatedBy?.fullName
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
      field: 'supplyCode',
      headerName: t('warehouseExportProposal.items.supplyCode'),
      width: 150,
      renderCell: (params, index) => {
        return isView ? (
          <Checkbox
            name="isProvideCode"
            disabled
            checked={params?.row?.isProvideCode}
          />
        ) : params?.row?.isProvideCode ? (
          <Checkbox
            name="isProvideCode"
            disabled
            checked={params?.row?.isProvideCode}
          />
        ) : (
          <Field.Checkbox name={`itemTableCollaspe[${index}].supplyCode`} />
        )
      },
    },
    // {
    //   field: 'objectCategory',
    //   headerName: t('warehouseExportProposal.items.objectCategory'),
    //   width: 150,
    //   renderCell: (params, index) => {
    //     return isView || params?.row?.isProvideCode ? (
    //       params?.row?.objectCategory
    //     ) : (
    //       <Field.Autocomplete
    //         name={`itemTableCollaspe[${index}].objectCategory`}
    //         asyncRequest={(s) =>
    //           searchObjectCategoryApi({
    //             keyword: s,
    //             limit: ASYNC_SEARCH_LIMIT,
    //             filter: convertFilterParams({
    //               status: ACTIVE_STATUS.ACTIVE,
    //             }),
    //           })
    //         }
    //         isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
    //         asyncRequestHelper={(res) => res?.data?.items}
    //         getOptionLabel={(opt) => opt?.code}
    //         disabled={!params?.row?.supplyCode}
    //       />
    //     )
    //   },
    // },
    {
      field: 'suppliesType',
      headerName: t('warehouseExportProposal.items.suppliesType'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.isProvideCode ? (
          params?.row?.suppliesType
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${index}].suppliesType`}
            asyncRequest={(s) =>
              getSubGroupApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  status: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            asyncRequestHelper={(res) => res?.data?.items}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            getOptionLabel={(opt) =>
              `${opt?.code}.${opt?.mainGroupCode}.${opt?.subGroupCode}`
            }
            getOptionSubLabel={(opt) =>
              `${opt?.name}.${opt?.mainGroupName}.${opt?.subGroupName}`
            }
            required
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
        return isView || params?.row?.isProvideCode ? (
          params?.row?.producingCountry
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${index}].producingCountry`}
            asyncRequest={(s) =>
              searchProducingCountryApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  status: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.code}
            getOptionSubLabel={(opt) => opt?.name}
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
        return isView || params?.row?.isProvideCode ? (
          params?.row?.materialQuality
        ) : (
          <Field.Autocomplete
            name={`itemTableCollaspe[${index}].materialQuality`}
            asyncRequest={(s) =>
              searchMaterialQualityApi({
                keyword: s,
                limit: ASYNC_SEARCH_LIMIT,
                filter: convertFilterParams({
                  status: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.code}
            getOptionSubLabel={(opt) => opt?.name}
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
        return isView || params?.row?.isProvideCode ? (
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
      width: 30,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'action',
      width: 50,
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
            disabled={params?.row?.itemId}
          >
            <Icon name="remove" />
          </IconButton>
        )
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
            onChange={(val) =>
              handleChangeItem(val, params, parentIndex, index)
            }
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
                  itemId: params?.row?.exportSuppliesCode?.id,
                  userWarehouse: ACTIVE_STATUS.ACTIVE,
                }),
              })
            }
            validate={(val) => {
              if (isEmpty(val)) {
                return t('general:form.required')
              }
            }}
            asyncRequestDeps={params?.row?.exportSuppliesCode}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
            asyncRequestHelper={(res) => res?.data?.items}
            getOptionLabel={(opt) => opt?.name}
            onChange={(val) =>
              handleChangeWarehouse(val, params, parentIndex, index)
            }
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
                item?.itemId === params?.row?.exportSuppliesCode?.id &&
                item?.warehouseId === params?.row?.warehouseExport?.id,
            )}
            disabled={
              !Boolean(
                params?.row?.warehouseExport?.manageByLot ||
                  params?.row?.warehouseExport?.warehouse?.manageByLot,
              )
            }
            validate={(val) => {
              if (
                Boolean(
                  params?.row?.warehouseExport?.manageByLot ||
                    params?.row?.warehouseExport?.warehouse?.manageByLot,
                )
              ) {
                if (!val) {
                  return t('general:form.required')
                }
              }
            }}
            onChange={(val) =>
              handleChangeLotNumber(val, params, parentIndex, index)
            }
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
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return isView ? (
          <NumberFormatText
            value={params?.row?.planExportedQuantity}
            formatter="quantity"
          />
        ) : (
          <Field.TextField
            name={`itemTableCollaspe[${parentIndex}].details[${index}].planExportedQuantity`}
            formatter="quantity"
            disabled
          />
        )
      },
    },
    {
      field: 'quantityExport',
      headerName: t('warehouseExportProposal.items.quantityExport'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return isView || params?.row?.exportQuantity ? (
          <NumberFormatText
            value={params?.row?.exportQuantity}
            formatter="quantity"
          />
        ) : (
          <Field.TextField
            name={`itemTableCollaspe[${parentIndex}].details[${index}].quantityExport`}
            formatter="quantity"
            validate={(val) => {
              if (!val) {
                return t('general:form.required')
              }
              if (val < 0) {
                return t('general:form.moreThanNumber', {
                  min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                })
              }
              if (val > params?.row?.planExportedQuantity) {
                return t('general:form.maxNumber', {
                  max: params?.row?.planExportedQuantity,
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
      align: 'right',
      headerAlign: 'left',
      renderCell: ({ row }) => (
        <NumberFormatText
          value={row?.quantityExportActual}
          formatter="quantity"
        />
      ),
    },
    {
      field: 'isKeepSlot',
      headerName: t('warehouseExportProposal.items.reservation'),
      width: 150,
      renderCell: (params, index) => {
        return isView || params?.row?.itemId ? (
          <Checkbox
            checked={params?.row?.reservation}
            name="reservation"
            disabled
          />
        ) : (
          <Field.Checkbox
            name={`itemTableCollaspe[${parentIndex}].details[${index}].isKeepSlot`}
          />
        )
      },
    },
    {
      field: 'updater',
      headerName: t('warehouseExportProposal.items.updater'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.updatedBy?.fullName
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
  ]
  const columnsMaterial = [
    {
      field: '#',
      headerName: '#',
      width: 10,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'nameMaterialCode',
      headerName: t('warehouseExportProposal.nameMaterialCode'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.suppliesNameNeedGrantCode
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseExportProposal.unitItem'),
      width: 100,
      renderCell: (params) => {
        return params?.row?.unit?.name || params?.row?.unit
      },
    },
    // {
    //   field: 'objectCategory',
    //   headerName: t('warehouseExportProposal.items.objectCategory'),
    //   width: 150,
    //   renderCell: (params) => {
    //     return params?.row?.objectCategory?.code
    //   },
    // },
    {
      field: 'suppliesType',
      headerName: t('warehouseExportProposal.items.suppliesType'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.suppliesType?.name
      },
    },
    {
      field: 'producingCountry',
      headerName: t('warehouseExportProposal.items.producingCountry'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.producingCountry?.name
      },
    },
    {
      field: 'materialQuality',
      headerName: t('warehouseExportProposal.items.materialQuality'),
      width: 150,
      renderCell: (params) => {
        return params?.row?.materialQuality?.name
      },
    },
  ]
  const dataItem = itemTableCollaspe?.filter(
    (item) => item?.supplyCode && !item?.isProvideCode,
  )
  const onSubmit = () => {
    const params = {
      id: +id,
      items: dataItem?.map((item) => ({
        detailId: +item?.id,
        itemId: item?.itemId,
        unitId: null,
        objectCategoryId: item?.objectCategory?.id || null,
        manufacturingCountryId: item?.producingCountry?.id || null,
        itemQuanlityId: item?.materialQuality?.id || null,
        itemTypeSettingId: item?.suppliesType?.id || null,
        name: item?.suppliesNameNeedGrantCode,
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
      {isUpdate && (
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
            disabled={!dataItem?.length > 0}
          >
            {t('warehouseExportProposal.requestMaterialCode')}
          </Button>
        </Guard>
      )}
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
