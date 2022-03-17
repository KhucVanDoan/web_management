import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { MO_STATUS } from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'

const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const [listItem, setListItem] = useState([])
  const [itemId, setItemId] = useState()
  const [listProducingSteps, setListProducingSteps] = useState([])
  const [producingStepId, setProducingStepId] = useState()
  const [listWorkCenter, setlistWorkCenter] = useState([])

  const {
    data: { moList, moProducingStep },
    actions: actionMo,
  } = useMo()

  useEffect(() => {
    refreshData()
  }, [])
  const refreshData = () => {
    actionMo.searchMO({ isGetAll: 1 })
  }

  useEffect(() => {
    if (!isEmpty(moProducingStep)) {
      setListItem(moProducingStep?.moDetail[0]?.moPlanBom)
    }
  }, [moProducingStep])

  useEffect(() => {
    if (itemId) {
      const listProducingStep = listItem?.find(
        (i) => i.itemId === itemId,
      )?.workOrders
      setListProducingSteps(listProducingStep)
    }
  }, [itemId])

  useEffect(() => {
    if (producingStepId) {
      const listWorkCenter = listProducingSteps.find(
        (i) => i.producingStepId === producingStepId,
      )?.workCenters
      setlistWorkCenter(listWorkCenter)
    }
  }, [producingStepId])
  const handleChangeMo = (id) => {
    actionMo.getListMoProducingStepById(id)
  }
  const handleChangeItem = (id) => {
    setItemId(id)
  }
  const handleChangeProducingStep = (id) => {
    setProducingStepId(id)
  }
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moId"
          label={t('materialDetailPlan.moCode')}
          placeholder={t('materialDetailPlan.moCode')}
          options={moList.filter((i) =>
            [
              MO_STATUS.CONFIRMED,
              MO_STATUS.IN_PROGRESS,
              MO_STATUS.COMPLETED,
            ]?.includes(i?.status),
          )}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.code}
          onChange={(id) => handleChangeMo(id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemId"
          label={t('materialDetailPlan.itemName')}
          placeholder={t('materialDetailPlan.itemName')}
          options={listItem}
          getOptionValue={(opt) => opt?.itemId}
          getOptionLabel={(opt) => opt?.itemId || opt?.item?.name}
          onChange={(id) => handleChangeItem(id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="producingStepId"
          label={t('materialDetailPlan.producingStepName')}
          placeholder={t('materialDetailPlan.producingStepName')}
          options={listProducingSteps}
          getOptionValue={(opt) => opt?.producingStepId}
          getOptionLabel={(opt) => opt?.producingStepName}
          onChange={(id) => handleChangeProducingStep(id)}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="workCenterId"
          label={t('materialDetailPlan.workCenterName')}
          placeholder={t('materialDetailPlan.workCenterName')}
          options={listWorkCenter}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
    </Grid>
  )
}
export default FilterForm
