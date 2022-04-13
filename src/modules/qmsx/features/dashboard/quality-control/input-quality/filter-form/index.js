import { useState } from 'react'

import { Grid } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'

import Autocomplete from '~/components/Autocomplete'
import { STAGE_OPTION, STAGES_INPUT } from '~/modules/qmsx/constants'
import FilterDialog from '~/modules/qmsx/features/dashboard/filter-dialog'
import { useDashboardInputQuality } from '~/modules/qmsx/redux/hooks/useDashboard'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'

function InputQualityFilterForm() {
  const { t } = useTranslation('qmsx')

  const [qcStageId, setQcStageId] = useState()
  const [orderId, setOrderId] = useState()
  const [orderList, setOrderList] = useState([])
  const [itemId, setItemId] = useState()
  const [itemList, setItemList] = useState([])

  const { actions: dashboardActions } = useDashboardInputQuality()
  const { actions: qualityReportActions } = useQualityReport()

  const resetItemState = () => {
    setItemId(null)
    setItemList([])
  }

  const resetOrderState = () => {
    setOrderId(null)
    setOrderList([])
  }

  const handleChangeStage = (id) => {
    setQcStageId(id)
    resetOrderState()
    resetItemState()

    if (isNil(id)) return

    qualityReportActions.getOrderListByStage({ stage: id }, (data) => {
      setOrderList(data)
    })
  }

  const handleChangeOrder = (id) => {
    setOrderId(id)
    resetItemState()

    if (!id) return

    switch (qcStageId) {
      case STAGE_OPTION.PO_IMPORT:
        dashboardActions.getQcCheckItemByPo({ poId: id }, (data) => {
          setItemList(data)
        })
        break
      case STAGE_OPTION.PRO_IMPORT:
        dashboardActions.getQcCheckItemByPro({ proId: id }, (data) => {
          setItemList(data)
        })
        break
      default:
        break
    }
  }

  const handleChangeItem = (id) => {
    setItemId(id)
  }

  const handleSubmit = () => {
    const params = {
      qcStageId: qcStageId,
      orderId: orderId,
      itemId: itemId,
    }

    dashboardActions.getInputQualityDashboard(params)
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
            name="qcStageId"
            options={STAGES_INPUT}
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
      </Grid>
    </FilterDialog>
  )
}

export default InputQualityFilterForm
