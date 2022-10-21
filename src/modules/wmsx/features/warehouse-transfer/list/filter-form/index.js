import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  ASYNC_SEARCH_LIMIT,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import {
  TRANSFER_STATUS_OPTIONS,
  WAREHOUSE_TRANSFER_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('warehouseTransfer.code')}
          placeholder={t('warehouseTransfer.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('warehouseTransfer.name')}
          placeholder={t('warehouseTransfer.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="type"
          label={t('warehouseTransfer.type')}
          placeholder={t('warehouseTransfer.type')}
          options={WAREHOUSE_TRANSFER_TYPE_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseImportId"
          label={t('warehouseTransfer.warehouseImport')}
          placeholder={t('warehouseTransfer.warehouseImport')}
          asyncRequest={(s) =>
            searchWarehouseApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="warehouseExportId"
          label={t('warehouseTransfer.warehouseExport')}
          placeholder={t('warehouseTransfer.warehouseExport')}
          asyncRequest={(s) =>
            searchWarehouseApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
          getOptionLabel={(opt) => opt?.code}
          getOptionSubLabel={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="receiptNoEbs"
          label={t('warehouseTransfer.receiptNoEbs')}
          placeholder={t('warehouseTransfer.receiptNoEbs')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="createdByUser"
          label={t('warehouseTransfer.createdByUser')}
          placeholder={t('warehouseTransfer.createdByUser')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('warehouseTransfer.table.createdAt')}
          placeholder={t('warehouseTransfer.table.createdAt')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="status"
          label={t('warehouseTransfer.status')}
          placeholder={t('warehouseTransfer.status')}
          options={TRANSFER_STATUS_OPTIONS}
          getOptionValue={(opt) => opt?.id?.toString()}
          getOptionLabel={(opt) => t(opt?.text)}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
