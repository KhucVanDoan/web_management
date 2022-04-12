import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const { values } = useFormikContext()

  const {
    data: { moList, moItems },
    actions: moActions,
  } = useMo()

  const {
    data: { saleOrderList },
    actions: actionSaleOrder,
  } = useSaleOrder()

  const {
    data: { itemList },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    actionSaleOrder.searchSaleOrders({
      isGetAll: 1,
      filter: JSON.stringify([
        { column: 'status', text: SALE_ORDER_STATUS.CONFIRMED.toString() },
      ]),
    })
    moActions.searchMO({ isGetAll: 1 })
    commonManagementActions.getItems({ isGetAll: 1 })
  }, [values.moId])

  const getDataItem = () => {
    const items = []
    moItems?.moDetail?.forEach((parentItem) => {
      parentItem?.moPlanBom?.forEach((i) => {
        const listItem = itemList?.find((item) => i.itemId === item.id)
        items.push(listItem)
      })
    })
    return items
  }

  const getDataSaleOder = () => {
    const saleOrderLists = []
    const soId = moList?.find((mo) => mo?.id === values?.moId)?.saleOrderId
    const saleOrders = saleOrderList?.find((so) => so?.id === soId)
    saleOrderLists.push(saleOrders)
    return saleOrderLists
  }

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moId"
          label={t('qualityReport.moName')}
          placeholder={t('qualityReport.moName')}
          options={
            values?.soId
              ? moList.filter((mo) => mo?.saleOrderId === values?.soId)
              : moList
          }
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
          onChange={(id) => moActions.getMoItemsById(id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="soId"
          label={t('qualityReport.saleOrder')}
          placeholder={t('qualityReport.saleOrder')}
          options={values?.moId ? getDataSaleOder() : saleOrderList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemName"
          label={t('qualityReport.productName')}
          placeholder={t('qualityReport.productName')}
          options={getDataItem()}
          getOptionValue={(opt) => opt?.name}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
