import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TableCollapse from '~/components/TableCollapse'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { exportPlanReportApi } from '~/modules/mesx/redux/sagas/plan-report/import-export-plan-report'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import StatusSwitcher from '~/modules/wmsx/partials/StatusSwitcher'
import useDefineMaterialCategory from '~/modules/wmsx/redux/hooks/useDefineMaterialCategory'
import { ROUTE } from '~/modules/wmsx/routes/config'
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
    route: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.PATH,
    title: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.TITLE,
  },
]
const DefineMaterialCategory = () => {
  const { t } = useTranslation(['wmsx'])
  const [bomTree, setBomTree] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const {
    data: { materialCategoryList, isLoading, total },
    actions,
  } = useDefineMaterialCategory()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenUpdateStatusModal: false,
  })

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

  const columns = [
    {
      field: 'materialCode',
      headerName: t('defineMaterialCategory.materialCode'),
      width: 150,
      sortable: true,
      fixed: true,
      renderCell: (params) => params.row?.code,
    },
    {
      field: 'materialName',
      headerName: t('defineMaterialCategory.materialName'),
      width: 150,
      sortable: true,
      fixed: true,
      renderCell: (params) => params.row?.name,
    },
    {
      field: 'materialStatus',
      headerName: t('defineMaterialCategory.materialStatus'),
      width: 120,
      sortable: true,
      renderCell: (params) => {
        const status = Number(params?.row?.status)
        return (
          <Status
            options={ACTIVE_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'createdAt',
      headerName: t('defineMaterialCategory.createdAt'),
      width: 120,
      sortable: true,
      renderCell: (params) =>
        convertUtcDateTimeToLocalTz(params.row?.createdAt),
    },
    {
      field: 'materialDesc',
      headerName: t('defineMaterialCategory.materialDesc'),
      width: 150,
      renderCell: (params) => params.row?.description,
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 180,
      fixed: true,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params?.row
        const isLocked = status === ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_MATERIAL_CATEGORY.EDIT.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => onClickUpdateStatus(params.row)}>
              <Icon name={isLocked ? 'locked' : 'unlock'} />
            </IconButton>
          </div>
        )
      },
    },
  ]

  const additionColums = [
    {
      field: 'code',
      headerName: t('companyChart.factoryCode'),
      width: 150,
    },
    {
      field: 'name',
      headerName: t('companyChart.factoryName'),
      width: 150,
    },
    {
      field: 'location',
      headerName: t('companyChart.address'),
      width: 150,
    },
    {
      field: 'userQuantity',
      headerName: t('companyChart.numOfEmployees'),
      width: 150,
    },
    {
      field: 'phone',
      headerName: t('companyChart.phone'),
      width: 150,
    },
    {
      field: 'employeeList',
      headerName: t('companyChart.employeeList'),
      width: 150,
      renderCell: (params) => {
        const factoryId = params.row.id
        return (
          <Button
            variant="text"
            size="small"
            bold={false}
            onClick={() => {
              history.push(
                `${ROUTE.USER_MANAGEMENT.LIST.PATH}?factoryId=${factoryId}`,
              )
            }}
          >
            {t('companyChart.viewList')}
          </Button>
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
    actions.searchMaterialCategory(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setBomTree(materialCategoryList)
  }, [materialCategoryList])

  const handleGetData = async (id) => {
    const resFactory = await searchFactoriesApi({
      filter: convertFilterParams({
        companyId: id,
      }),
    })

    const newBomTree = bomTree?.map((bom) => {
      if (bom?.id === id) {
        const newBom = { ...bom }
        if (!bom.subBom) {
          newBom['subBom'] = resFactory?.data?.items
        }
        return newBom
      } else {
        return bom
      }
    })
    setBomTree(newBomTree)
  }

  const onClickUpdateStatus = (tempItem) => {
    setModal({ tempItem, isOpenUpdateStatusModal: true })
  }

  const onSubmitUpdateStatus = () => {
    if (modal.tempItem?.status === ACTIVE_STATUS.ACTIVE) {
      actions.rejectExpenditureTypeById(modal.tempItem?.id, () => {
        refreshData()
      })
    } else if (modal.tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmExpenditureTypeById(modal.tempItem?.id, () => {
        refreshData()
      })
    }
    setModal({ isOpenUpdateStatusModal: false, tempItem: null })
  }

  const onCloseUpdateStatusModal = () => {
    setModal({ isOpenUpdateStatusModal: false, tempItem: null })
  }

  const renderHeaderRight = () => {
    return (
      <>
        <ImportExport
          name={t('planReport.export')}
          onImport={() => {}}
          onExport={(params) => {
            exportPlanReportApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(params?.map((x) => ({ id: x?.id }))),
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
          onClick={() =>
            history.push(ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.PATH)
          }
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
      title={t('menu.defineMaterialCategory')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('defineMaterialCategory.searchPlaceholder')}
      loading={isLoading}
    >
      <TableCollapse
        title={t('defineMaterialCategory.title')}
        rows={bomTree}
        pageSize={pageSize}
        page={page}
        columns={columns}
        handleGetData={handleGetData}
        additionColums={additionColums}
        isRoot={true}
        type={'list'}
        isView={true}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        sort={sort}
        total={total}
        filters={{
          form: <FilterForm />,
          values: filters,
          onApply: setFilters,
        }}
      />
      <Dialog
        open={modal.isOpenUpdateStatusModal}
        title={t('general.updateStatus')}
        onCancel={onCloseUpdateStatusModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUpdateStatus}
        submitLabel={t('general:common.yes')}
        {...(modal?.tempItem?.status === ACTIVE_STATUS.ACTIVE
          ? {
              submitProps: {
                color: 'error',
              },
            }
          : {})}
        noBorderBottom
      >
        {t('general.confirmMessage')}
        <LV
          label={t('defineMaterialCategory.materialCode')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('defineMaterialCategory.materialName')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('general.status')}
          value={
            <StatusSwitcher
              options={ACTIVE_STATUS_OPTIONS}
              value={modal?.tempItem?.status}
            />
          }
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default DefineMaterialCategory
