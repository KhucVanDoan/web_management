import { useTranslation } from 'react-i18next'
import { Redirect, useHistory, useLocation } from 'react-router-dom'

import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { TAB_QUERY_STR_KEY } from '~/modules/qmsx/constants'
import InputQuality from '~/modules/qmsx/features/quality-report/input-quality'
import OutputQuality from '~/modules/qmsx/features/quality-report/output-quality'
import ProductionInputQualityMaterial from '~/modules/qmsx/features/quality-report/production-input-quality-material'
import ProductionInputQualityProductPrevious from '~/modules/qmsx/features/quality-report/production-input-quality-product-previous'
import ProductionOutputQuality from '~/modules/qmsx/features/quality-report/production-output-quality'
import useQualityReport from '~/modules/qmsx/redux/hooks/useQualityReport'
import { ROUTE } from '~/modules/qmsx/routes/config'
import qs from '~/utils/qs'

const breadcrumbs = [
  {
    title: 'analysisAndReport',
  },
  {
    route: ROUTE.QUALITY_REPORT.LIST.PATH,
    title: ROUTE.QUALITY_REPORT.LIST.TITLE,
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

function QualityReport() {
  const history = useHistory()
  const location = useLocation()

  const { t } = useTranslation('qmsx')
  const transParentKey = 'qualityReport.'

  const locationSearch = location.search
  const { [TAB_QUERY_STR_KEY]: tab } = qs.parse(locationSearch)

  const tabs = [
    {
      label: t(`${transParentKey}${qcProductionOutput}`),
      value: qcProductionOutput,
    },
    {
      label: t(`${transParentKey}${qcInput}`),
      value: qcInput,
    },
    {
      label: t(`${transParentKey}${qcOutput}`),
      value: qcOutput,
    },
    {
      label: t(`${transParentKey}${qcProductionInputProductPrevious}`),
      value: qcProductionInputProductPrevious,
    },
    {
      label: t(`${transParentKey}${qcProductionInputMaterial}`),
      value: qcProductionInputMaterial,
    },
  ]

  const {
    data: { isLoading },
  } = useQualityReport()

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
      title={t('menu.qualityReport')}
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

export default QualityReport
