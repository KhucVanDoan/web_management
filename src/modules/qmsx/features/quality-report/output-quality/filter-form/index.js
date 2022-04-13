import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import { STAGE_OPTION, STAGES_OUTPUT } from '~/modules/qmsx/constants'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'

const OutputQualityFilterForm = () => {
  const { t } = useTranslation('qmsx')

  const [orderList, setOrderList] = useState([])
  const [itemList, setItemList] = useState([])
  const { actions } = useQualityReport()
  const { values, setFieldValue } = useFormikContext()

  const [qcStageIdField, orderCodeField, itemCodeField] = [
    'qcStageId',
    'orderCode',
    'itemCode',
  ]

  useEffect(() => {
    resetFields()
  }, [])

  const resetFields = () => {
    setFieldValue(qcStageIdField, null)
    setFieldValue(itemCodeField, null)
    setFieldValue(orderCodeField, null)
  }

  const resetItemValue = () => {
    setItemList([])
    setFieldValue(itemCodeField, null)
  }

  const resetOrderValue = () => {
    setOrderList([])
    setFieldValue(orderCodeField, null)
  }

  const handleChangeStage = (id) => {
    setFieldValue(qcStageIdField, id)
    resetOrderValue()
    resetItemValue()

    const parsedQcStageId = Number.parseInt(id)

    if (
      parsedQcStageId !== STAGE_OPTION.SO_EXPORT &&
      parsedQcStageId !== STAGE_OPTION.PRO_EXPORT
    )
      return

    actions.getOrderListByStage({ stage: id }, (data) => {
      setOrderList(data)
    })
  }

  const handleChangeOrder = (code) => {
    setFieldValue(orderCodeField, code)
    resetItemValue()

    if (isEmpty(code)) return

    const order = orderList?.find((order) => order.code === code)

    if (!order) return

    const { id } = order
    const parsedQcStageId = Number.parseInt(values.qcStageId)

    if (parsedQcStageId === STAGE_OPTION.SO_EXPORT)
      actions.getItemListBySo({ soId: id }, (data) => {
        setItemList(data)
      })
    else if (parsedQcStageId === STAGE_OPTION.PRO_EXPORT)
      actions.getItemListByPro({ proId: id }, (data) => {
        setItemList(data)
      })
  }

  const handleChangeItem = (code) => setFieldValue(itemCodeField, code)

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name={qcStageIdField}
          label={t('qualityReport.qcStage')}
          placeholder={t('qualityReport.qcStage')}
          options={STAGES_OUTPUT}
          getOptionValue={(option) => option?.value.toString()}
          getOptionLabel={(option) => t(option?.text)}
          onChange={(option) => handleChangeStage(option)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name={orderCodeField}
          label={t('qualityReport.orderCode')}
          placeholder={t('qualityReport.orderCode')}
          options={orderList}
          getOptionValue={(option) => option?.code}
          getOptionLabel={(option) => option?.code}
          onChange={(option) => handleChangeOrder(option)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name={itemCodeField}
          label={t('qualityReport.itemCode')}
          placeholder={t('qualityReport.itemCode')}
          options={itemList}
          getOptionValue={(option) => option?.code}
          getOptionLabel={(option) => option?.code}
          onChange={(option) => handleChangeItem(option)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="orderName"
          label={t('qualityReport.orderName')}
          placeholder={t('qualityReport.orderName')}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t('qualityReport.itemName')}
          placeholder={t('qualityReport.itemName')}
        />
      </Grid>
    </Grid>
  )
}

export default OutputQualityFilterForm
