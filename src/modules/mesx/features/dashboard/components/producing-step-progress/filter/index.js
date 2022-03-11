import { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import { useDashboardProducingStepProgress } from '~/modules/mesx/redux/hooks/useDashboard'

import FilterDialog from '../../filter-dialog'

function Filter() {
  const { t } = useTranslation(['mesx'])
  const [moId, setMoId] = useState()
  const [itemId, setItemId] = useState()
  const [routingId, setRoutingId] = useState()
  const [producingStepId, setProducingStepId] = useState()
  const [itemList, setItemList] = useState([])
  const [routing, setRouting] = useState()
  const [productStep, setProductStep] = useState([])

  const {
    actions,
    data: { inProgressMos },
  } = useDashboardProducingStepProgress()

  const handleChangeMo = (id) => {
    setMoId(id)

    if (!id) {
      setItemList([])
      setRouting([])
      setProductStep([])

      setItemId('')
      setRoutingId('')
      setProducingStepId('')
      return
    }
    actions.getDashboardAllItemByMo(id, (data) => setItemList(data))
  }
  const handleChangeItem = (id) => {
    setItemId(id)

    if (!id) {
      setRouting([])
      setProductStep([])

      setRoutingId('')
      setProducingStepId('')
      return
    }

    const params = {
      moId: moId,
      itemId: id,
    }
    actions.getDashboardBomItemRoutingByMo(params, (data) => {
      setRouting([data?.routing])
      setProductStep(data?.producingSteps)
    })
  }
  const handleSubmit = () => {
    const params = {
      boqId: moId,
      itemId: itemId,
      producingStepId: producingStepId,
      routingId: routingId,
    }
    actions.getDashboardProducingStepProgress(params)
  }
  return (
    <FilterDialog onSubmit={handleSubmit}>
      <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 4, xs: 2 }}>
        <Grid item xs={12}>
          <Autocomplete
            options={inProgressMos}
            label={t('dashboard.selectMo')}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(opt) => opt?.id}
            onChange={(id) => handleChangeMo(id)}
            value={moId}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={itemList}
            label={t('dashboard.itemName')}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(opt) => opt?.id}
            onChange={(id) => handleChangeItem(id)}
            value={itemId}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={routing}
            label={t('dashboard.routing')}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(opt) => opt?.id}
            onChange={(id) => setRoutingId(id)}
            value={routingId}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={productStep}
            label={t('dashboard.producingStepName')}
            getOptionLabel={(opt) => opt?.name}
            getOptionValue={(opt) => opt?.id}
            onChange={(id) => setProducingStepId(id)}
            value={producingStepId}
          />
        </Grid>
      </Grid>
    </FilterDialog>
  )
}

export default Filter
