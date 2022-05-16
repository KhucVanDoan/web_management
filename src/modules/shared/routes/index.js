import GenerateOTP from '~/modules/auth/features/forgot-password/generate-otp'
import ResetPassword from '~/modules/auth/features/forgot-password/reset-password'
import VerifyOTP from '~/modules/auth/features/forgot-password/send-otp'
import Login from '~/modules/auth/features/login'

import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.LOGIN.TITLE,
    path: ROUTE.LOGIN.PATH,
    component: Login,
  },
  {
    name: ROUTE.FORGOT_PASSWORD.TITLE,
    path: ROUTE.FORGOT_PASSWORD.PATH,
    component: GenerateOTP,
  },
  {
    name: ROUTE.VERIFY_OTP.TITLE,
    path: ROUTE.VERIFY_OTP.PATH,
    component: VerifyOTP,
  },
  {
    name: ROUTE.RESET_PASSWORD.TITLE,
    path: ROUTE.RESET_PASSWORD.PATH,
    component: ResetPassword,
  },
]

export default routes
