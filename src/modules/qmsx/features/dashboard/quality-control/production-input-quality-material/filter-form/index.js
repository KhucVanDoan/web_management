import { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import FilterDialog from '~/modules/qmsx/features/dashboard/filter-dialog'
import {
  useDashboardMo,
  useDashboardProductionInputQualityMaterial,
} from '~/modules/qmsx/redux/hooks/useDashboard'

function ProductionInputQualityMaterialFilterForm() {
  const { t } = useTranslation('qmsx')

  const [moId, setMoId] = useState()
  const [itemId, setItemId] = useState()
  const [itemList, setItemList] = useState([])
  const [producingStepId, setProducingStepId] = useState()
  const [producingStepList, setProducingStepList] = useState([])
  const [materialId, setMaterialId] = useState()
  const [materialList, setMaterialList] = useState([])

  const { data: moList, actions: moActions } = useDashboardMo()
  const { actions: dashboardActions } =
    useDashboardProductionInputQualityMaterial()

  const resetMaterialState = () => {
    setMaterialId(null)
    setMaterialList([])
  }

  const resetItemState = () => {
    setItemId(null)
    setItemList([])
  }

  const resetProducingStepState = () => {
    setProducingStepId(null)
    setProducingStepList([])
  }

  const handleChangeMo = (id) => {
    setMoId(id)
    resetItemState()
    resetProducingStepState()
    resetMaterialState()

    if (!id) return

    moActions.getItemListByMoDashboard({ moId: id }, (data) =>
      setItemList(data),
    )
  }

  const handleChangeItem = (id) => {
    setItemId(id)
    resetProducingStepState()
    resetMaterialState()

    if (!id) return

    moActions.getProducingStepListByItemMoDashboard(
      { itemId: id, moId: moId },
      (data) => setProducingStepList(data),
    )
  }

  const handleChangeProducingStep = (id) => {
    setProducingStepId(id)
    resetMaterialState()

    if (!id) return

    moActions.getMaterialList(
      { itemId: itemId, moId: moId, producingStepId: id },
      (data) => setMaterialList(data),
    )
  }

  const handleChangeMaterial = (id) => {
    setMaterialId(id)
  }

  const handleSubmit = () => {
    const params = {
      moId: moId,
      itemId: itemId,
      producingStepId: producingStepId,
      itemMaterialId: materialId,
    }

    dashboardActions.getProductionInputQualityMaterialDashboard(params)
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
            name="moName"
            options={moList}
            label={t('dashboard.moName')}
            placeholder={t('dashboard.moName')}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            onChange={(id) => handleChangeMo(id)}
            value={moId}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={itemList}
            label={t('dashboard.itemName')}
            placeholder={t('dashboard.itemName')}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            onChange={(id) => handleChangeItem(id)}
            value={itemId}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={producingStepList}
            label={t('dashboard.producingStepName')}
            placeholder={t('dashboard.producingStepName')}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            onChange={(id) => handleChangeProducingStep(id)}
            value={producingStepId}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={materialList}
            label={t('dashboard.materialName')}
            placeholder={t('dashboard.materialName')}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            onChange={(id) => handleChangeMaterial(id)}
            value={materialId}
          />
        </Grid>
      </Grid>
    </FilterDialog>
  )
}

export default ProductionInputQualityMaterialFilterForm
