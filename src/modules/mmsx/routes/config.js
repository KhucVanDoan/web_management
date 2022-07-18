export const ROUTE = {
  DASHBOARD: {
    PATH: '/mmsx',
    TITLE: 'dashboard',
  },
  DEVICE_MANAGEMENT: {
    PATH: '/wmsx/device-management',
    TITLE: 'deviceManagement',
  },
  REQUEST_DEVICE: {
    LIST: {
      PATH: '/mmsx/request-device',
      TITLE: 'requestDevice',
    },
    CREATE: {
      PATH: '/mmsx/request-device/create',
      TITLE: 'createRequestDevice',
    },
    DETAIL: {
      PATH: '/mmsx/request-device/:id/detail',
      TITLE: 'viewDetailRequestDevice',
    },
    EDIT: {
      PATH: '/mmsx/request-device/:id/edit',
      TITLE: 'updateRequestDevice',
    },
    RETURN_CREATE: {
      PATH: '/mmsx/request-device/return/create',
      TITLE: 'createReturnDevice',
    },
    RETURN_DETAIL: {
      PATH: '/mmsx/request-device/return/:id/detail',
      TITLE: 'viewDetailReturnDevice',
    },
    RETURN_EDIT: {
      PATH: '/mmsx/request-device/return/:id/edit',
      TITLE: 'updateReturnDevice',
    },
  },
  SERIAL_DEVICE_MANAGEMENT: {
    PATH: '/wmsx/serial-device-management',
    TITLE: 'serialDeviceManagement',
  },
  SETTING: {
    TITLE: 'setting',
  },
  DEVICE_SERIAL_MANAGEMENT: {
    PATH: '/wmsx/device-serial-management',
    TITLE: 'deviceSerialManagement',
  },
  DEVICE_LIST: {
    LIST: {
      PATH: '/mmsx/device-list',
      TITLE: 'deviceList',
    },
    CREATE: {
      PATH: '/mmsx/device-list/create',
      TITLE: 'deviceCreate',
    },
    DETAIL: {
      PATH: '/mmsx/device-list/:id/detail',
      TITLE: 'deviceDetail',
    },
    EDIT: {
      PATH: '/mmsx/device-list/:id/edit',
      TITLE: 'deviceEdit',
    },
  },
  DEVICE_ASSIGN: {
    LIST: {
      PATH: '/mmsx/device-assign',
      TITLE: 'deviceAssign',
    },
    CREATE: {
      PATH: '/mmsx/device-assign/create',
      TITLE: 'deviceAssignCreate',
    },
    DETAIL: {
      PATH: '/mmsx/device-assign/:id/detail',
      TITLE: 'deviceAssignDetail',
    },
    EDIT: {
      PATH: '/mmsx/device-assign/:id/edit',
      TITLE: 'deviceAssignEdit',
    },
    REASSIGN: {
      PATH: '/mmsx/device-assign/:id/reassign',
      TITLE: 'deviceReassign',
    },
  },
  DATABASE: {
    PATH: '/mmsx/database',
    TITLE: 'database',
  },
  MAINTENANCE: {
    PATH: '/mmsx/maintenance',
    TITLE: 'maintenance',
  },
  PLAN: {
    PATH: '/mmsx/plan',
    TITLE: 'plan',
  },
  REPORT: {
    PATH: '/mmsx/report',
    TITLE: 'report',
  },
  DEVICE_STATUS: {
    LIST: {
      PATH: '/mmsx/device-status',
      TITLE: 'deviceStatus',
    },
    DETAIL: {
      PATH: '/mmsx/device-status/:id/detail',
      TITLE: 'deviceStatusDetail',
    },
    EDIT: {
      PATH: '/mmsx/device-status/:id/edit',
      TITLE: 'deviceStatusEdit',
    },
  },
  DEVICE_CATEGORY: {
    LIST: {
      PATH: '/mmsx/device-category',
      TITLE: 'deviceCategory',
    },
    CREATE: {
      PATH: '/mmsx/device-category/create',
      TITLE: 'deviceCategoryCreate',
    },
    EDIT: {
      PATH: '/mmsx/device-category/:id/edit',
      TITLE: 'deviceCategoryEdit',
    },
    DETAIL: {
      PATH: '/mmsx/device-category/:id/detail',
      TITLE: 'deviceCategoryDetail',
    },
  },
  ATTRIBUTE_TYPE: {
    LIST: {
      PATH: '/mmsx/attribute-type',
      TITLE: 'attributeType',
    },
    CREATE: {
      PATH: '/mmsx/attribute-type/create',
      TITLE: 'attributeTypeCreate',
    },
    EDIT: {
      PATH: '/mmsx/attribute-type/:id/edit',
      TITLE: 'attributeTypeEdit',
    },
    DETAIL: {
      PATH: '/mmsx/attribute-type/:id/detail',
      TITLE: 'attributeTypeDetail',
    },
  },
  INSTALLATION_TEMPLATE: {
    LIST: {
      PATH: '/mmsx/define-installation-template',
      TITLE: 'templateInstall',
    },
    CREATE: {
      PATH: '/mmsx/define-installation-template/create',
      TITLE: 'templateInstallCreate',
    },
    EDIT: {
      PATH: '/mmsx/define-installation-template/:id/edit',
      TITLE: 'templateInstallEdit',
    },
    DETAIL: {
      PATH: '/mmsx/define-installation-template/:id/detail',
      TITLE: 'templateInstallDetail',
    },
  },
  WARNING_SYSTEM: {
    LIST: {
      PATH: '/mmsx/warning-system',
      TITLE: 'warningList',
    },
    DETAIL: {
      SCHEDULE: {
        PATH: '/mmsx/warning-system/:id/schedule-detail',
        TITLE: 'warningListScheduled',
      },
      CHECKLIST: {
        PATH: '/mmsx/warning-system/:id/checkist-detail',
        TITLE: 'warningListChecklistDetail',
      },
      ERROR: {
        PATH: '/mmsx/warning-system/:id/error-detail',
        TITLE: 'warningListError',
      },
    },
  },
  DEFINE_SUPPLIES: {
    LIST: {
      PATH: '/mmsx/define-supplies',
      TITLE: 'supplies',
    },
    CREATE: {
      PATH: '/mmsx/define-supplies/create',
      TITLE: 'suppliesCreate',
    },
    EDIT: {
      PATH: '/mmsx/define-supplies/:id/edit',
      TITLE: 'suppliesEdit',
    },
    DETAIL: {
      PATH: '/mmsx/define-supplies/:id/detail',
      TITLE: 'suppliesDetail',
    },
  },
  MAINTENANCE_TEAM: {
    LIST: {
      PATH: '/mmsx/maintenance-team',
      TITLE: 'maintenanceTeam',
    },
    CREATE: {
      PATH: '/mmsx/maintenance-team/create',
      TITLE: 'maintenanceTeamCreate',
    },
    EDIT: {
      PATH: '/mmsx/maintenance-team/:id/edit',
      TITLE: 'maintenanceTeamEdit',
    },
    DETAIL: {
      PATH: '/mmsx/maintenance-team/:id/detail',
      TITLE: 'maintenanceTeamDetail',
    },
  },
  SUPPLIES_CATEGORY: {
    LIST: {
      PATH: '/mmsx/supplies-category',
      TITLE: 'suppliesCategory',
    },
    CREATE: {
      PATH: '/mmsx/supplies-category/create',
      TITLE: 'suppliesCategoryCreate',
    },
    EDIT: {
      PATH: '/mmsx/supplies-category/:id/edit',
      TITLE: 'suppliesCategoryEdit',
    },
    DETAIL: {
      PATH: '/mmsx/supplies-category/:id/detail',
      TITLE: 'suppliesCategoryDetail',
    },
  },
  TEMPLATE_CHECKLIST: {
    LIST: {
      PATH: '/mmsx/template-checklist',
      TITLE: 'templateChecklist',
    },
    CREATE: {
      PATH: '/mmsx/template-checklist/create',
      TITLE: 'templateChecklistCreate',
    },
    EDIT: {
      PATH: '/mmsx/template-checklist/:id/edit',
      TITLE: 'templateChecklistEdit',
    },
    DETAIL: {
      PATH: '/mmsx/template-checklist/:id/detail',
      TITLE: 'templateChecklistDetail',
    },
  },
  MAINTAIN_REQUEST: {
    LIST: {
      PATH: '/mmsx/maintain-request',
      TITLE: 'maintainRequest',
    },
    DETAIL: {
      PATH: '/mmsx/maintain-request/:id/detail',
      TITLE: 'maintainRequestDetail',
    },
  },
  JOB: {
    LIST: {
      PATH: '/mmsx/job',
      TITLE: 'job',
    },
    DETAIL: {
      PATH: '/mmsx/job/:id/detail',
      TITLE: 'jobDetail',
    },
    ASSIGN: {
      PATH: '/mmsx/job/:id/assign',
      TITLE: 'jobAssign',
    },
  },
  MAINTAINANCE_PROGRESS: {
    LIST: {
      PATH: '/mmsx/maintainance-progress',
      TITLE: 'maintainanceProgress',
    },
  },
  DEFECT_LIST: {
    LIST: {
      PATH: '/mmsx/defect-list',
      TITLE: 'defectList',
    },
    CREATE: {
      PATH: '/mmsx/defect-list/create',
      TITLE: 'defectListCreate',
    },
    EDIT: {
      PATH: '/mmsx/defect-list/:id/edit',
      TITLE: 'defectListEdit',
    },
    DETAIL: {
      PATH: '/mmsx/defect-list/:id/detail',
      TITLE: 'defectListDetail',
    },
  },
  SUPPLIES_REQUEST: {
    LIST: {
      PATH: '/mmsx/supplies-request',
      TITLE: 'suppliesRequest',
    },
    CREATE: {
      PATH: '/mmsx/supplies-request/create',
      TITLE: 'suppliesRequestCreate',
    },
    EDIT: {
      PATH: '/mmsx/supplies-request/:id/edit',
      TITLE: 'suppliesRequestEdit',
    },
    DETAIL: {
      PATH: '/mmsx/supplies-request/:id/detail',
      TITLE: 'suppliesRequestDetail',
    },
  },
  DEVICE_STATUS_REPORT: {
    LIST: {
      PATH: '/mmsx/device-status-report',
      TITLE: 'deviceStatusReport',
    },
  },
  ATTRIBUTE_MAINTENANCE: {
    LIST: {
      PATH: '/mmsx/attribute-maintenance',
      TITLE: 'attributeMaintenance',
    },
    CREATE: {
      PATH: '/mmsx/attribute-maintenance/create',
      TITLE: 'attributeMaintenanceCreate',
    },
    EDIT: {
      PATH: '/mmsx/attribute-maintenance/:id/edit',
      TITLE: 'attributeMaintenanceEdit',
    },
    DETAIL: {
      PATH: '/mmsx/attribute-maintenance/:id/detail',
      TITLE: 'attributeMaintenanceDetail',
    },
  },
}
