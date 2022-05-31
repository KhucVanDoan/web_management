import { useState, useEffect } from 'react'

import { Box, IconButton, InputAdornment, Typography } from '@mui/material'

import { ASYNC_SEARCH_LIMIT, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { SERVICE_PRICE_TYPE } from '~/modules/wmsx/constants'
import { getAllServicesDetailApi } from '~/modules/wmsx/redux/sagas/define-bill/search-bill'
import { searchVoucherApi } from '~/modules/wmsx/redux/sagas/voucher/search-voucher'
import { scrollToBottom } from '~/utils'

const { useTranslation } = require('react-i18next')

const { default: DataTable } = require('~/components/DataTable')

function ItemSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const [serviceDetailList, setServiceDetailList] = useState([])
  const {
    isView,
    items = [],
    arrayHelpers,
    customerId = {},
    paymentMethod = {},
    taxNo = false,
    caculatePrice,
    currencyUnitId,
  } = props

  const {
    customerLevel,
    discountPayMethod,
    vatTaxCost,
    voucherPrice,
    totalCostEnd,
  } = caculatePrice({ items, customerId, paymentMethod, taxNo })

  const getListService = async () => {
    const res = await getAllServicesDetailApi({ isGetAll: 1 })
    setServiceDetailList(res.data.services)
  }

  const getServiceObject = (id) => {
    return serviceDetailList?.find((service) => service?.id === id)
  }

  const renderRow = [
    {
      id: 'defineBill.discountByRank',
    },
    {
      id: 'defineBill.discountByPaymentMethod',
    },
    {
      id: 'defineBill.vatTaxCost',
    },
    {
      id: 'defineBill.voucher',
    },
    {
      id: 'defineBill.totalCost',
    },
  ]

  const listItem = items.concat(renderRow)

  useEffect(() => {
    getListService()
  }, [])

  const columns = [
    {
      field: 'id',
      headerName: t('defineBill.orderNumber'),
      width: 200,
      renderCell: (params, index) => {
        if (params.row.id === 'defineBill.totalCost')
          return t('defineBill.totalCost')
        if (params.row.id === 'defineBill.discountByRank')
          return t('defineBill.discountByRank')
        if (params.row.id === 'defineBill.discountByPaymentMethod')
          return t('defineBill.discountByPaymentMethod')
        if (params.row.id === 'defineBill.vatTaxCost')
          return t('defineBill.vatTaxCost')
        if (params.row.id === 'defineBill.voucher')
          return t('defineBill.voucher')
        return index + 1
      },
    },
    {
      field: 'serviceId',
      headerName: t('defineBill.service.name'),
      width: 200,
      renderCell: (params, index) => {
        const serviceListByUnit = serviceDetailList?.filter(
          (i) => i?.currencyUnit?.id === currencyUnitId,
        )
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return (
          <Field.Autocomplete
            name={`items[${index}].serviceId`}
            options={serviceListByUnit}
            disabled={isView}
            getOptionLabel={(opt) => opt?.name || ''}
            getOptionValue={(opt) => opt?.id}
          />
        )
      },
    },
    {
      field: 'serviceType',
      headerName: t('defineBill.service.type'),
      width: 130,
      renderCell: (params, index) => {
        const { serviceId } = params.row
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return (
          <Field.TextField
            name={`items[${index}].serviceType`}
            value={getServiceObject(serviceId)?.serviceType?.name || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'unit',
      headerName: t('defineBill.service.unit'),
      width: 130,
      renderCell: (params, index) => {
        const { serviceId } = params.row
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return (
          <Field.TextField
            name={`items[${index}].unit`}
            value={getServiceObject(serviceId)?.rentUnit?.name || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'billPrice',
      headerName: t('defineBill.service.billPrice'),
      width: 200,
      renderCell: (params, index) => {
        const { serviceId } = params.row
        const service = getServiceObject(serviceId)
        const priceList = service
          ? [
              {
                id: {
                  value: service?.pricePerDay,
                  type: 0,
                },
                name: `${service?.pricePerDay} ${t(
                  SERVICE_PRICE_TYPE[0].suffix,
                )}`,
              },
              {
                id: { value: service?.pricePerMonth, type: 1 },
                name: `${service?.pricePerMonth} ${t(
                  SERVICE_PRICE_TYPE[1].suffix,
                )}`,
              },
              {
                id: { value: service?.pricePerQuarter, type: 2 },
                name: `${service?.pricePerQuarter} ${t(
                  SERVICE_PRICE_TYPE[2].suffix,
                )}`,
              },
              {
                id: { value: service?.pricePerYear, type: 3 },
                name: `${service?.pricePerYear} ${t(
                  SERVICE_PRICE_TYPE[3].suffix,
                )}`,
              },
            ]
          : []
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return (
          <Field.Autocomplete
            name={`items[${index}].price`}
            options={priceList}
            disabled={isView}
            getOptionLabel={(opt) => opt?.name || ''}
            getOptionValue={(opt) => opt?.id}
          />
        )
      },
    },
    {
      field: 'rentDuration',
      headerName: t('defineBill.service.rentDuration'),
      width: 130,
      renderCell: (params, index) => {
        const { price } = params.row
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return (
          <Field.DateRangePicker
            name={`items[${index}].rentDuration`}
            disabled={!price}
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('defineBill.service.quantity'),
      width: 130,
      align: 'right',
      renderCell: (params) => {
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return params.row.quantity
      },
    },
    {
      field: 'discount',
      headerName: t('defineBill.service.discountPercent'),
      align: 'right',
      width: 200,
      renderCell: (params, index) => {
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank' && customerId)
          return Number(customerId?.customerLevel?.level) || 0
        if (params.row.id === 'defineBill.discountByRank') return
        if (
          params.row.id === 'defineBill.discountByPaymentMethod' &&
          paymentMethod
        )
          return paymentMethod?.discount ? Number(paymentMethod?.discount) : 0
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost')
          return (
            <Field.TextField
              name={`items[0].vat`}
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ ml: 0, pr: 1 }}>
                    {t('general:common.percent')}
                  </InputAdornment>
                ),
              }}
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              disabled={!taxNo}
            />
          )
        if (params.row.id === 'defineBill.voucher')
          return (
            <Field.Autocomplete
              name={`items[0].voucher`}
              type="number"
              asyncRequest={(s) =>
                searchVoucherApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              asyncRequestHelper={(res) => res?.data?.items}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
            />
          )
        return (
          <Field.TextField
            name={`items[${index}].discount`}
            type="number"
            allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
          />
        )
      },
    },
    {
      field: 'cost',
      headerName: t('defineBill.service.cost'),
      align: 'right',
      width: 130,
      renderCell: (params) => {
        const { price, discount } = params.row
        if (params.row.id === 'defineBill.discountByRank') return customerLevel
        if (params.row.id === 'defineBill.discountByPaymentMethod')
          return discountPayMethod
        if (params.row.id === 'defineBill.vatTaxCost') return vatTaxCost
        if (params.row.id === 'defineBill.voucher') return voucherPrice
        if (params.row.id === 'defineBill.totalCost') {
          return totalCostEnd
        }

        return price
          ? Number(price.value) - Number(price.value) * Number(discount / 100)
          : 0
      },
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
      hide: isView,
      renderCell: (params) => {
        const idx = items.findIndex((item) => item.id === params.row.id)
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return (
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
        <Typography variant="h4">
          {t('defineBill.serviceInformation')}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                serviceId: null,
                rentDuration: null,
                discount: 0.5,
                price: null,
                quantity: 1,
              })
              scrollToBottom()
            }}
          >
            {t('productionOrder.item.addItem')}
          </Button>
        </Box>
      </Box>
      <DataTable
        rows={listItem}
        columns={columns}
        hideSetting
        hideFooter
        striped={false}
      />
    </>
  )
}

export default ItemSettingTable
