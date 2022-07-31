import React, { useState, useEffect } from 'react'

import en from '@fullcalendar/core/locales/en-au'
import ja from '@fullcalendar/core/locales/ja'
import vi from '@fullcalendar/core/locales/vi'
// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import { Box, Grid } from '@mui/material'
import {
  startOfMonth,
  endOfMonth,
  formatISO,
  compareDesc,
  compareAsc,
  isEqual,
} from 'date-fns'
import { Formik, Form } from 'formik'
import { flatMap, isEmpty, isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { EVENT_TYPE_OPTIONS } from '~/modules/mesx/constants'
import useCalendar from '~/modules/mesx/redux/hooks/useCalendar'
import { ROUTE } from '~/modules/mesx/routes/config'
import { useClasses } from '~/themes'

import PopupCreateEvent from './event/popupCreateEvent'
import PopupDetail from './event/popupDetail'
import style from './style'

export const DAY_OF_WEEK = {
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
  SUN: 0,
}

const PlanCalendar = () => {
  const { t } = useTranslation(['mesx'])
  const lang = localStorage.getItem('language')
  let locale = vi
  switch (lang) {
    case 'jp':
      locale = ja
      break
    case 'en':
      locale = en
      break
    default:
      break
  }
  const breadcrumbs = [
    {
      title: ROUTE.PLAN.CALENDAR.TITLE,
      path: ROUTE.PLAN.CALENDAR.ROUTE,
    },
  ]
  const {
    actions,
    data: { factoryEvent, isLoading, factoryCalendar },
  } = useCalendar()

  const classes = useClasses(style)

  const history = useHistory()
  const [from, setFrom] = useState(formatISO(startOfMonth(new Date())))
  const [to, setTo] = useState(formatISO(endOfMonth(new Date())))
  const [isOpenCreateEventModal, setIsOpenCreateEventModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [openDetail, setIsOpenDetail] = useState(false)
  const [dateSelected, setDateSelected] = useState(false)
  const [factory, setFactory] = useState({})
  const [disableEdit, setDisableEdit] = useState(false)
  const [initialValues, setInitialValues] = useState({})

  const factoryId = factory?.id

  const renderHeaderRight = () => {
    return (
      <>
        <Button onClick={handleClickCreateEvent} icon="add" sx={{ mr: 4 / 3 }}>
          {t('planCalendar.createEvent')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.PLAN.CALENDAR.CREATE.PATH)}
          icon="add"
        >
          {t('planCalendar.createWorkingSchedule')}
        </Button>
      </>
    )
  }

  const getListFactoryEvent = () => {
    actions.getListFactoryEvent({ from, to, factoryId })
  }

  const getListFactoryWorkingSchedule = () => {
    actions.getListFactoryCalendar({ from, to, factoryId })
  }

  const events = factoryEvent?.map((item) => ({
    ...item,
    start: item.from,
    end: item.to,
    className:
      item.type === EVENT_TYPE_OPTIONS[1].id
        ? classes.eventWorkingDay
        : classes.eventHoliday,
  }))

  const handleEventClick = (info) => {
    const event = info.event.extendedProps
    setDisableEdit(false)
    if (
      compareDesc(new Date(), new Date(event.to)) === -1 ||
      compareDesc(new Date(), new Date(event.from)) === -1
    ) {
      setDisableEdit(true)
    }
    setIsUpdate(true)
    setInitialValues({
      id: +info.event.id,
      code: event.code,
      title: info.event.title,
      time: [event.from, event.to],
      type: event.type,
      factories: event.factories, // @TODO: need BE return an array of factories (instead of fatoryIds)
      description: event.description,
    })
    setIsOpenCreateEventModal(true)
  }

  const handleClickCreateEvent = () => {
    setIsUpdate(false)
    setDisableEdit(false)
    setInitialValues({
      id: null,
      title: '',
      code: '',
      type: '',
      time: null,
      factories: [],
      description: '',
    })
    setIsOpenCreateEventModal(true)
  }

  const handleChangeRange = (info) => {
    setFrom(formatISO(new Date(info.startStr)))
    setTo(formatISO(new Date(info.endStr)))
  }

  const onClose = () => {
    setIsOpenCreateEventModal(false)
  }

  const handleDateClick = (info) => {
    if (factoryId && !info.dayEl.className.includes(classes.holiday)) {
      setDateSelected(formatISO(info.date))
      setIsOpenDetail(true)
    }
  }

  const addClassToHoliDay = (dayClassName) => {
    const dayClassElems = Array.from(
      document.getElementsByClassName(dayClassName),
    )
    dayClassElems.forEach((dayElem) => {
      if (
        dayElem.getAttribute('role') === 'gridcell' &&
        (compareAsc(
          new Date(dayElem.getAttribute('data-date')),
          new Date(factoryCalendar.from),
        ) === 1 ||
          isEqual(
            new Date(dayElem.getAttribute('data-date')),
            new Date(factoryCalendar.from),
          )) &&
        (compareAsc(
          new Date(dayElem.getAttribute('data-date')),
          new Date(factoryCalendar.to),
        ) === -1 ||
          isEqual(
            new Date(dayElem.getAttribute('data-date')),
            new Date(factoryCalendar.to),
          ))
      )
        dayElem.classList.add(classes.holiday)
    })
  }

  useEffect(() => {
    if (factoryId) {
      getListFactoryEvent()
      getListFactoryWorkingSchedule()
    }
  }, [from, to, factoryId])

  useEffect(() => {
    if (!isNil(factoryCalendar) && !isEmpty(factoryCalendar)) {
      const workingDays = flatMap(factoryCalendar.factoryworkdays, 'workingDay')
      if (!workingDays.includes(DAY_OF_WEEK.MON))
        addClassToHoliDay('fc-day-mon')

      if (!workingDays.includes(DAY_OF_WEEK.TUE))
        addClassToHoliDay('fc-day-tue')

      if (!workingDays.includes(DAY_OF_WEEK.WED))
        addClassToHoliDay('fc-day-wed')

      if (!workingDays.includes(DAY_OF_WEEK.THU))
        addClassToHoliDay('fc-day-thu')

      if (!workingDays.includes(DAY_OF_WEEK.FRI))
        addClassToHoliDay('fc-day-fri')

      if (!workingDays.includes(DAY_OF_WEEK.SAT))
        addClassToHoliDay('fc-day-sat')

      if (!workingDays.includes(DAY_OF_WEEK.SUN))
        addClassToHoliDay('fc-day-sun')
    }
  }, [factoryCalendar])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.planCalendar')}
      onSearch={() => {}}
      placeholder={t('planCalendar.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <Formik initialValues={{ factory: null }}>
        {() => (
          <Form>
            <Grid container>
              <Grid item xl={5} lg={6} xs={12}>
                <Field.Autocomplete
                  name="factory"
                  label={t('planCalendar.factory')}
                  placeholder={t('planCalendar.factory')}
                  asyncRequest={(s) =>
                    searchFactoriesApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  getOptionLabel={(opt) => opt?.name}
                  required
                  labelWidth="auto"
                  onChange={(val) => setFactory(val)}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Box className={classes.fullCalendar} sx={{ mt: 3 }}>
        <FullCalendar
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'today',
          }}
          locale={locale}
          dayMaxEventRows={2}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height={700}
          moreLinkContent={(args) => {
            return '+' + args.num + ' Xem thêm'
          }}
          displayEventTime={false}
          eventDisplay="block"
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          datesSet={handleChangeRange}
        />
      </Box>
      <PopupCreateEvent
        open={isOpenCreateEventModal}
        isDetail={disableEdit}
        isUpdate={isUpdate}
        initialValues={initialValues}
        handleClose={onClose}
        getListFactoryEvent={getListFactoryEvent}
      />
      <PopupDetail
        open={openDetail}
        handleClose={() => setIsOpenDetail(false)}
        date={dateSelected}
        factory={factory}
      />
    </Page>
  )
}

export default PlanCalendar
