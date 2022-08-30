import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createBusinessTypeFailed,
  createBusinessTypeSuccess,
  CREATE_BUSINESS_TYPE_START,
} from '~/modules/wmsx/redux/actions/business-type-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createBusinessTypeApi = (body) => {
  const uri = `/v1/warehouses/bussiness-types/create`
  return api.post(uri, body)
}

function* doCreateBusinessType(action) {
  try {
    const response = yield call(createBusinessTypeApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createBusinessTypeSuccess(response.data))

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
    yield put(createBusinessTypeFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateBusinessType() {
  yield takeLatest(CREATE_BUSINESS_TYPE_START, doCreateBusinessType)
}
