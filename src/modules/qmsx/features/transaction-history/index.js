import { useTranslation } from 'react-i18next'
import { Redirect, useHistory, useLocation } from 'react-router-dom'

import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { TAB_QUERY_STR_KEY } from '~/modules/qmsx/constants'
import InputQuality from '~/modules/qmsx/features/transaction-history/input-quality'
import OutputQuality from '~/modules/qmsx/features/transaction-history/output-quality'
import ProductionInputQualityMaterial from '~/modules/qmsx/features/transaction-history/production-input-quality-material'
import ProductionInputQualityProductPrevious from '~/modules/qmsx/features/transaction-history/production-input-quality-product-previous'
import ProductionOutputQuality from '~/modules/qmsx/features/transaction-history/production-output-quality'
import useTransactionHistory from '~/modules/qmsx/redux/hooks/useTransactionHistory'
import { ROUTE } from '~/modules/qmsx/routes/config'
import qs from '~/utils/qs'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.TRANSACTION_HISTORY.LIST.PATH,
    title: ROUTE.TRANSACTION_HISTORY.LIST.TITLE,
  },
]

const [
  qcProductionOutput,
  qcInput,
  qcOutput,
  qcProductionInputProductPrevious,
  qcProductionInputMaterial,
] = [
  'qcProductionOutput',
  'qcInput',
  'qcOutput',
  'qcProductionInputProductPrevious',
  'qcProductionInputMaterial',
]

function TransactionHistory() {
  const history = useHistory()
  const location = useLocation()

  const { t } = useTranslation('qmsx')
  const transParentKey = 'transactionHistory.header'

  const locationSearch = location.search
  const { [TAB_QUERY_STR_KEY]: tab } = qs.parse(locationSearch)

  const tabs = [
    {
      label: t(`${transParentKey}.${qcProductionOutput}`),
      value: qcProductionOutput,
    },
    {
      label: t(`${transParentKey}.${qcInput}`),
      value: qcInput,
    },
    {
      label: t(`${transParentKey}.${qcOutput}`),
      value: qcOutput,
    },
    {
      label: t(`${transParentKey}.${qcProductionInputProductPrevious}`),
      value: qcProductionInputProductPrevious,
    },
    {
      label: t(`${transParentKey}.${qcProductionInputMaterial}`),
      value: qcProductionInputMaterial,
    },
  ]

  const {
    data: { isLoading },
  } = useTransactionHistory()

  if (!tab) {
    return (
      <Redirect
        to={{
          pathname: location.pathname,
          search: `?${TAB_QUERY_STR_KEY}=${qcProductionOutput}`,
        }}
      />
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.transactionHistory')}
      loading={isLoading}
    >
      <Tabs
        list={tabs}
        onChange={(newValue) =>
          history.push(`?${TAB_QUERY_STR_KEY}=${newValue}`)
        }
        value={tab}
        // set maxWidth to 100% to prevent text overflow because of the default max width
        sx={{ '.MuiButtonBase-root.MuiTab-root': { maxWidth: '100%' } }}
      >
        <ProductionOutputQuality />
        <InputQuality />
        <OutputQuality />
        <ProductionInputQualityProductPrevious />
        <ProductionInputQualityMaterial />
      </Tabs>
    </Page>
  )
}

export default TransactionHistory
