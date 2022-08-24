import React, { useEffect, useMemo } from 'react'

import { Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useConstructionItemsManagement from '~/modules/wmsx/redux/hooks/useConstructionItemsManagement'
import { searchConstructionsApi } from '~/modules/wmsx/redux/sagas/construction-management/search-constructions'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { defineCompanySchema } from './schema'

function ConstructionItemsManagementForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()

  const {
    data: { isLoading, constructionItemsDetails },
    actions,
  } = useConstructionItemsManagement()

  const MODE_MAP = {
    [ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: constructionItemsDetails?.code || '',
      name: constructionItemsDetails?.name || '',
      construction: constructionItemsDetails?.construction || '',
      description: constructionItemsDetails?.description || '',
    }),
    [constructionItemsDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.PATH,
        title: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.PATH,
          title: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.PATH,
          title: ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      const id = params?.id
      actions.getConstructionItemsDetailsById(id)
    }
    return () => {
      actions.resetConstructionItemsDetailsState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.CONSTRUCTION_ITEMS_MANAGEMENT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const id = Number(params?.id)
    const convertValues = {
      id,
      ...values,
      constructionId: values?.construction?.id,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createConstructionItems(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateConstructionItems(convertValues, backToList)
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
            validationSchema={defineCompanySchema(t)}
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
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={
                          <Typography>
                            {t('constructionItemsManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={constructionItemsDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('constructionItemsManagement.code')}
                      placeholder={t('constructionItemsManagement.code')}
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
                      name="name"
                      label={t('constructionItemsManagement.name')}
                      placeholder={t('constructionItemsManagement.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="construction"
                      label={t('constructionItemsManagement.constructionCode')}
                      placeholder={t(
                        'constructionItemsManagement.constructionCode',
                      )}
                      asyncRequest={(s) =>
                        searchConstructionsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.code}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('constructionItemsManagement.description')}
                      placeholder={t('constructionItemsManagement.description')}
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

export default ConstructionItemsManagementForm
