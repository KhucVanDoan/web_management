import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import { Field } from '~/components/Formik'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'
const FilterForm = () => {
  const { t } = useTranslation(['mesx'])
  const { values } = useFormikContext()

  const {
    data: { moItems },
    actions: actionMo,
  } = useMo()

  const {
    data: { itemList },
    actions: commonManagementActions,
  } = useCommonManagement()

  const {
    data: { list },
    actions: producingStepAction,
  } = useProducingStep()

  const {
    data: { wcList },
    actions: workCenterActions,
  } = useWorkCenter()

  useEffect(() => {
    commonManagementActions.getItems({ isGetAll: 1 })
    producingStepAction.searchProducingSteps({ isGetAll: 1 })
    workCenterActions.searchWorkCenter({ isGetAll: 1 })
  }, [values.moId])

  const getDataItem = () => {
    const items = []
    moItems?.moDetail?.forEach((parentItem) => {
      parentItem?.moPlanBom?.forEach((i) => {
        const listItem = itemList?.find((item) => i.itemId === item.id)
        items.push(listItem)
      })
    })
    return items
  }

  const getDataProducingStep = () => {
    const producingStepList = []
    let item = {}
    moItems?.moDetail?.forEach((parentItem) => {
      const currentItem = parentItem?.moPlanBom.find(
        (i) => i.itemId === values.itemId,
      )
      if (currentItem) item = currentItem
    })
    item?.workOrders?.forEach((work) => {
      const producingStep = list.find((ps) => ps?.id === work?.producingStepId)
      if (!producingStepList.includes(producingStep))
        producingStepList.push(producingStep)
    })
    return producingStepList
  }

  const getDataWorkCenter = () => {
    const workCenterList = []
    let item = {}
    moItems?.moDetail?.forEach((parentItem) => {
      const currentItem = parentItem?.moPlanBom.find(
        (i) => i.itemId === values.itemId,
      )
      if (currentItem) item = currentItem
    })
    item?.workOrders?.forEach((work) => {
      if (work?.producingStepId === values.producingStepId)
        work?.workCenters?.forEach((wc) => {
          const workCenter = wcList.find((i) => i?.id === wc?.id)
          if (!workCenterList.includes(workCenter))
            workCenterList.push(workCenter)
        })
    })
    return workCenterList
  }
  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="moId"
          label={t('materialDetailPlan.moCode')}
          placeholder={t('materialDetailPlan.moCode')}
          asyncRequest={(s) =>
            searchMOApi({ keyword: s, limit: ASYNC_SEARCH_LIMIT })
          }
          asyncRequestHelper={(res) => res?.data?.items}
          getOptionLabel={(opt) => opt?.code}
          onChange={(val) => actionMo.getMoItemsById(val?.id)}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="itemId"
          label={t('materialDetailPlan.itemName')}
          placeholder={t('materialDetailPlan.itemName')}
          options={getDataItem()}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="producingStepId"
          label={t('materialDetailPlan.producingStepName')}
          placeholder={t('materialDetailPlan.producingStepName')}
          options={getDataProducingStep()}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>

      <Grid item xs={12}>
        <Field.Autocomplete
          name="workCenterId"
          label={t('materialDetailPlan.workCenterName')}
          placeholder={t('materialDetailPlan.workCenterName')}
          options={getDataWorkCenter()}
          getOptionValue={(opt) => opt?.id}
          getOptionLabel={(opt) => opt?.name}
        />
      </Grid>
    </Grid>
  )
}
export default FilterForm
