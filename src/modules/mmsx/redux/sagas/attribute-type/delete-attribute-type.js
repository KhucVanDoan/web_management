import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  deleteAttributeTypeFail,
  deleteAttributeTypeSuccess,
  MMSX_DELETE_ATTRIBUTE_TYPE_START,
} from '../../actions/attribute-type'

const apiUrl = (params) => {
  const url = `v1/mms/attribute-type/${params}`
  return api.delete(url)
}

function* doDeleteAttributeType(action) {
  try {
    const response = yield call(apiUrl, action?.payload)
    if (response.statusCode === 200) {
      yield put(deleteAttributeTypeSuccess(action.payload))
      if (action.onSuccess) {
        yield action.onSuccess()
      }
      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      yield put(deleteAttributeTypeFail())
      if (action.onError) {
        yield action.onError()
      }
    }
  } catch (error) {
    yield put(deleteAttributeTypeFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteAttributeType() {
  yield takeLatest(MMSX_DELETE_ATTRIBUTE_TYPE_START, doDeleteAttributeType)
}
