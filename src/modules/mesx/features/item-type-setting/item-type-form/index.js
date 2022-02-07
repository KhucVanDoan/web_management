import React, { useState, useEffect } from 'react'

import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useItemType from '~/modules/mesx/redux/hooks/useItemType'
import { ROUTE } from '~/modules/mesx/routes/config'
import { useClasses } from '~/themes'
import { formatDateTimeUtc } from '~/utils'

import { itemTypeSchema } from './schema'
import useStyles from './style'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.ITEM_TYPE.LIST.PATH,
    title: ROUTE.ITEM_TYPE.LIST.TITLE,
  },
]

function ItemTypeForm(props) {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const classes = useClasses(useStyles)
  const params = useParams()
  const routeMatch = useRouteMatch()
  const { actions } = useItemType()
  const [mode, setMode] = useState(MODAL_MODE.CREATE)
  const [initialValues, setInitialValues] = useState({
    code: '',
    name: '',
    description: '',
  })

  const MODE_MAP = {
    [ROUTE.ITEM_TYPE.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.ITEM_TYPE.DETAIL.PATH]: MODAL_MODE.DETAIL,
    [ROUTE.ITEM_TYPE.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const isView = mode === MODAL_MODE.DETAIL
  const isUpdate = mode === MODAL_MODE.UPDATE

  useEffect(() => {
    setMode(MODE_MAP[routeMatch.path])
    if (mode !== MODAL_MODE.CREATE) {
      const id = params?.id
      actions.getItemTypeDetailsById(id, (data) => {
        setInitialValues(data)
      })
    }
  }, [routeMatch.path, mode])

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.ITEM_TYPE.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.ITEM_TYPE.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.ITEM_TYPE.EDIT.TITLE
      default:
        break
    }
  }

  const backToList = () => {
    history.push(ROUTE.ITEM_TYPE.LIST.PATH)
  }

  const onSubmit = (values) => {
    if (mode === MODAL_MODE.CREATE) {
      actions.createItemType(values, () => backToList())
    } else if (mode === MODAL_MODE.UPDATE) {
      const id = Number(params?.id)
      const { code, name, description } = values
      const paramUpdate = {
        id,
        code,
        name,
        description,
      }
      actions.updateItemType(paramUpdate, () => backToList())
    }
  }

  const renderActionButtons = ({ handleReset }) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box display="flex">
              <Box mr={1}>
                <Button onClick={backToList} color="grayF4">
                  {t('common.close')}
                </Button>
              </Box>
              <Box mr={1}>
                <Button onClick={handleReset} color="grayF4">
                  {t('common.cancel')}
                </Button>
              </Box>
              <Box>
                <Button type="submit">{t('common.create')}</Button>
              </Box>
            </Box>
          </Box>
        )
      case MODAL_MODE.UPDATE:
        return (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box></Box>
            <Box display="flex">
              <Box mr={1}>
                <Button onClick={backToList} color="grayF4">
                  {t('common.close')}
                </Button>
              </Box>
              <Box mr={1}>
                <Button onClick={handleReset} color="grayF4">
                  {t('common.cancel')}
                </Button>
              </Box>
              <Box>
                <Button type="submit">{t('common.save')}</Button>
              </Box>
            </Box>
          </Box>
        )
      case MODAL_MODE.DETAIL:
        return (
          <Box>
            <Button onClick={backToList}>{t('common.close')}</Button>
          </Box>
        )
      default:
        break
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.itemTypeSetting')}
      onBack={backToList}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
        {t('itemTypeSetting.' + getTitle())}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={itemTypeSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
          <Form>
            <Grid container rowSpacing={4 / 3} columnSpacing={4}>
              <Grid item xs={6}>
                <Field.TextField
                  label={t('itemTypeSetting.code')}
                  name="code"
                  placeholder={t('itemTypeSetting.code')}
                  disabled={isView || isUpdate}
                  required
                  labelWidth={180}
                />
              </Grid>
              <Grid item xs={6}>
                <Field.TextField
                  name="name"
                  label={t('itemTypeSetting.name')}
                  placeholder={t('itemTypeSetting.name')}
                  disabled={isView}
                  required
                  labelWidth={180}
                />
              </Grid>
              <Grid item xs={12}>
                <Field.TextField
                  name="description"
                  label={t('itemTypeSetting.description')}
                  disabled={isView}
                  placeholder={t('itemTypeSetting.description')}
                  labelWidth={180}
                  multiline
                  rows={3}
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
                    <strong>{t('itemTypeSetting.user')}: </strong>{' '}
                    <span>{formatDateTimeUtc(values.user)}</span>
                  </label>
                </div>
                <div>
                  <label>
                    <strong>{t('itemTypeSetting.createDate')}: </strong>{' '}
                    <span>{formatDateTimeUtc(values.createdAt)}</span>
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

export default ItemTypeForm
