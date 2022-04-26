import React, { useEffect } from 'react'

import {
  Grid,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  QUALITY_POINT_STATUS,
  STAGE_OPTION,
  STAGE_OPTION_MAP,
  PRE_STAGE_PRODUCT_TYPE,
  MATERIAL_TYPE,
  FOMALITY_QC_OPTION,
  NUMBER_OF_TIMES_QC_OPTION,
  STAGE_OPTION_PRODUCTION,
} from '~/modules/qmsx/constants'
import useCommonManagement from '~/modules/qmsx/redux/hooks/useCommonManagement'
import useDefineQualityPoint from '~/modules/qmsx/redux/hooks/useDefineQualityPoint'
import { ROUTE } from '~/modules/qmsx/routes/config'

const breadcrumbs = [
  {
    title: 'qualityControl',
  },
  {
    route: ROUTE.DEFINE_QUALITY_POINT.LIST.PATH,
    title: ROUTE.DEFINE_QUALITY_POINT.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_QUALITY_POINT.DETAIL.PATH,
    title: ROUTE.DEFINE_QUALITY_POINT.DETAIL.TITLE,
  },
]

function DefineQualityPointDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, qualityPointDetail },
    actions,
  } = useDefineQualityPoint()

  const {
    data: { userList, checkListConfirmedList },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    const params = {
      id: id,
    }
    actions.getQualityPointDetailById(params, _, backToList)
    const payload = {
      isGetAll: 1,
    }
    commonManagementActions.getAllCheckList(payload)
    commonManagementActions.getUsers(payload)
    return () => {
      actions.resetQualityPointDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_QUALITY_POINT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineQualityPointDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item lg={12} xs={12}>
              <LV
                label={t('defineQualityPoint.status')}
                value={
                  <Status
                    options={QUALITY_POINT_STATUS}
                    value={+qualityPointDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityPoint.code')}
                value={qualityPointDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityPoint.name')}
                value={qualityPointDetail?.name}
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <LV
                label={t('defineQualityPoint.stageQC')}
                value={t(STAGE_OPTION_MAP[+qualityPointDetail?.stage])}
              />
            </Grid>
            {+qualityPointDetail?.stage === +STAGE_OPTION.PRODUCTION_INPUT && (
              <Grid item lg={12} xs={12}>
                <LV label={t('defineQualityPoint.typeProduct')}>
                  <Grid item xs={12} alignItems="center">
                    <FormControlLabel
                      control={<Checkbox />}
                      checked={
                        qualityPointDetail?.productPrevious ===
                        PRE_STAGE_PRODUCT_TYPE.CHECKED
                      }
                      sx={{ pointerEvents: 'none', mt: '-9px' }}
                      label={t('defineQualityPoint.productPrevious')}
                    />
                  </Grid>
                  <Grid item xs={12} alignItems="center">
                    <FormControlLabel
                      control={<Checkbox />}
                      checked={
                        qualityPointDetail?.material === MATERIAL_TYPE.CHECKED
                      }
                      sx={{ pointerEvents: 'none' }}
                      label={t('defineQualityPoint.material')}
                    />
                  </Grid>
                </LV>
              </Grid>
            )}
            {!STAGE_OPTION_PRODUCTION.includes(+qualityPointDetail?.stage) && (
              <>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineQualityPoint.productCode')}
                    value={qualityPointDetail?.item?.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineQualityPoint.productName')}
                    value={qualityPointDetail?.item?.name}
                  />
                </Grid>
              </>
            )}
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityPoint.userQC1st')}
                value={userList
                  ?.filter((el) =>
                    qualityPointDetail?.qualityPointUser1s?.some(
                      (x) => x?.userId === el?.id,
                    ),
                  )
                  ?.map((x) => x?.username)
                  ?.join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineQualityPoint.checkList')}
                value={
                  checkListConfirmedList.find(
                    (x) => x?.id === qualityPointDetail?.checkListId,
                  )?.name
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ my: 2 }}
          >
            <Grid item lg={6} xs={12}>
              <LV label={t('defineQualityPoint.formalityQC')}>
                <RadioGroup
                  value={String(qualityPointDetail?.formality)}
                  name="radio-buttons-group-formality"
                >
                  <FormControlLabel
                    value={FOMALITY_QC_OPTION.TOTALITY}
                    control={<Radio />}
                    label={t('defineQualityPoint.formalityOptionText.totality')}
                    sx={{ pointerEvents: 'none', mt: '-9px' }}
                  />
                  <FormControlLabel
                    value={FOMALITY_QC_OPTION.RANDOM}
                    control={<Radio />}
                    label={t('defineQualityPoint.formalityOptionText.random')}
                    sx={{ pointerEvents: 'none' }}
                  />
                </RadioGroup>
              </LV>
            </Grid>
            <Grid item lg={6} xs={12}>
              {+qualityPointDetail?.formality ===
                +FOMALITY_QC_OPTION.RANDOM && (
                <Grid item lg={6} xs={12} sx={{ mb: 5 / 3 }}>
                  <LV
                    label={t('defineQualityPoint.quantityQC')}
                    value={`${qualityPointDetail?.quantity} %`}
                  />
                </Grid>
              )}
              {+qualityPointDetail?.formality ===
                +FOMALITY_QC_OPTION.RANDOM && (
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineQualityPoint.errorAcceptanceRate')}
                    value={`${qualityPointDetail?.errorAcceptanceRate} %`}
                  />
                </Grid>
              )}
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('defineQualityPoint.numberOfTimeQC')}>
                <RadioGroup
                  value={String(qualityPointDetail?.numberOfTime)}
                  name="radio-buttons-group-number-of-time"
                >
                  <FormControlLabel
                    value={NUMBER_OF_TIMES_QC_OPTION.ONE_TIMES}
                    control={<Radio />}
                    label={t(
                      'defineQualityPoint.numberOfTimeOptionText.oneTimes',
                    )}
                    sx={{ pointerEvents: 'none', mt: '-9px' }}
                  />
                  <FormControlLabel
                    value={NUMBER_OF_TIMES_QC_OPTION.TWO_TIMES}
                    control={<Radio />}
                    label={t(
                      'defineQualityPoint.numberOfTimeOptionText.twoTimes',
                    )}
                    sx={{ pointerEvents: 'none' }}
                  />
                </RadioGroup>
              </LV>
            </Grid>
            {+qualityPointDetail?.numberOfTime ===
              +NUMBER_OF_TIMES_QC_OPTION.TWO_TIMES && (
              <Grid item lg={6} xs={12}>
                <LV
                  label={t('defineQualityPoint.userQC2nd')}
                  value={userList
                    ?.filter((el) =>
                      qualityPointDetail?.qualityPointUser2s?.some(
                        (x) => x?.userId === el?.id,
                      ),
                    )
                    ?.map((x) => x?.username)
                    ?.join(', ')}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineQualityPoint.description')}
                multiline
                rows={3}
                value={qualityPointDetail?.description}
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

export default DefineQualityPointDetail
