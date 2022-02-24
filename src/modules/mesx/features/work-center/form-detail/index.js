import React, { useEffect, useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Button, Grid, Tab } from '@mui/material'
import { Box } from '@mui/system'
import { cloneDeep, groupBy, isEmpty, max, uniq } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import {
  MODAL_MODE,
  WORK_CENTER_STATUS,
  WORK_CENTER_STATUS_MAP,
} from '~/common/constants'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useWorkCenter from '~/modules/mesx/redux/hooks/useWorkCenter'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

import BreakTimeTable from '../form/break-time'
import ShiftTable from '../form/work-center-shifts'

const FormDetail = () => {
  const history = useHistory()
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()
  const [tabValue, setTabValue] = useState('1')
  const mode = MODAL_MODE.DETAIL

  const [shifts, setShifts] = useState([
    {
      id: 0,
      shiftName: null,
      startAt: null,
      endAt: null,
      pricePerHour: '',
      priceUnit: '',
      breakTimes: [
        {
          from: null,
          to: null,
        },
      ],
    },
  ])
  const [breakTime, setBreakTime] = useState([{ id: 0 }])
  const {
    data: { isLoading, wcDetails },
    actions,
  } = useWorkCenter()

  const { status = -1 } = wcDetails

  useEffect(() => {
    actions.getWorkCenterDetailsById(id)
    return () => actions.resetWorkCenterDetailState()
  }, [id])

  useEffect(() => {
    getValueShifts()
  }, [wcDetails])

  const getValueShifts = () => {
    const cloneWorkCenterShifts = cloneDeep(wcDetails?.workCenterShifts)
    const cloneWorkCenterShiftsRelaxTimes = cloneDeep(
      wcDetails?.workCenterShiftRelaxTimes,
    )
    const breakTimes = []
    if (!isEmpty(cloneWorkCenterShiftsRelaxTimes)) {
      const relaxTimeGroupByShift = groupBy(
        cloneWorkCenterShiftsRelaxTimes,
        'workCenterShiftId',
      )
      const numberElementOfBreakTime = max(
        uniq(
          Object.values(relaxTimeGroupByShift).map(
            (relaxGroup) => relaxGroup.length,
          ),
        ),
      )
      for (let id = 0; id < numberElementOfBreakTime; id++) {
        breakTimes.push({
          id,
        })
      }
    }
    const data = cloneWorkCenterShifts?.map((e, index) => {
      return {
        id: index,
        shiftName: e.name,
        pricePerHour: e.pricePerHour,
        priceUnit: e.priceUnit,
        startAt: e.startAt,
        endAt: e.endAt,
        breakTimes: cloneWorkCenterShiftsRelaxTimes
          .filter((b) => b.workCenterShiftId === e.id)
          .map((a, ind) => ({
            id: ind,
            name: a.name,
            from: a.startAt,
            to: a.endAt,
          })),
      }
    })
    setShifts(data)
    setBreakTime(breakTimes)
  }

  const genColorButton = () => {
    switch (status) {
      case WORK_CENTER_STATUS.PENDING:
      case WORK_CENTER_STATUS.UPDATE:
      case WORK_CENTER_STATUS.CREATE:
      case WORK_CENTER_STATUS.COMPLETED:
        return 'primary'
      case WORK_CENTER_STATUS.REJECTED:
        return 'error'
      default:
        return 'text'
    }
  }

  const breadcrumbs = [
    {
      title: 'database',
    },
    {
      route: ROUTE.WORK_CENTER.DETAIL.PATH,
      title: ROUTE.WORK_CENTER.DETAIL.TITLE,
    },
  ]
  const backToList = () => {
    history.push(ROUTE.WORK_CENTER.LIST.PATH)
  }
  const handleChangeTabValue = (event, value) => {
    setTabValue(value)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.workCenterDetail')}
      loading={isLoading}
      onBack={backToList}
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
                  {t(WORK_CENTER_STATUS_MAP[status])}
                </Button>
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LV label={t('workCenter.code')} value={wcDetails.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV label={t('workCenter.name')} value={wcDetails.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenter.member')}
                value={wcDetails?.members
                  ?.map((member) => member.fullName || member.username)
                  .join(', ')}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenter.factoryName')}
                value={wcDetails?.factory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenter.leader')}
                value={wcDetails?.leader?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenter.producingStep')}
                value={wcDetails?.producingStep?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('workCenter.description')}
                multiline
                rows={3}
                value={wcDetails.description}
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

      <TabContext value={tabValue}>
        <TabList onChange={handleChangeTabValue} sx={{ mt: 3 }}>
          <Tab label={t('workCenter.detailInfo')} value="1" />
          <Tab label={t('workCenter.timeSetup')} value="2" />
        </TabList>

        <TabPanel value="1" sx={{ px: 0 }}>
          <Grid container columnSpacing={4} rowSpacing={4 / 3}>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenter.oeeGoal')}
                value={`${wcDetails?.oeeIndex}%`}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenter.workCapacity')}
                value={wcDetails?.productivityIndex}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenter.dateCreate')}
                value={formatDateTimeUtc(wcDetails?.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('workCenter.dateUpdate')}
                value={formatDateTimeUtc(wcDetails?.updatedAt)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value="2" sx={{ px: 0 }}>
          <Box sx={{ mt: 1 }}>
            <ShiftTable shifts={shifts} mode={mode} />
          </Box>
          <Box sx={{ mt: 3 }}>
            <BreakTimeTable
              shifts={shifts}
              mode={mode}
              breakTimes={breakTime}
            />
          </Box>
        </TabPanel>
      </TabContext>

      <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button onClick={backToList} color="grayF4">
          {t('common.close')}
        </Button>
      </Box>
    </Page>
  )
}
export default FormDetail
