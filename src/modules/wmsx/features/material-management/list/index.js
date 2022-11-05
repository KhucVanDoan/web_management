import React, { useState, useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { FieldArray, useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { BULK_ACTION, TEXTFIELD_ALLOW } from '~/common/constants'
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
import StatusSwitcher from '~/components/StatusSwitcher'
import {
  MATERIAL_ACTIVE_STATUS,
  MATERIAL_ACTIVE_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useMaterialManagement from '~/modules/wmsx/redux/hooks/useMaterialManagement'
import { getqrCodeApi } from '~/modules/wmsx/redux/sagas/material-management/get-material-details.js'
import {
  exportMaterialApi,
  getMaterialTemplateApi,
  importMaterialApi,
} from '~/modules/wmsx/redux/sagas/material-management/import-export-material'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import * as bpac from '../../../../../assets/bpac.js'
import FilterForm from './filter-form'
import { filterSchema } from './filter-form/schema'
import { validationSchema } from './schema'

const breadcrumbs = [
  {
    route: ROUTE.MATERIAL_MANAGEMENT.LIST.PATH,
    title: ROUTE.MATERIAL_MANAGEMENT.LIST.TITLE,
  },
]

function MaterialManagement() {
  const { t } = useTranslation('wmsx')
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
  } = useQueryState({
    filters: DEFAULT_FILTERS,
  })

  const {
    data: { materialList, total, isLoading },
    actions,
  } = useMaterialManagement()

  const [modal, setModal] = useState({
    tempItem: null,
    isOpenUpdateStatusModal: false,
  })

  const [columnsSettings, setColumnsSettings] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [isOpenPrintQRModal, setIsOpenPrintQRModal] = useState(false)
  const columns = [
    {
      field: 'code',
      headerName: t('materialManagement.code'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'name',
      headerName: t('materialManagement.name'),
      width: 100,
      sortable: true,
      fixed: true,
    },
    {
      field: 'normalizeCode',
      headerName: t('materialManagement.normalizedCode'),
      width: 120,
    },
    {
      field: 'country',
      headerName: t('materialManagement.country'),
      width: 120,
      renderCell: (params) => params?.row?.manufacturingCountry?.name,
    },
    {
      field: 'objectCategory',
      headerName: t('materialManagement.objectCategory'),
      width: 120,
      renderCell: (params) => params?.row?.objectCategory?.name,
    },
    {
      field: 'description',
      headerName: t('materialManagement.description'),
      width: 120,
    },
    {
      field: 'status',
      headerName: t('materialManagement.status'),
      width: 120,
      renderCell: (params) => {
        const status = Number(params?.row.status)
        return (
          <Status
            options={MATERIAL_ACTIVE_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('general:common.action'),
      width: 150,
      align: 'center',
      fixed: true,
      renderCell: (params) => {
        const { id, status } = params?.row
        const isLocked = status === MATERIAL_ACTIVE_STATUS.ACTIVE
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.MATERIAL_MANAGEMENT.DETAIL.PATH.replace(':id', `${id}`),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.MATERIAL_MANAGEMENT.EDIT.PATH.replace(':id', `${id}`),
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

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(
        {
          ...filters,
          manufacturingCountryId: filters?.manufacturingCountryId?.id,
          objectCategoryId: filters?.objectCategoryId?.id,
        },
        [{ field: 'createdAt', filterFormat: 'date' }],
      ),
      sort: convertSortParams(sort),
    }
    actions.searchMaterials(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  useEffect(() => {
    setSelectedRows([])
  }, [keyword, sort, filters])

  const onClickUpdateStatus = (tempItem) => {
    setModal({ tempItem, isOpenUpdateStatusModal: true })
  }

  const onSubmitUpdateStatus = () => {
    if (modal.tempItem?.status === MATERIAL_ACTIVE_STATUS.ACTIVE) {
      actions.rejectMaterialById(modal.tempItem?.id, () => refreshData())
    } else if (
      modal.tempItem?.status === MATERIAL_ACTIVE_STATUS.INACTIVE ||
      modal.tempItem?.status === MATERIAL_ACTIVE_STATUS.REJECTED
    ) {
      actions.confirmMaterialById(modal.tempItem?.id, () => {
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
        <Button
          variant="outlined"
          disabled={selectedRows.length === 0}
          onClick={() => setIsOpenPrintQRModal(true)}
          sx={{ mr: 4 / 3 }}
          icon="qr"
        >
          {t('materialManagement.printQRButton')}
        </Button>
        <ImportExport
          onImport={(params) => importMaterialApi(params)}
          onExport={() =>
            exportMaterialApi({
              columnSettings: JSON.stringify(columnsSettings),
              queryIds: JSON.stringify(
                selectedRows?.map((x) => ({ id: `${x?.id}` })),
              ),
              keyword: keyword.trim(),
              filter: convertFilterParams(filters, [
                { field: 'createdAt', filterFormat: 'date' },
              ]),
              sort: convertSortParams(sort),
            })
          }
          onDownloadTemplate={getMaterialTemplateApi}
          onRefresh={refreshData}
          disabled
        />
        <Button
          onClick={() => history.push(ROUTE.MATERIAL_MANAGEMENT.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
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
      headerName: t('materialManagement.code'),
      width: 200,
    },
    {
      field: 'name',
      headerName: t('materialManagement.name'),
      width: 200,
    },
    {
      field: 'amount',
      headerName: t('materialManagement.productAmount'),
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
  const handleSubmitPrintQR = async (values) => {
    if (bpac.IsExtensionInstalled() === false) {
      const agent = window.navigator.userAgent.toLowerCase()
      const ischrome =
        agent.indexOf('chrome') !== -1 &&
        agent.indexOf('edge') === -1 &&
        agent.indexOf('opr') === -1
      if (ischrome)
        window.open(
          'https://chrome.google.com/webstore/detail/ilpghlfadkjifilabejhhijpfphfcfhb',
          '_blank',
        )
      return
    }
    const itemIds = values?.items?.map((item) => item?.id).join(',')
    const res = await getqrCodeApi(itemIds)
    const items = res?.data
    try {
      for (let indexItem = 0; indexItem < items?.length; indexItem++) {
        const item = items[indexItem]
        const itemRequestDetail = values?.items?.find((i) => i?.id === item?.id)
        const objDoc = bpac.IDocument
        const ret = await objDoc.Open(
          'http://10.1.53.106:3000/static/media/qr.e53103a3.lbx',
        )
        if (ret === true) {
          const itemName = await objDoc.GetObject('itemName')
          itemName.Text = `Tên vật tư: ${item.name}`
          const itemCode = await objDoc.GetObject('itemCode')
          itemCode.Text = `Mã vật tư: ${item.code}`
          const qrCode = await objDoc.GetObject('qrCode')
          qrCode.Text = item.qrCode
          await objDoc.StartPrint('', 0)
          await objDoc.PrintOut(itemRequestDetail.amount, 0)
          await objDoc.EndPrint()
          await objDoc.Close()
        }
        setIsOpenPrintQRModal(false)
      }
    } catch (e) {
      /* eslint-disable no-console, no-control-regex*/
      console.log('error', e)
    }
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

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.materialManagement')}
      onSearch={setKeyword}
      placeholder={t('materialManagement.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
      loading={isLoading}
    >
      <DataTable
        title={t('materialManagement.list')}
        rows={materialList}
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
        sort={sort}
        filters={{
          form: <FilterForm />,
          values: filters,
          defaultValue: DEFAULT_FILTERS,
          onApply: setFilters,
          validationSchema: filterSchema(t),
        }}
        bulkActions={{
          actions: [BULK_ACTION.DELETE],
          /* @TODO update uri */
          apiUrl: API_URL.COMPANY,
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
        open={modal.isOpenUpdateStatusModal}
        title={t('general.updateStatus')}
        onCancel={onCloseUpdateStatusModal}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUpdateStatus}
        submitLabel={t('general:common.yes')}
        {...(modal?.tempItem?.status === MATERIAL_ACTIVE_STATUS.ACTIVE
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
          label={t('materialManagement.code')}
          value={modal?.tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('materialManagement.name')}
          value={modal?.tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('general.status')}
          value={
            <StatusSwitcher
              options={MATERIAL_ACTIVE_STATUS_OPTIONS}
              value={modal?.tempItem?.status}
              nextValue={
                modal?.tempItem?.status === MATERIAL_ACTIVE_STATUS.ACTIVE
                  ? MATERIAL_ACTIVE_STATUS.INACTIVE
                  : MATERIAL_ACTIVE_STATUS.ACTIVE
              }
            />
          }
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenPrintQRModal}
        title={t('materialManagement.printQRModalTitle')}
        maxWidth="md"
        renderFooter={renderFooterPrintModal}
        onCancel={() => setIsOpenPrintQRModal(false)}
        formikProps={{
          initialValues: {
            items: selectedRows?.map((item) => ({
              ...item,
              amount: 1,
            })),
          },
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

export default MaterialManagement
