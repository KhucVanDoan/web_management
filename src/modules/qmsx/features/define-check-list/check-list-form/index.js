import React, { useEffect, useState } from 'react'

import { Grid, Box, Typography } from '@mui/material'
import { FieldArray, Formik, Form } from 'formik'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  CHECK_LIST_STATUS,
  CHECK_LIST_STATUS_OPTIONS,
} from '~/modules/qmsx/constants'
import useDefineCheckList from '~/modules/qmsx/redux/hooks/useDefineCheckList'
import { ROUTE } from '~/modules/qmsx/routes/config'

import CheckListDetailTable from '../check-list-form/check-list-detail-table'
import { defineCheckListSchema } from './schema'

export const DEFAULT_ROW_TABLE = {
  id: null,
  title: '',
  descriptionContent: '',
  checkType: null,
  norm: null,
  itemUnitId: null,
  valueBottom: null,
  valueTop: null,
  errorGroupId: null,
}

function DefineCheckListForm() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { checkListDetail, isLoading },
    actions,
  } = useDefineCheckList()

  const MODE_MAP = {
    [ROUTE.DEFINE_CHECK_LIST.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_CHECK_LIST.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isClone = mode === MODAL_MODE.CREATE && history?.location?.state

  const initialValues = {
    code: '',
    name: '',
    description: '',
    checkListDetails: [{ ...DEFAULT_ROW_TABLE }],
  }

  const [initialValuesForm, setInitialValuesForm] = useState(initialValues)

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'qualityControl',
      },
      {
        route: ROUTE.DEFINE_CHECK_LIST.LIST.PATH,
        title: ROUTE.DEFINE_CHECK_LIST.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_CHECK_LIST.CREATE.PATH,
          title: ROUTE.DEFINE_CHECK_LIST.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_CHECK_LIST.EDIT.PATH,
          title: ROUTE.DEFINE_CHECK_LIST.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (
      mode === MODAL_MODE.UPDATE ||
      (mode === MODAL_MODE.CREATE && history?.location?.state)
    ) {
      const payload = {
        id: params?.id || history?.location?.state,
      }
      actions.getCheckListDetailById(
        payload,
        (data) => {
          if (
            mode === MODAL_MODE.UPDATE &&
            +data.status !== CHECK_LIST_STATUS_OPTIONS.PENDING
          )
            return backToList()
        },
        backToList,
      )
    }
    return () => {
      if (isUpdate || isClone) actions.resetCheckListDetailState()
    }
  }, [params?.id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_CHECK_LIST.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_CHECK_LIST.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_CHECK_LIST.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createCheckList(values, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const paramUpdate = {
        ...values,
        id,
      }
      actions.updateCheckList(paramUpdate, backToList)
    }
  }

  useEffect(() => {
    if (!isEmpty(checkListDetail)) {
      const detail = {
        code: history?.location?.state ? '' : checkListDetail?.code,
        status: history?.location?.state ? null : checkListDetail?.status,
        name: checkListDetail?.name,
        description: checkListDetail?.description,
        checkListDetails: checkListDetail?.checkListDetails?.map((e) => ({
          id: e?.id,
          title: e.title,
          descriptionContent: e.descriptionContent,
          checkType: e.checkType,
          norm: +e.norm,
          itemUnitId: e.itemUnit?.id,
          valueBottom: +e.valueBottom,
          valueTop: +e.valueTop,
          errorGroupId: e.errorGroup?.id,
        })),
      }
      setInitialValuesForm(detail)
    }
  }, [checkListDetail])

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValuesForm}
        validationSchema={defineCheckListSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue, values }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                  sx={{ mb: 2 }}
                >
                  {isUpdate && (
                    <Grid item lg={12} xs={12}>
                      <LV
                        label={
                          <Typography>{t('defineCheckList.status')}</Typography>
                        }
                        value={
                          <Status
                            options={CHECK_LIST_STATUS}
                            value={+values?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('defineCheckList.code')}
                      placeholder={t('defineCheckList.code')}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('defineCheckList.name')}
                      placeholder={t('defineCheckList.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineCheckList.description')}
                      placeholder={t('defineCheckList.description')}
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

            <Box sx={{ mt: 3 }}>
              <FieldArray
                name="checkListDetails"
                render={(arrayHelpers) => (
                  <CheckListDetailTable
                    items={values?.checkListDetails || []}
                    mode={mode}
                    arrayHelpers={arrayHelpers}
                    setFieldValue={setFieldValue}
                  />
                )}
              />
            </Box>
            <ActionBar onBack={backToList} onCancel={handleReset} mode={mode} />
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineCheckListForm
