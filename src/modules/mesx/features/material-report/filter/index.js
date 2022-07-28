import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { SALE_ORDER_STATUS } from '~/modules/database/constants'
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'
import { convertFilterParams } from '~/utils'

function FilterForm() {
  const { t } = useTranslation(['mesx'])
  const { values } = useFormikContext()

  const {
    data: { moItems },
    actions: moActions,
  } = useMo()

  const {
    data: { itemList },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
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
              filter: values?.saleOrder?.name
                ? JSON.stringify([
                    { column: 'saleOrderIds', text: values?.saleOrder?.name },
                  ])
                : [],
              // @TODO: <doan.khucvan - yen.nguyenhai> update this filter later
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          onChange={(val) => moActions.getMoItemsById(val?.id)}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrder"
          label={t('materialReport.saleOrder')}
          placeholder={t('materialReport.saleOrder')}
          asyncRequest={(s) =>
            searchSaleOrdersApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                ...(values?.manufacturingOrderIds?.saleOrderId
                  ? { id: values?.manufacturingOrderIds?.saleOrderId }
                  : {}),
                status: SALE_ORDER_STATUS.CONFIRMED.toString(),
              }),
              // @TODO: <doan.khucvan - yen.nguyenhai> update this filter later
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
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
