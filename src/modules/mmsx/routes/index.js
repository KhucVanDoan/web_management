import Dashboard from '~/modules/mmsx/features/dashboard'

import DefineInstallationTemplateDetail from '../features/define-installation-template/detail'
import DefineInstallationTemplateForm from '../features/define-installation-template/form'
import DefineInstallationTemplate from '../features/define-installation-template/list'
import DeviceCategoryDetail from '../features/device-category/detail'
import DeviceCategoryForm from '../features/device-category/form'
import DeviceCategory from '../features/device-category/list'
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
    name: ROUTE.DATABASE.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEVICE_CATEGORY.LIST.TITLE,
        path: ROUTE.DEVICE_CATEGORY.LIST.PATH,
        component: DeviceCategory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEVICE_CATEGORY.CREATE.TITLE,
            path: ROUTE.DEVICE_CATEGORY.CREATE.PATH,
            component: DeviceCategoryForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_CATEGORY.DETAIL.TITLE,
            path: ROUTE.DEVICE_CATEGORY.DETAIL.PATH,
            component: DeviceCategoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_CATEGORY.EDIT.TITLE,
            path: ROUTE.DEVICE_CATEGORY.EDIT.PATH,
            component: DeviceCategoryForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.INSTALLATION_TEMPLATE.LIST.TITLE,
        path: ROUTE.INSTALLATION_TEMPLATE.LIST.PATH,
        component: DefineInstallationTemplate,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.INSTALLATION_TEMPLATE.CREATE.TITLE,
            path: ROUTE.INSTALLATION_TEMPLATE.CREATE.PATH,
            component: DefineInstallationTemplateForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.INSTALLATION_TEMPLATE.DETAIL.TITLE,
            path: ROUTE.INSTALLATION_TEMPLATE.DETAIL.PATH,
            component: DefineInstallationTemplateDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.INSTALLATION_TEMPLATE.EDIT.TITLE,
            path: ROUTE.INSTALLATION_TEMPLATE.EDIT.PATH,
            component: DefineInstallationTemplateForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
