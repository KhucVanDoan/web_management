import React, { useState, useEffect } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useDefineItem from '~/modules/mesx/redux/hooks/useDefineItem'
import { ROUTE } from '~/modules/mesx/routes/config'
import {
  formatDateTimeUtc,
  convertFilterParams,
  convertSortParams,
} from '~/utils'

import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_ITEM.LIST.PATH,
    title: ROUTE.DEFINE_ITEM.LIST.TITLE,
  },
]

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

function DefineItem() {
  const { t } = useTranslation('mesx')
  const history = useHistory()
  const {
    data: { itemList, total, isLoading },
    actions,
  } = useDefineItem()
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState(null)

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    itemType: '',
    itemGroup: '',
    createTime: [],
  }

  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const {
    data: { BOMList },
    actions: commonActions,
  } = useCommonManagement()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
  })

  const columns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 50,
    //   sortable: false,
    //   fixed: true,
    // },
    {
      field: 'code',
      headerName: t('defineItem.code'),
      width: 80,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('defineItem.name'),
      width: 80,
      sortable: true,
      fixed: true,
    },
    {
      field: 'itemType',
      filterFormat: 'multiple',
      headerName: t('defineItem.type'),
      width: 80,
      sortable: true,
      renderCell: (params) => {
        const { itemType } = params.row
        return itemType.name
      },
    },
    {
      field: 'itemGroup',
      filterFormat: 'multiple',
      headerName: t('defineItem.group'),
      width: 80,
      sortable: true,
      renderCell: (params) => {
        const { itemGroup } = params.row
        return itemGroup.name
      },
    },
    {
      field: 'isDetailed',
      headerName: t('defineItem.isDetailed'),
      width: 50,
      sortable: false,
      renderCell: (params) => {
        const { hasItemDetail } = params.row
        return hasItemDetail ? checkedIcon : icon
      },
    },
    {
      field: 'isProductionObject',
      headerName: t('defineItem.isProductionObject'),
      width: 50,
      sortable: false,
      renderCell: (params) => {
        const { isProductionObject } = params.row
        return isProductionObject ? checkedIcon : icon
      },
    },
    {
      field: 'isHasBom',
      headerName: t('defineItem.isHasBom') + '?',
      width: 50,
      sortable: false,
      renderCell: (params) => {
        const { isHasBom } = params.row
        return isHasBom ? checkedIcon : icon
      },
    },
    {
      field: 'description',
      headerName: t('defineItem.description'),
      width: 150,
      sortable: false,
    },
    {
      field: 'bom',
      headerName: t('defineItem.bom'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, isHasBom } = params?.row
        const itemHasBom = BOMList.find((bom) => bom.itemId === id)?.id

        return isHasBom ? (
          <Button
            variant="text"
            bold={false}
            size="small"
            onClick={() =>
              history.push(
                ROUTE.DEFINE_BOM.DETAIL.PATH.replace(':id', `${itemHasBom}`),
              )
            }
          >
            {t('defineItem.bom')}
          </Button>
        ) : (
          <Button
            variant="text"
            bold={false}
            size="small"
            onClick={() =>
              history.push(ROUTE.DEFINE_BOM.CREATE.PATH + '?itemId=' + id)
            }
          >
            {t('defineItem.bom')}
          </Button>
        )
      },
    },
    {
      field: 'createdAt',
      filterFormat: 'date',
      headerName: t('defineItem.createdAt'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return formatDateTimeUtc(createdAt)
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 150,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, isHasBom } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_ITEM.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {!isHasBom && (
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.DEFINE_ITEM.EDIT.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="edit" />
              </IconButton>
            )}
            {!isHasBom && (
              <IconButton onClick={() => onClickDelete(params.row)}>
                <Icon name="delete" />
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
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchItems(params)
  }

  useEffect(() => {
    commonActions.getBoms()
  }, [])

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setModal({ tempItem, isOpenDeleteModal: true })
  }

  const onSubmitDelete = () => {
    actions.deleteItem(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const onCloseDeleteModal = () => {
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.DEFINE_ITEM.CREATE.PATH)}
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
      title={t('menu.defineItem')}
      onSearch={setKeyword}
      placeholder={t('defineItem.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('defineItem.title')}
        rows={itemList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onChangeFilter={setFilters}
        onChangeSort={setSort}
        total={total}
        sort={sort}
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
        open={modal.isOpenDeleteModal}
        title={t('defineItem.deleteModalTitle')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('defineItem.deleteConfirm')}
        <LV
          label={t('defineItem.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineItem.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineItem
