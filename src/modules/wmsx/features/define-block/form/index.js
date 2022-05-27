import React, { useEffect, useMemo } from 'react'

import { Box, FormControl, Grid } from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import {
  CODE_SETTINGS,
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { DEFAULT_UNITS, WEIGHT_UNITS } from '~/modules/wmsx/constants'
import useDefineBlock from '~/modules/wmsx/redux/hooks/useDefineBlock'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { defineBlockSchema } from './schema'

const DEFAULT_ITEM = {
  itemId: '',
  itemDetailId: '',
  quantity: 1,
}
const DefineBlockForm = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const params = useParams()
  const routeMatch = useRouteMatch()
  const {
    data: { isLoading, blockDetails },
    actions,
  } = useDefineBlock()

  const MODE_MAP = {
    [ROUTE.DEFINE_BLOCK.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_BLOCK.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const initialValues = useMemo(
    () => ({
      name: blockDetails?.name || '',
      code: isUpdate ? blockDetails?.code : CODE_SETTINGS.BLOCK.PREFIX,
      description: blockDetails?.description || '',
      long: {
        value: blockDetails?.long?.value || 1,
        unit: blockDetails?.long?.unit || 3,
      },
      width: {
        value: blockDetails?.width?.value || 1,
        unit: blockDetails?.width?.unit || 3,
      },
      height: {
        value: blockDetails?.height?.value || 1,
        unit: blockDetails?.height?.unit || 3,
      },
      weight: {
        value: blockDetails?.weight?.value || 1,
        unit: blockDetails?.weight?.unit || 1,
      },
      items: blockDetails?.blockItemDetails?.map((p) => ({
        itemId: p.item,
        itemDetailId: p.itemDetail,
        quantity: p.quantity,
      })) || [{ ...DEFAULT_ITEM }],
    }),
    [blockDetails, isUpdate],
  )

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      const id = params?.id
      actions.getBlockDetailsById(id)
    }
    return () => {
      if (isUpdate) actions.resetBlockDetailsState()
    }
  }, [params?.id])

  const onSubmit = (values) => {
    const id = Number(params?.id)

    const convertValues = {
      ...values,
      id,
      itemDetails: values.items.map((item) => ({
        itemId: item.itemId?.id,
        itemDetailId:
          item?.itemDetailId?.id || item?.itemDetailId?.itemDetailId,
        quantity: item.quantity,
      })),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createBlock(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateBlock(convertValues, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'defineCategory',
      },
      {
        route: ROUTE.DEFINE_BLOCK.LIST.PATH,
        title: ROUTE.DEFINE_BLOCK.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_BLOCK.CREATE.PATH,
          title: ROUTE.DEFINE_BLOCK.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_BLOCK.EDIT.PATH,
          title: ROUTE.DEFINE_BLOCK.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumbs
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.DEFINE_BLOCK.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_BLOCK.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.DEFINE_BLOCK.LIST.PATH)
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
            validationSchema={defineBlockSchema(t)}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, setFieldValue, values }) => (
              <Form>
                <Tabs
                  list={[t('defineBlock.commonInfo'), t('defineBlock.storage')]}
                >
                  {/* Tab 1 */}
                  <Box>
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          label={t('defineBlock.code')}
                          name="code"
                          placeholder={t('defineBlock.code')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_12.MAX,
                          }}
                          disabled={isUpdate}
                          required
                          allow={TEXTFIELD_ALLOW.NUMERIC}
                          onInput={(val) => {
                            if (
                              val?.indexOf(CODE_SETTINGS.BLOCK.PREFIX) !== 0
                            ) {
                              return
                            }
                            setFieldValue('code', val)
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Field.TextField
                          name="name"
                          label={t('defineBlock.name')}
                          placeholder={t('defineBlock.name')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field.TextField
                          name="description"
                          label={t('defineBlock.description')}
                          placeholder={t('defineBlock.description')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          multiline
                          rows={3}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FieldArray
                          name="items"
                          render={(arrayHelpers) => (
                            <ItemsSettingTable
                              items={values?.items || []}
                              arrayHelpers={arrayHelpers}
                              setFieldValue={setFieldValue}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Tab 2 */}
                  <Box>
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item lg={6} xs={12}>
                        <Grid container spacing={1} mb={4 / 3}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="long.value"
                              label={t('defineBlock.long')}
                              labelWidth={100}
                              placeholder={t('defineBlock.long')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="long.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="width.value"
                              label={t('defineBlock.width')}
                              labelWidth={100}
                              placeholder={t('defineBlock.width')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="width.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item lg={6} xs={12}>
                        <Grid container spacing={1} mb={4 / 3}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="height.value"
                              label={t('defineBlock.height')}
                              labelWidth={100}
                              placeholder={t('defineBlock.height')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="height.unit"
                                options={DEFAULT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid item xs={8}>
                            <Field.TextField
                              name="weight.value"
                              label={t('defineBlock.weight')}
                              labelWidth={100}
                              placeholder={t('defineBlock.weight')}
                              numberProps={{
                                decimalScale: 3,
                              }}
                              required
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth size="small">
                              <Field.Autocomplete
                                name="weight.unit"
                                options={WEIGHT_UNITS}
                                getOptionLabel={(opt) => opt?.name}
                                getOptionValue={(opt) => opt?.id}
                              ></Field.Autocomplete>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Tabs>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineBlockForm
