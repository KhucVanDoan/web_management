import React, { useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import { isEmpty, pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useItemGroup from '~/modules/mesx/redux/hooks/useItemGroup'
import { ROUTE } from '~/modules/mesx/routes/config'

import { itemGroupSchema } from './schema'

const ItemGroupForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const params = useParams()

  const {
    data: { isLoading, itemGroupDetails },
    actions,
  } = useItemGroup()

  const initialValues = isEmpty(itemGroupDetails)
    ? {
        code: '',
        name: '',
        description: '',
      }
    : pick(itemGroupDetails, ['code', 'name', 'description'])

  const MODE_MAP = {
    [ROUTE.ITEM_GROUP.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ITEM_GROUP.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const { t } = useTranslation(['mesx'])

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.ITEM_GROUP.LIST.PATH,
        title: ROUTE.ITEM_GROUP.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.ITEM_GROUP.CREATE.PATH,
          title: ROUTE.ITEM_GROUP.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.ITEM_GROUP.EDIT.PATH,
          title: ROUTE.ITEM_GROUP.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.ITEM_GROUP.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ITEM_GROUP.EDIT.TITLE
      default:
        break
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

  const backToList = () => {
    history.push(ROUTE.ITEM_GROUP.LIST.PATH)
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getItemGroupDetailsById(id)
    }

    return () => {
      if (isUpdate) actions.resetItemGroupDetailsState()
    }
  }, [params?.id])

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createItemGroup(values, () => backToList())
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const { code, name, description } = values
      const paramUpdate = {
        id,
        code,
        name,
        description,
      }
      actions.updateItemGroup(paramUpdate, () => backToList())
    }
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={itemGroupSchema(t)}
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
                      label={t('itemGroupDefine.code')}
                      name="code"
                      placeholder={t('itemGroupDefine.code')}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('itemGroupDefine.name')}
                      placeholder={t('itemGroupDefine.name')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('itemGroupDefine.description')}
                      placeholder={t('itemGroupDefine.description')}
                      multiline
                      rows={3}
                    />
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
export default ItemGroupForm
