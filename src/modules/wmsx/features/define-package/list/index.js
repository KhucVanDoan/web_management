import React, { useState, useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { FieldArray, useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION, QR_CODE_TYPE, TEXTFIELD_ALLOW } from '~/common/constants'
import { API_URL } from '~/common/constants/apiUrl'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import ImportExport from '~/components/ImportExport'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  DEFINE_PACKAGE_STATUS,
  DEFINE_PACKAGE_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useDefinePackage from '~/modules/wmsx/redux/hooks/useDefinePackage'
import {
  exportPackageApi,
  getPackageTemplateApi,
  importPackageApi,
} from '~/modules/wmsx/redux/sagas/define-package/import-export-package'
import { ROUTE } from '~/modules/wmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
import { validationSchema } from './schema'

const breadcrumbs = [
  {
    title: 'defineCategory',
  },
  {
    route: ROUTE.DEFINE_PACKAGE.LIST.PATH,
    title: ROUTE.DEFINE_PACKAGE.LIST.TITLE,
  },
]
function DefinePackage() {
  const { t } = useTranslation('wmsx')
  const history = useHistory()
  const [isOpenPrintQRModal, setIsOpenPrintQRModal] = useState(false)
  const {
    data: { packageList, total, isLoading },
    actions,
  } = useDefinePackage()

  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

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
    {
      field: 'code',
      headerName: t('definePackage.code'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('definePackage.name'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'description',
      headerName: t('definePackage.description'),
      width: 200,
      sortable: false,
    },
    {
      field: 'createdAt',
      headerName: t('definePackage.createdAt'),
      filterFormat: 'date',
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const createdAt = params.row.createdAt
        return convertUtcDateTimeToLocalTz(createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('definePackage.status'),
      width: 150,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={DEFINE_PACKAGE_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('definePackage.action'),
      width: 200,
      sortable: false,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { status, id } = params.row
        const isConfirmed = status === DEFINE_PACKAGE_STATUS.PENDING
        const hasEditDeleteBtn =
          status === DEFINE_PACKAGE_STATUS.PENDING ||
          status === DEFINE_PACKAGE_STATUS.REJECTED

        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.DEFINE_PACKAGE.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            {hasEditDeleteBtn && (
              <>
                <IconButton
                  onClick={() =>
                    history.push(
                      ROUTE.DEFINE_PACKAGE.EDIT.PATH.replace(':id', `${id}`),
                    )
                  }
                >
                  <Icon name="edit" />
                </IconButton>
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="delete" />
                </IconButton>
              </>
            )}
            {isConfirmed && (
              <IconButton onClick={() => onClickConfirmed(params.row)}>
                <Icon name="tick" />
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
    actions.searchPackages(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deletePackage(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }

  const onClickConfirmed = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenConfirmModal(true)
  }

  const submitConfirm = () => {
    actions.confirmPackageById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const onSelectionChange = (selected) => {
    setSelectedRows(selected.map((item) => ({ ...item, amount: 1 })))
  }
  const handleSubmitPrintQR = (values) => {
    const params = {
      items: values?.items.map((item) => ({
        id: item.id,
        quantity: item.amount,
      })),
      type: QR_CODE_TYPE.PACKAGE,
    }
    actions.printQRPackages(params, () => {
      setIsOpenPrintQRModal(false)
    })
  }
  const renderFooterPrintModal = () => {
    const { resetForm } = useFormikContext()
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& button + button': {
            ml: 4 / 3,
          },
        }}
      >
        <Button color="grayF4" onClick={() => setIsOpenPrintQRModal(false)}>
          {t('general:common.close')}
        </Button>
        <Button variant="outlined" color="subText" onClick={resetForm}>
          {t('general:common.cancel')}
        </Button>
        <Button type="submit" icon="qrWhite">
          {t('general:common.print')}
        </Button>
      </Box>
    )
  }

  const printQRColumns = useMemo(() => [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'code',
      headerName: t('definePackage.code'),
      width: 200,
    },
    {
      field: 'name',
      headerName: t('definePackage.name'),
      width: 200,
    },
    {
      field: 'amount',
      headerName: t('definePackage.productAmount'),
      width: 200,
      renderCell: (_, index) => {
        return (
          <Field.TextField
            name={`items[${index}].amount`}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
  ])
  const renderHeaderRight = () => {
    return (
      <>
        <Button
          variant="outlined"
          disabled={selectedRows.length === 0}
          onClick={() => setIsOpenPrintQRModal(true)}
          sx={{ mr: 4 / 3 }}
          icon="qr"
        >
          {t('definePackage.printQRButton')}
        </Button>
        <ImportExport
          name={t('menu.importExportData')}
          onImport={(params) => {
            importPackageApi(params)
          }}
          onExport={() => {
            exportPackageApi({
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
          onDownloadTemplate={getPackageTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.DEFINE_PACKAGE.CREATE.PATH)}
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
      title={t('menu.definePackage')}
      onSearch={setKeyword}
      placeholder={t('definePackage.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('definePackage.title')}
        rows={packageList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        onSettingChange={setColumnsSettings}
        onSelectionChange={onSelectionChange}
        selected={selectedRows}
        total={total}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          apiUrl: API_URL.PACKAGE,
          onSuccess: () => {
            if (page === 1) {
              refreshData()
            } else {
              setPage(1)
            }
            setSelectedRows([])
          },
        }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('definePackage.definePackageDelete')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('definePackage.confirmDelete')}
        <LV
          label={t('definePackage.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('definePackage.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={submitConfirm}
        submitLabel={t('general:common.yes')}
        noBorderBottom
      >
        {t('general:common.confirmMessage.confirm')}
        <LV
          label={t('definePackage.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('definePackage.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenPrintQRModal}
        title={t('definePackage.printQRModalTitle')}
        maxWidth="md"
        renderFooter={renderFooterPrintModal}
        onCancel={() => setIsOpenPrintQRModal(false)}
        formikProps={{
          initialValues: { items: selectedRows },
          validationSchema: validationSchema(t),
          onSubmit: handleSubmitPrintQR,
          enableReinitialize: true,
        }}
      >
        <FieldArray
          name="items"
          render={() => (
            <DataTable
              rows={selectedRows}
              columns={printQRColumns}
              striped={false}
              hideSetting
              hideFooter
            />
          )}
        />
      </Dialog>
    </Page>
  )
}

export default DefinePackage
