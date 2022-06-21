import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import useDefineVendor from '~/modules/wmsx/redux/hooks/useDefineVendor'
import { ROUTE } from '~/modules/wmsx/routes/config'

import SupperCapacity from '../capacity'
import TransactionVendor from '../transaction'

const breadcrumbs = [
  {
    title: 'productionInformationManagement',
  },
  {
    route: ROUTE.DEFINE_VENDEOR.LIST.PATH,
    title: ROUTE.DEFINE_VENDEOR.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_VENDEOR.DETAIL.PATH,
    title: ROUTE.DEFINE_VENDEOR.DETAIL.TITLE,
  },
]

const DefineVendorDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const mode = MODAL_MODE.DETAIL
  const {
    data: { isLoading, vendorDetails },
    actions,
  } = useDefineVendor()

  useEffect(() => {
    actions.getVendorDetailsById(id)
    return () => {
      actions.resetDetailVendorState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_VENDEOR.LIST.PATH)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_ITEM.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('defineVendor.updateStatusPayment')}
        </Button>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineVendorDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Tabs
            list={[
              t('defineVendor.commonInfo'),
              t('defineVendor.supplierCapacity'),
              t('defineVendor.transaction'),
            ]}
          >
            {/* tab 1 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineVendor.code')}
                    value={vendorDetails.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineVendor.name')}
                    value={vendorDetails.name}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineVendor.address')}
                    value={vendorDetails.address}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineVendor.phone')}
                    value={vendorDetails.phone}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV label={t('defineVendor.fax')} value={vendorDetails.fax} />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineVendor.email')}
                    value={vendorDetails.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label={t('defineVendor.description')}
                    multiline
                    rows={3}
                    value={vendorDetails.description}
                    readOnly
                    sx={{
                      'label.MuiFormLabel-root': {
                        color: (theme) => theme.palette.subText.main,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            {/* tab 2 */}
            <SupperCapacity
              mode={mode}
              vendorAbilities={vendorDetails?.vendorAbilities}
            />
            {/* tab 3 */}
            <TransactionVendor id={id} />
          </Tabs>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineVendorDetail
