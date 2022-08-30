import React, { useEffect, useState, useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TableCollapse from '~/components/TableCollapse'
import {
  MASTER_PLAN_STATUS_OPTIONS,
  MASTER_PLAN_STATUS,
  PLAN_PROGRESS_MAP,
} from '~/modules/mesx/constants'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { exportMasterPlanApi } from '~/modules/mesx/redux/sagas/define-master-plan/import-export-master-plan'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertUtcDateToLocalTz,
  convertFilterParams,
  convertSortParams,
} from '~/utils'

import { DialogApprove } from './dialogs/approve'
import { DialogReject } from './dialogs/reject'
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
  planDate: null,
  createdAt: null,
}

const DefineMasterPlan = () => {
  const { t } = useTranslation(['mesx'])

  const history = useHistory()

  const [masterPlans, setMasterPlans] = useState([])
  const [tempItem, setTempItem] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [isOpenApproveModal, setIsOpenApproveModal] = useState(false)
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false)
  const [columnsSettings, setColumnsSettings] = useState([])
  const { refreshKey, clearRefreshKey } = useApp()

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
  } = useQueryState()

  const {
    data: { masterPlanList, isLoading, total },
    actions: masterPlanActions,
  } = useDefineMasterPlan()

  const columns = useMemo(
    () => [
      {
        field: 'code',
        headerName: t('defineMasterPlan.code'),
        width: 100,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('defineMasterPlan.planName'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'soName',
        headerName: t('defineMasterPlan.saleOrderName'),
        width: 200,
        renderCell: (params) => {
          return (
            params.row.saleOrders
              ?.map((saleOrder) => saleOrder.name)
              .join(', ') ||
            params.row.saleOrderSchedules
              ?.map((saleOrder) => saleOrder?.saleOrderName)
              .join(', ')
          )
        },
      },
      {
        field: 'plan',
        headerName: t('defineMasterPlan.planDate'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return (
            convertUtcDateToLocalTz(params.row.dateFrom) +
            ' - ' +
            convertUtcDateToLocalTz(params.row.dateTo)
          )
        },
      },
      {
        field: 'status',
        headerName: t('defineMasterPlan.status'),
        width: 100,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={MASTER_PLAN_STATUS_OPTIONS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'moName',
        headerName: t('defineMasterPlan.moName'),
        width: 150,
        renderCell: (params) => {
          const { id, status } = params.row
          const isConfirmed = status === MASTER_PLAN_STATUS.CONFIRMED
          return (
            <>
              {isConfirmed && (
                <Button
                  variant="text"
                  size="small"
                  bold={false}
                  onClick={() =>
                    history.push(`${ROUTE.MO.CREATE.PATH}?masterPlanId=${id}`)
                  }
                >
                  {t('defineMasterPlan.createMo')}
                </Button>
              )}
            </>
          )
        },
      },
      {
        field: 'action',
        headerName: t('defineMasterPlan.action'),
        width: 280,
        align: 'center',
        renderCell: (params) => {
          const { id, status } = params.row
          const canEdit = status === MASTER_PLAN_STATUS.CREATED
          const canDelete = status === MASTER_PLAN_STATUS.CREATED
          const canApprove = status === MASTER_PLAN_STATUS.CREATED
          const canReject = status === MASTER_PLAN_STATUS.CREATED

          return (
            <>
              <IconButton onClick={() => onClickViewDetails(id)}>
                <Icon name="show" />
              </IconButton>
              <IconButton onClick={() => onClickViewModeration(id)}>
                <Icon name="invoid" />
              </IconButton>
              {canEdit && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.MASTER_PLAN.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              )}
              {canDelete && (
                <IconButton
                  onClick={() => {
                    setTempItem(params.row)
                    setDeleteModal(true)
                  }}
                >
                  <Icon name="delete" />
                </IconButton>
              )}
              {canApprove && (
                <IconButton
                  onClick={() => {
                    setTempItem(params.row)
                    setIsOpenApproveModal(true)
                  }}
                >
                  <Icon name="tick" />
                </IconButton>
              )}
              {canReject && (
                <IconButton
                  onClick={() => {
                    setTempItem(params.row)
                    setIsOpenRejectModal(true)
                  }}
                >
                  <Icon name="remove" />
                </IconButton>
              )}
              <IconButton
                onClick={() =>
                  history.push(`${ROUTE.MASTER_PLAN.CREATE.PATH}?cloneId=${id}`)
                }
              >
                <Icon name="clone" />
              </IconButton>
            </>
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
    },
    {
      field: 'quantity',
      headerName: t('defineMasterPlan.quantity'),
      width: 200,
    },
    {
      field: 'actualQuantity',
      headerName: t('defineMasterPlan.actualQuantity'),
      width: 200,
    },
    {
      field: 'planDateOfList',
      headerName: t('defineMasterPlan.planDate'),
      width: 200,
      renderCell: (params) => {
        const { dateFrom, dateTo } = params.row
        return (
          convertUtcDateToLocalTz(dateFrom) +
          ' - ' +
          convertUtcDateToLocalTz(dateTo)
        )
      },
    },
    {
      field: 'executeDate',
      headerName: t('defineMasterPlan.executeDate'),
      width: 200,
      renderCell: (params) => {
        const { startAt } = params.row
        return convertUtcDateToLocalTz(startAt)
      },
    },
    {
      field: 'endDate',
      headerName: t('defineMasterPlan.endDate'),
      width: 200,
      renderCell: (params) => {
        const { endAt } = params.row
        return convertUtcDateToLocalTz(endAt)
      },
    },
    // TODO ping @long.ngoquang
    // {
    //   field: 'status',
    //   headerName: t('defineMasterPlan.status'),
    //   renderCell: (params) => {
    //     const { status } = params.row
    //     return (
    //       <Status
    //         options={MASTER_PLAN_STATUS_OPTIONS}
    //         value={status}
    //         variant="text"
    //       />
    //     )
    //   },
    // },
    {
      field: 'progress',
      headerName: t('defineMasterPlan.progress'),
      align: 'center',
      renderCell: (params) => {
        const { progress } = params.row
        return t(PLAN_PROGRESS_MAP[progress])
      },
    },
  ]

  const additionColums = [
    {
      field: 'itemName',
      headerName: t('defineMasterPlan.itemName'),
      width: 150,
      sortable: false,
    },
    {
      field: 'bomName',
      headerName: t('defineMasterPlan.bomName'),
      sortable: false,
      renderCell: (params) => {
        const { bom } = params.row
        return bom?.name
      },
    },
    {
      field: 'routing',
      headerName: t('defineMasterPlan.routingCode'),
      renderCell: (params) => {
        const { routing } = params.row
        return routing?.code
      },
    },
    {
      field: 'quantity',
      headerName: t('defineMasterPlan.quantity'),
    },
    {
      field: 'actualQuantity',
      headerName: t('defineMasterPlan.actualQuantity'),
    },
    {
      field: 'itemUnitName',
      headerName: t('defineMasterPlan.unit'),
    },
    {
      field: 'planDateOfList',
      headerName: t('defineMasterPlan.planDate'),
      renderCell: (params) => {
        const { dateFrom, dateTo } = params.row
        return (
          convertUtcDateToLocalTz(dateFrom) +
          ' - ' +
          convertUtcDateToLocalTz(dateTo)
        )
      },
    },
    {
      field: 'executeDate',
      headerName: t('defineMasterPlan.executeDate'),
      renderCell: (params) => {
        const { startAt } = params.row
        return convertUtcDateToLocalTz(startAt)
      },
    },
    {
      field: 'endDate',
      headerName: t('defineMasterPlan.endDate'),
      renderCell: (params) => {
        const { planBom } = params.row
        return convertUtcDateToLocalTz(planBom?.endAt)
      },
    },
    // TODO ping long
    // {
    //   field: 'status',
    //   headerName: t('defineMasterPlan.status'),
    //   renderCell: (params) => {
    //     const { status } = params.row
    //     return (
    //       <Status
    //         options={MASTER_PLAN_STATUS_OPTIONS}
    //         value={status}
    //         variant="text"
    //       />
    //     )
    //   },
    // },
  ]

  useEffect(() => {
    refreshData()
  }, [pageSize, page, sort, filters, keyword])

  useEffect(() => {
    if (refreshKey) {
      if (masterPlans?.some((item) => item?.id === refreshKey)) {
        refreshData()
      }

      clearRefreshKey()
    }
  }, [refreshKey, masterPlans])

  useEffect(() => {
    setMasterPlans(masterPlanList)
  }, [masterPlanList])

  /**
   * Refresh data
   */
  const refreshData = () => {
    const params = {
      keyword: keyword?.trim(),
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
    history.push(ROUTE.MASTER_PLAN.CREATE.PATH)
  }

  const onClickViewModeration = (id) => {
    history.push(ROUTE.MASTER_PLAN.JOB_DETAIL.PATH.replace(':id', `${id}`))
  }

  /**
   * onClickViewDetails
   * @param {int} id
   */
  const onClickViewDetails = (id) => {
    history.push(ROUTE.MASTER_PLAN.DETAIL.PATH.replace(':id', `${id}`))
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
   * Handle change sort
   * @param {object} sort
   */
  const onSortChange = (sort) => {
    setSort(sort)
  }

  /**
   * Handle get data
   * @param {object} id
   */
  const handleGetData = (id) => {
    masterPlanActions.getMasterPlanDetailsById(id, (response) => {
      const newMasterPlans = masterPlans.map((masterPlan) => {
        if (masterPlan?.id === id) {
          const newBom = { ...response }
          const itemSchedules = response.saleOrderSchedules
            .map((saleOrder) => saleOrder.itemSchedules)
            .flat()
          newBom.subBom = changeToObjectCollapse(itemSchedules).map((item) => {
            const newItem = { ...item }
            delete newItem.itemSchedules
            return newItem
          })
          newBom.saleOrderSchedules = response.saleOrderSchedules.map(
            (saleOrder) => {
              const newSaleOrder = { ...saleOrder }
              delete newSaleOrder.itemSchedules
              return newSaleOrder
            },
          )
          return newBom
        } else {
          return masterPlan
        }
      })

      setMasterPlans(newMasterPlans)
    })
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
        <ImportExport
          name={t('masterPlanDefine.export')}
          onExport={(params) => {
            exportMasterPlanApi({
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
        <Button onClick={handleCreate} icon="add" sx={{ ml: 4 / 3 }}>
          {t('defineMasterPlan.createButton')}
        </Button>
      </>
    )
  }

  const onSubmitDelete = () => {
    masterPlanActions.deleteMasterPlan(tempItem?.id, refreshData)
    setDeleteModal(false)
    setTempItem(null)
  }

  /**
   *
   * @returns {JSX.Element}
   */
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.masterPlanDefine')}
      onSearch={setKeyword}
      placeholder={t('defineMasterPlan.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <TableCollapse
        rows={masterPlans}
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
        onSortChange={onSortChange}
        onSettingChange={setColumnsSettings}
        total={total}
        title={t('defineMasterPlan.tableTitle')}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          validationSchema: validationSchema(t),
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      />

      <DialogApprove
        open={isOpenApproveModal}
        onClose={() => {
          setTempItem(null)
          setIsOpenApproveModal(false)
        }}
        data={tempItem}
        onSuccess={() => {
          refreshData()
        }}
      />
      <DialogReject
        open={isOpenRejectModal}
        onClose={() => {
          setTempItem(null)
          setIsOpenRejectModal(false)
        }}
        data={tempItem}
        onSuccess={() => {
          refreshData()
        }}
      />

      <Dialog
        open={deleteModal}
        title={t('defineBOM.deleteModalTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineBOM.deleteConfirm')}
        <LV
          label={t('defineMasterPlan.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineMasterPlan.planName')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineMasterPlan
