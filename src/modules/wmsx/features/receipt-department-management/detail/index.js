import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useReceiptDepartmentManagement from '~/modules/wmsx/redux/hooks/useReceiptDepartmentManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.PATH,
    title: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.DETAIL.TITLE,
  },
]

function ReceiptDepartmentManagementDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, receiptDepartmentDetails },
    actions,
  } = useReceiptDepartmentManagement()

  useEffect(() => {
    actions.getReceiptDepartmentDetailsById(id)
    return () => {
      actions.resetReceiptDepartmentDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.RECEIPT_DEPARTMENT_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.receiptDepartmentManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('receiptDepartmentManagement.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={receiptDepartmentDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptDepartmentManagement.code')}
                value={receiptDepartmentDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptDepartmentManagement.name')}
                value={receiptDepartmentDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('receiptDepartmentManagement.type')}
                value={receiptDepartmentDetails?.type}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('receiptDepartmentManagement.description')}
                multiline
                rows={3}
                value={receiptDepartmentDetails?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default ReceiptDepartmentManagementDetail
