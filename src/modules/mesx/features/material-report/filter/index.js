import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { SALE_ORDER_STATUS } from '~/modules/database/constants'
import { searchItemsApi } from '~/modules/database/redux/sagas/define-item/search-items'
import { searchSaleOrdersApi } from '~/modules/database/redux/sagas/sale-order/search-sale-orders'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

function FilterForm() {
  const { t } = useTranslation(['mesx'])
  const { values, setFieldValue } = useFormikContext()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="manufacturingOrderIds"
          label={t('materialReport.code')}
          placeholder={t('materialReport.code')}
          asyncRequest={(s) =>
            searchMOApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: values?.saleOrder?.id
                ? JSON.stringify([
                    { column: 'saleOrderIds', text: [values?.saleOrder?.id] },
                  ])
                : [],
            })
          }
          asyncRequestDeps={values?.saleOrder?.id}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          onChange={() => setFieldValue('itemName', '')}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="saleOrder"
          label={t('materialReport.saleOrder')}
          placeholder={t('materialReport.saleOrder')}
          asyncRequest={(s) =>
            searchSaleOrdersApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: JSON.stringify([
                ...(values?.manufacturingOrderIds?.id
                  ? [
                      {
                        column: 'moId',
                        text: values?.manufacturingOrderIds?.id,
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
          asyncRequestDeps={values?.manufacturingOrderIds?.id}
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemName"
          label={t('materialReport.productName')}
          placeholder={t('materialReport.productName')}
          asyncRequest={(s) =>
            searchItemsApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: values?.manufacturingOrderIds?.id
                ? JSON.stringify([
                    {
                      column: 'moId',
                      text: values?.manufacturingOrderIds?.id,
                    },
                  ])
                : [],
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          asyncRequestDeps={values?.manufacturingOrderIds?.id}
          getOptionLabel={(opt) => opt?.name}
          disabled={!values?.manufacturingOrderIds}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
