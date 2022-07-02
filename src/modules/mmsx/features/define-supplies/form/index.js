import React, { useEffect } from 'react'

import { Box, FormControlLabel, Grid, Radio, Typography } from '@mui/material'
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
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { PRE_FIX_CODE, SUPPLIES_STATUS_OPTION } from '~/modules/mmsx/constants'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'
import useDefineSupplies from '~/modules/mmsx/redux/hooks/useDefineSupplies'
import { ROUTE } from '~/modules/mmsx/routes/config'

import { validateShema } from './schema'

const DefineSuppliesForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { suppliesDetail, isLoading },
    actions,
  } = useDefineSupplies()
  const {
    data: { responsibleSubject, itemsUnitList },
    actions: commonAction,
  } = useCommonInfo()
  const MODE_MAP = {
    [ROUTE.DEFINE_SUPPLIES.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_SUPPLIES.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.DEFINE_SUPPLIES.LIST.PATH)
  }
  useEffect(() => {
    commonAction.getResponsibleSubject()
    commonAction.getItemUnits()
  }, [])
  const initialValues = {
    code: suppliesDetail?.code || PRE_FIX_CODE,
    name: suppliesDetail?.name || '',
    groupSupplyId: suppliesDetail?.supplyGroup?.name || '',
    type: suppliesDetail?.type ? `${suppliesDetail?.type}` : '0',
    //TODO:đợi BE
    Supplier: '',
    date: '',
    price: suppliesDetail?.price || '',
    itemUnitId: suppliesDetail?.itemUnit?.id || '',
    responsibleUser: suppliesDetail?.responsibleUser?.id || '',
    description: suppliesDetail?.description || '',
  }
  useEffect(() => {
    if (isUpdate) {
      actions.getSupplies(id)
    }
    return () => {
      actions.resetSupplies()
    }
  }, [id])

  const handleSubmit = (values) => {
    const findUser = responsibleSubject?.responsibleUsers?.find(
      (e) => e?.id === values?.responsibleUserId,
    )
    const findMaintainTeam =
      responsibleSubject?.responsibleMaintenanceTeams?.find(
        (e) => e?.id === values?.responsibleUserId,
      )
    const subject = findUser || findMaintainTeam

    if (isUpdate) {
      const params = {
        id: id,
        body: {
          code: values?.code.trim(),
          name: values?.name ? values?.name?.trim() : '',
          description: values?.description ? values?.description.trim() : '',
          groupSupplyId: values?.groupSupplyId,
          itemUnitId: values?.itemUnitId,
          price: +values?.price || null,
          responsibleUser: {
            id: subject?.id,
            type: subject?.type,
          },
          type: +values?.type || 0,
        },
      }

      actions.updateSupplies(params, backToList)
    } else {
      const params = {
        code: values?.code.trim(),
        name: values?.name ? values?.name.trim() : '',
        description: values?.description ? values?.description.trim() : '',
        groupSupplyId: values?.groupSupplyId,
        itemUnitId: values?.itemUnitId,
        price: +values?.price || null,
        responsibleUser: {
          id: subject?.id,
          type: subject?.type,
        },
        type: +values?.type || 0,
      }
      actions.createSupplies(params, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'deviceManagement',
      },
      {
        route: ROUTE.DEFINE_SUPPLIES.LIST.PATH,
        title: ROUTE.DEFINE_SUPPLIES.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_SUPPLIES.CREATE.PATH,
          title: ROUTE.DEFINE_SUPPLIES.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.DEFINE_SUPPLIES.EDIT.PATH,
          title: ROUTE.DEFINE_SUPPLIES.EDIT.TITLE,
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
        return ROUTE.DEFINE_SUPPLIES.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_SUPPLIES.EDIT.TITLE
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
  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('supplies.button.device')}
          </Button>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('supplies.button.suppliesCategory')}
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
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validateShema(t)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleReset, setFieldValue }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  columnSpacing={{ xl: 8, xs: 4 }}
                  rowSpacing={4 / 3}
                >
                  {isUpdate && (
                    <Grid item xs={12}>
                      <LabelValue
                        label={
                          <Typography>
                            {t('deviceCategory.form.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={SUPPLIES_STATUS_OPTION}
                            value={suppliesDetail?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('supplies.form.field.code')}
                      name="code"
                      placeholder={t('supplies.form.field.code')}
                      disabled={mode === MODAL_MODE.UPDATE}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      onInput={(val) => {
                        if (val?.indexOf(PRE_FIX_CODE) !== 0) {
                          return
                        }
                        setFieldValue('code', val)
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="groupSupplyId"
                      label={t('supplies.form.field.suppliesCategoryName')}
                      placeholder={t(
                        'supplies.form.field.suppliesCategoryName',
                      )}
                      options={[]}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('supplies.form.field.name')}
                      name="name"
                      placeholder={t('supplies.form.field.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <LabelValue
                      label={
                        <Typography sx={{ mt: '9px' }} required>
                          {t('supplies.form.field.type')}
                          <Typography color="error" component="span" ml="3px">
                            *
                          </Typography>
                        </Typography>
                      }
                    >
                      <Field.RadioGroup name="type">
                        <Box sx={{ display: 'flex' }}>
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label={t('deviceList.type.supplies')}
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label={t('deviceList.type.accessory')}
                            sx={{ ml: 3 }}
                          />
                        </Box>
                      </Field.RadioGroup>
                    </LabelValue>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="Supplier"
                      label={t('supplies.category.supplier')}
                      placeholder={t('supplies.category.supplier')}
                      options={[]}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.Autocomplete
                      name="itemUnitId"
                      label={t('supplies.form.field.unit')}
                      placeholder={t('supplies.form.field.unit')}
                      options={itemsUnitList}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="date"
                      label={t('supplies.form.field.dateAdded')}
                      placeholder={t('supplies.form.field.dateAdded')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('supplies.form.field.price')}
                      name="price"
                      placeholder={t('supplies.form.field.price')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('templateInstall.form.field.description')}
                      placeholder={t('templateInstall.form.field.description')}
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
                      label={t('deviceCategory.responsibleUser')}
                      placeholder={t('deviceCategory.responsibleUser')}
                      options={responsibleSubject?.responsibleUsers}
                      getOptionLabel={(opt) => opt?.username}
                      getOptionValue={(opt) => opt?.id}
                    />
                  </Grid>
                </Grid>
                {renderActionBar(handleReset)}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineSuppliesForm
