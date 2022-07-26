import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'

import { ROUTE } from '../../routes/config'
import DeviceStatisticTable from './device-statistic'
import DeviceStatusTable from './device-status'

const DeviceStatusReport = () => {
  const { t } = useTranslation(['mmsx'])

  const { keyword, setKeyword } = useQueryState()
  const renderHeaderRight = () => {}
  const [valueTab, setValuesTab] = useState(0)

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'report',
      },
    ]
    switch (valueTab) {
      case 0:
        breadcrumb.push({
          route: ROUTE.DEVICE_STATUS_REPORT.STATISTICAL.PATH,
          title: ROUTE.DEVICE_STATUS_REPORT.STATISTICAL.TITLE,
        })
        break
      case 1:
        breadcrumb.push({
          route: ROUTE.DEVICE_STATUS_REPORT.LIST.PATH,
          title: ROUTE.DEVICE_STATUS_REPORT.LIST.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t('menu.deviceStatusReport')}
      onSearch={setKeyword}
      placeholder={t('reportDevice.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
    >
      <Tabs
        list={[t('menu.deviceStatistic'), t('menu.deviceStatusReport')]}
        onChange={(value) => setValuesTab(value)}
      >
        {/* tab 1 */}
        <DeviceStatusTable keyword={keyword} />
        {/* tab 2 */}
        <DeviceStatisticTable keyword={keyword} />
      </Tabs>
    </Page>
  )
}

export default DeviceStatusReport
