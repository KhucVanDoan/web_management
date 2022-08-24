import { useEffect } from 'react'

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { PRODUCING_STEP_OPTIONS } from '~/modules/mesx/constants'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const ProducingStepDetail = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const { refreshKey, clearRefreshKey } = useApp()

  const {
    data: { isLoading, details },
    actions,
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
      route: ROUTE.PRODUCING_STEP.DETAIL.PATH,
    },
  ]

  useEffect(() => {
    actions.getProducingStepDetailsById(id)
    return () => {
      actions.resetProducingStepState()
    }
  }, [id])

  useEffect(() => {
    if (refreshKey) {
      if (id === refreshKey.toString()) {
        actions.getProducingStepDetailsById(id)
      }

      clearRefreshKey()
    }
  }, [refreshKey, id])

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
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              <Grid item xs={12}>
                <LV
                  label={t('producingStep.status')}
                  value={
                    <Status
                      options={PRODUCING_STEP_OPTIONS}
                      value={details?.status}
                    />
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('producingStep.code')} value={details?.code} />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('producingStep.name')} value={details?.name} />
              </Grid>
              {/* <Grid item lg={6} xs={12}>
                <LV
                  label={t('producingStep.completeItems')}
                  value={details?.qcQuantityRule}
                />
              </Grid> */}
              <Grid item lg={6} xs={12}>
                <LV label={t('producingStep.switchMode')}>
                  <RadioGroup
                    value={String(details?.switchMode)}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label={t('producingStep.allItemComplete')}
                      sx={{ pointerEvents: 'none', mt: '-9px' }}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label={t('producingStep.someItemComplete')}
                      sx={{ pointerEvents: 'none' }}
                    />
                  </RadioGroup>
                </LV>
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV label={t('producingStep.timePerProduct')}>
                  <Typography component="span">
                    {Number(details?.productionTimePerItem)}
                  </Typography>{' '}
                  <Typography component="span">
                    {t('producingStep.unit.minutes')}
                  </Typography>
                </LV>
              </Grid>
              {details?.qcQuantityRule !== 0 && (
                <Grid item lg={6} xs={12}>
                  <LV label={t('producingStep.completeItems')}>
                    <Typography component="span">
                      {Number(details?.qcQuantityRule)}
                    </Typography>{' '}
                    <Typography component="span">
                      {t('producingStep.unit.persen')}
                    </Typography>
                  </LV>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box display="flex">
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="h5">
                        {t('producingStep.processQc')}
                      </Typography>
                    }
                    checked={
                      Boolean(details?.outputQc?.qcCriteriaId) ||
                      Boolean(details?.inputQc?.qcCriteriaId)
                    }
                    sx={{ pointerEvents: 'none' }}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={t('producingStep.inputQC')}
                  checked={Boolean(details?.inputQc?.qcCriteriaId)}
                  sx={{ pointerEvents: 'none' }}
                />
                <Box mt={1}>
                  <LV
                    label={t('producingStep.qcCriteria')}
                    value={details?.inputQc?.qcName}
                  />
                </Box>
                <Box mt={4 / 3}>
                  <LV
                    label={t('producingStep.timeQC')}
                    value={
                      <Box>
                        <Typography component="span">
                          {details?.inputQc?.itemPerMemberTime}
                        </Typography>{' '}
                        <Typography component="span">
                          {t('producingStep.unit.minutes')}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={t('producingStep.outputQC')}
                  checked={Boolean(details?.outputQc?.qcCriteriaId)}
                  sx={{ pointerEvents: 'none' }}
                />
                <Box mt={1}>
                  <LV
                    label={t('producingStep.qcCriteria')}
                    value={details?.outputQc?.qcName}
                  />
                </Box>
                <Box mt={4 / 3}>
                  <LV
                    label={t('producingStep.timeQC')}
                    value={
                      <Box>
                        <Typography component="span">
                          {details?.outputQc?.itemPerMemberTime}
                        </Typography>{' '}
                        <Typography component="span">
                          {t('producingStep.unit.minutes')}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('producingStep.creator')}
                  value={details?.createdBy?.fullName}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('producingStep.createdAt')}
                  value={convertUtcDateTimeToLocalTz(details?.createdAt)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('producingStep.description')}
                  multiline
                  value={details?.description}
                  rows={3}
                  readOnly
                  sx={{
                    'label.MuiFormLabel-root': {
                      color: (theme) => theme.palette.subText.main,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ActionBar onBack={backToList} />
      </Page>
    </>
  )
}

export default ProducingStepDetail
