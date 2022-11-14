import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useRoleList from '~/modules/wmsx/redux/hooks/useRoleList'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.ROLE_LIST.LIST.PATH,
    title: ROUTE.ROLE_LIST.LIST.TITLE,
  },
]
const RoleList = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const {
    data: { roleList, isLoading, total },
    actions,
  } = useRoleList()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })

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

  const columns = [
    {
      field: 'code',
      headerName: t('roleList.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('roleList.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 150,
      fixed: true,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id } = row
        return (
          <div>
            <Guard code={FUNCTION_CODE.USER_LIST_USER_ROLE_SETTING}>
              <IconButton
                onClick={() => {
                  history.push(
                    ROUTE.ROLE_LIST.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }}
              >
                <Icon name="show" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.USER_UPDATE_USER_ROLE_SETTING}>
              <IconButton
                onClick={() => {
                  history.push(
                    ROUTE.ROLE_LIST.EDIT.PATH.replace(':id', `${id}`),
                  )
                }}
              >
                <Icon name="edit" />
              </IconButton>
            </Guard>
            <Guard code={FUNCTION_CODE.USER_DELETE_USER_ROLE_SETTING}>
              <IconButton
                onClick={() => {
                  handleOpenDeleteModal(params.row)
                }}
              >
                <Icon name="delete" />
              </IconButton>
            </Guard>
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
    actions.searchRoleList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const renderHeaderRight = () => {
    return (
      <>
        <Guard code={FUNCTION_CODE.USER_CREATE_USER_ROLE_SETTING}>
          <Button
            onClick={() => history.push(ROUTE.ROLE_LIST.CREATE.PATH)}
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('general:common.create')}
          </Button>
        </Guard>
      </>
    )
  }

  const handleOpenDeleteModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenDeleteModal: true,
    })
  }

  const onSubmitDeleteModal = () => {
    actions.deleteRole(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({
      tempItem: null,
      isOpenDeleteModal: false,
    })
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.roleList')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('roleList.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('roleList.title')}
        columns={columns}
        rows={roleList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('roleList.roleDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('roleList.confirmDelete')}
        <LV
          label={t('roleList.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('roleList.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default RoleList
