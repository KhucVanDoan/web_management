import { useState } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import DateRangePicker from '~/components/DateRangePicker'
import { STAGE_OPTION, STAGES } from '~/modules/qmsx/constants'
import FilterDialog from '~/modules/qmsx/features/dashboard/filter-dialog'
import { useDashboardQcProgress } from '~/modules/qmsx/redux/hooks/useDashboard'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'

function QcProgressFilterForm() {
  const { t } = useTranslation('qmsx')

  const [dateRange] = useState([null, null])
  const [qcStageId, setQcStageId] = useState()
  const [orderId, setOrderId] = useState()
  const [orderList, setOrderList] = useState([])
  const [itemId, setItemId] = useState()
  const [itemList, setItemList] = useState([])
  const [producingStepId, setProducingStepId] = useState()
  const [producingStepList, setProducingStepList] = useState([])

  const { actions: dashboardActions } = useDashboardQcProgress()
  const { actions: qualityReportActions } = useQualityReport()

  // @TODO: set date range

  const resetOrderState = () => {
    setOrderId(null)
    setOrderList([])
  }

  const resetItemState = () => {
    setItemId(null)
    setItemList([])
  }

  const resetProducingStepState = () => {
    setProducingStepId(null)
    setProducingStepList([])
  }

  const handleChangeStage = (id) => {
    setQcStageId(id)
    resetOrderState()
    resetItemState()
    resetProducingStepState()

    switch (id) {
      case STAGE_OPTION.PO_IMPORT:
      case STAGE_OPTION.PRO_IMPORT:
      case STAGE_OPTION.SO_EXPORT:
      case STAGE_OPTION.PRO_EXPORT:
      case STAGE_OPTION.IMO_IMPORT:
      case STAGE_OPTION.EXO_EXPORT:
        qualityReportActions.getOrderListByStage({ stage: id }, (data) =>
          setOrderList(data),
        )
        break
      case STAGE_OPTION.PRODUCTION_INPUT:
      case STAGE_OPTION.PRODUCTION_OUTPUT:
        dashboardActions.getInProgressMoListDashboard((data) =>
          setOrderList(data),
        )
        break
      default:
        break
    }
  }

  const handleChangeOrder = (id) => {
    setOrderId(id)
    resetItemState()
    resetProducingStepState()

    if (!id) return

    const setDataToState = (data) => setItemList(data)

    switch (qcStageId) {
      case STAGE_OPTION.PO_IMPORT:
        dashboardActions.getQcCheckItemByPo({ poId: id }, setDataToState)
        break
      case STAGE_OPTION.SO_EXPORT:
        dashboardActions.getQcCheckItemBySo({ soId: id }, setDataToState)
        break
      case STAGE_OPTION.IMO_IMPORT:
        dashboardActions.getQcCheckItemByImo({ imoId: id }, setDataToState)
        break
      case STAGE_OPTION.EXO_EXPORT:
        dashboardActions.getQcCheckItemByExo({ exoId: id }, setDataToState)
        break
      case STAGE_OPTION.PRO_IMPORT:
      case STAGE_OPTION.PRO_EXPORT:
        dashboardActions.getQcCheckItemByPro({ proId: id }, setDataToState)
        break
      case STAGE_OPTION.PRODUCTION_INPUT:
      case STAGE_OPTION.PRODUCTION_OUTPUT:
        dashboardActions.getItemListByMoDashboard({ moId: id }, setDataToState)
        break
      default:
        break
    }
  }

  const handleChangeItem = (id) => {
    setItemId(id)
    resetProducingStepState()

    if (
      id &&
      (qcStageId === STAGE_OPTION.PRODUCTION_INPUT ||
        qcStageId === STAGE_OPTION.PRODUCTION_OUTPUT)
    )
      dashboardActions.getProducingStepListByItemMoDashboard(
        { itemId: id, moId: orderId },
        (data) => {
          setProducingStepList(data)
        },
      )
  }

  const handleChangeProducingStep = (id) => {
    setProducingStepId(id)
  }

  const handleSubmit = () => {
    const params = {
      qcStageId: qcStageId,
    }

    switch (qcStageId) {
      case STAGE_OPTION.PO_IMPORT:
      case STAGE_OPTION.SO_EXPORT:
      case STAGE_OPTION.PRO_IMPORT:
      case STAGE_OPTION.PRO_EXPORT:
      case STAGE_OPTION.IMO_IMPORT:
      case STAGE_OPTION.EXO_EXPORT:
        params.ioQcFilter = {
          qcStageId: qcStageId,
          orderId: orderId,
          itemId: itemId,
        }
        dashboardActions.getQcProgressDashboard(params)
        break
      case STAGE_OPTION.PRODUCTION_INPUT:
      case STAGE_OPTION.PRODUCTION_OUTPUT:
        params.produceStepQcFilter = {
          moId: orderId,
          itemId: itemId,
          producingStepId: producingStepId,
        }
        dashboardActions.getQcProgressDashboard(params)
        break
      default:
        dashboardActions.getQcProgressDashboard(params)
        break
    }
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
          <DateRangePicker
            name="executedDateRange"
            label={t('dashboard.executedDate')}
            value={dateRange}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            name="qcStageId"
            options={STAGES}
            label={t('dashboard.qcStage')}
            placeholder={t('dashboard.qcStage')}
            getOptionLabel={(option) => t(option?.text)}
            getOptionValue={(option) => option?.value}
            onChange={(id) => handleChangeStage(id)}
            value={qcStageId}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            name="orderCode"
            options={orderList}
            label={t('dashboard.orderCode')}
            placeholder={t('dashboard.orderCode')}
            getOptionLabel={(option) => option?.code}
            getOptionValue={(option) => option?.id}
            onChange={(id) => handleChangeOrder(id)}
            value={orderId}
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
      </Grid>
    </FilterDialog>
  )
}

export default QcProgressFilterForm
