import React, { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import DataTable from '~/components/DataTable'
import useProgressDetailReport from '~/modules/mesx/redux/hooks/useProgressDetailReport'
import { convertUtcDateToLocalTz } from '~/utils'

const ProgressTable = () => {
  const { t } = useTranslation(['mesx'])
  const [expandedItems, setExpandedItems] = useState({})
  const {
    data: { progressDetailReports },
  } = useProgressDetailReport()
  const getColumns = () => {
    const columns = [
      {
        field: 'itemName',
        headerName: t('ProgessDetailReport.item'),
        fixed: true,
        renderCell: (params) => {
          if (params?.row?.itemName) {
            const itemId = params?.row?.id
            return (
              <Box sx={{ display: 'flex' }}>
                <IconButton
                  size="small"
                  sx={{ mr: 1, position: 'relative', top: -7 }}
                  onClick={() => {
                    setExpandedItems({
                      ...expandedItems,
                      [itemId]: !expandedItems[itemId],
                    })
                  }}
                >
                  {expandedItems[itemId] ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
                <Typography>{params?.row?.itemName}</Typography>
              </Box>
            )
          }
          return null
        },
      },
      {
        field: 'title',
      },
    ]

    const days = progressDetailReports?.[0]?.calendar?.sort(function (a, b) {
      return new Date(a.executionDate) - new Date(b.executionDate)
    })
    if (days?.length) {
      days?.forEach((day) => {
        columns.push({
          field: day.executionDate,
          headerName: convertUtcDateToLocalTz(day.executionDate),
          width: 100,
          align: 'center',
        })
      })
    }
    return columns
  }
  const getCalendar = (item, key = '') => {
    return item?.calendar?.reduce(
      (acc, cur) => ({
        ...acc,
        [cur?.executionDate]: cur[key],
      }),
      {},
    )
  }

  const getRow = () => {
    let rows = []
    if (progressDetailReports && !isEmpty(progressDetailReports)) {
      progressDetailReports?.forEach((e) => {
        rows.push({
          itemName: e?.item?.name,
          id: e?.item?.id,
        })
        if (expandedItems[e?.item?.id]) {
          rows.push(
            {
              title: t('ProgessDetailReport.quantity'),
              ...getCalendar(e, 'planQuantity'),
            },
            {
              title: t('ProgessDetailReport.actualQuantity'),
              ...getCalendar(e, 'actualQuantity'),
            },
            {
              title: t('ProgessDetailReport.delayQuantity'),
              ...getCalendar(e, 'lateQuantity'),
            },
            {
              title: t('ProgessDetailReport.accumlateQuantity'),
              ...getCalendar(e, 'totalPlanQuantity'),
            },
            {
              title: t('ProgessDetailReport.accumlateActualQuantity'),
              ...getCalendar(e, 'totalActualQuantity'),
            },
            {
              title: t('ProgessDetailReport.accumlateDelayQuantity'),
              ...getCalendar(e, 'totalLateQuantity'),
            },
          )
        }
      })
    }
    return rows
  }
  return (
    <DataTable
      rows={getRow()}
      columns={getColumns()}
      hideSetting
      hideFooter
    ></DataTable>
  )
}

export default ProgressTable
