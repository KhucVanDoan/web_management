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
  RENT_WAREHOUSE_COST_MANAGEMENT: {
    TITLE: 'rentWarehouseCostManagement',
  },

  INVENTORY: {
    LIST: {
      PATH: '/wmsx/inventory',
      TITLE: 'inventory',
    },
    DETAIL: {
      PATH: '/wmsx/inventory/:id/detail',
      TITLE: 'inventoryDetail',
    },
  },
  WAREHOUSE_SPACE_REPORT: {
    PATH: '/wmsx/warehouse-space-report',
    TITLE: 'warehouseSpaceReport',
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
  PURCHASED_ORDER_IMPORT: {
    LIST: {
      PATH: '/wmsx/purchased-orders-import',
      TITLE: 'purchasedOrderImport',
    },
    CREATE: {
      PATH: '/wmsx/purchased-orders-import/create',
      TITLE: 'purchasedOrderImportCreate',
    },
    DETAIL: {
      PATH: '/wmsx/purchased-orders-import/:id/detail',
      TITLE: 'purchasedOrderImportDetails',
    },
    EDIT: {
      PATH: '/wmsx/purchased-orders-import/:id/edit',
      TITLE: 'purchasedOrderImportEdit',
    },
    TRANSACTIONS: {
      LIST: {
        PATH: '/wmsx/purchased-orders-import/:parentId/transactions',
        TITLE: 'movements',
      },
      DETAIL: {
        PATH: '/wmsx/purchased-orders-import/:parentId/transactions/:id',
        TITLE: 'movementDetail',
      },
    },
  },
  TEMPLATE_SECTOR: {
    LIST: {
      PATH: '/wmsx/template-sector',
      TITLE: 'templateSector',
    },
    CREATE: {
      PATH: '/wmsx/template-sector/create',
      TITLE: 'templateSectorCreate',
    },
    EDIT: {
      PATH: '/wmsx/template-sector/:id/edit',
      TITLE: 'templateSectorEdit',
    },
    DETAIL: {
      PATH: '/wmsx/template-sector/:id/detail',
      TITLE: 'templateSectorDetail',
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
  COMMAND_MANAGEMENT: {
    PATH: '/wmsx/command-management',
    TITLE: 'commandManagement',
  },
  WAREHOUSE_TRANSFERS: {
    LIST: {
      PATH: '/wmsx/warehouse-transfer',
      TITLE: 'warehouseTransfers',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-transfer/create',
      TITLE: 'warehouseTransfersCreate',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-transfer/:id/details',
      TITLE: 'warehouseTransfersDetails',
    },
    EDIT: {
      PATH: '/wmsx/warehouse-transfer/:id/edit',
      TITLE: 'warehouseTransfersEdit',
    },
    TRANSACTIONS: {
      LIST: {
        PATH: '/wmsx/warehouse-transfer/:parentId/transactions',
        TITLE: 'movements',
      },
      DETAIL: {
        PATH: '/wmsx/warehouse-transfer/:parentId/transactions/:id',
        TITLE: 'movementDetail',
      },
    },
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
  WAREHOUSE_AREA: {
    LIST: {
      PATH: '/wmsx/warehouse-area',
      TITLE: 'warehouseArea',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-area/:id/detail',
      TITLE: 'warehouseAreaDetail',
    },
  },
  IMPORT_MANUFACTURING_ORDER: {
    LIST: {
      PATH: '/wmsx/import-manufacturing-order',
      TITLE: 'importManufacturingOrder',
    },
    CREATE: {
      PATH: '/wmsx/import-manufacturing-order/create',
      TITLE: 'createImportManufacturingOrder',
    },
    EDIT: {
      PATH: '/wmsx/import-manufacturing-order/:id/edit',
      TITLE: 'editImportManufacturingOrder',
    },
    DETAIL: {
      PATH: '/wmsx/import-manufacturing-order/:id/detail',
      TITLE: 'importManufacturingOrderDetail',
    },
    TRANSACTIONS: {
      LIST: {
        PATH: '/wmsx/import-manufacturing-order/:parentId/transactions',
        TITLE: 'movements',
      },
      DETAIL: {
        PATH: '/wmsx/import-manufacturing-order/:parentId/transactions/:id',
        TITLE: 'movementDetail',
      },
    },
  },
  DEFINE_BLOCK: {
    LIST: {
      PATH: '/wmsx/define-block',
      TITLE: 'defineBlock',
    },
    CREATE: {
      PATH: '/wmsx/define-block/create',
      TITLE: 'defineBlockCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-block/:id/detail',
      TITLE: 'defineBlockDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-block/:id/edit',
      TITLE: 'defineBlockEdit',
    },
  },
  PRODUCTION_ORDER: {
    LIST: {
      PATH: '/wmsx/production-orders',
      TITLE: 'productionOrder',
    },
    CREATE: {
      PATH: '/wmsx/production-orders/create',
      TITLE: 'productionOrderCreate',
    },
    DETAIL: {
      PATH: '/wmsx/production-orders/:id/detail',
      TITLE: 'productionOrderDetail',
    },
    EDIT: {
      PATH: '/wmsx/production-orders/:id/edit',
      TITLE: 'productionOrderEdit',
    },
    TRANSACTIONS: {
      LIST: {
        PATH: '/wmsx/production-orders/:parentId/transactions',
        TITLE: 'movements',
      },
      DETAIL: {
        PATH: '/wmsx/production-orders/:parentId/transactions/:id',
        TITLE: 'movementDetail',
      },
    },
  },
  TYPE_SERVICE: {
    LIST: {
      PATH: '/wmsx/type-service',
      TITLE: 'defineTypeService',
    },
    CREATE: {
      PATH: '/wmsx/type-service/create',
      TITLE: 'typeServiceCreate',
    },
    DETAILS: {
      PATH: '/wmsx/type-service/:id/detail',
      TITLE: 'typeServiceDetail',
    },
    EDIT: {
      PATH: '/wmsx/type-service/:id/edit',
      TITLE: 'typeServiceEdit',
    },
  },
  TYPE_UNIT: {
    LIST: {
      PATH: '/wmsx/type-unit',
      TITLE: 'defineTypeUnit',
    },
    CREATE: {
      PATH: '/wmsx/type-unit/create',
      TITLE: 'typeUnitCreate',
    },
    DETAIL: {
      PATH: '/wmsx/type-unit/:id/detail',
      TITLE: 'typeUnitDetail',
    },
    EDIT: {
      PATH: '/wmsx/type-unit/:id/edit',
      TITLE: 'typeUnitEdit',
    },
  },
  DEFINE_CURRENCY_UNIT: {
    LIST: {
      PATH: '/wmsx/currency-unit',
      TITLE: 'defineCurrencyUnit',
    },
    CREATE: {
      PATH: '/wmsx/currency-unit/create',
      TITLE: 'createCurrencyUnit',
    },
    EDIT: {
      PATH: '/wmsx/currency-unit/:id/edit',
      TITLE: 'editCurrencyUnit',
    },
    DETAIL: {
      PATH: '/wmsx/currency-unit/:id/detail',
      TITLE: 'currencyUnitDetail',
    },
  },
  DEFINE_SERVICE: {
    LIST: {
      PATH: '/wmsx/service',
      TITLE: 'defineService',
    },
    CREATE: {
      PATH: '/wmsx/service/create',
      TITLE: 'serviceCreate',
    },
    DETAIL: {
      PATH: '/wmsx/service/:id/detail',
      TITLE: 'serviceDetail',
    },
    EDIT: {
      PATH: '/wmsx/service/:id/edit',
      TITLE: 'serviceEdit',
    },
  },
  DEFINE_PACKAGE: {
    LIST: {
      PATH: '/wmsx/define-package',
      TITLE: 'definePackage',
    },
    CREATE: {
      PATH: '/wmsx/define-package/create',
      TITLE: 'definePackageCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-package/:id/detail',
      TITLE: 'definePackageDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-package/:id/edit',
      TITLE: 'definePackageEdit',
    },
  },
  WAREHOUSE_SHELF: {
    LIST: {
      PATH: '/wmsx/warehouse-shelf',
      TITLE: 'warehouseShelf',
    },

    DETAIL: {
      PATH: '/wmsx/warehouse-shelf/:id/detail',
      TITLE: 'defineWarehouseShelfDetail',
    },
  },
  WAREHOUSE_PALLET: {
    LIST: {
      PATH: '/wmsx/warehouse-pallet',
      TITLE: 'defineWarehousePallet',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-pallet/:id/detail',
      TITLE: 'defineWarehousePalletDetail',
    },
  },
  DEFINE_CUSTOMER_LEVEL: {
    LIST: {
      PATH: '/wmsx/define-customer-level',
      TITLE: 'defineCustomerLevel',
    },
    CREATE: {
      PATH: '/wmsx/define-customer-level/create',
      TITLE: 'defineCustomerLevelCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-customer-level/:id/detail',
      TITLE: 'defineCustomerLevelDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-customer-level/:id/edit',
      TITLE: 'defineCustomerLevelEdit',
    },
  },
  RENT_WAREHOUSE_DASHBOARD: {
    LIST: {
      PATH: '/wmsx/rent-warehouse-dashboard',
      TITLE: 'rentWarehouseDashboard',
    },
  },
  DEFINE_VOUCHER: {
    LIST: {
      PATH: '/wmsx/voucher',
      TITLE: 'defineVoucher',
    },
    CREATE: {
      PATH: '/wmsx/voucher/create',
      TITLE: 'defineVoucherCreate',
    },
    DETAIL: {
      PATH: '/wmsx/voucher/:id/detail',
      TITLE: 'defineVoucherDetail',
    },
    EDIT: {
      PATH: '/wmsx/voucher/:id/edit',
      TITLE: 'defineVoucherEdit',
    },
  },
  DEFINE_PAYMENT_TYPE: {
    LIST: {
      PATH: '/wmsx/payment-type',
      TITLE: 'definePaymentType',
    },
    CREATE: {
      PATH: '/wmsx/payment-type/create',
      TITLE: 'createPaymentType',
    },
    DETAIL: {
      PATH: '/wmsx/payment-type/:id/detail',
      TITLE: 'paymentTypeDetails',
    },
    EDIT: {
      PATH: '/wmsx/payment-type/:id/edit',
      TITLE: 'editPaymentType',
    },
  },
  INVOICE_TYPE: {
    LIST: {
      PATH: '/wmsx/invoice-type',
      TITLE: 'invoiceType',
    },
    CREATE: {
      PATH: '/wmsx/invoice-type/create',
      TITLE: 'createInvoiceType',
    },
    DETAIL: {
      PATH: '/wmsx/invoice-type/:id/detail',
      TITLE: 'invoiceTypeDetail',
    },
    EDIT: {
      PATH: '/wmsx/invoice-type/:id/edit',
      TITLE: 'editInvoiceType',
    },
  },
  DEFINE_BILL: {
    LIST: {
      PATH: '/wmsx/define-bill',
      TITLE: 'defineBill',
    },
    CREATE: {
      PATH: '/wmsx/define-bill/create',
      TITLE: 'defineBillCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-bill/:id/edit',
      TITLE: 'defineBillEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-bill/:id/details',
      TITLE: 'defineBillDetails',
    },
  },
  SO_EXPORT: {
    LIST: {
      PATH: '/wmsx/so-export',
      TITLE: 'soExport',
    },
    CREATE: {
      PATH: '/wmsx/so-export/create',
      TITLE: 'soExportCreate',
    },
    DETAIL: {
      PATH: '/wmsx/so-export/:id/detail',
      TITLE: 'soExportDetail',
    },
    EDIT: {
      PATH: '/wmsx/so-export/:id/edit',
      TITLE: 'soExportEdit',
    },
    TRANSACTIONS: {
      LIST: {
        PATH: '/wmsx/so-export/:parentId/transactions',
        TITLE: 'movements',
      },
      DETAIL: {
        PATH: '/wmsx/so-export/:parentId/transactions/:id',
        TITLE: 'movementDetail',
      },
    },
  },
  WAREHOUSE_DESIGN: {
    PATH: '/wmsx/warehouse-design/',
    TITLE: 'warehouseDesign',
  },
  ESTABLISH_LOCATION: {
    LIST: {
      PATH: '/wmsx/location-setting',
      TITLE: 'locationSetting',
    },
    CREATE: {
      PATH: '/wmsx/location-setting/create',
      TITLE: 'locationSettingCreate',
    },
    DETAIL: {
      PATH: '/wmsx/location-setting/:id/detail',
      TITLE: 'locationSettingDetail',
    },
    EDIT: {
      PATH: '/wmsx/location-setting/:id/edit',
      TITLE: 'locationSettingEdit',
    },
  },
}
