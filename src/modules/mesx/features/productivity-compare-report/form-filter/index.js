import React, { useEffect, useState } from 'react'

import { Grid, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { MO_STATUS } from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useProductivityCompare from '~/modules/mesx/redux/hooks/useProductivityCompare'
import { searchMOApi } from '~/modules/mesx/redux/sagas/mo/search-mo'

import productivityReportSchema from '../schema'

function ProductivityCompareFilter() {
  const { t } = useTranslation(['mesx'])
  const [listItem, setListItem] = useState([])
  const [itemId, setItemId] = useState()
  const [listProducingSteps, setListProducingSteps] = useState([])

  const {
    data: { moProducingStep },
    actions: actionMo,
  } = useMo()

  const { actions } = useProductivityCompare()

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

  const initialValues = {
    moId: '',
    producingStepId: '',
    itemId: '',
  }
  const handleChangeMo = (val) => {
    actionMo.getListMoProducingStepById(val?.id)
    setListProducingSteps([])
  }
  const handleChangeItem = (id) => {
    setItemId(id)
  }
  const onSubmit = (values) => {
    const params = {
      itemId: values?.itemId,
      manufacturingOrderId: values?.moId?.id,
      producingStepId: values?.producingStepId,
    }
    actions.getDataProductivityCompareReport(params)
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

export default ProductivityCompareFilter
