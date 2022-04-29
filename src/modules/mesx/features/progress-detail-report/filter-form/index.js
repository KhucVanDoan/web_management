import React, { useEffect, useState } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { MO_STATUS } from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useProgressDetailReport from '~/modules/mesx/redux/hooks/useProgressDetailReport'

import progressDetailReportSchema from '../schema'

function ProgressDetailReport() {
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

  const { actions: actionProgress } = useProgressDetailReport()

  useEffect(() => {
    refreshData()
  }, [])
  const refreshData = () => {
    const filterData = [
      {
        column: 'status',
        text: MO_STATUS.IN_PROGRESS.toString(),
      },
    ]
    const params = {
      isGetAll: 1,
      filter: JSON.stringify(filterData),
    }
    actionMo.searchMO(params)
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

  const initialValues = {
    moId: '',
    producingStepId: '',
    itemId: '',
    workCenterId: '',
  }
  const handleChangeMo = (id) => {
    actionMo.getListMoProducingStepById(id)
    setListProducingSteps([])
    setlistWorkCenter([])
  }
  const handleChangeItem = (id) => {
    setItemId(id)
    setlistWorkCenter([])
  }
  const handleChangeProducingStep = (id) => {
    setProducingStepId(id)
  }
  const onSubmit = (values) => {
    const params = {
      itemId: values?.itemId,
      manufacturingOrderId: values?.moId,
      producingStepId: values?.producingStepId,
      workCenterId: values?.workCenterId,
    }
    actionProgress.getProgressDetailReport(params)
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={progressDetailReportSchema(t)}
      enableReinitialize
    >
      {() => (
        <Form>
          <Grid container justifyContent="center">
            <Grid item xl={11} xs={12}>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="moId"
                    label={t('ProgessDetailReport.moCode')}
                    placeholder={t('ProgessDetailReport.moCode')}
                    options={moList}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.code}
                    onChange={(id) => handleChangeMo(id)}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="itemId"
                    label={t('ProgessDetailReport.itemName')}
                    placeholder={t('ProgessDetailReport.itemName')}
                    options={listItem}
                    getOptionValue={(opt) => opt?.itemId}
                    getOptionLabel={(opt) => opt?.itemId || opt?.item?.name}
                    onChange={(id) => handleChangeItem(id)}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="producingStepId"
                    label={t('ProgessDetailReport.producingSteps')}
                    placeholder={t('ProgessDetailReport.producingSteps')}
                    options={listProducingSteps}
                    getOptionValue={(opt) => opt?.producingStepId}
                    getOptionLabel={(opt) => opt?.producingStepName}
                    onChange={(id) => handleChangeProducingStep(id)}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="workCenterId"
                    label={t('ProgessDetailReport.workCenter')}
                    placeholder={t('ProgessDetailReport.workCenter')}
                    options={listWorkCenter}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit">{t('general:common.search')}</Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default ProgressDetailReport
