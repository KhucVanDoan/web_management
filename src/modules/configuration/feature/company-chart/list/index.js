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
import TableCollapse from '~/components/TableCollapse'
import useDefineCompany from '~/modules/database/redux/hooks/useDefineCompany'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import { exportPlanReportApi } from '~/modules/mesx/redux/sagas/plan-report/import-export-plan-report'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.COMPANY_CHART.LIST.PATH,
    title: ROUTE.COMPANY_CHART.LIST.TITLE,
  },
]
const CompanyChart = () => {
  const { t } = useTranslation(['configuration'])
  const [bomTree, setBomTree] = useState([])
  const [columnsSettings, setColumnsSettings] = useState([])

  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  const {
    data: { companyList, isLoading, total },
    actions: companyActs,
  } = useDefineCompany()

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
      field: 'code',
      headerName: t('companyChart.companyCode'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('companyChart.companyName'),
      width: 150,
      sortable: true,
      fixed: true,
    },
    {
      field: 'userQuantity',
      headerName: t('companyChart.numOfEmployees'),
      width: 120,
      sortable: true,
    },
    {
      field: 'address',
      headerName: t('companyChart.address'),
      width: 150,
      sortable: true,
    },
    {
      field: 'phone',
      headerName: t('companyChart.phone'),
      width: 120,
      sortable: true,
    },
    {
      field: 'taxNo',
      headerName: t('companyChart.tax'),
      width: 120,
      sortable: true,
    },
    {
      field: 'email',
      headerName: t('companyChart.email'),
      width: 150,
      sortable: true,
    },
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 180,
      fixed: true,
      align: 'center',
      renderCell: () => {
        return (
          <div>
            <IconButton onClick={() => {}}>
              <Icon name="show" />
            </IconButton>
            <IconButton onClick={() => {}}>
              <Icon name="edit" />
            </IconButton>
            <IconButton onClick={() => {}}>
              <Icon name="delete" />
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
    {
      field: 'actions',
      headerName: t('general:common.action'),
      width: 200,
      fixed: true,
      align: 'center',
      renderCell: (params) => {
        const { id } = params?.row
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.MAINTENANCE_TEAM.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.MAINTENANCE_TEAM.EDIT.PATH.replace(':id', `${id}`),
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
  ]

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    companyActs.searchCompanies(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setBomTree(companyList)
  }, [companyList])

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

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    // actions.deleteCompanyChartStart(tempItem?.id, () => {
    //   refreshData()
    // })
    setTempItem(null)
    setIsOpenDeleteModal(false)
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
          onClick={() => history.push(ROUTE.MAINTENANCE_TEAM.CREATE.PATH)}
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
      title={t('menu.companyChart')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('companyChart.searchPlaceholder')}
      loading={isLoading}
    >
      <TableCollapse
        title={t('companyChart.title')}
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
        open={isOpenDeleteModal}
        title={t('companyChart.deleteTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('companyChart.confirmDetele')}
        <LV
          label={t('companyChart.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('companyChart.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </Page>
  )
}

export default CompanyChart
