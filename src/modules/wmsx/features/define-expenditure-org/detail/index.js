import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useDefineExpenditureOrg from '~/modules/wmsx/redux/hooks/useDefineExpenditureOrg'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.PATH,
    title: ROUTE.DEFINE_EXPENDITURE_ORG.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_EXPENDITURE_ORG.DETAIL.PATH,
    title: ROUTE.DEFINE_EXPENDITURE_ORG.DETAIL.TITLE,
  },
]

const DefineExpenditureOrgDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, expenditureOrgDetails },
    actions,
  } = useDefineExpenditureOrg()

  useEffect(() => {
    actions.getExpenditureOrgDetailsById(id)
    return () => {
      actions.resetExpenditureOrgDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_EXPENDITURE_ORG.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineExpenditureOrgDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineExpenditureOrg.code')}
                value={expenditureOrgDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineExpenditureOrg.name')}
                value={expenditureOrgDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineExpenditureOrg.email')}
                value={expenditureOrgDetails.email}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineExpenditureOrg.phone')}
                value={expenditureOrgDetails.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineExpenditureOrg.description')}
                multiline
                rows={3}
                value={expenditureOrgDetails.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default DefineExpenditureOrgDetail
