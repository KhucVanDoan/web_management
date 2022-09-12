import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom'

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
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineVendor from '~/modules/wmsx/redux/hooks/useDefineVendor'
import { ROUTE } from '~/modules/wmsx/routes/config'
import qs from '~/utils/qs'

import defineVendorSchema from './schema'

const DefineVendorForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.DEFINE_VENDOR.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_VENDOR.EDIT.PATH]: MODAL_MODE.UPDATE,
  }

  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE
  const {
    data: { isLoading, vendorDetails },
    actions,
  } = useDefineVendor()
  const initialValues = {
    code: isUpdate ? vendorDetails?.code : '',
    name: vendorDetails?.name || '',
    phone: vendorDetails?.phone || '',
    email: vendorDetails?.email || '',
    fax: vendorDetails?.fax || '',
    address: vendorDetails?.address || '',
    vendorAbilities:
      vendorDetails?.vendorAbilities?.map((item) => ({
        deliveryTime: item?.deliveryTime,
        quantity: item?.quantity,
        itemId: {
          code: item?.item?.code,
          itemId: item?.item?.itemId,
          name: item?.item?.name,
          itemUnit: {
            name: item?.item?.itemUnit,
          },
        },
      })) || [],
    description: vendorDetails?.description || '',
  }
  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getVendorDetailsById(id)
    }
    if (cloneId) {
      actions.getVendorDetailsById(cloneId)
    }
    return () => actions.resetDetailVendorState()
  }, [mode, cloneId])

  const onSubmit = (values) => {
    const params = {
      code: values?.code,
      name: values?.name,
      phone: values?.phone,
      email: values?.email || null,
      fax: values?.fax,
      address: values?.address,
      vendorAbilities: values?.vendorAbilities?.map((item) => ({
        itemId: item?.itemId?.itemId || item?.itemId?.id,
        quantity: +item?.quantity,
        deliveryTime: +item?.deliveryTime,
      })),
      description: values?.description || '',
    }
    if (mode === MODAL_MODE.CREATE) {
      actions.createVendor(params, backToList)
    } else {
      actions.updateVendor({ ...params, id: Number(id) }, backToList)
    }
  }
  const getBreadcrumb = () => {
    const breadcrumbs = [
      {
        title: 'database',
      },
      {
        route: ROUTE.DEFINE_VENDOR.LIST.PATH,
        title: ROUTE.DEFINE_VENDOR.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_VENDOR.CREATE.PATH,
          title: ROUTE.DEFINE_VENDOR.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_VENDOR.EDIT.PATH,
          title: ROUTE.DEFINE_VENDOR.EDIT.TITLE,
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
        return ROUTE.DEFINE_VENDOR.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DEFINE_VENDOR.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_VENDOR.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.DEFINE_VENDOR.LIST.PATH)
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
        validationSchema={defineVendorSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => (
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
                      <LV
                        label={
                          <Typography>{t('defineVendor.status')}</Typography>
                        }
                        value={
                          <Status
                            options={ACTIVE_STATUS_OPTIONS}
                            value={vendorDetails?.status}
                          />
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineVendor.code')}
                      name="code"
                      placeholder={t('defineVendor.code')}
                      disabled={isUpdate}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineVendor.name')}
                      name="name"
                      placeholder={t('defineVendor.name')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineVendor.email')}
                      name="email"
                      placeholder={t('defineVendor.email')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineVendor.phone')}
                      name="phone"
                      placeholder={t('defineVendor.phone')}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineVendor.address')}
                      name="address"
                      placeholder={t('defineVendor.address')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.ADDRESS.MAX,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field.TextField
                      label={t('defineVendor.fax')}
                      name="fax"
                      placeholder={t('defineVendor.fax')}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('defineVendor.description')}
                      placeholder={t('defineVendor.description')}
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
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default DefineVendorForm
