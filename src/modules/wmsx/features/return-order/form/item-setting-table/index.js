import React, { useEffect, useState } from 'react'

import { Checkbox, IconButton, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, ORDER_DIRECTION } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { LETTER_TYPE, LOCATION_SETTING_TYPE } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useLocationSetting from '~/modules/wmsx/redux/hooks/useLocationSetting'
import useReturnOrder from '~/modules/wmsx/redux/hooks/useReturnOrder'
import { getPackagesEvenByItemApi } from '~/modules/wmsx/redux/sagas/define-package/get-packages-even-by-item'
import { getPalletsEvenByItemApi } from '~/modules/wmsx/redux/sagas/define-pallet/get-pallets-even-by-item'
import { searchPalletsApi } from '~/modules/wmsx/redux/sagas/define-pallet/search-pallets'
import { searchLocationSettingsApi } from '~/modules/wmsx/redux/sagas/location-setting/search'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
  scrollToBottom,
} from '~/utils'

function ItemSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, mode, arrayHelpers, values, setFieldValue } = props
  const isView = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE
  const packageOpts = []
  const palletOpts = []
  const [allOpts, setAllOpts] = useState([])
  const [evenList, setEvenList] = useState([])

  const {
    data: { itemByOrderList },
    actions,
  } = useReturnOrder()

  const {
    data: { itemList },
    actions: commonActions,
  } = useCommonManagement()

  const {
    data: { locationSettingsList },
    actions: lsActions,
  } = useLocationSetting()

  useEffect(() => {
    commonActions.getItems({ isGetAll: 1 })
  }, [])

  useEffect(() => {
    const params = {
      orderId: values?.orderCode?.id,
      returnType: Number(values?.switchMode),
    }
    actions.getItemsByOrderReturnOrder(params)
  }, [values?.orderCode])

  if (isUpdate) {
    values?.items?.forEach((item) => {
      packageOpts.push(item.package)
      palletOpts.push(item.pallet)
    })
  }

  const handleGetData = async (val, index) => {
    const params = items[index]?.itemId?.id
    if (val) {
      lsActions.searchLocationSetting({
        sort: convertSortParams({
          order: ORDER_DIRECTION.ASC,
          orderBy: 'itemId',
        }),
        filter: convertFilterParams({
          type: LOCATION_SETTING_TYPE.EVEN,
          itemId: items[index]?.itemId?.id,
          warehouseId: values?.orderCode?.warehouseId,
        }),
      })
      const resPackage = await getPackagesEvenByItemApi(params)
      const resPallet = await getPalletsEvenByItemApi(params)

      const tempArr = []
      const hasData = evenList.find((i) => i?.itemId === params)
      if (hasData === undefined) {
        tempArr.push({
          itemId: items[index]?.itemId?.id,
          packages: resPackage?.data,
          pallets: resPallet?.data,
        })
      }
      setEvenList([...evenList, ...tempArr])
    }
    setFieldValue(`items[${index}].packageId`, null)
    setFieldValue(`items[${index}].palletId`, null)
  }

  const itemIdList = itemByOrderList?.items?.map((item) => item?.itemId)
  const itemOptions = itemList?.filter((i) => itemIdList?.includes(i?.id))

  const handleChange = async (val, values, index) => {
    setFieldValue(`items[${index}].lotNumber`, '')

    const tempArr = []
    const resPallet = await searchPalletsApi({
      filter: convertFilterParams({
        itemId: val?.id,
      }),
    })
    const resLocation = await searchLocationSettingsApi({
      sort: convertSortParams({
        order: ORDER_DIRECTION.ASC,
        orderBy: 'itemId',
      }),
      filter: convertFilterParams({
        warehouseId: values?.orderCode?.warehouseId,
        itemId: val?.id,
      }),
    })
    tempArr.push({
      itemId: val?.id,
      pallets: resPallet?.data?.items,
      locations: resLocation?.data?.items,
    })
    setAllOpts([...allOpts, ...tempArr])
  }

  const fieldName =
    Number(values?.switchMode) === LETTER_TYPE.PAY_SUPPLIER
      ? 'packingPosition'
      : 'storageLocation'

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'itemName',
      headerName: t('returnOrder.items.itemName'),
      width: 250,
      renderCell: (params, index) => {
        const { itemName } = params.row
        return isView ? (
          <>{itemName}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].itemId`}
            options={itemOptions}
            getOptionLabel={(opt) => opt?.name}
            onChange={(val) => handleChange(val, values, index)}
            isOptionEqualToValue={(opt, val) => opt?.code === val?.code}
          />
        )
      },
    },
    {
      field: 'itemCode',
      headerName: t('returnOrder.items.itemCode'),
      width: 180,
      renderCell: (params, index) => {
        const { itemCode } = params.row
        return isView ? (
          <>{itemCode}</>
        ) : (
          <Field.TextField
            name={`items[${index}].itemCode`}
            value={items[index]?.itemId?.code || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'evenRow',
      headerName: t('returnOrder.items.evenRow'),
      width: 180,
      align: 'center',
      renderCell: (params, index) => {
        return isView ? (
          <Checkbox disabled checked={params.row?.evenRow} />
        ) : (
          <Field.Checkbox
            name={`items[${index}].evenRow`}
            onChange={(val) => {
              handleGetData(val, index)
            }}
          />
        )
      },
    },
    {
      field: 'lotNumber',
      headerName: t('returnOrder.items.lotNumber'),
      width: 180,
      renderCell: (params, index) => {
        const lotNumberOpts = itemByOrderList?.items?.filter(
          (i) => i?.itemId === params.row?.itemId?.id,
        )
        return isView ? (
          <>{params?.row?.lotNumber}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].lotNumber`}
            options={lotNumberOpts}
            getOptionLabel={(opt) => opt?.lotNumber}
            isOptionEqualToValue={(opt, val) => opt?.itemId === val?.itemId}
            getOptionValue={(opt) => opt}
          />
        )
      },
    },
    {
      field: 'mfg',
      headerName: t('returnOrder.items.manufactureDate'),
      width: 180,
      renderCell: (params, index) => {
        const { lotNumber } = params.row
        return isView ? (
          <>{convertUtcDateToLocalTz(params?.row?.mfg)}</>
        ) : (
          <Field.TextField
            name={`items[${index}].mfg`}
            disabled={true}
            value={convertUtcDateToLocalTz(lotNumber?.mfg)}
          />
        )
      },
    },
    {
      field: 'packageCode',
      headerName: t('returnOrder.items.packageCode'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId, packageId, evenRow, palletId } = params.row
        const evenListFilter = evenList?.find((i) => i?.itemId === itemId?.id)
        return isView ? (
          <>{packageId}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].packageId`}
            options={
              evenRow
                ? isEmpty(evenList)
                  ? packageOpts
                  : !palletId
                  ? evenListFilter?.packages
                  : palletId?.packages
                : items[index]?.itemId?.packages
            }
            getOptionLabel={(opt) => opt?.code}
            isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          />
        )
      },
    },
    {
      field: 'palletCode',
      headerName: t('returnOrder.items.palletCode'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId, evenRow } = params.row
        const evenListFilter = evenList?.find((i) => i?.itemId === itemId?.id)
        const allOptsFilter = allOpts?.find((i) => i?.itemId === itemId?.id)

        return isView ? (
          <>{params?.row?.palletId}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].palletId`}
            options={
              evenRow
                ? isEmpty(evenList)
                  ? palletOpts
                  : evenListFilter?.pallets
                : allOptsFilter?.pallets
            }
            getOptionLabel={(opt) => opt?.code}
          />
        )
      },
    },
    {
      field: 'packingPosition',
      headerName: t(`returnOrder.items.${fieldName}`),
      width: 180,
      renderCell: (params, index) => {
        const { evenRow, location, itemId } = params.row
        const allOptsFilter = allOpts?.find((i) => i?.itemId === itemId?.id)

        return isView ? (
          <>{location}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].location`}
            options={evenRow ? locationSettingsList : allOptsFilter?.locations}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            getOptionValue={(opt) => opt?.id}
            disabled={!itemId}
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('returnOrder.items.planQuantity'),
      width: 180,
      align: 'right',
      headerAlign: 'left',
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.planQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                  {''}
                </InputAdornment>
              ),
            }}
          />
        )
      },
    },
    ...(isView
      ? [
          {
            field: 'remainQuantity',
            headerName: t('returnOrder.items.remainQuantity'),
            width: 180,
            align: 'right',
            headerAlign: 'left',
            renderCell: (params, index) => {
              const { planQuantity, actualQuantity } = params.row
              return isView ? (
                <>{+planQuantity - actualQuantity}</>
              ) : (
                <Field.TextField
                  name={`items[${index}].remainQuantity`}
                  type="number"
                  disabled={isView}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                        {''}
                      </InputAdornment>
                    ),
                  }}
                />
              )
            },
          },
          {
            field: 'actualQuantity',
            headerName: t('returnOrder.items.actualQuantity'),
            width: 180,
            align: 'right',
            headerAlign: 'left',
            renderCell: (params, index) => {
              return isView ? (
                <>{params?.row?.actualQuantity}</>
              ) : (
                <Field.TextField
                  name={`items[${index}].actualQuantity`}
                  type="number"
                  disabled={isView}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                        {''}
                      </InputAdornment>
                    ),
                  }}
                />
              )
            },
          },
        ]
      : []),
    {
      field: 'unit',
      headerName: t('returnOrder.items.unit'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params.row?.unit}</>
        ) : (
          <Field.TextField
            name={`items[${index}].unitType`}
            value={
              items[index]?.itemId?.itemUnit?.name ||
              items[index]?.itemId?.itemUnit ||
              ''
            }
            disabled={true}
          />
        )
      },
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
      visible: 'always',
      sticky: 'right',
      resizable: false,
      renderCell: (params) => {
        const idx = items.findIndex((item) => item.id === params.row.id)
        return isView ? null : (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
            disabled={items?.length === 1}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]
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
        <Typography variant="h4">{t('returnOrder.itemList')}</Typography>
        {!isView && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  itemId: '',
                  warehouseId: null,
                  quantity: 1,
                  qcCheck: false,
                  lotNumber: '',
                  mfg: null,
                  packageId: null,
                  palletId: null,
                })
                scrollToBottom()
              }}
            >
              {t('returnOrder.addButton')}
            </Button>
          </Box>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemSettingTable
