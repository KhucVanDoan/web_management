import React, { useEffect, useMemo } from 'react'

import { Grid, Box } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { MATERIAL_ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useMaterialManagement from '~/modules/wmsx/redux/hooks/useMaterialManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from '../form/items-setting-table'

const DEFAULT_ITEM = {
  id: new Date().getTime(),
  itemId: '',
}

function MaterialManagementDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()

  const MODE_MAP = {
    [ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH]: MODAL_MODE.UPDATE,
    [ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]

  const {
    data: { isLoading, materialDetails },
    actions,
  } = useMaterialManagement()

  useEffect(() => {
    actions.getMaterialDetailsById(id)
    return () => {
      actions.resetMaterialDetailsState()
    }
  }, [id])

  const backToList = () => {
    if (mode === MODAL_MODE.DETAIL) {
      history.push(ROUTE.MATERIAL_MANAGEMENT.LIST.PATH)
    }
    history.push(ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`))
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        route: ROUTE.MATERIAL_MANAGEMENT.LIST.PATH,
        title: ROUTE.MATERIAL_MANAGEMENT.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.DETAIL:
        breadcrumbs.push({
          route: ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH,
          title: ROUTE.MATERIAL_MANAGEMENT.DETAIL.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH,
          title: ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.UPDATE:
        return ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.MATERIAL_MANAGEMENT.DETAIL.TITLE
      default:
        break
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.DETAIL:
        return <ActionBar onBack={backToList} />
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

  const renderHeaderRight = () =>
    mode === MODAL_MODE.DETAIL ? (
      <Button
        onClick={() =>
          history.push(
            ROUTE.MATERIAL_MANAGEMENT.EDIT_WAREHOUSE_SOURCE.PATH.replace(
              ':id',
              `${id}`,
            ),
          )
        }
        sx={{ ml: 4 / 3 }}
        icon="edit"
      >
        {t('materialManagement.updateWarehouseSource')}
      </Button>
    ) : (
      ''
    )

  const initialValues = useMemo(
    () => ({
      items: materialDetails?.items || [{ ...DEFAULT_ITEM }],
    }),
    [materialDetails],
  )

  const handleSubmit = (values) => {
    const convertValues = { ...values, id: +id }
    actions.updateWarehouseSource(convertValues, backToList)
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.' + getTitle())}
      onBack={backToList}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('materialManagement.status')}
                value={
                  <Status
                    options={MATERIAL_ACTIVE_STATUS_OPTIONS}
                    value={materialDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.code')}
                value={materialDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.name')}
                value={materialDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.normalizedCode')}
                value={materialDetails?.normalizeCode}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.country')}
                value={materialDetails?.manufacturingCountry?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.materialCategory')}
                value={materialDetails?.itemType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.materialQuality')}
                value={materialDetails?.itemQuality?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.objectCategory')}
                value={materialDetails?.objectCategory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.specifications')}
                value={materialDetails?.specifications}
              />
            </Grid>
            <Grid item lg={6} xs={12} />
            <Grid item lg={6} xs={12}>
              <LV
                label={t('materialManagement.materialImage')}
                value={materialDetails?.materialImage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('materialManagement.description')}
                multiline
                rows={3}
                value={materialDetails?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Box sx={{ mt: 3 }}>
                  {mode === MODAL_MODE.DETAIL ? (
                    <ItemsSettingTable
                      items={materialDetails?.items}
                      mode={MODAL_MODE.DETAIL}
                    />
                  ) : (
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
                  )}
                </Box>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default MaterialManagementDetail
