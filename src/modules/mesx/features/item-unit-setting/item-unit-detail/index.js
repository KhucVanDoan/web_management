import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { ROUTE } from '~/modules/database/routes/config'
import useItemUnit from '~/modules/mesx/redux/hooks/useItemUnit'
import { convertUtcDateTimeToLocalTz } from '~/utils'

function ItemUnitDetail() {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const {
    data: { isLoading, itemUnitDetails },
    actions,
  } = useItemUnit()
  const breadcrumbs = [
    // {
    //   title: 'database',
    // },
    {
      route: ROUTE.ITEM_UNIT.LIST.PATH,
      title: ROUTE.ITEM_UNIT.LIST.TITLE,
    },
    {
      route: ROUTE.ITEM_UNIT.DETAIL.PATH,
      title: ROUTE.ITEM_UNIT.DETAIL.TITLE,
    },
  ]

  useEffect(() => {
    actions.getItemUnitDetailsById(id)
    return () => {
      actions.resetItemUnitDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.ITEM_UNIT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.itemUnitDetail')}
      loading={isLoading}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemUnitDefine.code')}
                value={itemUnitDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemUnitDefine.name')}
                value={itemUnitDetails?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemUnitDefine.creator')}
                value={itemUnitDetails?.createdBy?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemUnitDefine.createDate')}
                value={convertUtcDateTimeToLocalTz(itemUnitDetails.createdAt)}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex">
                <TextField
                  name="description"
                  label={t('itemUnitDefine.description')}
                  multiline
                  value={itemUnitDetails.description}
                  rows={3}
                  readOnly
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}
export default ItemUnitDetail
