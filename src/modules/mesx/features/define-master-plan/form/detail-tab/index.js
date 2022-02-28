import React, { useState } from 'react'

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import { useTranslation } from 'react-i18next'

import ItemsDetailTable from '../items-detail-table';
import PlanDetail from '../plan-detail-form';

const DetailTab = (props) => {
  const { t } = useTranslation(['mesx'])

  const [currentTab, setCurrentTab] = useState('itemsDetailTab')

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  }

  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChangeTab}>
          <Tab label={t('defineMasterPlan.itemDetailTabTitle')} value="itemsDetailTab" />
          <Tab label={t('defineMasterPlan.planDetailTabTitle')} value="planDetailTab" />
        </TabList>
      </Box>
      <TabPanel value="itemsDetailTab">
        <ItemsDetailTable soId={props.soId} planDate={props.planDate} />
      </TabPanel>
      <TabPanel value="planDetailTab">
        <PlanDetail />
      </TabPanel>
    </TabContext>
  )
}

export default DetailTab
