import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import { isEmpty, pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useItemUnit from '~/modules/mesx/redux/hooks/useItemUnit'
import { ROUTE } from '~/modules/mesx/routes/config'

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
  const { t } = useTranslation(['mesx'])

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
      {
        title: 'database',
      },
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

  const renderActionButtons = ({ handleReset }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button onClick={backToList} color="grayEE" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              color="subText"
              sx={{ mr: 4 / 3 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button onClick={backToList} color="grayEE" sx={{ mr: 4 / 3 }}>
              {t('common.close')}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              color="subText"
              sx={{ mr: 4 / 3 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </>
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
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('itemUnitDefine.name')}
                      placeholder={t('itemUnitDefine.name')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('itemUnitDefine.description')}
                      placeholder={t('itemUnitDefine.description')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  {renderActionButtons({ handleReset })}
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default ItemUnitForm
