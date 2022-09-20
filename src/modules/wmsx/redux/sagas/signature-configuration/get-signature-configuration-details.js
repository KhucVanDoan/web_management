import { call, put, takeLatest } from 'redux-saga/effects'

import {
  getSignatureConfigurationDetailsFailed,
  getSignatureConfigurationDetailsSuccess,
  GET_SIGNATURE_CONFIGURATION_DETAILS_START,
} from '~/modules/wmsx/redux/actions/signature-configuration'
import { api } from '~/services/api'

const getSignatureConfigurationDetailsApi = () => {
  //@TODO update api
  const uri = `/v1/settings`
  return api.get(uri)
}

function* doGetSignatureConfigurationDetails(action) {
  try {
    const response = yield call(
      getSignatureConfigurationDetailsApi,
      action?.payload,
    )

    if (response?.statusCode === 200) {
      yield put(getSignatureConfigurationDetailsSuccess(response.data))

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess(response.data)
      }
    } else {
      throw new Error(response?.message)
    }
  } catch (error) {
    yield put(getSignatureConfigurationDetailsFailed())
    // Call callback action if provided
    if (action.onError) {
      yield action.onError()
    }
  }
}

export default function* watchGetSignatureConfigurationDetails() {
  yield takeLatest(
    GET_SIGNATURE_CONFIGURATION_DETAILS_START,
    doGetSignatureConfigurationDetails,
  )
}
