import React, { useEffect, useMemo } from 'react'

import { Box, Button, FormLabel, Grid, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  ASYNC_SEARCH_LIMIT,
  MODAL_MODE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { MATERIAL_ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useMaterialManagement from '~/modules/wmsx/redux/hooks/useMaterialManagement'
import { searchMaterialCategoryApi } from '~/modules/wmsx/redux/sagas/define-material-category/search-material-category'
import { searchMaterialQualityApi } from '~/modules/wmsx/redux/sagas/define-material-quality/search-material-quality'
import { searchObjectCategoryApi } from '~/modules/wmsx/redux/sagas/define-object-category/search-object-category'
import { searchProducingCountryApi } from '~/modules/wmsx/redux/sagas/define-producing-country/search-producing-country'
import { searchUomsApi } from '~/modules/wmsx/redux/sagas/define-uom/search-uom'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { useClasses } from '~/themes'
import { convertFilterParams } from '~/utils'

import { formSchema } from './schema'
import style from './style'
function MaterialManagementForm() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const classes = useClasses(style)

  const {
    data: { isLoading, materialDetails },
    actions,
  } = useMaterialManagement()

  const MODE_MAP = {
    [ROUTE.MATERIAL_MANAGEMENT.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MATERIAL_MANAGEMENT.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      code: materialDetails?.code || '',
      name: materialDetails?.name || '',
      normalizeCode: materialDetails?.normalizeCode || '',
      country: materialDetails?.manufacturingCountry || null,
      objectCategory: materialDetails?.objectCategory || null,
      uom: materialDetails?.itemUnit || null,
      materialCategory: materialDetails?.itemType || null,
      materialQuality: materialDetails?.itemQuality || null,
      specifications: materialDetails?.specifications || null,
      materialImage: materialDetails?.materialImage || null,
      description: materialDetails?.description || '',
    }),
    [materialDetails],
  )

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        route: ROUTE.MATERIAL_MANAGEMENT.LIST.PATH,
        title: ROUTE.MATERIAL_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.MATERIAL_MANAGEMENT.CREATE.PATH,
          title: ROUTE.MATERIAL_MANAGEMENT.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.MATERIAL_MANAGEMENT.EDIT.PATH,
          title: ROUTE.MATERIAL_MANAGEMENT.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  useEffect(() => {
    if (isUpdate) {
      actions.getMaterialDetailsById(id)
    }
    return () => {
      actions.resetMaterialDetailsState()
    }
  }, [id])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.MATERIAL_MANAGEMENT.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MATERIAL_MANAGEMENT.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.MATERIAL_MANAGEMENT.LIST.PATH)
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      manufacturingCountryId: values?.country?.id,
      objectCategoryId: values?.objectCategory?.id,
      itemTypeId: values?.materialCategory?.id,
      itemQualityId: values?.materialQuality?.id,
      itemUnitId: values?.uom?.id,
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createMaterial(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      const paramUpdate = {
        ...convertValues,
        id: +id,
      }
      actions.updateMaterial(paramUpdate, backToList)
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
            validationSchema={formSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, setFieldValue, values }) => (
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
                            {t('materialManagement.status')}
                          </Typography>
                        }
                        value={
                          <Status
                            options={MATERIAL_ACTIVE_STATUS_OPTIONS}
                            value={materialDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="code"
                      label={t('materialManagement.code')}
                      placeholder={t('materialManagement.code')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_22.MAX,
                      }}
                      disabled={isUpdate}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('materialManagement.name')}
                      placeholder={t('materialManagement.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.TextField
                      name="normalizeCode"
                      label={t('materialManagement.normalizedCode')}
                      placeholder={t('materialManagement.normalizedCode')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_11.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="country"
                      label={t('materialManagement.country')}
                      placeholder={t('materialManagement.country')}
                      asyncRequest={(s) =>
                        searchProducingCountryApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="materialCategory"
                      label={t('materialManagement.materialCategory')}
                      placeholder={t('materialManagement.materialCategory')}
                      asyncRequest={(s) =>
                        searchMaterialCategoryApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                          filter: convertFilterParams({
                            level: 2,
                          }),
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="materialQuality"
                      label={t('materialManagement.materialQuality')}
                      placeholder={t('materialManagement.materialQuality')}
                      asyncRequest={(s) =>
                        searchMaterialQualityApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="objectCategory"
                      label={t('materialManagement.objectCategory')}
                      placeholder={t('materialManagement.objectCategory')}
                      asyncRequest={(s) =>
                        searchObjectCategoryApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>

                  <Grid item lg={6} xs={12}>
                    <LV
                      label={
                        <Box sx={{ mt: 8 / 12 }}>
                          <FormLabel>
                            <Typography color={'text.main'} component="span">
                              {t('materialManagement.specifications')}
                            </Typography>
                          </FormLabel>
                        </Box>
                      }
                    >
                      {values?.specifications ? (
                        <>
                          <label htmlFor="select-file">
                            <Typography
                              className={classes.uploadText}
                              sx={{ mt: 8 / 12 }}
                            >
                              {values?.specifications?.name}
                            </Typography>
                          </label>
                          <input
                            hidden
                            id="select-file"
                            multiple
                            type="file"
                            onChange={(e) => {
                              setFieldValue('specifications', e.target.files[0])
                            }}
                          />
                        </>
                      ) : (
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            id="select-file"
                            multiple
                            type="file"
                            onChange={(e) => {
                              setFieldValue('specifications', e.target.files[0])
                            }}
                          />
                        </Button>
                      )}
                    </LV>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="uom"
                      label={t('materialManagement.uom')}
                      placeholder={t('materialManagement.uom')}
                      asyncRequest={(s) =>
                        searchUomsApi({
                          keyword: s,
                          limit: ASYNC_SEARCH_LIMIT,
                        })
                      }
                      asyncRequestHelper={(res) => res?.data?.items}
                      isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
                      getOptionLabel={(opt) => opt?.code}
                      getOptionSubLabel={(opt) => opt?.name}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV
                      label={
                        <Box sx={{ mt: 8 / 12 }}>
                          <FormLabel>
                            <Typography color={'text.main'} component="span">
                              {t('materialManagement.materialImage')}
                            </Typography>
                          </FormLabel>
                        </Box>
                      }
                    >
                      {values?.materialImage ? (
                        <>
                          <label htmlFor="select-image">
                            <Typography
                              className={classes.uploadText}
                              sx={{ mt: 8 / 12 }}
                            >
                              {values?.materialImage?.name}
                            </Typography>
                          </label>
                          <input
                            hidden
                            id="select-image"
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={(e) => {
                              setFieldValue('materialImage', e.target.files[0])
                            }}
                          />
                        </>
                      ) : (
                        <Button variant="contained" component="label">
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            id="select-image"
                            multiple
                            type="file"
                            onChange={(e) => {
                              setFieldValue('materialImage', e.target.files[0])
                            }}
                          />
                        </Button>
                      )}
                    </LV>
                  </Grid>
                  {isUpdate && (
                    <>
                      <Grid item xs={12}>
                        <LV
                          label={
                            <FormLabel>
                              <Typography color={'text.main'} component="span">
                                {t('materialManagement.qrCode')}
                              </Typography>
                            </FormLabel>
                          }
                        >
                          <Box />
                        </LV>
                      </Grid>
                      <Grid item xs={12}>
                        <LV
                          label={
                            <FormLabel>
                              <Typography color={'text.main'} component="span">
                                {t('materialManagement.qrCodeVal')}
                              </Typography>
                            </FormLabel>
                          }
                        >
                          {materialDetails?.qrCode}
                        </LV>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('materialManagement.description')}
                      placeholder={t('materialManagement.description')}
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

export default MaterialManagementForm
