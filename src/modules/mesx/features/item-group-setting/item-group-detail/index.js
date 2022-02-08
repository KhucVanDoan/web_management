import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import Button from '~/components/Button'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useItemGroup from '~/modules/mesx/redux/hooks/useItemGroup'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

function ItemGroupDetail() {
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
    {
      title: 'database',
    },
    {
      route: ROUTE.ITEM_GROUP.DETAIL.PATH,
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
        <Grid container columnSpacing={4} rowSpacing={4 / 3}>
          <Grid item xs={6}>
            <Box display="flex">
              <Typography sx={{ color: 'subText.main' }} width={180}>
                {t('itemGroupDefine.code')}
              </Typography>
              <Typography>{itemGroupDetails.code}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <Typography sx={{ color: 'subText.main' }} width={180}>
                {t('itemGroupDefine.name')}
              </Typography>
              <Typography>{itemGroupDetails.name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <Typography sx={{ color: 'subText.main' }} width={180}>
                {t('itemGroupDefine.createDate')}
              </Typography>
              <Typography>
                {formatDateTimeUtc(itemGroupDetails.createdAt)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex">
              <Typography sx={{ color: 'subText.main' }} width={180}>
                {t('itemGroupDefine.updateDate')}
              </Typography>
              <Typography>
                {formatDateTimeUtc(itemGroupDetails.updatedAt)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label={t('itemGroupDefine.description')}
              multiline
              rows={3}
              labelWidth={180}
              value={itemGroupDetails.description}
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
      </Page>
    </>
  )
}

export default ItemGroupDetail
