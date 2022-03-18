import React, { useState, useEffect } from 'react'

import vi from '@fullcalendar/core/locales/vi'
// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { startOfMonth, endOfMonth, formatISO } from 'date-fns'
import { Formik, Form } from 'formik'
import { first, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { EVENT_TYPE_OPTIONS } from '~/modules/mesx/constants'
import useCalendar from '~/modules/mesx/redux/hooks/useCalendar'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { ROUTE } from '~/modules/mesx/routes/config'
import { useClasses } from '~/themes'

import { modalSchema } from './createEventSchema'
import PopupDetail from './popupDetail'
import style from './style'

const PlanCalendar = () => {
  const { t } = useTranslation(['mesx'])
  const breadcrumbs = [
    {
      title: ROUTE.PLAN.CALENDAR.TITLE,
      path: ROUTE.PLAN.CALENDAR.ROUTE,
    },
  ]
  const {
    actions,
    data: { factoryEvent, isLoading },
  } = useCalendar()

  const {
    actions: commonAction,
    data: {
      factoryList: { items: factories },
    },
  } = useCommonManagement()
  const classes = useClasses(style)

  const history = useHistory()
  const [from, setFrom] = useState(formatISO(startOfMonth(new Date())))
  const [to, setTo] = useState(formatISO(endOfMonth(new Date())))
  const [isOpenCreateEventModal, setIsOpenCreateEventModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [openDetail, setIsOpenDetail] = useState(false)
  const [dateSelected, setDateSelected] = useState(false)
  const [factoryId, setFactoryId] = useState()
  const [initialValues, setInitialValues] = useState({
    id: null,
    title: '',
    code: '',
    time: [],
    factoryIds: null,
    description: '',
  })
  const initialSearch = isEmpty(factories)
    ? { factoryId: null }
    : { factoryId: first(factories)?.id }

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

  useEffect(() => {
    const params = { isGetAll: 1 }
    commonAction.getFactories(params)
  }, [])

  // useEffect(() => {
  //   const factory = first(factories)?.id
  //   if (factory) {
  //     getListFactoryEvent(factory)
  //   }
  // }, [actions, from, to,])

  const getListFactoryEvent = (factoryId) => {
    actions.getListFactoryEvent({ from, to, factoryId })
  }

  const getListFactoryWorkingSchedule = (factoryId) => {
    actions.getListFactoryCalendar({ from, to, factoryId })
  }

  const events = factoryEvent?.map((item) => ({
    ...item,
    start: item.from,
    end: item.to,
    className:
      item.type === EVENT_TYPE_OPTIONS[1].id
        ? classes.workingDay
        : classes.holiday,
  }))

  const handleEventClick = (info) => {
    const event = info.event.extendedProps
    setIsUpdate(true)
    setInitialValues({
      id: +info.event.id,
      code: event.code,
      title: info.event.title,
      time: [event.from, event.to],
      type: event.type,
      factoryIds: event.factoryIds,
      description: event.description,
    })
    setIsOpenCreateEventModal(true)
  }

  const handleClickCreateEvent = () => {
    setIsUpdate(false)
    setInitialValues({
      id: null,
      title: '',
      code: '',
      time: [null, null],
      factoryIds: null,
      description: '',
    })
    setIsOpenCreateEventModal(true)
  }

  const handleChangeRange = (info) => {
    setFrom(formatISO(new Date(info.startStr)))
    setTo(formatISO(new Date(info.endStr)))
  }

  const onSubmit = (values) => {
    const params = {
      id: values?.id,
      code: values.code,
      title: values.title,
      type: values.type,
      factoryIds: values.factoryIds,
      description: values.description,
      from: values.time[0],
      to: values.time[1],
    }
    if (isUpdate) {
      actions.updateFactoryCalendar(params, getListFactoryEvent)
    } else {
      actions.createFactoryCalendar(params, getListFactoryEvent)
    }
    setIsOpenCreateEventModal(false)
  }

  const onResetForm = () => {
    setInitialValues({
      id: null,
      title: '',
      code: '',
      time: null,
      factoryIds: null,
      description: '',
    })
  }

  const onClose = () => {
    onResetForm()
    setIsOpenCreateEventModal(false)
  }

  const renderActionButtons = () => {
    return (
      <>
        <Button color="grayF4" sx={{ mr: 1 }} onClick={onClose}>
          {t('common.close')}
        </Button>
        <Button
          variant="outlined"
          color="subText"
          sx={{ mr: 1 }}
          onClick={onResetForm}
        >
          {t('common.cancel')}
        </Button>
        <Button type="submit">
          {isUpdate ? t('common.save') : t('common.create')}
        </Button>
      </>
    )
  }

  const handleSearch = (values) => {
    setFactoryId(values.factoryId)
    getListFactoryEvent(values.factoryId)
    getListFactoryWorkingSchedule(values.factoryId)
  }

  const handleDateClick = (info) => {
    if (factoryId) {
      setDateSelected(formatISO(info.date))
      setIsOpenDetail(true)
    }
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('planCalendar.title')}
      onSearch={() => {}}
      placeholder={t('planCalendar.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <Formik initialValues={initialSearch} onSubmit={handleSearch}>
        {() => (
          <Form>
            <Grid container rowSpacing={4 / 3}>
              <Grid item xs={12} display="flex">
                <Grid item xs={6} sx={{ mr: 3 }}>
                  <Field.Autocomplete
                    name="factoryId"
                    label={t('planCalendar.factory')}
                    placeholder={t('planCalendar.factory')}
                    options={factories}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                    sx={{ mb: 3 }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit">{t('common.filter')}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <FullCalendar
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today',
        }}
        locale={vi}
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
      <Dialog
        open={isOpenCreateEventModal}
        title={t('planCalendar.createEvent')}
        maxWidth="sm"
        noBorderBottom
        formikProps={{
          initialValues: initialValues,
          validationSchema: modalSchema(t),
          onSubmit,
        }}
      >
        <Grid>
          <Grid container rowSpacing={4 / 3} columnSpacing={4}>
            <Grid item xs={12}>
              <Field.TextField
                name="code"
                label={t('planCalendar.eventCode')}
                placeholder={t('planCalendar.eventCode')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Field.TextField
                name="title"
                label={t('planCalendar.eventName')}
                placeholder={t('planCalendar.eventName')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Field.Autocomplete
                name="type"
                label={t('planCalendar.eventType')}
                placeholder={t('planCalendar.eventType')}
                options={EVENT_TYPE_OPTIONS}
                getOptionValue={(opt) => opt?.id}
                getOptionLabel={(opt) => t(opt?.name)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Field.DateRangePicker
                name="time"
                label={t('planCalendar.eventTime')}
                placeholder={t('planCalendar.eventTime')}
                required
              />
            </Grid>
            {/* <Grid item xs={9} sx={{ ml: 15 }}>
              <Box display="flex" alignItems="center">
                <Field.TimePicker name={`timeFrom`} />
                <Box mx={1} display="flex" alignItems="center">
                  {t('workCenter.to')}
                </Box>
                <Field.TimePicker name={`timeTo`} />
              </Box>
            </Grid> */}
            <Grid item xs={12}>
              <Field.Autocomplete
                name="factoryIds"
                label={t('planCalendar.factory')}
                placeholder={t('planCalendar.factory')}
                options={factories}
                getOptionValue={(opt) => opt?.id}
                getOptionLabel={(opt) => opt?.name}
                multiple
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Field.TextField
                name="description"
                label={t('planCalendar.eventDescription')}
                placeholder={t('planCalendar.eventDescription')}
                multiline
                rows={5}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            {renderActionButtons()}
          </Box>
        </Grid>
      </Dialog>
      <PopupDetail
        open={openDetail}
        handleClose={() => setIsOpenDetail(false)}
        date={dateSelected}
        factoryId={factoryId}
      />
    </Page>
  )
}

export default PlanCalendar
