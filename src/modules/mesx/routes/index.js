import BomProducingStepDetail from '~/modules/mesx/features/bom-operation/detail'
import BomProducingStepForm from '~/modules/mesx/features/bom-operation/form'
import BomProducingStep from '~/modules/mesx/features/bom-operation/list'
import Calendar from '~/modules/mesx/features/calendar'
import CalendarCreate from '~/modules/mesx/features/calendar/setupFactoryCalendar/createFactoryCalendar'
import Dashboard from '~/modules/mesx/features/dashboard'
import detailBOM from '~/modules/mesx/features/define-bom/detail'
import BOMForm from '~/modules/mesx/features/define-bom/form'
import DefineBOM from '~/modules/mesx/features/define-bom/list'
import BOQDetail from '~/modules/mesx/features/define-boq/detail'
import BOQForm from '~/modules/mesx/features/define-boq/form'
import DefineBOQ from '~/modules/mesx/features/define-boq/list'
import DefineCustomer from '~/modules/mesx/features/define-customer'
import DefineCustomerDetail from '~/modules/mesx/features/define-customer/customer-detail'
import DefineCustomerForm from '~/modules/mesx/features/define-customer/customer-form'
import MasterPlanDetail from '~/modules/mesx/features/define-master-plan/detail'
import DefineMasterPlanForm from '~/modules/mesx/features/define-master-plan/form'
import DefineMasterPlan from '~/modules/mesx/features/define-master-plan/list'
import AutoModeration from '~/modules/mesx/features/define-master-plan/moderation/auto-moderation'
import InputModeration from '~/modules/mesx/features/define-master-plan/moderation/input-moderation'
import MaterialDetailPlan from '~/modules/mesx/features/material-detail-plan'
import MaterialReport from '~/modules/mesx/features/material-report'
import MoDetail from '~/modules/mesx/features/mo/detail'
import MoForm from '~/modules/mesx/features/mo/form'
import Mo from '~/modules/mesx/features/mo/list'
import PlanReport from '~/modules/mesx/features/plan-report'
import PriceReport from '~/modules/mesx/features/price-report'
import PriceDetail from '~/modules/mesx/features/price-report/price-detail'
import ProducingStep from '~/modules/mesx/features/producing-steps'
import ProducingStepDetail from '~/modules/mesx/features/producing-steps/detail'
import ProducingStepForm from '~/modules/mesx/features/producing-steps/form'
import ProductivityCompareReport from '~/modules/mesx/features/productivity-compare-report'
import ProductivityReport from '~/modules/mesx/features/productivity-report'
import QualityReport from '~/modules/mesx/features/quality-report'
import RequestBuyMaterialDetail from '~/modules/mesx/features/request-buy-material/detail'
import RequestBuyMaterialForm from '~/modules/mesx/features/request-buy-material/form'
import RequestBuyMaterial from '~/modules/mesx/features/request-buy-material/list'
import RoutingDetail from '~/modules/mesx/features/routing/detail'
import RoutingForm from '~/modules/mesx/features/routing/form'
import Routing from '~/modules/mesx/features/routing/list'
import DetailWorkCenterPlan from '~/modules/mesx/features/work-center-plan/form-detail'
import WorkCenterPlanList from '~/modules/mesx/features/work-center-plan/list'
import WorkCenterForm from '~/modules/mesx/features/work-center/form'
import FormDetail from '~/modules/mesx/features/work-center/form-detail'
import WorkCenter from '~/modules/mesx/features/work-center/list'
import workOrderDetail from '~/modules/mesx/features/work-order/detail'
import WorkOrder from '~/modules/mesx/features/work-order/list'

import { DetailJob } from '../features/define-master-plan/form/detail-job'
import ProgessDetailReport from '../features/progress-detail-report'
import progressManufacturingByOrder from '../features/progress-manufacturing-by-order'
import ProgressManufacturingByWorkCenter from '../features/progress-manufacturing-by-work-center'
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
    name: ROUTE.DATABASE.TITLE,
    icon: 'database',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.DEFINE_CUSTOMER.LIST.TITLE,
        path: ROUTE.DEFINE_CUSTOMER.LIST.PATH,
        component: DefineCustomer,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.DEFINE_CUSTOMER.CREATE.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.CREATE.PATH,
            component: DefineCustomerForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CUSTOMER.DETAIL.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.DETAIL.PATH,
            component: DefineCustomerDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_CUSTOMER.EDIT.TITLE,
            path: ROUTE.DEFINE_CUSTOMER.EDIT.PATH,
            component: DefineCustomerForm,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: 'producingInfo',
    icon: 'prettyBag',
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
            component: ProducingStepForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCING_STEP.DETAIL.TITLE,
            path: ROUTE.PRODUCING_STEP.DETAIL.PATH,
            component: ProducingStepDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.PRODUCING_STEP.EDIT.TITLE,
            path: ROUTE.PRODUCING_STEP.EDIT.PATH,
            component: ProducingStepForm,
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
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_CENTER.DETAIL.TITLE,
            path: ROUTE.WORK_CENTER.DETAIL.PATH,
            component: FormDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.WORK_CENTER.EDIT.TITLE,
            path: ROUTE.WORK_CENTER.EDIT.PATH,
            component: WorkCenterForm,
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
            component: RoutingForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROUTING.DETAIL.TITLE,
            path: ROUTE.ROUTING.DETAIL.PATH,
            component: RoutingDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.ROUTING.EDIT.TITLE,
            path: ROUTE.ROUTING.EDIT.PATH,
            component: RoutingForm,
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
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BOM.DETAIL.TITLE,
            path: ROUTE.DEFINE_BOM.DETAIL.PATH,
            component: detailBOM,
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BOM.EDIT.TITLE,
            path: ROUTE.DEFINE_BOM.EDIT.PATH,
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
            isInSidebar: false,
          },
          {
            name: ROUTE.BOM_PRODUCING_STEP.DETAIL.TITLE,
            path: ROUTE.BOM_PRODUCING_STEP.DETAIL.PATH,
            component: BomProducingStepDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.BOM_PRODUCING_STEP.EDIT.TITLE,
            path: ROUTE.BOM_PRODUCING_STEP.EDIT.PATH,
            component: BomProducingStepForm,
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
            isInSidebar: false,
          },
          {
            name: ROUTE.DEFINE_BOQ.DETAIL.TITLE,
            path: ROUTE.DEFINE_BOQ.DETAIL.PATH,
            component: BOQDetail,
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
    ],
  },
  {
    name: 'plan',
    icon: 'plan',
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
            isInSidebar: false,
          },
          {
            name: ROUTE.MASTER_PLAN.DETAIL.TITLE,
            path: ROUTE.MASTER_PLAN.DETAIL.PATH,
            component: MasterPlanDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.MASTER_PLAN.EDIT.TITLE,
            path: ROUTE.MASTER_PLAN.EDIT.PATH,
            component: DefineMasterPlanForm,
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
          {
            name: ROUTE.MASTER_PLAN.JOB_DETAIL.TITLE,
            path: ROUTE.MASTER_PLAN.JOB_DETAIL.PATH,
            component: DetailJob,
            isInSidebar: false,
            subMenu: [],
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
            name: ROUTE.REQUEST_BUY_MATERIAL.DETAIL.TITLE,
            path: ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH,
            component: RequestBuyMaterialDetail,
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
        name: ROUTE.MO.LIST.TITLE,
        path: ROUTE.MO.LIST.PATH,
        component: Mo,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.MO.CREATE.TITLE,
            path: ROUTE.MO.CREATE.PATH,
            component: MoForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.MO.EDIT.TITLE,
            path: ROUTE.MO.EDIT.PATH,
            component: MoForm,
            isInSidebar: false,
          },
          {
            name: ROUTE.MO.DETAIL.TITLE,
            path: ROUTE.MO.DETAIL.PATH,
            component: MoDetail,
            isInSidebar: false,
          },
          {
            name: ROUTE.MO.WORK_ORDER.TITLE,
            path: ROUTE.MO.WORK_ORDER.PATH,
            component: WorkOrder,
            isInSidebar: false,
          },
          {
            name: ROUTE.MO.WORK_ORDER_DETAIL.TITLE,
            path: ROUTE.MO.WORK_ORDER_DETAIL.PATH,
            component: workOrderDetail,
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
            isInSidebar: false,
          },
        ],
      },
    ],
  },
  {
    name: 'report',
    icon: 'key',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.PLAN_REPORT.TITLE,
        path: ROUTE.PLAN_REPORT.PATH,
        component: PlanReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.QUALITY_REPORTS.LIST.TITLE,
        path: ROUTE.QUALITY_REPORTS.LIST.PATH,
        component: QualityReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.PRODUCTIVITY_REPORT.TITLE,
        path: ROUTE.PRODUCTIVITY_REPORT.PATH,
        component: ProductivityReport,
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
        name: ROUTE.PRODUCTIVITY_COMPARE_REPORT.LIST.TITLE,
        path: ROUTE.PRODUCTIVITY_COMPARE_REPORT.LIST.PATH,
        component: ProductivityCompareReport,
        isInSidebar: true,
      },
      {
        name: ROUTE.PROGRESS_DETAIL_REPORT.TITLE,
        path: ROUTE.PROGRESS_DETAIL_REPORT.PATH,
        component: ProgessDetailReport,
        isInSidebar: true,
      },
    ],
  },
  {
    name: 'statistical',
    icon: 'key',
    isInSidebar: true,
    subMenu: [
      {
        name: ROUTE.PROGRESS_MANUFACTURING_BY_ORDER.LIST.TITLE,
        path: ROUTE.PROGRESS_MANUFACTURING_BY_ORDER.LIST.PATH,
        component: progressManufacturingByOrder,
        isInSidebar: true,
      },
      {
        name: ROUTE.PROGRESS_MANUFACTURING_BY_WORK_CENTER.TITLE,
        path: ROUTE.PROGRESS_MANUFACTURING_BY_WORK_CENTER.PATH,
        component: ProgressManufacturingByWorkCenter,
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
        name: ROUTE.PLAN.CALENDAR.TITLE,
        path: ROUTE.PLAN.CALENDAR.PATH,
        component: Calendar,
        isInSidebar: true,
        subMenu: [
          {
            name: ROUTE.PLAN.CALENDAR.CREATE.TITLE,
            path: ROUTE.PLAN.CALENDAR.CREATE.PATH,
            component: CalendarCreate,
            isInSidebar: false,
          },
        ],
      },
    ],
  },
]

export default routes
