import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useItemGroup from '~/modules/mesx/redux/hooks/useItemGroup'
import { ROUTE } from '~/modules/mesx/routes/config'
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
    {
      title: 'database',
    },
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
                  label={t('itemGroupDefine.createDate')}
                  value={formatDateTimeUtc(itemGroupDetails.createdAt)}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('itemGroupDefine.updateDate')}
                  value={formatDateTimeUtc(itemGroupDetails.updatedAt)}
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
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={backToList} color="grayF4">
                {t('common.close')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Page>
    </>
  )
}

export default ItemGroupDetail
