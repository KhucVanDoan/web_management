import { useEffect } from 'react'

import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { LOCATION_SETTING_TYPE } from '~/modules/wmsx/constants'
import useLocationSetting from '~/modules/wmsx/redux/hooks/useLocationSetting'
import { ROUTE } from '~/modules/wmsx/routes/config'

import ItemSettingTableDetail from '../item-setting-table'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_SETUP.TITLE,
  },
  {
    route: ROUTE.ESTABLISH_LOCATION.LIST.PATH,
    title: ROUTE.ESTABLISH_LOCATION.LIST.TITLE,
  },
  {
    route: ROUTE.ESTABLISH_LOCATION.DETAIL.PATH,
    title: ROUTE.ESTABLISH_LOCATION.DETAIL.TITLE,
  },
]

function EstablishLocationDetail() {
  const { id } = useParams()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const mode = MODAL_MODE.DETAIL
  const {
    data: { isLoading, locationSettingsDetails },
    actions,
  } = useLocationSetting()

  useEffect(() => {
    actions.getLocationSettingDetailsById(id)
    return () => actions.resetLocationSettingState()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.ESTABLISH_LOCATION.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.ESTABLISH_LOCATION.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('locationSetting.settingCode')}
                value={locationSettingsDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label={t('locationSetting.cantBeSeparated')}
                checked={
                  locationSettingsDetails?.type === LOCATION_SETTING_TYPE.EVEN
                }
                sx={{ pointerEvents: 'none' }}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('locationSetting.settingName')}
                value={locationSettingsDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('locationSetting.target')}
                value={locationSettingsDetails?.items
                  ?.map((w) => w?.name)
                  .join('; ')}
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextField
                name="description"
                label={t('locationSetting.description')}
                multiline
                rows={3}
                value={locationSettingsDetails?.description}
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
      <Box sx={{ mt: 3 }}>
        <ItemSettingTableDetail
          mode={mode}
          items={locationSettingsDetails?.itemLocations}
        />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}

export default EstablishLocationDetail
