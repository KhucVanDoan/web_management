import BomProducingStepDetail from '~/modules/mesx/features/bom-operation/detail'
import BomProducingStepForm from '~/modules/mesx/features/bom-operation/form'
import BomProducingStep from '~/modules/mesx/features/bom-operation/list'
import Calendar from '~/modules/mesx/features/calendar'
import CalendarCreate from '~/modules/mesx/features/calendar/createCalendar'
import Dashboard from '~/modules/mesx/features/dashboard'
import detailBOM from '~/modules/mesx/features/define-bom/detail'
import BOMForm from '~/modules/mesx/features/define-bom/form'
import DefineBOM from '~/modules/mesx/features/define-bom/list'
import BOQDetail from '~/modules/mesx/features/define-boq/detail'
import BOQForm from '~/modules/mesx/features/define-boq/form'
import DefineBOQ from '~/modules/mesx/features/define-boq/list'
import DefineCompany from '~/modules/mesx/features/define-company'
import DefineCompanyDetail from '~/modules/mesx/features/define-company/company-detail'
import DefineCompanyForm from '~/modules/mesx/features/define-company/company-form'
import DefineCustomer from '~/modules/mesx/features/define-customer'
import DefineCustomerDetail from '~/modules/mesx/features/define-customer/customer-detail'
import DefineCustomerForm from '~/modules/mesx/features/define-customer/customer-form'
import DefineFactory from '~/modules/mesx/features/define-factory'
import DefineFactoryDetail from '~/modules/mesx/features/define-factory/factory-detail'
import DefineFactoryForm from '~/modules/mesx/features/define-factory/factory-form'
import DefineItem from '~/modules/mesx/features/define-item'
import DefineItemDetail from '~/modules/mesx/features/define-item/item-detail'
import DefineItemForm from '~/modules/mesx/features/define-item/item-form'
import DefineMasterPlanForm from '~/modules/mesx/features/define-master-plan/form'
import DefineMasterPlan from '~/modules/mesx/features/define-master-plan/list'
import AutoModeration from '~/modules/mesx/features/define-master-plan/moderation/auto-moderation'
import InputModeration from '~/modules/mesx/features/define-master-plan/moderation/input-moderation'
import DefinePlan from '~/modules/mesx/features/define-plan'
import DefinePlanForm from '~/modules/mesx/features/define-plan/form'
import DetailScheduleForm from '~/modules/mesx/features/detail-schedule/form'
import DetailSchedule from '~/modules/mesx/features/detail-schedule/list'
import InventoryLimit from '~/modules/mesx/features/inventory-limit'
import ItemGroupSetting from '~/modules/mesx/features/item-group-setting'
import ItemGroupDetail from '~/modules/mesx/features/item-group-setting/item-group-detail'
import ItemGroupForm from '~/modules/mesx/features/item-group-setting/item-group-form'
import ItemTypeSetting from '~/modules/mesx/features/item-type-setting'
import ItemTypeDetail from '~/modules/mesx/features/item-type-setting/item-type-detail'
import ItemTypeForm from '~/modules/mesx/features/item-type-setting/item-type-form'
import ItemUnitSetting from '~/modules/mesx/features/item-unit-setting'
import ItemUnitDetail from '~/modules/mesx/features/item-unit-setting/item-unit-detail'
import ItemUnitForm from '~/modules/mesx/features/item-unit-setting/item-unit-form'
import MaterialDetailPlan from '~/modules/mesx/features/material-detail-plan'
import MaterialReport from '~/modules/mesx/features/material-report'
import MoForm from '~/modules/mesx/features/mo/form'
import Mo from '~/modules/mesx/features/mo/list'
import PlanReport from '~/modules/mesx/features/plan-report'
import ProducingStep from '~/modules/mesx/features/producing-steps'
import ProducingStepDetail from '~/modules/mesx/features/producing-steps/detail'
import ProducingStepForm from '~/modules/mesx/features/producing-steps/form'
import ProductivityReport from '~/modules/mesx/features/productivity-report'
import QualityReport from '~/modules/mesx/features/quality-report'
import RequestBuyMaterialDetail from '~/modules/mesx/features/request-buy-material/detail'
import RequestBuyMaterialForm from '~/modules/mesx/features/request-buy-material/form'
import RequestBuyMaterial from '~/modules/mesx/features/request-buy-material/list'
import RoutingDetail from '~/modules/mesx/features/routing/detail'
import RoutingForm from '~/modules/mesx/features/routing/form'
import Routing from '~/modules/mesx/features/routing/list'
import SaleOrderDetail from '~/modules/mesx/features/sale-order/detail'
import SaleOrderForm from '~/modules/mesx/features/sale-order/form'
import SaleOrder from '~/modules/mesx/features/sale-order/list'
import SOExportForm from '~/modules/mesx/features/so-export/form'
import SOExport from '~/modules/mesx/features/so-export/list'
import UserManagement from '~/modules/mesx/features/user-management'
import UserManagementDetail from '~/modules/mesx/features/user-management/user-detail'
import UserManagementForm from '~/modules/mesx/features/user-management/user-form'
import UserPermission from '~/modules/mesx/features/user-permission'
import WorkCenterForm from '~/modules/mesx/features/work-center/form'
import WorkCenter from '~/modules/mesx/features/work-center/list'

import detailSchedule from '../features/detail-schedule/detail'
import PriceReport from '../features/price-report'
import PriceDetail from '../features/price-report/price-detail'
import ProductivityCompareReport from '../features/productivity-compare-report'
import DetailWorkCenterPlan from '../features/work-center-plan/form-detail'
import WorkCenterPlanList from '../features/work-center-plan/list'
import FormDetail from '../features/work-center/form-detail'
import { ROUTE } from './config'

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
        name: ROUTE.MASTER_PLAN.LIST.TITLE,
        path: ROUTE.MASTER_PLAN.LIST.PATH,
        component: DefineMasterPlan,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.MASTER_PLAN.CREATE.TITLE,
            path: ROUTE.MASTER_PLAN.CREATE.PATH,
            component: DefineMasterPlanForm,
            pathActive: ROUTE.MASTER_PLAN.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.MASTER_PLAN.DETAIL.TITLE,
            path: ROUTE.MASTER_PLAN.DETAIL.PATH,
            component: DefineMasterPlanForm,
            pathActive: ROUTE.MASTER_PLAN.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.MASTER_PLAN.EDIT.TITLE,
            path: ROUTE.MASTER_PLAN.EDIT.PATH,
            component: DefineMasterPlanForm,
            pathActive: ROUTE.MASTER_PLAN.EDIT.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.MASTER_PLAN.AUTO_MODERATION.TITLE,
            path: ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH,
            component: AutoModeration,
            isInSidebar: false,
            subMenu: [],
          },
          {
            name: ROUTE.MASTER_PLAN.INPUT_MODERATION.TITLE,
            path: ROUTE.MASTER_PLAN.INPUT_MODERATION.PATH,
            component: InputModeration,
            isInSidebar: false,
            subMenu: [],
          },
        ],
      },
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
            component: BOQDetail,
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
      // {
      //   name: ROUTE.WORK_ORDER.TITLE,
      //   path: ROUTE.WORK_ORDER.PATH,
      //   component: WorkOrder,
      //   isInSidebar: true,
      //   subMenu: [
      //     {
      //       name: ROUTE.WORK_ORDER_CREATE.TITLE,
      //       path: ROUTE.WORK_ORDER_CREATE.PATH,
      //       pathActive: ROUTE.WORK_ORDER_CREATE.PATH,
      //       component: WorkOderForm,
      //       isInSidebar: false,
      //     },
      //     {
      //       name: ROUTE.WORK_ORDER_DETAIL.TITLE,
      //       path: ROUTE.WORK_ORDER_DETAIL.PATH,
      //       pathActive: ROUTE.WORK_ORDER_DETAIL.PATH,
      //       component: WorkOderForm,
      //       isInSidebar: false,
      //     },
      //     {
      //       name: ROUTE.WORK_ORDER_EDIT.TITLE,
      //       path: ROUTE.WORK_ORDER_EDIT.PATH,
      //       pathActive: ROUTE.WORK_ORDER_EDIT.PATH,
      //       component: WorkOderForm,
      //       isInSidebar: false,
      //     },
      //   ],
      // },
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
            component: detailSchedule,
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
            component: RequestBuyMaterialDetail,
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
      {
        name: ROUTE.WORK_CENTER_PLAN.LIST.TITLE,
        path: ROUTE.WORK_CENTER_PLAN.LIST.PATH,
        component: WorkCenterPlanList,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.WORK_CENTER_PLAN.DETAIL.TITLE,
            path: ROUTE.WORK_CENTER_PLAN.DETAIL.PATH,
            component: DetailWorkCenterPlan,
            pathActive: ROUTE.WORK_CENTER_PLAN.DETAIL.PATH,
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
        name: ROUTE.ITEM_GROUP.LIST.TITLE,
        path: ROUTE.ITEM_GROUP.LIST.PATH,
        component: ItemGroupSetting,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.ITEM_GROUP.CREATE.TITLE,
            path: ROUTE.ITEM_GROUP.CREATE.PATH,
            component: ItemGroupForm,
            pathActive: ROUTE.ITEM_GROUP.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.ITEM_GROUP.DETAIL.TITLE,
            path: ROUTE.ITEM_GROUP.DETAIL.PATH,
            component: ItemGroupDetail,
            pathActive: ROUTE.ITEM_GROUP.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.ITEM_GROUP.EDIT.TITLE,
            path: ROUTE.ITEM_GROUP.EDIT.PATH,
            component: ItemGroupForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.ITEM_TYPE.LIST.TITLE,
        path: ROUTE.ITEM_TYPE.LIST.PATH,
        component: ItemTypeSetting,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.ITEM_TYPE.CREATE.TITLE,
            path: ROUTE.ITEM_TYPE.CREATE.PATH,
            component: ItemTypeForm,
            pathActive: ROUTE.ITEM_TYPE.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.ITEM_TYPE.EDIT.TITLE,
            path: ROUTE.ITEM_TYPE.EDIT.PATH,
            component: ItemTypeForm,
            pathActive: ROUTE.ITEM_TYPE.EDIT.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.ITEM_TYPE.DETAIL.TITLE,
            path: ROUTE.ITEM_TYPE.DETAIL.PATH,
            component: ItemTypeDetail,
            pathActive: ROUTE.ITEM_TYPE.DETAIL.PATH,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.ITEM_UNIT.LIST.TITLE,
        path: ROUTE.ITEM_UNIT.LIST.PATH,
        component: ItemUnitSetting,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.ITEM_UNIT.CREATE.TITLE,
            path: ROUTE.ITEM_UNIT.CREATE.PATH,
            component: ItemUnitForm,
            pathActive: ROUTE.ITEM_UNIT.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.ITEM_UNIT.DETAIL.TITLE,
            path: ROUTE.ITEM_UNIT.DETAIL.PATH,
            component: ItemUnitDetail,
            pathActive: ROUTE.DEFINE_BOQ.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.ITEM_UNIT.EDIT.TITLE,
            path: ROUTE.ITEM_UNIT.EDIT.PATH,
            component: ItemUnitForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_ITEM.LIST.TITLE,
        path: ROUTE.DEFINE_ITEM.LIST.PATH,
        component: DefineItem,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_ITEM.CREATE.TITLE,
            path: ROUTE.DEFINE_ITEM.CREATE.PATH,
            component: DefineItemForm,
            pathActive: ROUTE.DEFINE_ITEM.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_ITEM.EDIT.TITLE,
            path: ROUTE.DEFINE_ITEM.EDIT.PATH,
            component: DefineItemForm,
            pathActive: ROUTE.DEFINE_ITEM.EDIT.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_ITEM.DETAIL.TITLE,
            path: ROUTE.DEFINE_ITEM.DETAIL.PATH,
            component: DefineItemDetail,
            pathActive: ROUTE.DEFINE_ITEM.DETAIL.PATH,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_FACTORY.LIST.TITLE,
        path: ROUTE.DEFINE_FACTORY.LIST.PATH,
        component: DefineFactory,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_FACTORY.CREATE.TITLE,
            path: ROUTE.DEFINE_FACTORY.CREATE.PATH,
            pathActive: ROUTE.DEFINE_FACTORY.CREATE.PATH,
            component: DefineFactoryForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_FACTORY.DETAIL.TITLE,
            path: ROUTE.DEFINE_FACTORY.DETAIL.PATH,
            pathActive: ROUTE.DEFINE_FACTORY.DETAIL.PATH,
            component: DefineFactoryDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_FACTORY.EDIT.TITLE,
            path: ROUTE.DEFINE_FACTORY.EDIT.PATH,
            pathActive: ROUTE.DEFINE_FACTORY.EDIT.PATH,
            component: DefineFactoryForm,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_COMPANY.LIST.TITLE,
        path: ROUTE.DEFINE_COMPANY.LIST.PATH,
        component: DefineCompany,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_COMPANY.CREATE.TITLE,
            path: ROUTE.DEFINE_COMPANY.CREATE.PATH,
            pathActive: ROUTE.DEFINE_COMPANY.CREATE.PATH,
            component: DefineCompanyForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_COMPANY.DETAIL.TITLE,
            path: ROUTE.DEFINE_COMPANY.DETAIL.PATH,
            pathActive: ROUTE.DEFINE_COMPANY.DETAIL.PATH,
            component: DefineCompanyDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_COMPANY.EDIT.TITLE,
            path: ROUTE.DEFINE_COMPANY.EDIT.PATH,
            pathActive: ROUTE.DEFINE_COMPANY.EDIT.PATH,
            component: DefineCompanyForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.DEFINE_CUSTOMER.LIST.TITLE,
        path: ROUTE.DEFINE_CUSTOMER.LIST.PATH,
        component: DefineCustomer,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_CUSTOMER.CREATE.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.CREATE.PATH,
            pathActive: ROUTE.DEFINE_CUSTOMER.CREATE.PATH,
            component: DefineCustomerForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CUSTOMER.DETAIL.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.DETAIL.PATH,
            pathActive: ROUTE.DEFINE_CUSTOMER.DETAIL.PATH,
            component: DefineCustomerDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CUSTOMER.EDIT.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.EDIT.PATH,
            pathActive: ROUTE.DEFINE_CUSTOMER.EDIT.PATH,
            component: DefineCustomerForm,
            isInSidebar: false,
          },
        ],
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
            component: SaleOrderDetail,
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
            component: FormDetail,
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
    name: 'producingInfo',
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
            component: ProducingStepDetail,
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
            component: BomProducingStepDetail,
            pathActive: ROUTE.BOM_PRODUCING_STEP.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.BOM_PRODUCING_STEP.EDIT.TITLE,
            path: ROUTE.BOM_PRODUCING_STEP.EDIT.PATH,
            component: BomProducingStepForm,
            pathActive: ROUTE.BOM_PRODUCING_STEP.EDIT.PATH,
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
            component: detailBOM,
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
        name: ROUTE.ROUTING.LIST.TITLE,
        path: ROUTE.ROUTING.LIST.PATH,
        component: Routing,
        isInSidebar: true,

        subMenu: [
          {
            name: ROUTE.ROUTING.CREATE.TITLE,
            path: ROUTE.ROUTING.CREATE.PATH,
            pathActive: ROUTE.ROUTING.CREATE.PATH,
            component: RoutingForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROUTING.DETAIL.TITLE,
            path: ROUTE.ROUTING.DETAIL.PATH,
            pathActive: ROUTE.ROUTING.DETAIL.PATH,
            component: RoutingDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROUTING.EDIT.TITLE,
            path: ROUTE.ROUTING.EDIT.PATH,
            pathActive: ROUTE.ROUTING.EDIT.PATH,
            component: RoutingForm,
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
        name: ROUTE.PRICE_REPORT.LIST.TITLE,
        path: ROUTE.PRICE_REPORT.LIST.PATH,
        component: PriceReport,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.PRICE_REPORT.DETAIL.TITLE,
            path: ROUTE.PRICE_REPORT.DETAIL.PATH,
            component: PriceDetail,
            isInSidebar: true,
          },
        ],
      },

      {
        name: ROUTE.PRODUCTIVITY_REPORT.TITLE,
        path: ROUTE.PRODUCTIVITY_REPORT.PATH,
        component: ProductivityReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.PRODUCTIVITY_COMPARE_REPORT.TITLE,
        path: ROUTE.PRODUCTIVITY_COMPARE_REPORT.PATH,
        component: ProductivityCompareReport,
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
        name: ROUTE.USER_MANAGEMENT.LIST.TITLE,
        path: ROUTE.USER_MANAGEMENT.LIST.PATH,
        component: UserManagement,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.USER_MANAGEMENT.CREATE.TITLE,
            path: ROUTE.USER_MANAGEMENT.CREATE.PATH,
            component: UserManagementForm,
            pathActive: ROUTE.USER_MANAGEMENT.CREATE.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.USER_MANAGEMENT.DETAIL.TITLE,
            path: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
            component: UserManagementDetail,
            pathActive: ROUTE.USER_MANAGEMENT.DETAIL.PATH,
            isInSidebar: false,
          },
          {
            name: ROUTE.USER_MANAGEMENT.EDIT.TITLE,
            path: ROUTE.USER_MANAGEMENT.EDIT.PATH,
            component: UserManagementForm,
            isInSidebar: false,
          },
        ],
      },
      {
        name: ROUTE.USER_PERMISSION.TITLE,
        path: ROUTE.USER_PERMISSION.PATH,
        component: UserPermission,
        isInSidebar: true,
      },
      {
        name: 'inventoryLimit',
        path: '/inventory-limit',
        component: InventoryLimit,
        isInSidebar: true,
      },
      {
        name: ROUTE.PLAN.CALENDAR.TITLE,
        path: ROUTE.PLAN.CALENDAR.PATH,
        component: Calendar,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.PLAN.CALENDAR.CREATE.TITLE,
            path: ROUTE.PLAN.CALENDAR.CREATE.PATH,
            component: CalendarCreate,
            pathActive: ROUTE.PLAN.CALENDAR.CREATE.PATH,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
