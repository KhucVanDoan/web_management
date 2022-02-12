import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import Button from '~/components/Button'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useItemUnit from '~/modules/mesx/redux/hooks/useItemUnit'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

function ItemUnitDetail() {
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const history = useHistory()
  const {
    data: { isLoading, itemUnitDetails },
    actions,
  } = useItemUnit()
  const breadcrumbs = [
    {
      title: 'database',
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
        <Grid item xl={11} sx={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={6} xs={12}>
              <Box display="flex">
                <Typography sx={{ color: 'subText.main' }} width={180}>
                  {t('itemUnitDefine.code')}
                </Typography>
                <Typography>{itemUnitDetails.code}</Typography>
              </Box>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box display="flex">
                <Typography sx={{ color: 'subText.main' }} width={180}>
                  {t('itemUnitDefine.name')}
                </Typography>
                <Typography>{itemUnitDetails.name}</Typography>
              </Box>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box display="flex">
                <Typography sx={{ color: 'subText.main' }} width={180}>
                  {t('itemUnitDefine.createDate')}
                </Typography>
                <Typography>
                  {formatDateTimeUtc(itemUnitDetails.createdAt)}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box display="flex">
                <Typography sx={{ color: 'subText.main' }} width={180}>
                  {t('itemUnitDefine.updateDate')}
                </Typography>
                <Typography>
                  {formatDateTimeUtc(itemUnitDetails.updatedAt)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex">
                <TextField
                  name="description"
                  label={t('itemUnitDefine.description')}
                  multiline
                  value={itemUnitDetails.description}
                  rows={3}
                  labelWidth={180}
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
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button onClick={backToList} color="grayF4">
              {t('common.close')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Page>
  )
}
export default ItemUnitDetail
