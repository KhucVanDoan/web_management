import React, { useEffect, useState } from 'react'

import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Formik, Form, FieldArray } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
  TEXTFIELD_ALLOW,
  ASYNC_SEARCH_LIMIT,
} from '~/common/constants'
import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { BOQ_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'
import { searchUsersApi } from '~/modules/mesx/redux/sagas/user-management/search-users'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validationSchema } from './schema'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  itemId: '',
  quantity: 1,
}

const BOQForm = () => {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, boqDetails },
    actions,
  } = useDefineBOQ()
  const MODE_MAP = {
    [ROUTE.DEFINE_BOQ.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_BOQ.DETAIL.PATH]: MODAL_MODE.DETAIL,
    [ROUTE.DEFINE_BOQ.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const { refreshKey, clearRefreshKey } = useApp()

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetBOQDetailState()
    }
  }, [id])

  useEffect(() => {
    if (refreshKey) {
      if (id === refreshKey.toString()) {
        history.push(ROUTE.DEFINE_BOQ.DETAIL.PATH.replace(':id', id))
      }

      clearRefreshKey()
    }
  }, [refreshKey, id])

  const refreshData = () => {
    if (isUpdate) {
      actions.getBOQDetailsById(id)
    }
  }

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      apmId: values?.apmId?.id,
      pmId: values?.pmId?.id,
      planFrom: values?.planList ? values?.planList[0] : '',
      planTo: values?.planList ? values?.planList[1] : '',
      boqItems: values.items?.map((item) => ({
        id: item?.itemId,
        quantity: +item?.quantity,
      })),
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createBOQ(convertValues, backToList)
    } else {
      actions.updateBOQ({ ...convertValues, id: +id }, backToList)
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_BOQ.LIST.PATH)
  }

  const renderActionBar = (resetForm) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={resetForm}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={resetForm}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        return null
    }
  }

  const renderBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'plan',
      },
      {
        route: ROUTE.DEFINE_BOQ.LIST.PATH,
        title: ROUTE.DEFINE_BOQ.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOQ.CREATE.PATH,
          title: ROUTE.DEFINE_BOQ.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOQ.EDIT.PATH + `/${id}`,
          title: ROUTE.DEFINE_BOQ.EDIT.TITLE,
        })
        break
      default:
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_BOQ.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_BOQ.EDIT.TITLE
      default:
    }
  }

  const initialValues = isEmpty(boqDetails)
    ? {
        code: '',
        name: '',
        description: '',
        planList: null,
        apmId: '',
        pmId: '',
        items: [{ ...DEFAULT_ITEM }],
      }
    : {
        ...boqDetails,
        apmId: boqDetails?.apm,
        pmId: boqDetails?.pm,
        planList: [boqDetails.planFrom, boqDetails.planTo],
        items: boqDetails.boqDetails?.map((e) => ({
          id: e.id,
          itemId: e.itemId,
          quantity: e.quantity,
        })),
      }

  return (
    <Page
      breadcrumbs={renderBreadcrumb()}
      title={t('menu.' + getTitle())}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ resetForm, values }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LV
                        label={<Typography>{t('defineBOQ.status')}</Typography>}
                        value={
                          <Status
                            options={BOQ_STATUS_OPTIONS}
                            value={boqDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="code"
                      label={t('defineBOQ.boqCode')}
                      placeholder={t('defineBOQ.boqCode')}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="pmId"
                      label={t('defineBOQ.boqPm')}
                      placeholder={t('defineBOQ.boqPm')}
                      asyncRequest={(s) =>
                        searchUsersApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.fullName || opt?.username}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="name"
                      label={t('defineBOQ.boqName')}
                      placeholder={t('defineBOQ.boqName')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="apmId"
                      label={t('defineBOQ.boqApm')}
                      placeholder={t('defineBOQ.boqApm')}
                      asyncRequest={(s) =>
                        searchUsersApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      getOptionLabel={(opt) => opt?.fullName || opt?.username}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DateRangePicker
                      name="planList"
                      label={t('defineBOQ.planList')}
                      placeholder={t('defineBOQ.planList')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="userPermission"
                      label={t('defineBOQ.boqUserPermission')}
                      placeholder={t('defineBOQ.boqUserPermission')}
                      disabled
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineBOQ.descriptionInput')}
                      placeholder={t('defineBOQ.descriptionInput')}
                      multiline
                      rows={3}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
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
                  />
                )}
              />
            </Box>

            {renderActionBar(resetForm)}
          </Form>
        )}
      </Formik>

      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        maxWidth="sm"
        submitLabel={t('general:common.yes')}
        onSubmit={() => actions.confirmBOQById(id, backToList())}
        submitProps={{
          color: 'error',
        }}
        cancelLabel={t('general:common.no')}
        onCancel={() => {
          setIsOpenConfirmModal(false)
          backToList()
        }}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
      </Dialog>
    </Page>
  )
}

export default BOQForm
