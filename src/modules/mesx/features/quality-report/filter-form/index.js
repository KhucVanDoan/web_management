import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'
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
  }, [values.moName])

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
          label={t('qualityReport.moName')}
          placeholder={t('qualityReport.moName')}
          asyncRequest={(s) =>
            searchMOApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: values?.soName
                ? JSON.stringify([
                    { column: 'saleOrderIds', text: [values?.soName] },
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
          name="saleOrderName"
          label={t('qualityReport.saleOrder')}
          placeholder={t('qualityReport.saleOrder')}
          options={
            values?.moName && values?.soName === ''
              ? getDataSaleOder()
              : saleOrderList
          }
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
