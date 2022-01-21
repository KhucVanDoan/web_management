import React from 'react'
import {
  Assessment,
  EventAvailable,
  Settings,
  Storage,
  AssignmentRounded,
} from '@mui/icons-material'
import { ROUTE } from './config'
import Dashboard from 'modules/mesx/features/dashboard'

import UserManagement from 'modules/mesx/features/user-management'
import DefineItem from 'modules/mesx/features/define-item'
import ItemGroupSetting from 'modules/mesx/features/item-group-setting'
import ItemUnitSetting from 'modules/mesx/features/item-unit-setting'
import ItemTypeSetting from 'modules/mesx/features/item-type-setting'
import DefinePlan from 'modules/mesx/features/define-plan'
import DefinePlanForm from 'modules/mesx/features/define-plan/form'
import Routing from 'modules/mesx/features/routing/list'
import RoutingForm from 'modules/mesx/features/routing/form'
import RoutingVersion from 'modules/mesx/features/routing/routing-version'
import ProducingStep from 'modules/mesx/features/producing-steps'
import ProducingStepForm from 'modules/mesx/features/producing-steps/form'
import DefineBOQ from 'modules/mesx/features/define-boq/list'
import BOQForm from 'modules/mesx/features/define-boq/form'
import DefineBOM from 'modules/mesx/features/define-bom/list'
import BOMForm from 'modules/mesx/features/define-bom/form'

import QualityReport from 'modules/mesx/features/quality-report'
import PlanReport from 'modules/mesx/features/plan-report'
import MaterialReport from 'modules/mesx/features/material-report'
import WorkOrder from 'modules/mesx/features/work-order/list'
import WorkOderForm from 'modules/mesx/features/work-order/form'

import WorkCenter from 'modules/mesx/features/work-center/list'
import WorkCenterForm from 'modules/mesx/features/work-center/form'
import Mo from 'modules/mesx/features/mo'
import MoForm from 'modules/mesx/features/mo/form'

import SaleOrder from 'modules/mesx/features/sale-order/list'
import SaleOrderForm from 'modules/mesx/features/sale-order/form'
import SOExport from 'modules/mesx/features/so-export/list'
import SOExportForm from 'modules/mesx/features/so-export/form'

import ProductivityReport from 'modules/mesx/features/productivity-report'

import DetailSchedule from 'modules/mesx/features/detail-schedule/list'
import DetailScheduleForm from 'modules/mesx/features/detail-schedule/form'

import MaterialDetailPlan from 'modules/mesx/features/material-detail-plan'

import RequestBuyMaterial from 'modules/mesx/features/request-buy-material/list'
import RequestBuyMaterialForm from 'modules/mesx/features/request-buy-material/form'
import InventoryLimit from 'modules/mesx/features/inventory-limit'

import BomProducingStep from 'modules/mesx/features/bom-operation/list'
import BomProducingStepForm from 'modules/mesx/features/bom-operation/form'

const routes = [
  {
    name: ROUTE.DASHBOARD.TITLE,
    path: ROUTE.DASHBOARD.PATH,
    component: Dashboard,
    icon: 'home',
    isInSidebar: true,
  },
  {
    name: 'plan',
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.PLAN.LIST.TITLE,
        path: ROUTE.PLAN.LIST.PATH,
        component: DefinePlan,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.PLAN.CREATE.TITLE,
            path: ROUTE.PLAN.CREATE.PATH,
            component: DefinePlanForm,
            pathActive: ROUTE.PLAN.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.PLAN.DETAILS.TITLE,
            path: ROUTE.PLAN.DETAILS.PATH,
            component: DefinePlanForm,
            pathActive: ROUTE.PLAN.DETAILS.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.PLAN.EDIT.TITLE,
            path: ROUTE.PLAN.EDIT.PATH,
            component: DefinePlanForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_BOQ.LIST.TITLE,
        path: ROUTE.DEFINE_BOQ.LIST.PATH,
        component: DefineBOQ,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_BOQ.CREATE.TITLE,
            path: ROUTE.DEFINE_BOQ.CREATE.PATH,
            component: BOQForm,
            pathActive: ROUTE.DEFINE_BOQ.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BOQ.DETAIL.TITLE,
            path: ROUTE.DEFINE_BOQ.DETAIL.PATH,
            component: BOQForm,
            pathActive: ROUTE.DEFINE_BOQ.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BOQ.EDIT.TITLE,
            path: ROUTE.DEFINE_BOQ.EDIT.PATH,
            component: BOQForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WORK_ORDER.TITLE,
        path: ROUTE.WORK_ORDER.PATH,
        component: WorkOrder,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WORK_ORDER_CREATE.TITLE,
            path: ROUTE.WORK_ORDER_CREATE.PATH,
            pathActive: ROUTE.WORK_ORDER_CREATE.PATH,
            component: WorkOderForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_ORDER_DETAIL.TITLE,
            path: ROUTE.WORK_ORDER_DETAIL.PATH,
            pathActive: ROUTE.WORK_ORDER_DETAIL.PATH,
            component: WorkOderForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_ORDER_EDIT.TITLE,
            path: ROUTE.WORK_ORDER_EDIT.PATH,
            pathActive: ROUTE.WORK_ORDER_EDIT.PATH,
            component: WorkOderForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.MO.LIST.TITLE,
        path: ROUTE.MO.LIST.PATH,
        component: Mo,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.MO.CREATE.TITLE,
            path: ROUTE.MO.CREATE.PATH,
            pathActive: ROUTE.MO.CREATE.PATH,
            component: MoForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.MO.EDIT.TITLE,
            path: ROUTE.MO.EDIT.PATH,
            pathActive: ROUTE.MO.EDIT.PATH,
            component: MoForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.MO.DETAIL.TITLE,
            path: ROUTE.MO.DETAIL.PATH,
            pathActive: ROUTE.MO.DETAIL.PATH,
            component: MoForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.MO.MOVEMENTS.TITLE,
            path: ROUTE.MO.MOVEMENTS.PATH,
            pathActive: ROUTE.MO.MOVEMENTS.PATH,
            component: MoForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DETAIL_SCHEDULE.LIST.TITLE,
        path: ROUTE.DETAIL_SCHEDULE.LIST.PATH,
        component: DetailSchedule,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.DETAIL_SCHEDULE.CREATE.TITLE,
            path: ROUTE.DETAIL_SCHEDULE.CREATE.PATH,
            pathActive: ROUTE.DETAIL_SCHEDULE.CREATE.PATH,
            component: DetailScheduleForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DETAIL_SCHEDULE.EDIT.TITLE,
            path: ROUTE.DETAIL_SCHEDULE.EDIT.PATH,
            pathActive: ROUTE.DETAIL_SCHEDULE.EDIT.PATH,
            component: DetailScheduleForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DETAIL_SCHEDULE.DETAIL.TITLE,
            path: ROUTE.DETAIL_SCHEDULE.DETAIL.PATH,
            pathActive: ROUTE.DETAIL_SCHEDULE.DETAIL.PATH,
            component: DetailScheduleForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.MATERIAL_DETAIL_PLAN.TITLE,
        path: ROUTE.MATERIAL_DETAIL_PLAN.PATH,
        component: MaterialDetailPlan,
        isInSidebar: true,
      },
      {
        name: ROUTE.REQUEST_BUY_MATERIAL.LIST.TITLE,
        path: ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH,
        component: RequestBuyMaterial,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.REQUEST_BUY_MATERIAL.CREATE.TITLE,
            path: ROUTE.REQUEST_BUY_MATERIAL.CREATE.PATH,
            component: RequestBuyMaterialForm,
            pathActive: ROUTE.REQUEST_BUY_MATERIAL.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_BUY_MATERIAL.DETAIL.TITLE,
            path: ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH,
            component: RequestBuyMaterialForm,
            pathActive: ROUTE.DEFINE_BOQ.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.REQUEST_BUY_MATERIAL.EDIT.TITLE,
            path: ROUTE.REQUEST_BUY_MATERIAL.EDIT.PATH,
            component: RequestBuyMaterialForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: 'database',
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: 'itemGroupSetting',
        path: '/item-group-setting',
        component: ItemGroupSetting,
        isInSidebar: true,
      },
      {
        name: 'itemTypeSetting',
        path: '/item-type-setting',
        component: ItemTypeSetting,
        isInSidebar: true,
      },
      {
        name: 'itemUnitSetting',
        path: '/item-unit-setting',
        component: ItemUnitSetting,
        isInSidebar: true,
      },
      {
        name: 'itemDefine',
        path: '/item/create',
        component: DefineItem,
        isInSidebar: true,
      },
      {
        name: ROUTE.SALE_ORDER.LIST.TITLE,
        path: ROUTE.SALE_ORDER.LIST.PATH,
        component: SaleOrder,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SALE_ORDER.CREATE.TITLE,
            path: ROUTE.SALE_ORDER.CREATE.PATH,
            pathActive: ROUTE.SALE_ORDER.CREATE.PATH,
            component: SaleOrderForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SALE_ORDER.DETAILS.TITLE,
            path: ROUTE.SALE_ORDER.DETAILS.PATH,
            pathActive: ROUTE.SALE_ORDER.DETAILS.PATH,
            component: SaleOrderForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SALE_ORDER.EDIT.TITLE,
            path: ROUTE.SALE_ORDER.EDIT.PATH,
            pathActive: ROUTE.SALE_ORDER.EDIT.PATH,
            component: SaleOrderForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.SO_EXPORT.LIST.TITLE,
        path: ROUTE.SO_EXPORT.LIST.PATH,
        component: SOExport,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.SO_EXPORT.CREATE.TITLE,
            path: ROUTE.SO_EXPORT.CREATE.PATH,
            pathActive: ROUTE.SO_EXPORT.CREATE.PATH,
            component: SOExportForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.SO_EXPORT.DETAILS.TITLE,
            path: ROUTE.SO_EXPORT.DETAILS.PATH,
            pathActive: ROUTE.SO_EXPORT.DETAILS.PATH,
            component: SOExportForm,
            isInSidebar: false,
            subMenu: [
              {
                name: ROUTE.SO_EXPORT.MOVEMENTS.TITLE,
                path: ROUTE.SO_EXPORT.MOVEMENTS.PATH + '/:id',
                pathActive: ROUTE.SO_EXPORT.MOVEMENTS.PATH,
                isInSidebar: false,
              },
            ],
          },
          {
            name: ROUTE.SO_EXPORT.EDIT.TITLE,
            path: ROUTE.SO_EXPORT.EDIT.PATH,
            pathActive: ROUTE.SO_EXPORT.EDIT.PATH,
            component: SOExportForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: 'routingDefine',
        path: ROUTE.ROUTING.PATH,
        component: Routing,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.ROUTING_CREATE.TITLE,
            path: ROUTE.ROUTING_CREATE.PATH,
            pathActive: ROUTE.ROUTING_CREATE.PATH,
            component: RoutingForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROUTING_DETAILS.TITLE,
            path: ROUTE.ROUTING_DETAILS.PATH,
            pathActive: ROUTE.ROUTING_DETAILS.PATH,
            component: RoutingForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROUTING_EDIT.TITLE,
            path: ROUTE.ROUTING_EDIT.PATH,
            pathActive: ROUTE.ROUTING_EDIT.PATH,
            component: RoutingForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROUTING_VERSION.TITLE,
            path: ROUTE.ROUTING_VERSION.PATH,
            pathActive: ROUTE.ROUTING_VERSION.PATH,
            component: RoutingVersion,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_BOM.LIST.TITLE,
        path: ROUTE.DEFINE_BOM.LIST.PATH,
        component: DefineBOM,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.DEFINE_BOM.CREATE.TITLE,
            path: ROUTE.DEFINE_BOM.CREATE.PATH,
            component: BOMForm,
            pathActive: ROUTE.DEFINE_BOM.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BOM.DETAIL.TITLE,
            path: ROUTE.DEFINE_BOM.DETAIL.PATH,
            component: BOMForm,
            pathActive: ROUTE.DEFINE_BOM.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BOM.EDIT.TITLE,
            path: ROUTE.DEFINE_BOM.EDIT.PATH,
            pathActive: ROUTE.DEFINE_BOM.EDIT.PATH,
            component: BOMForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.BOM_PRODUCING_STEP.LIST.TITLE,
        path: ROUTE.BOM_PRODUCING_STEP.LIST.PATH,
        component: BomProducingStep,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.BOM_PRODUCING_STEP.CREATE.TITLE,
            path: ROUTE.BOM_PRODUCING_STEP.CREATE.PATH,
            component: BomProducingStepForm,
            pathActive: ROUTE.BOM_PRODUCING_STEP.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.BOM_PRODUCING_STEP.DETAIL.TITLE,
            path: ROUTE.BOM_PRODUCING_STEP.DETAIL.PATH,
            component: BomProducingStepForm,
            pathActive: ROUTE.BOM_PRODUCING_STEP.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.BOM_PRODUCING_STEP.EDIT.TITLE,
            path: ROUTE.BOM_PRODUCING_STEP.EDIT.PATH,
            pathActive: ROUTE.BOM_PRODUCING_STEP.EDIT.PATH,
            component: BomProducingStepForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.WORK_CENTER.LIST.TITLE,
        path: ROUTE.WORK_CENTER.LIST.PATH,
        component: WorkCenter,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WORK_CENTER.CREATE.TITLE,
            path: ROUTE.WORK_CENTER.CREATE.PATH,
            component: WorkCenterForm,
            pathActive: ROUTE.WORK_CENTER.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_CENTER.DETAIL.TITLE,
            path: ROUTE.WORK_CENTER.DETAIL.PATH,
            component: WorkCenterForm,
            pathActive: ROUTE.WORK_CENTER.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_CENTER.EDIT.TITLE,
            path: ROUTE.WORK_CENTER.EDIT.PATH,
            pathActive: ROUTE.WORK_CENTER.EDIT.PATH,
            component: WorkCenterForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: 'defineWorkCenter',
    icon: 'home',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.PRODUCING_STEP.LIST.TITLE,
        path: ROUTE.PRODUCING_STEP.LIST.PATH,
        component: ProducingStep,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.PRODUCING_STEP.CREATE.TITLE,
            path: ROUTE.PRODUCING_STEP.CREATE.PATH,
            pathActive: ROUTE.WAREHOUSE_REPORT.CREATE.PATH,
            component: ProducingStepForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCING_STEP.DETAIL.TITLE,
            path: ROUTE.PRODUCING_STEP.DETAIL.PATH,
            pathActive: ROUTE.PRODUCING_STEP.DETAIL.PATH,
            component: ProducingStepForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCING_STEP.EDIT.TITLE,
            path: ROUTE.PRODUCING_STEP.EDIT.PATH,
            pathActive: ROUTE.PRODUCING_STEP.EDIT.PATH,
            component: ProducingStepForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    icon: 'home',
    name: 'report',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.QUALITY_REPORTS.LIST.TITLE,
        path: ROUTE.QUALITY_REPORTS.LIST.PATH,
        component: QualityReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.PLAN_REPORT.TITLE,
        path: ROUTE.PLAN_REPORT.PATH,
        component: PlanReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.MATERIAL_REPORT.TITLE,
        path: ROUTE.MATERIAL_REPORT.PATH,
        component: MaterialReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.PRODUCTIVITY_REPORT.TITLE,
        path: ROUTE.PRODUCTIVITY_REPORT.PATH,
        component: ProductivityReport,
        isInSidebar: true,
      },
    ],
  },
  {
    icon: 'setting',
    name: 'setting',
    isInSidebar: true,
    subMenu: [
      {
        name: 'userManagement',
        path: '/user-management',
        component: UserManagement,
        isInSidebar: true,
      },
      {
        name: 'permission',
        path: '/user-permission',
        component: () => <h1>permission</h1>,
        isInSidebar: true,
      },
      {
        name: 'inventoryLimit',
        path: '/inventory-limit',
        component: InventoryLimit,
        isInSidebar: true,
      },
    ],
  },
]

export default routes
