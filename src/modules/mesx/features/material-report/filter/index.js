import { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

function FilterForm() {
  const { t } = useTranslation(['mesx'])

  const {
    data: { moListAll },
  } = useMo()

  const [itemList, setItemList] = useState([])
  const {
    data: { saleOrderList, saleOrderDetails },
    actions: actionSaleOrder,
  } = useSaleOrder()

  const handleChange = (id) => {
    actionSaleOrder.getSaleOrderDetailsById(id)
    setItemList(saleOrderDetails?.saleOrderDetails)
  }

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="manufacturingOrderIds"
          label={t('materialReport.code')}
          placeholder={t('materialReport.code')}
          options={moListAll}
          getOptionValue={(opt) => [opt?.id]}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderIds"
          label={t('materialReport.saleOrder')}
          placeholder={t('materialReport.saleOrder')}
          options={saleOrderList}
          getOptionValue={(opt) => [opt?.id]}
          getOptionLabel={(opt) => opt?.code}
          onChange={(id) => handleChange(id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemName"
          label={t('materialReport.productName')}
          placeholder={t('materialReport.productName')}
          options={itemList}
          getOptionValue={(opt) => opt?.item?.name}
          getOptionLabel={(opt) => opt?.item?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="moFrom"
          label={t('materialReport.labledateSX')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
