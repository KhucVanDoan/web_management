import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { BOQ_STATUS, BOQ_STATUS_MAP, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

import ItemsSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.DEFINE_BOQ.LIST.PATH,
    title: ROUTE.DEFINE_BOQ.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_BOQ.DETAIL.PATH,
    title: ROUTE.DEFINE_BOQ.DETAIL.TITLE,
  },
]

const BOQDetail = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { isLoading, boqDetails },
    actions,
  } = useDefineBOQ()

  const { status = -1 } = boqDetails

  useEffect(() => {
    actions.getBOQDetailsById(id)
    return () => {
      actions.resetBOQDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_BOQ.LIST.PATH)
  }

  const genColorButton = () => {
    switch (status) {
      case BOQ_STATUS.PENDING:
      case BOQ_STATUS.UPDATE:
      case BOQ_STATUS.CREATE:
      case BOQ_STATUS.COMPLETED:
        return 'primary'
      case BOQ_STATUS.REJECTED:
        return 'error'
      default:
        return 'text'
    }
  }

  const renderActionButtons = () => {
    switch (status) {
      case BOQ_STATUS.PENDING:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.close')}
            </Button>
            {/*@TODO ??? approvePermission
             {approvePermission && (
              <Button onClick={() => setIsOpenConfirmModal(true)}>
                {t('common.accept')}
              </Button>
            )} */}
          </>
        )
      case BOQ_STATUS.APPROVED:
        return (
          <Button color="grayF4" onClick={backToList}>
            {t('common.close')}
          </Button>
        )
      case BOQ_STATUS.REJECTED:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.close')}
            </Button>
            <Button variant="outlined" color="subText" onClick={resetForm}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.save')}</Button>
          </>
        )
      case BOQ_STATUS.CONFIRMED:
      case BOQ_STATUS.IN_PROGRESS:
      case BOQ_STATUS.COMPLETED:
      default:
        return (
          <Button color="grayF4" onClick={backToList}>
            {t('common.close')}
          </Button>
        )
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t(`menu.${ROUTE.DEFINE_BOQ.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {status >= 0 && (
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color={genColorButton()}
                  sx={{ display: 'flex', marginLeft: 'auto' }}
                >
                  {t(BOQ_STATUS_MAP[status])}
                </Button>
              </Grid>
            )}
            <Grid item xs={12} lg={6}>
              <LV label={t('defineBOQ.boqCode')} value={boqDetails.code} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.boqPm')}
                value={
                  boqDetails?.pm?.fullName
                    ? boqDetails?.pm?.fullName
                    : boqDetails?.pm?.username
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV label={t('defineBOQ.boqName')} value={boqDetails.name} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.boqApm')}
                value={
                  boqDetails?.apm?.fullName
                    ? boqDetails?.apm?.fullName
                    : boqDetails?.apm?.username
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.boqPlanFrom')}
                value={formatDateTimeUtc(boqDetails?.planFrom)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('defineBOQ.boqPlanTo')}
                value={formatDateTimeUtc(boqDetails?.planTo)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineBOQ.descriptionInput')}
                placeholder={t('defineBOQ.descriptionInput')}
                multiline
                readOnly
                rows={3}
                value={boqDetails.description}
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
      <Box sx={{ mt: 3 }}>
        <ItemsSettingTable
          items={boqDetails?.boqDetails || []}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
          '& button + button': {
            ml: 4 / 3,
          },
        }}
      >
        {renderActionButtons()}
      </Box>
    </Page>
  )
}

export default BOQDetail
