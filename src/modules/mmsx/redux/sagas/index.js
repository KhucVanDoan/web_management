import { all } from 'redux-saga/effects'

import watchCreateAtributeMaintenance from './attribute-maintain/create-attribute-maintain'
import watchDeleteAttributeMaintenance from './attribute-maintain/delete-attribute-maintain'
import watchGetDetailAttributeMaintenance from './attribute-maintain/get-attribute-maintain'
import watchSearchAttributeMaintenance from './attribute-maintain/search-attribute-maintain'
import watchUpdateAttributeMaintenance from './attribute-maintain/update-attribute-maintain'
import watchGetAttributeTypeList from './attribute-type/search-attribute-type-list'
import watchGetAttributeMaintain from './common/get-all-attribute-maintain'
import watchGetAllDevice from './common/get-all-device'
import watchGetAllFactoryList from './common/get-all-factory-list'
import watchGetAllItemUnit from './common/get-all-item-unit'
import watchGetAllSuppliesConfirm from './common/get-all-supplies-confirm'
import watchGetAllUser from './common/get-all-user'
import watchGetAllWorkCenter from './common/get-all-work-center'
import watchGetListMaintenanceTeam from './common/get-maintencance-list'
import watchGetMo from './common/get-mo-list'
import watchGetResponsibleSubject from './common/get-responsible-subject'
import watchGetUsingDeviceAssign from './common/get-using-devide-assign'
import watchGetVendors from './common/get-vendors'
import watchGetSummary from './dashboard'
import watchCreateDefect from './defect-list/create-defect'
import watchDeleteDefect from './defect-list/delete-defect'
import watchGetDefect from './defect-list/get-defect'
import watchSearchDefectList from './defect-list/search-defect-list'
import watchUpdateDefect from './defect-list/update-defect'
import watchConfirmDevice from './define-device/confirm-device-by-id'
import watchCreateDevice from './define-device/create-device'
import watchDeleteDevice from './define-device/delete-device-by-id'
import watchGetDeviceDetailById from './define-device/get-detail-by-id'
import watchSearchDevice from './define-device/search-device-list'
import watchUpdateDevice from './define-device/update-device-by-id'
import watchCreateTemplateInstall from './define-installation-template/create'
import watchDeleteTemplateInstall from './define-installation-template/delete'
import watchGetTemplateInstall from './define-installation-template/get-detail'
import watchUpdateTemplateInstall from './define-installation-template/update'
import watchConfirmDeviceCategory from './device-category/confirm-device-category'
import watchCreateDeviceCategory from './device-category/create-device-category'
import watchDeleteDeviceCategory from './device-category/delete-device-category'
import watchGetAllConfirmDeviceCategory from './device-category/get-all-confirm-device-category'
import watchGetDetailDeviceCategory from './device-category/get-device-category'
import watchSearchDeviceCategory from './device-category/search-device-category'
import watchUpdateDeviceCategory from './device-category/update-device-category'
import watchGetDeviceStatistic from './device-status-report/get-device-statistic'
import watchGetDeviceStatus from './device-status-report/get-device-status'
import watchGetjobDetail from './job/job-detail'
import watchGetJobList from './job/job-list'
import watchSearchJobList from './job/search-job'
import watchUpdatePlan from './job/update-job'
import watchConfirmMaintainRequest from './maintain-request/confirm-maintain-request'
import watchGetMaintainRequestDetail from './maintain-request/get-maintain-request-detail'
import watchGetMaintainRequest from './maintain-request/get-maintain-request-list'
import watchRejectMaintainRequest from './maintain-request/reject-maintain-request'
import watchGetReportProgress from './maintainance-progress/get-maintainance-progress'
import watchCreateMaintenanceTeam from './maintenance-team/create-maintenance-team'
import watchDeleteMaintenanceTeam from './maintenance-team/delete-maintenance-team'
import watchGetAllUserItDepartment from './maintenance-team/get-all-user-it-department'
import watchGetDetailMaintenanceTeam from './maintenance-team/get-maintenance-team-detail'
import watchGetMaintenanceTeams from './maintenance-team/get-maintenance-teams'
import watchUpdateMaintenanceTeam from './maintenance-team/update-maintenance-team'
import watchGetPlanList from './plan-list/get-plan-list'
import watchChangeStatusRequestDevice from './request-device/change-status-request-device'
import watchChangeStatusReturnDevice from './request-device/change-status-return-device'
import watchCreateRequestDevice from './request-device/create-request-device'
import watchCreateReturnDevice from './request-device/create-return-device'
import watchDeleteRequestDevice from './request-device/delete-request-device'
import watchDeleteReturnDevice from './request-device/delete-return-device'
import watchGetRequestDeviceDetail from './request-device/get-request-device-detail'
import watchGetReturnDeviceDetail from './request-device/get-return-device-detail'
import watchSearchRequestDevice from './request-device/search-request-device'
import watchUpdateRequestDeviceDetail from './request-device/update-request-device-detail'
import watchUpdateReturnDeviceDetail from './request-device/update-return-device-detail'
import watchConfirmSuppliesCategory from './supplies-category/confirm-supplies-category'
import watchCreateSuppliesCategory from './supplies-category/create-supplies-category'
import watchDeleteSuppliesCategory from './supplies-category/delete-supplies-category'
import watchGetAllConfirmSuppliesCategory from './supplies-category/get-all-confirm-supplies-category'
import watchGetSuppliesCategoryDetail from './supplies-category/get-supplies-category-detail'
import watchSearchSuppliesCategory from './supplies-category/search-supplies-category'
import watchUpdateSuppliesCategory from './supplies-category/update-supplies-category'
import watchConfirmSupplies from './supplies/confirm-supplies'
import watchCreateSupplies from './supplies/create-supplies'
import watchDeleteSupplies from './supplies/delete-supplies'
import watchGetDetailSupplies from './supplies/get-supplies'
import watchSearchSuppliesList from './supplies/search-supplies'
import watchUpdateSupplies from './supplies/update-supplies'
import watchCreateTemplateChecklist from './template-checklist/create-template-checklist'
import watchDeleteTemplateChecklist from './template-checklist/delete-template-checklist'
import watchGetTemplateChecklist from './template-checklist/get-template-checklist'
import watchSearchTemplateChecklist from './template-checklist/search-template-checklist'
import watchUpdateTemplateChecklist from './template-checklist/update-template-checklist'
import watchSearchTemplateInstall from './template-install/get-list'
import watchConfirmWarning from './warning-system/confirm'
import watchGetWarningDetail from './warning-system/detail'
import watchGetWarningList from './warning-system/get-warning-list'
import watchRejectWarning from './warning-system/reject'
import watchSearchWarningList from './warning-system/search-warning'
/**
 * Root saga
 */
export default function* sagas() {
  yield all([
    //Common
    watchGetAllFactoryList(),
    watchGetListMaintenanceTeam(),
    watchGetAllSuppliesConfirm(),
    watchGetAttributeMaintain(),
    watchGetResponsibleSubject(),
    watchGetVendors(),
    watchGetMo(),
    watchGetResponsibleSubject(),
    watchGetAllItemUnit(),
    watchGetAllDevice(),
    watchGetAllUser(),
    watchGetAllWorkCenter(),
    watchGetUsingDeviceAssign(),
    // Dashboard
    watchGetSummary(),
    // Database
    watchConfirmDevice(),
    watchCreateDevice(),
    watchDeleteDevice(),
    watchGetDeviceDetailById(),
    watchSearchDevice(),
    watchUpdateDevice(),
    watchGetAttributeTypeList(),
    watchSearchTemplateInstall(),
    watchSearchDeviceCategory(),
    //warning system
    watchConfirmWarning(),
    watchGetWarningDetail(),
    watchGetWarningList(),
    watchRejectWarning(),
    watchSearchWarningList(),
    //define-installation-templte
    watchCreateTemplateInstall(),
    watchDeleteTemplateInstall(),
    watchGetTemplateInstall(),
    watchSearchTemplateInstall(),
    watchUpdateTemplateInstall(),
    //device category
    watchConfirmDeviceCategory(),
    watchCreateDeviceCategory(),
    watchDeleteDeviceCategory(),
    watchGetAllConfirmDeviceCategory(),
    watchGetDetailDeviceCategory(),
    watchSearchDeviceCategory(),
    watchUpdateDeviceCategory(),
    //define supplies
    watchConfirmSupplies(),
    watchCreateSupplies(),
    watchDeleteSupplies(),
    watchGetDetailSupplies(),
    watchSearchSuppliesList(),
    watchUpdateSupplies(),

    //maintenance-team
    watchCreateMaintenanceTeam(),
    watchDeleteMaintenanceTeam(),
    watchGetDetailMaintenanceTeam(),
    watchGetMaintenanceTeams(),
    watchUpdateMaintenanceTeam(),
    watchGetAllUserItDepartment(),

    //supplies-category
    watchCreateSuppliesCategory(),
    watchDeleteSuppliesCategory(),
    watchGetSuppliesCategoryDetail(),
    watchSearchSuppliesCategory(),
    watchUpdateSuppliesCategory(),
    watchConfirmSuppliesCategory(),
    watchGetAllConfirmSuppliesCategory(),

    // request-device
    watchChangeStatusRequestDevice(),
    watchChangeStatusReturnDevice(),
    watchCreateRequestDevice(),
    watchCreateReturnDevice(),
    watchDeleteRequestDevice(),
    watchDeleteReturnDevice(),
    watchGetRequestDeviceDetail(),
    watchGetReturnDeviceDetail(),
    watchSearchRequestDevice(),
    watchUpdateRequestDeviceDetail(),
    watchUpdateReturnDeviceDetail(),

    //template-checklist
    watchCreateTemplateChecklist(),
    watchDeleteTemplateChecklist(),
    watchGetTemplateChecklist(),
    watchSearchTemplateChecklist(),
    watchUpdateTemplateChecklist(),

    //maintain-request
    watchConfirmMaintainRequest(),
    watchGetMaintainRequestDetail(),
    watchGetMaintainRequest(),
    watchRejectMaintainRequest(),

    //job
    watchGetjobDetail(),
    watchGetJobList(),
    watchSearchJobList(),
    watchUpdatePlan(),

    //maintainance-progress
    watchGetReportProgress(),

    //plan-list
    watchGetPlanList(),
    // defect-list
    watchCreateDefect(),
    watchDeleteDefect(),
    watchGetDefect(),
    watchSearchDefectList(),
    watchUpdateDefect(),
    //deveice-status-report
    watchGetDeviceStatistic(),
    watchGetDeviceStatus(),

    // attribute maintenance
    watchCreateAtributeMaintenance(),
    watchDeleteAttributeMaintenance(),
    watchGetDetailAttributeMaintenance(),
    watchSearchAttributeMaintenance(),
    watchUpdateAttributeMaintenance(),
  ])
}
