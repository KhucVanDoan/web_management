import React from 'react'

import { createFilterOptions, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  ASYNC_SEARCH_LIMIT,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import { Field } from '~/components/Formik'
import useItemType from '~/modules/mesx/redux/hooks/useItemType'
import { searchItemGroupsApi } from '~/modules/mesx/redux/sagas/item-group-setting/search-item-groups'
const FilterForm = () => {
  const { t } = useTranslation('mesx')

  const {
    data: { itemTypeList },
  } = useItemType()

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineItem.code')}
          placeholder={t('defineItem.code')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineItem.name')}
          placeholder={t('defineItem.name')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemTypeCode"
          label={t('defineItem.type')}
          placeholder={t('defineItem.type')}
          options={itemTypeList}
          getOptionValue={(opt) => opt?.code}
          getOptionLabel={(opt) => `${opt?.code} - ${opt?.name}`}
          filterOptions={createFilterOptions({
            stringify: (opt) => `${opt?.code}|${opt?.name}`,
          })}
          multiple
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemGroupCode"
          label={t('defineItem.group')}
          placeholder={t('defineItem.group')}
          asyncRequest={(s) =>
            searchItemGroupsApi({
              keyword: s,
              limit: ASYNC_SEARCH_LIMIT,
            })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.name}
          getOptionSubLabel={(opt) => opt?.code}
          multiple
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineItem.createTime')}
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
