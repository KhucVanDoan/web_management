export const ROUTE = {
  DASHBOARD: {
    PATH: '/mmsx',
    TITLE: 'dashboard',
  },
  DEVICE_MANAGEMENT: {
    PATH: '/wmsx/device-management',
    TITLE: 'deviceManagement',
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
  DATABASE: {
    PATH: '/mmsx/database',
    TITLE: 'database',
  },
  MAINTENANCE: {
    PATH: '/mmsx/maintenance',
    TITLE: 'maintenance',
  },
  DEVICE_STATUS: {
    PATH: '/mmsx/device-status',
    TITLE: 'deviceStatus',
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
    CREATE: {
      PATH: '/mmsx/maintain-request/create',
      TITLE: 'maintainRequestCreate',
    },
    EDIT: {
      PATH: '/mmsx/maintain-request/:id/edit',
      TITLE: 'maintainRequestEdit',
    },
    DETAIL: {
      PATH: '/mmsx/maintain-request/:id/detail',
      TITLE: 'maintainRequestDetail',
    },
  },
}
