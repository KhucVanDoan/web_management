import React, { useEffect, useState } from 'react'

import {
  Grid,
  FormLabel,
  Typography,
  FormControlLabel,
  InputAdornment,
  Radio,
  FormHelperText,
  Hidden,
} from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik'
import { isNil, omit, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  QUALITY_POINT_STATUS,
  FOMALITY_QC_OPTION,
  NUMBER_OF_TIMES_QC_OPTION,
  STAGES,
  STAGE_OPTION,
  STAGE_OPTION_OTHER,
  PRE_STAGE_PRODUCT_TYPE,
  MATERIAL_TYPE,
} from '~/modules/qmsx/constants'
import useCommonManagement from '~/modules/qmsx/redux/hooks/useCommonManagement'
import useDefineQualityPoint from '~/modules/qmsx/redux/hooks/useDefineQualityPoint'
import { ROUTE } from '~/modules/qmsx/routes/config'

import { defineQualityPointSchema } from './schema'

function DefineQualityPointForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { qualityPointDetail, isLoading },
    actions,
  } = useDefineQualityPoint()

  const {
    data: { productListByStageQC, userList, checkListConfirmedList },
    actions: commonManagementActions,
  } = useCommonManagement()

  const MODE_MAP = {
    [ROUTE.DEFINE_QUALITY_POINT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_QUALITY_POINT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isClone = mode === MODAL_MODE.CREATE && history?.location?.state

  const initialValues = {
    code: '',
    name: '',
    stage: null,
    productType: {
      productPrevious: null,
      material: null,
    },
    productCode: null,
    productName: null,
    qualityPointUser1s: [],
    checkListId: null,
    formality: FOMALITY_QC_OPTION.TOTALITY,
    quantity: null,
    errorAcceptanceRate: null,
    numberOfTime: NUMBER_OF_TIMES_QC_OPTION.ONE_TIMES,
    qualityPointUser2s: [],
    description: '',
  }

  const [initialValuesForm, setInitialValuesForm] = useState(initialValues)

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'qualityControl',
      },
      {
        route: ROUTE.DEFINE_QUALITY_POINT.LIST.PATH,
        title: ROUTE.DEFINE_QUALITY_POINT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_QUALITY_POINT.CREATE.PATH,
          title: ROUTE.DEFINE_QUALITY_POINT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_QUALITY_POINT.EDIT.PATH,
          title: ROUTE.DEFINE_QUALITY_POINT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    const payload = {
      isGetAll: 1,
    }
    commonManagementActions.getAllCheckList(payload)
    commonManagementActions.getUsers(payload)
    if (
      mode === MODAL_MODE.UPDATE ||
      (mode === MODAL_MODE.CREATE && history?.location?.state)
    ) {
      const paramsGetDetail = {
        id: params?.id || history?.location?.state,
      }
      actions.getQualityPointDetailById(paramsGetDetail, (data) => {
        commonManagementActions.getProductsByStageQC(data?.stage)
      })
    }
    return () => {
      if (isUpdate || isClone) actions.resetQualityPointDetailState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_QUALITY_POINT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_QUALITY_POINT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_QUALITY_POINT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const transformData = {
      ...omit(values, 'productType'),
      qualityPointUser1s: values?.qualityPointUser1s.map((x) => ({ id: x })),
      qualityPointUser2s: values?.qualityPointUser2s.map((x) => ({ id: x })),
      itemId: values?.productCode,
      formality: !isNil(values.formality) ? +values.formality : null,
      numberOfTime: !isNil(values.numberOfTime) ? +values.numberOfTime : null,
      productPrevious: values?.productType?.productPrevious
        ? PRE_STAGE_PRODUCT_TYPE.CHECKED
        : PRE_STAGE_PRODUCT_TYPE.UN_CHECKED,

      material: values?.productType?.material
        ? MATERIAL_TYPE.CHECKED
        : MATERIAL_TYPE.UN_CHECKED,

      quantity: values.quantity && +values?.quantity,
      errorAcceptanceRate:
        values.errorAcceptanceRate && +values?.errorAcceptanceRate,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createQualityPoint(transformData, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...transformData,
        id,
      }
      actions.updateQualityPoint(paramUpdate, backToList)
    }
  }

  useEffect(() => {
    if (!isEmpty(qualityPointDetail)) {
      const detail = {
        code: history?.location?.state ? '' : qualityPointDetail?.code,
        name: qualityPointDetail?.name || '',
        status: history?.location?.state ? null : qualityPointDetail?.status,
        stage: !isNil(qualityPointDetail?.stage)
          ? +qualityPointDetail?.stage
          : null,
        productType: {
          productPrevious: qualityPointDetail?.productPrevious,
          material: qualityPointDetail?.material,
        },
        productCode: qualityPointDetail?.item?.id,
        productName: qualityPointDetail?.item?.name,
        qualityPointUser1s:
          qualityPointDetail?.qualityPointUser1s?.map((x) => x.userId) || [],
        checkListId: qualityPointDetail?.checkListId || null,
        formality: qualityPointDetail?.formality || FOMALITY_QC_OPTION.TOTALITY,
        quantity: qualityPointDetail?.quantity || null,
        errorAcceptanceRate: qualityPointDetail?.errorAcceptanceRate || null,
        numberOfTime:
          qualityPointDetail?.numberOfTime ||
          NUMBER_OF_TIMES_QC_OPTION.ONE_TIMES,
        qualityPointUser2s:
          qualityPointDetail?.qualityPointUser2s?.map((x) => x.userId) || [],
        description: qualityPointDetail?.description || '',
      }
      setInitialValuesForm(detail)
    }
  }, [qualityPointDetail])

  const onChangeStage = (stageValue) => {
    commonManagementActions.getProductsByStageQC(stageValue)
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
            initialValues={initialValuesForm}
            validationSchema={defineQualityPointSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, setFieldValue, values, errors, touched }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {!isNil(values?.status) && (
                    <Grid item lg={12} xs={12}>
                      <LV
                        label={t('defineQualityPoint.status')}
                        value={
                          <Status
                            options={QUALITY_POINT_STATUS}
                            value={+values?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('defineQualityPoint.code')}
                      placeholder={t('defineQualityPoint.code')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineQualityPoint.name')}
                      placeholder={t('defineQualityPoint.name')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="stage"
                      label={t('defineQualityPoint.stageQC')}
                      placeholder={t('defineQualityPoint.stageQC')}
                      required
                      options={STAGES || []}
                      getOptionValue={(opt) => opt?.value}
                      getOptionLabel={(opt) => t(opt?.text) || ''}
                      onChange={(value) => onChangeStage(value)}
                    />
                  </Grid>
                  {+values?.stage === +STAGE_OPTION.PRODUCTION_INPUT ? (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Box sx={{ flex: '0 0 160px', mr: 2 }}>
                            <FormLabel
                              required={true}
                              sx={{
                                display: 'flex',
                              }}
                            >
                              <Typography variant="body2">
                                {t('defineQualityPoint.typeProduct')}
                              </Typography>
                            </FormLabel>
                          </Box>
                        }
                      >
                        <Grid item xs={12} alignItems="center">
                          <FormControlLabel
                            control={
                              <Field.Checkbox name="productType.productPrevious" />
                            }
                            sx={{ mt: '-9px' }}
                            label={t('defineQualityPoint.productPrevious')}
                          />
                        </Grid>
                        <Grid item xs={12} alignItems="center">
                          <FormControlLabel
                            control={
                              <Field.Checkbox name="productType.material" />
                            }
                            label={t('defineQualityPoint.material')}
                          />
                        </Grid>
                        {errors.productType &&
                          (touched.productType?.productPrevious ||
                            touched.productType?.material) && (
                            <FormHelperText error>
                              {errors.productType}
                            </FormHelperText>
                          )}
                      </LV>
                    </Grid>
                  ) : (
                    <Hidden lgDown>
                      <Grid item lg={6} xs={12}></Grid>
                    </Hidden>
                  )}
                  {STAGE_OPTION_OTHER.includes(values?.stage) && (
                    <>
                      <Grid item lg={6} xs={12}>
                        <Field.Autocomplete
                          name="productCode"
                          label={t('defineQualityPoint.productCode')}
                          placeholder={t('defineQualityPoint.productCode')}
                          required
                          options={productListByStageQC || []}
                          getOptionValue={(opt) => opt?.id}
                          getOptionLabel={(opt) => opt?.code || ''}
                          onChange={(value) => {
                            const product = productListByStageQC?.find(
                              (x) => x?.id === value,
                            )
                            if (product) {
                              setFieldValue('productName', product?.name)
                            } else {
                              setFieldValue('productName', '')
                            }
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="productName"
                          label={t('defineQualityPoint.productName')}
                          disabled
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="qualityPointUser1s"
                      label={t('defineQualityPoint.userQC1st')}
                      placeholder={t('defineQualityPoint.userQC1st')}
                      required
                      multiple
                      options={userList || []}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.username || ''}
                      getOptionDisabled={(opt) =>
                        values?.qualityPointUser2s?.some((i) => i === opt?.id)
                      }
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="checkListId"
                      label={t('defineQualityPoint.checkList')}
                      placeholder={t('defineQualityPoint.checkList')}
                      required
                      options={checkListConfirmedList || []}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name || ''}
                      getOptionSubLabel={(opt) => opt?.code || ''}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.name}|${opt?.code}`,
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                  sx={{ my: 2 }}
                >
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={
                        <FormLabel required={true} sx={{ display: 'flex' }}>
                          <Typography variant="body2">
                            {t('defineQualityPoint.formalityQC')}
                          </Typography>
                        </FormLabel>
                      }
                    >
                      <Field.RadioGroup name="formality">
                        <FormControlLabel
                          value={FOMALITY_QC_OPTION.TOTALITY}
                          control={<Radio />}
                          label={t(
                            'defineQualityPoint.formalityOptionText.totality',
                          )}
                          sx={{ mt: '-9px', width: 'fit-content' }}
                          onChange={() => {
                            setFieldValue('quantity', null)
                            setFieldValue('errorAcceptanceRate', null)
                          }}
                        />
                        <FormControlLabel
                          value={FOMALITY_QC_OPTION.RANDOM}
                          control={<Radio />}
                          sx={{ width: 'fit-content' }}
                          label={t(
                            'defineQualityPoint.formalityOptionText.random',
                          )}
                        />
                      </Field.RadioGroup>
                    </LV>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Grid xs={12} sx={{ mb: 5 / 3, marginTop: '-9px' }}>
                      <Field.TextField
                        name="quantity"
                        label={t('defineQualityPoint.quantityQC')}
                        placeholder={
                          values.formality === FOMALITY_QC_OPTION.RANDOM &&
                          t('defineQualityPoint.quantityQC')
                        }
                        disabled={
                          values.formality === FOMALITY_QC_OPTION.TOTALITY
                        }
                        type="number"
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ mr: 1 }}>
                              %
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Field.TextField
                        name="errorAcceptanceRate"
                        label={t('defineQualityPoint.errorAcceptanceRate')}
                        placeholder={
                          values.formality === FOMALITY_QC_OPTION.RANDOM &&
                          t('defineQualityPoint.errorAcceptanceRate')
                        }
                        disabled={
                          values.formality === FOMALITY_QC_OPTION.TOTALITY
                        }
                        type="number"
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" sx={{ mr: 1 }}>
                              %
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <LV
                      label={
                        <FormLabel required={true} sx={{ display: 'flex' }}>
                          <Typography color={'text.main'}>
                            {t('defineQualityPoint.numberOfTimeQC')}
                          </Typography>
                        </FormLabel>
                      }
                    >
                      <Field.RadioGroup name="numberOfTime">
                        <FormControlLabel
                          value={NUMBER_OF_TIMES_QC_OPTION.ONE_TIMES}
                          control={<Radio />}
                          label={t(
                            'defineQualityPoint.numberOfTimeOptionText.oneTimes',
                          )}
                          sx={{ mt: '-9px', width: 'fit-content' }}
                          onChange={() => {
                            setFieldValue('qualityPointUser2s', [])
                          }}
                        />
                        <FormControlLabel
                          value={NUMBER_OF_TIMES_QC_OPTION.TWO_TIMES}
                          control={<Radio />}
                          sx={{ width: 'fit-content' }}
                          label={t(
                            'defineQualityPoint.numberOfTimeOptionText.twoTimes',
                          )}
                        />
                      </Field.RadioGroup>
                    </LV>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="qualityPointUser2s"
                      label={t('defineQualityPoint.userQC2nd')}
                      placeholder={
                        values.numberOfTime ===
                          NUMBER_OF_TIMES_QC_OPTION.TWO_TIMES &&
                        t('defineQualityPoint.userQC2nd')
                      }
                      disabled={
                        values.numberOfTime ===
                        NUMBER_OF_TIMES_QC_OPTION.ONE_TIMES
                      }
                      required
                      multiple
                      options={userList || []}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.username || ''}
                      getOptionDisabled={(opt) =>
                        values?.qualityPointUser1s?.some((i) => i === opt?.id)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineQualityPoint.description')}
                      placeholder={t('defineQualityPoint.description')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <ActionBar
                  onBack={backToList}
                  onCancel={handleReset}
                  mode={mode}
                />
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}
export default DefineQualityPointForm
