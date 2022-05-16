import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { SALE_ORDER_STATUS } from '~/modules/database/constants'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'

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
  const handle = (id) => {
    moActions.getMoItemsById(id)
  }
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="manufacturingOrderIds"
          label={t('materialReport.code')}
          placeholder={t('materialReport.code')}
          options={
            values?.saleOrderIds
              ? moListAll.filter(
                  (mo) => mo?.saleOrderId === values?.saleOrderIds[0],
                )
              : moListAll
          }
          getOptionValue={(opt) => [opt?.id]}
          getOptionLabel={(opt) => opt?.code}
          onChange={(id) => handle(id)}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderName"
          label={t('materialReport.saleOrder')}
          placeholder={t('materialReport.saleOrder')}
          options={
            values?.manufacturingOrderIds ? getDataSaleOder() : saleOrderList
          }
          getOptionValue={(opt) => [opt?.name]}
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
