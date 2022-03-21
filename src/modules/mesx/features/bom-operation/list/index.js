import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  BOM_PRODUCING_STEP_STATUS,
  BOM_PRODUCING_STEP_STATUS_OPTIONS,
} from '~/modules/mesx/constants'
import useBomProducingStep from '~/modules/mesx/redux/hooks/useBomProducingStep'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.BOM_PRODUCING_STEP.LIST.PATH,
    title: ROUTE.BOM_PRODUCING_STEP.LIST.TITLE,
  },
]

function BomProducingStep() {
  const { t } = useTranslation('mesx')
  const history = useHistory()
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)

  const DEFAULT_FILTERS = {
    bomCode: '',
    bomName: '',
    routingName: '',
    status: '',
    createdAt: '',
  }

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [id, setId] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { bomProducingStepList, total, isLoading },
    actions,
  } = useBomProducingStep()

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    // },
    {
      field: 'bomCode',
      headerName: t('bomProducingStep.code'),
      width: 80,
      sortable: true,
      fixed: true,
    },
    {
      field: 'bomName',
      headerName: t('bomProducingStep.name'),
      width: 120,
      sortable: true,
      fixed: true,
    },
    {
      field: 'itemCode',
      headerName: t('bomProducingStep.itemCode'),
      width: 120,
      sortable: true,
    },
    {
      field: 'itemName',
      headerName: t('bomProducingStep.itemName'),
      width: 120,
      sortable: true,
    },
    {
      field: 'routingName',
      headerName: t('bomProducingStep.routingName'),
      width: 120,
      sortable: false,
    },
    {
      field: 'status',
      headerName: t('bomProducingStep.status'),
      width: 80,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={BOM_PRODUCING_STEP_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { status, id } = params.row
        const isConfirmed = status === BOM_PRODUCING_STEP_STATUS.PENDING
        return (
          <Box sx={{ whiteSpace: 'nowrap' }}>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.BOM_PRODUCING_STEP.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {isConfirmed && (
              <>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.BOM_PRODUCING_STEP.EDIT.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setId(id)
                    setIsOpenDeleteModal(true)
                  }}
                >
                  <Icon name="delete" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setId(id)
                    setIsOpenConfirmModal(true)
                  }}
                >
                  <Icon name="tick" />
                </IconButton>
              </>
            )}
          </Box>
        )
      },
    },
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, [
        { field: 'createdAt', type: 'date' },
      ]),
      sort: convertSortParams(sort),
    }

    actions.searchBomProducingStep(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onSubmitDelete = () => {
    actions.deleteBomProducingStep(id, () => {
      setIsOpenDeleteModal(false)
      refreshData()
    })
  }

  const onSubmitConfirm = () => {
    actions.confirmBomProducingStepById(id, () => {
      refreshData()
      setIsOpenConfirmModal(false)
      setId(null)
    })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.BOM_PRODUCING_STEP.CREATE.PATH)}
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
      title={t('menu.bomProducingStep')}
      onSearch={setKeyword}
      placeholder={t('bomProducingStep.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('bomProducingStep.title')}
        rows={bomProducingStepList}
        columns={columns}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeFilter={setFilters}
        onChangeSort={setSort}
        sort={sort}
        total={total}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
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
      </Dialog>
    </Page>
  )
}

export default BomProducingStep
