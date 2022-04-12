import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { NUMBER_OF_TIMES_QC_TRANSACTION } from '~/modules/qmsx/constants'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'

const ProductionInputQualityProductPreviousFilterForm = () => {
  const { t } = useTranslation('qmsx')

  const {
    data: { orderList },
    actions,
  } = useQualityReport()

  const { setFieldValue } = useFormikContext()

  const moCodeField = 'moCode'

  const transKey = 'transactionHistory.header'

  useEffect(() => {
    setFieldValue(moCodeField, null)
    actions.getMoList()
  }, [])

  const handleChangeMo = (code) => setFieldValue(moCodeField, code)

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name={moCodeField}
          label={t(`${transKey}.moCode`)}
          placeholder={t(`${transKey}.moCode`)}
          options={orderList}
          getOptionValue={(option) => option?.code}
          getOptionLabel={(option) => option?.code}
          onChange={(code) => handleChangeMo(code)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t(`${transKey}.code`)}
          placeholder={t(`${transKey}.code`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="woCode"
          label={t(`${transKey}.woCode`)}
          placeholder={t(`${transKey}.woCode`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="moName"
          label={t(`${transKey}.moName`)}
          placeholder={t(`${transKey}.moName`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="parentBomName"
          label={t(`${transKey}.parentBomName`)}
          placeholder={t(`${transKey}.parentBomName`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="bomName"
          label={t(`${transKey}.bomName`)}
          placeholder={t(`${transKey}.bomName`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="errorReportCode"
          label={t(`${transKey}.errorReportCode`)}
          placeholder={t(`${transKey}.errorReportCode`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="producingStepName"
          label={t(`${transKey}.producingStepName`)}
          placeholder={t(`${transKey}.producingStepName`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="numberOfTimeSearch"
          label={t(`${transKey}.numberOfTimeSearch`)}
          placeholder={t(`${transKey}.numberOfTimeSearch`)}
          options={NUMBER_OF_TIMES_QC_TRANSACTION}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => t(option.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Field.DateRangePicker
            name="createdAt"
            label={t(`${transKey}.createdAt`)}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductionInputQualityProductPreviousFilterForm
