import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { Formik, Form, FieldArray } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useBomProducingStep from '~/modules/mesx/redux/hooks/useBomProducingStep'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validationSchema } from './schema'

const DEFAULT_ITEM = {
  id: 0,
  materialCode: '',
  materialName: '',
  total: 1,
  quantity: 1,
  unit: '',
}

function BomProducingStepForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const [productId, setProductId] = useState('')
  const {
    data: { bomProducingStepList, bomProducingStepDetails, isLoading },
    actions,
  } = useBomProducingStep()

  const {
    data: { itemList },
    actions: actionCommon,
  } = useCommonManagement()

  const initialValues = isEmpty(bomProducingStepDetails)
    ? {
        code: '',
        name: '',
        description: '',
        itemName: '',
        itemCode: '',
        routingName: '',
        productId: {},
        items: [{ ...DEFAULT_ITEM }],
      }
    : {
        ...bomProducingStepDetails,
        // code: productId.bomCode,
        // name: productId.bomName,
        // itemCode: productId,
        // itemName: productId.name,
        // routingName: productId.routingName,
        items: itemList.map((item) => ({
          id: item.id,
          materialName: item.name,
          unit: item.itemUnit.name,
        })),
      }

  const MODE_MAP = {
    [ROUTE.BOM_PRODUCING_STEP.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.BOM_PRODUCING_STEP.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]

  useEffect(() => {
    actionCommon.getItems()
    return () => {
      actions.resetBomProducingStepDetailsState()
    }
  }, [])

  useEffect(() => {
    if (productId) {
      actions.getBomProducingStepDetailsById(productId)
    }
    return () => {
      actions.resetBomProducingStepDetailsState()
    }
  }, [productId])

  const onSubmit = (values) => {
    // console.log('check')
    const convertValues = {
      ...values,
      code: productId.bomCode,
      name: productId.bomName,
      itemCode: productId.itemCode,
      itemName: productId.name,
      routingName: productId.routingName,
      items: {
        index: index,
        materialId: material.bomDetail.id,
        materialCode: item.code,
        materialName: item.name,
        total: material.bomDetail.quantity,
        unit: item.itemUnit.name,
      },
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createBomProducingStep(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateBomProducingStep(convertValues, backToList)
    }
  }

  const backToList = () => {
    history.push(ROUTE.BOM_PRODUCING_STEP.LIST.PATH)
  }

  const renderActionButtons = ({ handleReset }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={backToList} color="grayF4" sx={{ mr: 1 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              color="subText"
              sx={{ mr: 1 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={backToList} color="grayF4" sx={{ mr: 1 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              color="subText"
              sx={{ mr: 1 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </Box>
        )
      default:
        break
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'producingInfo',
      },
      {
        route: ROUTE.BOM_PRODUCING_STEP.LIST.PATH,
        title: ROUTE.BOM_PRODUCING_STEP.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.BOM_PRODUCING_STEP.CREATE.PATH,
          title: ROUTE.BOM_PRODUCING_STEP.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.BOM_PRODUCING_STEP.EDIT.PATH,
          title: ROUTE.BOM_PRODUCING_STEP.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.BOM_PRODUCING_STEP.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.BOM_PRODUCING_STEP.EDIT.TITLE
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} sx={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values, setFieldValue }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('bomProducingStep.code')}
                      name="productId.bomCode"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="productId"
                      label={t('bomProducingStep.itemCode')}
                      placeholder={t('bomProducingStep.itemCode')}
                      options={bomProducingStepList}
                      getOptionLabel={(opt) => opt?.itemCode}
                      onChange={(val) => setProductId(val?.id)}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('bomProducingStep.itemName')}
                      name="productId.itemName"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('bomProducingStep.name')}
                      name="productId.bomName"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('bomProducingStep.routingId')}
                      name="productId.routingName"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('bomProducingStep.description')}
                      placeholder={t('bomProducingStep.description')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <ItemsSettingTable
                        items={values?.materialDetails || []}
                        mode={mode}
                        arrayHelpers={arrayHelpers}
                        // productId={values.productId?.id}
                      />
                    )}
                  />
                </Box>
                <Box>{renderActionButtons({ handleReset })}</Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default BomProducingStepForm
