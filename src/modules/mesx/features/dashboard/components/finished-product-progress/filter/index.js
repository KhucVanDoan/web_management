import React, { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import {
  getFinishedItemProgressApi,
  getFinishedItemByMoApi,
} from '~/modules/mesx/redux/sagas/dashboard'

import FilterDialog from '../../filter-dialog'

const Filter = ({ setTmpFinishedItemProgress = () => {}, inProgressMos }) => {
  const { t } = useTranslation(['mesx'])

  const [itemList, setItemList] = useState([])
  const [itemId, setItemId] = useState()
  const [moId, setMoId] = useState()

  const getFinishedItemProgress = async (params) => {
    const res = await getFinishedItemProgressApi(params)

    if (res?.statusCode === 200) {
      setTmpFinishedItemProgress(res?.data || [])
    }
  }

  const getFinishedItemByMo = async (id) => {
    if (!id) {
      setItemList([])
      return
    }

    const res = await getFinishedItemByMoApi(id)

    if (res?.statusCode === 200) {
      setItemList(res?.data || [])
    }
  }

  const handleChangeMo = (id) => {
    getFinishedItemByMo(id)
    setMoId(id)
    setItemId()
  }

  const handleSubmit = () => {
    getFinishedItemProgress({ moId, itemId })
  }

  return (
    <FilterDialog onSubmit={handleSubmit}>
      <Grid
        container
        rowSpacing={4 / 3}
        columnSpacing={{ xl: 4, xs: 2 }}
        sx={{ mb: 1 }}
      >
        <Grid item xs={12}>
          <Autocomplete
            options={inProgressMos}
            label={t('dashboard.selectMo')}
            labelWidth={120}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(opt) => opt?.id}
            onChange={(id) => handleChangeMo(id)}
            value={moId}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={itemList}
            label={t('dashboard.finishedItemName')}
            getOptionLabel={(opt) => opt?.item?.name}
            getOptionValue={(opt) => opt?.item?.itemId}
            labelWidth={120}
            onChange={(id) => setItemId(id)}
            value={itemId}
          />
        </Grid>
      </Grid>
    </FilterDialog>
  )
}

export default Filter
