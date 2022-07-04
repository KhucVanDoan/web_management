import { useEffect, useState } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  QUALITY_POINT_STATUS,
  QUALITY_POINT_STATUS_TO_CONFIRM,
  QUALITY_POINT_STATUS_TO_DELETE,
  QUALITY_POINT_STATUS_TO_EDIT,
  STAGE_OPTION_MAP,
} from '~/modules/qmsx/constants'
import useDefineQualityPoint from '~/modules/qmsx/redux/hooks/useDefineQualityPoint'
import getExportQualityPointApi from '~/modules/qmsx/redux/sagas/define-quality-point/export-quality-point'
import { ROUTE } from '~/modules/qmsx/routes/config'
import { api } from '~/services/api'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'qualityControl',
  },
  {
    route: ROUTE.DEFINE_QUALITY_POINT.LIST.PATH,
    title: ROUTE.DEFINE_QUALITY_POINT.LIST.TITLE,
  },
]

function DefineQualityPoint() {
  const { t } = useTranslation('qmsx')
  const history = useHistory()

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
    data: { qualityPointList, total, isLoading },
    actions,
  } = useDefineQualityPoint()

  const [modalDelete, setDeleteModal] = useState({
    id: null,
    isOpenDeleteModal: false,
  })

  const [modalConfirm, setConfirmModal] = useState({
    id: null,
    isOpenConfirmModal: false,
  })

  const [selectedRows, setSelectedRows] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 50,
    //   sortable: false,
    // },
    {
      field: 'code',
      headerName: t('defineQualityPoint.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineQualityPoint.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'stageQC',
      headerName: t('defineQualityPoint.stageQC'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { stage } = params?.row
        return t(STAGE_OPTION_MAP[+stage])
      },
    },
    {
      field: 'excutedBy',
      headerName: t('common.excutedBy'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { username } = params?.row
        return username
      },
    },
    {
      field: 'createdAt',
      headerName: t('general:common.createdAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('defineQualityPoint.status'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const { status } = params?.row

        return (
          <Status
            options={QUALITY_POINT_STATUS}
            value={+status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status } = params?.row
        const canConfirm = QUALITY_POINT_STATUS_TO_CONFIRM.includes(+status)
        const canDelete = QUALITY_POINT_STATUS_TO_DELETE.includes(+status)
        const canEdit = QUALITY_POINT_STATUS_TO_EDIT.includes(+status)
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_QUALITY_POINT.DETAIL.PATH.replace(
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
                    ROUTE.DEFINE_QUALITY_POINT.EDIT.PATH.replace(
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
              <IconButton onClick={() => onClickDelete(id)}>
                <Icon name="delete" />
              </IconButton>
            )}
            {canConfirm && (
              <IconButton onClick={() => onClickConfirm(id)}>
                <Icon name="tick" />
              </IconButton>
            )}
            <IconButton onClick={() => onClickClone(id)}>
              <Icon name="invoid" />
            </IconButton>
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
    setSelectedRows([])
    actions.searchQualityPoint(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickClone = (id) => {
    history.push(ROUTE.DEFINE_QUALITY_POINT.CREATE.PATH, id)
  }

  // Handle: Onclick DELETE
  const onClickDelete = (id) => {
    setDeleteModal({ id, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    const params = {
      id: modalDelete.id,
    }
    actions.deleteQualityPoint(params, () => {
      setDeleteModal({ ...modalDelete, isOpenDeleteModal: false })
      refreshData()
    })
  }

  const onCloseDeleteModal = () => {
    setDeleteModal({ isOpenDeleteModal: false, id: null })
  }

  // Handle: Onclick CONFIRM
  const onClickConfirm = (id) => {
    setConfirmModal({ id, isOpenConfirmModal: true })
  }

  const onSubmitConfirm = () => {
    const params = {
      id: modalConfirm.id,
    }
    actions.confirmQualityPoint(params, () => {
      setConfirmModal({ ...modalConfirm, isOpenConfirmModal: false })
      refreshData()
    })
  }

  const onCloseConfirmModal = () => {
    setConfirmModal({ isOpenConfirmModal: false, id: null })
  }

  //handle: selected checkbox
  const onSelectionChange = (selected) => {
    setSelectedRows(selected)
  }

  const importQualityPointApi = (params) => {
    const uri = `/v1/quality-controls/quality-points/import`
    const formData = new FormData()
    formData.append('file', params)
    return api.postMultiplePart(uri, formData)
  }

  const getImportQualityPointTemplateApi = () => {
    const uri = `/v1/quality-controls/quality-points/import-template`
    return api.get(uri)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('importExport.qualityPoint')}
          onImport={importQualityPointApi}
          onDownloadTemplate={getImportQualityPointTemplateApi}
          onExport={() =>
            getExportQualityPointApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows.map((x) => ({ id: x?.id })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }
          onRefresh={refreshData}
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_QUALITY_POINT.CREATE.PATH)}
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
      title={t('menu.defineQualityPoint')}
      onSearch={setKeyword}
      placeholder={t('defineQualityPoint.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineQualityPoint.qualityPointList')}
        rows={qualityPointList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        onSelectionChange={onSelectionChange}
        selected={selectedRows}
        onSettingChange={(settings) => setColumnsSettings(settings)}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modalDelete.isOpenDeleteModal}
        title={t('defineQualityPoint.modalDeleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineQualityPoint.modalDeleteContent')}
      </Dialog>
      <Dialog
        open={modalConfirm.isOpenConfirmModal}
        title={t('defineQualityPoint.modalConfirmTitle')}
        onCancel={onCloseConfirmModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('defineQualityPoint.modalConfirmContent')}
      </Dialog>
    </Page>
  )
}

export default DefineQualityPoint
