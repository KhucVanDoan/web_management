import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSignatureConfigurationListFailed,
  getSignatureConfigurationListSuccess,
  GET_SIGNATURE_CONFIGURATION_LIST_START,
} from '~/modules/wmsx/redux/actions/signature-configuration'
import { api } from '~/services/api'

const getSignatureConfigurationListApi = (params) => {
  //@TODO update api
  const uri = `/v1/settings/setting-signature/list`
  return api.get(uri, params)
}

function* doGetSignatureConfigurationList(action) {
  try {
    const response = yield call(
      getSignatureConfigurationListApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getSignatureConfigurationListSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSignatureConfigurationListFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetSignatureConfigurationList() {
  yield takeLatest(
    GET_SIGNATURE_CONFIGURATION_LIST_START,
    doGetSignatureConfigurationList,
  )
}
