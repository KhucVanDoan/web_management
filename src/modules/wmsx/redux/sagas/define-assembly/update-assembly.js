import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  updateAssemblyFailed,
  updateAssemblySuccess,
  UPDATE_ASSEMBLY_START,
} from '~/modules/wmsx/redux/actions/define-assembly'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const updateAssemblyApi = (params) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/${params?.id}`
  return api.put(uri, params)
}

function* doUpdateAssembly(action) {
  try {
    const response = yield call(updateAssemblyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(updateAssemblySuccess(response.results))

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
    yield put(updateAssemblyFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchUpdateAssembly() {
  yield takeLatest(UPDATE_ASSEMBLY_START, doUpdateAssembly)
}
