import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useItemGroup from '~/modules/mesx/redux/hooks/useItemGroup'
import { ROUTE } from '~/modules/mesx/routes/config'
import { useClasses } from '~/themes'
import { formatDateTimeUtc } from '~/utils'

import { itemGroupSchema } from './schema'
import useStyles from './style'

const ItemGroupForm = () => {
  const classes = useClasses(useStyles)
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const params = useParams()
  const {
    data: { isLoading },
    actions,
  } = useItemGroup()
  const [mode, setMode] = useState(MODAL_MODE.CREATE)
  const [initialValues, setInitialValues] = useState({
    code: '',
    name: '',
    decription: '',
  })
  const MODE_MAP = {
    [ROUTE.ITEM_GROUP.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ITEM_GROUP.EDIT.PATH]: MODAL_MODE.UPDATE,
    [ROUTE.ITEM_GROUP.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const isView = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE
  const { t } = useTranslation(['mesx'])

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.ITEM_GROUP.LIST.PATH,
        title: ROUTE.ITEM_GROUP.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.ITEM_GROUP.CREATE.PATH,
          title: ROUTE.ITEM_GROUP.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.ITEM_GROUP.EDIT.PATH,
          title: ROUTE.ITEM_GROUP.EDIT.TITLE,
        })
        break
      case MODAL_MODE.DETAIL:
        breadcrumb.push({
          route: ROUTE.ITEM_GROUP.DETAIL.PATH,
          title: ROUTE.ITEM_GROUP.DETAIL.TITLE,
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
        return ROUTE.ITEM_GROUP.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.ITEM_GROUP.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ITEM_GROUP.EDIT.TITLE
      default:
        break
    }
  }

  const renderActionButtons = ({ handleReset }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={backToList} color="grayF4" sx={{ mr: 1 }}>
              {t('common.close')}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              color="subText"
              sx={{ mr: 1 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </Box>
        )
      case MODAL_MODE.DETAIL:
        return (
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={backToList} color="grayF4">
              {t('common.close')}
            </Button>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={backToList} color="grayF4" sx={{ mr: 1 }}>
              {t('common.close')}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              color="subText"
              sx={{ mr: 1 }}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </Box>
        )
      default:
    }
  }

  const backToList = () => {
    history.push(ROUTE.ITEM_GROUP.LIST.PATH)
  }

  useEffect(() => {
    setMode(MODE_MAP[routeMatch.path])
    if (mode !== MODAL_MODE.CREATE) {
      const id = params?.id
      actions.getItemGroupDetailsById(id, (data) => {
        const { code, name, description, createdAt, updatedAt } = data
        setInitialValues({
          code,
          name,
          description,
          createdAt,
          updatedAt,
        })
      })
    }
  }, [routeMatch.path, mode])

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createItemGroup(values, () => backToList())
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const { code, name, description } = values
      const paramUpdate = {
        id,
        code,
        name,
        description,
      }
      actions.updateItemGroup(paramUpdate, () => backToList())
    }
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
        validationSchema={itemGroupSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
          <Form>
            {/* @TODO: <linh.taquang> fix UI */}
            <Grid container columnSpacing={4} rowSpacing={4 / 3}>
              <Grid item xs={6}>
                <Field.TextField
                  label={t('itemGroupDefine.code')}
                  name="code"
                  placeholder={t('itemGroupDefine.code')}
                  disabled={isView || isUpdate}
                  labelWidth={180}
                />
              </Grid>
              <Grid item xs={6}>
                <Field.TextField
                  name="name"
                  label={t('itemGroupDefine.name')}
                  placeholder={t('itemGroupDefine.name')}
                  disabled={isView}
                  labelWidth={180}
                />
              </Grid>
              <Grid item xs={12}>
                <Field.TextField
                  name="description"
                  label={t('itemGroupDefine.description')}
                  disabled={isView}
                  placeholder={t('itemGroupDefine.description')}
                  multiline
                  rows={3}
                  labelWidth={180}
                />
              </Grid>
            </Grid>
            {isView && (
              <Box
                width={1}
                mt={2}
                flex={1}
                display="flex"
                justifyContent="space-between"
              >
                <div>
                  <label>
                    <Typography>
                      {t('itemTypeSetting.createDate')}:{' '}
                      {formatDateTimeUtc(values.createdAt)}
                    </Typography>
                  </label>
                </div>
                <div>
                  <label>
                    <Typography>
                      {t('itemTypeSetting.updateDate')}:{' '}
                      {formatDateTimeUtc(values.updatedAt)}
                    </Typography>
                  </label>
                </div>
              </Box>
            )}
            <Box className={clsx(classes.marginAuto, classes.marginLabel)}>
              {renderActionButtons({ handleReset })}
            </Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}
export default ItemGroupForm
