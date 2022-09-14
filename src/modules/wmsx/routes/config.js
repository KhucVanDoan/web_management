export const ROUTE = {
  DASHBOARD: {
    PATH: '/wmsx',
    TITLE: 'dashboard',
  },
  DATABASE: {
    TITLE: 'database',
  },
  COMPANY_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/company-management',
      TITLE: 'companyManagement',
    },
    CREATE: {
      PATH: '/wmsx/company-management/create',
      TITLE: 'companyManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/company-management/:id/detail',
      TITLE: 'companyManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/company-management/:id/edit',
      TITLE: 'companyManagementEdit',
    },
  },
  UNIT_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/unit-management',
      TITLE: 'managementUnit',
    },
    CREATE: {
      PATH: '/wmsx/unit-management/create',
      TITLE: 'managementUnitCreate',
    },
    DETAIL: {
      PATH: '/wmsx/unit-management/:id/detail',
      TITLE: 'managementUnitDetail',
    },
    EDIT: {
      PATH: '/wmsx/unit-management/:id/edit',
      TITLE: 'managementUnitEdit',
    },
  },
  RECEIPT_DEPARTMENT_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/receipt-department-management',
      TITLE: 'receiptDepartmentManagement',
    },
    CREATE: {
      PATH: '/wmsx/receipt-department-management/create',
      TITLE: 'receiptDepartmentManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/receipt-department-management/:id/detail',
      TITLE: 'receiptDepartmentManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/receipt-department-management/:id/edit',
      TITLE: 'receiptDepartmentManagementEdit',
    },
  },
  CONSTRUCTION_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/project-management',
      TITLE: 'constructionManagement',
    },
    CREATE: {
      PATH: '/wmsx/project-management/create',
      TITLE: 'constructionManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/project-management/:id/detail',
      TITLE: 'constructionManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/project-management/:id/edit',
      TITLE: 'constructionManagementEdit',
    },
  },
  CONSTRUCTION_ITEMS_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/task-management',
      TITLE: 'constructionItemsManagement',
    },
    CREATE: {
      PATH: '/wmsx/task-management/create',
      TITLE: 'constructionItemsManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/task-management/:id/detail',
      TITLE: 'constructionItemsManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/task-management/:id/edit',
      TITLE: 'constructionItemsManagementEdit',
    },
  },
  SOURCE_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/source-management',
      TITLE: 'sourceManagement',
    },
    CREATE: {
      PATH: '/wmsx/source-management/create',
      TITLE: 'sourceManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/source-management/:id/detail',
      TITLE: 'sourceManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/source-management/:id/edit',
      TITLE: 'sourceManagementEdit',
    },
  },
  REASON_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/reason-management',
      TITLE: 'reasonManagement',
    },
    CREATE: {
      PATH: '/wmsx/reason-management/create',
      TITLE: 'reasonManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/reason-management/:id/detail',
      TITLE: 'reasonManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/reason-management/:id/edit',
      TITLE: 'reasonManagementEdit',
    },
  },
  DEFINE_UOM: {
    LIST: {
      PATH: '/wmsx/define-uom',
      TITLE: 'defineUom',
    },
    CREATE: {
      PATH: '/wmsx/define-uom/create',
      TITLE: 'defineUomCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-uom/:id/detail',
      TITLE: 'defineUomDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-uom/:id/edit',
      TITLE: 'defineUomEdit',
    },
  },
  BUSINESS_TYPE_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/business-type-management',
      TITLE: 'businessTypeManagement',
    },
    CREATE: {
      PATH: '/wmsx/business-type-management/create',
      TITLE: 'businessTypeManagementCreate',
    },
    DETAIL: {
      PATH: '/wmsx/business-type-management/:id/detail',
      TITLE: 'businessTypeManagementDetail',
    },
    EDIT: {
      PATH: '/wmsx/business-type-management/:id/edit',
      TITLE: 'businessTypeManagementEdit',
    },
  },
  DEFINE_OBJECT_CATEGORY: {
    LIST: {
      PATH: '/wmsx/define-object-category',
      TITLE: 'defineObjectCategory',
    },
    CREATE: {
      PATH: '/wmsx/define-object-category/create',
      TITLE: 'defineObjectCategoryCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-object-category/:id/detail',
      TITLE: 'defineObjectCategoryDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-object-category/:id/edit',
      TITLE: 'defineObjectCategoryEdit',
    },
  },
  DEFINE_MATERIAL_CATEGORY: {
    LIST: {
      PATH: '/wmsx/define-material-category',
      TITLE: 'defineMaterialCategory',
    },
    CREATE: {
      PATH: '/wmsx/define-material-category/create',
      TITLE: 'defineMaterialCategoryCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-material-category/:id/detail',
      TITLE: 'defineMaterialCategoryDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-material-category/:id/edit',
      TITLE: 'defineMaterialCategoryEdit',
    },
  },
  DEFINE_MATERIAL_QUALITY: {
    LIST: {
      PATH: '/wmsx/define-material-quality',
      TITLE: 'defineMaterialQuality',
    },
    CREATE: {
      PATH: '/wmsx/define-material-quality/create',
      TITLE: 'defineMaterialQualityCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-material-quality/:id/detail',
      TITLE: 'defineMaterialQualityDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-material-quality/:id/edit',
      TITLE: 'defineMaterialQualityEdit',
    },
  },
  DEFINE_PRODUCING_COUNTRY: {
    LIST: {
      PATH: '/wmsx/define-producing-country',
      TITLE: 'defineProducingCountry',
    },
    CREATE: {
      PATH: '/wmsx/define-producing-country/create',
      TITLE: 'defineProducingCountryCreate',
    },
    DETAIL: {
      PATH: '/wmsx/define-producing-country/:id/detail',
      TITLE: 'defineProducingCountryDetail',
    },
    EDIT: {
      PATH: '/wmsx/define-producing-country/:id/edit',
      TITLE: 'defineProducingCountryEdit',
    },
  },
  DEFINE_VENDOR: {
    LIST: {
      PATH: '/wmsx/define-supplier',
      TITLE: 'defineVendor',
    },
    CREATE: {
      PATH: '/wmsx/define-supplier/create',
      TITLE: 'defineVendorCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-supplier/:id/edit',
      TITLE: 'defineVendorEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-supplier/:id/detail',
      TITLE: 'defineVendorDetail',
    },
  },
  WAREHOUSE_MANAGEMENT: {
    TITLE: 'warehouseManagement',
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
  LOCATION_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/location-management',
      TITLE: 'locationManagement',
    },
    CREATE: {
      PATH: '/wmsx/location-management/create',
      TITLE: 'locationManagementCreate',
    },
    EDIT: {
      PATH: '/wmsx/location-management/:id/edit',
      TITLE: 'locationManagementEdit',
    },
    DETAIL: {
      PATH: '/wmsx/location-management/:id/detail',
      TITLE: 'locationManagementDetail',
    },
  },
  DEFINE_WAREHOUSE_GROUP: {
    LIST: {
      PATH: '/wmsx/define-warehouse-group',
      TITLE: 'defineWarehouseGroup',
    },
    CREATE: {
      PATH: '/wmsx/define-warehouse-group/create',
      TITLE: 'defineWarehouseGroupCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-warehouse-group/:id/edit',
      TITLE: 'defineWarehouseGroupEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-warehouse-group/:id/detail',
      TITLE: 'defineWarehouseGroupDetail',
    },
  },
  DEFINE_ASSEMBLY: {
    LIST: {
      PATH: '/wmsx/define-assembly',
      TITLE: 'defineAssembly',
    },
    CREATE: {
      PATH: '/wmsx/define-assembly/create',
      TITLE: 'defineAssemblyCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-assembly/:id/edit',
      TITLE: 'defineAssemblyEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-assembly/:id/detail',
      TITLE: 'defineAssemblyDetail',
    },
  },
  DEFINE_SHELF: {
    LIST: {
      PATH: '/wmsx/define-shelf',
      TITLE: 'defineShelf',
    },
    CREATE: {
      PATH: '/wmsx/define-shelf/create',
      TITLE: 'defineShelfCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-shelf/:id/edit',
      TITLE: 'defineShelfEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-shelf/:id/detail',
      TITLE: 'defineShelfDetail',
    },
  },
  DEFINE_DRAWER: {
    LIST: {
      PATH: '/wmsx/define-drawer',
      TITLE: 'defineDrawer',
    },
    CREATE: {
      PATH: '/wmsx/define-drawer/create',
      TITLE: 'defineDrawerCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-drawer/:id/edit',
      TITLE: 'defineDrawerEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-drawer/:id/detail',
      TITLE: 'defineDrawerDetail',
    },
  },
  DEFINE_BIN: {
    LIST: {
      PATH: '/wmsx/define-bin',
      TITLE: 'defineBin',
    },
    CREATE: {
      PATH: '/wmsx/define-bin/create',
      TITLE: 'defineBinCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-bin/:id/edit',
      TITLE: 'defineBinEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-bin/:id/detail',
      TITLE: 'defineBinDetail',
    },
  },
  INVENTORY_SETTING: {
    LIST: {
      PATH: '/wmsx/inventory-setting',
      TITLE: 'inventorySetting',
    },
    CREATE: {
      PATH: '/wmsx/inventory-setting/create',
      TITLE: 'inventorySettingCreate',
    },
    EDIT: {
      PATH: '/wmsx/inventory-setting/:id/edit',
      TITLE: 'inventorySettingEdit',
    },
    DETAIL: {
      PATH: '/wmsx/inventory-setting/:id/detail',
      TITLE: 'inventorySettingDetail',
    },
  },
  DEFINE_EXPENDITURE_ORG: {
    LIST: {
      PATH: '/wmsx/define-expenditure-org',
      TITLE: 'defineExpenditureOrg',
    },
    CREATE: {
      PATH: '/wmsx/define-expenditure-org/create',
      TITLE: 'defineExpenditureOrgCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-expenditure-org/:id/edit',
      TITLE: 'defineExpenditureOrgEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-expenditure-org/:id/detail',
      TITLE: 'defineExpenditureOrgDetail',
    },
  },
  DEFINE_EXPENDITURE_TYPE: {
    LIST: {
      PATH: '/wmsx/define-expenditure-type',
      TITLE: 'defineExpenditureType',
    },
    CREATE: {
      PATH: '/wmsx/define-expenditure-type/create',
      TITLE: 'defineExpenditureTypeCreate',
    },
    EDIT: {
      PATH: '/wmsx/define-expenditure-type/:id/edit',
      TITLE: 'defineExpenditureTypeEdit',
    },
    DETAIL: {
      PATH: '/wmsx/define-expenditure-type/:id/detail',
      TITLE: 'defineExpenditureTypeDetail',
    },
  },
  SET_STORAGE_PERIOD: {
    LIST: {
      PATH: '/wmsx/set-storage-period',
      TITLE: 'setStoragePeriod',
    },
    CREATE: {
      PATH: '/wmsx/set-storage-period/create',
      TITLE: 'setStoragePeriodCreate',
    },
    EDIT: {
      PATH: '/wmsx/set-storage-period/:id/edit',
      TITLE: 'setStoragePeriodEdit',
    },
    DETAIL: {
      PATH: '/wmsx/set-storage-period/:id/detail',
      TITLE: 'setStoragePeriodDetail',
    },
  },
  MATERIAL_MANAGEMENT: {
    LIST: {
      PATH: '/wmsx/material-management',
      TITLE: 'materialManagement',
    },
    CREATE: {
      PATH: '/wmsx/material-management/create',
      TITLE: 'materialManagementCreate',
    },
    EDIT: {
      PATH: '/wmsx/material-management/:id/edit',
      TITLE: 'materialManagementEdit',
    },
    DETAIL: {
      PATH: '/wmsx/material-management/:id/detail',
      TITLE: 'materialManagementDetail',
    },
    EDIT_WAREHOUSE_SOURCE: {
      PATH: '/wmsx/material-management/:id/edit-warehouse-source',
      TITLE: 'materialManagementEditWarehouseSource',
    },
  },
  SETTING: {
    TITLE: 'setting',
  },
  QR_CODE: {
    PATH: '/wmsx/qr-code',
    TITLE: 'qrCode',
  },
  RECEIPT_MANAGEMENT: {
    TITLE: 'receiptCommandManagement',
  },
  WAREHOUSE_EXPORT_RECEIPT: {
    LIST: {
      PATH: '/wmsx/warehouse-export-receipt',
      TITLE: 'warehouseExportReceipt',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-export-receipt/create',
      TITLE: 'warehouseExportReceiptCreate',
    },
    EDIT: {
      PATH: '/wmsx/warehouse-export-receipt/:id/edit',
      TITLE: 'warehouseExportReceiptEdit',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-export-receipt/:id/detail',
      TITLE: 'warehouseExportReceiptDetail',
    },
  },
  WAREHOUSE_IMPORT_RECEIPT: {
    LIST: {
      PATH: '/wmsx/warehouse-import-receipt',
      TITLE: 'warehouseImportReceipt',
    },
    CREATE: {
      PATH: '/wmsx/warehouse-import-receipt/create',
      TITLE: 'warehouseImportReceiptCreate',
    },
    EDIT: {
      PATH: '/wmsx/warehouse-import-receipt/:id/edit',
      TITLE: 'warehouseImportReceiptEdit',
    },
    DETAIL: {
      PATH: '/wmsx/warehouse-import-receipt/:id/detail',
      TITLE: 'warehouseImportReceiptDetail',
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
  WAREHOUSE_REPORT_MANAGEMENT: {
    PATH: '/wmsx/warehouse-report-management',
    TITLE: 'warehouseReportManagement',
  },
  INVENTORY_STATISTICS: {
    PATH: '/wmsx/inventory-statistics',
    TITLE: 'inventoryStatistics',
  },
  INVENTORY_WARNING: {
    PATH: '/wmsx/inventory-warning',
    TITLE: 'inventoryWarning',
  },
}
