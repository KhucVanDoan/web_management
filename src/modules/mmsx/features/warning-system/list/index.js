import React, { useEffect, useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import {
  PIORITY_LEVEL_OPTION,
  WARNING_PIORITY_LEVEL,
  WARNING_STATUS_LIST,
  WARNING_SYSTEM_STATUS,
  WARNING_TYPE,
  WARNING_TYPE_OPTION,
} from '~/modules/mmsx/constants'
import useWarningSystem from '~/modules/mmsx/redux/hooks/useWarningSystem'
import { ROUTE } from '~/modules/mmsx/routes/config'
import {
  convertFilterParams,
  convertSortParams,
  convertUtcDateToLocalTz,
} from '~/utils'

import FilterForm from './filter-form'

const breadcrumbs = [
  {
    title: 'maintenance',
  },
  {
    route: ROUTE.WARNING_SYSTEM.LIST.PATH,
    title: ROUTE.WARNING_SYSTEM.LIST.TITLE,
  },
]

const WarningSystem = () => {
  const [tempItem, setTempItem] = useState(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const {
    data: { warningLists, isLoading, meta },
    actions,
  } = useWarningSystem()
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const DEFAULT_FILTERS = {
    code: '',
    name: '',
    createdAt: '',
    updateAt: '',
    status: '',
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
        field: 'code',
        headerName: t('warningList.table.code'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'type',
        headerName: t('warningList.table.type'),
        width: 150,
        sortable: true,
        fixed: true,
        renderCell: (params) => {
          const maintainType = WARNING_TYPE.find(
            (e) => e.value === params?.row?.type,
          )
          return t(maintainType?.text)
        },
      },
      {
        field: 'name',
        headerName: t('warningList.table.name'),
        width: 150,
        sortable: true,
        fixed: true,
      },
      {
        field: 'description',
        headerName: t('warningList.table.description'),
        width: 150,
        sortable: true,
      },
      {
        field: 'serial',
        headerName: t('warningList.table.serial'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.deviceAssignment?.serial
        },
      },
      {
        field: 'deviceName',
        headerName: t('warningList.table.deviceName'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          return params?.row?.deviceAssignment?.device?.name
        },
      },
      {
        field: 'piority',
        headerName: t('warningList.table.piority'),
        width: 150,
        sortable: true,
        renderCell: (params) => {
          const mappingPriority =
            params?.row?.type === WARNING_TYPE[0].value
              ? PIORITY_LEVEL_OPTION
              : WARNING_PIORITY_LEVEL
          const level = mappingPriority.find(
            (e) => e.value === params?.row?.type,
          )
          return level ? t(`${level?.title}`) : null
        },
      },
      {
        field: 'status',
        headerName: t('warningList.table.status'),
        width: 200,
        sortable: true,
        renderCell: (params) => {
          const { status } = params.row
          return (
            <Status
              options={WARNING_STATUS_LIST}
              value={status}
              variant="text"
            />
          )
        },
      },
      {
        field: 'createdAt',
        headerName: t('warningList.table.createdAt'),
        width: 200,
        filterFormat: 'date',
        sortable: true,
        renderCell: (params) => {
          return convertUtcDateToLocalTz(params?.row?.createdAt)
        },
      },
      {
        field: 'actions',
        headerName: t('warningList.table.actions'),
        width: 200,
        fixed: true,
        align: 'center',
        renderCell: (params) => {
          const { id, status, type } = params?.row
          const isPending = status === WARNING_SYSTEM_STATUS.PENDING
          return (
            <div>
              <IconButton
                onClick={() => {
                  if (type === WARNING_TYPE_OPTION.SCHEDULE) {
                    history.push(
                      ROUTE.WARNING_SYSTEM.DETAIL.SCHEDULE.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  } else if (type === WARNING_TYPE_OPTION.CHECKLIST) {
                    history.push(
                      ROUTE.WARNING_SYSTEM.DETAIL.CHECKLIST.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  } else {
                    history.push(
                      ROUTE.WARNING_SYSTEM.DETAIL.ERROR.PATH.replace(
                        ':id',
                        `${id}`,
                      ),
                    )
                  }
                }}
              >
                <Icon name="show" />
              </IconButton>

              {isPending && (
                <IconButton onClick={() => onClickConfirmed(params.row)}>
                  <Icon name="tick" />
                </IconButton>
              )}
              {isPending && (
                <IconButton onClick={() => onClickDelete(params.row)}>
                  <Icon name="remove" />
                </IconButton>
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
    actions.getWarningList(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])
  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = (values) => {
    const params = {
      id: tempItem?.id,
      reason: values?.comment,
    }
    actions.rejectWarning(params, () => {
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
    actions.confirmWarning(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenConfirmModal(false)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.warningList')}
      onSearch={setKeyword}
      placeholder={t('warningList.searchPlaceholder')}
      loading={isLoading}
    >
      <DataTable
        title={t('warningList.title')}
        columns={columns}
        rows={warningLists}
        pageSize={pageSize}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={meta?.total}
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
        onClose={() => setIsOpenDeleteModal(false)}
        onCancel={() => setIsOpenDeleteModal(false)}
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
          onSubmit: onSubmitDelete,
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

      <Dialog
        open={isOpenConfirmModal}
        title={t('general:common.notify')}
        onCancel={() => setIsOpenConfirmModal(false)}
        onSubmit={submitConfirm}
        cancelLabel={t('general:common.no')}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
      >
        {t('general:common.confirmMessage.confirm')}
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
      </Dialog>
    </Page>
  )
}

export default WarningSystem
