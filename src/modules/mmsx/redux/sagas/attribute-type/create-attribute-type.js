import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

import {
  createAttributeTypeFail,
  createAttributeTypeSuccess,
  MMSX_CREATE_ATTRIBUTE_TYPE_START,
} from '../../actions/attribute-type'

const createAttributeTypeApi = (params) => {
  const url = `v1/mms/attribute-type`
  return api.post(url, params)
}

function* doCreateAttributeType(action) {
  try {
    const response = yield call(createAttributeTypeApi, action.payload)
    if (response.statusCode === 200) {
      yield put(createAttributeTypeSuccess())
      if (action.onSuccess) yield action.onSuccess()

      addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
    } else {
      addNotification(response?.message, NOTIFICATION_TYPE.ERROR)
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(createAttributeTypeFail())
    if (action.onError) yield action.onError()
  }
}

export default function* watchCreateAttributeType() {
  yield takeLatest(MMSX_CREATE_ATTRIBUTE_TYPE_START, doCreateAttributeType)
}
