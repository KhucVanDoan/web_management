import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useItemType from '~/modules/mesx/redux/hooks/useItemType'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.ITEM_TYPE.LIST.PATH,
    title: ROUTE.ITEM_TYPE.LIST.TITLE,
  },
  {
    route: ROUTE.ITEM_TYPE.DETAIL.PATH,
    title: ROUTE.ITEM_TYPE.DETAIL.TITLE,
  },
]

const ItemTypeDetail = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, itemTypeDetails },
    actions,
  } = useItemType()

  useEffect(() => {
    actions.getItemTypeDetailsById(id)
    return () => {
      actions.resetItemTypeDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.ITEM_TYPE.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.itemTypeDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemTypeSetting.code')}
                value={itemTypeDetails.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemTypeSetting.name')}
                value={itemTypeDetails.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemTypeSetting.user')}
                value={itemTypeDetails.user}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('itemTypeSetting.createDate')}
                value={formatDateTimeUtc(itemTypeDetails.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('itemTypeSetting.description')}
                multiline
                rows={3}
                value={itemTypeDetails.description}
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

export default ItemTypeDetail
