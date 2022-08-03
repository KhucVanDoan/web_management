import React from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'
import { SALE_ORDER_STATUS } from '~/modules/mesx/constants'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const { values } = useFormikContext()
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moName"
          label={t('planReport.moName')}
          placeholder={t('planReport.moName')}
          asyncRequest={(s) =>
            searchMOApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: values?.saleOrderIds?.id
                ? JSON.stringify([
                    {
                      column: 'saleOrderIds',
                      text: [values?.saleOrderIds?.id],
                    },
                  ])
                : [],
            })
          }
          asyncRequestDeps={values?.saleOrderIds?.id}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrderIds"
          label={t('planReport.saleOrder')}
          placeholder={t('planReport.saleOrder')}
          asyncRequest={(s) =>
            searchSaleOrdersApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: JSON.stringify([
                ...(values?.moName?.id
                  ? [
                      {
                        column: 'moId',
                        text: values?.moName?.id,
                      },
                    ]
                  : []),
                {
                  column: 'status',
                  text: SALE_ORDER_STATUS.CONFIRMED.toString(),
                },
              ]),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          asyncRequestDeps={values?.moName?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="plan"
          label={t('planReport.labledateSX')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
