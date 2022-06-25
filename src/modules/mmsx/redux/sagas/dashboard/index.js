import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSummarySuccess,
  getSummaryFailed,
  MMSX_GET_SUMMARY,
  getMaintainanceJobSuccess,
  getMaintainanceJobFailed,
  MMSX_GET_MAINTAINANCE,
  MMSX_GET_DEVICE_STATUS,
  getDeviceStatusJobFailed,
  getDeviceStatusSuccess,
  getDeviceErrorFailed,
  getDeviceErrorSuccess,
  MMSX_GET_DEVICE_ERROR,
  MMSX_GET_REQUEST_STATUS,
  getRequestSttSuccess,
  getRequestSttFailed,
  MMSX_GET_MTT_STATS,
  getMttStatusFailed,
  getMttStatusSuccess,
  getDeviceUsingStatusSuccess,
  getDeviceUsingStatusFailed,
  MMSX_GET_DEVICE_USING_STATUS,
} from '~/modules/mmsx/redux/actions/dashboard'
import { api } from '~/services/api'

const getSummary = (params) => {
  const url = `/v1/mms/report-total-job`
  return api.get(url, params)
}

const getMaintainanceJob = (params) => {
  const url = `/v1/mms/report-progress-job`
  return api.get(url, params)
}

const getDeviceSatus = (params) => {
  const url = `v1/mms/dashboards/device-assignments/status`
  return api.get(url, params)
}

const getDeviceErr = (params) => {
  const url = `v1/mms/dashboard/warning`
  return api.get(url, params)
}

const getRequestSttUrl = (params) => {
  const url = `v1/mms/report-maintain-request`
  return api.get(url, params)
}

const getMttStatus = (params) => {
  const url = `v1/mms/dashboard/mttr-mtta-index`
  return api.get(url, params)
}

const callApiGetDeviceUsingStatus = (params) => {
  const url = `v1/mms/dashboard/device-status`
  return api.get(url, params)
}

// Summary
function* doGetSummary(action) {
  try {
    const response = yield call(getSummary, action.payload)
    if (response.statusCode === 200) {
      yield put(getSummarySuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getSummaryFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

// maintainance job status
function* doGetMaintainanceJob(action) {
  try {
    const response = yield call(getMaintainanceJob, action.payload)
    if (response.statusCode === 200) {
      yield put(getMaintainanceJobSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getMaintainanceJobFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

// device status
function* doGetDeviceStatus(action) {
  try {
    const response = yield call(getDeviceSatus, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceStatusSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getDeviceStatusJobFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

// device err
function* doGetDeviceErr(action) {
  try {
    const response = yield call(getDeviceErr, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceErrorSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getDeviceErrorFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}
// request stt
function* doGetRequestStt(action) {
  try {
    const response = yield call(getRequestSttUrl, action.payload)
    if (response.statusCode === 200) {
      yield put(getRequestSttSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        // addNotification(
        //   response?.message || response?.statusText,
        //   NOTIFICATION_TYPE.ERROR,
        // )
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getRequestSttFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

// mtt stats
function* dogetMttStatus(action) {
  try {
    const response = yield call(getMttStatus, action.payload)
    if (response.statusCode === 200) {
      yield put(getMttStatusSuccess(response?.data))
      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      } else {
        throw new Error(response?.message)
      }
    }
  } catch (error) {
    yield put(getMttStatusFailed())
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetDeviceUsingStatus(action) {
  try {
    const response = yield call(callApiGetDeviceUsingStatus, action.payload)
    if (response.statusCode === 200) {
      yield put(getDeviceUsingStatusSuccess(response?.data))
      if (action.onSuccess) yield action.onSuccess(response?.data)
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getDeviceUsingStatusFailed())
    if (action.onError) yield action.onError()
  }
}

export default function* watchGetSummary() {
  yield takeLatest(MMSX_GET_SUMMARY, doGetSummary)
  yield takeLatest(MMSX_GET_MAINTAINANCE, doGetMaintainanceJob)
  yield takeLatest(MMSX_GET_DEVICE_STATUS, doGetDeviceStatus)
  yield takeLatest(MMSX_GET_DEVICE_ERROR, doGetDeviceErr)
  yield takeLatest(MMSX_GET_REQUEST_STATUS, doGetRequestStt)
  yield takeLatest(MMSX_GET_MTT_STATS, dogetMttStatus)
  yield takeLatest(MMSX_GET_DEVICE_USING_STATUS, doGetDeviceUsingStatus)
}
