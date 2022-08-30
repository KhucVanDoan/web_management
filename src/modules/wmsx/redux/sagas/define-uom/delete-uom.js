import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteUomFailed,
  deleteUomSuccess,
  DELETE_UOM_START,
} from '~/modules/wmsx/redux/actions/define-uom'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteUomApi = (params) => {
  const uri = `/v1/items/item-unit-settings/${params}`
  return api.delete(uri)
}

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doDeleteUom(action) {
  try {
    const response = yield call(deleteUomApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteUomSuccess(response.data))

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
    yield put(deleteUomFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteUom() {
  yield takeLatest(DELETE_UOM_START, doDeleteUom)
}
