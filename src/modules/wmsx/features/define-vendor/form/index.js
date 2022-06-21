import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { Form, Formik, FieldArray } from 'formik'
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
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import useDefineVendor from '~/modules/wmsx/redux/hooks/useDefineVendor'
import { ROUTE } from '~/modules/wmsx/routes/config'
import qs from '~/utils/qs'

import SupperCapacity from '../capacity'
import TransactionVendor from '../transaction'
import defineVendorSchema from './schema'

const DEFAULT_ITEM = [
  {
    id: '',
    itemCode: '',
    itemName: '',
    unit: '',
    quantityAverage: '',
    timeAverage: '',
  },
]
const DefineVendorForm = () => {
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()
  const location = useLocation()
  const { cloneId } = qs.parse(location.search)
  const { t } = useTranslation(['wmsx'])
  const MODE_MAP = {
    [ROUTE.DEFINE_VENDEOR.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.DEFINE_VENDEOR.EDIT.PATH]: MODAL_MODE.UPDATE,
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
      })) || DEFAULT_ITEM,
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
        deliveryTime: +item?.quantity,
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
        title: 'productionInformationManagement',
      },
      {
        route: ROUTE.DEFINE_VENDEOR.LIST.PATH,
        title: ROUTE.DEFINE_VENDEOR.LIST.TITLE,
      },
    ]
    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_VENDEOR.CREATE.PATH,
          title: ROUTE.DEFINE_VENDEOR.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumbs.push({
          route: ROUTE.DEFINE_VENDEOR.EDIT.PATH,
          title: ROUTE.DEFINE_VENDEOR.EDIT.TITLE,
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
        return ROUTE.DEFINE_VENDEOR.CREATE.TITLE
      case MODAL_MODE.DETAIL:
        return ROUTE.DEFINE_VENDEOR.DETAIL.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.DEFINE_VENDEOR.EDIT.TITLE
      default:
    }
  }
  const backToList = () => {
    history.push(ROUTE.DEFINE_VENDEOR.LIST.PATH)
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
        {({ handleReset, values, setFieldValue }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Tabs
                  list={[
                    t('defineVendor.commonInfo'),
                    t('defineVendor.supplierCapacity'),
                    t('defineVendor.transaction'),
                  ]}
                >
                  {/* {tab1} */}
                  <Box>
                    <Grid
                      container
                      columnSpacing={{ xl: 8, xs: 4 }}
                      rowSpacing={4 / 3}
                    >
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('defineVendor.code')}
                          name="code"
                          placeholder={t('defineVendor.code')}
                          disabled={isUpdate}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_4.MAX,
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
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Field.TextField
                          label={t('defineVendor.address')}
                          name="address"
                          placeholder={t('defineVendor.address')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
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
                          label={t('defineVendor.fax')}
                          name="fax"
                          placeholder={t('defineVendor.fax')}
                          inputProps={{
                            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                          }}
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
                  </Box>
                  {/* tab 2 */}
                  <Box>
                    <FieldArray
                      name="vendorAbilities"
                      render={(arrayHelpers) => (
                        <SupperCapacity
                          mode={mode}
                          vendorAbilities={values?.vendorAbilities || []}
                          arrayHelpers={arrayHelpers}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    />
                  </Box>

                  {/* tab 3 */}
                  <TransactionVendor id={id} />
                </Tabs>
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
