import React, { useEffect, useMemo } from 'react'

import { IconButton, InputAdornment, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  SUPPLIES_ACCESSORY,
  SUPPLIES_ACCESSORY_OPTION,
  SUPPLIES_ACCESSORY_OPTION_MAP,
  TYPE_ITEM,
} from '~/modules/mmsx/constants'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({
  items,
  setFieldValue,
  accessoriesMaintenanceInformation,
  arrayHelpers,
}) => {
  const { t } = useTranslation(['mmsx'])
  const {
    data: { suppliesList },
    actions: commonActions,
  } = useCommonInfo()

  useEffect(() => {
    commonActions.getAllSuppliesConfirm({})
  }, [])

  const getItemObject = (id) => {
    return suppliesList?.find((item) => item?.id === id)
  }

  useEffect(() => {
    const itemIdCodeList = items.map((item) => item?.supplyId)
    const accessoriesList = accessoriesMaintenanceInformation
      .filter(
        (item) =>
          item.type === TYPE_ITEM.DEVICE ||
          itemIdCodeList.some((id) => id === (item?.id || item?.supply?.id)),
      )
      ?.map((acc) => {
        if (acc.type !== TYPE_ITEM.DEVICE) {
          return {
            ...acc,
            disableMttf:
              items?.find((i) => i?.supplyId === acc?.supply?.id)
                ?.disableMttf || false,
          }
        }
        return acc
      })
    setFieldValue('accessoriesMaintenanceInformation', accessoriesList)
  }, [items])

  const columns = useMemo(
    () => [
      {
        field: 'supplyId',
        headerName: t('deviceList.infoList.name'),
        width: 400,
        renderCell: (params, index) => {
          const itemIdCodeList = items.map((item) => item?.supplyId)
          return (
            <Field.Autocomplete
              name={`items[${index}].supplyId`}
              placeholder={t('deviceList.infoList.name')}
              options={suppliesList}
              getOptionValue={(opt) => opt?.id || ''}
              getOptionLabel={(opt) => opt?.name || ''}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.supplyId
              }
              required
              onChange={(val) => {
                const type = getItemObject(val)?.type
                setFieldValue(`items[${index}].supplyId`, val)
                if (type === SUPPLIES_ACCESSORY.ACCESSORY) {
                  const params = {
                    name: getItemObject(val)?.name,
                    id: val,
                    code: getItemObject(val)?.code,
                    type,
                    disableMttf: items[index]?.useDate || false,
                  }
                  setFieldValue('accessoriesMaintenanceInformation', [
                    ...accessoriesMaintenanceInformation,
                    params,
                  ])
                }
              }}
            />
          )
        },
      },
      {
        field: 'type',
        headerName: t('deviceList.list.type'),
        width: 200,
        renderCell: (params, index) => {
          const type = getItemObject(params.row?.supplyId)?.type
          return (
            <Field.TextField
              name={`items[${index}].type`}
              value={t(`${SUPPLIES_ACCESSORY_OPTION_MAP[type] || ''}`)}
              disabled
            />
          )
        },
      },
      {
        field: 'quantity',
        headerName: t('deviceList.list.quantity'),
        width: 100,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].quantity`}
              type="number"
              allow={TEXTFIELD_ALLOW.NUMERIC}
              required
            />
          )
        },
      },
      {
        field: 'useDate',
        headerName: t('deviceList.infoList.useDate'),
        renderCell: (params, index) => {
          const type = getItemObject(params.row?.supplyId)?.type
          return (
            type === SUPPLIES_ACCESSORY_OPTION[0].value && (
              <Field.TextField
                name={`items[${index}].useDate`}
                placeholder={t('deviceList.placeholder.timeUsage')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                      {`${t('common.suffix.minute')}`}
                    </InputAdornment>
                  ),
                }}
                type="number"
                allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                required
              />
            )
          )
        },
      },
      {
        field: 'disableMttf',
        headerName: t('deviceList.infoList.canRepair'),
        align: 'center',
        renderCell: (params, index) => {
          const type = getItemObject(params.row?.supplyId)?.type
          return (
            type === SUPPLIES_ACCESSORY_OPTION[1].value && (
              <Field.Checkbox name={`items[${index}].disableMttf`} />
            )
          )
        },
      },
      {
        field: 'action',
        headerName: '',
        width: 50,
        align: 'center',
        renderCell: (params) => {
          const idx = items.findIndex(
            (item) => item?.supplyId?.id === params.row?.supplyId?.id,
          )
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={items?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items, suppliesList],
  )

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
        <Typography variant="h4">{t('deviceList.listTitle')}</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                supplyId: '',
                quantity: 1,
              })
              scrollToBottom()
            }}
          >
            {t('deviceList.list.addBtnTitle')}
          </Button>
        </Box>
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  accessoriesMaintenanceInformation: [],
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  accessoriesMaintenanceInformation: PropTypes.array,
  setFieldValue: PropTypes.func,
}

export default ItemSettingTable
