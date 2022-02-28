/* eslint-disable import/order */
import React, { useState, useEffect } from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import Button from '~/components/Button'
import { useTranslation } from 'react-i18next'
import useCalendar from '~/modules/mesx/redux/hooks/useCalendar'
import { startOfMonth, endOfMonth, formatISO } from 'date-fns'
import Page from '~/components/Page'
import vi from '@fullcalendar/core/locales/vi'
import Dialog from '~/components/Dialog'
import { useHistory } from 'react-router-dom'
import { ROUTE } from '~/modules/mesx/routes/config'
import { Grid } from '@mui/material'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import Box from '@mui/material/Box'
import { Field } from '~/components/Formik'
import { EVENT_TYPE_OPTIONS } from '~/modules/mesx/constants'
import { modalSchema } from './modalSchema'
import { useClasses } from '~/themes'
import style from './style'
import { formatDateTimeUtc } from '~/utils'

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
    data: { factoryCalendar, isLoading },
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
  const [initialValues, setInitialValues] = useState({
    id: null,
    title: '',
    code: '',
    time: [],
    factoryIds: null,
    description: '',
  })

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.PLAN.CALENDAR.CREATE.PATH)}
          icon="add"
          sx={{ ml: '16px' }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  useEffect(() => {
    const params = { isGetAll: 1 }
    commonAction.getFactories(params)
  }, [])

  useEffect(() => {
    getListFactoryCalendar()
  }, [actions, from, to])

  const getListFactoryCalendar = () => {
    actions.getListFactoryCalendar({ from, to })
  }

  const events = factoryCalendar?.map((item) => ({
    ...item,
    start: formatDateTimeUtc(item.from, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    end: formatDateTimeUtc(item.to, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    rendering: 'background',
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

  const handleDateClick = (info) => {
    setIsUpdate(false)
    setInitialValues({
      id: null,
      title: '',
      code: '',
      time: [info.dateStr, info.dateStr],
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
      actions.updateFactoryCalendar(params, getListFactoryCalendar)
    } else {
      actions.createFactoryCalendar(params, getListFactoryCalendar)
    }
    setIsOpenCreateEventModal(false)
  }

  const onCancel = () => {
    setInitialValues({
      id: null,
      title: '',
      code: '',
      time: null,
      factoryIds: null,
      description: '',
    })
    setIsOpenCreateEventModal(false)
  }

  const renderActionButtons = (onCancel) => {
    return (
      <>
        <Button color="grayF4" sx={{ mr: 1 }} onClick={onCancel}>
          {t('common.close')}
        </Button>
        <Button
          variant="outlined"
          color="subText"
          sx={{ mr: 1 }}
          onClick={onCancel}
        >
          {t('common.cancel')}
        </Button>
        <Button type="submit">
          {isUpdate ? t('common.save') : t('common.create')}
        </Button>
      </>
    )
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
      <FullCalendar
        //setting view
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today',
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={700}
        //handle event display
        displayEventTime={false}
        eventDisplay="block"
        //event source
        events={events}
        //handle event
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        locale={vi}
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
        onCancel={onCancel}
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
            {renderActionButtons(onCancel)}
          </Box>
        </Grid>
      </Dialog>
    </Page>
  )
}

export default PlanCalendar
