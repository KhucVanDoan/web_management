import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import { WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION } from '~/modules/wmsx/constants'
import { searchManagamentUnitApi } from '~/modules/wmsx/redux/sagas/management-unit/search'
import { convertFilterParams } from '~/utils'

const FilterForm = () => {
  const { t } = useTranslation('wmsx')

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('warehouseExportProposal.paperNumber')}
          placeholder={t('managementUnit.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="departmentSettingId"
          label={t('warehouseExportProposal.unit')}
          placeholder={t('warehouseExportProposal.unit')}
          asyncRequest={(s) =>
            searchManagamentUnitApi({
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
          name="status"
          label={t('general.status')}
          placeholder={t('general.status')}
          options={WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION}
          getOptionLabel={(opt) => t(opt?.text)}
          getOptionValue={(opt) => opt?.id?.toString()}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="receiptDate"
          label={t('warehouseExportProposal.createdAt')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
