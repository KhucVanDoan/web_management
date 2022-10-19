import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateInventoryStatisticsFailed,
  updateInventoryStatisticsSuccess,
  WMSX_UPDATE_INVENTORIES_STATISTICS_START,
} from '~/modules/wmsx/redux/actions/inventory-statistics'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateInventoryStatisticsApi = (body) => {
  const uri = `/v1/items/item-stock-information/save`
  return api.post(uri, body)
}

function* doUpdateInventoryStatistics(action) {
  try {
    const response = yield call(updateInventoryStatisticsApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateInventoryStatisticsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateInventoryStatisticsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateInventoryStatistics() {
  yield takeLatest(
    WMSX_UPDATE_INVENTORIES_STATISTICS_START,
    doUpdateInventoryStatistics,
  )
}
