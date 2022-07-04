import React, { useEffect, useState, useMemo } from 'react'

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
import useItemUnit from '~/modules/database/redux/hooks/useItemUnit'
import { ROUTE } from '~/modules/database/routes/config'
import {
  convertUtcDateTimeToLocalTz,
  convertFilterParams,
  convertSortParams,
} from '~/utils'

import {
  exportItemUnitSettingApi,
  getItemUnitSettingTemplateApi,
  importItemUnitSettingApi,
} from '../../redux/sagas/item-unit-setting/import-export-item-unit'
import FilterForm from './filter-form'

const breadcrumbs = [
  // {
  //   title: 'database',
  // },
  {
    route: ROUTE.ITEM_UNIT.LIST.PATH,
    title: ROUTE.ITEM_UNIT.LIST.TITLE,
  },
]
function ItemUnitSetting() {
  const { t } = useTranslation(['database'])
  const history = useHistory()
  const {
    data: { isLoading, itemUnitList, total },
    actions,
  } = useItemUnit()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
  }

  const [deleteModal, setDeleteModal] = useState(false)
  const [tempItem, setTempItem] = useState()
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const columns = useMemo(() => [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 80,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('itemUnitDefine.unitCode'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('itemUnitDefine.unitName'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('itemUnitDefine.unitNote'),
      width: 350,
      sortable: false,
    },
    {
      field: 'createdAt',
      headerName: t('itemUnitDefine.createDate'),
      width: 150,
      sortable: true,
      filterFormat: 'date',
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'updatedAt',
      headerName: t('itemUnitDefine.updateDate'),
      width: 150,
      filterFormat: 'date',
      sortable: true,
      renderCell: (params) => {
        const updateAt = params.row.updatedAt
        return convertUtcDateTimeToLocalTz(updateAt)
      },
    },
    {
      field: 'action',
      headerName: t('itemUnitDefine.action'),
      width: 150,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { row } = params
        const { id } = row
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.ITEM_UNIT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(ROUTE.ITEM_UNIT.EDIT.PATH.replace(':id', `${id}`))
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => handleDeleteOpenModal(row)}>
              <Icon name="delete" />
            </IconButton>
          </>
        )
      },
    },
  ])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page: page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchItemUnits(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const handleDeleteOpenModal = (tempItem) => {
    setTempItem(tempItem)
    setDeleteModal(true)
  }

  const onSubmitDelete = () => {
    actions.deleteItemUnit(tempItem?.id)
    setDeleteModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('itemUnitDefine.import')}
          onImport={(params) => {
            importItemUnitSettingApi(params)
          }}
          onExport={() => {
            exportItemUnitSettingApi({
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
          onDownloadTemplate={getItemUnitSettingTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.ITEM_UNIT.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.itemUnitDefine')}
        onSearch={setKeyword}
        placeholder={t('itemUnitDefine.searchPlaceholder')}
        renderHeaderRight={renderHeaderRight}
        loading={isLoading}
      >
        <DataTable
          title={t('itemUnitDefine.title')}
          rows={itemUnitList}
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
          filters={{
            form: <FilterForm />,
            values: filters,
            defaultValue: DEFAULT_FILTERS,
            onApply: setFilters,
          }}
          sort={sort}
        />
        <Dialog
          open={deleteModal}
          title={t('itemUnitDefine.deleteTitle')}
          onCancel={() => setDeleteModal(false)}
          cancelLabel={t('general:common.no')}
          onSubmit={onSubmitDelete}
          submitLabel={t('general:common.yes')}
          submitProps={{
            color: 'error',
          }}
          noBorderBottom
        >
          {t('itemUnitDefine.confirmDelete')}
          <LV
            label={t('itemUnitDefine.unitCode')}
            value={tempItem?.code}
            sx={{ mt: 4 / 3 }}
          />
          <LV
            label={t('itemUnitDefine.unitName')}
            value={tempItem?.name}
            sx={{ mt: 4 / 3 }}
          />
        </Dialog>
      </Page>
    </>
  )
}

export default ItemUnitSetting
