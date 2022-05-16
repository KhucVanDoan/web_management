import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { SALE_ORDER_STATUS } from '~/modules/database/constants'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

function FilterForm() {
  const { t } = useTranslation(['mesx'])
  const { values } = useFormikContext()

  const {
    data: { moListAll, moItems },
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
    commonManagementActions.getItems({ isGetAll: 1 })
  }, [values?.manufacturingOrderIds])

  const getDataItem = () => {
    const items = []
    if (moItems)
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
    const soId = moListAll?.find(
      (mo) => mo?.id === values?.manufacturingOrderIds[0],
    )?.saleOrderId
    const saleOrders = saleOrderList?.find((so) => so?.id === soId)
    saleOrderLists.push(saleOrders)
    return saleOrderLists
  }

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="manufacturingOrderIds"
          label={t('materialReport.code')}
          placeholder={t('materialReport.code')}
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
          label={t('materialReport.saleOrder')}
          placeholder={t('materialReport.saleOrder')}
          options={
            values?.manufacturingOrderIds && values?.saleOrderIds === ''
              ? getDataSaleOder()
              : saleOrderList
          }
          getOptionValue={(opt) => [opt?.id]}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemName"
          label={t('materialReport.productName')}
          placeholder={t('materialReport.productName')}
          options={getDataItem() || []}
          getOptionValue={(opt) => opt?.name}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
