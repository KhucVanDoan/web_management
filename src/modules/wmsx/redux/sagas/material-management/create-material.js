import { call, put, takeLatest } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from '~/common/constants'
import {
  createMaterialFailed,
  createMaterialSuccess,
  CREATE_MATERIAL_START,
} from '~/modules/wmsx/redux/actions/material-management'
import { api } from '~/services/api'
import addNotification from '~/utils/toast'

const createMaterialApi = (params) => {
  let data = new FormData()

  if (params?.files) {
    for (let i = 0; i < params.files.length; i++) {
      data.append('files', params.files[i])
    }
  }

  data.append('data', JSON.stringify(params))
  const uri = `/v1/items/create`
  return api.post(uri, data)
}

function* doCreateMaterial(action) {
  try {
    const response = yield call(createMaterialApi, action?.payload)

    if (response?.statusCode === 200) {
      yield put(createMaterialSuccess(response.data))

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
    yield put(createMaterialFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchCreateMaterial() {
  yield takeLatest(CREATE_MATERIAL_START, doCreateMaterial)
}
