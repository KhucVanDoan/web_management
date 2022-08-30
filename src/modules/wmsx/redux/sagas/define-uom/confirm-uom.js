import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  confirmUomByIdFailed,
  confirmUomByIdSuccess,
  CONFIRM_UOM_START,
} from '~/modules/wmsx/redux/actions/define-uom'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const confirmUomApi = (params) => {
  const uri = `/v1/items/item-unit-settings/${params}/confirm`
  return api.put(uri)
}

function* doConfirmUom(action) {
  try {
    const response = yield call(confirmUomApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(confirmUomByIdSuccess(response.payload))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess()
      }

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(
        response?.message || response?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )

      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(confirmUomByIdFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchConfirmUom() {
  yield takeLatest(CONFIRM_UOM_START, doConfirmUom)
}
