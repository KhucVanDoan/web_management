import { all } from 'redux-saga/effects'

import watchGetAllFactoryList from './common/get-all-factory-list'
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

    //maintenance-team
    watchCreateMaintenanceTeam(),
    watchDeleteMaintenanceTeam(),
    watchGetDetailMaintenanceTeam(),
    watchGetMaintenanceTeams(),
    watchUpdateMaintenanceTeam(),
    watchGetAllUserItDepartment(),
  ])
}
