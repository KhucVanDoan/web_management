import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import useDefineItem from '~/modules/database/redux/hooks/useDefineItem'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

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
const DEFAULT_FILTERS = {
  moId: '',
  itemId: '',
  producingStepId: '',
  workCenterId: '',
}
const MaterialDetailPlan = () => {
  const { t } = useTranslation(['mesx'])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const {
    data: { mdpDetails },
    actions,
  } = useMaterialPlanDetail()

  useEffect(() => {
    defineItemAction.searchItems({ isGetAll: 1 })
  }, [])
  useEffect(() => {
    refreshDataFilter()
  }, [filters])

  const {
    data: { itemList },
    actions: defineItemAction,
  } = useDefineItem()

  const refreshDataFilter = () => {
    const params = {
      manufacturingOrderId: filters?.moId?.id,
      itemId: filters?.itemId,
      producingStepId: filters?.producingStepId,
      workCenterId: filters?.workCenterId,
    }
    if (params?.manufacturingOrderId) {
      actions.searchMaterialDetailPlan(params)
    }
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
        width: 200,
      },
    ]
    if (mdpDetails) {
      mdpDetails?.manufacturingOrderPlan?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: convertUtcDateToLocalTz(e.executionDay),
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
    let sumPlanQuantity = mdpDetails?.manufacturingOrderPlan?.reduce(
      (a, b) => a + Number(b.planQuantityMaterial),
      0,
    )
    let sumProductionQuantity = mdpDetails?.manufacturingOrderPlan?.reduce(
      (a, b) => a + Number(b.actualQuantityMaterial),
      0,
    )

    let rows = [
      {
        plan: t('materialDetailPlan.planQuantity'),
        total: 0,
        targetName: '',
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
    let matrix = [
      [3, 1, 1],
      [-1, 1, 1],
      [-1, 1, 1],
    ]

    let rowGrayMatrix = []

    if (mdpDetails?.manufacturingOrderPlan) {
      rows = []
      matrix = []
      rows.push(
        {
          plan: t('materialDetailPlan.planQuantity'),
          total: mdpDetails ? sumPlanQuantity.toFixed(2) : 0,
          targetName:
            itemList?.find((item) => item?.id === filters?.itemId)?.name || '',
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
    mdpDetails?.manufacturingOrderPlan?.forEach((i, index) => {
      matrix = matrix.concat([
        [3, 1, 1],
        [-1, 1, 1],
        [-1, 1, 1],
      ])
      if (index % 2) {
        rowGrayMatrix = rowGrayMatrix.concat([true, true, true])
      } else {
        rowGrayMatrix = rowGrayMatrix.concat([false, false, false])
      }
      rows[0][i.executionDay] = i.planQuantityMaterial
      rows[1][i.executionDay] = i.actualQuantityMaterial
      rows[2][i.executionDay] = (
        i.planQuantityMaterial - i.actualQuantityMaterial
      ).toFixed(2)

      return { rows, rowSpanMatrix: matrix, rowGrayMatrix }
    })

    return { rows, rowSpanMatrix: matrix, rowGrayMatrix }
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
        width: 200,
      },
    ]

    if (mdpDetails?.materialReport) {
      mdpDetails?.materialReport[0]?.materialPlanSchedules?.forEach((e) => {
        columns.push({
          field: e.executionDay,
          headerName: convertUtcDateToLocalTz(e?.executionDay),
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
    let matrix = [
      [3, 1, 1],
      [-1, 1, 1],
      [-1, 1, 1],
    ]

    let rowGrayMatrix = []
    if (mdpDetails && !isEmpty(mdpDetails)) {
      rows = []
      matrix = []

      mdpDetails?.materialReport?.forEach((e, index) => {
        let sumPlanQuantity = e.materialPlanSchedules.reduce(
          (a, b) => a + Number(b.planQuantityMaterial),
          0,
        )
        let sumProductionQuantity = e.materialPlanSchedules.reduce(
          (a, b) => a + Number(b.actualQuantityMaterial),
          0,
        )

        matrix = matrix.concat([
          [3, 1, 1],
          [-1, 1, 1],
          [-1, 1, 1],
        ])
        if (index % 2) {
          rowGrayMatrix = rowGrayMatrix.concat([true, true, true])
        } else {
          rowGrayMatrix = rowGrayMatrix.concat([false, false, false])
        }
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
    return { rows, rowSpanMatrix: matrix, rowGrayMatrix }
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
        width: 200,
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
    <Page breadcrumbs={breadcrumbs} title={t('materialDetailPlan.title')}>
      <Typography variant="h4" component="span" mb={-3}>
        {t('materialDetailPlan.productionPlan')}
      </Typography>

      <DataTable
        rows={getRowProductionPlan().rows}
        columns={getColumnProductionPlan()}
        rowSpanMatrix={getRowProductionPlan().rowSpanMatrix}
        rowGrayMatrix={getRowProductionPlan().rowGrayMatrix}
        striped={false}
        hideSetting
        hideFooter
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
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
        rows={getRowMaterialPlan().rows}
        columns={getColumnMaterialPlan()}
        rowSpanMatrix={getRowMaterialPlan().rowSpanMatrix}
        rowGrayMatrix={getRowMaterialPlan().rowGrayMatrix}
        striped={false}
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
        striped={false}
        hideSetting
        hideFooter
      ></DataTable>
    </Page>
  )
}
export default MaterialDetailPlan
