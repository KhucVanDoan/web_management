import React, { useEffect, useState } from 'react'

import { Box, FormLabel, Grid, IconButton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Formik, Form } from 'formik'
import { HexColorPicker } from 'react-colorful'
import { useTranslation } from 'react-i18next'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import useCompanyCustomerSetting from '~/modules/configuration/redux/hooks/useCompanyCustomerSetting'
import { ROUTE } from '~/modules/configuration/routes/config'
import { useClasses } from '~/themes'

import { validationSchema } from './schema'
import style from './style'

const breadcrumbs = [
  {
    route: ROUTE.COMPANY_CUSTOMER_SETTING.PATH,
    title: ROUTE.COMPANY_CUSTOMER_SETTING.TITLE,
  },
]

function CompanyCustomerSetting() {
  const { t } = useTranslation(['configuration'])
  const theme = useTheme()
  const classes = useClasses(style)
  const {
    data: { companyCustomerSettingDetail, isLoading },
    actions,
  } = useCompanyCustomerSetting()

  useEffect(() => {
    actions.getCompanyCustomerSettingDetails()
  }, [])

  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [color, setColor] = useState('')
  const [openPreviewImage, setOpenPreviewImage] = useState(false)
  const [openColorModal, setOpenColorModal] = useState(false)

  const initialValues = {
    name: companyCustomerSettingDetail?.name || '',
    email: companyCustomerSettingDetail?.email || '',
    phone: companyCustomerSettingDetail?.phone || '',
    address: companyCustomerSettingDetail?.address || '',
    color: companyCustomerSettingDetail?.color || '',
    logo: companyCustomerSettingDetail?.logo || '',
  }

  const onSubmit = (values) => {
    const convertValues = {
      ...values,
      logo: imageUrl,
      color: color,
    }
    actions.updateCompanyCustomerSetting(convertValues, () => {
      window.location.reload()
    })
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleClearImg = () => {
    setSelectedImage(null)
    setImageUrl(null)
    document.getElementById('select-image').value = ''
  }

  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onCancel={() => {
          handleReset()
          setColor('')
          setImageUrl(null)
          setSelectedImage(null)
        }}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  useEffect(() => {
    if (selectedImage) {
      toBase64(selectedImage).then((data) => {
        setImageUrl(data)
      })
    }
  }, [selectedImage])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.companyCustomerSetting')}
      onSearch={() => {}}
      placeholder={t('companyCustomerSetting.searchPlaceholder')}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema(t)}
        enableReinitialize
      >
        {({ handleReset, values }) => (
          <Form>
            <Grid container justifyContent="center" sx={{ mb: 3 }}>
              <Grid item xl={6} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 4, xs: 4 }}
                >
                  <Grid item lg={12} xs={12}>
                    <Field.TextField
                      name="name"
                      label={t('companyCustomerSetting.nameCustomer')}
                      placeholder={t('companyCustomerSetting.nameCustomer')}
                      labelWidth={160}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <LabelValue
                      label={
                        <FormLabel
                          required
                          sx={{
                            display: 'flex',
                          }}
                        >
                          <Typography color={'text.main'}>
                            {t('companyCustomerSetting.logo')}
                          </Typography>
                        </FormLabel>
                      }
                    >
                      <label htmlFor="select-image">
                        <Box
                          className={classes.imageBox}
                          sx={{
                            cursor: 'pointer',
                            display:
                              imageUrl && selectedImage ? 'none' : 'flex',
                          }}
                        >
                          Upload
                        </Box>
                      </label>
                      {imageUrl && selectedImage && (
                        <Box
                          className={classes.imageBox}
                          sx={{
                            display: 'flex',
                            position: 'relative',
                            '&:hover': {
                              div: {
                                opacity: 0.7,
                                background: theme.palette.text.main,
                              },
                            },
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt={selectedImage.name}
                            style={{ objectFit: 'contain' }}
                            height={86}
                            width={86}
                          />
                          <Box className={classes.imageIcon}>
                            <IconButton
                              onClick={() => {
                                setOpenPreviewImage(true)
                              }}
                            >
                              <Icon
                                name="visible"
                                fill={theme.palette.primary.contrastText}
                              />
                            </IconButton>
                            <IconButton onClick={handleClearImg}>
                              <Icon
                                name="delete"
                                fill={theme.palette.primary.contrastText}
                              />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </LabelValue>
                    <input
                      accept="image/*"
                      type="file"
                      id="select-image"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        setSelectedImage(e.target.files[0])
                      }}
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <LabelValue
                      label={
                        <FormLabel
                          required
                          sx={{
                            display: 'flex',
                          }}
                        >
                          <Typography color={'text.main'}>
                            {t('companyCustomerSetting.colorBrand')}
                          </Typography>
                        </FormLabel>
                      }
                    >
                      <Box
                        sx={{
                          backgroundColor: color || values?.color,
                          border: '1px solid #edf0f4',
                          width: 32,
                          height: 32,
                          borderRadius: 3,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setOpenColorModal(true)
                        }}
                      />
                    </LabelValue>
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.TextField
                      name="email"
                      label={t('companyCustomerSetting.email')}
                      placeholder={t('companyCustomerSetting.email')}
                      labelWidth={160}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.EMAIL.MAX,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.TextField
                      name="phone"
                      label={t('companyCustomerSetting.phoneNumber')}
                      placeholder={t('companyCustomerSetting.phoneNumber')}
                      labelWidth={160}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
                      }}
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Field.TextField
                      name="address"
                      label={t('companyCustomerSetting.address')}
                      placeholder={t('companyCustomerSetting.address')}
                      labelWidth={160}
                      inputProps={{
                        maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                      }}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {renderActionBar(handleReset)}
            <Dialog
              open={openPreviewImage}
              title={t(selectedImage?.name)}
              onCancel={() => setOpenPreviewImage(false)}
              noBorderBottom
            >
              <img
                src={imageUrl || values.logo}
                alt={selectedImage?.name}
                style={{ width: '100%' }}
              />
            </Dialog>
          </Form>
        )}
      </Formik>
      <Dialog
        title={'Color'}
        open={openColorModal}
        onCancel={() => setOpenColorModal(false)}
        noBorderBottom
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <HexColorPicker color={color} onChange={(val) => setColor(val)} />
          <Typography>{color}</Typography>
        </Box>
      </Dialog>
    </Page>
  )
}

export default CompanyCustomerSetting
