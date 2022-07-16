import React, { useMemo } from 'react'

import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'

function TableMo({ items }) {
  const { t } = useTranslation(['mmsx'])

  const columns = useMemo(
    () => [
      {
        field: '#',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'moName',
        headerName: t('deviceAssign.moTable.code'),
        width: 150,
      },
      {
        field: 'day',
        headerName: t('deviceAssign.moTable.date'),
        width: 150,
      },
      {
        field: 'workTime',
        headerName: t('deviceAssign.moTable.activeTime'),
        width: 150,
        renderCell: (params) => {
          const { workTime } = params?.row
          return workTime
            ? `${Math.round(workTime)} ${t('common.suffix.minute')}`
            : `0 ${t('common.suffix.minute')}`
        },
      },
      {
        field: 'stopTime',
        headerName: t('deviceAssign.moTable.unactiveTime'),
        width: 150,
        renderCell: (params) => {
          const { stopTime } = params?.row
          return stopTime
            ? `${Math.round(stopTime)} ${t('common.suffix.minute')}`
            : `0 ${t('common.suffix.minute')}`
        },
      },
    ],
    [items],
  )
  return (
    <DataTable
      rows={items}
      columns={columns}
      total={items.length}
      striped={false}
      hideSetting
      hideFooter
    />
  )
}

TableMo.defaultProps = {
  items: [],
}

TableMo.propTypes = {
  items: PropTypes.array,
}

export default TableMo
