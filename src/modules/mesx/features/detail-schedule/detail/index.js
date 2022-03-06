import { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import {
  DETAIL_SCHEDULE_STATUS,
  DETAIL_SCHEDULE_STATUS_MAP,
} from '~/modules/mesx/constants'
import { useDetailSchedule } from '~/modules/mesx/redux/hooks/useDetailSchedule'
import { useWorkOrder } from '~/modules/mesx/redux/hooks/useWorkOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

import ItemSettingTable from '../form/items-setting-table'
const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.DETAIL_SCHEDULE.LIST.PATH,
    title: ROUTE.DETAIL_SCHEDULE.LIST.TITLE,
  },
  {
    route: ROUTE.DETAIL_SCHEDULE.DETAIL.PATH,
    title: ROUTE.DETAIL_SCHEDULE.DETAIL.TITLE,
  },
]
const detailSchedule = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, detailScheduleDetails },
    actions,
  } = useDetailSchedule()
  const {
    data: { workOrderDetails },
    actions: workOder,
  } = useWorkOrder()
  const { status } = detailScheduleDetails

  const plan = detailScheduleDetails?.workOrderScheduleDetails?.map(
    (value, i) => ({
      ...value,
      index: i + 1,
    }),
  )
  useEffect(() => {
    actions.getDetailScheduleDetailsById(id)
    workOder.getWorkOrderDetailsById(id)
  }, [id])
  const backToList = () => {
    history.push(ROUTE.DETAIL_SCHEDULE.LIST.PATH)
  }
  const genColorButton = () => {
    switch (status) {
      case DETAIL_SCHEDULE_STATUS.PENDING:
      case DETAIL_SCHEDULE_STATUS.UPDATE:
      case DETAIL_SCHEDULE_STATUS.CREATE:
      case DETAIL_SCHEDULE_STATUS.COMPLETED:
        return 'primary'
      case DETAIL_SCHEDULE_STATUS.REJECTED:
        return 'error'
      default:
        return 'text'
    }
  }

  const renderActionButtons = () => {
    switch (status) {
      case DETAIL_SCHEDULE_STATUS.PENDING:
        return (
          <>
            <Button color="grayF4" onClick={backToList}>
              {t('common.close')}
            </Button>
          </>
        )
      case DETAIL_SCHEDULE_STATUS.APPROVED:
        return (
          <Button color="grayF4" onClick={backToList}>
            {t('common.close')}
          </Button>
        )
      case DETAIL_SCHEDULE_STATUS.REJECTED:
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
      case DETAIL_SCHEDULE_STATUS.CONFIRMED:
      case DETAIL_SCHEDULE_STATUS.IN_PROGRESS:
      case DETAIL_SCHEDULE_STATUS.COMPLETED:
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
      title={t(`menu.${ROUTE.DETAIL_SCHEDULE.DETAIL.TITLE}`)}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            {status >= 0 && (
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color={genColorButton()}
                  sx={{ display: 'flex', marginLeft: 'auto' }}
                >
                  {t(DETAIL_SCHEDULE_STATUS_MAP[status])}
                </Button>
              </Grid>
            )}
            <Grid item xs={12} lg={6}>
              <LV
                label={t('detailSchedule.code')}
                value={detailScheduleDetails?.id}
              />
            </Grid>
            <Grid item xs={12} lg={6}></Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('detailSchedule.woCode')}
                value={workOrderDetails?.code}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('detailSchedule.moCode')}
                value={workOrderDetails?.mo?.code}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('detailSchedule.itemName')}
                value={workOrderDetails?.moDetail?.itemName}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('detailSchedule.producingSteps')}
                value={workOrderDetails?.producingStep?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('detailSchedule.subItemName')}
                value={workOrderDetails?.bom?.itemName}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV label={t('detailSchedule.workPlan')}>
                <Typography>
                  {formatDateTimeUtc(workOrderDetails?.planFrom)} -> {` `}
                  {formatDateTimeUtc(workOrderDetails?.planTo)}
                </Typography>
              </LV>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('detailSchedule.descriptionInput')}
                placeholder={t('detailSchedule.descriptionInput')}
                multiline
                readOnly
                rows={3}
                value={workOrderDetails.description}
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
        <ItemSettingTable
          mode={MODAL_MODE.DETAIL}
          plans={plan}
          woQuantity={detailScheduleDetails?.quantity}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
          '& button + button': {
            marginLeft: 4 / 3,
          },
        }}
      >
        {renderActionButtons()}
      </Box>
    </Page>
  )
}

export default detailSchedule
