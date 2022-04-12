import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'

const ProductionOutputQualityFilterForm = () => {
  const { t } = useTranslation('qmsx')

  const [itemList, setItemList] = useState([])

  const {
    data: { orderList },
    actions,
  } = useQualityReport()

  const [moCodeField, itemCodeField] = ['moCode', 'itemCode']

  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    resetFields()
    actions.getMoList()
  }, [])

  const resetFields = () => {
    setFieldValue(moCodeField, null)
    setFieldValue(itemCodeField, null)
  }

  const resetItemValue = () => {
    setItemList([])
    setFieldValue(itemCodeField, null)
  }

  const handleChangeMo = (code) => {
    setFieldValue(moCodeField, code)
    resetItemValue()

    if (isEmpty(code)) return

    const mo = orderList?.find((order) => order.code === code)

    if (!mo) return

    actions.getItemListByMo({ moId: mo.id }, (data) => {
      setItemList(data)
    })
  }

  const handleChangeItem = (code) => setFieldValue(itemCodeField, code)

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name={moCodeField}
          label={t('qualityReport.moCode')}
          placeholder={t('qualityReport.moCode')}
          options={orderList}
          getOptionValue={(option) => option?.code}
          getOptionLabel={(option) => option?.code}
          onChange={(code) => handleChangeMo(code)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name={itemCodeField}
          label={t('qualityReport.itemCode')}
          placeholder={t('qualityReport.itemCode')}
          options={itemList}
          getOptionValue={(option) => option?.code}
          getOptionLabel={(option) => option?.code}
          onChange={(code) => handleChangeItem(code)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="moName"
          label={t('qualityReport.moName')}
          placeholder={t('qualityReport.moName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('qualityReport.itemName')}
          placeholder={t('qualityReport.itemName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="routingName"
          label={t('qualityReport.routingName')}
          placeholder={t('qualityReport.routingName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="producingStepName"
          label={t('qualityReport.producingStepName')}
          placeholder={t('qualityReport.producingStepName')}
        />
      </Grid>
    </Grid>
  )
}

export default ProductionOutputQualityFilterForm
