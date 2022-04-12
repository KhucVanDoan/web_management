import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const { values } = useFormikContext()
  const {
    data: { moList },
  } = useMo()

  const {
    data: { saleOrderList },
    actions: actionSaleOrder,
  } = useSaleOrder()

  useEffect(() => {
    actionSaleOrder.searchSaleOrders({
      isGetAll: 1,
      filter: JSON.stringify([
        { column: 'status', text: SALE_ORDER_STATUS.CONFIRMED.toString() },
      ]),
    })
  }, [values?.moName])

  const getDataSaleOder = () => {
    const saleOrderLists = []
    const soId = moList?.find((mo) => mo?.code === values?.moName)?.saleOrderId
    const saleOrders = saleOrderList?.find((so) => so?.id === soId)
    saleOrderLists.push(saleOrders)
    return saleOrderLists
  }

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moName"
          label={t('planReport.moName')}
          placeholder={t('planReport.moName')}
          options={
            values?.saleOrderIds
              ? moList.filter(
                  (mo) => mo?.saleOrderId === values?.saleOrderIds[0],
                )
              : moList
          }
          getOptionValue={(opt) => opt?.code}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderIds"
          label={t('planReport.saleOrder')}
          placeholder={t('planReport.saleOrder')}
          options={values?.moName ? getDataSaleOder() : saleOrderList}
          getOptionValue={(opt) => [opt?.id]}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="plan"
          label={t('planReport.labledateSX')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
