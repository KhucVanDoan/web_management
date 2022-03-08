import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])

  const [itemList, setItemList] = useState([])
  const [saleOder, setSaleOder] = useState([])
  const { actions: actionSaleOrder } = useSaleOrder()

  const {
    data: { moList, moDetails },
    actions,
  } = useMo()
  useEffect(() => {
    actions.searchMO({ isGetAll: 1 })
  }, [])
  const handleChange = (id) => {
    actions.getMODetailsById(id, (res) => {
      setSaleOder([res?.saleOrder])
    })
  }
  const onchange = (id) => {
    actionSaleOrder.getSaleOrderDetailsById(id, (res) => {
      setItemList(res?.saleOrderDetails)
    })
  }

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moCode"
          label={t('priceReport.moCode')}
          placeholder={t('priceReport.moCode')}
          options={moList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.code}
          onChange={(id) => handleChange(id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="soName"
          label={t('priceReport.saleOrder')}
          placeholder={t('priceReport.saleOrder')}
          options={saleOder}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.code}
          onChange={(id) => onchange(id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemName"
          label={t('priceReport.productName')}
          placeholder={t('priceReport.productName')}
          options={itemList}
          getOptionValue={(opt) => opt?.item?.name}
          getOptionLabel={(opt) => opt?.item?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DatePicker
          value={moDetails?.createdAt}
          label={t('priceReport.moDate')}
          placeholder={t('planReport.labledateSX')}
          type="date"
          name="productionDate"
          inputVariant="outlined"
          format="MM/dd/yyyy"
          margin="dense"
          size="small"
          fullWidth
          clearable="true"
          disabled
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
