import React, { useEffect, useMemo } from 'react'

import { Grid, Hidden, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { DEFAULT_UNITS } from '~/modules/wmsx/constants'
import useDefineTemplateShelf from '~/modules/wmsx/redux/hooks/useDefineTemplateShelf'
import { ROUTE } from '~/modules/wmsx/routes/config'

// import ItemsSettingTable from './items-setting-table'
import { defineTemplateShelfSchema } from './schema'

const DefineTemplateShelfForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, templateShelfDetails },
    actions,
  } = useDefineTemplateShelf()

  const initialValues = useMemo(
    () => ({
      name: templateShelfDetails?.name || '',
      unitStorageSpace: templateShelfDetails?.height?.unit || null,
      unitWeigthLoad: templateShelfDetails?.weightLoad?.unit || null,
      long: templateShelfDetails?.long?.value || null,
      width: templateShelfDetails?.width?.value || null,
      height: templateShelfDetails?.height?.value || null,
      weightLoad: templateShelfDetails?.weightLoad?.value || null,
    }),
    [templateShelfDetails],
  )

  const MODE_MAP = {
    [ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'warehouseSetup',
      },
      {
        route: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.PATH,
        title: ROUTE.DEFINE_TEMPLATE_SHELF.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.PATH,
          title: ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.PATH,
          title: ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getTemplateShelfDetailById(id)
    }
    return () => {
      if (isUpdate) actions.resetTemplateShelfDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_TEMPLATE_SHELF.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_TEMPLATE_SHELF.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_TEMPLATE_SHELF.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createDetail(values, () => backToList())
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const { code, name, description } = values
      const paramUpdate = {
        id,
        code,
        name,
        description,
      }
      actions.updateDetail(paramUpdate, () => backToList())
    }
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
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={defineTemplateShelfSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineTemplateShelf.name')}
                      placeholder={t('defineTemplateShelf.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Hidden lgDown>
                    <Grid item lg={6} xs={12}></Grid>
                  </Hidden>
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('defineTemplateShelf.storageSpace.title')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="unitStorageSpace"
                      label={t('defineTemplateShelf.storageSpace.unitName')}
                      placeholder={t(
                        'defineTemplateShelf.storageSpace.unitName',
                      )}
                      options={DEFAULT_UNITS}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="long"
                      label={t('defineTemplateShelf.long')}
                      placeholder={t('defineTemplateShelf.long')}
                      numberProps={{
                        decimalScale: 3,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="width"
                      label={t('defineTemplateShelf.width')}
                      placeholder={t('defineTemplateShelf.width')}
                      numberProps={{
                        decimalScale: 3,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="height"
                      label={t('defineTemplateShelf.height')}
                      placeholder={t('defineTemplateShelf.height')}
                      numberProps={{
                        decimalScale: 3,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('defineTemplateShelf.weightLoadSection.title')}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="unitWeigthLoad"
                      label={t(
                        'defineTemplateShelf.weightLoadSection.unitName',
                      )}
                      placeholder={t(
                        'defineTemplateShelf.weightLoadSection.unitName',
                      )}
                      options={DEFAULT_UNITS}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="weightLoad"
                      label={t('defineTemplateShelf.weightLoad')}
                      placeholder={t('defineTemplateShelf.weightLoad')}
                      numberProps={{
                        decimalScale: 3,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" mt={1}>
                      {t('defineTemplateShelf.shelfFloor.title')}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <ItemsSettingTable
                          items={values?.items || []}
                          arrayHelpers={arrayHelpers}
                        />
                      )}
                    />
                  </Grid> */}
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

export default DefineTemplateShelfForm
