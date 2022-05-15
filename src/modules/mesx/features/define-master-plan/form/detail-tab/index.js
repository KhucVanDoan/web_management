import React from 'react'

import { useTranslation } from 'react-i18next'

import Tabs from '~/components/Tabs'

import ItemsDetailTable from '../items-detail-table'
import PlanDetail from '../plan-detail-form'

const DetailTab = (props) => {
  const { t } = useTranslation(['mesx'])

  return (
    <Tabs
      list={[
        t('defineMasterPlan.itemDetailTabTitle'),
        // t('defineMasterPlan.planDetailTabTitle'),
      ]}
      sx={{ mt: 3 }}
    >
      {/* Tab 1 */}
      <ItemsDetailTable
        soId={props.soId}
        planDate={props.planDate}
        isView={props.isView}
        isUpdate={props.isUpdate}
        updateSaleOrderObject={props.updateSaleOrderObject}
      />

      {/* Tab 2 */}
      {!props.isDetail && <PlanDetail />}
    </Tabs>
  )
}

export default DetailTab
