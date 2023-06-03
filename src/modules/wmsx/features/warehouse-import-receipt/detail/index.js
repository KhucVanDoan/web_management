import React from 'react'

import Page from '~/components/Page'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.LIST.TITLE,
  },
  {
    route: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.PATH,
    title: ROUTE.WAREHOUSE_IMPORT_RECEIPT.DETAIL.TITLE,
  },
]

function WarehouseImportReceiptDetail() {
  return (
    <Page
      breadcrumbs={breadcrumbs}
      // title={t('menu.warehouseImportReceiptDetail')}
      // onBack={backToList}
      // renderHeaderRight={renderHeaderRight}
      // loading={isLoading}
    ></Page>
  )
}

export default WarehouseImportReceiptDetail
