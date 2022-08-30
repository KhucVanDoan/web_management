import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateUomFailed,
  updateUomSuccess,
  UPDATE_UOM_START,
} from '~/modules/wmsx/redux/actions/define-uom'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateUomApi = (body) => {
  const uri = `/v1/items/item-unit-settings/${body.id}`
  return api.put(uri, body)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doUpdateUom(action) {
  try {
    const response = yield call(updateUomApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateUomSuccess(response.data))

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
    yield put(updateUomFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateUom() {
  yield takeLatest(UPDATE_UOM_START, doUpdateUom)
}
