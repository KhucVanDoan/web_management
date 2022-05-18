export const ROUTE = {
  DASHBOARD: {
    PATH: '/wmsx',
    TITLE: 'dashboard',
  },
  WAREHOUSE_SETUP: {
    TITLE: 'warehouseSetup',
  },
  ORDER_MANAGEMENT: {
    TITLE: 'orderManagement',
  },
  WAREHOUSE_MANAGEMENT: {
    TITLE: 'warehouseManagement',
  },
  INVENTORY: {
    LIST: {
      PATH: '/wmsx/inventory',
      TITLE: 'inventory',
    },
    DETAIL: {
      PATH: '/wmsx/inventory/:id/detail/:warehouseId',
      TITLE: 'inventoryDetail',
    },
  },
  INVENTORY_STATISTIC: {
    LIST: {
      PATH: '/wmsx/inventory-statistics',
      TITLE: 'inventoryStatistics',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-statistics/:id/detail/:warehouseId',
      TITLE: 'inventoryStatisticsDetail',
    },
  },
  DEFINE_TEMPLATE_SHELF: {
    LIST: {
      PATH: '/wmsx/define-template-shelf',
      TITLE: 'defineTemplateShelf',
    },
    CREATE: {
      PATH: '/wmsx/define-template-shelf/create',
      TITLE: 'defineTemplateShelfCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-template-shelf/:id/detail',
      TITLE: 'defineTemplateShelfDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-template-shelf/:id/edit',
      TITLE: 'defineTemplateShelfEdit',
    },
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
  DEFINE_WAREHOUSE: {
    LIST: {
      PATH: '/wmsx/define-warehouse',
      TITLE: 'defineWarehouse',
    },
    CREATE: {
      PATH: '/wmsx/define-warehouse/create',
      TITLE: 'defineWarehouseCreate',
    },

    EDIT: {
      PATH: '/wmsx/define-warehouse/:id/edit',
      TITLE: 'defineWarehouseEdit',
    },

    DETAIL: {
      PATH: '/wmsx/define-warehouse/:id/detail',
      TITLE: 'defineWarehouseDetail',
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

  WAREHOUSE_REPORT_MANAGEMENT: {
    PATH: '/wmsx/warehouse-report-management',
    TITLE: 'warehouseReportManagement',
  },
  INVENTORY_DEADLINE_WARNING: {
    PATH: '/wmsx/inventory-deadline-warning',
    TITLE: 'inventoryDeadlineWarning',
  },
  INVENTORY_WARNING: {
    PATH: '/wmsx/inventory-warning',
    TITLE: 'inventoryWarning',
  },
  WAREHOUSE_REPORT: {
    LIST: {
      PATH: '/wmsx/warehouse-report',
      TITLE: 'warehouseReport',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-report/create',
      TITLE: 'warehouseReportCreate',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-report/:id/details',
      TITLE: 'warehouseReportDetails',
    },
  },
  WAREHOUSE_TRANSFER_MOVEMENTS: {
    LIST: {
      PATH: '/wmsx/warehouse-transfer-movements',
      TITLE: 'warehouseTransferMovement',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-transfer-movements/:id/detail',
      TITLE: 'warehouseTransferMovementDetail',
    },
    PATH: '/wmsx/warehouse-transfer-movements',
    TITLE: 'warehouseTransferMovement',
  },
  PRODUCTION_INFORMATION_MANAGENMENT: {
    PATH: '/wmsx/production-information-management',
    TITLE: 'productionInformationManagement',
  },
  DEFINE_VENDEOR: {
    LIST: {
      PATH: '/wmsx/define-vendor',
      TITLE: 'defineVendor',
    },
    CREATE: {
      PATH: '/wmsx/define-vendor/create',
      TITLE: 'defineVendorCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-vendor/:id/edit',
      TITLE: 'defineVendorEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-vendor/:id/detail',
      TITLE: 'defineVendorDetail',
    },
  },
  SETTING: {
    TITLE: 'setting',
  },
  INVENTORY_LIMIT: {
    LIST: {
      PATH: '/wmsx/inventory-limit',
      TITLE: 'inventoryLimit',
    },
    CREATE: {
      PATH: '/wmsx/inventory-limit/create',
      TITLE: 'inventoryLimitCreate',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-limit/:id/details',
      TITLE: 'inventoryLimitDetails',
    },
    EDIT: {
      PATH: '/wmsx/inventory-limit/:id/edit',
      TITLE: 'inventoryLimitEdit',
    },
  },
  WAREHOUSE_EXPORT: {
    LIST: {
      PATH: '/wmsx/warehouse-export',
      TITLE: 'warehouseExport',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-export/:id/detail',
      TITLE: 'warehouseExportDetail',
    },
  },
  WAREHOUSE_IMPORT: {
    LIST: {
      PATH: '/wmsx/warehouse-import',
      TITLE: 'warehouseImport',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-import/:id/detail',
      TITLE: 'movementsDetail',
    },
  },
  INVENTORY_STATISTICS: {
    PATH: '/wmsx/inventory-statistics',
    TITLE: 'inventoryStatistics',
  },
  DEFINE_CUSTOMER: {
    LIST: {
      PATH: '/wmsx/define-customer',
      TITLE: 'defineCustomer',
    },
    CREATE: {
      PATH: '/wmsx/define-customer/create',
      TITLE: 'defineCustomerCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-customer/:id/edit',
      TITLE: 'defineCustomerEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-customer/:id/detail',
      TITLE: 'defineCustomerDetail',
    },
  },
  INVENTORY_CALENDAR: {
    LIST: {
      PATH: '/wmsx/inventory-calendar',
      TITLE: 'inventoryCalendar',
    },
    CREATE: {
      PATH: '/wmsx/inventory-calendar/create',
      TITLE: 'inventoryCalendarCreate',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-calendar/:id/detail',
      TITLE: 'inventoryCalendarDetail',
    },
    EDIT: {
      PATH: '/wmsx/inventory-calendar/:id/edit',
      TITLE: 'inventoryCalendarEdit',
    },
  },
}