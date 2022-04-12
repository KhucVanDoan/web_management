import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { ERROR_REPORT_STATUS, STAGES } from '~/modules/qmsx/constants'

const FilterForm = () => {
  const { t } = useTranslation('qmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineErrorReport.code')}
          placeholder={t('defineErrorReport.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineErrorReport.name')}
          placeholder={t('defineErrorReport.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="qcStageId"
          label={t('defineErrorReport.qcStages')}
          placeholder={t('defineErrorReport.qcStages')}
          options={STAGES}
          getOptionValue={(option) => option?.value.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="orderName"
          label={t('defineErrorReport.orderName')}
          placeholder={t('defineErrorReport.orderName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="transactionHistoryCode"
          label={t('defineErrorReport.transactionHistoryCode')}
          placeholder={t('defineErrorReport.transactionHistoryCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineErrorReport.createdAt')}
          placeholder={t('defineErrorReport.createdAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="createdBy"
          label={t('defineErrorReport.createdBy')}
          placeholder={t('defineErrorReport.createdBy')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('defineErrorReport.status')}
          placeholder={t('defineErrorReport.status')}
          options={ERROR_REPORT_STATUS}
          getOptionValue={(option) => option?.id?.toString()}
          getOptionLabel={(option) => t(option?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
