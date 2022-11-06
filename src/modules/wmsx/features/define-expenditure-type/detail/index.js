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
import useDefineExpenditureType from '~/modules/wmsx/redux/hooks/useDefineExpenditureType'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.PATH,
    title: ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_EXPENDITURE_TYPE.DETAIL.PATH,
    title: ROUTE.DEFINE_EXPENDITURE_TYPE.DETAIL.TITLE,
  },
]

function DefineExpenditureTypeDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, expenditureTypeDetails },
    actions,
  } = useDefineExpenditureType()

  useEffect(() => {
    actions.getExpenditureTypeDetailsById(id)
    return () => {
      actions.resetExpenditureTypeDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_EXPENDITURE_TYPE.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineExpenditureTypeDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineExpenditureType.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={expenditureTypeDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineExpenditureType.code')}
                value={expenditureTypeDetails.code}
              />
            </Grid>
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('defineExpenditureType.source')}
                value={expenditureTypeDetails?.source?.name}
              />
            </Grid> */}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineExpenditureType.name')}
                value={expenditureTypeDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12} />
            {/* <Grid item lg={6} xs={12}>
              <LV
                label={t('defineExpenditureType.organizationPayment')}
                value={expenditureTypeDetails?.organizationPayment?.name}
              />
            </Grid> */}
            <Grid item lg={6} xs={12} />
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineExpenditureType.description')}
                multiline
                rows={3}
                value={expenditureTypeDetails.description}
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

export default DefineExpenditureTypeDetail
