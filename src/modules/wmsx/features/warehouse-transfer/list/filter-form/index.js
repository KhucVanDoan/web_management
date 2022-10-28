import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  ASYNC_SEARCH_LIMIT,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { searchUsersApi } from '~/modules/mesx/redux/sagas/user-management/search-users'
import {
  ACTIVE_STATUS,
  TRANSFER_STATUS_OPTIONS,
  WAREHOUSE_TRANSFER_TYPE_OPTIONS,
} from '~/modules/wmsx/constants'
import { searchWarehouseApi } from '~/modules/wmsx/redux/sagas/define-warehouse/search-warehouse'
import { convertFilterParams } from '~/utils'

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
          name="destinationWarehouseId"
          label={t('warehouseTransfer.warehouseImport')}
          placeholder={t('warehouseTransfer.warehouseImport')}
          asyncRequest={(s) =>
            searchWarehouseApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                status: ACTIVE_STATUS.ACTIVE,
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
          name="sourceWarehouseId"
          label={t('warehouseTransfer.warehouseExport')}
          placeholder={t('warehouseTransfer.warehouseExport')}
          asyncRequest={(s) =>
            searchWarehouseApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
              filter: convertFilterParams({
                status: ACTIVE_STATUS.ACTIVE,
              }),
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
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
        <Field.Autocomplete
          name="createdByUserId"
          label={t('warehouseTransfer.createdByUser')}
          placeholder={t('warehouseTransfer.createdByUser')}
          asyncRequest={(s) =>
            searchUsersApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.username}
          getOptionSubLabel={(opt) => opt?.fullName}
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
