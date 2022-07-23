import { call, put, takeLatest } from 'redux-saga/effects'

import {
  GET_CREATE_INFO_FORM_DATA,
  getInfoDataFail,
  getInfoDataSuccess,
} from '~/modules/mmsx/redux/actions/device-status'
import { api } from '~/services/api'

/**
 * Search user API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const getInfoDataApi = (params) => {
  const url = `v1/mms/devices/assign-device/${params}/attribute-type`
  return api.get(url)
}

function* doGetInfoData(action) {
  try {
    const response = yield call(getInfoDataApi, action?.payload)

    if (response.statusCode === 200) {
      yield put(getInfoDataSuccess(response?.data))

      if (action.onSuccess) {
        yield action.onSuccess(response?.data)
      }
    } else {
      throw new Error(response.message)
    }
  } catch (error) {
    yield put(getInfoDataFail())
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetInfoData() {
  yield takeLatest(GET_CREATE_INFO_FORM_DATA, doGetInfoData)
}
