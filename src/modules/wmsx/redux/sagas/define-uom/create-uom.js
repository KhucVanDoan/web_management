import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createUomFailed,
  createUomSuccess,
  CREATE_UOM_START,
} from '~/modules/wmsx/redux/actions/define-uom'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createUomApi = (body) => {
  const uri = `/v1/items/item-unit-settings/create`
  return api.post(uri, body)
}

function* doCreateUom(action) {
  try {
    const response = yield call(createUomApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createUomSuccess(response.data))

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
    yield put(createUomFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateUom() {
  yield takeLatest(CREATE_UOM_START, doCreateUom)
}