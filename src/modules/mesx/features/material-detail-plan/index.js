import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { DATE_FORMAT } from '~/common/constants'
import DataTable from '~/components/DataTable'
import TableFilter from '~/components/DataTable/TableFilter'
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
  moId: '',
  itemId: '',
  producingStepId: '',
  workCenterId: '',
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
    if (
      filters?.moId &&
      filters?.itemId &&
      filters?.producingStepId &&
      filters?.workCenterId
    )
      refreshDataFilter()
  }, [filters, keyword])

  const refreshDataFilter = () => {
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
        width: 200,
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

    if (mdpDetails?.materialReport && !isEmpty(mdpDetails?.materialReport)) {
      rows = []
      matrix = []

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
    <Page
      breadcrumbs={breadcrumbs}
      onSearch={setKeyword}
      title={t('materialDetailPlan.title')}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h4" component="span">
          {t('materialDetailPlan.productionPlan')}
        </Typography>

        <TableFilter
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTER,
            onApply: setFilters,
            validationSchema: materialSchema(t),
          }}
        />
      </Box>

      <DataTable
        rows={getRowProductionPlan().rows}
        columns={getColumnProductionPlan()}
        rowSpanMatrix={getRowProductionPlan().rowSpanMatrix}
        rowGrayMatrix={getRowProductionPlan().rowGrayMatrix}
        striped={false}
        hideSetting
        hideFooter
      />
      <Box mt={3} mb={1.5}>
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
      />
      <Box mt={3} mb={1.5}>
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
      />
    </Page>
  )
}
export default MaterialDetailPlan
