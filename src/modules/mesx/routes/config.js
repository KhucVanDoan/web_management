export const ROUTE = {
  DASHBOARD: {
    PATH: '/mesx',
    TITLE: 'dashboard',
  },
  DATABASE: {
    PATH: '/mesx/database',
    TITLE: 'database',
  },

  ROUTING: {
    LIST: {
      PATH: '/mesx/routing',
      TITLE: 'routing',
    },
    CREATE: {
      PATH: '/mesx/routing/create',
      TITLE: 'routingCreate',
    },
    DETAIL: {
      PATH: '/mesx/routing/:id/detail',
      TITLE: 'routingDetail',
    },
    EDIT: {
      PATH: '/mesx/routing/:id/edit',
      TITLE: 'routingEdit',
    },
  },

  PURCHASED_ORDER: {
    LIST: {
      PATH: '/mesx/purchased-order',
      TITLE: 'purchasedOrder',
    },
    CREATE: {
      PATH: '/mesx/purchased-order/create',
      TITLE: 'purchasedOrderCreate',
    },
    EDIT: {
      PATH: '/mesx/purchased-order/:id/edit',
      TITLE: 'purchasedOrderEdit',
    },
    DETAIL: {
      PATH: '/mesx/purchased-order/:id/detail',
      TITLE: 'purchasedOrderDetail',
    },
  },
  MO: {
    LIST: {
      PATH: '/mesx/mo',
      TITLE: 'moDefine',
    },
    CREATE: {
      PATH: '/mesx/mo/create',
      TITLE: 'moCreate',
    },
    DETAIL: {
      PATH: '/mesx/mo/:id/detail',
      TITLE: 'moDetail',
    },
    EDIT: {
      PATH: '/mesx/mo/:id/edit',
      TITLE: 'moEdit',
    },
    WORK_ORDER: {
      PATH: '/mesx/mo/work-order',
      TITLE: 'workOrder',
    },
    WORK_ORDER_DETAIL: {
      PATH: '/mesx/mo/work-order/:id/detail',
      TITLE: 'workOrderDetail',
    },
  },
  WAREHOUSE_REPORT: {
    LIST: {
      PATH: '/mesx/warehouse-report/list',
      TITLE: 'warehouseReportList',
    },
    CREATE: {
      PATH: '/mesx/warehouse-report/create',
      TITLE: 'warehouseReportCreate',
    },
    EDIT: {
      PATH: '/mesx/warehouse-report/edit',
      TITLE: 'warehouseReportEdit',
    },
    DETAILS: {
      PATH: '/mesx/warehouse-report/details',
      TITLE: 'warehouseReportDetails',
    },
  },
  PLAN: {
    LIST: {
      PATH: '/mesx/plan',
      TITLE: 'definePlan',
    },
    CREATE: {
      PATH: '/mesx/plan/create',
      TITLE: 'definePlanCreate',
    },
    EDIT: {
      PATH: '/mesx/plan/:id/edit',
      TITLE: 'definePlanEdit',
    },
    DETAILS: {
      PATH: '/mesx/plan/:id/detail',
      TITLE: 'definePlanDetail',
    },
    CALENDAR: {
      PATH: '/mesx/plan-calendar',
      TITLE: 'planCalendar',
      CREATE: {
        PATH: '/mesx/plan-calendar/create',
        TITLE: 'definedPlanCalendar',
      },
    },
  },
  PRODUCING_STEP: {
    LIST: {
      PATH: '/mesx/producing-step',
      TITLE: 'producingStepList',
    },
    CREATE: {
      PATH: '/mesx/producing-step/create',
      TITLE: 'producingStepCreate',
    },
    EDIT: {
      PATH: '/mesx/producing-step/:id/edit',
      TITLE: 'producingStepEdit',
    },
    DETAIL: {
      PATH: '/mesx/producing-step/:id/detail',
      TITLE: 'producingStepDetail',
    },
  },
  DEFINE_BOQ: {
    LIST: {
      PATH: '/mesx/boq',
      TITLE: 'boqDefine',
    },
    CREATE: {
      PATH: '/mesx/boq/create',
      TITLE: 'boqCreate',
    },
    DETAIL: {
      PATH: '/mesx/boq/:id/detail',
      TITLE: 'boqDetails',
    },
    EDIT: {
      PATH: '/mesx/boq/:id/edit',
      TITLE: 'boqEdit',
    },
    MOVEMENTS: {
      PATH: '/mesx/boq/movements',
      TITLE: 'boqMovement',
    },
  },

  DEFINE_CUSTOMER: {
    LIST: {
      PATH: '/mesx/define-customer',
      TITLE: 'defineCustomer',
    },
    CREATE: {
      PATH: '/mesx/define-customer/create',
      TITLE: 'defineCustomerCreate',
    },
    DETAIL: {
      PATH: '/mesx/define-customer/:id/detail',
      TITLE: 'defineCustomerDetail',
    },
    EDIT: {
      PATH: '/mesx/define-customer/:id/edit',
      TITLE: 'defineCustomerEdit',
    },
  },
  REQUEST_BUY_MATERIAL: {
    LIST: {
      PATH: '/mesx/request-buy-material',
      TITLE: 'requestBuyMaterial',
    },
    DETAIL: {
      PATH: '/mesx/request-buy-material/:id/detail',
      TITLE: 'requestBuyMaterialDetails',
    },
    EDIT: {
      PATH: '/mesx/request-buy-material/:id/edit',
      TITLE: 'requestBuyMaterialEdit',
    },
  },
  DEFINE_BOM: {
    LIST: {
      PATH: '/mesx/bom',
      TITLE: 'defineBOM',
    },
    CREATE: {
      PATH: '/mesx/bom/create',
      TITLE: 'bomCreate',
    },
    DETAIL: {
      PATH: '/mesx/bom/:id/detail',
      TITLE: 'bomDetail',
    },
    EDIT: {
      PATH: '/mesx/bom/:id/edit',
      TITLE: 'bomEdit',
    },
  },
  ITEM_GROUP: {
    LIST: {
      PATH: '/mesx/item-group-setting',
      TITLE: 'itemGroupDefine',
    },
    CREATE: {
      PATH: '/mesx/item-group-setting/create',
      TITLE: 'itemGroupCreate',
    },
    DETAIL: {
      PATH: '/mesx/item-group-setting/:id/detail',
      TITLE: 'itemGroupDetail',
    },
    EDIT: {
      PATH: '/mesx/item-group-setting/:id/edit',
      TITLE: 'itemGroupEdit',
    },
  },
  QUALITY_REPORTS: {
    LIST: {
      PATH: '/mesx/quality-report',
      TITLE: 'qualityReport',
    },
  },
  PLAN_REPORT: {
    PATH: '/mesx/plan-report',
    TITLE: 'planReport',
  },
  WORK_CENTER: {
    LIST: {
      PATH: '/mesx/work-center',
      TITLE: 'workCenter',
    },
    CREATE: {
      PATH: '/mesx/work-center/create',
      TITLE: 'workCenterCreate',
    },
    DETAIL: {
      PATH: '/mesx/work-center/:id/detail',
      TITLE: 'workCenterDetail',
    },
    EDIT: {
      PATH: '/mesx/work-center/:id/edit',
      TITLE: 'workCenterEdit',
    },
  },
  MATERIAL_REPORT: {
    PATH: '/mesx/material-report',
    TITLE: 'materialReport',
  },
  PRICE_REPORT: {
    LIST: {
      PATH: '/mesx/price-report',
      TITLE: 'priceReport',
    },
    DETAIL: {
      PATH: '/mesx/price-report/:id/detail',
      TITLE: 'priceDetail',
    },
  },
  PRODUCTIVITY_REPORT: {
    PATH: '/mesx/productivity-report',
    TITLE: 'productivityReport',
  },
  PROGRESS_DETAIL_REPORT: {
    PATH: '/mesx/progress-detail-report',
    TITLE: 'progressDetailReport',
  },
  MATERIAL_DETAIL_PLAN: {
    PATH: '/mesx/material-detail-plan',
    TITLE: 'materialDetailPlan',
  },
  BOM_PRODUCING_STEP: {
    LIST: {
      PATH: '/mesx/bom-producing-step',
      TITLE: 'bomProducingStep',
    },
    CREATE: {
      PATH: '/mesx/bom-producing-step/create',
      TITLE: 'bomProducingStepCreate',
    },
    DETAIL: {
      PATH: '/mesx/bom-producing-step/:id/detail',
      TITLE: 'bomProducingStepDetail',
    },
    EDIT: {
      PATH: '/mesx/bom-producing-step/:id/edit',
      TITLE: 'bomProducingStepEdit',
    },
  },
  QUALITY_REPORT: {
    LIST: {
      PATH: '/mesx/qualityreport',
      TITLE: 'qualityReport',
    },
  },
  MASTER_PLAN: {
    LIST: {
      PATH: '/mesx/master-plan',
      TITLE: 'masterPlanDefine',
    },
    CREATE: {
      PATH: '/mesx/master-plan/create',
      TITLE: 'masterPlanCreate',
    },
    DETAIL: {
      PATH: '/mesx/master-plan/:id/detail',
      TITLE: 'masterPlanDetail',
    },
    EDIT: {
      PATH: '/mesx/master-plan/:id/edit',
      TITLE: 'masterPlanEdit',
    },
    AUTO_MODERATION: {
      PATH: '/mesx/master-plan/:id/auto-moderation',
      TITLE: 'autoModeration',
    },
    INPUT_MODERATION: {
      PATH: '/mesx/master-plan/:id/input-moderation',
      TITLE: 'inputModeration',
    },
    JOB_DETAIL: {
      PATH: '/mesx/master-plan/:id/job-detail',
      TITLE: 'autoModeration',
    },
  },
  WORK_CENTER_PLAN: {
    LIST: {
      PATH: '/mesx/work-center-plan',
      TITLE: 'workCenterPlan',
    },
    DETAIL: {
      PATH: '/mesx/work-center-plan/detail',
      TITLE: 'detailWorkCenterPlan',
    },
  },
  PRODUCTIVITY_COMPARE_REPORT: {
    LIST: {
      PATH: '/mesx/productivity-compare-report',
      TITLE: 'productivityCompareReport',
    },
  },
  PROGRESS_MANUFACTURING_BY_WORK_CENTER: {
    PATH: '/mesx/progress-manufacturing-by-work-center',
    TITLE: 'progressManufacturingByWorkCenter',
  },
  PROGRESS_MANUFACTURING_BY_ORDER: {
    LIST: {
      PATH: '/mesx/progress-manufacturing-by-order',
      TITLE: 'progressManufacturingByOrder',
    },
  },
}
