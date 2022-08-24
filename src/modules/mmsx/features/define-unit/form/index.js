import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateSchema } from './schema'

function DefineUnitForm() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  // const { id } = useParams()
  const routeMatch = useRouteMatch()

  const MODE_MAP = {
    [ROUTE.DEFINE_UNIT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_UNIT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = {
    code: '',
    name: '',
    unit: '',
    description: '',
  }

  const handleSubmit = () => {
    // if (isUpdate) {
    //   actions.updateUnit({ ...val, id }, backToList)
    // } else {
    //   actions.createUnit(val, backToList)
    // }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_UNIT.LIST.PATH,
        title: ROUTE.DEFINE_UNIT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_UNIT.CREATE.PATH,
          title: ROUTE.DEFINE_UNIT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_UNIT.EDIT.PATH,
          title: ROUTE.DEFINE_UNIT.EDIT.TITLE,
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
        return ROUTE.DEFINE_UNIT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_UNIT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_UNIT.LIST.PATH)
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
      // loading={isLoading}
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
                      label={t('defineUnit.code')}
                      name="code"
                      placeholder={t('defineUnit.code')}
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
                      label={t('defineUnit.name')}
                      name="name"
                      placeholder={t('defineUnit.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineUnit.description')}
                      placeholder={t('defineUnit.description')}
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

export default DefineUnitForm