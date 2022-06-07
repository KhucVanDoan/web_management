import { useEffect } from 'react'

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import { DEFINE_BILL_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useBill from '~/modules/wmsx/redux/hooks/useBill'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTableDetail from './item-setting-table'
const breadcrumbs = [
  {
    title: ROUTE.ORDER_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.DEFINE_BILL.LIST.PATH,
    title: ROUTE.DEFINE_BILL.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_BILL.DETAIL.PATH,
    title: ROUTE.DEFINE_BILL.DETAIL.TITLE,
  },
]
function DefineBillDetail() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const {
    data: { isLoading, billDetails },
    actions,
  } = useBill()

  useEffect(() => {
    actions.getBillDetailsById(id)
    return () => actions.resetBillState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_BILL.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.DEFINE_BILL.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(billDetails?.status) && (
              <Grid item xs={12}>
                <LabelValue
                  label={t('defineBill.status')}
                  value={
                    <Status
                      options={DEFINE_BILL_STATUS_OPTIONS}
                      value={billDetails?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineBill.code')}
                value={billDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineBill.name')}
                value={billDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineBill.type')}
                value={billDetails?.invoiceType?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('defineBill.currencyUnit')}
                value={billDetails?.currencyUnit?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label={t('defineBill.vatTax')}
                checked={Boolean(billDetails?.taxNo)}
                sx={{ pointerEvents: 'none' }}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label={t('defineBill.createQRCode')}
                checked={Boolean(billDetails?.isQr)}
                sx={{ pointerEvents: 'none' }}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <Typography component="span">
                {t('defineBill.vendor.title')}
              </Typography>
              <LabelValue
                label={t('defineBill.vendor.name')}
                value={billDetails?.vendor?.name}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.vendor.code')}
                value={billDetails?.vendor?.code}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.vendor.taxCode')}
                value={billDetails?.vendor?.taxNo}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.vendor.address')}
                value={billDetails?.vendor?.address}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.vendor.phone')}
                value={billDetails?.vendor?.phone}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.vendor.bankAccountNumber')}
                value={billDetails?.vendor?.bankAccount}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.vendor.bankName')}
                value={billDetails?.vendor?.bank}
                mt={4 / 3}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <Typography component="span">
                {t('defineBill.customer.title')}
              </Typography>
              <LabelValue
                label={t('defineBill.customer.name')}
                value={billDetails?.customer?.name}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.customer.taxCode')}
                value={billDetails?.customer?.taxCode}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.customer.address')}
                value={billDetails?.customer?.address}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.customer.phone')}
                value={billDetails?.customer?.phone}
                mt={4 / 3}
              />
              <LabelValue
                label={t('defineBill.customer.paymentMethod')}
                value={billDetails?.paymentType?.name}
                mt={4 / 3}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        {/* <ItemSettingTable isView={true} items={billDetails?.billDetails} /> */}
        <ItemSettingTableDetail
          isView={true}
          items={billDetails?.billDetails}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default DefineBillDetail
