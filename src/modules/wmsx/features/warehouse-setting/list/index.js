import React, { useEffect, useMemo, useState } from 'react'

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
import { useWarehouseSetting } from '~/modules/wmsx/redux/hooks/useWarehouseSetting'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'warehouseSetup',
  },
  {
    route: ROUTE.WAREHOUSE_SETTING.LIST.PATH,
    title: ROUTE.WAREHOUSE_SETTING.LIST.TITLE,
  },
]

const warehouseSetting = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState()
  const {
    data: { warehouseSettingList, isLoading, total },
    actions,
  } = useWarehouseSetting()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
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
  } = useQueryState()

  const columns = useMemo(
    () => [
      // {
      //   field: 'id',
      //   headerName: '#',
      //   width: 80,
      //   fixed: true,
      // },
      {
        field: 'code',
        headerName: t('warehouseSetting.code'),
        width: 150,
        sortable: true,
      },
      {
        field: 'name',
        headerName: t('warehouseSetting.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'description',
        headerName: t('warehouseSetting.description'),
        width: 150,
      },

      {
        field: 'createdAt',
        headerName: t('warehouseSetting.createdAt'),
        width: 200,
        filterFormat: 'date',

        fixed: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('warehouseSetting.updatedAt'),
        width: 200,

        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.updatedAt)
        },
      },
      {
        field: 'action',
        headerName: t('warehouseSetting.actions'),
        width: 250,
        align: 'center',
        fixed: true,
        renderCell: (params) => {
          const { id } = params?.row
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_SETTING.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>

              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.WAREHOUSE_SETTING.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>

              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
              </IconButton>
            </div>
          )
        },
      },
    ],
    [],
  )
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteWarehouseSetting(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)

    setIsOpenDeleteModal(false)
  }
  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchWarehouseSetting(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.WAREHOUSE_SETTING.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warehouseSetting')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('warehouseSetting.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('warehouseSetting.title')}
        columns={columns}
        rows={warehouseSettingList?.items}
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
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
        }}
      ></DataTable>
      <Dialog
        open={isOpenDeleteModal}
        title={t('warehouseSetting.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('warehouseSetting.deleteConfirm')}
        <LV
          label={t('warehouseSetting.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warehouseSetting.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default warehouseSetting
