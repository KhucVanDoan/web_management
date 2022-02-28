import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  GET_LIST_FACTORY_CALENDAR,
  getListFactoryCalendarFailed,
  getListFactoryCalendarSuccess,
  UPDATE_FACTORY_CALENDAR,
  updateFactoryCalendarFailed,
  updateFactoryCalendarSuccess,
  GET_DETAIL_FACTORY_CALENDAR,
  getDetailFactoryCalendarFailed,
  getDetailFactoryCalendarSuccess,
  CREATE_FACTORY_CALENDAR,
  createFactoryCalendarSuccess,
  createFactoryCalendarFailed,
} from '~/modules/mesx/redux/actions/calendar'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const getFactoryCalendarApi = (params) => {
  const uri = `/v1/plans/factory-calendars`
  return api.get(uri, params)
}

function* doGetListFactoryCalendar(action) {
  try {
    const response = yield call(getFactoryCalendarApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getListFactoryCalendarSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      yield put(getListFactoryCalendarFailed())
    }
  } catch (error) {
    yield put(getListFactoryCalendarFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export function* watchGetListFactoryCalendar() {
  yield takeLatest(GET_LIST_FACTORY_CALENDAR, doGetListFactoryCalendar)
}

const updateFactoryCalendarApi = (params) => {
  const uri = `/v1/plans/factory-calendars`
  return api.put(uri, params)
}

function* doUpdateFactoryCalendar(action) {
  try {
    const response = yield call(updateFactoryCalendarApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(updateFactoryCalendarSuccess(response?.data))
      if (action.onSuccess) {
        addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
        yield action.onSuccess()
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(updateFactoryCalendarFailed())
    }
  } catch (error) {
    addNotification(NOTIFICATION_TYPE.ERROR)
    yield put(updateFactoryCalendarFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export function* watchUpdateFactoryCalendar() {
  yield takeLatest(UPDATE_FACTORY_CALENDAR, doUpdateFactoryCalendar)
}

const getDetailFactoryCalendarApi = (params) => {
  const uri = `/v1/plans/factory-calendars/${params}`
  return api.get(uri)
}

function* doGetDetailFactoryCalendar(action) {
  try {
    const response = yield call(getDetailFactoryCalendarApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(getDetailFactoryCalendarSuccess(response?.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(getDetailFactoryCalendarFailed())
    }
  } catch (error) {
    addNotification(NOTIFICATION_TYPE.ERROR)
    yield put(getDetailFactoryCalendarFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export function* watchGetDetailFactoryCalendar() {
  yield takeLatest(GET_DETAIL_FACTORY_CALENDAR, doGetDetailFactoryCalendar)
}

const createFactoryCalendarApi = (params) => {
  const uri = `/v1/plans/factory-calendars`
  return api.post(uri, params)
}

function* doCreateFactoryCalendar(action) {
  try {
    const response = yield call(createFactoryCalendarApi, action?.payload)
    if (response?.statusCode === 200) {
      yield put(createFactoryCalendarSuccess(response?.data))
      if (action.onSuccess) {
        addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
        yield action.onSuccess()
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(createFactoryCalendarFailed())
    }
  } catch (error) {
    addNotification(NOTIFICATION_TYPE.ERROR)
    yield put(createFactoryCalendarFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export function* watchCreateFactoryCalendar() {
  yield takeLatest(CREATE_FACTORY_CALENDAR, doCreateFactoryCalendar)
}
