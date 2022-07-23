import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useAttributeType from '~/modules/mmsx/redux/hooks/useAttributeType'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

function AttributeTypeForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { attributeTypeDetail, isLoading },
    actions,
  } = useAttributeType()

  const {
    data: { itemsUnitList },
    actions: commonActions,
  } = useCommonInfo()

  useEffect(() => {
    commonActions.getItemUnits()
  }, [])

  const MODE_MAP = {
    [ROUTE.ATTRIBUTE_TYPE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ATTRIBUTE_TYPE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    code: attributeTypeDetail?.code || '',
    name: attributeTypeDetail?.name || '',
    unit: attributeTypeDetail?.unit?.id || '',
    description: attributeTypeDetail?.description || '',
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getAttributeType(id)
    }
    return () => actions.resetStateAttrbuteType()
  }, [id])

  const handleSubmit = (val) => {
    if (isUpdate) {
      actions.updateAttributeType({ ...val, id }, backToList)
    } else {
      actions.createAttributeType(val, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: ROUTE.SETTING.TITLE,
      },
      {
        route: ROUTE.ATTRIBUTE_TYPE.LIST.PATH,
        title: ROUTE.ATTRIBUTE_TYPE.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.ATTRIBUTE_TYPE.CREATE.PATH,
          title: ROUTE.ATTRIBUTE_TYPE.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.ATTRIBUTE_TYPE.EDIT.PATH,
          title: ROUTE.ATTRIBUTE_TYPE.EDIT.TITLE,
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
        return ROUTE.ATTRIBUTE_TYPE.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ATTRIBUTE_TYPE.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.ATTRIBUTE_TYPE.LIST.PATH)
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

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset }) => (
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
                      label={t('attributeType.form.code')}
                      name="code"
                      placeholder={t('attributeType.form.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
                      }}
                      disabled={isUpdate}
                      required
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      label={t('attributeType.form.name')}
                      name="name"
                      placeholder={t('attributeType.form.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="unit"
                      label={t('attributeType.form.unit')}
                      placeholder={t('attributeType.form.unit')}
                      options={itemsUnitList}
                      getOptionValue={(opt) => opt?.id || ''}
                      getOptionLabel={(opt) => opt?.name || ''}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('attributeType.form.description')}
                      placeholder={t('attributeType.form.description')}
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
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default AttributeTypeForm
