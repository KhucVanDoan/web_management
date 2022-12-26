import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  PARENT_BUSINESS_TYPE,
  WAREHOUSE_EXPORT_TYPE,
} from '~/modules/wmsx/constants'
import { searchBusinessTypesApi } from '~/modules/wmsx/redux/sagas/business-type-management/search-business-types'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { convertFilterParams } from '~/utils'

const FilterForm = ({ momentsType }) => {
  const { t } = useTranslation(['wmsx'])

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="orderCode"
          label={t('movements.importExport.idWms')}
          placeholder={t('movements.importExport.idWms')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="departmentReceiptId"
          label={t('warehouseExportReceipt.departmentReception')}
          placeholder={t('warehouseExportReceipt.departmentReception')}
          asyncRequest={(s) =>
            searchReceiptDepartmentApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                status: 1,
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="businessTypeId"
          label={t('warehouseExportReceipt.typeBusiness')}
          placeholder={t('warehouseExportReceipt.typeBusiness')}
          asyncRequest={(s) =>
            searchBusinessTypesApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                status: 1,
                parentBusiness:
                  momentsType === WAREHOUSE_EXPORT_TYPE.SO
                    ? PARENT_BUSINESS_TYPE.EXPORT
                    : momentsType === WAREHOUSE_EXPORT_TYPE.TRANSFER
                    ? PARENT_BUSINESS_TYPE.TRANSFER
                    : null,
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('movements.importExport.createdAt')}
          placeholder={t('movements.importExport.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
