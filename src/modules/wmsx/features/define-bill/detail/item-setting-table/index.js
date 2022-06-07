import { useState, useEffect } from 'react'

import { Box, Typography } from '@mui/material'

import { SERVICE_PRICE_TYPE } from '~/modules/wmsx/constants'
import useBill from '~/modules/wmsx/redux/hooks/useBill'
import { getAllServicesDetailApi } from '~/modules/wmsx/redux/sagas/define-bill/search-bill'
import { convertUtcDateToLocalTz } from '~/utils'

const { useTranslation } = require('react-i18next')

const { default: DataTable } = require('~/components/DataTable')

function ItemSettingTableDetail(props) {
  const { t } = useTranslation(['wmsx'])
  const [serviceDetailList, setServiceDetailList] = useState([])
  const { items = [] } = props
  const {
    data: { billDetails },
  } = useBill()

  const sumPrice = items.reduce(
    (prev, curr) =>
      prev + Number(curr?.quantity) * Number(curr?.unitPrice?.value),
    0,
  )

  const customerLevel =
    (Number(billDetails?.customerLevel?.discount) / 100) * sumPrice

  const discountPayMethod =
    (billDetails?.paymentType?.discount / 100) * sumPrice

  const vatTaxCost = (billDetails?.taxNo / 100) * sumPrice

  const voucherPrice = (Number(billDetails?.percentageTax) / 100) * sumPrice

  const totalCostEnd =
    sumPrice - customerLevel - discountPayMethod + vatTaxCost - voucherPrice

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
      width: 130,
      renderCell: (params) => {
        const { serviceId } = params.row
        return getServiceObject(serviceId)?.name || ''
      },
    },
    {
      field: 'serviceType',
      headerName: t('defineBill.service.type'),
      width: 130,
      renderCell: (params) => {
        const { serviceId } = params.row
        return getServiceObject(serviceId)?.serviceType?.name || ''
      },
    },
    {
      field: 'unit',
      headerName: t('defineBill.service.unit'),
      width: 130,
      renderCell: (params) => {
        const { serviceId } = params.row
        return getServiceObject(serviceId)?.rentUnit?.name || ''
      },
    },
    {
      field: 'billPrice',
      headerName: t('defineBill.service.billPrice'),
      width: 130,
      align: 'right',
      renderCell: (params) => {
        const { serviceId } = params.row
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return `${getServiceObject(serviceId)?.pricePerDay} ${t(
          SERVICE_PRICE_TYPE[0].suffix,
        )}`
      },
    },
    {
      field: 'rentDuration',
      headerName: t('defineBill.service.rentDuration'),
      width: 130,
      renderCell: (params) => {
        const { rentDurationFrom, rentDurationTo } = params.row
        if (params.row.id === 'defineBill.totalCost') return
        if (params.row.id === 'defineBill.discountByRank') return
        if (params.row.id === 'defineBill.discountByPaymentMethod') return
        if (params.row.id === 'defineBill.vatTaxCost') return
        if (params.row.id === 'defineBill.voucher') return
        return (
          convertUtcDateToLocalTz(rentDurationFrom) +
          ' - ' +
          convertUtcDateToLocalTz(rentDurationTo)
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('defineBill.service.quantity'),
      width: 130,
      align: 'right',
    },
    {
      field: 'discount',
      headerName: t('defineBill.service.discountPercent'),
      width: 200,
      align: 'right',
      renderCell: (params) => {
        const { fee } = params.row
        if (params.row.id === 'defineBill.discountByRank')
          return billDetails?.customerLevel?.discount
        if (params.row.id === 'defineBill.discountByPaymentMethod')
          return billDetails?.paymentType?.discount
        if (params.row.id === 'defineBill.vatTaxCost')
          return Number(billDetails?.taxNo)
        if (params.row.id === 'defineBill.voucher')
          return billDetails?.percentageTax
        return fee
      },
    },
    {
      field: 'cost',
      headerName: t('defineBill.service.cost'),
      width: 130,
      align: 'right',
      renderCell: (params) => {
        const { price } = params.row
        if (params.row.id === 'defineBill.discountByRank') return customerLevel
        if (params.row.id === 'defineBill.discountByPaymentMethod')
          return discountPayMethod
        if (params.row.id === 'defineBill.vatTaxCost') return vatTaxCost
        if (params.row.id === 'defineBill.voucher') return voucherPrice
        if (params.row.id === 'defineBill.totalCost') return totalCostEnd

        return price
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

export default ItemSettingTableDetail
