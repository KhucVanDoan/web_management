import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import { ROUTE } from '~/modules/mesx/routes/config'

const ProducingStepDetail = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const {
    data: { isLoading },
  } = useProducingStep()
  const breadcrumbs = [
    {
      title: 'producingInfo',
    },
    {
      route: ROUTE.PRODUCING_STEP.LIST.PATH,
      title: ROUTE.PRODUCING_STEP.LIST.TITLE,
    },
    {
      title: ROUTE.PRODUCING_STEP.DETAIL.TITLE,
    },
  ]

  const backToList = () => {
    history.push(ROUTE.PRODUCING_STEP.LIST.PATH)
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.producingStepDetail')}
        loading={isLoading}
        onBack={backToList}
      >
        <Grid container justifyContent="center">
          <Grid item xl={11} sx={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item lg={6} xs={12}>
                <Box display="flex">
                  <Typography variant="body2" width={180}>
                    {t('itemGroupDefine.code')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box display="flex">
                  <Typography variant="body2" width={180}>
                    {t('itemGroupDefine.name')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box display="flex">
                  <Typography variant="body2" width={180}>
                    {t('itemGroupDefine.createDate')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box display="flex">
                  <Typography variant="body2" width={180}>
                    {t('itemGroupDefine.updateDate')}
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
                  // value={itemGroupDetails.description}
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

export default ProducingStepDetail
