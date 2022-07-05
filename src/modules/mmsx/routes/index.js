import Dashboard from '~/modules/mmsx/features/dashboard'

import DefineDeviceDetail from '../features/define-device/detail'
import DefineDeviceForm from '../features/define-device/form'
import DefineDevice from '../features/define-device/list'
import DefineInstallationTemplateDetail from '../features/define-installation-template/detail'
import DefineInstallationTemplateForm from '../features/define-installation-template/form'
import DefineInstallationTemplate from '../features/define-installation-template/list'
import DefineSuppliesDetail from '../features/define-supplies/detail'
import DefineSuppliesForm from '../features/define-supplies/form'
import DefineSupplies from '../features/define-supplies/list'
import DeviceCategoryDetail from '../features/device-category/detail'
import DeviceCategoryForm from '../features/device-category/form'
import DeviceCategory from '../features/device-category/list'
import MaintenanceTeamDetail from '../features/maintenance-team/detail'
import MaintenanceTeamForm from '../features/maintenance-team/form'
import MaintenanceTeam from '../features/maintenance-team/list'
import SuppliesCategoryDetail from '../features/supplies-category/detail'
import SuppliesCategoryForm from '../features/supplies-category/form'
import SuppliesCategory from '../features/supplies-category/list'
import WarningChecklistDetail from '../features/warning-system/detail/check-list'
import WarningListErrorForm from '../features/warning-system/detail/error-view'
import WarningScheduleDetail from '../features/warning-system/detail/schedule'
import WarningSystem from '../features/warning-system/list'
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
        name: ROUTE.MAINTENANCE_TEAM.LIST.TITLE,
        path: ROUTE.MAINTENANCE_TEAM.LIST.PATH,
        component: MaintenanceTeam,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.MAINTENANCE_TEAM.CREATE.TITLE,
            path: ROUTE.MAINTENANCE_TEAM.CREATE.PATH,
            component: MaintenanceTeamForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.MAINTENANCE_TEAM.DETAIL.TITLE,
            path: ROUTE.MAINTENANCE_TEAM.DETAIL.PATH,
            component: MaintenanceTeamDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.MAINTENANCE_TEAM.EDIT.TITLE,
            path: ROUTE.MAINTENANCE_TEAM.EDIT.PATH,
            component: MaintenanceTeamForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.SUPPLIES_CATEGORY.LIST.TITLE,
        path: ROUTE.SUPPLIES_CATEGORY.LIST.PATH,
        component: SuppliesCategory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SUPPLIES_CATEGORY.CREATE.TITLE,
            path: ROUTE.SUPPLIES_CATEGORY.CREATE.PATH,
            component: SuppliesCategoryForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_CATEGORY.DETAIL.TITLE,
            path: ROUTE.SUPPLIES_CATEGORY.DETAIL.PATH,
            component: SuppliesCategoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_CATEGORY.EDIT.TITLE,
            path: ROUTE.SUPPLIES_CATEGORY.EDIT.PATH,
            component: SuppliesCategoryForm,
            isInSidebar: false,
          },
        ],
      },
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
  {
    name: ROUTE.DEVICE_MANAGEMENT.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEVICE_LIST.LIST.TITLE,
        path: ROUTE.DEVICE_LIST.LIST.PATH,
        component: DefineDevice,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEVICE_LIST.CREATE.TITLE,
            path: ROUTE.DEVICE_LIST.CREATE.PATH,
            component: DefineDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_LIST.DETAIL.TITLE,
            path: ROUTE.DEVICE_LIST.DETAIL.PATH,
            component: DefineDeviceDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_LIST.EDIT.TITLE,
            path: ROUTE.DEVICE_LIST.EDIT.PATH,
            component: DefineDeviceForm,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.MAINTENANCE.TITLE,
    icon: 'plan',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.WARNING_SYSTEM.LIST.TITLE,
        path: ROUTE.WARNING_SYSTEM.LIST.PATH,
        component: WarningSystem,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WARNING_SYSTEM.DETAIL.CHECKLIST.TITLE,
            path: ROUTE.WARNING_SYSTEM.DETAIL.CHECKLIST.PATH,
            component: WarningChecklistDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WARNING_SYSTEM.DETAIL.SCHEDULE.TITLE,
            path: ROUTE.WARNING_SYSTEM.DETAIL.SCHEDULE.PATH,
            component: WarningScheduleDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WARNING_SYSTEM.DETAIL.ERROR.TITLE,
            path: ROUTE.WARNING_SYSTEM.DETAIL.ERROR.PATH,
            component: WarningListErrorForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: ROUTE.DEVICE_MANAGEMENT.TITLE,
    icon: 'plan',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_SUPPLIES.LIST.TITLE,
        path: ROUTE.DEFINE_SUPPLIES.LIST.PATH,
        component: DefineSupplies,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_SUPPLIES.CREATE.TITLE,
            path: ROUTE.DEFINE_SUPPLIES.CREATE.PATH,
            component: DefineSuppliesForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_SUPPLIES.DETAIL.TITLE,
            path: ROUTE.DEFINE_SUPPLIES.DETAIL.PATH,
            component: DefineSuppliesDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_SUPPLIES.EDIT.TITLE,
            path: ROUTE.DEFINE_SUPPLIES.EDIT.PATH,
            component: DefineSuppliesForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
