import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  rejectUomByIdFailed,
  rejectUomByIdSuccess,
  REJECT_UOM_START,
} from '~/modules/wmsx/redux/actions/define-uom'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const rejectUomApi = (params) => {
  const uri = `/v1/items/item-unit-settings/${params}/reject`
  return api.put(uri)
}

function* doRejectUom(action) {
  try {
    const response = yield call(rejectUomApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(rejectUomByIdSuccess(response.payload))

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
    yield put(rejectUomByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchRejectUom() {
  yield takeLatest(REJECT_UOM_START, doRejectUom)
}
