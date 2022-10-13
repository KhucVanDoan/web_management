import License from '../features/license'
import RedirectPage from '../features/redirect'
import { ROUTE } from './config'

const routes = [
  {
    path: ROUTE.REDIRECT.PATH,
    component: RedirectPage,
  },
  {
    name: ROUTE.LICENSE.TITLE,
    path: ROUTE.LICENSE.PATH,
    component: License,
  },
]

export default routes
