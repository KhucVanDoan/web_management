import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { DATE_FORMAT } from '~/common/constants'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

import { useMaterialPlanDetail } from '../../redux/hooks/useMaterialDetailPlan'
import FilterForm from './form-filter'
import materialSchema from './form-filter/schema'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MATERIAL_DETAIL_PLAN.PATH,
    title: ROUTE.MATERIAL_DETAIL_PLAN.TITLE,
  },
]
const DEFAULT_FILTER = {
  manufacturingOrderIds: '',
  itemName: '',
  saleOrderIds: '',
  moFrom: '',
}
const MaterialDetailPlan = () => {
  const { t } = useTranslation(['mesx'])
  const [filters, setFilters] = useState(DEFAULT_FILTER)
  const [keyword, setKeyword] = useState('')

  const {
    data: { mdpDetails },
    actions,
  } = useMaterialPlanDetail()

  useEffect(() => {
    refreshData()
  }, [filters, keyword])

  const refreshData = () => {
    const params = {
      manufacturingOrderId: filters.moId,
      itemId: filters?.itemId,
      producingStepId: filters?.producingStepId,
      workCenterId: filters?.workCenterId,
    }
    actions.searchMaterialDetailPlan(params)
  }

  const getColumnProductionPlan = () => {
    const columns = [
      {
        field: 'targetName',
        headerName: t('materialDetailPlan.targetName'),
        fixed: true,
      },
      {
        field: 'plan',
        headerName: t('materialDetailPlan.plan'),
        fixed: true,
        width: 150,
      },
    ]
    if (mdpDetails) {
      mdpDetails?.manufacturingOrderPlan?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: formatDateTimeUtc(e.executionDay, DATE_FORMAT),
          width: 100,
          align: 'center',
        })
        return null
      })
    }
    const total = [
      {
        field: 'total',
        headerName: t(`materialDetailPlan.total`),
        fixed: true,
        width: 100,
        align: 'center',
      },
    ]
    return columns.concat(total)
  }

  const getRowProductionPlan = () => {
    let sumPlanQuantity = 0
    let sumProductionQuantity = 0
    let sumAdditionQuantity = 0
    mdpDetails?.manufacturingOrderPlan?.forEach(
      (e) => (sumPlanQuantity += Number(e.planQuantityMaterial)),
    )
    mdpDetails?.manufacturingOrderPlan?.forEach(
      (e) => (sumProductionQuantity += Number(e.actualQuantityMaterial)),
    )
    mdpDetails?.manufacturingOrderPlan?.forEach(
      (e) => (sumAdditionQuantity += Number(e.shortageQuantityMaterial)),
    )
    let rows = [
      {
        plan: t('materialDetailPlan.planQuantity'),
        total: 0,
      },
      {
        plan: t('materialDetailPlan.productionQuantity'),
        total: 0,
      },
      {
        plan: t('materialDetailPlan.additionQuantity'),
        total: 0,
      },
    ]
    if (mdpDetails && !isEmpty(mdpDetails)) {
      rows = []
      rows.push(
        {
          plan: t('materialDetailPlan.planQuantity'),
          total: mdpDetails ? sumPlanQuantity.toFixed(2) : 0,
          targetName: filters ? filters?.itemId : '',
        },
        {
          plan: t('materialDetailPlan.productionQuantity'),
          total: mdpDetails ? sumProductionQuantity.toFixed(2) : 0,
        },
        {
          plan: t('materialDetailPlan.additionQuantity'),
          total: mdpDetails
            ? (sumPlanQuantity - sumProductionQuantity).toFixed(2)
            : 0,
        },
      )
    }
    mdpDetails?.manufacturingOrderPlan?.map((i) => {
      rows[0][i.executionDay] = i.planQuantityMaterial
      rows[1][i.executionDay] = i.actualQuantityMaterial
      rows[2][i.executionDay] = (
        i.planQuantityMaterial - i.actualQuantityMaterial
      ).toFixed(2)

      return rows
    })
    return rows
  }

  const getColumnMaterialPlan = () => {
    const columns = [
      {
        field: 'targetName',
        headerName: t('materialDetailPlan.targetName'),
        fixed: true,
      },
      {
        field: 'plan',
        headerName: t('materialDetailPlan.plan'),
        fixed: true,
        width: 150,
      },
    ]

    if (mdpDetails) {
      mdpDetails?.manufacturingOrderPlan?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: formatDateTimeUtc(e?.executionDay, DATE_FORMAT),
          width: 100,
          align: 'center',
        })
      })
    }

    const total = [
      {
        field: 'total',
        headerName: t(`materialDetailPlan.total`),
        fixed: true,
        width: 100,
        align: 'center',
      },
    ]
    return columns.concat(total)
  }

  const getRowMaterialPlan = () => {
    let sumPlanQuantity = 0
    let sumProductionQuantity = 0
    let rows = [
      {
        plan: t('materialDetailPlan.planQuantity'),
        total: 0,
      },
      {
        plan: t('materialDetailPlan.productionQuantity'),
        total: 0,
      },
      {
        plan: t('materialDetailPlan.additionQuantity'),
        total: 0,
      },
    ]

    if (mdpDetails && !isEmpty(mdpDetails)) {
      rows = []
      mdpDetails?.materialReport?.forEach((e, index) => {
        e.materialPlanSchedules.forEach((i) => {
          sumPlanQuantity += Number(i.planQuantityMaterial)
        })
        e.materialPlanSchedules.forEach((i) => {
          sumProductionQuantity += Number(i.actualQuantityMaterial)
        })
        e.materialPlanSchedules.forEach((i) => {
          sumAdditionQuantity += Number(i.remainingQuantityMaterial)
        })
        rows.push(
          {
            plan: t('materialDetailPlan.planQuantity'),
            total: mdpDetails ? sumPlanQuantity.toFixed(2) : 0,
            targetName: e.itemName,
          },
          {
            plan: t('materialDetailPlan.productionQuantity'),
            total: mdpDetails ? sumProductionQuantity.toFixed(2) : 0,
          },

          {
            plan: t('materialDetailPlan.additionQuantity'),
            total: mdpDetails
              ? (sumPlanQuantity - sumProductionQuantity).toFixed(2)
              : 0,
          },
        )
        e.materialPlanSchedules.forEach((i) => {
          rows[3 * index][i.executionDay] = i.planQuantityMaterial
          rows[3 * index + 1][i.executionDay] = i.actualQuantityMaterial
          rows[3 * index + 2][i.executionDay] = (
            i.planQuantityMaterial - i.actualQuantityMaterial
          ).toFixed(2)
        })
      })
    }
    return rows
  }

  const getColumnSuppliesPlan = () => {
    const columns = [
      {
        field: 'targetName',
        headerName: t('materialDetailPlan.targetName'),
        fixed: true,
      },
      {
        field: 'plan',
        headerName: t('materialDetailPlan.plan'),
        fixed: true,
        width: 150,
      },
    ]

    const total = [
      {
        field: 'total',
        headerName: t(`materialDetailPlan.total`),
        fixed: true,
        width: 100,
        align: 'center',
      },
    ]
    return columns.concat(total)
  }
  const getRowSuppliesPlan = () => {
    const rows = [
      {
        plan: t('materialDetailPlan.planQuantity'),
        total: 0,
      },
      {
        plan: t('materialDetailPlan.productionQuantity'),
        total: 0,
      },
      {
        plan: t('materialDetailPlan.additionQuantity'),
        total: 0,
      },
    ]
    mdpDetails?.materialReport?.forEach((e) => {
      e.materialPlanSchedules.forEach((i) => {
        rows[0][i.executionDay] = i.planQuantityMaterial
        rows[1][i.executionDay] = i.actualQuantityMaterial
        rows[2][i.executionDay] = i.remainingQuantityMaterial
      })
    })
    return rows
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      onSearch={setKeyword}
      title={t('materialDetailPlan.title')}
    >
      <Typography variant="h4" component="span">
        {t('materialDetailPlan.productionPlan')}
      </Typography>

      <DataTable
        rows={getRowProductionPlan()}
        columns={getColumnProductionPlan()}
        hideSetting
        hideFooter
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTER,
          onApply: setFilters,
          validationSchema: materialSchema(t),
        }}
      ></DataTable>
      <Box mt={3} mb={1}>
        <Typography variant="h4" component="span">
          {t('materialDetailPlan.materialPlan')}
        </Typography>
      </Box>
      <DataTable
        rows={getRowMaterialPlan()}
        columns={getColumnMaterialPlan()}
        hideSetting
        hideFooter
      ></DataTable>
      <Box mt={3} mb={1}>
        <Typography variant="h4" component="span">
          {t('materialDetailPlan.SuppliePlan')}
        </Typography>
      </Box>
      <DataTable
        rows={getRowSuppliesPlan()}
        columns={getColumnSuppliesPlan()}
        hideSetting
        hideFooter
      ></DataTable>
    </Page>
  )
}
export default MaterialDetailPlan
