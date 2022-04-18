import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { BOQ_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { searchRequestBuyMaterialsApi } from '~/modules/mesx/redux/sagas/request-buy-material/search-request-buy-materials'
import { searchSaleOrdersApi } from '~/modules/mesx/redux/sagas/sale-order/search-sale-orders'

function FilterForm() {
  const { t } = useTranslation(['mesx'])
  // const {
  //   data: { moList },
  // } = useMo()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="code"
          label={t('requestBuyMaterial.requestCode')}
          placeholder={t('requestBuyMaterial.requestCode')}
          asyncRequest={(s) =>
            searchRequestBuyMaterialsApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('requestBuyMaterial.requestName')}
          placeholder={t('requestBuyMaterial.requestName')}
          inputProps={{ maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX }}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Field.Autocomplete
          name="moId"
          label={t('requestBuyMaterial.moCode')}
          placeholder={t('requestBuyMaterial.moCode')}
          options={moList}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.code || ''}
        />
      </Grid> */}
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderCode"
          label={t('requestBuyMaterial.soCode')}
          placeholder={t('requestBuyMaterial.soCode')}
          asyncRequest={(s) =>
            searchSaleOrdersApi({ keyword: s, limit: ASYNC_SEARCH_LIMIT })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
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
