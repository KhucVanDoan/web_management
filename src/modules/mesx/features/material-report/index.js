import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useQueryState } from '~/common/hooks'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TableCollapse from '~/components/TableCollapse'
import { PLAN_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { exportMaterialReportApi } from '~/modules/mesx/redux/sagas/material-report/import-export-material-report'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter'
const breadcrumbs = [
  {
    title: 'report',
  },
  {
    route: ROUTE.MATERIAL_REPORT.PATH,
    title: ROUTE.MATERIAL_REPORT.TITLE,
  },
]

function MaterialReport() {
  const { t } = useTranslation(['mesx'])

  const DEFAULT_FILTERS = {
    manufacturingOrderIds: null,
    saleOrder: null,
    itemName: '',
  }

  const {
    data: { isLoading, total, moList },
    actions,
  } = useMo()

  const [bomTree, setBomTree] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const {
    page,
    pageSize,
    sort,
    filters,
    keyword,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setKeyword,
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const columns = [
    {
      field: 'id',
      headerName: t('materialReport.id'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'moCode',
      headerName: t('materialReport.code'),
      sortable: true,
      renderCell: (params) => {
        const { code } = params.row
        return code
      },
    },
    {
      field: 'moName',
      headerName: t('materialReport.name'),
      sortable: true,
      renderCell: (params) => {
        const { name } = params.row
        return name
      },
    },
    {
      field: 'soId',
      headerName: t('materialReport.saleOrder'),
      sortable: true,
      renderCell: (params) => {
        const { saleOrder } = params.row
        return saleOrder?.name
      },
    },
    {
      field: 'moFrom',
      headerName: t('materialReport.planDate'),
      align: 'center',
      filterFormat: 'date',
      sortable: true,
      renderCell: (params) => {
        return (
          convertUtcDateToLocalTz(params.row?.planFrom) +
          ' - ' +
          convertUtcDateToLocalTz(params.row?.planTo)
        )
      },
    },
    {
      field: 'status',
      headerName: t('materialReport.status'),
      align: 'center',
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={PLAN_STATUS_OPTIONS} value={status} variant="text" />
        )
      },
    },
  ]
  const producingStepColumns = [
    {
      field: 'code',
      headerName: t('materialReport.producingStepCode'),
      sortable: false,
      renderCell: (params) => {
        const { producingStep } = params.row
        return producingStep?.code
      },
    },
    {
      field: 'name',
      headerName: t('materialReport.producingStepName'),
      sortable: false,
      renderCell: (params) => {
        const { producingStep } = params.row
        return producingStep?.name
      },
    },
    {
      field: 'planQuantity',
      headerName: t('materialReport.planQuantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'inputQuantity',
      headerName: t('materialReport.producedQuantity'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        return +params?.row?.inputQuantity
      },
    },
    {
      field: 'status',
      headerName: t('materialReport.fixErrorQuantity'),
      align: 'center',
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={PLAN_STATUS_OPTIONS} value={status} variant="text" />
        )
      },
    },
    {
      field: 'scapQuantity',
      headerName: t('materialReport.scrapQuantity'),
      align: 'center',
    },
  ]

  const materialColumns = [
    {
      field: 'code',
      headerName: t('materialReport.materialCode'),
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.code
      },
    },
    {
      field: 'name',
      headerName: t('materialReport.materialName'),
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.name
      },
    },
    {
      field: 'itemType',
      headerName: t('materialReport.itemType'),
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.itemType?.name
      },
    },
    {
      field: 'planQuantity',
      headerName: t('materialReport.planQuantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'producedQuantity',
      headerName: t('materialReport.producedQuantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'errorRepairQuantity',
      headerName: t('materialReport.fixErrorQuantity'),
      align: 'center',
    },
    {
      field: 'scapQuantity',
      headerName: t('materialReport.scrapQuantity'),
      align: 'center',
    },
    {
      field: 'unit',
      headerName: t('materialReport.unit'),
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.itemUnitName
      },
    },
  ]

  const additionColums = [
    {
      field: 'itemCode',
      headerName: t('materialReport.itemCode'),
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.code
      },
    },
    {
      field: 'itemName',
      headerName: t('materialReport.itemName'),
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.name
      },
    },
    {
      field: 'itemType',
      headerName: t('materialReport.itemType'),
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.itemType?.name
      },
    },
    {
      field: 'planQuantity',
      headerName: t('materialReport.planQuantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'producedQuantity',
      headerName: t('materialReport.producedQuantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'unit',
      headerName: t('materialReport.unit'),
      sortable: false,
      renderCell: (params) => {
        const { item } = params.row
        return item?.itemUnitName
      },
    },
    {
      field: 'rootPlanDate',
      headerName: t('materialReport.planDate'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planFrom, planTo } = params.row
        return (
          convertUtcDateToLocalTz(planFrom) +
          ' - ' +
          convertUtcDateToLocalTz(planTo)
        )
      },
    },
    {
      field: 'status',
      headerName: t('materialReport.status'),
      align: 'center',
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={PLAN_STATUS_OPTIONS} value={status} variant="text" />
        )
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [pageSize, page, filters, sort, filters, keyword])

  useEffect(() => {
    setBomTree(moList)
  }, [moList])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: JSON.stringify([
        filters?.manufacturingOrderIds?.id
          ? {
              column: 'manufacturingOrderIds',
              text: [filters?.manufacturingOrderIds?.id],
            }
          : {},
        filters?.saleOrder?.name
          ? {
              column: 'saleOrderIds',
              text: [filters?.saleOrder?.id],
            }
          : {},
        filters?.itemName
          ? {
              column: 'itemName',
              text: filters?.itemName?.name,
            }
          : {},
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchMO(params)
  }

  const handleGetData = (id) => {
    actions.getBOMProducingStepStructureById(id, (res) => {
      const newBomTree = bomTree.map((bom) => {
        if (bom?.id === id) {
          const newBom = { ...bom }
          if (!bom.subBom) {
            newBom['subBoms'] = res
          }
          return newBom
        } else {
          return bom
        }
      })
      setBomTree(newBomTree)
    })
  }
  /**
   * Handle export file
   */
  // @TODO: <linh.taquang> handle export
  // handleExportFile = () => {
  //   const url = this.props.materialReport?.file;
  //   const str = url.substring(url.indexOf(';') + 1);
  //   return `data:text/csv;base64,${str}`;
  // }
  const renderHeaderRight = () => {
    return (
      <ImportExport
        name={t('materialReport.export')}
        onExport={(params) => {
          exportMaterialReportApi({
            columnSettings: JSON.stringify(columnsSettings),
            queryIds: JSON.stringify(params?.map((x) => ({ id: x?.id }))),
            keyword: keyword.trim(),
            filter: convertFilterParams(filters, [
              { field: 'createdAt', filterFormat: 'date' },
            ]),
            sort: convertSortParams(sort),
          })
        }}
        onRefresh={refreshData}
        disabled
      />
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('materialReport.title')}
        onSearch={setKeyword}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <TableCollapse
          rows={bomTree}
          pageSize={pageSize}
          page={page}
          columns={columns}
          handleGetData={handleGetData}
          additionColums={additionColums}
          producingStepColumns={producingStepColumns}
          materialColumns={materialColumns}
          isRoot={true}
          type={'list'}
          isView={true}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onSortChange={setSort}
          onSettingChange={setColumnsSettings}
          total={total}
          materialReport={true}
          title={t('materialReport.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTERS,
            onApply: setFilters,
          }}
        />
      </Page>
    </>
  )
}

export default MaterialReport
