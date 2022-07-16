import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  updateAttributeTypeFail,
  updateAttributeTypeSuccess,
  MMSX_UPDATE_ATTRIBUTE_TYPE_START,
} from '../../actions/attribute-type'

const updateAttributeTypeApi = (params) => {
  const url = `v1/mms/attribute-type/${params.id}`
  return api.put(url, params)
}

function* doUpdateAttributeType(action) {
  try {
    const response = yield call(updateAttributeTypeApi, action.payload)
    if (response.statusCode === 200) {
      yield put(updateAttributeTypeSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(updateAttributeTypeFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchUpdateAttributeType() {
  yield takeLatest(MMSX_UPDATE_ATTRIBUTE_TYPE_START, doUpdateAttributeType)
}
