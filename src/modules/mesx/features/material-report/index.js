import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import {
  DATE_FORMAT,
  PLAN_STATUS_OPTIONS,
  ROWS_PER_PAGE_OPTIONS,
} from '~/common/constants'
import Button from '~/components/Button'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TableCollapse from '~/components/TableCollapse'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useSaleOrder from '~/modules/mesx/redux/hooks/useSaleOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  formatDateTimeUtc,
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

  const DEFAULT_FILTER = {
    manufacturingOrderIds: '',
    itemName: '',
    saleOrderIds: '',
    moFrom: '',
  }

  const {
    appStore: { itemTypes },
    actions: actionAppstore,
  } = useAppStore()

  const {
    data: { isLoading, total, moList },
    actions,
  } = useMo()

  const {
    data: { saleOrderList },
    actions: actionSaleOrder,
  } = useSaleOrder()

  const [bomTree, setBomTree] = useState([])
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ROWS_PER_PAGE_OPTIONS[0])
  const [filters, setFilters] = useState(DEFAULT_FILTER)
  const [sort, setSort] = useState([])

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
        const { saleOrderId } = params.row
        return saleOrderList.find((i) => i.id === saleOrderId)?.name
      },
    },
    {
      field: 'moFrom',
      headerName: t('materialReport.planDate'),
      align: 'center',
      type: 'date',
      sortable: true,
      renderCell: (params) => {
        return (
          formatDateTimeUtc(params.row?.planFrom, DATE_FORMAT) +
          ' - ' +
          formatDateTimeUtc(params.row?.planTo, DATE_FORMAT)
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
      field: 'producedQuantity',
      headerName: t('materialReport.producedQuantity'),
      align: 'center',
      sortable: false,
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
        return itemTypes.find((i) => i.id === item.itemTypeId)?.name
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
        return itemTypes.find((i) => i.id === item.itemTypeId)?.name
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
          formatDateTimeUtc(planFrom, DATE_FORMAT) +
          ' - ' +
          formatDateTimeUtc(planTo, DATE_FORMAT)
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
    actionAppstore.getAppStore()
    actionSaleOrder.searchSaleOrders({ isGetAll: 1 })
  }, [pageSize, page, filters, sort, filters, keyword])

  useEffect(() => {
    setBomTree(moList)
  }, [moList])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
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
      <>
        {/* @TODO: <linh.tauquang> handle export */}
        <Button variant="outlined" disabled icon="download">
          {t('materialReport.export')}
        </Button>
      </>
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
          onChangeFilter={setFilters}
          onChangeSort={setSort}
          total={total}
          materialReport={true}
          title={t('materialReport.title')}
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTER,
            onApply: setFilters,
          }}
        />
      </Page>
    </>
  )
}

export default MaterialReport
