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
  STATUS_SYNC_WAREHOUSE_IMPORT_TO_EBS_OPTIONS,
  WAREHOUSE_IMPORT_RECEIPT_OPTIONS,
} from '~/modules/wmsx/constants'
import { searchBusinessTypesApi } from '~/modules/wmsx/redux/sagas/business-type-management/search-business-types'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { searchReceiptDepartmentApi } from '~/modules/wmsx/redux/sagas/receipt-department-management/search-receipt-department'
import { searchSourceManagementApi } from '~/modules/wmsx/redux/sagas/source-management/search'
import { convertFilterParams } from '~/utils'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('warehouseImportReceipt.id')}
          placeholder={t('warehouseImportReceipt.id')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="businessTypeId"
          label={t('warehouseImportReceipt.expenditureType')}
          placeholder={t('warehouseImportReceipt.expenditureType')}
          asyncRequest={(s) =>
            searchBusinessTypesApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                parentBusiness: PARENT_BUSINESS_TYPE.IMPORT,
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="departmentReceiptId"
          label={t('warehouseImportReceipt.unit')}
          placeholder={t('warehouseImportReceipt.unit')}
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
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseId"
          label={t('warehouseImportReceipt.warehouse')}
          placeholder={t('warehouseImportReceipt.warehouse')}
          asyncRequest={(s) =>
            searchWarehouseApi({
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
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="sourceId"
          label={t('warehouseImportReceipt.sourceFilter')}
          placeholder={t('warehouseImportReceipt.sourceFilter')}
          asyncRequest={(s) =>
            searchSourceManagementApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                status: 1,
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          multiple
          label={t('warehouseImportReceipt.status')}
          placeholder={t('warehouseImportReceipt.status')}
          options={WAREHOUSE_IMPORT_RECEIPT_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="syncStatus"
          multiple
          label={t('warehouseImportReceipt.syncStatus')}
          placeholder={t('warehouseImportReceipt.syncStatus')}
          options={STATUS_SYNC_WAREHOUSE_IMPORT_TO_EBS_OPTIONS}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="receiptDate"
          label={t('warehouseImportReceipt.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
