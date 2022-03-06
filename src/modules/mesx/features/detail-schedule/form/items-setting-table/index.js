import React, { useMemo } from 'react'

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import TextField from '~/components/TextField'

const ItemSettingTable = ({ mode, plans, woQuantity }) => {
  const { t } = useTranslation(['mesx'])

  const columns = useMemo(
    () => [
      {
        field: 'title',
        headerName: t('detailSchedule.item.plan'),
        width: 100,
        sortable: false,
        align: 'center',
      },
      {
        field: 'totalQuantity',
        headerName: t('detailSchedule.item.totalPlanQuantity'),
        width: 100,
        sortable: false,
        align: 'center',
        renderCell: () => {
          return woQuantity
        },
      },
      ...(plans || []).map((plan) => ({
        filed: plan?.length + 1,
        headerName: plan?.workCenter?.name,
        align: 'center',
        renderCell: () => {
          const isView = mode === MODAL_MODE.DETAIL

          return isView ? (
            <>{plan?.moderationQuantity}</>
          ) : (
            <TextField value={plan?.quantity} />
          )
        },
      })),
    ],
    [plans],
  )

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        {t('detailSchedule.workCenterPlanDetail')}
      </Typography>

      <DataTable
        height={250}
        rows={plans}
        columns={columns}
        total={plans?.length}
        hideFooter
        hideSetting
      />
    </Box>
  )
}
export default ItemSettingTable
