import React, { useEffect } from 'react'

import { Box, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { SUPPLIES_STATUS_OPTION } from '~/modules/mmsx/constants'
import useDefineSupplies from '~/modules/mmsx/redux/hooks/useDefineSupplies'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'deviceManagement',
  },
  {
    route: ROUTE.DEFINE_SUPPLIES.LIST.PATH,
    title: ROUTE.DEFINE_SUPPLIES.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_SUPPLIES.DETAIL.PATH,
    title: ROUTE.DEFINE_SUPPLIES.DETAIL.TITLE,
  },
]

const DefineSuppliesDetail = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { suppliesDetail, isLoading },
    actions,
  } = useDefineSupplies()
  useEffect(() => {
    actions.getSupplies(id)
    return () => {
      actions.resetSupplies()
    }
  }, [id])
  const backToList = () => {
    history.push(ROUTE.DEFINE_SUPPLIES.LIST.PATH)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Box>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('supplies.button.device')}
          </Button>
          <Button variant="outlined" sx={{ ml: 4 / 3 }}>
            {t('supplies.button.suppliesCategory')}
          </Button>
        </Box>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.suppliesDetail')}
      onBack={backToList}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('deviceCategory.form.status')}
                value={
                  <Status
                    options={SUPPLIES_STATUS_OPTION}
                    value={suppliesDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('supplies.form.field.code')}
                value={suppliesDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('supplies.form.field.categoryId')}
                value={suppliesDetail?.supplyGroup?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('supplies.form.field.name')}
                value={suppliesDetail?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('supplies.form.field.type')}
                value={
                  <>
                    <RadioGroup
                      value={String(suppliesDetail?.type)}
                      name="radio-buttons-group"
                    >
                      <Box sx={{ display: 'flex' }}>
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label={t('general.supplies')}
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label={t('general.accessory')}
                          sx={{ ml: 2 }}
                        />
                      </Box>
                    </RadioGroup>
                  </>
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('supplies.category.supplier')} value={''} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('supplies.form.field.unit')}
                value={suppliesDetail?.itemUnit?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('supplies.form.field.dateAdded')}
                value={convertUtcDateToLocalTz(suppliesDetail?.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('supplies.form.field.price')}
                value={
                  suppliesDetail?.price
                    ? `${suppliesDetail?.price} ${t(
                        'common.suffix.denominations',
                      )}`
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('templateInstall.form.field.description')}
                multiline
                rows={3}
                value={''}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LV
                label={t('deviceCategory.responsibleUser')}
                value={suppliesDetail?.responsibleUser?.name}
              />
            </Grid>
          </Grid>

          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineSuppliesDetail
