import React, { useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { Formik, Form, FieldArray } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import { BOQ_STATUS, BOQ_STATUS_MAP, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validationSchema } from './schema'

const DEFAULT_ITEM = {
  id: Math.random(),
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
  const {
    data: { userList },
    actions: commonManagementActions,
  } = useCommonManagement()
  const MODE_MAP = {
    [ROUTE.DEFINE_BOQ.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_BOQ.DETAIL.PATH]: MODAL_MODE.DETAIL,
    [ROUTE.DEFINE_BOQ.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const { status = -1 } = boqDetails
  const mode = MODE_MAP[routeMatch.path]
  const isView = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  useEffect(() => {
    refreshData()
    return () => {
      actions.resetBOQDetailState()
    }
  }, [mode])

  const refreshData = () => {
    getBOQDetail()
    commonManagementActions.getUsers()
  }

  const getBOQDetail = () => {
    if (isView || isUpdate) {
      actions.getBOQDetailsById(id)
    }
  }

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      planFrom: values?.planList ? values?.planList[0] : '',
      planTo: values?.planList ? values?.planList[1] : '',
      boqItems: values.items?.map((item) => ({
        id: item?.itemId,
        quantity: item?.quantity,
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

  const renderActionButtons = (resetForm) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.close')}
            </Button>
            <Button variant="outlined" color="subText" onClick={resetForm}>
              {t('common.cancel')}
            </Button>
            <Button icon="add" type="submit">
              {t('common.create')}
            </Button>
          </>
        )
      case MODAL_MODE.UPDATE:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.close')}
            </Button>
            <Button variant="outlined" color="subText" onClick={resetForm}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </>
        )
      case MODAL_MODE.DETAIL:
        switch (status) {
          case BOQ_STATUS.PENDING:
            return (
              <>
                <Button color="grayF4" onClick={backToList}>
                  {t('common.close')}
                </Button>
                {/*@TODO ??? approvePermission
                 {approvePermission && (
                  <Button onClick={() => setIsOpenConfirmModal(true)}>
                    {t('common.accept')}
                  </Button>
                )} */}
              </>
            )
          case BOQ_STATUS.APPROVED:
            return (
              <Button color="grayF4" onClick={backToList}>
                {t('common.close')}
              </Button>
            )
          case BOQ_STATUS.REJECTED:
            return (
              <>
                <Button color="grayF4" onClick={backToList}>
                  {t('common.close')}
                </Button>
                <Button variant="outlined" color="subText" onClick={resetForm}>
                  {t('common.cancel')}
                </Button>
                <Button type="submit">{t('common.save')}</Button>
              </>
            )
          case BOQ_STATUS.CONFIRMED:
          case BOQ_STATUS.IN_PROGRESS:
          case BOQ_STATUS.COMPLETED:
          default:
            return (
              <Button color="grayF4" onClick={backToList}>
                {t('common.close')}
              </Button>
            )
        }
      default:
        break
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
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.DEFINE_BOQ.DETAIL.PATH + `/${id}`,
          title: ROUTE.DEFINE_BOQ.DETAIL.TITLE,
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
      case MODAL_MODE.DETAIL:
        return ROUTE.DEFINE_BOQ.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_BOQ.EDIT.TITLE
      default:
    }
  }

  const genColorButton = () => {
    switch (status) {
      case BOQ_STATUS.PENDING:
      case BOQ_STATUS.UPDATE:
      case BOQ_STATUS.CREATE:
      case BOQ_STATUS.COMPLETED:
        return 'primary'
      case BOQ_STATUS.REJECTED:
        return 'error'
      default:
        return 'text'
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
            <Grid container justifyContent={'center'}>
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  {status >= 0 && (
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color={genColorButton()}
                        sx={{ display: 'flex', marginLeft: 'auto' }}
                      >
                        {t(BOQ_STATUS_MAP[status])}
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="code"
                      label={t('defineBOQ.boqCode')}
                      placeholder={t('defineBOQ.boqCode')}
                      inputProps={{ maxLength: 4 }}
                      disabled={isUpdate || isView}
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="pmId"
                      disabled={isView}
                      label={t('defineBOQ.boqPm')}
                      placeholder={t('defineBOQ.boqPm')}
                      options={userList}
                      labelWidth={180}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) =>
                        option.fullName ? option.fullName : option.username
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="name"
                      label={t('defineBOQ.boqName')}
                      placeholder={t('defineBOQ.boqName')}
                      disabled={isView}
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="apmId"
                      label={t('defineBOQ.boqApm')}
                      placeholder={t('defineBOQ.boqApm')}
                      options={userList}
                      getOptionValue={(option) => option?.id}
                      getOptionLabel={(option) =>
                        option.fullName || option.username
                      }
                      disabled={isView}
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.DateRangePicker
                      name="planList"
                      label={t('defineBOQ.planList')}
                      placeholder={t('defineBOQ.planList')}
                      disabled={isView}
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      name="userPermission"
                      label={t('defineBOQ.boqUserPermission')}
                      placeholder={t('defineBOQ.boqUserPermission')}
                      disabled
                      labelWidth={180}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineBOQ.descriptionInput')}
                      placeholder={t('defineBOQ.descriptionInput')}
                      multiline
                      disabled={isView}
                      labelWidth={180}
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
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                '& button + button': {
                  marginLeft: '16px',
                },
              }}
            >
              {renderActionButtons(resetForm)}
            </Box>
          </Form>
        )}
      </Formik>

      <Dialog
        open={isOpenConfirmModal}
        title={t('common.notify')}
        maxWidth="sm"
        submitLabel={t('common.yes')}
        onSubmit={() => actions.confirmBOQById(id, backToList())}
        submitProps={{
          color: 'error',
        }}
        cancelLabel={t('common.no')}
        onCancel={() => {
          setIsOpenConfirmModal(false)
          backToList()
        }}
        cancelProps={{
          variant: 'outlined',
          color: 'subText',
        }}
        PaperProps={{
          sx: {
            '.MuiDialogContent-root': {
              borderBottom: 0,
            },
          },
        }}
      >
        {t('common.confirmMessage.confirm')}
      </Dialog>
    </Page>
  )
}

export default BOQForm
