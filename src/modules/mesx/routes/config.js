export const ROUTE = {
  DASHBOARD: {
    PATH: '/mesx',
    TITLE: 'dashboard',
  },
  DATABASE: {
    PATH: '/mesx/database',
    TITLE: 'database',
  },
  ITEM_TYPE: {
    LIST: {
      PATH: '/mesx/item-type-setting',
      TITLE: 'itemTypeSetting',
    },
    CREATE: {
      PATH: '/mesx/item-type-setting/create',
      TITLE: 'itemTypeCreate',
    },
    DETAIL: {
      PATH: '/mesx/item-type-setting/:id/detail',
      TITLE: 'itemTypeDetail',
    },
    EDIT: {
      PATH: '/mesx/item-type-setting/:id/edit',
      TITLE: 'itemTypeEdit',
    },
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
  ROUTING_VERSION: {
    PATH: '/mesx/routings/:id/routing-version',
    TITLE: 'routingVersion',
  },
  PURCHASED_ORDER_MOVEMENTS: {
    PATH: '/mesx/production-management/purchased-order/movements',
    TITLE: 'purchasedOrderMovement',
  },
  SALE_ORDER: {
    LIST: {
      PATH: '/mesx/sale-orders',
      TITLE: 'saleOrderDefine',
    },
    CREATE: {
      PATH: '/mesx/sale-order/create',
      TITLE: 'saleOrderCreate',
    },
    DETAILS: {
      PATH: '/mesx/sale-order/:id/detail',
      TITLE: 'saleOrderDetails',
    },
    EDIT: {
      PATH: '/mesx/sale-order/:id/edit',
      TITLE: 'saleOrderEdit',
    },
  },
  SALE_ORDER_MOVEMENTS: {
    PATH: '/mesx/production-management/sale-order/movements',
    TITLE: 'saleOrderMovement',
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
    MOVEMENTS: {
      PATH: '/mesx/mo/movements',
      TITLE: 'moMovement',
    },
  },
  INVENTORY_CALENDAR: {
    PATH: '/mesx/production-management/inventory-calendars',
    TITLE: 'inventoryCalendarDefine',
  },
  INVENTORY_CALENDAR_CREATE: {
    PATH: '/mesx/production-management/inventory-calendar/create',
    TITLE: 'inventoryCalendarCreate',
  },
  INVENTORY_CALENDAR_DETAILS: {
    PATH: '/mesx/production-management/inventory-calendar/details',
    TITLE: 'inventoryCalendarDetails',
  },
  INVENTORY_CALENDAR_EDIT: {
    PATH: '/mesx/production-management/inventory-calendar/edit',
    TITLE: 'inventoryCalendarEdit',
  },
  INVENTORY_CALENDAR_MOVEMENTS: {
    PATH: '/mesx/production-management/inventory-calendar/movements',
    TITLE: 'inventoryCalendarMovement',
  },
  WAREHOUSE_TRANSFER: {
    PATH: '/mesx/warehouse-transfers',
    TITLE: 'defineWarehouseTransfer',
  },
  WAREHOUSE_TRANSFER_CREATE: {
    PATH: '/mesx/warehouse-transfer/create',
    TITLE: 'defineWarehouseTransferCreate',
  },
  WAREHOUSE_TRANSFER_DETAILS: {
    PATH: '/mesx/warehouse-transfer/details',
    TITLE: 'defineWarehouseTransferDetails',
  },
  WAREHOUSE_TRANSFER_EDIT: {
    PATH: '/mesx/warehouse-transfer/edit',
    TITLE: 'defineWarehouseTransferEdit',
  },
  WAREHOUSE_TRANSFER_MOVEMENTS: {
    PATH: '/mesx/warehouse-transfer-movements',
    TITLE: 'warehouseTransferMovement',
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
  DEFINE_FACTORY: {
    LIST: {
      PATH: '/mesx/define-factory',
      TITLE: 'defineFactory',
    },
    CREATE: {
      PATH: '/mesx/define-factory/create',
      TITLE: 'defineFactoryCreate',
    },
    DETAIL: {
      PATH: '/mesx/define-factory/:id/detail',
      TITLE: 'defineFactoryDetail',
    },
    EDIT: {
      PATH: '/mesx/define-factory/:id/edit',
      TITLE: 'defineFactoryEdit',
    },
  },
  DEFINE_COMPANY: {
    LIST: {
      PATH: '/mesx/define-company',
      TITLE: 'defineCompany',
    },
    CREATE: {
      PATH: '/mesx/define-company/create',
      TITLE: 'defineCompanyCreate',
    },
    DETAIL: {
      PATH: '/mesx/define-company/:id/detail',
      TITLE: 'defineCompanyDetail',
    },
    EDIT: {
      PATH: '/mesx/define-company/:id/edit',
      TITLE: 'defineCompanyEdit',
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
    CREATE: {
      PATH: '/mesx/request-buy-material/create',
      TITLE: 'requestBuyMaterialCreate',
    },
    DETAIL: {
      PATH: '/mesx/request-buy-material/:id/detail',
      TITLE: 'requestBuyMaterialDetails',
    },
    EDIT: {
      PATH: '/mesx/request-buy-material/:id/edit',
      TITLE: 'requestBuyMaterialEdit',
    },
    MOVEMENTS: {
      PATH: '/mesx/request-buy-material/movements',
      TITLE: 'requestBuyMaterialMovement',
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
    WORK_ORDER: {
      PATH: '/mesx/bom/work-order',
      TITLE: 'bomWorkOrder',
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
  WORK_ORDER: {
    PATH: '/mesx/work-order',
    TITLE: 'workOrder',
  },
  WORK_ORDER_CREATE: {
    PATH: '/mesx/work-order/create',
    TITLE: 'workOrderCreate',
  },
  WORK_ORDER_DETAIL: {
    PATH: '/mesx/work-order/:id/detail',
    TITLE: 'workOrderDetail',
  },
  WORK_ORDER_EDIT: {
    PATH: '/mesx/work-order/:id/edit',
    TITLE: 'workOrderEdit',
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
  SO_EXPORT: {
    LIST: {
      PATH: '/mesx/so-export',
      TITLE: 'saleOrderExport',
    },
    CREATE: {
      PATH: '/mesx/so-export/create',
      TITLE: 'saleOrderExportCreate',
    },
    DETAILS: {
      PATH: '/mesx/so-export/:id/detail',
      TITLE: 'saleOrderExportDetail',
    },
    EDIT: {
      PATH: '/mesx/so-export/:id/edit',
      TITLE: 'saleOrderExportEdit',
    },
    MOVEMENTS: {
      PATH: '/mesx/so-export/movements',
      TITLE: 'saleOrderExportMovement',
    },
  },
  MATERIAL_REPORT: {
    PATH: '/mesx/material-report',
    TITLE: 'materialReport',
  },
  PRODUCTIVITY_REPORT: {
    PATH: '/mesx/productivity-report',
    TITLE: 'productivityReport',
  },
  DETAIL_SCHEDULE: {
    LIST: {
      PATH: '/mesx/detail-schedule',
      TITLE: 'detailSchedule',
    },
    CREATE: {
      PATH: '/mesx/detail-schedule/create',
      TITLE: 'detailScheduleCreate',
    },
    DETAIL: {
      PATH: '/mesx/detail-schedule/:id/detail',
      TITLE: 'detailScheduleDetail',
    },
    EDIT: {
      PATH: '/mesx/detail-schedule/:id/edit',
      TITLE: 'detailScheduleEdit',
    },
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
  ITEM_UNIT: {
    LIST: {
      PATH: '/mesx/item-unit-define',
      TITLE: 'itemUnitDefine',
    },
    CREATE: {
      PATH: '/mesx/item-unit-define/create',
      TITLE: 'itemUnitCreate',
    },
    DETAIL: {
      PATH: '/mesx/item-unit-define/:id/detail',
      TITLE: 'itemUnitDetail',
    },
    EDIT: {
      PATH: '/mesx/item-unit-define/:id/edit',
      TITLE: 'itemUnitEdit',
    },
  },
}
