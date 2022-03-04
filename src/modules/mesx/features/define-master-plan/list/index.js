import React, { useEffect, useState, useMemo } from 'react'

import { Delete, Edit, Visibility, CalendarToday } from '@mui/icons-material'
import CheckBox from '@mui/icons-material/CheckBox'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'

import {
  DATE_FORMAT_2,
  PLAN_STATUS_MAP,
  PLAN_STATUS_OPTIONS,
  PLAN_STATUS_TO_EDIT,
  PLAN_STATUS_TO_CONFIRM,
  PLAN_STATUS_TO_DELETE,
  PLAN_STATUS,
} from '~/common/constants'
import Button from '~/components/Button'
import Page from '~/components/Page'
import TableCollapse from '~/components/TableCollapse'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  redirectRouter,
  formatDateTimeUtc,
  convertFilterParams,
  convertSortParams,
} from '~/utils'

import FilterForm from './filter-form'
import { validationSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MASTER_PLAN.LIST.PATH,
    title: ROUTE.MASTER_PLAN.LIST.TITLE,
  },
]

const DEFAULT_FILTERS = {
  code: '',
  name: '',
  soId: null,
  planDate: [],
  createdAt: null,
}

const DefineMasterPlan = (props) => {
  const { t } = useTranslation(['mesx'])
  const [bomTree, setBomTree] = useState([])
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const {
    data: { masterPlanList, isLoading, total },
    actions: masterPlanActions,
  } = useDefineMasterPlan()

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: t('defineMasterPlan.id'),
        align: 'center',
        width: 100,
        sortable: false,
        fixed: true,
      },
      {
        field: 'code',
        headerName: t('defineMasterPlan.code'),
        align: 'center',
        width: 100,
        filterable: true,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('defineMasterPlan.planName'),
        align: 'center',
        width: 150,
        filterable: true,
        sortable: true,
        fixed: true,
      },
      {
        field: 'soName',
        headerName: t('defineMasterPlan.saleOrderName'),
        width: 200,
        align: 'center',
        filterable: true,
        sortable: true,
        renderCell: (params) => {
          return params.row.saleOrderSchedules
            ?.map((saleOrderSchedule) => saleOrderSchedule.saleOrderName)
            .join(', ')
        },
      },
      {
        field: 'plan',
        headerName: t('defineMasterPlan.planDate'),
        width: 200,
        align: 'center',
        type: 'date',
        filterable: true,
        sortable: true,
        renderCell: (params) => {
          return (
            formatDateTimeUtc(params.row.dateFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(params.row.dateTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'status',
        headerName: t('defineMasterPlan.status'),
        align: 'center',
        width: 100,
        sortable: true,
        type: 'categorical',
        filterable: true,
        filterOptions: {
          options: PLAN_STATUS_OPTIONS,
          getOptionValue: (option) => option?.id.toString(),
          getOptionLabel: (option) => t(option?.text),
        },
        renderCell: (params) => {
          const { status } = params.row
          return t(PLAN_STATUS_MAP[status || PLAN_STATUS.CREATED])
        },
      },
      {
        field: 'moName',
        headerName: t('defineMasterPlan.moName'),
        sortable: true,
        align: 'center',
        width: 150,
        filterable: true,
        paddingRight: 20,
        renderCell: (params) => {
          return (
            <Button
              variant="text"
              size="small"
              sx={{ marginBottom: 0 }}
              onClick={() => redirectRouter(ROUTE.MO.CREATE.PATH)}
            >
              {t('defineMasterPlan.createMo')}
            </Button>
          )
        },
      },
      {
        field: 'action',
        headerName: t('defineMasterPlan.action'),
        disableClickEventBubbling: true,
        width: 250,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
          const { id, status } = params.row
          const canEdit = PLAN_STATUS_TO_EDIT.includes(status)
          const canConfirm = PLAN_STATUS_TO_CONFIRM.includes(status)
          const canDelete = PLAN_STATUS_TO_DELETE.includes(status)
          return (
            <div>
              <IconButton
                type="button"
                size="large"
                onClick={() => onClickViewDetails(id)}
              >
                <Visibility />
              </IconButton>
              <IconButton
                type="button"
                size="large"
                onClick={() => onClickViewModeration(id)}
              >
                <CalendarToday />
              </IconButton>
              {canEdit && (
                <IconButton
                  type="button"
                  size="large"
                  onClick={() => onClickEdit(id)}
                >
                  <Edit />
                </IconButton>
              )}
              {canDelete && (
                <IconButton type="button" size="large">
                  <Delete />
                </IconButton>
              )}
              {canConfirm && (
                <IconButton type="button" size="large">
                  <CheckBox style={{ color: 'green' }} />
                </IconButton>
              )}
            </div>
          )
        },
      },
    ],
    [],
  )

  const producingStepColumns = [
    {
      field: 'producingStepName',
      headerName: t('defineMasterPlan.producingStepName'),
      width: 200,
      align: 'center',
      sortable: false,
    },
    {
      field: 'quantity',
      headerName: t('defineMasterPlan.quantity'),
      width: 200,
      align: 'center',
      sortable: false,
    },
    {
      field: 'actualQuantity',
      headerName: t('defineMasterPlan.actualQuantity'),
      width: 200,
      align: 'center',
      sortable: false,
    },
    {
      field: 'planDateOfList',
      headerName: t('defineMasterPlan.planDate'),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { dateFrom, dateTo } = params.row
        return (
          formatDateTimeUtc(dateFrom, DATE_FORMAT_2) +
          ' - ' +
          formatDateTimeUtc(dateTo, DATE_FORMAT_2)
        )
      },
    },
    {
      field: 'executeDate',
      headerName: t('defineMasterPlan.executeDate'),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { startAt } = params.row
        return formatDateTimeUtc(startAt, DATE_FORMAT_2)
      },
    },
    {
      field: 'endDate',
      headerName: t('defineMasterPlan.endDate'),
      width: 200,
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { endAt } = params.row
        return formatDateTimeUtc(endAt, DATE_FORMAT_2)
      },
    },
    {
      field: 'status',
      headerName: t('defineMasterPlan.status'),
      align: 'center',
      sortable: true,
      type: 'categorical',
      filterable: true,
      renderCell: (params) => {
        const { status } = params.row
        return status
      },
    },
    {
      field: 'progress',
      headerName: t('defineMasterPlan.progress'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { progress } = params.row
        return progress
      },
    },
  ]

  const additionColums = [
    {
      field: 'itemName',
      headerName: t('defineMasterPlan.itemName'),
      width: 150,
      align: 'left',
      sortable: false,
    },
    {
      field: 'bomName',
      headerName: t('defineMasterPlan.bomName'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { bom } = params.row
        return bom?.name
      },
    },
    {
      field: 'bomId',
      headerName: t('defineMasterPlan.routingCode'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'quantity',
      headerName: t('defineMasterPlan.planQuantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'actualQuantity',
      headerName: t('defineMasterPlan.quantity'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'itemUnitName',
      headerName: t('defineMasterPlan.unit'),
      align: 'center',
      sortable: false,
    },
    {
      field: 'planDateOfList',
      headerName: t('defineMasterPlan.planDate'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { dateFrom, dateTo } = params.row
        return (
          formatDateTimeUtc(dateFrom, DATE_FORMAT_2) +
          ' - ' +
          formatDateTimeUtc(dateTo, DATE_FORMAT_2)
        )
      },
    },
    {
      field: 'executeDate',
      headerName: t('defineMasterPlan.executeDate'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return formatDateTimeUtc(planBom?.startAt, DATE_FORMAT_2)
      },
    },
    {
      field: 'endDate',
      headerName: t('defineMasterPlan.endDate'),
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        const { planBom } = params.row
        return formatDateTimeUtc(planBom?.endAt, DATE_FORMAT_2)
      },
    },
    {
      field: 'status',
      headerName: t('defineMasterPlan.status'),
      align: 'center',
      sortable: true,
      type: 'categorical',
      filterable: true,
      renderCell: (params) => {
        const { planBom } = params.row
        return planBom?.status || t(PLAN_STATUS_MAP[PLAN_STATUS.CREATED])
      },
    },
  ]

  useEffect(() => {
    refreshData()
  }, [pageSize, page, sort, filters])

  useEffect(() => {
    setBomTree(masterPlanList)
  }, [masterPlanList])

  /**
   * Refresh data
   */
  const refreshData = (keyword = '') => {
    const params = {
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }

    masterPlanActions.searchMasterPlans(params)
  }

  /**
   *
   */
  const handleCreate = () => {
    redirectRouter(ROUTE.MASTER_PLAN.CREATE.PATH)
  }

  const onClickViewModeration = (id) => {
    redirectRouter(ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH, { id })
  }

  /**
   * onClickViewDetails
   * @param {int} id
   */
  const onClickViewDetails = (id) => {
    redirectRouter(ROUTE.MASTER_PLAN.DETAIL.PATH, { id: id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  const onClickEdit = (id) => {
    redirectRouter(ROUTE.MASTER_PLAN.EDIT.PATH, { id: id })
  }

  /**
   *
   * @param {int} pageSize
   */
  const onPageSizeChange = (pageSize) => {
    setPageSize(pageSize)
  }

  /**
   *
   * @param {int} page
   */
  const onPageChange = (page) => {
    setPage(page)
  }

  /**
   * Handle change filter
   * @param {array} filters
   */
  const onChangeFilter = (filters) => {
    setFilters(filters)
  }

  /**
   * Handle change sort
   * @param {object} sort
   */
  const onChangeSort = (sort) => {
    setSort(sort)
  }

  /**
   * Handle get data
   * @param {object} id
   */
  const handleGetData = (id) => {
    const newBomTree = bomTree.map((bom) => {
      if (bom?.id === id) {
        const newBom = { ...bom }
        if (!bom.subBom) {
          const itemSchedules = bom.saleOrderSchedules
            .map((saleOrder) => saleOrder.itemSchedules)
            .flat()
          newBom.subBom = changeToObjectCollapse(itemSchedules).map((item) => {
            const newItem = { ...item }
            delete newItem.itemSchedules
            return newItem
          })
          newBom.saleOrderSchedules = bom.saleOrderSchedules.map(
            (saleOrder) => {
              const newSaleOrder = { ...saleOrder }
              delete newSaleOrder.itemSchedules
              return newSaleOrder
            },
          )
        }
        return newBom
      } else {
        return bom
      }
    })
    setBomTree(newBomTree)
  }

  const changeToObjectCollapse = (data) => {
    return data.map((item) => {
      let newItem = { ...item }
      if (item.itemChildrens) {
        newItem.subBom = [...changeToObjectCollapse(item.itemChildrens)]
        newItem.producingSteps = [...newItem.itemProducingStepSchedules]
        delete newItem.itemProducingStepSchedules
        delete newItem.itemChildrens
      }
      return newItem
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined">{t('defineMasterPlan.export')}</Button>
        <Button onClick={handleCreate} icon="add" sx={{ ml: 4 / 3 }}>
          {t('defineMasterPlan.createButton')}
        </Button>
      </>
    )
  }

  /**
   *
   * @returns {JSX.Element}
   */
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('defineMasterPlan.title')}
      onSearch={refreshData}
      placeholder={t('defineMasterPlan.searchPlaceholder')}
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
        isRoot={true}
        type={'list'}
        mode={'DETAIL'}
        isView={true}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onChangeSort={onChangeSort}
        total={total}
        title={t('defineMasterPlan.tableTitle')}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          validationSchema: validationSchema(t),
          defaultValue: DEFAULT_FILTERS,
          onApply: onChangeFilter,
        }}
      />
    </Page>
  )
}

export default DefineMasterPlan
