import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS,
  WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION,
} from '~/modules/wmsx/constants'
import useWarehouseExportProposal from '~/modules/wmsx/redux/hooks/useWarehouseExportProposal'
import {
  exportWarehouseExportProposalApi,
  getWarehouseExportProposalTemplateApi,
  importWarehouseExportProposalApi,
} from '~/modules/wmsx/redux/sagas/warehouse-export-proposal/import-export'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    route: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.PATH,
    title: ROUTE.WAREHOUSE_EXPORT_PROPOSAL.LIST.TITLE,
  },
]

function WarehouseExportProposal() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createTime: [],
  }

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
    data: { warehouseExportProposalList, total, isLoading },
    actions,
  } = useWarehouseExportProposal()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenComfirmModal: false,
    isOpenRejectModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      field: 'paperNumber',
      headerName: t('warehouseExportProposal.paperNumber'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.receiptNumber
      },
    },
    {
      field: 'unit',
      headerName: t('warehouseExportProposal.unit'),
      width: 100,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.factory?.name
      },
    },
    {
      field: 'creator',
      headerName: t('warehouseExportProposal.creator'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.createdBy?.username
      },
    },
    {
      field: 'materialReceiver',
      headerName: t('warehouseExportProposal.materialReceiver'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.suggestedBy
      },
    },
    {
      field: 'createdAt',
      headerName: t('warehouseExportProposal.createdAt'),
      width: 120,
      renderCell: (params) => {
        return convertUtcDateToLocalTz(params?.row?.createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('warehouseExportProposal.status'),
      width: 120,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={WAREHOUSE_EXPORT_PROPOSAL_STATUS_OPTION}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'statusWarehouseExport',
      headerName: t('warehouseExportProposal.statusWarehouseExport'),
      width: 120,
      renderCell: (params) => {
        const status = Number(params?.row.exportStatus)
        return (
          <Status
            options={WAREHOUSE_EXPORT_PROPOSAL_EXPORT_WAREHOUSE_STATUS_OPTION}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status } = params?.row
        const canEdit =
          status === WAREHOUSE_EXPORT_PROPOSAL_STATUS.PENDING ||
          status === WAREHOUSE_EXPORT_PROPOSAL_STATUS.REJECTED
        const canConfirm = status === WAREHOUSE_EXPORT_PROPOSAL_STATUS.PENDING
        const canDelete =
          status === WAREHOUSE_EXPORT_PROPOSAL_STATUS.PENDING ||
          status === WAREHOUSE_EXPORT_PROPOSAL_STATUS.REJECTED
        const canReject = status === WAREHOUSE_EXPORT_PROPOSAL_STATUS.PENDING
        const updateQuantity =
          status === WAREHOUSE_EXPORT_PROPOSAL_STATUS.CONFIRMED
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.WAREHOUSE_EXPORT_PROPOSAL.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {canEdit && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {canDelete && (
              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton onClick={() => onClickConfirm(params.row)}>
                <Icon name="tick" />
              </IconButton>
            )}
            {canReject && (
              <IconButton onClick={() => onClickReject(params.row)}>
                <Icon name="remove" />
              </IconButton>
            )}
            {updateQuantity && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_EXPORT_PROPOSAL.EDIT.PATH.replace(
                      ':id',
                      `${id}`,
                    ),
                  )
                }
              >
                <Icon name="updateQuantity" />
              </IconButton>
            )}
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
      filter: convertFilterParams(filters, [
        { field: 'createdAt', filterFormat: 'date' },
      ]),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseExportProposal(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setModal({ tempItem, isOpenDeleteModal: true })
  }
  const onClickConfirm = (tempItem) => {
    setModal({ tempItem, isOpenComfirmModal: true })
  }
  const onClickReject = (tempItem) => {
    setModal({ tempItem, isOpenRejectModal: true })
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseExportProposal(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseModal = () => {
    setModal({
      isOpenDeleteModal: false,
      isOpenComfirmModal: false,
      isOpenRejectModal: false,
      tempItem: null,
    })
  }
  const onSubmitConfirm = () => {
    actions.confirmWarehouseExportProposalById(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenComfirmModal: false, tempItem: null })
  }

  const onSubmitReject = () => {
    actions.rejectWarehouseExportProposalById(modal.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenRejectModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          onImport={(params) => importWarehouseExportProposalApi(params)}
          onExport={() =>
            exportWarehouseExportProposalApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: `${x?.id}` })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }
          onDownloadTemplate={getWarehouseExportProposalTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() =>
            history.push(ROUTE.WAREHOUSE_EXPORT_PROPOSAL.CREATE.PATH)
          }
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }
  // const data = [
  //   {
  //     id: 1,
  //     unit: 'hi',
  //     status: 1,
  //   },
  //   {
  //     id: 2,
  //     unit: 'hi',
  //     status: 2,
  //   },
  //   {
  //     id: 3,
  //     unit: 'hi',
  //     status: 0,
  //   },
  // ]
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseExportProposal')}
      onSearch={setKeyword}
      placeholder={t('warehouseExportProposal.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('warehouseExportProposal.list')}
        rows={warehouseExportProposalList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          apiUrl: API_URL.BUSINESS_TYPE,
          onSuccess: () => {
            if (page === 1) {
              refreshData()
            } else {
              setPage(1)
            }
            setSelectedRows([])
          },
        }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('warehouseExportProposal.deleteTitlePopup')}
        onCancel={onCloseModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseExportProposal.deleteConfirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenComfirmModal}
        title={t('warehouseExportProposal.confirmTitlePopup')}
        onCancel={onCloseModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('warehouseExportProposal.Confirm')}
      </Dialog>
      <Dialog
        open={modal.isOpenRejectModal}
        title={t('warehouseExportProposal.rejectTitlePopup')}
        onCancel={onCloseModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitReject}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseExportProposal.rejectConfirm')}
      </Dialog>
    </Page>
  )
}

export default WarehouseExportProposal