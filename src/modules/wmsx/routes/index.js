import Dashboard from '~/modules/wmsx/features/dashboard'
import DefineDetailDetail from '~/modules/wmsx/features/define-detail/detail'
import DefineDetailForm from '~/modules/wmsx/features/define-detail/form'
import DefineDetail from '~/modules/wmsx/features/define-detail/list'

import { ROUTE } from './config'

const routes = [
  {
    name: ROUTE.DASHBOARD.TITLE,
    path: ROUTE.DASHBOARD.PATH,
    component: Dashboard,
    icon: 'home',
    isInSidebar: true,
  },
  {
    name: ROUTE.DEFINE_CATEGORY.TITLE,
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_DETAIL.LIST.TITLE,
        path: ROUTE.DEFINE_DETAIL.LIST.PATH,
        component: DefineDetail,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_DETAIL.CREATE.TITLE,
            path: ROUTE.DEFINE_DETAIL.CREATE.PATH,
            component: DefineDetailForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_DETAIL.DETAIL.TITLE,
            path: ROUTE.DEFINE_DETAIL.DETAIL.PATH,
            component: DefineDetailDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_DETAIL.EDIT.TITLE,
            path: ROUTE.DEFINE_DETAIL.EDIT.PATH,
            component: DefineDetailForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
