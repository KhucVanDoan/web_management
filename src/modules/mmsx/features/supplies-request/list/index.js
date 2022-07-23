import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  SUPPLIES_REQUEST_STATUS,
  SUPPLY_REQUEST_STATUS,
  SUPPLY_REQUEST_TYPE,
} from '~/modules/mmsx/constants'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateTimeToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'
const breadcrumbs = [
  {
    title: 'deviceSerialManagement',
  },
  {
    route: ROUTE.SUPPLIES_REQUEST.LIST.PATH,
    title: ROUTE.SUPPLIES_REQUEST.LIST.TITLE,
  },
]
const SuppliesRequest = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const {
    data: { suppliesRequestList, isLoading, total },
    actions,
  } = useSuppliesRequest()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    status: '',
    createdAt: '',
    updateAt: '',
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
      {
        field: 'code',
        headerName: t('suppliesRequest.table.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'name',
        headerName: t('suppliesRequest.table.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'deviceName',
        headerName: t('suppliesRequest.table.deviceName'),
        width: 150,
        sortable: true,
      },
      {
        field: 'teamName',
        headerName: t('suppliesRequest.table.teamName'),
        width: 150,
        sortable: true,
      },
      {
        field: 'fullName',
        headerName: t('suppliesRequest.table.fullName'),
        width: 150,
        sortable: true,
      },

      {
        field: 'supplyName',
        headerName: t('suppliesRequest.table.supplyName'),
        width: 150,
        sortable: true,
      },
      {
        field: 'type',
        headerName: t('suppliesRequest.table.type'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return t(
            SUPPLY_REQUEST_TYPE.find((item) => item.value === params?.row?.type)
              ?.text,
          )
        },
      },
      {
        field: 'status',
        headerName: t('suppliesCategory.form.status'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={SUPPLY_REQUEST_STATUS}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'createdAt',
        headerName: t('common.createdAt'),
        width: 150,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateTimeToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'actions',
        headerName: t('suppliesCategory.action'),
        width: 200,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id, status } = params?.row
          const isPending = status === SUPPLIES_REQUEST_STATUS.PENDING

          return (
            <div>
              <IconButton
                onClick={() =>
                  history.push(
                    ROUTE.SUPPLIES_REQUEST.DETAIL.PATH.replace(':id', `${id}`),
                  )
                }
              >
                <Icon name="show" />
              </IconButton>
              {isPending && (
                <>
                  <IconButton
                    onClick={() =>
                      history.push(
                        ROUTE.SUPPLIES_REQUEST.EDIT.PATH.replace(
                          ':id',
                          `${id}`,
                        ),
                      )
                    }
                  >
                    <Icon name="edit" />
                  </IconButton>
                  <IconButton onClick={() => onClickDelete(params.row)}>
                    <Icon name="delete" />
                  </IconButton>
                  <IconButton onClick={() => onClickConfirmed(params.row)}>
                    <Icon name="tick" />
                  </IconButton>
                  <IconButton onClick={() => onClickRejected(params.row)}>
                    <Icon name="remove" />
                  </IconButton>
                </>
              )}
            </div>
          )
        },
      },
    ],
    [],
  )

  const refreshData = () => {
    const params = {
      keyword: keyword.trim(),
      page,
      limit: pageSize,
      filter: convertFilterParams(filters, columns),
      sort: convertSortParams(sort),
    }
    actions.getSuppliesRequestList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteSuppliesRequest(tempItem?.id, () => {
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
    actions.confirmSuppliesRequest(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  const onClickRejected = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenRejectedModal(true)
  }
  const onSubmitRejected = () => {
    actions.rejectSuppliesRequest(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenRejectedModal(false)
  }

  const renderHeaderRight = () => {
    return (
      <>
        <Button variant="outlined" icon="download" disabled>
          {t('menu.importExportData')}
        </Button>
        <Button
          onClick={() => history.push(ROUTE.SUPPLIES_REQUEST.CREATE.PATH)}
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
      title={t('menu.suppliesRequest')}
      renderHeaderRight={renderHeaderRight}
      onSearch={setKeyword}
      placeholder={t('suppliesCategory.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('suppliesRequest.title')}
        columns={columns}
        rows={suppliesRequestList}
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
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('suppliesCategory.deleteTitle')}
        onCancel={() => setIsOpenDeleteModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitDelete}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('suppliesCategory.confirmDetele')}
        <LV
          label={t('suppliesRequest.table.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('suppliesRequest.table.name')}
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
          label={t('suppliesRequest.table.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('suppliesRequest.table.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenRejectedModal}
        onClose={() => setIsOpenRejectedModal(false)}
        onCancel={() => setIsOpenRejectedModal(false)}
        title={t('common.modalDelete.title')}
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
        submitProps={{
          color: 'error',
        }}
        formikProps={{
          initialValues: { comment: '' },
          validationSchema: Yup.object().shape({
            comment: Yup.string().required(t('general:form.required')),
          }),
          onSubmit: onSubmitRejected,
          enableReinitialize: true,
        }}
      >
        {t('common.modalDelete.description')}
        <LV
          label={t('warningList.table.code')}
          value={tempItem?.code}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('warningList.table.name')}
          value={tempItem?.name}
          sx={{ mt: 4 / 3 }}
        />

        <Field.TextField
          name="comment"
          label={t('common.modalConfirm.enterComment')}
          placeholder={t('common.modalConfirm.enterComment')}
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }}
          required
          multiline
          rows={3}
          sx={{ mt: 2 }}
        />
      </Dialog>
    </Page>
  )
}

export default SuppliesRequest
