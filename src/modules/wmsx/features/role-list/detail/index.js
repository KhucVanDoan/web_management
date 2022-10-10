import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useRoleList from '~/modules/wmsx/redux/hooks/useRoleList'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.ROLE_LIST.LIST.PATH,
    title: ROUTE.ROLE_LIST.LIST.TITLE,
  },
  {
    route: ROUTE.ROLE_LIST.DETAIL.PATH,
    title: ROUTE.ROLE_LIST.DETAIL.TITLE,
  },
]

const DefineRoleDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, roleDetails },
    actions,
  } = useRoleList()

  useEffect(() => {
    actions.getRoleDetailsById(id)
    return () => {
      actions.resetRoleState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.ROLE_LIST.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.roleDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV label={t('roleList.code')} value={roleDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('roleList.name')} value={roleDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('roleList.createdAt')}
                value={convertUtcDateTimeToLocalTz(roleDetails.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('roleList.updatedAt')}
                value={convertUtcDateTimeToLocalTz(roleDetails.updatedAt)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('roleList.note')}
                multiline
                rows={3}
                value={roleDetails.description}
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

export default DefineRoleDetail
