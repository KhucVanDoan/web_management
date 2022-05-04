import { useState, useEffect } from 'react'

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
import useDefineActionGroup from '~/modules/qmsx/redux/hooks/useDefineActionGroup'
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
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_ACTION_GROUP.LIST.PATH,
    title: ROUTE.DEFINE_ACTION_GROUP.LIST.TITLE,
  },
]

const importActionGroupApi = (params) => {
  const uri = `/v1/quality-controls/action-categories/import`

  const formData = new FormData()
  formData.append('file', params)

  return api.postMultiplePart(uri, formData)
}

const getImportActionGroupTemplateApi = () => {
  const uri = `/v1/quality-controls/action-categories/import-template`

  return api.get(uri)
}

function DefineActionGroup() {
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
    data: { actionGroupList, total, isLoading },
    actions,
  } = useDefineActionGroup()

  const [modal, setModal] = useState({
    id: null,
    isOpenDeleteModal: false,
  })

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      sortable: false,
    },
    {
      field: 'code',
      headerName: t('defineActionGroup.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineActionGroup.name'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('defineActionGroup.description'),
      width: 100,
      sortable: true,
    },
    {
      field: 'createdAt',
      headerName: t('general:common.createdAt'),
      width: 100,
      sortable: true,
      renderCell: (params) => {
        const { createdAt } = params?.row
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_ACTION_GROUP.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_ACTION_GROUP.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickDelete(id)}>
              <Icon name="delete" />
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
    actions.searchActionGroup(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (id) => {
    setModal({ id, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    const params = {
      id: modal.id,
    }
    actions.deleteActionGroup(params, () => {
      setModal({ ...modal, isOpenDeleteModal: false })
      refreshData()
    })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, id: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('importExport.actionGroup')}
          onImport={importActionGroupApi}
          onDownloadTemplate={getImportActionGroupTemplateApi}
          onRefresh={refreshData}
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_ACTION_GROUP.CREATE.PATH)}
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
      title={t('menu.defineActionGroup')}
      onSearch={setKeyword}
      placeholder={t('defineActionGroup.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineActionGroup.actionGroupList')}
        rows={actionGroupList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={setFilters}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('defineActionGroup.modalDeleteTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineActionGroup.modalDeleteContent')}
      </Dialog>
    </Page>
  )
}

export default DefineActionGroup
