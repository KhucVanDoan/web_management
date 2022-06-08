import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { DEFINE_TYPE_UNIT_OPTIONS } from '~/modules/wmsx/constants'
import useDefineTypeUnit from '~/modules/wmsx/redux/hooks/useDefineTypeUnit'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.TYPE_UNIT.LIST.PATH,
    title: ROUTE.TYPE_UNIT.LIST.TITLE,
  },
  {
    route: ROUTE.TYPE_UNIT.DETAIL.PATH,
    title: ROUTE.TYPE_UNIT.DETAIL.TITLE,
  },
]

const DefineTypeUnitDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, typeUnitsDetails },
    actions,
  } = useDefineTypeUnit()

  useEffect(() => {
    actions.getTypeUnitDetailsById(id)
    return () => {
      actions.resetTypeUnitState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.TYPE_UNIT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.typeUnitDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineTypeUnit.status')}
                value={
                  <Status
                    options={DEFINE_TYPE_UNIT_OPTIONS}
                    value={typeUnitsDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.code')}
                value={typeUnitsDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.name')}
                value={typeUnitsDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.createdAt')}
                value={convertUtcDateTimeToLocalTz(typeUnitsDetails.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.updatedAt')}
                value={convertUtcDateTimeToLocalTz(typeUnitsDetails.updatedAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.createdBy')}
                value={typeUnitsDetails?.createdByUser?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.updatedBy')}
                value={typeUnitsDetails?.latestEditedUser?.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineTypeUnit.description')}
                multiline
                rows={3}
                value={typeUnitsDetails.description}
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

export default DefineTypeUnitDetail
