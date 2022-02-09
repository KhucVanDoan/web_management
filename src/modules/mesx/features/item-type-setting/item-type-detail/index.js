import React, { useEffect } from 'react'

import { Typography, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import Button from '~/components/Button'
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
      title={t('itemTypeSetting.itemTypeDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} sx={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12} display="flex">
              <Typography sx={{ color: 'subText.main' }} width={180}>
                {t('itemTypeSetting.code')}
              </Typography>
              <Typography>{itemTypeDetails.code}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography sx={{ color: 'subText.main' }} width={180}>
                {t('itemTypeSetting.name')}
              </Typography>
              <Typography>{itemTypeDetails.name}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography sx={{ color: 'subText.main' }} width={180}>
                {t('itemTypeSetting.user')}
              </Typography>
              <Typography>{itemTypeDetails.user}</Typography>
            </Grid>
            <Grid item lg={6} xs={12} display="flex">
              <Typography sx={{ color: 'subText.main' }} width={180}>
                {t('itemTypeSetting.createDate')}
              </Typography>
              <Typography>
                {formatDateTimeUtc(itemTypeDetails.createdAt)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('itemTypeSetting.description')}
                multiline
                rows={3}
                labelWidth={180}
                value={itemTypeDetails.description}
                inputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" onClick={backToList} color="grayF4">
              {t('common.close')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}

export default ItemTypeDetail
