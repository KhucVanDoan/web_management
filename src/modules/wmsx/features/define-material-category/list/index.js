import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { NOTIFICATION_TYPE } from '~/common/constants'
import { FUNCTION_CODE } from '~/common/constants/functionCode'
import { useQueryState } from '~/common/hooks'
import { useApp } from '~/common/hooks/useApp'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import Guard from '~/components/Guard'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import StatusSwitcher from '~/components/StatusSwitcher'
import TableCollapse from '~/components/TableCollapse'
import { ACTIVE_STATUS, ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineMaterialCategory from '~/modules/wmsx/redux/hooks/useDefineMaterialCategory'
import { getMaterialChildDetailsApi } from '~/modules/wmsx/redux/sagas/define-material-category/get-material-child-details'
import { exportMaterialCategoryApi } from '~/modules/wmsx/redux/sagas/define-material-category/import-export'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'
import addNotification from '~/utils/toast'

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
  const { canAccess } = useApp()

  const [bomTree, setBomTree] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [loadingExport, setLoadingExport] = useState(false)
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
  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])
  const columns = [
    {
      field: 'code',
      headerName: t('defineMaterialCategory.materialCode'),
      width: 150,
      sortable: true,
      visible: 'always',
      renderCell: (params) => params.row?.code,
    },
    {
      field: 'name',
      headerName: t('defineMaterialCategory.materialName'),
      width: 150,
      sortable: true,
      visible: 'always',
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
      filterFormat: 'date',
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
      visible: 'always',
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params?.row
        const isLocked = status === ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <Guard code={FUNCTION_CODE.ITEM_DETAIL_ITEM_TYPE}>
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
            </Guard>
            <Guard code={FUNCTION_CODE.ITEM_UPDATE_ITEM_TYPE}>
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
            </Guard>
            <Guard
              code={
                isLocked
                  ? FUNCTION_CODE.ITEM_REJECT_ITEM_TYPE
                  : FUNCTION_CODE.ITEM_CONFIRM_ITEM_TYPE
              }
            >
              <IconButton onClick={() => onClickUpdateStatus(params.row)}>
                <Icon name={isLocked ? 'locked' : 'unlock'} />
              </IconButton>
            </Guard>
          </div>
        )
      },
    },
  ]

  const additionColums = [
    {
      field: 'code',
      headerName: t('defineMaterialCategory.mainGroupCode'),
      width: 150,
    },
    {
      field: 'name',
      headerName: t('defineMaterialCategory.mainGroupName'),
      width: 150,
    },
    {
      field: 'mainGroupStatus',
      headerName: t('general.status'),
      width: 150,
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
      renderCell: (params) =>
        convertUtcDateTimeToLocalTz(params.row?.createdAt),
    },
  ]

  const producingStepColumns = [
    {
      field: 'code',
      headerName: t('defineMaterialCategory.subGroupCode'),
      width: 150,
    },
    {
      field: 'name',
      headerName: t('defineMaterialCategory.subGroupName'),
      width: 150,
    },
    {
      field: 'subGroupStatus',
      headerName: t('general.status'),
      width: 150,
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
      renderCell: (params) =>
        convertUtcDateTimeToLocalTz(params.row?.createdAt),
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
    const response = await getMaterialChildDetailsApi(id)
    if (response?.status === 200 || response?.statusCode === 200) {
      const newBomTree = bomTree?.map((bom) => {
        if (bom?.id === id) {
          const newBom = { ...bom }
          if (!bom.subBom) {
            if (response?.data?.length > 0) {
              newBom['subBom'] =
                (response?.data || [])?.map((i) => ({
                  ...i,
                  producingSteps: i?.children,
                })) || []
            }
          }
          return newBom
        } else {
          return bom
        }
      })
      setBomTree(newBomTree)
    } else {
      addNotification(
        response?.statusText || response?.data?.statusText,
        NOTIFICATION_TYPE.ERROR,
      )
    }
  }

  const onClickUpdateStatus = (tempItem) => {
    setModal({ tempItem, isOpenUpdateStatusModal: true })
  }

  const onSubmitUpdateStatus = () => {
    if (modal.tempItem?.status === ACTIVE_STATUS.ACTIVE) {
      actions.rejectMaterialCategoryById(modal.tempItem?.id, () => {
        refreshData()
      })
    } else if (modal.tempItem?.status === ACTIVE_STATUS.INACTIVE) {
      actions.confirmMaterialCategoryById(modal.tempItem?.id, () => {
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
          name={t('menu.defineMaterialCategory')}
          loadingExport={setLoadingExport}
          // {...(canAccess(FUNCTION_CODE.ITEM_IMPORT_ITEM_TYPE)
          //   ? {
          //       onImport: () => {},
          //     }
          //   : {})}
          {...(canAccess(FUNCTION_CODE.ITEM_EXPORT_ITEM_TYPE)
            ? {
                onExport: () =>
                  exportMaterialCategoryApi({
                    columnSettings: JSON.stringify(columnsSettings),
                    queryIds: JSON.stringify(
                      selectedRows?.map((x) => ({ id: `${x?.id}` })),
                    ),
                    keyword: keyword.trim(),
                    filter: convertFilterParams(filters, [
                      { field: 'createdAt', filterFormat: 'date' },
                    ]),
                    sort: convertSortParams(sort),
                  }),
              }
            : {})}
          onRefresh={refreshData}
        />
        <Guard code={FUNCTION_CODE.ITEM_CREATE_ITEM_TYPE}>
          <Button
            onClick={() =>
              history.push(ROUTE.DEFINE_MATERIAL_CATEGORY.CREATE.PATH)
            }
            icon="add"
            sx={{ ml: 4 / 3 }}
          >
            {t('general:common.create')}
          </Button>
        </Guard>
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
      loading={isLoading || loadingExport}
    >
      <TableCollapse
        title={t('defineMaterialCategory.title')}
        rows={bomTree}
        pageSize={pageSize}
        page={page}
        columns={columns}
        handleGetData={handleGetData}
        additionColums={additionColums}
        producingStepColumns={producingStepColumns}
        onSelectionChange={setSelectedRows}
        selected={selectedRows}
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
