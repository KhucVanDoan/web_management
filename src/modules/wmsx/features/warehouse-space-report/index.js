import React, { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import useWarehouseSpaceReport from '~/modules/wmsx/redux/hooks/useWarehouseSpaceReport'
import { ROUTE } from '~/modules/wmsx/routes/config'

import FilterForm from './filter-form'
import WarehouseSpaceTable from './table'

const breadcrumbs = [
  {
    title: 'warehouseManagement',
  },
  {
    route: ROUTE.WAREHOUSE_SPACE_REPORT.PATH,
    title: ROUTE.WAREHOUSE_SPACE_REPORT.TITLE,
  },
]

const warehouseSetting = () => {
  const {
    data: { warehouseSpace, isLoading },
    actions,
  } = useWarehouseSpaceReport()
  const { t } = useTranslation(['wmsx'])

  useEffect(() => {
    actions.getDataWarehouseSpaceReport(null)
  }, [])

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('menu.importExportData')}
          onExport={() => {}}
          disabled
        />
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseSpaceReport')}
      placeholder={t('warehouseSpaceReport.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <FilterForm />
      <WarehouseSpaceTable data={warehouseSpace || []} />
    </Page>
  )
}

export default warehouseSetting
