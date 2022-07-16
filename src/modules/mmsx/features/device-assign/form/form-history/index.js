import React, { useMemo } from 'react'

import { IconButton } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import Icon from '~/components/Icon'
import { WORK_TYPE_MAP } from '~/modules/mmsx/constants'
import { ROUTE } from '~/modules/mmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

function DeviceAssignFormHistory({ items }) {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()

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
        field: 'code',
        headerName: t('deviceAssign.historyTable.code'),
        width: 150,
      },
      {
        field: 'date',
        headerName: t('deviceAssign.historyTable.maintainDate'),
        width: 150,
        renderCell: (params) => {
          const { date } = params?.row
          return convertUtcDateTimeToLocalTz(date)
        },
      },
      {
        field: 'type',
        headerName: t('deviceAssign.historyTable.type'),
        width: 150,
        renderCell: (params) => {
          const { type } = params?.row
          return t(WORK_TYPE_MAP[type])
        },
      },
      {
        field: 'action',
        headerName: t('common.action'),
        width: 50,
        align: 'center',
        renderCell: (params) => {
          const { id } = params?.row
          return (
            <IconButton
              onClick={() => {
                history.push(ROUTE.JOB_LIST.DETAIL.PATH.replace(':id', `${id}`))
              }}
            >
              <Icon name="show" />
            </IconButton>
          )
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

DeviceAssignFormHistory.defaultProps = {
  items: [],
}

DeviceAssignFormHistory.propTypes = {
  items: PropTypes.array,
}

export default DeviceAssignFormHistory
