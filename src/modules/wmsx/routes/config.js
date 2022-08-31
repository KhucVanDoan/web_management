export const ROUTE = {
  DASHBOARD: {
    PATH: '/wmsx',
    TITLE: 'dashboard',
  },
  DATABASE: {
    PATH: '/wmsx',
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
}
