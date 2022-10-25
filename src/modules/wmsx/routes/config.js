export const ROUTE = {
  DASHBOARD: {
    PATH: '/wms',
    TITLE: 'dashboard',
  },
  DATABASE: {
    TITLE: 'database',
  },
  COMPANY_MANAGEMENT: {
    LIST: {
      PATH: '/wms/company-management',
      TITLE: 'companyManagement',
    },
    CREATE: {
      PATH: '/wms/company-management/create',
      TITLE: 'companyManagementCreate',
    },
    DETAIL: {
      PATH: '/wms/company-management/:id/detail',
      TITLE: 'companyManagementDetail',
    },
    EDIT: {
      PATH: '/wms/company-management/:id/edit',
      TITLE: 'companyManagementEdit',
    },
  },
  UNIT_MANAGEMENT: {
    LIST: {
      PATH: '/wms/unit-management',
      TITLE: 'managementUnit',
    },
    CREATE: {
      PATH: '/wms/unit-management/create',
      TITLE: 'managementUnitCreate',
    },
    DETAIL: {
      PATH: '/wms/unit-management/:id/detail',
      TITLE: 'managementUnitDetail',
    },
    EDIT: {
      PATH: '/wms/unit-management/:id/edit',
      TITLE: 'managementUnitEdit',
    },
    ASSIGN: {
      PATH: '/wms/unit-management/:id/assign',
      TITLE: 'managementUnitAssign',
    },
  },
  RECEIPT_DEPARTMENT_MANAGEMENT: {
    LIST: {
      PATH: '/wms/receipt-department-management',
      TITLE: 'receiptDepartmentManagement',
    },
    CREATE: {
      PATH: '/wms/receipt-department-management/create',
      TITLE: 'receiptDepartmentManagementCreate',
    },
    DETAIL: {
      PATH: '/wms/receipt-department-management/:id/detail',
      TITLE: 'receiptDepartmentManagementDetail',
    },
    EDIT: {
      PATH: '/wms/receipt-department-management/:id/edit',
      TITLE: 'receiptDepartmentManagementEdit',
    },
  },
  CONSTRUCTION_MANAGEMENT: {
    LIST: {
      PATH: '/wms/project-management',
      TITLE: 'constructionManagement',
    },
    CREATE: {
      PATH: '/wms/project-management/create',
      TITLE: 'constructionManagementCreate',
    },
    DETAIL: {
      PATH: '/wms/project-management/:id/detail',
      TITLE: 'constructionManagementDetail',
    },
    EDIT: {
      PATH: '/wms/project-management/:id/edit',
      TITLE: 'constructionManagementEdit',
    },
  },
  CONSTRUCTION_ITEMS_MANAGEMENT: {
    LIST: {
      PATH: '/wms/task-management',
      TITLE: 'constructionItemsManagement',
    },
    CREATE: {
      PATH: '/wms/task-management/create',
      TITLE: 'constructionItemsManagementCreate',
    },
    DETAIL: {
      PATH: '/wms/task-management/:id/detail',
      TITLE: 'constructionItemsManagementDetail',
    },
    EDIT: {
      PATH: '/wms/task-management/:id/edit',
      TITLE: 'constructionItemsManagementEdit',
    },
  },
  SOURCE_MANAGEMENT: {
    LIST: {
      PATH: '/wms/source-management',
      TITLE: 'sourceManagement',
    },
    CREATE: {
      PATH: '/wms/source-management/create',
      TITLE: 'sourceManagementCreate',
    },
    DETAIL: {
      PATH: '/wms/source-management/:id/detail',
      TITLE: 'sourceManagementDetail',
    },
    EDIT: {
      PATH: '/wms/source-management/:id/edit',
      TITLE: 'sourceManagementEdit',
    },
  },
  REASON_MANAGEMENT: {
    LIST: {
      PATH: '/wms/reason-management',
      TITLE: 'reasonManagement',
    },
    CREATE: {
      PATH: '/wms/reason-management/create',
      TITLE: 'reasonManagementCreate',
    },
    DETAIL: {
      PATH: '/wms/reason-management/:id/detail',
      TITLE: 'reasonManagementDetail',
    },
    EDIT: {
      PATH: '/wms/reason-management/:id/edit',
      TITLE: 'reasonManagementEdit',
    },
  },
  DEFINE_UOM: {
    LIST: {
      PATH: '/wms/define-uom',
      TITLE: 'defineUom',
    },
    CREATE: {
      PATH: '/wms/define-uom/create',
      TITLE: 'defineUomCreate',
    },
    DETAIL: {
      PATH: '/wms/define-uom/:id/detail',
      TITLE: 'defineUomDetail',
    },
    EDIT: {
      PATH: '/wms/define-uom/:id/edit',
      TITLE: 'defineUomEdit',
    },
  },
  BUSINESS_TYPE_MANAGEMENT: {
    LIST: {
      PATH: '/wms/business-type-management',
      TITLE: 'businessTypeManagement',
    },
    CREATE: {
      PATH: '/wms/business-type-management/create',
      TITLE: 'businessTypeManagementCreate',
    },
    DETAIL: {
      PATH: '/wms/business-type-management/:id/detail',
      TITLE: 'businessTypeManagementDetail',
    },
    EDIT: {
      PATH: '/wms/business-type-management/:id/edit',
      TITLE: 'businessTypeManagementEdit',
    },
  },
  DEFINE_OBJECT_CATEGORY: {
    LIST: {
      PATH: '/wms/define-object-category',
      TITLE: 'defineObjectCategory',
    },
    CREATE: {
      PATH: '/wms/define-object-category/create',
      TITLE: 'defineObjectCategoryCreate',
    },
    DETAIL: {
      PATH: '/wms/define-object-category/:id/detail',
      TITLE: 'defineObjectCategoryDetail',
    },
    EDIT: {
      PATH: '/wms/define-object-category/:id/edit',
      TITLE: 'defineObjectCategoryEdit',
    },
  },
  DEFINE_MATERIAL_CATEGORY: {
    LIST: {
      PATH: '/wms/define-material-category',
      TITLE: 'defineMaterialCategory',
    },
    CREATE: {
      PATH: '/wms/define-material-category/create',
      TITLE: 'defineMaterialCategoryCreate',
    },
    DETAIL: {
      PATH: '/wms/define-material-category/:id/detail',
      TITLE: 'defineMaterialCategoryDetail',
    },
    EDIT: {
      PATH: '/wms/define-material-category/:id/edit',
      TITLE: 'defineMaterialCategoryEdit',
    },
  },
  DEFINE_MATERIAL_QUALITY: {
    LIST: {
      PATH: '/wms/define-material-quality',
      TITLE: 'defineMaterialQuality',
    },
    CREATE: {
      PATH: '/wms/define-material-quality/create',
      TITLE: 'defineMaterialQualityCreate',
    },
    DETAIL: {
      PATH: '/wms/define-material-quality/:id/detail',
      TITLE: 'defineMaterialQualityDetail',
    },
    EDIT: {
      PATH: '/wms/define-material-quality/:id/edit',
      TITLE: 'defineMaterialQualityEdit',
    },
  },
  DEFINE_PRODUCING_COUNTRY: {
    LIST: {
      PATH: '/wms/define-producing-country',
      TITLE: 'defineProducingCountry',
    },
    CREATE: {
      PATH: '/wms/define-producing-country/create',
      TITLE: 'defineProducingCountryCreate',
    },
    DETAIL: {
      PATH: '/wms/define-producing-country/:id/detail',
      TITLE: 'defineProducingCountryDetail',
    },
    EDIT: {
      PATH: '/wms/define-producing-country/:id/edit',
      TITLE: 'defineProducingCountryEdit',
    },
  },
  DEFINE_VENDOR: {
    LIST: {
      PATH: '/wms/define-supplier',
      TITLE: 'defineVendor',
    },
    CREATE: {
      PATH: '/wms/define-supplier/create',
      TITLE: 'defineVendorCreate',
    },
    EDIT: {
      PATH: '/wms/define-supplier/:id/edit',
      TITLE: 'defineVendorEdit',
    },
    DETAIL: {
      PATH: '/wms/define-supplier/:id/detail',
      TITLE: 'defineVendorDetail',
    },
  },
  WAREHOUSE_MANAGEMENT: {
    TITLE: 'warehouseManagement',
  },
  DEFINE_WAREHOUSE: {
    LIST: {
      PATH: '/wms/define-warehouse',
      TITLE: 'defineWarehouse',
    },
    CREATE: {
      PATH: '/wms/define-warehouse/create',
      TITLE: 'defineWarehouseCreate',
    },
    EDIT: {
      PATH: '/wms/define-warehouse/:id/edit',
      TITLE: 'defineWarehouseEdit',
    },
    DETAIL: {
      PATH: '/wms/define-warehouse/:id/detail',
      TITLE: 'defineWarehouseDetail',
    },
  },
  LOCATION_MANAGEMENT: {
    LIST: {
      PATH: '/wms/location-management',
      TITLE: 'locationManagement',
    },
    CREATE: {
      PATH: '/wms/location-management/create',
      TITLE: 'locationManagementCreate',
    },
    EDIT: {
      PATH: '/wms/location-management/:id/edit',
      TITLE: 'locationManagementEdit',
    },
    DETAIL: {
      PATH: '/wms/location-management/:id/detail',
      TITLE: 'locationManagementDetail',
    },
  },
  DEFINE_WAREHOUSE_GROUP: {
    LIST: {
      PATH: '/wms/define-warehouse-group',
      TITLE: 'defineWarehouseGroup',
    },
    CREATE: {
      PATH: '/wms/define-warehouse-group/create',
      TITLE: 'defineWarehouseGroupCreate',
    },
    EDIT: {
      PATH: '/wms/define-warehouse-group/:id/edit',
      TITLE: 'defineWarehouseGroupEdit',
    },
    DETAIL: {
      PATH: '/wms/define-warehouse-group/:id/detail',
      TITLE: 'defineWarehouseGroupDetail',
    },
  },
  DEFINE_ASSEMBLY: {
    LIST: {
      PATH: '/wms/define-assembly',
      TITLE: 'defineAssembly',
    },
    CREATE: {
      PATH: '/wms/define-assembly/create',
      TITLE: 'defineAssemblyCreate',
    },
    EDIT: {
      PATH: '/wms/define-assembly/:id/edit',
      TITLE: 'defineAssemblyEdit',
    },
    DETAIL: {
      PATH: '/wms/define-assembly/:id/detail',
      TITLE: 'defineAssemblyDetail',
    },
  },
  DEFINE_SHELF: {
    LIST: {
      PATH: '/wms/define-shelf',
      TITLE: 'defineShelf',
    },
    CREATE: {
      PATH: '/wms/define-shelf/create',
      TITLE: 'defineShelfCreate',
    },
    EDIT: {
      PATH: '/wms/define-shelf/:id/edit',
      TITLE: 'defineShelfEdit',
    },
    DETAIL: {
      PATH: '/wms/define-shelf/:id/detail',
      TITLE: 'defineShelfDetail',
    },
  },
  DEFINE_DRAWER: {
    LIST: {
      PATH: '/wms/define-drawer',
      TITLE: 'defineDrawer',
    },
    CREATE: {
      PATH: '/wms/define-drawer/create',
      TITLE: 'defineDrawerCreate',
    },
    EDIT: {
      PATH: '/wms/define-drawer/:id/edit',
      TITLE: 'defineDrawerEdit',
    },
    DETAIL: {
      PATH: '/wms/define-drawer/:id/detail',
      TITLE: 'defineDrawerDetail',
    },
  },
  DEFINE_BIN: {
    LIST: {
      PATH: '/wms/define-bin',
      TITLE: 'defineBin',
    },
    CREATE: {
      PATH: '/wms/define-bin/create',
      TITLE: 'defineBinCreate',
    },
    EDIT: {
      PATH: '/wms/define-bin/:id/edit',
      TITLE: 'defineBinEdit',
    },
    DETAIL: {
      PATH: '/wms/define-bin/:id/detail',
      TITLE: 'defineBinDetail',
    },
  },
  INVENTORY_SETTING: {
    LIST: {
      PATH: '/wms/inventory-setting',
      TITLE: 'inventorySetting',
    },
    CREATE: {
      PATH: '/wms/inventory-setting/create',
      TITLE: 'inventorySettingCreate',
    },
    EDIT: {
      PATH: '/wms/inventory-setting/:id/edit',
      TITLE: 'inventorySettingEdit',
    },
    DETAIL: {
      PATH: '/wms/inventory-setting/:id/detail',
      TITLE: 'inventorySettingDetail',
    },
  },
  DEFINE_EXPENDITURE_ORG: {
    LIST: {
      PATH: '/wms/define-expenditure-org',
      TITLE: 'defineExpenditureOrg',
    },
    CREATE: {
      PATH: '/wms/define-expenditure-org/create',
      TITLE: 'defineExpenditureOrgCreate',
    },
    EDIT: {
      PATH: '/wms/define-expenditure-org/:id/edit',
      TITLE: 'defineExpenditureOrgEdit',
    },
    DETAIL: {
      PATH: '/wms/define-expenditure-org/:id/detail',
      TITLE: 'defineExpenditureOrgDetail',
    },
  },
  DEFINE_EXPENDITURE_TYPE: {
    LIST: {
      PATH: '/wms/define-expenditure-type',
      TITLE: 'defineExpenditureType',
    },
    CREATE: {
      PATH: '/wms/define-expenditure-type/create',
      TITLE: 'defineExpenditureTypeCreate',
    },
    EDIT: {
      PATH: '/wms/define-expenditure-type/:id/edit',
      TITLE: 'defineExpenditureTypeEdit',
    },
    DETAIL: {
      PATH: '/wms/define-expenditure-type/:id/detail',
      TITLE: 'defineExpenditureTypeDetail',
    },
  },
  SET_STORAGE_PERIOD: {
    LIST: {
      PATH: '/wms/set-storage-period',
      TITLE: 'setStoragePeriod',
    },
    CREATE: {
      PATH: '/wms/set-storage-period/create',
      TITLE: 'setStoragePeriodCreate',
    },
    EDIT: {
      PATH: '/wms/set-storage-period/:id/edit',
      TITLE: 'setStoragePeriodEdit',
    },
    DETAIL: {
      PATH: '/wms/set-storage-period/:id/detail',
      TITLE: 'setStoragePeriodDetail',
    },
  },
  MATERIAL_MANAGEMENT: {
    LIST: {
      PATH: '/wms/material-management',
      TITLE: 'materialManagement',
    },
    CREATE: {
      PATH: '/wms/material-management/create',
      TITLE: 'materialManagementCreate',
    },
    EDIT: {
      PATH: '/wms/material-management/:id/edit',
      TITLE: 'materialManagementEdit',
    },
    DETAIL: {
      PATH: '/wms/material-management/:id/detail',
      TITLE: 'materialManagementDetail',
    },
    EDIT_WAREHOUSE_SOURCE: {
      PATH: '/wms/material-management/:id/edit-warehouse-source',
      TITLE: 'materialManagementEditWarehouseSource',
    },
  },
  SETTING: {
    TITLE: 'setting',
  },
  QR_CODE: {
    PATH: '/wms/qr-code',
    TITLE: 'qrCode',
  },
  SIGNATURE_CONFIGURATION: {
    PATH: '/wms/signature-configuration',
    TITLE: 'signatureConfiguration',
  },
  RECEIPT_COMMAND_MANAGEMENT: {
    TITLE: 'receiptCommandManagement',
  },
  RECEIPT_MANAGEMENT: {
    LIST: {
      PATH: '/wms/receipt-management',
      TITLE: 'receiptManagement',
    },
    DETAIL: {
      PATH: '/wms/receipt-management/:id/detail',
      TITLE: 'receiptManagementDetail',
    },
  },
  WAREHOUSE_EXPORT_RECEIPT: {
    LIST: {
      PATH: '/wms/warehouse-export-receipt',
      TITLE: 'warehouseExportReceipt',
    },
    CREATE: {
      PATH: '/wms/warehouse-export-receipt/create',
      TITLE: 'warehouseExportReceiptCreate',
    },
    EDIT: {
      PATH: '/wms/warehouse-export-receipt/:id/edit',
      TITLE: 'warehouseExportReceiptEdit',
    },
    DETAIL: {
      PATH: '/wms/warehouse-export-receipt/:id/detail',
      TITLE: 'warehouseExportReceiptDetail',
    },
  },
  WAREHOUSE_IMPORT_RECEIPT: {
    LIST: {
      PATH: '/wms/warehouse-import-receipt',
      TITLE: 'warehouseImportReceipt',
    },
    CREATE: {
      PATH: '/wms/warehouse-import-receipt/create',
      TITLE: 'warehouseImportReceiptCreate',
    },
    EDIT: {
      PATH: '/wms/warehouse-import-receipt/:id/edit',
      TITLE: 'warehouseImportReceiptEdit',
    },
    DETAIL: {
      PATH: '/wms/warehouse-import-receipt/:id/detail',
      TITLE: 'warehouseImportReceiptDetail',
    },
  },
  WAREHOUSE_EXPORT: {
    LIST: {
      PATH: '/wms/warehouse-export',
      TITLE: 'warehouseExport',
    },
    DETAIL: {
      PATH: '/wms/warehouse-export/:id/detail',
      TITLE: 'warehouseExportDetail',
    },
  },
  WAREHOUSE_IMPORT: {
    LIST: {
      PATH: '/wms/warehouse-import',
      TITLE: 'warehouseImport',
    },
    DETAIL: {
      PATH: '/wms/warehouse-import/:id/detail',
      TITLE: 'movementsDetail',
    },
  },
  WAREHOUSE_REPORT_MANAGEMENT: {
    PATH: '/wms/warehouse-report-management',
    TITLE: 'warehouseReportManagement',
  },
  INVENTORY_STATISTICS: {
    PATH: '/wms/inventory-statistics',
    TITLE: 'inventoryStatistics',
  },
  INVENTORY_WARNING: {
    PATH: '/wms/inventory-warning',
    TITLE: 'inventoryWarning',
  },
  WAREHOUSE_EXPORT_PROPOSAL: {
    LIST: {
      PATH: '/wms/warehouse-export-proposal',
      TITLE: 'warehouseExportProposal',
    },
    CREATE: {
      PATH: '/wms/warehouse-export-proposal/create',
      TITLE: 'warehouseExportProposalCreate',
    },
    EDIT: {
      PATH: '/wms/warehouse-export-proposal/:id/edit',
      TITLE: 'warehouseExportProposalEdit',
    },
    DETAIL: {
      PATH: '/wms/warehouse-export-proposal/:id/detail',
      TITLE: 'warehouseExportProposalDetail',
    },
  },
  REPORT_STATISTICS: {
    TITLE: 'reportStatistics',
  },
  REPORT_EXPORT: {
    PATH: '/wms/report-export',
    TITLE: 'reportExport',
  },
  INVENTORY_CALENDAR: {
    LIST: {
      PATH: '/wms/inventory-calendar',
      TITLE: 'inventoryCalendar',
    },
    CREATE: {
      PATH: '/wms/inventory-calendar/create',
      TITLE: 'inventoryCalendarCreate',
    },
    EDIT: {
      PATH: '/wms/inventory-calendar/:id/edit',
      TITLE: 'inventoryCalendarEdit',
    },
    DETAIL: {
      PATH: '/wms/inventory-calendar/:id/detail',
      TITLE: 'inventoryCalendarDetail',
    },
    DETAIL_RECIPT: {
      PATH: '/wms/inventory-calendar/:id/detail-recipt',
      TITLE: 'inventorySheet',
    },
  },
  WAREHOUSE_TRANSFER: {
    LIST: {
      PATH: '/wms/warehouse-transfer',
      TITLE: 'warehouseTransfer',
    },
    CREATE: {
      PATH: '/wms/warehouse-transfer/create',
      TITLE: 'warehouseTransferCreate',
    },
    EDIT: {
      PATH: '/wms/warehouse-transfer/:id/edit',
      TITLE: 'warehouseTransferEdit',
    },
    DETAIL: {
      PATH: '/wms/warehouse-transfer/:id/detail',
      TITLE: 'warehouseTransferDetail',
    },
    PICKUP: {
      PATH: '/wms/warehouse-transfer/:id/pickup',
      TITLE: 'pickupAndWarehouseExport',
    },
    RECEIVE: {
      PATH: '/wms/warehouse-transfer/:id/receive',
      TITLE: 'receiveAndStored',
    },
  },
  USER_MANAGEMENT: {
    LIST: {
      PATH: '/wms/user-management',
      TITLE: 'userManagement',
    },
    CREATE: {
      PATH: '/wms/user-management/create',
      TITLE: 'userManagementCreate',
    },
    DETAIL: {
      PATH: '/wms/user-management/:id/detail',
      TITLE: 'userManagementDetail',
    },
    EDIT: {
      PATH: '/wms/user-management/:id/edit',
      TITLE: 'userManagementEdit',
    },
  },
  USER_PERMISSION: {
    PATH: '/wms/user-permission',
    TITLE: 'userPermission',
  },
  COMPANY_CUSTOMER_SETTING: {
    PATH: '/wms/company-customer-setting',
    TITLE: 'companyCustomerSetting',
  },
  COMPANY_CHART: {
    LIST: {
      PATH: '/wms/company-chart',
      TITLE: 'companyChart',
    },
  },
  DEPARTMENT_LIST: {
    LIST: {
      PATH: '/wms/department-list',
      TITLE: 'defineDepartment',
    },
    ASSIGN: {
      PATH: '/wms/department-list/:id/assign',
      TITLE: 'departmentAssign',
    },
  },
  ROLE_LIST: {
    LIST: {
      PATH: '/wms/role-list',
      TITLE: 'defineRole',
    },
    CREATE: {
      PATH: '/wms/role-list/create',
      TITLE: 'roleCreate',
    },
    DETAIL: {
      PATH: '/wms/role-list/:id/detail',
      TITLE: 'roleDetail',
    },
    EDIT: {
      PATH: '/wms/role-list/:id/edit',
      TITLE: 'roleEdit',
    },
  },
  DATA_SYNC_MANAGEMENT: {
    LIST: {
      PATH: '/wms/data-sync-management',
      TITLE: 'dataSyncManagement',
    },
  },
  ACCOUNT: {
    DETAIL: {
      PATH: '/wms/account',
      TITLE: 'userInfoDetail',
    },
    EDIT: {
      PATH: '/wms/account/edit',
      TITLE: 'userInfoEdit',
    },
    CHANGE_PASSWORD: {
      PATH: '/wms/account/change-password',
      TITLE: 'changePassword',
    },
  },
}
