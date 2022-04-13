import React, { useEffect, useState } from 'react'

import { Grid, Typography, Input, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import { STAGES_OPTION } from '~/modules/mesx/constants'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import { ROUTE } from '~/modules/mesx/routes/config'

import { validationSchema } from './schema'

function ProducingStepForm() {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const routeMatch = useRouteMatch()

  const [checked, setChecked] = useState(false)
  const [checkedUpdate, setCheckedUpdate] = useState(true)

  const {
    data: { qcList = [] },
    actions: actionCommon,
  } = useCommonManagement()
  const {
    data: { isLoading, details },
    actions,
  } = useProducingStep()

  const MODE_MAP = {
    [ROUTE.PRODUCING_STEP.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.PRODUCING_STEP.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]

  const isUpdate = mode === MODAL_MODE.UPDATE

  const renderBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'producingInfo',
      },
      {
        route: ROUTE.PRODUCING_STEP.LIST.PATH,
        title: ROUTE.PRODUCING_STEP.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.PRODUCING_STEP.CREATE.PATH,
          title: ROUTE.PRODUCING_STEP.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.PRODUCING_STEP.EDIT.PATH + `/${id}`,
          title: ROUTE.PRODUCING_STEP.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.PRODUCING_STEP.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.PRODUCING_STEP.EDIT.TITLE
      default:
    }
  }

  const backToList = () => {
    history.push(ROUTE.PRODUCING_STEP.LIST.PATH)
  }

  const handleSubmit = (values) => {
    const params = {
      code: values.code,
      name: values.name,
      description: values.description,
      switchMode: values.switchMode,
      qcQuantityRule: Number(values.qcQuantityRule),
      productionTimePerItem: Number(values.productionTimePerItem),
      inputQc: {
        qcCriteriaId: values.qcCriteriaInput,
        itemPerMemberTime:
          values.timeQcInput === null ? null : Number(values.timeQcInput),
      },
      outputQc: {
        qcCriteriaId: values.qcCriteriaOutput,
        itemPerMemberTime:
          values.timeQcOutput === null ? null : Number(values.timeQcOutput),
      },
      status: '0',
    }
    if (!isUpdate) {
      actions.createProducingStep(params, backToList)
    } else {
      const pramsUpdate = {
        ...params,
        id: Number(id),
      }
      actions.updateProducingStep(pramsUpdate, backToList)
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              setChecked(false)
            }}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={() => {
              handleReset()
              setChecked(false)
            }}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }
  const initialValues = {
    code: details?.code || '',
    name: details?.name || '',
    description: details?.description || '',
    qcQuantityRule: Number(details?.qcQuantityRule) || null,
    productionTimePerItem:
      Number(details?.productionTimePerItem) ||
      NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
    switchMode: details?.switchMode?.toString() || '0',
    processQc:
      Boolean(details?.inputQc?.qcCriteriaId) ||
      Boolean(details?.outputQc?.qcCriteriaId) ||
      false,
    inputQc: Boolean(details?.inputQc?.qcCriteriaId) || false,
    outputQc: Boolean(details?.outputQc?.qcCriteriaId) || false,
    qcCriteriaInput: details?.inputQc?.qcCriteriaId || null,
    timeQcInput: details?.inputQc?.itemPerMemberTime || null,
    qcCriteriaOutput: details?.outputQc?.qcCriteriaId || null,
    timeQcOutput: details?.outputQc?.itemPerMemberTime || null,
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getProducingStepDetailsById(id)
    }
    actionCommon.searchQualityPoints()
    return () => actions.resetProducingStepState()
  }, [id])

  return (
    <Page
      breadcrumbs={renderBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(t)}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ handleReset, values, setFieldValue }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="code"
                      label={t('producingStep.code')}
                      placeholder={t('producingStep.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="name"
                      label={t('producingStep.name')}
                      placeholder={t('producingStep.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <LV
                      label={
                        <Typography sx={{ mt: '9px' }} required>
                          {t('producingStep.switchMode')}
                        </Typography>
                      }
                    >
                      <Field.RadioGroup name="switchMode">
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label={t('producingStep.allItemComplete')}
                          onChange={(e, checked) => {
                            setChecked(!checked)
                            setFieldValue('qcQuantityRule', null)
                            setCheckedUpdate(false)
                          }}
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label={t('producingStep.someItemComplete')}
                          onChange={(e, checked) => {
                            setChecked(checked)
                            setCheckedUpdate(true)
                          }}
                        />
                      </Field.RadioGroup>
                    </LV>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="productionTimePerItem"
                      label={t('producingStep.timePerProduct')}
                      placeholder={t('producingStep.timePerProduct')}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment sx={{ pr: 1 }}>
                            {t('producingStep.unit.minutes')}
                          </InputAdornment>
                        ),
                      }}
                      type="number"
                      required
                    />
                  </Grid>

                  {(checked ||
                    (details?.switchMode === 1 && checkedUpdate)) && (
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="qcQuantityRule"
                        label={t('producingStep.completeItems')}
                        placeholder={t('producingStep.completeItems')}
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ pr: 1 }}>
                              {t('producingStep.unit.persen')}
                            </InputAdornment>
                          ),
                        }}
                        required
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <FormControlLabel
                      label={
                        <Typography variant="h5">
                          {t('producingStep.processQc')}
                        </Typography>
                      }
                      control={
                        <Field.Checkbox
                          name="processQc"
                          onChange={(checked) => {
                            setFieldValue('inputQc', checked)
                            setFieldValue('outputQc', checked)
                            if (!checked) {
                              setFieldValue('qcCriteriaInput', null)
                              setFieldValue('timeQcInput', null)
                              setFieldValue('qcCriteriaOutput', null)
                              setFieldValue('timeQcOutput', null)
                            }
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormControlLabel
                      control={
                        <Field.Checkbox
                          name="inputQc"
                          onChange={(checked) => {
                            if (checked && !values.processQc) {
                              setFieldValue('processQc', true)
                            } else if (!values.outputQc && values.processQc) {
                              setFieldValue('processQc', false)
                            }
                            if (!checked) {
                              setFieldValue('qcCriteriaInput', null)
                              setFieldValue('timeQcInput', null)
                            }
                          }}
                        />
                      }
                      label={t('producingStep.inputQC')}
                    />
                    <Box mt={1}>
                      <Field.Autocomplete
                        name="qcCriteriaInput"
                        label={t('producingStep.qcCriteria')}
                        placeholder={t('producingStep.qcCriteria')}
                        options={qcList.filter(
                          (i) => i.stage === STAGES_OPTION.PRODUCTION_INPUT,
                        )}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name}
                        disabled={!values.inputQc}
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.TextField
                        name="timeQcInput"
                        label={t('producingStep.timeQC')}
                        placeholder={t('producingStep.timeQc')}
                        disabled={!values.inputQc}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ pr: 1 }}>
                              {t('producingStep.unit.minutes')}
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormControlLabel
                      label={t('producingStep.outputQC')}
                      control={
                        <Field.Checkbox
                          name="outputQc"
                          onChange={(checked) => {
                            if (checked && !values.processQc) {
                              setFieldValue('processQc', true)
                            } else if (!values.inputQc && values.processQc) {
                              setFieldValue('processQc', false)
                            }
                            if (!checked) {
                              setFieldValue('qcCriteriaOutput', null)
                              setFieldValue('timeQcOutput', null)
                            }
                          }}
                        />
                      }
                    />

                    <Box mt={1}>
                      <Field.Autocomplete
                        name="qcCriteriaOutput"
                        label={t('producingStep.qcCriteria')}
                        placeholder={t('producingStep.qcCriteria')}
                        options={qcList.filter(
                          (i) => i.stage === STAGES_OPTION.PRODUCTION_OUTPUT,
                        )}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name}
                        disabled={!values.outputQc}
                      />
                    </Box>
                    <Box mt={4 / 3}>
                      <Field.TextField
                        name="timeQcOutput"
                        label={t('producingStep.timeQC')}
                        placeholder={t('producingStep.timeQc')}
                        disabled={!values.outputQc}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment sx={{ pr: 1 }}>
                              {t('producingStep.unit.minutes')}
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('producingStep.description')}
                      placeholder={t('producingStep.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                    <Box ml={16}>
                      <Input type="file" />
                    </Box>
                  </Grid>
                </Grid>

                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default ProducingStepForm
