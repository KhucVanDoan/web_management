import { all } from 'redux-saga/effects'

// import watchGetSaleOrderDetailByIds from '~/modules/database/redux/sagas/sale-order/get-sale-order-details'
import watchConfirmUser from './user-management/confirm'
import watchCreateUser from './user-management/create-user'
import watchDeleteUser from './user-management/delete-user'
import watchGenerateOTP from './user-management/generate-otp'
import watchGetUserDetails from './user-management/get-user-details'
import watchRejectUser from './user-management/reject'
import watchResetPassword from './user-management/reset-password'
import watchSearchUsers from './user-management/search-users'
import watchUpdateUser from './user-management/update-user'
import watchVerifyOTP from './user-management/verify-otp-code'

/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    // user-management
    watchSearchUsers(),
    watchCreateUser(),
    watchUpdateUser(),
    watchDeleteUser(),
    watchGetUserDetails(),
    watchGenerateOTP(),
    watchVerifyOTP(),
    watchResetPassword(),
    watchConfirmUser(),
    watchRejectUser(),
  ])
}
