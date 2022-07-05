import React, { useState, useEffect } from 'react'

import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useItemType from '~/modules/database/redux/hooks/useItemType'
import { ROUTE } from '~/modules/database/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import { exportItemTypeApi } from '../../redux/sagas/item-type-setting/import-export-item-type'
import FilterForm from './filter-form'

const breadcrumbs = [
  // {
  //   title: 'database',
  // },
  {
    route: ROUTE.ITEM_TYPE.LIST.PATH,
    title: ROUTE.ITEM_TYPE.LIST.TITLE,
  },
]
function ItemTypeSetting() {
  const { t } = useTranslation('database')
  const history = useHistory()
  const {
    data: { itemTypeList, total, isLoading },
    actions,
  } = useItemType()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

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
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('itemTypeSetting.typeCode'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('itemTypeSetting.typeName'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('itemTypeSetting.typeNote'),
      width: 400,
      sortable: false,
    },
    {
      field: 'createdAt',
      filterFormat: 'date',
      headerName: t('itemTypeSetting.createDate'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'updatedAt',
      filterFormat: 'date',
      headerName: t('itemTypeSetting.updateDate'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const updatedAt = params.row.updatedAt
        return convertUtcDateTimeToLocalTz(updatedAt)
      },
    },
    {
      field: 'action',
      headerName: t('itemTypeSetting.action'),
      width: 150,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id } = params.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.ITEM_TYPE.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(ROUTE.ITEM_TYPE.EDIT.PATH.replace(':id', `${id}`))
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => handleOpenDeleteModal(params.row)}>
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchItemTypes(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const handleOpenDeleteModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenDeleteModal: true,
    })
  }

  const onSubmitDeleteModal = () => {
    actions.deleteItemType(modal?.tempItem?.id, () => {
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

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('itemTypeSetting.export')}
          onExport={() => {
            exportItemTypeApi({
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
          onRefresh={refreshData}
          disabled
        />

        <Button
          onClick={() => history.push(ROUTE.ITEM_TYPE.CREATE.PATH)}
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
      title={t('menu.itemTypeSetting')}
      onSearch={setKeyword}
      placeholder={t('itemTypeSetting.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('itemTypeSetting.title')}
        rows={itemTypeList}
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
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('itemTypeSetting.itemTypeDelete')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('itemTypeSetting.confirmDelete')}
        <LV
          label={t('itemTypeSetting.typeCode')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('itemTypeSetting.typeName')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default ItemTypeSetting
