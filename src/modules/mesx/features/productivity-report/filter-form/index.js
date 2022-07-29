import React, { useEffect, useState } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useProductivityReport from '~/modules/mesx/redux/hooks/useProductivityReport'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

import productivityReportSchema from '../schema'

function ProductivityFilter() {
  const { t } = useTranslation(['mesx'])
  const [listItem, setListItem] = useState([])
  const [itemId, setItemId] = useState()
  const [listProducingSteps, setListProducingSteps] = useState([])
  const [producingStepId, setProducingStepId] = useState()
  const [listWorkCenter, setlistWorkCenter] = useState([])

  const {
    data: { moProducingStep },
    actions: actionMo,
  } = useMo()

  const { actions } = useProductivityReport()

  useEffect(() => {
    if (!isEmpty(moProducingStep)) {
      setListItem(
        moProducingStep?.moDetail.map((item) => item.moPlanBom).flat(),
      )
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
  const handleChangeMo = (val) => {
    actionMo.getListMoProducingStepById(val?.id)
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
      manufacturingOrderId: values?.moId?.id,
      producingStepId: values?.producingStepId,
      workCenterId: values?.workCenterId,
    }
    actions.getDataProductivityReport(params)
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={productivityReportSchema(t)}
      enableReinitialize
    >
      {({ resetForm }) => (
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
                    label={t('productivityReport.moCode')}
                    placeholder={t('productivityReport.moCode')}
                    asyncRequest={(s) =>
                      searchMOApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(opt) => opt?.name}
                    onChange={(val) => handleChangeMo(val)}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="producingStepId"
                    label={t('productivityReport.producingSteps')}
                    placeholder={t('productivityReport.producingSteps')}
                    options={listProducingSteps}
                    getOptionValue={(opt) => opt?.producingStepId}
                    getOptionLabel={(opt) => opt?.producingStepName}
                    onChange={(id) => handleChangeProducingStep(id)}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="itemId"
                    label={t('productivityReport.itemName')}
                    placeholder={t('productivityReport.itemName')}
                    options={listItem}
                    getOptionValue={(opt) => opt?.itemId}
                    getOptionLabel={(opt) => opt?.itemName || opt?.item?.name}
                    onChange={(id) => handleChangeItem(id)}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="workCenterId"
                    label={t('productivityReport.workCenter')}
                    placeholder={t('productivityReport.workCenter')}
                    options={listWorkCenter}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      color="grayF4"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        resetForm()
                      }}
                    >
                      {t('general:common.cancel')}
                    </Button>
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

export default ProductivityFilter
