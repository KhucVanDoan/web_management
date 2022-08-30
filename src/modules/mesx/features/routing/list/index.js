import React, { useState, useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
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

import {
  exportRoutingApi,
  importRoutingApi,
  getRoutingTemplateApi,
} from '../../../redux/sagas/routing/import-export-routing'
import { DialogApprove } from './dialogs/approve'
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
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
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
      headerName: t('general:common.action'),
      width: 250,
      sortable: false,
      align: 'center',
      fixed: true,
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

  useEffect(() => {
    if (refreshKey) {
      if (routingList?.some((item) => item?.id === refreshKey)) {
        refreshData()
      }

      clearRefreshKey()
    }
  }, [refreshKey, routingList])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onSubmitDelete = () => {
    actions.deleteRouting(tempItem?.id, () => {
      refreshData()
    })
    setIsOpenDeleteModal(false)
    setTempItem(null)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('routing.import')}
          onImport={(params) => {
            importRoutingApi(params)
          }}
          onExport={() => {
            exportRoutingApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: x?.id })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }}
          onDownloadTemplate={getRoutingTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.ROUTING.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
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
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
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
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
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

      <DialogApprove
        open={isOpenConfirmModal}
        onClose={() => {
          setTempItem(null)
          setIsOpenConfirmModal(false)
        }}
        data={tempItem}
        onSuccess={() => {
          refreshData()
        }}
      />
    </Page>
  )
}

export default Routing
