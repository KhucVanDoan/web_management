import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const {
    data: { moList },
    actions,
  } = useMo()

  const [itemList, setItemList] = useState([])
  const {
    data: { saleOrderList, saleOrderDetails },
    actions: actionSaleOrder,
  } = useSaleOrder()

  useEffect(() => {
    actionSaleOrder.searchSaleOrders({
      isGetAll: 1,
      filter: JSON.stringify([
        { column: 'status', text: SALE_ORDER_STATUS.CONFIRMED.toString() },
      ]),
    })
    actions.searchMO({ isGetAll: 1 })
  }, [])

  const handleChange = (id) => {
    actionSaleOrder.getSaleOrderDetailsById(id)
    setItemList(saleOrderDetails?.saleOrderDetails)
  }
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moId"
          label={t('qualityReport.moName')}
          placeholder={t('qualityReport.moName')}
          options={moList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="soId"
          label={t('qualityReport.saleOrder')}
          placeholder={t('qualityReport.saleOrder')}
          options={saleOrderList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
          onChange={(id) => handleChange(id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemName"
          label={t('qualityReport.productName')}
          placeholder={t('qualityReport.productName')}
          options={itemList}
          getOptionValue={(opt) => opt?.item?.name}
          getOptionLabel={(opt) => opt?.item?.name}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
