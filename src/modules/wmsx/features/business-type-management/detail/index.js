import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useBusinessTypeManagement from '~/modules/wmsx/redux/hooks/useBusinessTypeManagement'
import { ROUTE } from '~/modules/wmsx/routes/config'

import DefaultFieldList from '../form/default-field-list'
import ItemsSettingTable from '../form/option-field-list'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.PATH,
    title: ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.TITLE,
  },
  {
    route: ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.PATH,
    title: ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.TITLE,
  },
]

function BusinessTypeManagementDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const routeMatch = useRouteMatch()
  const MODE_MAP = {
    [ROUTE.BUSINESS_TYPE_MANAGEMENT.DETAIL.PATH]: MODAL_MODE.DETAIL,
  }
  const mode = MODE_MAP[routeMatch.path]
  const {
    data: { isLoading, businessTypeDetails },
    actions,
  } = useBusinessTypeManagement()

  useEffect(() => {
    actions.getBusinessTypeDetailsById(id)
    return () => {
      actions.resetBusinessTypeDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.BUSINESS_TYPE_MANAGEMENT.LIST.PATH)
  }
  const itemDefault = businessTypeDetails?.bussinessTypeAttributes
    ?.filter((e) => e?.code !== null)
    ?.map((item) => ({
      id: item?.id,
      labelEBS: item?.ebsLabel,
      fieldName: item?.fieldName,
      required: item?.required,
      show: item?.isShow,
      type: '',
      code: item?.code,
      columnName: item?.columnName,
      tableName: item?.tableName,
    }))
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.businessTypeManagementDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('businessTypeManagement.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={businessTypeDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('businessTypeManagement.code')}
                value={businessTypeDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('businessTypeManagement.name')}
                value={businessTypeDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('businessTypeManagement.parentBusiness')}
                value={businessTypeDetails?.parentBusiness}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('businessTypeManagement.description')}
                multiline
                rows={3}
                value={businessTypeDetails?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Tabs
            list={[
              {
                label: t('businessTypeManagement.defaultFieldList'),
              },
              {
                label: t('businessTypeManagement.optionFieldList'),
              },
            ]}
            sx={{ mt: 3 }}
          >
            {/* Tab 1 */}
            <Box sx={{ mt: 3 }}>
              <DefaultFieldList itemDefault={itemDefault || []} mode={mode} />
            </Box>
            {/* Tab 2 */}
            <Box sx={{ mt: 3 }}>
              <ItemsSettingTable
                itemOption={
                  businessTypeDetails?.bussinessTypeAttributes?.filter(
                    (e) => e?.code === null,
                  ) || []
                }
                mode={mode}
              />
            </Box>
          </Tabs>

          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default BusinessTypeManagementDetail
