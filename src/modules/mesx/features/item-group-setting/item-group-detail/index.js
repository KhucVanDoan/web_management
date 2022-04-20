import React, { useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { ROUTE } from '~/modules/database/routes/config'
import useItemGroup from '~/modules/mesx/redux/hooks/useItemGroup'
import { formatDateTimeUtc } from '~/utils'

const ItemGroupDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['mesx'])
  const {
    data: { isLoading, itemGroupDetails },
    actions,
  } = useItemGroup()
  const { id } = useParams()

  useEffect(() => {
    actions.getItemGroupDetailsById(id)

    return () => {
      actions.resetItemGroupDetailsState()
    }
  }, [id])

  const breadcrumbs = [
    // {
    //   title: 'database',
    // },
    {
      route: ROUTE.ITEM_GROUP.LIST.PATH,
      title: ROUTE.ITEM_GROUP.LIST.TITLE,
    },
    {
      title: ROUTE.ITEM_GROUP.DETAIL.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.ITEM_GROUP.LIST.PATH)
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.itemGroupDetail')}
        loading={isLoading}
        onBack={backToList}
      >
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('itemGroupDefine.code')}
                  value={itemGroupDetails.code}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('itemGroupDefine.name')}
                  value={itemGroupDetails.name}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <LV
                  label={t('itemGroupDefine.creator')}
                  value={itemGroupDetails?.createdBy?.fullName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('itemGroupDefine.createDate')}
                  value={formatDateTimeUtc(itemGroupDetails.createdAt)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('itemGroupDefine.description')}
                  multiline
                  rows={3}
                  value={itemGroupDetails.description}
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
    </>
  )
}

export default ItemGroupDetail
