import { useEffect, useState } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { NOTIFICATION_TYPE, TEXTFIELD_ALLOW } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import { STAGES_OPTION } from '~/modules/mesx/constants'
import useCommonManagement from '~/modules/wmsx/redux/hooks/useCommonManagement'
import { getLotNumberListSOExportApi } from '~/modules/wmsx/redux/sagas/so-export/get-lot-number-list'
import { convertFilterParams, scrollToBottom } from '~/utils'
import addNotification from '~/utils/toast'

function ItemSettingTable(props) {
  const { t } = useTranslation(['wmsx'])
  const { arrayHelpers, items, soId, setFieldValue } = props
  const {
    data: { itemList, itemQualityPoint },
    actions,
  } = useCommonManagement()

  const [lotNumberList, setLotNumberList] = useState([])

  const {
    data: { saleOrderDetails },
    actions: actionSaleOrder,
  } = useSaleOrder()

  useEffect(() => {
    actions.getItems({})
  }, [])

  useEffect(() => {
    if (soId) {
      actionSaleOrder.getSaleOrderDetailsById(soId)
    }
    return () => actionSaleOrder.resetSaleOrderState()
  }, [soId])

  useEffect(() => {
    if (saleOrderDetails?.saleOrderDetails)
      handleChangeItem(saleOrderDetails?.saleOrderDetails[0]?.itemId)
  }, [saleOrderDetails?.saleOrderDetails])

  const handleChangeItem = async (val, index, setFieldValue) => {
    if (val) {
      const res = await getLotNumberListSOExportApi({
        itemIds: val,
      })
      setLotNumberList(res.data)
    }
    setFieldValue(`items[${index}].qcCheck`, false)
  }

  const getItemObject = (id) => {
    return itemList?.find((item) => item?.id === id)
  }

  const handleCheckQc = (itemId, value) => {
    const params = {
      page: 1,
      limit: 20,
      filter: convertFilterParams({
        itemId: itemId,
        stageId: STAGES_OPTION.SO_EXPORT,
      }),
    }
    actions.getItemQualityPoint(params, (data) => {
      if (data?.items.length > 0) {
        const itemQuality = data?.items[0]
        items.forEach((item, itemIndex) => {
          if (item.itemId === itemId) {
            setFieldValue(`items[${itemIndex}]['qcCheck']`, value)
            setFieldValue(
              `items[${itemIndex}]['qcCriteria']`,
              itemQuality?.code,
            )
            setFieldValue(
              `items[${itemIndex}]['qcCriteriaId']`,
              itemQuality?.id,
            )
          }
        })
      } else {
        addNotification(
          t('productionOrder.item.notHaveQC'),
          NOTIFICATION_TYPE.ERROR,
        )
        items.forEach((item, itemIndex) => {
          if (item.itemId === itemId) {
            setFieldValue(`items[${itemIndex}]['qcCheck']`, false)
            setFieldValue(`items[${itemIndex}]['qcCriteria']`, null)
            setFieldValue(`items[${itemIndex}]['qcCriteriaId']`, null)
          }
        })
      }
    })
  }

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
      headerName: t('soExport.item.name'),
      width: 180,
      renderCell: (params, index) => {
        return (
          <Field.Autocomplete
            name={`items[${index}].itemId`}
            options={saleOrderDetails?.saleOrderDetails}
            getOptionLabel={(opt) => opt?.item?.name}
            getOptionValue={(option) => option?.itemId || ''}
            onChange={(val) => handleChangeItem(val, index, setFieldValue)}
          />
        )
      },
    },
    {
      field: 'code',
      headerName: t('soExport.item.code'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params.row
        return (
          <Field.TextField
            name={`item[${index}].name`}
            value={getItemObject(itemId)?.code || ''}
            disabled={true}
          />
        )
      },
    },
    {
      field: 'lotNumber',
      headerName: t('soExport.item.lotNumber'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params.row
        const objLotNumber = lotNumberList?.find(
          (i) => i?.itemId === itemId || '',
        )
        const listLotNumber = objLotNumber ? objLotNumber?.lotNumbers : []
        return (
          <Field.Autocomplete
            name={`items[${index}].lotNumber`}
            options={listLotNumber || []}
            getOptionLabel={(opt) => opt?.lotNumber}
            getOptionValue={(option) => option?.lotNumber || ''}
            onChange={(val) => {
              const mfg = listLotNumber?.find((i) => i?.lotNumber === val)?.mfg
              setFieldValue(`items[${index}].mfg`, mfg)
            }}
          />
        )
      },
    },
    {
      field: 'mfg',
      headerName: t('soExport.item.mfg'),
      width: 180,
      renderCell: (params, index) => {
        return (
          <Field.DatePicker
            name={`items[${index}].mfg`}
            placeholder={t('soExport.item.mfg')}
            disabled
          />
        )
      },
    },
    {
      field: 'packageId',
      headerName: t('soExport.item.packageCode'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params.row
        const packageList = getItemObject(itemId)?.packages
        return (
          <Field.Autocomplete
            name={`items[${index}].packageId`}
            options={packageList}
            getOptionLabel={(opt) => opt?.code}
            getOptionValue={(option) => option?.id || ''}
          />
        )
      },
    },
    {
      field: 'quantity',
      headerName: t('soExport.item.quantity'),
      width: 180,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].quantity`}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'unitType',
      headerName: t('soExport.item.unitType'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params.row
        return (
          <Field.TextField
            name={`items[${index}].unitType`}
            value={getItemObject(itemId)?.itemUnit?.name || ''}
            disabled
          />
        )
      },
    },
    {
      field: 'qcCheck',
      headerName: t('soExport.item.qcCheck'),
      width: 180,
      renderCell: (params, index) => {
        const { itemId } = params.row
        return (
          <Field.Checkbox
            name={`items[${index}].qcCheck`}
            onChange={(value) => handleCheckQc(itemId, value)}
            disabled={itemId ? false : true}
          />
        )
      },
    },
    {
      field: 'qcCriteriaId',
      headerName: t('soExport.item.qcCriteria'),
      width: 180,
      renderCell: (params) => {
        const { qcCheck, itemId } = params.row
        return qcCheck
          ? itemQualityPoint?.find((i) => i?.itemId === itemId)?.name
          : ''
      },
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
      renderCell: (params) => {
        const idx = items.findIndex((item) => item.id === params.row.id)
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
        <Typography variant="h4">{t('soExport.itemsDetails')}</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                itemId: null,
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
            {t('soExport.item.addItem')}
          </Button>
        </Box>
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
