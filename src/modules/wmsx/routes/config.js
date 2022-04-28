export const ROUTE = {
  DASHBOARD: {
    PATH: '/wmsx',
    TITLE: 'dashboard',
  },
  WAREHOUSE_SETUP: {
    TITLE: 'warehouseSetup',
  },
  WAREHOUSE_SETTING: {
    LIST: {
      PATH: '/wmsx/warehouse-setting',
      TITLE: 'warehouseSetting',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-setting/create',
      TITLE: 'warehouseSettingCreate',
    },
    EDIT: {
      PATH: '/wmsx/warehouse-setting/:id/edit',
      TITLE: 'warehouseSettingEdit',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-setting/:id/detail',
      TITLE: 'warehouseSettingDetail',
    },
  },
  DEFINE_CATEGORY: {
    PATH: '/wmsx/define-category',
    TITLE: 'defineCategory',
  },
  DEFINE_DETAIL: {
    LIST: {
      PATH: '/wmsx/define-detail',
      TITLE: 'defineDetail',
    },
    CREATE: {
      PATH: '/wmsx/define-detail/create',
      TITLE: 'defineDetailCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-detail/:id/detail',
      TITLE: 'defineDetailDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-detail/:id/edit',
      TITLE: 'defineDetailEdit',
    },
  },
}
