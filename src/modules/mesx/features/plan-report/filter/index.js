import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const { values } = useFormikContext()
  const {
    data: { moList },
    actions: moActions,
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
    const soId = moList?.find(
      (mo) => mo?.id === values?.moName?.id,
    )?.saleOrderId
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
          asyncRequest={(s) =>
            searchMOApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: values?.saleOrderIds
                ? JSON.stringify([
                    { column: 'saleOrderIds', text: values?.saleOrderIds },
                  ])
                : [],
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          onChange={(val) => moActions.getMoItemsById(val?.id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderIds"
          label={t('planReport.saleOrder')}
          placeholder={t('planReport.saleOrder')}
          options={
            values?.moName && values?.saleOrderIds === ''
              ? getDataSaleOder()
              : saleOrderList
          }
          getOptionValue={(opt) => opt?.id}
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
