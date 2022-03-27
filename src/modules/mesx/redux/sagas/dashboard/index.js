import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  getDashboardMoStatusSuccess,
  getDashboardFinishedItemProgressSuccess,
  GET_DASHBOARD_IN_PROGRESS_MOS_START,
  getDashboardSummarySuccess,
  GET_DASHBOARD_ALL_ITEM_BY_MO_START,
  GET_DASHBOARD_MO_STATUS_START,
  GET_DASHBOARD_FINISHED_ITEM_BY_MO_START,
  GET_DASHBOARD_FINISHED_ITEM_PROGRESS_START,
  GET_DASHBOARD_SUMMARY_START,
  GET_DASHBOARD_BOM_ITEM_ROUTING_BY_MO_START,
  GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START,
  GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START,
  getDashboardQCProducingStepProgressSuccess,
  getDashboardProducingStepProgressSuccess,
  getDashboardInProgressMosSuccess,
} from '~/modules/mesx/redux/actions/dashboard'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

/**
 * Confirm BOM
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getSummaryApi = () => {
  const uri = `/v1/produces/dashboards/summary`
  return api.get(uri)
}

const getMoStatusApi = (query) => {
  const uri = `/v1/produces/dashboards/mo-status/summary`
  return api.get(uri, query)
}

export const getInProgressMosApi = (query) => {
  const uri = `/v1/produces/manufacturing-orders/in-progress/list`
  return api.get(uri, query)
}

export const getFinishedItemProgressApi = (query) => {
  const uri = `/v1/produces/dashboards/finished-items/progress`
  return api.get(uri, query)
}

export const getFinishedItemByMoApi = (query) => {
  const uri = `/v1/produces/manufacturing-orders/${query}/items/list`
  return api.get(uri)
}

const getAllItemByMoApi = (query) => {
  const uri = `/v1/produces/manufacturing-orders/${query}/bom-items/list`
  return api.get(uri)
}

const getBomItemRoutingByMoApi = (query) => {
  const uri = `/v1/produces/manufacturing-orders/${query.moId}/bom-items/${query.itemId}/routings`
  return api.get(uri)
}

const getQcProducingStepProgressApi = (query) => {
  const uri = `/v1/produces/dashboards/quality-controls/progress`
  return api.get(uri, query)
}

const getProducingStepProgressApi = (query) => {
  const uri = `/v1/produces/dashboards/producing-steps/progress`
  return api.get(uri, query)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doGetSummary(action) {
  try {
    const response = yield call(getSummaryApi)

    if (response?.statusCode === 200) {
      yield put(getDashboardSummarySuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetMoStatus(action) {
  try {
    const response = yield call(getMoStatusApi, action.payload)

    if (response?.statusCode === 200) {
      yield put(getDashboardMoStatusSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

function* doGetInProgressMos() {
  try {
    const response = yield call(getInProgressMosApi)

    if (response?.statusCode === 200) {
      yield put(getDashboardInProgressMosSuccess(response.data))
      // Call callback action if provided
    }
  } catch (error) {
    // Call callback action if provided
  }
}

function* doGetFinishedItemProgress(action) {
  try {
    const response = yield call(getFinishedItemProgressApi, action.payload)

    if (response?.statusCode === 200) {
      yield put(getDashboardFinishedItemProgressSuccess(response.data))
      // Call callback action if provided
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
  }
}

function* doGetFinishedItemByMo(action) {
  try {
    const response = yield call(getFinishedItemByMoApi, action.payload)

    if (response?.statusCode === 200) {
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      // Call callback action if provided
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
  }
}

function* doGetAllItemByMo(action) {
  try {
    const response = yield call(getAllItemByMoApi, action.payload)

    if (response?.statusCode === 200) {
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      // Call callback action if provided
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
  }
}

function* doGetBomItemRoutingByMo(action) {
  try {
    const response = yield call(getBomItemRoutingByMoApi, action.payload)

    if (response?.statusCode === 200) {
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      // Call callback action if provided
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
  }
}

function* doGetQcProducingStepProgress(action) {
  try {
    const response = yield call(getQcProducingStepProgressApi, action.payload)

    if (response?.statusCode === 200) {
      yield put(getDashboardQCProducingStepProgressSuccess(response.data))
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      // Call callback action if provided
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
  }
}

function* doGetProducingStepProgress(action) {
  try {
    const response = yield call(getProducingStepProgressApi, action.payload)

    if (response?.statusCode === 200) {
      yield put(getDashboardProducingStepProgressSuccess(response.data))
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
      // Call callback action if provided
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    // Call callback action if provided
  }
}

/**
 * Watch search users
 */
export default function* watchDashboard() {
  yield takeLatest(GET_DASHBOARD_IN_PROGRESS_MOS_START, doGetInProgressMos)
  yield takeLatest(GET_DASHBOARD_SUMMARY_START, doGetSummary)
  yield takeLatest(GET_DASHBOARD_MO_STATUS_START, doGetMoStatus)
  yield takeLatest(
    GET_DASHBOARD_FINISHED_ITEM_PROGRESS_START,
    doGetFinishedItemProgress,
  )
  yield takeLatest(
    GET_DASHBOARD_FINISHED_ITEM_BY_MO_START,
    doGetFinishedItemByMo,
  )
  yield takeLatest(GET_DASHBOARD_ALL_ITEM_BY_MO_START, doGetAllItemByMo)
  yield takeLatest(
    GET_DASHBOARD_BOM_ITEM_ROUTING_BY_MO_START,
    doGetBomItemRoutingByMo,
  )
  yield takeLatest(
    GET_DASHBOARD_QC_PRODUCING_STEP_PROGRESS_START,
    doGetQcProducingStepProgress,
  )
  yield takeLatest(
    GET_DASHBOARD_PRODUCING_STEP_PROGRESS_START,
    doGetProducingStepProgress,
  )
}
