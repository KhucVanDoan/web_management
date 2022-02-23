import React, { useEffect, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'

import {
  BOQ_STATUS_MAP,
  BOQ_STATUS_TO_EDIT,
  BOQ_STATUS_TO_CONFIRM,
  BOQ_STATUS_TO_DELETE,
  BOQ_STATUS_PLAN,
  DATE_FORMAT_2,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'
import { useDefinePlan } from '~/modules/mesx/redux/hooks/useDefinePlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  formatDateTimeUtc,
} from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.DEFINE_BOQ.LIST.PATH,
    title: ROUTE.DEFINE_BOQ.LIST.TITLE,
  },
]

const DefineBOQ = (props) => {
  const {
    data: { isLoading, boqList, total },
    actions: boqActions,
  } = useDefineBOQ()
  const {
    data: { planList },
    actions: planActions,
  } = useDefinePlan()
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const [id, setId] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)
  const [keyword, setKeyword] = useState('')

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    pmName: '',
    planForm: [],
    status: '',
  }

  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        fixed: true,
      },
      {
        field: 'code',
        headerName: t('defineBOQ.boqCode'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('defineBOQ.boqName'),
        width: 150,
        sortable: true,
      },
      {
        field: 'pmName',
        headerName: t('defineBOQ.boqPm'),
        width: 80,
        sortable: true,
        renderCell: (params) => {
          const { row } = params
          return row?.pm?.fullName
        },
      },
      {
        field: 'planFrom',
        headerName: t('defineBOQ.boqPlan'),
        width: 200,
        sortable: true,
        type: 'date',
        renderCell: (params) => {
          return (
            formatDateTimeUtc(params.row.planFrom, DATE_FORMAT_2) +
            ' - ' +
            formatDateTimeUtc(params.row.planTo, DATE_FORMAT_2)
          )
        },
      },
      {
        field: 'status',
        headerName: t('defineBOQ.status'),
        width: 200,
        sortable: true,
        type: 'categorical',
        renderCell: (params) => {
          const { status } = params.row
          return t(BOQ_STATUS_MAP[status])
        },
      },
      {
        field: 'action',
        headerName: t('common.action'),
        width: 250,
        align: 'center',
        renderCell: (params) => {
          const { status, id } = params.row
          const canEdit = BOQ_STATUS_TO_EDIT.includes(status)
          const canConfirm = BOQ_STATUS_TO_CONFIRM.includes(status)
          const canDelete = BOQ_STATUS_TO_DELETE.includes(status)
          const hasPlan = BOQ_STATUS_PLAN.includes(status)
          const boqHasPlan = planList
            .filter((i) => i.boqId === id)
            .map((m) => m.id)
          const goDetail = hasPlan && boqHasPlan.length === 1
          const goList = hasPlan && boqHasPlan.length > 1
          return (
            <Box sx={{ whiteSpace: 'nowrap' }}>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_BOQ.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {canEdit && (
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.DEFINE_BOQ.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
              )}
              {canDelete && (
                <IconButton
                  onClick={() => {
                    setId(id)
                    setIsOpenDeleteModal(true)
                  }}
                >
                  <Icon name="delete" />
                </IconButton>
              )}
              {canConfirm && (
                <IconButton
                  onClick={() => {
                    setId(id)
                    setIsOpenConfirmModal(true)
                  }}
                >
                  <Icon name="tick" />
                </IconButton>
              )}
              {goDetail && (
                <Button
                  variant="text"
                  size="small"
                  bold={false}
                  component={Link}
                  to={ROUTE.PLAN.DETAILS.PATH.replace(
                    ':id',
                    `${boqHasPlan[0]}`,
                  )}
                >
                  {t('defineBOQ.planList')}
                </Button>
              )}
              {goList && (
                <Button
                  variant="text"
                  size="small"
                  bold={false}
                  component={Link}
                  to={ROUTE.PLAN.LIST.PATH}
                >
                  {t('defineBOQ.planList')}
                </Button>
              )}
            </Box>
          )
        },
      },
    ],
    [],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    boqActions.searchBOQ(params)
    planActions.searchPlans({ page, limit: pageSize })
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const submitConfirm = () => {
    boqActions.confirmBOQById(id, () => {
      refreshData()
      setIsOpenConfirmModal(false)
      setId(null)
    })
  }

  const onSubmitDelete = () => {
    boqActions.deleteBOQ(id, () => {
      setIsOpenDeleteModal(false)
      refreshData()
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        {/* @TODO: handle import data */}
        <Button variant="outlined" icon="download" disabled>
          {t('defineBOQ.import')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_BOQ.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('defineBOQ.title')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('defineBOQ.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        rows={boqList}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeSort={setSort}
        total={total}
        title={t('general:dataTable.title')}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('defineBOQ.deleteModalTitle')}
        maxWidth="sm"
        submitLabel={t('common.yes')}
        onSubmit={onSubmitDelete}
        submitProps={{
          color: 'error',
        }}
        cancelLabel={t('common.no')}
        onCancel={() => setIsOpenDeleteModal(false)}
        noBorderBottom
      >
        {t('defineBOQ.deleteConfirm')}
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('common.notify')}
        maxWidth="sm"
        onSubmit={submitConfirm}
        onCancel={() => setIsOpenConfirmModal(false)}
        submitLabel={t('common.yes')}
        cancelLabel={t('common.no')}
        noBorderBottom
      >
        {t('common.confirmMessage.confirm')}
      </Dialog>
    </Page>
  )
}

export default DefineBOQ
