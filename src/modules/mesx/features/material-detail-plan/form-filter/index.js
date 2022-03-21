import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { MO_STATUS } from '~/modules/mesx/constants'

const FilterForm = ({
  listItem,
  listProducingSteps,
  listWorkCenter,
  moList,
  setMoId,
  setItemId,
  setProducingStepId,
}) => {
  const { t } = useTranslation(['mesx'])

  const handleChangeMo = (id) => {
    setMoId(id)
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
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
          onChange={(id) => setItemId(id)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="producingStepId"
          label={t('materialDetailPlan.producingStepName')}
          placeholder={t('materialDetailPlan.producingStepName')}
          options={listProducingSteps}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
          onChange={(id) => setProducingStepId(id)}
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
