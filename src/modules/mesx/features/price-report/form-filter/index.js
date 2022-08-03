import React from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchItemsApi } from '~/modules/database/redux/sagas/define-item/search-items'
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'
const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const { values, setFieldValue } = useFormikContext()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moCode"
          label={t('qualityReport.moName')}
          placeholder={t('qualityReport.moName')}
          asyncRequest={(s) =>
            searchMOApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: values?.soName
                ? JSON.stringify([
                    { column: 'saleOrderIds', text: [values?.soName] },
                  ])
                : [],
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          asyncRequestDeps={values?.soName}
          getOptionLabel={(opt) => opt?.name}
          onChange={() => setFieldValue('itemName', '')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="soName"
          label={t('qualityReport.saleOrder')}
          placeholder={t('qualityReport.saleOrder')}
          asyncRequest={(s) =>
            searchSaleOrdersApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: JSON.stringify([
                values?.moCode?.id && {
                  column: 'moId',
                  text: values?.moCode?.id,
                },
                {
                  column: 'status',
                  text: SALE_ORDER_STATUS.CONFIRMED.toString(),
                },
              ]),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          asyncRequestDeps={values?.moCode?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemName"
          label={t('qualityReport.productName')}
          placeholder={t('qualityReport.productName')}
          asyncRequest={(s) =>
            searchItemsApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: values?.moCode?.id
                ? JSON.stringify([{ column: 'moId', text: values?.moCode?.id }])
                : [],
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          asyncRequestDeps={values?.moCode?.id}
          getOptionLabel={(opt) => opt?.name}
          disabled={!values?.moCode}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
