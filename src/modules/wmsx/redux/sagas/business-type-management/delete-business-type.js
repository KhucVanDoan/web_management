import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  deleteBusinessTypeFailed,
  deleteBusinessTypeSuccess,
  DELETE_BUSINESS_TYPE_START,
} from '~/modules/wmsx/redux/actions/business-type-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const deleteBusinessTypeApi = (params) => {
  const uri = `/v1/warehouses/bussiness-types/${params}`
  return api.delete(uri)
}

function* doDeleteBusinessType(action) {
  try {
    const response = yield call(deleteBusinessTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(deleteBusinessTypeSuccess(response.results))

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
    yield put(deleteBusinessTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchDeleteBusinessType() {
  yield takeLatest(DELETE_BUSINESS_TYPE_START, doDeleteBusinessType)
}
