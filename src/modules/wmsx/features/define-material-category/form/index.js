import React, { useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import useDefineMaterialCategory from '~/modules/wmsx/redux/hooks/useDefineMaterialCategory'
import { ROUTE } from '~/modules/wmsx/routes/config'

import MainGroupTable from './main-group-table'
import MaterialTable from './material-table'
import { formSchema } from './schema'
import SubGroupTable from './sub-group-table'

const DEFAULT_MATERIAL = {
  name: '',
  code: '',
  level: 0,
}

const DEFAULT_MAIN_GROUP = {
  id: new Date().getTime(),
  name: '',
  code: '',
  level: 1,
}

const DEFAULT_SUB_GROUP = {
  id: new Date().getTime(),
  name: '',
  code: '',
  mainCode: '',
  level: 2,
}

function DefineMaterialCategoryForm() {
  const { t } = useTranslation(['wmsx'])
  const routeMatch = useRouteMatch()
  const history = useHistory()
  const params = useParams()
  const MODE_MAP = {
    [ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]

  const {
    data: { materialCategoryDetails, isLoading },
    actions,
  } = useDefineMaterialCategory()

  const initialValues = useMemo(
    () => ({
      // items: [{ ...DEFAULT_ITEMS }],
      // mainGroups: [...DEFAULT_ITEMS.children],
      // subGroups: [...DEFAULT_ITEMS.children[0].children],
      material: [{ ...DEFAULT_MATERIAL }],
      mainGroups: [{ ...DEFAULT_MAIN_GROUP }],
      subGroups: [{ ...DEFAULT_SUB_GROUP }],
    }),
    [materialCategoryDetails],
  )

  const backToList = () => {
    history.push(ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.PATH)
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.TITLE
      default:
        break
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.PATH,
        title: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.PATH,
          title: ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.PATH,
          title: ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (params?.id) {
      actions.getMaterialCategoryDetailsById(params?.id)
    }
    return () => {
      actions.resetMaterialCategoryDetailsState()
    }
  }, [params?.id])

  const onSubmit = (values) => {
    const id = Number(params?.id)
    const convertValues = {
      id,
      ...values?.material[0],
      children: values?.mainGroups?.map((main) => ({
        ...main,
        children: values?.subGroups?.filter(
          (sub) => sub.mainCode === main.code,
        ),
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createMaterialCategory(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateMaterialCategory(convertValues, backToList)
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
            validationSchema={formSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values, setFieldValue }) => {
              return (
                <Form>
                  <Tabs
                    list={[
                      t('defineMaterialCategory.materialType'),
                      t('defineMaterialCategory.mainGroup'),
                      t('defineMaterialCategory.subGroup'),
                    ]}
                  >
                    <Box sx={{ mt: 3 }}>
                      <FieldArray
                        name="material"
                        render={(arrayHelpers) => (
                          <MaterialTable
                            material={values?.material || []}
                            mode={mode}
                            arrayHelpers={arrayHelpers}
                            setFieldValue={setFieldValue}
                          />
                        )}
                      />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                      <FieldArray
                        name="mainGroups"
                        render={(arrayHelpers) => (
                          <MainGroupTable
                            mainGroups={values?.mainGroups || []}
                            material={values?.material || []}
                            mode={mode}
                            arrayHelpers={arrayHelpers}
                            setFieldValue={setFieldValue}
                          />
                        )}
                      />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                      <FieldArray
                        name="subGroups"
                        render={(arrayHelpers) => (
                          <SubGroupTable
                            subGroups={values?.subGroups || []}
                            material={values?.material || []}
                            mainGroups={values?.mainGroups || []}
                            mode={mode}
                            arrayHelpers={arrayHelpers}
                            setFieldValue={setFieldValue}
                          />
                        )}
                      />
                    </Box>
                  </Tabs>
                  {renderActionBar(handleReset)}
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineMaterialCategoryForm
