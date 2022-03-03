import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import useDefineItem from '~/modules/mesx/redux/hooks/useDefineItem'

const FilterForm = () => {
  const { t } = useTranslation('mesx')
  const { appStore } = useAppStore()

  const {
    data: { itemList },
  } = useDefineItem()

  const itemTypeList = []
  // eslint-disable-next-line array-callback-return
  itemList.map((item) => {
    if (!itemTypeList.includes(item.itemType.name))
      return itemTypeList.push(item.itemType.name)
  })

  const itemGroupList = []
  // eslint-disable-next-line array-callback-return
  itemList.map((item) => {
    if (!itemGroupList.includes(item.itemGroup.name))
      return itemGroupList.push(item.itemGroup.name)
  })

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t('defineItem.code')}
          placeholder={t('defineItem.code')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="name"
          label={t('defineItem.name')}
          placeholder={t('defineItem.name')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemType"
          label={t('defineItem.type')}
          placeholder={t('defineItem.type')}
          options={appStore?.itemTypes}
          getOptionLabel={(opt) => opt?.name}
          getOptionValue={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemGroup"
          label={t('defineItem.group')}
          placeholder={t('defineItem.group')}
          options={appStore?.itemGroups}
          getOptionLabel={(opt) => opt?.name}
          getOptionValue={(opt) => opt?.name}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.DateRangePicker
          name="createdAt"
          label={t('defineItem.createTime')}
          type="date"
        />
      </Grid>
    </Grid>
  )
}

export default FilterForm
