import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { SUPPLIES_STATUS_OPTION } from '~/modules/mmsx/constants'
import useManagementUnit from '~/modules/wmsx/redux/hooks/useManagementUnit'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.UNIT_MANAGEMENT.LIST.PATH,
    title: ROUTE.UNIT_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.UNIT_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.UNIT_MANAGEMENT.DETAIL.TITLE,
  },
]

const ManagementDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { detailManagementUnit, isLoading },
    actions,
  } = useManagementUnit()
  useEffect(() => {
    actions.getDetailManagementUnitById(id)
    return () => {
      actions?.resetManagementUnitState()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.UNIT_MANAGEMENT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.mansgementUnitDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('managementUnit.status')}
                value={
                  <Status
                    options={SUPPLIES_STATUS_OPTION}
                    value={detailManagementUnit?.staus}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('managementUnit.code')}
                value={detailManagementUnit?.code}
              />
            </Grid>

            <Grid item lg={6} xs={12}>
              <LV
                label={t('managementUnit.name')}
                value={detailManagementUnit?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('managementUnit.description')}
                multiline
                rows={3}
                value={detailManagementUnit?.description}
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

export default ManagementDetail
