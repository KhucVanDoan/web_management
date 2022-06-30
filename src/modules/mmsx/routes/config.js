export const ROUTE = {
  DASHBOARD: {
    PATH: '/mmsx',
    TITLE: 'dashboard',
  },
  DATABASE: {
    PATH: '/mesx/database',
    TITLE: 'database',
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
}
