import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import useBomProducingStep from '~/modules/mesx/redux/hooks/useBomProducingStep'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { getBomProducingStepDetailsApi } from '~/modules/mesx/redux/sagas/bom-producing-step/get-bom-producing-step-details'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validationSchema } from './schema'

function BomProducingStepForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { bomProducingStepDetails, isLoading },
    actions,
  } = useBomProducingStep()

  const {
    data: { BOMDetails },
    actions: bomActions,
  } = useBOM()

  const {
    data: { BOMList },
    actions: commonActions,
  } = useCommonManagement()

  const initialValues = !id
    ? {
        description: '',
        product: {},
        items: [],
      }
    : {
        product: {
          id: BOMDetails?.id,
          itemId: BOMDetails?.itemId,
          code: BOMDetails?.code,
          item: {
            code: BOMDetails?.item?.itemId,
            name: BOMDetails?.item?.name,
          },
          name: BOMDetails?.name,
          routingId: BOMDetails?.routing?.id,
        },
        description: BOMDetails?.description,
        items: bomProducingStepDetails?.materialDetails || [],
      }

  const MODE_MAP = {
    [ROUTE.BOM_PRODUCING_STEP.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.BOM_PRODUCING_STEP.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]

  useEffect(() => {
    commonActions.getBoms()
  }, [])

  useEffect(() => {
    if (id) {
      actions.getBomProducingStepDetailsById(id)
      bomActions.getBOMDetailsById(id)
    }

    return () => {
      actions.resetBomProducingStepDetailsState()
      bomActions.resetBomState()
    }
  }, [id])

  const handleProductChange = async (productId, setFieldValue) => {
    if (!productId) return
    const res = await getBomProducingStepDetailsApi(productId)
    if (!res?.data?.materialDetails) return
    setFieldValue('items', res?.data?.materialDetails || [])
  }

  const onSubmit = (values) => {
    const detail = []
    values.items?.forEach((item) =>
      item.producingStepData?.forEach((producingItem) =>
        detail.push({
          itemId: item.bomDetail?.itemId,
          bomDetailId: item.bomDetail?.id,
          producingStepId: producingItem.producingStep.id,
          quantity: Number(producingItem.quantity),
        }),
      ),
    )

    const params = {
      itemId: values.product?.itemId,
      bomId: values.product?.id,
      detail: detail,
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createBomProducingStep(params, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateBomProducingStep(params, backToList)
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
            <Button onClick={backToList} color="grayF4" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              color="subText"
              sx={{ mr: 4 / 3 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={backToList} color="grayF4" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              color="subText"
              sx={{ mr: 4 / 3 }}
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue, values, errors, touched }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('bomProducingStep.code')}
                      name="product.code"
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    {mode === MODAL_MODE.CREATE ? (
                      <Field.Autocomplete
                        name="product"
                        label={t('bomProducingStep.itemCode')}
                        placeholder={t('bomProducingStep.itemCode')}
                        options={BOMList}
                        getOptionLabel={(opt) => opt?.item?.code}
                        onChange={(val) =>
                          handleProductChange(val?.id, setFieldValue)
                        }
                        required
                        helperText={errors?.product?.item?.code}
                      />
                    ) : (
                      <Field.TextField
                        name="product.item.code"
                        label={t('bomProducingStep.itemCode')}
                        disabled
                      />
                    )}
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('bomProducingStep.itemName')}
                      name="product.item.name"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('bomProducingStep.name')}
                      name="product.name"
                      required
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('bomProducingStep.routingId')}
                      name="product.routingId"
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
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <ItemsSettingTable items={values.items || []} mode={mode} />
            </Box>
            <Box>{renderActionButtons({ handleReset })}</Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default BomProducingStepForm
