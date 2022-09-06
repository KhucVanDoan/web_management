import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createAssemblyFailed,
  createAssemblySuccess,
  CREATE_ASSEMBLY_START,
} from '~/modules/wmsx/redux/actions/define-assembly'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createAssemblyApi = (body) => {
  /* @TODO update api */
  const uri = `/v1/items/object-categories/create`
  return api.post(uri, body)
}

function* doCreateAssembly(action) {
  try {
    const response = yield call(createAssemblyApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createAssemblySuccess(response.data))

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
    yield put(createAssemblyFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateAssembly() {
  yield takeLatest(CREATE_ASSEMBLY_START, doCreateAssembly)
}
