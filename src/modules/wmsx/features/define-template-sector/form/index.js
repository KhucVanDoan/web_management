import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { DEFAULT_UNITS } from '~/modules/wmsx/constants'
import { useTemplateSector } from '~/modules/wmsx/redux/hooks/useDefineTemplateSector'
import useDefineTemplateShelf from '~/modules/wmsx/redux/hooks/useDefineTemplateShelf'
import useTemplateSectorTemplateShelf from '~/modules/wmsx/redux/hooks/useTemplateSectorTemplateShelf'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertToCm } from '~/utils/measure'

import ItemSettingTable from './item-setting-table'
import templateSectorSchema from './schema'
const DEFAULT_ITEM = [
  {
    id: new Date().getTime(),
    nameSheft: '',
  },
]

const TemplateSectorForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.TEMPLATE_SECTOR.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.TEMPLATE_SECTOR.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { templateSectorDetails, isLoading },
    actions,
  } = useTemplateSector()
  const { actions: templateSectorTemplateShelfActions } =
    useTemplateSectorTemplateShelf()
  const {
    data: { templateShelfList },
    actions: defineTemplateShelfAction,
  } = useDefineTemplateShelf()
  const initialValues = {
    name: templateSectorDetails?.name || '',
    unit: templateSectorDetails?.width?.unit || '',
    long: templateSectorDetails?.long?.value || '',
    width: templateSectorDetails?.width?.value || '',
    height: templateSectorDetails?.height?.value || '',
    templateSheft:
      templateSectorDetails?.templateShelfs?.length > 0
        ? templateShelfList.find(
            (shelf) =>
              shelf?.id === templateSectorDetails?.templateShelfs[0]?.id,
          )
        : '',
    items: templateSectorDetails?.templateShelfs?.length
      ? templateSectorDetails?.templateShelfs.map((item, index) => ({
          id: index,
          nameSheft: item?.name,
        }))
      : DEFAULT_ITEM,
  }

  useEffect(() => {
    defineTemplateShelfAction.searchTemplateShelfs({ isGetAll: 1 })
  }, [])
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getTemplateSectorDetailById(id)
    }
    return () => actions.resetTemplateSectorState()
  }, [mode])

  const onSubmit = (values) => {
    const params = {
      name: values?.name,
      width: {
        value: parseFloat(values?.width) || 0,
        unit: values?.unit,
      },
      height: {
        value: parseFloat(values?.height) || 0,
        unit: values?.unit,
      },
      long: {
        value: parseFloat(values?.long) || 0,
        unit: values?.unit,
      },
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createTemplateSector(params, (data) => {
        saveTemplateShelfInSector(
          data?.id,
          values?.templateSheft?.id,
          values?.items,
          values?.long,
        )
      })
    } else {
      params.id = +id
      actions.updateTemplateSector(params, (data) => {
        saveTemplateShelfInSector(
          data?.id,
          values?.templateSheft?.id,
          values?.items,
          values?.long,
        )
      })
    }
  }

  const saveTemplateShelfInSector = (
    templateSectorId,
    templateShelfId,
    shelfs,
    sectorLong,
  ) => {
    const templateShelfLong = templateShelfList?.find(
      (templateShelf) => templateShelf.id === templateShelfId,
    )?.long

    const templateSectorTemplateShelfs = shelfs.map((shelf, index) => ({
      name: shelf.nameSheft,
      design: {
        x: 0,
        y: index * (templateShelfLong?.value / sectorLong),
        rotate: 0,
      },
    }))
    const params = {
      templateSectorId: templateSectorId,
      templateShelfId: templateShelfId,
      data: templateSectorTemplateShelfs,
    }

    templateSectorTemplateShelfActions.saveTemplateSectorTemplateShelf(
      params,
      () => backToList(),
    )
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'warehouseSetup',
      },
      {
        route: ROUTE.TEMPLATE_SECTOR.LIST.PATH,
        title: ROUTE.TEMPLATE_SECTOR.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.TEMPLATE_SECTOR.CREATE.PATH,
          title: ROUTE.TEMPLATE_SECTOR.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.TEMPLATE_SECTOR.EDIT.PATH,
          title: ROUTE.TEMPLATE_SECTOR.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
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
  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.TEMPLATE_SECTOR.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.TEMPLATE_SECTOR.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.TEMPLATE_SECTOR.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.TEMPLATE_SECTOR.LIST.PATH)
  }

  const handleChangeTemplateSector = (setFieldValue) => {
    setFieldValue('items', DEFAULT_ITEM)
  }
  const hangleChangeLong = (long, values, setFieldValue) => {
    const templateShelfLong = convertToCm(
      values?.templateSheft?.long?.unit,
      values?.templateSheft?.long?.value,
    )
    if (!long || !templateShelfLong) return
    const newItems = (values?.items || []).reduce(
      (acc, cur) => {
        if (
          acc.totalLong + templateShelfLong <
          convertToCm(values?.unit, long)
        ) {
          return {
            items: [...acc.items, cur],
            totalLong: acc.totalLong + templateShelfLong,
          }
        }
        return acc
      },
      { items: [], totalLong: 0 },
    ).items
    setFieldValue('items', newItems)
  }
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={templateSectorSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent="center">
                <Grid item xl={11} xs={12}>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('templateSector.name')}
                        name="name"
                        placeholder={t('templateSector.name')}
                        disabled={isUpdate}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h4" component="span">
                        {t('templateSector.storage')}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('templateSector.unit')}
                        name="unit"
                        placeholder={t('templateSector.unit')}
                        options={DEFAULT_UNITS}
                        getOptionValue={(opt) => opt?.id}
                        getOptionLabel={(opt) => opt?.name}
                        disableClearable
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="long"
                        label={t('templateSector.long')}
                        placeholder={t('templateSector.long')}
                        allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                        type="number"
                        numberProps={{
                          decimalScale: 3,
                        }}
                        onChange={(long) =>
                          hangleChangeLong(long, values, setFieldValue)
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="width"
                        label={t('templateSector.width')}
                        placeholder={t('templateSector.width')}
                        allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                        type="number"
                        numberProps={{
                          decimalScale: 3,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        name="height"
                        label={t('templateSector.height')}
                        placeholder={t('templateSector.height')}
                        allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                        type="number"
                        numberProps={{
                          decimalScale: 3,
                        }}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" component="span">
                        {t('templateSector.sheftInArea')}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        label={t('templateSector.templateSheft')}
                        name="templateSheft"
                        placeholder={t('templateSector.templateSheft')}
                        required
                        options={templateShelfList}
                        getOptionValue={(opt) => opt}
                        getOptionLabel={(opt) => opt?.name}
                        onChange={() =>
                          handleChangeTemplateSector(setFieldValue)
                        }
                        getOptionSubLabel={(opt) =>
                          `D*R*C:${opt?.long?.value}* ${opt?.width?.value}* ${
                            opt?.height?.value
                          }(${
                            DEFAULT_UNITS?.find(
                              (unit) => unit.id === opt?.width?.unit,
                            )?.name
                          })`
                        }
                        disableClearable
                      />
                    </Grid>

                    {values?.templateSheft?.id && (
                      <>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            name="numberOfSector"
                            value={(values?.items || []).length}
                            label={t('templateSector.numberOfShelfs')}
                            sx={{ flex: 1 }}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FieldArray
                            name="items"
                            render={(arrayHelpers) => (
                              <ItemSettingTable
                                items={values?.items || []}
                                arrayHelpers={arrayHelpers}
                                values={values}
                              />
                            )}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {renderActionBar(handleReset)}
            </Form>
          )
        }}
      </Formik>
    </Page>
  )
}

export default TemplateSectorForm
