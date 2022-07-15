import React from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'

import { ROUTE } from '../../routes/config'
import DeviceStatisticTable from './device-statistic'
import DeviceStatusTable from './device-status'

const breadcrumbs = [
  {
    title: 'report',
  },
  {
    route: ROUTE.DEVICE_STATUS_REPORT.LIST.PATH,
    title: ROUTE.DEVICE_STATUS_REPORT.LIST.TITLE,
  },
]
const DeviceStatusReport = () => {
  const { t } = useTranslation(['mmsx'])

  const { keyword, setKeyword } = useQueryState()
  const renderHeaderRight = () => {}
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.deviceStatusReport')}
      onSearch={setKeyword}
      placeholder={t('maintainRequest.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
    >
      <Tabs list={[t('menu.deviceStatistic'), t('menu.deviceStatusReport')]}>
        {/* tab 1 */}
        <DeviceStatusTable keyword={keyword} />
        {/* tab 2 */}
        <DeviceStatisticTable keyword={keyword} />
      </Tabs>
    </Page>
  )
}

export default DeviceStatusReport
