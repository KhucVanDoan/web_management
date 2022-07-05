import React, { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import {
  DEFAULT_UNITS_MAP,
  DEFINE_PACKAGE_STATUS_OPTIONS,
  WEIGHT_UNITS_MAP,
} from '~/modules/wmsx/constants'
import useDefinePackage from '~/modules/wmsx/redux/hooks/useDefinePackage'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'defineCategory',
  },
  {
    route: ROUTE.DEFINE_PACKAGE.LIST.PATH,
    title: ROUTE.DEFINE_PACKAGE.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_PACKAGE.DETAIL.PATH,
    title: ROUTE.DEFINE_PACKAGE.DETAIL.TITLE,
  },
]

const DefinePackageDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, packageDetails },
    actions,
  } = useDefinePackage()

  useEffect(() => {
    actions.getPackageDetailsById(id)
    return () => {
      actions.resetPackageDetailsState()
    }
  }, [id])

  const columns = [
    {
      field: 'productCode',
      headerName: t('definePackage.productCode'),
      renderCell: (params) => {
        return params.row.item?.code
      },
    },
    {
      field: 'productName',
      headerName: t('definePackage.productName'),
      renderCell: (params) => {
        return params.row.item?.name
      },
    },
    {
      field: 'productAmount',
      headerName: t('definePackage.productAmount'),
      renderCell: (params) => {
        return params.row.quantity
      },
    },
  ]

  const backToList = () => {
    history.push(ROUTE.DEFINE_PACKAGE.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.definePackageDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Tabs
            list={[t('definePackage.commonInfo'), t('definePackage.storage')]}
          >
            {/* Tab 1 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item xs={12}>
                  <LV
                    label={t('definePackage.status')}
                    value={
                      <Status
                        options={DEFINE_PACKAGE_STATUS_OPTIONS}
                        value={packageDetails?.status}
                      />
                    }
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('definePackage.code')}
                    value={packageDetails.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('definePackage.name')}
                    value={packageDetails.name}
                  />
                </Grid>

                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineDetail.createdAt')}
                    value={convertUtcDateTimeToLocalTz(
                      packageDetails.createdAt,
                    )}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineDetail.updatedAt')}
                    value={convertUtcDateTimeToLocalTz(
                      packageDetails.updatedAt,
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label={t('definePackage.description')}
                    multiline
                    rows={3}
                    value={packageDetails.description}
                    readOnly
                    sx={{
                      'label.MuiFormLabel-root': {
                        color: (theme) => theme.palette.subText.main,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" mt={1}>
                    {t('definePackage.productList')}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <DataTable
                  rows={packageDetails.packageItems}
                  columns={columns}
                  total={packageDetails.packageItems?.length}
                  striped={false}
                  hideSetting
                  hideFooter
                />
              </Box>
            </Box>

            {/* Tab 2 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('definePackage.long')}
                    value={
                      packageDetails?.long?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[packageDetails?.long?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('definePackage.height')}
                    value={
                      packageDetails?.height?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[packageDetails?.height?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('definePackage.width')}
                    value={
                      packageDetails?.width?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[packageDetails?.width?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('definePackage.weight')}
                    value={
                      packageDetails?.weight?.value +
                      ' ' +
                      t(WEIGHT_UNITS_MAP[packageDetails?.weight?.unit])
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Tabs>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefinePackageDetail
