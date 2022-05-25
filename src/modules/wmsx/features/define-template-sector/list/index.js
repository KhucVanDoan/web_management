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
import { DEFAULT_UNITS } from '~/modules/wmsx/constants'
import { useTemplateSector } from '~/modules/wmsx/redux/hooks/useDefineTemplateSector'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './form-filter'
const breadcrumbs = [
  {
    title: 'warehouseSetup',
  },
  {
    route: ROUTE.TEMPLATE_SECTOR.LIST.PATH,
    title: ROUTE.TEMPLATE_SECTOR.LIST.TITLE,
  },
]

const defineTemplateSector = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState()
  const {
    data: { templateSectorList, isLoading, total },
    actions,
  } = useTemplateSector()
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
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
        field: 'name',
        headerName: t('templateSector.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'size',
        headerName: t('templateSector.size'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return `${params?.row?.long?.value} * ${
            params?.row?.width?.value
          } * ${params?.row?.height?.value} ${t(
            DEFAULT_UNITS.find((unit) => unit.id === params?.row?.width?.unit)
              ?.name,
          )}`
        },
      },
      {
        field: 'quantitySector',
        headerName: t('templateSector.quantitySector'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.totalShelfsInSector
        },
      },
      {
        field: 'createdAt',
        headerName: t('templateSector.createdAt'),
        width: 200,
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'action',
        headerName: t('templateSector.action'),
        width: 250,
        align: 'center',
        renderCell: (params) => {
          const { id } = params?.row
          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.TEMPLATE_SECTOR.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>

              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.TEMPLATE_SECTOR.EDIT.PATH.replace(':id', `${id}`),
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
    actions.deleteTemplateSector(tempItem?.id, () => {
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
    actions.searchTemplateSectors(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.TEMPLATE_SECTOR.CREATE.PATH)}
          icon="add"
          sx={{ ml: 4 / 3 }}
        >
          {t('templateSector.create')}
        </Button>
      </>
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.templateSector')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('templateSector.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('templateSector.title')}
        columns={columns}
        rows={templateSectorList}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total?.total}
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
        title={t('templateSector.deleteModalTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('templateSector.deleteConfirm')}
        <LV
          label={t('templateSector.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default defineTemplateSector
