import Dashboard from '~/modules/mmsx/features/dashboard'

import AttributeMaintenance from '../features/attribute-maintenance'
import AttributeMaintenanceDetail from '../features/attribute-maintenance/detail'
import AttributeMaintenanceForm from '../features/attribute-maintenance/form'
import AttributeType from '../features/attribute-type'
import AttributeTypeDetail from '../features/attribute-type/detail'
import AttributeTypeForm from '../features/attribute-type/form'
import DefectList from '../features/defect-list'
import DefectListDetail from '../features/defect-list/detail'
import DefectListForm from '../features/defect-list/form'
import DefineDeviceDetail from '../features/define-device/detail'
import DefineDeviceForm from '../features/define-device/form'
import DefineDevice from '../features/define-device/list'
import DefineInstallationTemplateDetail from '../features/define-installation-template/detail'
import DefineInstallationTemplateForm from '../features/define-installation-template/form'
import DefineInstallationTemplate from '../features/define-installation-template/list'
import DefineSuppliesDetail from '../features/define-supplies/detail'
import DefineSuppliesForm from '../features/define-supplies/form'
import DefineSupplies from '../features/define-supplies/list'
import DeviceAssignDetail from '../features/device-assign/detail'
import DeviceAssignForm from '../features/device-assign/form'
import DeviceAssign from '../features/device-assign/list'
import DeviceCategoryDetail from '../features/device-category/detail'
import DeviceCategoryForm from '../features/device-category/form'
import DeviceCategory from '../features/device-category/list'
import DeviceStatusReport from '../features/device-status-report'
import JobAssign from '../features/job/assign'
import JobDetail from '../features/job/detail'
import Job from '../features/job/list'
import MaintainRequestDetail from '../features/maintain-request/detail'
import MaintainRequest from '../features/maintain-request/list'
import MaintainanceProgress from '../features/maintainance-progress/list'
import MaintenanceTeamDetail from '../features/maintenance-team/detail'
import MaintenanceTeamForm from '../features/maintenance-team/form'
import MaintenanceTeam from '../features/maintenance-team/list'
import RequestDeviceDetail from '../features/request-device/detail'
import RequestDeviceForm from '../features/request-device/form'
import RequestDeviceList from '../features/request-device/list'
import ReturnDeviceDetail from '../features/request-device/return-detail'
import ReturnDeviceForm from '../features/request-device/return-form'
import SuppliesCategoryDetail from '../features/supplies-category/detail'
import SuppliesCategoryForm from '../features/supplies-category/form'
import SuppliesCategory from '../features/supplies-category/list'
import SuppliesRequestDetail from '../features/supplies-request/detail'
import SuppliesRequestForm from '../features/supplies-request/form'
import SuppliesRequest from '../features/supplies-request/list'
import TemplateChecklistDetail from '../features/template-checklist/detail'
import TemplateChecklistForm from '../features/template-checklist/form'
import TemplateChecklist from '../features/template-checklist/list'
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
        name: ROUTE.TEMPLATE_CHECKLIST.LIST.TITLE,
        path: ROUTE.TEMPLATE_CHECKLIST.LIST.PATH,
        component: TemplateChecklist,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.TEMPLATE_CHECKLIST.CREATE.TITLE,
            path: ROUTE.TEMPLATE_CHECKLIST.CREATE.PATH,
            component: TemplateChecklistForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.TEMPLATE_CHECKLIST.DETAIL.TITLE,
            path: ROUTE.TEMPLATE_CHECKLIST.DETAIL.PATH,
            component: TemplateChecklistDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.TEMPLATE_CHECKLIST.EDIT.TITLE,
            path: ROUTE.TEMPLATE_CHECKLIST.EDIT.PATH,
            component: TemplateChecklistForm,
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
      {
        name: ROUTE.ATTRIBUTE_MAINTENANCE.LIST.TITLE,
        path: ROUTE.ATTRIBUTE_MAINTENANCE.LIST.PATH,
        component: AttributeMaintenance,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.ATTRIBUTE_MAINTENANCE.CREATE.TITLE,
            path: ROUTE.ATTRIBUTE_MAINTENANCE.CREATE.PATH,
            component: AttributeMaintenanceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.ATTRIBUTE_MAINTENANCE.DETAIL.TITLE,
            path: ROUTE.ATTRIBUTE_MAINTENANCE.DETAIL.PATH,
            component: AttributeMaintenanceDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.ATTRIBUTE_MAINTENANCE.EDIT.TITLE,
            path: ROUTE.ATTRIBUTE_MAINTENANCE.EDIT.PATH,
            component: AttributeMaintenanceForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.ATTRIBUTE_TYPE.LIST.TITLE,
        path: ROUTE.ATTRIBUTE_TYPE.LIST.PATH,
        component: AttributeType,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.ATTRIBUTE_TYPE.CREATE.TITLE,
            path: ROUTE.ATTRIBUTE_TYPE.CREATE.PATH,
            component: AttributeTypeForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.ATTRIBUTE_TYPE.DETAIL.TITLE,
            path: ROUTE.ATTRIBUTE_TYPE.DETAIL.PATH,
            component: AttributeTypeDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.ATTRIBUTE_TYPE.EDIT.TITLE,
            path: ROUTE.ATTRIBUTE_TYPE.EDIT.PATH,
            component: AttributeTypeForm,
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
    name: ROUTE.DEVICE_SERIAL_MANAGEMENT.TITLE,
    icon: 'plan',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.REQUEST_DEVICE.LIST.TITLE,
        path: ROUTE.REQUEST_DEVICE.LIST.PATH,
        component: RequestDeviceList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.REQUEST_DEVICE.CREATE.TITLE,
            path: ROUTE.REQUEST_DEVICE.CREATE.PATH,
            component: RequestDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.DETAIL.TITLE,
            path: ROUTE.REQUEST_DEVICE.DETAIL.PATH,
            component: RequestDeviceDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.EDIT.TITLE,
            path: ROUTE.REQUEST_DEVICE.EDIT.PATH,
            component: RequestDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.RETURN_CREATE.TITLE,
            path: ROUTE.REQUEST_DEVICE.RETURN_CREATE.PATH,
            component: ReturnDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.RETURN_EDIT.TITLE,
            path: ROUTE.REQUEST_DEVICE.RETURN_EDIT.PATH,
            component: ReturnDeviceForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_DEVICE.RETURN_DETAIL.TITLE,
            path: ROUTE.REQUEST_DEVICE.RETURN_DETAIL.PATH,
            component: ReturnDeviceDetail,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.SUPPLIES_REQUEST.LIST.TITLE,
        path: ROUTE.SUPPLIES_REQUEST.LIST.PATH,
        component: SuppliesRequest,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SUPPLIES_REQUEST.CREATE.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.CREATE.PATH,
            component: SuppliesRequestForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_REQUEST.DETAIL.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.DETAIL.PATH,
            component: SuppliesRequestDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.SUPPLIES_REQUEST.EDIT.TITLE,
            path: ROUTE.SUPPLIES_REQUEST.EDIT.PATH,
            component: SuppliesRequestForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEVICE_ASSIGN.LIST.TITLE,
        path: ROUTE.DEVICE_ASSIGN.LIST.PATH,
        component: DeviceAssign,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEVICE_ASSIGN.CREATE.TITLE,
            path: ROUTE.DEVICE_ASSIGN.CREATE.PATH,
            component: DeviceAssignForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_ASSIGN.DETAIL.TITLE,
            path: ROUTE.DEVICE_ASSIGN.DETAIL.PATH,
            component: DeviceAssignDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEVICE_ASSIGN.EDIT.TITLE,
            path: ROUTE.DEVICE_ASSIGN.EDIT.PATH,
            component: DeviceAssignForm,
          },
          {
            name: ROUTE.DEVICE_ASSIGN.REASSIGN.TITLE,
            path: ROUTE.DEVICE_ASSIGN.REASSIGN.PATH,
            component: DeviceAssignForm,
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
        name: ROUTE.MAINTAIN_REQUEST.LIST.TITLE,
        path: ROUTE.MAINTAIN_REQUEST.LIST.PATH,
        component: MaintainRequest,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.MAINTAIN_REQUEST.DETAIL.TITLE,
            path: ROUTE.MAINTAIN_REQUEST.DETAIL.PATH,
            component: MaintainRequestDetail,
            isInSidebar: false,
          },
        ],
      },
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
    name: ROUTE.PLAN.TITLE,
    icon: 'plan',
    isInSidebar: true,
    subMenu: [
      // MinhNA note: Kế hoạch công việc, Kế hoạch vật tư
    ],
  },
  {
    name: ROUTE.JOB.LIST.TITLE,
    path: ROUTE.JOB.LIST.PATH,
    icon: 'plan',
    component: Job,
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.JOB.DETAIL.TITLE,
        path: ROUTE.JOB.DETAIL.PATH,
        component: JobDetail,
        isInSidebar: false,
      },
      {
        name: ROUTE.JOB.ASSIGN.TITLE,
        path: ROUTE.JOB.ASSIGN.PATH,
        component: JobAssign,
        isInSidebar: false,
      },
    ],
  },
  {
    name: ROUTE.REPORT.TITLE,
    icon: 'key',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.MAINTAINANCE_PROGRESS.LIST.TITLE,
        path: ROUTE.MAINTAINANCE_PROGRESS.LIST.PATH,
        component: MaintainanceProgress,
        isInSidebar: true,
      },
      {
        name: ROUTE.DEVICE_STATUS_REPORT.LIST.TITLE,
        path: ROUTE.DEVICE_STATUS_REPORT.LIST.PATH,
        component: DeviceStatusReport,
        isInSidebar: true,
      },
    ],
  },
  {
    name: ROUTE.SETTING.TITLE,
    icon: 'setting',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFECT_LIST.LIST.TITLE,
        path: ROUTE.DEFECT_LIST.LIST.PATH,
        component: DefectList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFECT_LIST.CREATE.TITLE,
            path: ROUTE.DEFECT_LIST.CREATE.PATH,
            component: DefectListForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFECT_LIST.DETAIL.TITLE,
            path: ROUTE.DEFECT_LIST.DETAIL.PATH,
            component: DefectListDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFECT_LIST.EDIT.TITLE,
            path: ROUTE.DEFECT_LIST.EDIT.PATH,
            component: DefectListForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
