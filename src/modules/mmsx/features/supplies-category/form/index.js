import React, { useEffect } from 'react'

import { Box, Grid, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ACTION_MAP,
  SUPPLIES_CATEGORY_STATUS_OPTIONS,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useSuppliesCategory from '~/modules/mmsx/redux/hooks/useSuppliesCategory'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateShema } from './schema'

const SuppliesCategoryForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { suppliesCategoryDetail, isLoading },
    actions,
  } = useSuppliesCategory()

  const {
    data: { responsibleSubject },
    actions: commonAction,
  } = useCommonInfo()

  const MODE_MAP = {
    [ROUTE.SUPPLIES_CATEGORY.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.SUPPLIES_CATEGORY.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.SUPPLIES_CATEGORY.LIST.PATH)
  }

  useEffect(() => {
    commonAction.getResponsibleSubject()
  }, [])

  const initialValues = {
    code: suppliesCategoryDetail?.code || '',
    name: suppliesCategoryDetail?.name || '',
    responsibleUser: suppliesCategoryDetail?.responsibleUser,
    description: suppliesCategoryDetail?.description || '',
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getDetailSuppliesCategory(id)
    }
    return () => {
      if (isUpdate) actions.resetSuppliesCategory()
    }
  }, [id])

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      id,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createSuppliesCategory(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateSuppliesCategory(convertValues, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.SUPPLIES_CATEGORY.LIST.PATH,
        title: ROUTE.SUPPLIES_CATEGORY.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_CATEGORY.CREATE.PATH,
          title: ROUTE.SUPPLIES_CATEGORY.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.SUPPLIES_CATEGORY.EDIT.PATH,
          title: ROUTE.SUPPLIES_CATEGORY.EDIT.TITLE,
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
        return ROUTE.SUPPLIES_CATEGORY.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.SUPPLIES_CATEGORY.EDIT.TITLE
      default:
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

  const histories = suppliesCategoryDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`suppliesCategory.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))

  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('suppliesCategory.button.supply')}
          </Button>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('suppliesCategory.button.device')}
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={validateShema(t)}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ handleReset }) => (
                <Form>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    {isUpdate && (
                      <Grid item xs={12}>
                        <LV
                          label={
                            <Typography>
                              {t('suppliesCategory.form.status')}
                            </Typography>
                          }
                          value={
                            <Status
                              options={SUPPLIES_CATEGORY_STATUS_OPTIONS}
                              value={suppliesCategoryDetail?.status}
                            />
                          }
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="code"
                        label={t('suppliesCategory.form.code')}
                        placeholder={t('suppliesCategory.form.code')}
                        disabled={mode === MODAL_MODE.UPDATE}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="name"
                        label={t('suppliesCategory.form.name')}
                        placeholder={t('suppliesCategory.form.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('suppliesCategory.form.description')}
                        placeholder={t('suppliesCategory.form.description')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.Autocomplete
                        name="responsibleUser"
                        label={t('suppliesCategory.responsibleUser')}
                        placeholder={t('suppliesCategory.responsibleUser')}
                        options={responsibleSubject?.responsibleUsers}
                        getOptionLabel={(opt) => opt?.username}
                        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      />
                    </Grid>
                  </Grid>
                  {renderActionBar(handleReset)}
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
      {isUpdate && <Activities data={histories} />}
    </Page>
  )
}

export default SuppliesCategoryForm
