import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { Formik, Form, FieldArray } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  TEXTFIELD_ALLOW,
  MODAL_MODE,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import useRouting from '~/modules/mesx/redux/hooks/useRouting'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validationSchema } from './schema'

const DEFAULT_PRODUCING_STEP = {
  id: 1,
  stepNumber: 1,
  itemId: '',
  min: 1,
  max: 1,
}

function RoutingForm() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const params = useParams()
  const { actions: producingStepActions } = useProducingStep()

  const {
    data: { routingDetails, isLoading },
    actions: routingActions,
  } = useRouting()

  const initialValues = isEmpty(routingDetails)
    ? {
        code: '',
        name: '',
        description: '',
        items: [{ ...DEFAULT_PRODUCING_STEP }],
      }
    : {
        ...routingDetails,
        items: routingDetails.producingSteps.map((item) => ({
          id: item.id,
          itemId: item.id,
          stepNumber: item.stepNumber,
        })),
      }

  const MODE_MAP = {
    [ROUTE.ROUTING.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ROUTING.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  useEffect(() => {
    const id = params?.id
    routingActions.getRoutingDetailsById(id)
    producingStepActions.getProducingSteps()

    return () => {
      routingActions.resetRoutingDetailState()
      producingStepActions.resetProducingStepState()
    }
  }, [params?.id])

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      producingSteps: values.items?.map((item) => ({
        id: item?.itemId,
        stepNumber: Number(item?.stepNumber),
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      routingActions.createRouting(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      routingActions.updateRouting(convertValues, backToList)
    }
  }

  const backToList = () => {
    history.push(ROUTE.ROUTING.LIST.PATH)
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
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
        route: ROUTE.ROUTING.LIST.PATH,
        title: ROUTE.ROUTING.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.ROUTING.CREATE.PATH,
          title: ROUTE.ROUTING.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.ROUTING.EDIT.PATH,
          title: ROUTE.ROUTING.EDIT.TITLE,
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
        return ROUTE.ROUTING.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ROUTING.EDIT.TITLE
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
        {({ handleReset, values, setFieldValue }) => (
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
                      label={t('routing.code')}
                      name="code"
                      placeholder={t('routing.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('routing.name')}
                      name="name"
                      placeholder={t('routing.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('routing.description')}
                      placeholder={t('routing.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <ItemsSettingTable
                    items={values?.items || []}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                    setFieldValue={setFieldValue}
                  />
                )}
              />
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default RoutingForm
