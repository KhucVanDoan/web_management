import { call, put, takeLatest } from 'redux-saga/effects';

import {
  searchActionGroupFail,
  searchActionGroupSuccess,
  SEARCH_ACTION_GROUP_START,
} from '~/modules/qmsx/redux/actions/define-action-group'
import { api } from '~/services/api'

/**
 * Search Action-Groups API
 * @param {any} params Params will be sent to server
 * @returns {Promise}
 */
const searchActionGroupApi = (params) => {
  const uri = `/v1/quality-controls/action-categories`;
  return api.get(uri, params);
};

/**
 * Handle get data request and response
 * @param {object} action
 */
function* doSearchActionGroup(action) {
  try {
    const response = yield call(searchActionGroupApi, action?.payload);

    if (response?.statusCode === 200) {
      const payload = {
        list: response?.data?.items,
        total: response?.data?.meta?.total,
      };
      yield put(searchActionGroupSuccess(payload));

      // Call callback action if provided
      if (action.onSuccess) {
        yield action.onSuccess();
      }
    } else {
      throw new Error(response?.message);
    }
  } catch (error) {
    yield put(searchActionGroupFail());
    // Call callback action if provided
    if (action.onError) {
      yield action.onError(error);
    }
  }
}

/**
 * Watch search Action-Groups
 */
export default function* watchSearchActionGroup() {
  yield takeLatest(SEARCH_ACTION_GROUP_START, doSearchActionGroup);
}
