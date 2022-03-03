import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { BOQ_STATUS_OPTIONS } from '~/common/constants'
import { Field } from '~/components/Formik'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import useRequestBuyMaterial from '~/modules/mesx/redux/hooks/useRequestBuyMaterial'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'

function FilterForm() {
  const { t } = useTranslation(['mesx'])
  const {
    data: { planList },
  } = useDefinePlan()

  const {
    data: { requestBuyMaterialList },
  } = useRequestBuyMaterial()

  const {
    data: { saleOrderList },
  } = useSaleOrder()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="code"
          label={t('requestBuyMaterial.requestCode')}
          placeholder={t('requestBuyMaterial.requestCode')}
          options={requestBuyMaterialList}
          getOptionValue={(opt) => opt?.code?.toString()}
          getOptionLabel={(opt) => opt?.code || ''}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('requestBuyMaterial.requestName')}
          placeholder={t('requestBuyMaterial.requestName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="planName"
          label={t('requestBuyMaterial.planName')}
          placeholder={t('requestBuyMaterial.planName')}
          options={planList}
          getOptionValue={(opt) => opt?.name?.toString()}
          getOptionLabel={(opt) => opt?.name || ''}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderCode"
          label={t('requestBuyMaterial.soCode')}
          placeholder={t('requestBuyMaterial.soCode')}
          options={saleOrderList}
          getOptionValue={(opt) => opt?.code?.toString()}
          getOptionLabel={(opt) => opt?.code || ''}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('requestBuyMaterial.status')}
          placeholder={t('requestBuyMaterial.status')}
          options={BOQ_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('requestBuyMaterial.createAt')}
          placeholder={t('requestBuyMaterial.createAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
