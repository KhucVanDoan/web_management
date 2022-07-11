import React, { useEffect, useState } from 'react'

import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { LETTER_TYPE, LOCATION_SETTING_TYPE } from '~/modules/wmsx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import useDefinePackage from '~/modules/wmsx/redux/hooks/useDefinePackage'
import useDefinePallet from '~/modules/wmsx/redux/hooks/useDefinePallet'
import useLocationSetting from '~/modules/wmsx/redux/hooks/useLocationSetting'
import useReturnOrder from '~/modules/wmsx/redux/hooks/useReturnOrder'
import {
  convertFilterParams,
  convertUtcDateToLocalTz,
  scrollToBottom,
} from '~/utils'

function ItemSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { items, mode, arrayHelpers, values, setFieldValue } = props
  const [checked, setChecked] = useState()
  const isView = mode === MODAL_MODE.DETAIL

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

  const {
    data: { packagesEvenByItem },
    actions: packageActs,
  } = useDefinePackage()

  const {
    data: { palletsEvenByItem },
    // actions: palletActs,
  } = useDefinePallet()

  useEffect(() => {
    commonActions.getItems({ isGetAll: 1 })
    lsActions.searchLocationSetting()
  }, [])

  useEffect(() => {
    const params = {
      orderId: values?.orderCode?.id,
      returnType: Number(values?.switchMode),
    }
    actions.getItemsByOrderReturnOrder(params)
  }, [values?.orderCode])

  const handleGetData = (val, index) => {
    const params = {
      itemId: items[index]?.itemId?.id,
      packageIds: items[index]?.itemId?.packages?.map((p) => p.id),
    }
    if (val) {
      lsActions.searchLocationSetting({
        filter: convertFilterParams({
          type: LOCATION_SETTING_TYPE.EVEN,
          itemId: items[index]?.itemId?.id,
        }),
      })
      packageActs.getPackagesEvenByItem(params)
    }
  }

  const itemIdList = itemByOrderList?.items?.map((item) => item?.itemId)
  const itemOptions = itemList?.filter((i) => itemIdList?.includes(i?.id))

  const handleChange = (val, values, index) => {
    setFieldValue(`items[${index}].lotNumber`, '')
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
          <Checkbox disabled checked={params.row?.isEven} />
        ) : (
          <FormControlLabel
            control={
              <Field.Checkbox
                name={`items[${index}].evenRow`}
                onChange={(val) => {
                  setChecked(val)
                  handleGetData(val, index)
                }}
              />
            }
            label=""
          />
        )
      },
    },
    {
      field: 'lotNumber',
      headerName: t('returnOrder.items.lotNumber'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.lotNumber}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].lotNumber`}
            options={itemByOrderList?.items?.map((i) => i.lotNumber)}
            disabled={isView}
            getOptionLabel={(opt) => opt}
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
            value={convertUtcDateToLocalTz(
              itemByOrderList?.items?.find(
                (item) => item.lotNumber === lotNumber,
              )?.mfg,
            )}
          />
        )
      },
    },
    {
      field: 'packageCode',
      headerName: t('returnOrder.items.packageCode'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.packageId}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].packageId`}
            options={
              checked ? packagesEvenByItem : items[index]?.itemId?.packages
            }
            disabled={isView}
            getOptionLabel={(opt) => opt?.code}
            getOptionSubLabel={(opt) => opt?.name}
          />
        )
      },
    },
    checked
      ? {
          field: 'palletCode',
          headerName: t('returnOrder.items.palletCode'),
          width: 180,
          renderCell: (params, index) => {
            return isView ? (
              <>{params?.row?.palletId}</>
            ) : (
              <Field.Autocomplete
                name={`items[${index}].palletId`}
                options={palletsEvenByItem}
                disabled={isView}
                getOptionLabel={(opt) => opt?.code}
                getOptionValue={(opt) => opt?.id || null}
              />
            )
          },
        }
      : {},
    {
      field: 'packingPosition',
      headerName: t(`returnOrder.items.${fieldName}`),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.location}</>
        ) : (
          <Field.Autocomplete
            name={`items[${index}].location`}
            options={locationSettingsList}
            disabled={isView}
            getOptionLabel={(opt) => opt?.name}
            getOptionSubLabel={(opt) => opt?.code}
            getOptionValue={(opt) => opt?.id}
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('returnOrder.items.planQuantity'),
      width: 180,
      renderCell: (params, index) => {
        return isView ? (
          <>{params?.row?.planQuantity}</>
        ) : (
          <Field.TextField
            name={`items[${index}].quantity`}
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
    ...(isView
      ? [
          {
            field: 'remainQuantity',
            headerName: t('returnOrder.items.remainQuantity'),
            width: 180,
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
