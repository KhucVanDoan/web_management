import { all } from 'redux-saga/effects'

import watchGetAllFactoryList from './common/get-all-factory-list'
import watchGetAllItemUnit from './common/get-all-item-unit'
import watchGetListMaintenanceTeam from './common/get-maintencance-list'
import watchGetMo from './common/get-mo-list'
import watchGetResponsibleSubject from './common/get-responsible-subject'
import watchGetSummary from './dashboard'
import watchCreateTemplateInstall from './define-installation-template/create'
import watchDeleteTemplateInstall from './define-installation-template/delete'
import watchGetTemplateInstall from './define-installation-template/get-detail'
import watchSearchTemplateInstall from './define-installation-template/get-list'
import watchUpdateTemplateInstall from './define-installation-template/update'
import watchConfirmDeviceCategory from './device-category/confirm-device-category'
import watchCreateDeviceCategory from './device-category/create-device-category'
import watchDeleteDeviceCategory from './device-category/delete-device-category'
import watchGetAllConfirmDeviceCategory from './device-category/get-all-confirm-device-category'
import watchGetDetailDeviceCategory from './device-category/get-device-category'
import watchSearchDeviceCategory from './device-category/search-device-category'
import watchUpdateDeviceCategory from './device-category/update-device-category'
import watchCreateMaintenanceTeam from './maintenance-team/create-maintenance-team'
import watchDeleteMaintenanceTeam from './maintenance-team/delete-maintenance-team'
import watchGetAllUserItDepartment from './maintenance-team/get-all-user-it-department'
import watchGetDetailMaintenanceTeam from './maintenance-team/get-maintenance-team-detail'
import watchGetMaintenanceTeams from './maintenance-team/get-maintenance-teams'
import watchUpdateMaintenanceTeam from './maintenance-team/update-maintenance-team'
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
    watchGetMo(),
    watchGetResponsibleSubject(),
    watchGetAllItemUnit(),
    // Dashboard
    watchGetSummary(),
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
  ])
}
