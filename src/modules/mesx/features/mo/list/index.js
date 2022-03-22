import React, { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { DATE_FORMAT } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  MO_STATUS_OPTIONS,
  MO_STATUS_TO_CONFIRM,
  MO_STATUS_TO_EDIT,
  MO_STATUS_TO_DELETE,
  MO_STATUS,
} from '~/modules/mesx/constants'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  redirectRouter,
  formatDateTimeUtc,
  convertFilterParams,
  convertSortParams,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MO.LIST.PATH,
    title: ROUTE.MO.LIST.TITLE,
  },
]

const Mo = () => {
  const { t } = useTranslation(['mesx'])
  const [tempItem, setTempItem] = useState(null)
  const history = useHistory()

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState([])
  const [sort, setSort] = useState(null)
  const {
    data: { isLoading, moList, total },
    actions,
  } = useMo()
  const {
    // data: { planList },
    actions: planActions,
  } = useDefinePlan()

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    // },
    {
      field: 'code',
      headerName: t('Mo.moCode'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('Mo.moName'),
      width: 120,
      sortable: true,
    },
    {
      field: 'planCode',
      headerName: t('Mo.planCode'),
      width: 120,
      sortable: true,
      //TODO: <anh.nth> get planCode (now planList nodata)
      // renderCell: (params) => {
      //   const { id } = params.row
      //   return planList.find((plan) => plan.id === id).code
      // },
    },
    {
      field: 'factoryName',
      headerName: t('Mo.moFactory'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { factory } = params.row
        return factory?.name
      },
    },
    {
      field: 'saleOrderName',
      headerName: t('Mo.soName'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { saleOrder } = params.row
        return saleOrder?.name
      },
    },
    {
      field: 'plan',
      headerName: t('Mo.moPlan'),
      width: 200,
      sortable: true,
      type: 'date',
      renderCell: (params) => {
        return (
          formatDateTimeUtc(params.row.planFrom, DATE_FORMAT) +
          ' - ' +
          formatDateTimeUtc(params.row.planTo, DATE_FORMAT)
        )
      },
    },
    {
      field: 'status',
      headerName: t('Mo.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status options={MO_STATUS_OPTIONS} value={status} variant="text" />
        )
      },
    },
    {
      field: 'workOrder',
      headerName: t('Mo.workOrder'),
      width: 150,
      align: 'center',
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        const isConfirmed = status === MO_STATUS.CONFIRMED
        return (
          <>
            {isConfirmed && (
              <Button
                variant="text"
                onClick={() => history.push(ROUTE.WORK_ORDER.PATH)}
                bold={false}
              >
                {t('Mo.workOrder')}
              </Button>
            )}
          </>
        )
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 200,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const canEdit = MO_STATUS_TO_EDIT.includes(status)
        const canConfirm = MO_STATUS_TO_CONFIRM.includes(status)
        const canDelete = MO_STATUS_TO_DELETE.includes(status)
        // const hasPlan = MO_STATUS_PLAN.includes(status)
        // const moHasPlan = planList.filter((i) => i.moId === id).map((m) => m.id)
        // const goDetail = hasPlan && moHasPlan.length === 1
        // const goList = hasPlan && moHasPlan.length > 1
        return (
          <div>
            <IconButton onClick={() => onClickViewDetails(id)}>
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton onClick={() => onClickEdit(id)}>
                <Icon name="edit" />
              </IconButton>
            )}
            {canDelete && (
              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton
                onClick={() => {
                  setTempItem(params.row)
                  setIsOpenConfirmModal(true)
                }}
              >
                <Icon name="tick" />
              </IconButton>
            )}
            {/* {goDetail && (
              <Button
                variant="text"
                onClick={() =>
                  history.push(
                    ROUTE.PLAN.DETAILS.PATH.replace(':id', `${moHasPlan[0]}`),
                  )
                }
              >
                {t('Mo.planList')}
              </Button>
            )}
            {goList && (
              <Button
                variant="text"
                onClick={() => history.push(ROUTE.PLAN.LIST.PATH)}
              >
                {t('Mo.planList')}
              </Button>
            )} */}
          </div>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchMO(params)
    planActions.searchPlans({ page, limit: pageSize })
  }

  useEffect(() => {
    refreshData()
  }, [keyword, page, pageSize, sort, filters])

  /**
   * onClickViewDetails
   * @param {int} id
   */
  const onClickViewDetails = (id) => {
    redirectRouter(ROUTE.MO.DETAIL.PATH, { id: id })
  }

  /**
   * onClickEdit
   * @param {int} id
   */
  const onClickEdit = (id) => {
    redirectRouter(ROUTE.MO.EDIT.PATH, { id: id })
  }

  /**
   *
   * @param {int} id
   */
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }

  /**
   * Submit confirm purchased order
   */
  const onSubmitConfirm = () => {
    actions.confirmMOById(tempItem?.id, refreshData)
    setIsOpenConfirmModal(false)
    setTempItem(null)
  }

  /**
   * Handle change filter
   * @param {array} filters
   */
  const onChangeFilter = (filters) => {
    setFilters(filters)
  }

  /**
   * onSubmitDelete
   */
  const onSubmitDelete = () => {
    actions.deleteMO(tempItem?.id, () => {
      refreshData()
    })
    setIsOpenDeleteModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.MO.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.moDefine')}
        onSearch={setKeyword}
        placeholder={t('Mo.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          title={t('Mo.title')}
          rows={moList}
          columns={columns}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onChangeSort={setSort}
          total={total}
          sort={sort}
          filters={{
            form: <FilterForm />,
            values: filters,
            onApply: onChangeFilter,
          }}
          checkboxSelection
        />
        <Dialog
          open={isOpenDeleteModal}
          title={t('bomProducingStep.deleteModalTitle')}
          onCancel={() => setIsOpenDeleteModal(false)}
          onSubmit={onSubmitDelete}
          cancelLabel={t('common.no')}
          submitLabel={t('common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('bomProducingStep.deleteConfirm')}
          <LV
            label={t('Mo.moCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('Mo.moName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
        <Dialog
          open={isOpenConfirmModal}
          title={t('common.notify')}
          maxWidth="sm"
          onCancel={() => setIsOpenConfirmModal(false)}
          onSubmit={onSubmitConfirm}
          cancelLabel={t('common.no')}
          submitLabel={t('common.yes')}
          noBorderBottom
        >
          {t('common.confirmMessage.confirm')}
          <LV
            label={t('Mo.moCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('Mo.moName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default Mo
