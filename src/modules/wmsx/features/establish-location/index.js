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
import Status from '~/components/Status'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import { LOCATION_SETTING_TYPE_OPTION } from '../../constants'
import useLocationSetting from '../../redux/hooks/useLocationSetting'
import FilterForm from './filter'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_SETUP.TITLE,
  },
  {
    route: ROUTE.ESTABLISH_LOCATION.LIST.PATH,
    title: ROUTE.ESTABLISH_LOCATION.LIST.TITLE,
  },
]
function EstablishLocation() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const [tempItem, setTempItem] = useState()
  const [deleteModal, setDeleteModal] = useState(false)

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
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
    data: { isLoading, total, locationSettingsList },
    actions,
  } = useLocationSetting()

  useEffect(() => {
    refreshData()
  }, [page, pageSize, sort, filters, keyword])

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.searchLocationSetting(params)
  }

  const columns = [
    {
      field: 'code',
      headerName: t('locationSetting.settingCode'),
      width: 80,
      fixed: true,
      sortable: true,
    },
    {
      field: 'name',
      headerName: t('locationSetting.settingName'),
      width: 150,
      fixed: true,
      sortable: true,
    },
    {
      field: 'type',
      headerName: t('locationSetting.type'),
      width: 150,
      renderCell: (params) => {
        const { type } = params.row
        return (
          <Status
            options={LOCATION_SETTING_TYPE_OPTION}
            value={type}
            variant="text"
          />
        )
      },
    },
    {
      field: 'description',
      headerName: t('locationSetting.description'),
      width: 150,
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      sortable: false,
      fixed: true,
      align: 'center',
      renderCell: (params) => {
        const { row } = params
        const { id } = row
        return (
          <>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.ESTABLISH_LOCATION.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.ESTABLISH_LOCATION.EDIT.PATH.replace(':id', `${id}`),
                )
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
  ]

  const handleDeleteOpenModal = (tempItem) => {
    setTempItem(tempItem)
    setDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteLocationSetting(tempItem?.id, refreshData)
    setDeleteModal(false)
  }
  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.ESTABLISH_LOCATION.CREATE.PATH)}
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
      title={t('menu.locationSetting')}
      onSearch={setKeyword}
      placeholder={t('locationSetting.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('locationSetting.title')}
        rows={locationSettingsList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={total}
        filters={{
          form: <FilterForm />,
          defaultValue: DEFAULT_FILTERS,
          values: filters,
          onApply: setFilters,
        }}
        sort={sort}
      />
      <Dialog
        open={deleteModal}
        title={t('locationSetting.deleteTitle')}
        onCancel={() => setDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('locationSetting.confirmDelete')}
        <LabelValue
          label={t('locationSetting.settingCode')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LabelValue
          label={t('locationSetting.settingName')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default EstablishLocation
