import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import useAttributeType from '../../redux/hooks/useAttributeType'
import FilterForm from './filter'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.ATTRIBUTE_TYPE.LIST.PATH,
    title: ROUTE.ATTRIBUTE_TYPE.LIST.TITLE,
  },
]
function AttributeType() {
  const { t } = useTranslation('mmsx')
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
    data: { total, isLoading, attributeTypeList },
    actions,
  } = useAttributeType()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenDeleteModal: false,
    isOpenConfirmModal: false,
  })

  const columns = [
    {
      field: 'code',
      headerName: t('attributeType.table.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('attributeType.table.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('attributeType.table.description'),
      width: 300,
      sortable: true,
    },
    {
      field: 'unit',
      headerName: t('attributeType.table.unit'),
      width: 200,
      sortable: true,
      renderCell: (params) => params?.row?.unit?.name || '',
    },
    {
      field: 'createdAt',
      headerName: t('common.createdAt'),
      filterFormat: 'date',
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'action',
      headerName: t('common.action'),
      width: 200,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id } = params.row
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.ATTRIBUTE_TYPE.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.ATTRIBUTE_TYPE.EDIT.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => handleOpenDeleteModal(params.row)}>
              <Icon name="delete" />
            </IconButton>
          </>
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
    actions.getAttributeTypeList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const handleOpenDeleteModal = (tempItem) => {
    setModal({
      tempItem,
      isOpenDeleteModal: true,
    })
  }

  const onCloseDeleteModal = () => {
    setModal({
      tempItem: null,
      isOpenDeleteModal: false,
    })
  }

  const onSubmitDeleteModal = () => {
    actions.deleteAttributeType(modal?.tempItem?.id, () => {
      refreshData()
    })
    setModal({ isOpenDeleteModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.ATTRIBUTE_TYPE.CREATE.PATH)}
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
      title={t('menu.attributeType')}
      onSearch={setKeyword}
      placeholder={t('common.searchPlaceHolder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('attributeType.title')}
        rows={attributeTypeList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={modal.isOpenDeleteModal}
        title={t('attributeType.modalDelete.title')}
        onCancel={onCloseDeleteModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDeleteModal}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('attributeType.modalDelete.description')}
        <LabelValue
          label={t('attributeType.table.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('attributeType.table.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default AttributeType
