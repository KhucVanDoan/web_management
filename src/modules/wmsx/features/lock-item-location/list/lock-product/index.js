import React, { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import LV from '~/components/LabelValue'
import Status from '~/components/Status'
import {
  BLOCK_ITEM_LOCATION_STATUS,
  BLOCK_ITEM_LOCATION_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useBlockItemLocation from '~/modules/wmsx/redux/hooks/useBlockItemLocation'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertFilterParams, convertSortParams } from '~/utils'

import FilterForm from './fillter'
const LockItem = ({ keyword }) => {
  const { t } = useTranslation(['wmsx'])
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenLockModal, setIsOpenLockModal] = useState(false)
  const [isOpenUnLockModal, setIsOpenUnLockModal] = useState(false)
  const [tempItem, setTempItem] = useState(null)
  const history = useHistory()
  const {
    data: { blockItemList, totalBlockItem },
    actions,
  } = useBlockItemLocation()
  const {
    page,
    pageSize,
    sort,
    filters,
    setPage,
    setPageSize,
    setSort,
    setFilters,
  } = useQueryState()

  const columns = [
    {
      field: 'itemCode',
      headerName: t('blockItemLocation.itemCode'),
      width: 200,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.item?.code
      },
    },
    {
      field: 'itemName',
      headerName: t('blockItemLocation.itemName'),
      width: 200,
      sortable: true,
      fixed: true,
      renderCell: (params) => {
        return params?.row?.item?.name
      },
    },

    {
      field: 'warehouseName',
      headerName: t('blockItemLocation.warehouseName'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.warehouse?.name
      },
    },
    {
      field: 'lotNumber',
      headerName: t('blockItemLocation.lotNumber'),
      width: 200,
      sortable: true,
      fixed: true,
    },
    {
      field: 'packageCode',
      headerName: t('blockItemLocation.packageCode'),
      width: 150,
      sortable: true,
      renderCell: (params) => {
        return params?.row?.package?.code
      },
    },
    {
      field: 'quantity',
      headerName: t('blockItemLocation.quantity'),
      width: 150,
      sortable: true,
    },
    {
      field: 'status',
      headerName: t('blockItemLocation.status'),
      width: 200,
      sortable: true,
      renderCell: (params) => {
        const { status } = params.row
        return (
          <Status
            options={BLOCK_ITEM_LOCATION_STATUS_OPTIONS}
            value={status}
            variant="text"
          />
        )
      },
    },
    {
      field: 'action',
      headerName: t('blockItemLocation.action'),
      width: 200,
      sortable: false,
      align: 'center',
      renderCell: (params) => {
        const { id, status } = params.row
        const isUnlock = status === BLOCK_ITEM_LOCATION_STATUS.UNLOCKED
        return (
          <div>
            <IconButton
              onClick={() =>
                history.push(
                  ROUTE.LOCK_ITEM_LOCATION.DETAIL_ITEM.PATH.replace(
                    ':id',
                    `${id}`,
                  ),
                )
              }
            >
              <Icon name="show" />
            </IconButton>
            <IconButton onClick={() => handleOpenLockModal(params.row)}>
              <Icon name={isUnlock ? 'unLock' : 'lock'} />
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
    actions.searchBlockItems(params)
  }

  useEffect(() => {
    refreshData()
  }, [page, pageSize, filters, sort, keyword])

  const onClickDelete = (tempItem) => {
    setTempItem(tempItem)
    setIsOpenDeleteModal(true)
  }
  const onSubmitDelete = () => {
    actions.deleteBlockItem(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenDeleteModal(false)
  }
  const handleOpenLockModal = (tempItem) => {
    setTempItem(tempItem)
    if (tempItem?.status === BLOCK_ITEM_LOCATION_STATUS.UNLOCKED) {
      setIsOpenUnLockModal(true)
    } else {
      setIsOpenLockModal(true)
    }
  }
  const onSubmitUnLock = () => {
    actions.openBlockItemById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenLockModal(false)
  }
  const onSubmitLock = () => {
    actions.closeBlockItemById(tempItem?.id, () => {
      refreshData()
    })
    setTempItem(null)
    setIsOpenUnLockModal(false)
  }
  return (
    <>
      <DataTable
        title={t('blockItemLocation.item.title')}
        rows={blockItemList}
        pageSize={pageSize}
        page={page}
        columns={columns}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSortChange={setSort}
        total={totalBlockItem}
        sort={sort}
        filters={{ form: <FilterForm />, values: filters, onApply: setFilters }}
      />
      <Dialog
        open={isOpenDeleteModal}
        title={t('blockItemLocation.location.deleteModalTitle')}
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
        {t('blockItemLocation.location.confirmDelete')}
        <LV
          label={t('blockItemLocation.warehouseName')}
          value={tempItem?.warehouse?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('blockItemLocation.factoryName')}
          value={tempItem?.factory?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenLockModal}
        title={t('blockItemLocation.location.unlockModalTitle')}
        onCancel={() => setIsOpenLockModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitUnLock}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('blockItemLocation.location.confirmUnlock')}
        <LV
          label={t('blockItemLocation.warehouseName')}
          value={tempItem?.warehouse?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('blockItemLocation.factoryName')}
          value={tempItem?.factory?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
      <Dialog
        open={isOpenUnLockModal}
        title={t('blockItemLocation.location.lockModalTitle')}
        onCancel={() => setIsOpenUnLockModal(false)}
        cancelLabel={t('general:common.no')}
        onSubmit={onSubmitLock}
        submitLabel={t('general:common.yes')}
        noBorderBotttom
        submitProps={{
          color: 'error',
        }}
        noBorderBottom
      >
        {t('blockItemLocation.location.confirmLock')}
        <LV
          label={t('blockItemLocation.warehouseName')}
          value={tempItem?.warehouse?.name}
          sx={{ mt: 4 / 3 }}
        />
        <LV
          label={t('blockItemLocation.factoryName')}
          value={tempItem?.factory?.name}
          sx={{ mt: 4 / 3 }}
        />
      </Dialog>
    </>
  )
}

export default LockItem
