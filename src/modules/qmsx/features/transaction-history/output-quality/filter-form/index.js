import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { Field } from '~/components/Formik'
import {
  NUMBER_OF_TIMES_QC_TRANSACTION,
  STAGE_OPTION,
  STAGES_OUTPUT,
} from '~/modules/qmsx/constants'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'

const OutputQualityFilterForm = () => {
  const { t } = useTranslation('qmsx')

  const [orderList, setOrderList] = useState([])
  const { actions } = useQualityReport()
  const { setFieldValue } = useFormikContext()

  const [qcStageIdField, orderCodeField] = ['qcStageId', 'orderCode']

  const transKey = 'transactionHistory.header'

  useEffect(() => {
    resetFields()
  }, [])

  const resetFields = () => {
    setFieldValue(qcStageIdField, null)
    setFieldValue(orderCodeField, null)
  }

  const resetOrderValue = () => {
    setOrderList([])
    setFieldValue(orderCodeField, null)
  }

  const handleChangeStage = (id) => {
    setFieldValue(qcStageIdField, id)
    resetOrderValue()

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

  const handleChangeOrder = (code) => setFieldValue(orderCodeField, code)

  return (
    <Grid container rowSpacing={4 / 3}>
      <Grid item xs={12}>
        <Field.Autocomplete
          name={qcStageIdField}
          label={t(`${transKey}.qcStage`)}
          placeholder={t(`${transKey}.qcStage`)}
          options={STAGES_OUTPUT}
          getOptionValue={(option) => option?.value.toString()}
          getOptionLabel={(option) => t(option?.text)}
          onChange={(option) => handleChangeStage(option)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name={orderCodeField}
          label={t(`${transKey}.orderCode`)}
          placeholder={t(`${transKey}.orderCode`)}
          options={orderList}
          getOptionValue={(option) => option?.code}
          getOptionLabel={(option) => option?.code}
          onChange={(option) => handleChangeOrder(option)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="code"
          label={t(`${transKey}.code`)}
          placeholder={t(`${transKey}.code`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="orderName"
          label={t(`${transKey}.orderName`)}
          placeholder={t(`${transKey}.orderName`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="itemName"
          label={t(`${transKey}.itemName`)}
          placeholder={t(`${transKey}.itemName`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="bomName"
          label={t(`${transKey}.itemCode`)}
          placeholder={t(`${transKey}.itemCode`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.TextField
          name="errorReportCode"
          label={t(`${transKey}.errorReportCode`)}
          placeholder={t(`${transKey}.errorReportCode`)}
        />
      </Grid>
      <Grid item xs={12}>
        <Field.Autocomplete
          name="numberOfTimeSearch"
          label={t(`${transKey}.numberOfTimeSearch`)}
          placeholder={t(`${transKey}.numberOfTimeSearch`)}
          options={NUMBER_OF_TIMES_QC_TRANSACTION}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => t(option.text)}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Field.DateRangePicker
            name="createdAt"
            label={t(`${transKey}.createdAt`)}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OutputQualityFilterForm
