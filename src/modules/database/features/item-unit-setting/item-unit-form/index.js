import React, { useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import { isEmpty, pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useItemUnit from '~/modules/database/redux/hooks/useItemUnit'
import { ROUTE } from '~/modules/database/routes/config'

import { itemUnitSchema } from './schema'

function ItemUnitForm() {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const params = useParams()
  const {
    data: { isLoading, itemUnitDetails },
    actions,
  } = useItemUnit()
  const initialValues = isEmpty(itemUnitDetails)
    ? {
        code: '',
        name: '',
        description: '',
      }
    : pick(itemUnitDetails, ['code', 'name', 'description'])

  const MODE_MAP = {
    [ROUTE.ITEM_UNIT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ITEM_UNIT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const { t } = useTranslation(['database'])

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getItemUnitDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetItemUnitDetailsState()
    }
  }, [params?.id])

  const getBreadcrumb = () => {
    const breadcrumb = [
      // {
      //   title: 'database',
      // },
      {
        route: ROUTE.ITEM_UNIT.LIST.PATH,
        title: ROUTE.ITEM_UNIT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.ITEM_UNIT.CREATE.PATH,
          title: ROUTE.ITEM_UNIT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.ITEM_UNIT.EDIT.PATH,
          title: ROUTE.ITEM_UNIT.EDIT.TITLE,
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
        return ROUTE.ITEM_UNIT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ITEM_UNIT.EDIT.TITLE
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
    history.push(ROUTE.ITEM_UNIT.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createItemUnit(values, () => backToList())
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const { code, name, description } = values
      const paramUpdate = {
        id,
        code,
        name,
        description,
      }
      actions.updateItemUnit(paramUpdate, () => backToList())
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
            validationSchema={itemUnitSchema(t)}
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
                      label={t('itemUnitDefine.code')}
                      name="code"
                      placeholder={t('itemUnitDefine.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('itemUnitDefine.name')}
                      placeholder={t('itemUnitDefine.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('itemUnitDefine.description')}
                      placeholder={t('itemUnitDefine.description')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
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

export default ItemUnitForm
