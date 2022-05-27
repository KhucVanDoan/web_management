import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { DEFINE_TYPE_UNIT_OPTIONS } from '~/modules/wmsx/constants'
import useDefineTypeService from '~/modules/wmsx/redux/hooks/useDefineTypeService'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: ROUTE.RENT_WAREHOUSE_COST_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.TYPE_SERVICE.LIST.PATH,
    title: ROUTE.TYPE_SERVICE.LIST.TITLE,
  },
  {
    route: ROUTE.TYPE_SERVICE.DETAILS.PATH,
    title: ROUTE.TYPE_SERVICE.DETAILS.TITLE,
  },
]

const DefineTypeServiceDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, typeServicesDetails },
    actions,
  } = useDefineTypeService()

  useEffect(() => {
    actions.getTypeServiceDetailsById(id)
    return () => {
      actions.resetTypeServiceState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.TYPE_SERVICE.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.typeServiceDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {!isNil(typeServicesDetails?.status) && (
              <Grid item xs={12}>
                <LV
                  label={t('defineTypeService.status')}
                  value={
                    <Status
                      options={DEFINE_TYPE_UNIT_OPTIONS}
                      value={typeServicesDetails?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeService.code')}
                value={typeServicesDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeService.name')}
                value={typeServicesDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.createdAt')}
                value={convertUtcDateTimeToLocalTz(
                  typeServicesDetails.createdAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.updatedAt')}
                value={convertUtcDateTimeToLocalTz(
                  typeServicesDetails.updatedAt,
                )}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.createdBy')}
                value={typeServicesDetails?.createdByUser?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineTypeUnit.updatedBy')}
                value={typeServicesDetails?.latestEditedUser?.username}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineTypeService.description')}
                multiline
                rows={3}
                value={typeServicesDetails.description}
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

export default DefineTypeServiceDetail
