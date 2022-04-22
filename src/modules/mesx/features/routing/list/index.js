import React, { useState, useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  ROUTING_STATUS,
  ROUTING_STATUS_OPTIONS,
} from '~/modules/mesx/constants'
import useRouting from '~/modules/mesx/redux/hooks/useRouting'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'producingInfo',
  },
  {
    route: ROUTE.ROUTING.LIST.PATH,
    title: ROUTE.ROUTING.LIST.TITLE,
  },
]

function Routing() {
  const { t } = useTranslation('mesx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: '',
    createdAt: null,
  }

  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

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

  const {
    data: { routingList, total, isLoading },
    actions,
  } = useRouting()

  const columns = useMemo(() => [
    // {
    //   field: 'id',
    //   headerName: t('routing.orderNumber'),
    //   width: 80,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('routing.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('routing.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'status',
      headerName: t('routing.status'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={ROUTING_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 250,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const isConfirmed = status === ROUTING_STATUS.PENDING
        return (
          <Box sx={{ whiteSpace: 'nowrap' }}>
            <IconButton
              onClick={() =>
                history.push(ROUTE.ROUTING.DETAIL.PATH.replace(':id', `${id}`))
              }
            >
              <Icon name="show" />
            </IconButton>
            {isConfirmed && (
              <>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.ROUTING.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTempItem(params.row)
                    setIsOpenDeleteModal(true)
                  }}
                >
                  <Icon name="delete" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setTempItem(params.row)
                    setIsOpenConfirmModal(true)
                  }}
                >
                  <Icon name="tick" />
                </IconButton>
              </>
            )}
            <IconButton
              onClick={() =>
                history.push(`${ROUTE.ROUTING.CREATE.PATH}?cloneId=${id}`)
              }
            >
              <Icon name="clone" />
            </IconButton>
          </Box>
        )
      },
    },
  ])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }

    actions.searchRoutings(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onSubmitDelete = () => {
    actions.deleteRouting(tempItem?.id, () => {
      refreshData()
    })
    setIsOpenDeleteModal(false)
    setTempItem(null)
  }

  const onSubmitConfirm = () => {
    actions.confirmRoutingById(tempItem?.id, () => {
      refreshData()
    })
    setIsOpenConfirmModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.ROUTING.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.routing')}
      onSearch={setKeyword}
      placeholder={t('routing.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('routing.title')}
        rows={routingList}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={setFilters}
        onSortChange={setSort}
        sort={sort}
        total={total}
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
        title={t('routing.routingDeleteTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        onSubmit={onSubmitDelete}
        cancelLabel={t('common.no')}
        submitLabel={t('common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('routing.deleteConfirm')}
        <LV
          label={t('routing.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('routing.name')}
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
          label={t('routing.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('routing.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default Routing
