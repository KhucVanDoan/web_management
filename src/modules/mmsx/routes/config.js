export const ROUTE = {
  DASHBOARD: {
    PATH: '/mmsx',
    TITLE: 'dashboard',
  },
  DATABASE: {
    PATH: '/mesx/database',
    TITLE: 'database',
  },
  MAINTENANCE: {
    PATH: '/mesx/maintenance',
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
}
