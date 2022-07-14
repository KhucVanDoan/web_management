import { useEffect, useState } from 'react'

import {
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  Typography,
} from '@mui/material'
import { Form, Formik } from 'formik'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  QUALITY_ALERT_STATUS_OPTIONS,
  QUALITY_ALERT_STATUS,
  STAGE_OPTION,
  STAGES_PRODUCTION,
  TYPE_QC_VALUE_TO_API,
} from '~/modules/qmsx/constants'
import useDefineQualityAlert from '~/modules/qmsx/redux/hooks/useDefineQualityAlert'
import { ROUTE } from '~/modules/qmsx/routes/config'

import { defineQualityAlertProductionInputSchema } from './schema'

function DefineQualityAlertProductionInputForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { qualityAlertDetail, isLoading, moList },
    actions,
  } = useDefineQualityAlert()

  const [itemList, setItemList] = useState([])
  const [routingList, setRoutingList] = useState([])
  const [producingStepList, setProducingStepList] = useState([])

  const MODE_MAP = {
    [ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_INPUT.PATH]:
      MODAL_MODE.CREATE,
    [ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_INPUT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const [itemField, routingField, producingStepField] = [
    'itemId',
    'routingId',
    'producingStepId',
  ]

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'qualityControl',
      },
      {
        route: ROUTE.DEFINE_QUALITY_ALERT.LIST.PATH,
        title: ROUTE.DEFINE_QUALITY_ALERT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_INPUT.PATH,
          title: ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_INPUT.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_INPUT.PATH,
          title: ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_INPUT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    actions.getMo()
    if (mode === MODAL_MODE.UPDATE) {
      const params = {
        id: id,
        type: TYPE_QC_VALUE_TO_API.PRODUCTION,
      }
      actions.getQualityAlertDetailById(
        params,
        (data) => {
          if (data?.status !== QUALITY_ALERT_STATUS_OPTIONS.PENDING)
            return backToList()
          getProductsByMo(data?.manufacturingOrder?.id)
          getRoutingByProduct(data?.item?.id)
          getProducingStepByRouting(data?.routing?.id)
        },
        backToList,
      )
    }
    return () => {
      if (isUpdate) actions.resetQualityAlertDetailState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_QUALITY_ALERT.CREATE_PRODUCTION_INPUT.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_QUALITY_ALERT.EDIT_PRODUCTION_INPUT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_QUALITY_ALERT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const transform = {
      ...values,
      productType: !isNil(values?.productType)
        ? +values?.productType
        : values?.productType,
      type: TYPE_QC_VALUE_TO_API.PRODUCTION,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createQualityAlert(transform, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...transform,
        id: +id,
      }
      actions.updateQualityAlert(paramUpdate, backToList)
    }
  }

  const initialValues = {
    code: qualityAlertDetail?.code || '',
    name: qualityAlertDetail?.name || '',
    stage: STAGE_OPTION.PRODUCTION_INPUT,
    productType: qualityAlertDetail?.productType || 1,
    manufacturingOrderId: qualityAlertDetail?.manufacturingOrder?.id || null,
    itemId: qualityAlertDetail?.item?.id || null,
    routingId: qualityAlertDetail?.routing?.id || null,
    producingStepId: qualityAlertDetail?.producingStep?.id || null,
    description: qualityAlertDetail?.description || '',
  }

  const resetState = (field, setFieldValue, setListState) => {
    setFieldValue(field, null)
    setListState([])
  }

  const onChangeMo = (moId, setFieldValue) => {
    resetState(itemField, setFieldValue, setItemList)
    resetState(routingField, setFieldValue, setRoutingList)
    resetState(producingStepField, setFieldValue, setProducingStepList)

    if (!moId) return

    getProductsByMo(moId)
  }

  const onChangeItem = (itemId, setFieldValue) => {
    resetState(routingField, setFieldValue, setRoutingList)
    resetState(producingStepField, setFieldValue, setProducingStepList)

    if (!itemId) return

    getRoutingByProduct(itemId)
  }

  const onChangeRouting = (routingId, setFieldValue) => {
    resetState(producingStepField, setFieldValue, setProducingStepList)

    if (!routingId) return

    getProducingStepByRouting(routingId)
  }

  //Call api
  const getProductsByMo = (moId) => {
    actions.getProductsByMo(moId, (data) => setItemList(data))
  }

  const getRoutingByProduct = (itemId) => {
    actions.getRoutingByProduct(itemId, (data) => setRoutingList(data))
  }

  const getProducingStepByRouting = (routingId) => {
    actions.getProducingStepByRouting(routingId, (data) =>
      setProducingStepList(data),
    )
  }

  const renderActionButtons = ({ handleReset }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button
              onClick={() => {
                handleReset()
              }}
              variant="outlined"
              color="subText"
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button type="submit" icon="save">
              {t('general:actionBar.create')}
            </Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button
              onClick={() => {
                getProductsByMo(qualityAlertDetail?.manufacturingOrder?.id)
                getRoutingByProduct(qualityAlertDetail?.item?.id)
                getProducingStepByRouting(qualityAlertDetail?.routing?.id)
                handleReset()
              }}
              variant="outlined"
              color="subText"
            >
              {t('general:actionBar.cancel')}
            </Button>
            <Button type="submit" icon="save">
              {t('general:actionBar.save')}
            </Button>
          </>
        )
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
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={defineQualityAlertProductionInputSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
            onChange
          >
            {({ handleReset, setFieldValue }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>
                            {t('defineQualityAlert.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={QUALITY_ALERT_STATUS}
                            value={qualityAlertDetail?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('defineQualityAlert.code')}
                      placeholder={t('defineQualityAlert.code')}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineQualityAlert.name')}
                      placeholder={t('defineQualityAlert.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="stage"
                      label={t('defineQualityAlert.stageQc')}
                      disabled
                      options={STAGES_PRODUCTION}
                      getOptionValue={(opt) => opt?.value}
                      getOptionLabel={(opt) => t(opt?.text) || ''}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={
                        <FormLabel sx={{ display: 'flex' }}>
                          <Typography color={'text.main'}>
                            {t('defineQualityAlert.productType')}
                          </Typography>
                        </FormLabel>
                      }
                    >
                      <Field.RadioGroup name="productType">
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          sx={{ width: 'fit-content', mt: '-9px' }}
                          label={t(
                            'defineQualityAlert.productTypeOptionText.material',
                          )}
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio />}
                          label={t(
                            'defineQualityAlert.productTypeOptionText.productPrevious',
                          )}
                          sx={{ width: 'fit-content' }}
                        />
                      </Field.RadioGroup>
                    </LV>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="manufacturingOrderId"
                      label={t('defineQualityAlert.moName')}
                      placeholder={t('defineQualityAlert.moName')}
                      required
                      options={moList || []}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name || ''}
                      getOptionSubLabel={(opt) => opt?.code || ''}
                      onChange={(moId) => onChangeMo(moId, setFieldValue)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="itemId"
                      label={t('defineQualityAlert.productCode')}
                      placeholder={t('defineQualityAlert.productCode')}
                      required
                      options={itemList}
                      getOptionValue={(opt) => opt?.itemId}
                      getOptionLabel={(opt) => opt?.code || ''}
                      onChange={(itemId) => onChangeItem(itemId, setFieldValue)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="routingId"
                      label={t('defineQualityAlert.routingName')}
                      placeholder={t('defineQualityAlert.routingName')}
                      required
                      options={routingList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name || ''}
                      onChange={(routingId) =>
                        onChangeRouting(routingId, setFieldValue)
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="producingStepId"
                      label={t('defineQualityAlert.producingStepName')}
                      placeholder={t('defineQualityAlert.producingStepName')}
                      required
                      options={producingStepList}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name || ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineQualityAlert.alertContent')}
                      placeholder={t('defineQualityAlert.alertContent')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <ActionBar
                  onBack={backToList}
                  elAfter={renderActionButtons({ handleReset })}
                />
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineQualityAlertProductionInputForm
