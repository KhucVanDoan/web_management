import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { DATE_FORMAT } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MASTER_PLAN.LIST.PATH,
    title: ROUTE.MASTER_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.MASTER_PLAN.JOB_DETAIL.PATH,
    title: ROUTE.MASTER_PLAN.JOB_DETAIL.TITLE,
  },
]

export const DetailJob = () => {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()
  const backToList = () => {
    history.push(ROUTE.MASTER_PLAN.LIST.PATH)
  }
  const {
    data: { jobDetail, isLoading },
    actions,
  } = useDefineMasterPlan()
  useEffect(() => {
    actions.getJobDetailsById(id)
  }, [id])

  const getColumns = (saleOder) => {
    const columns = [
      {
        field: 'itemName',
        headerName: t('defineMasterPlan.name'),
        width: 150,
      },
      {
        field: 'producingStepName',
        headerName: t('defineMasterPlan.producingStepName'),
        width: 200,
      },
      {
        field: 'workCenterName',
        headerName: t('defineMasterPlan.inputModeration.workCenterName'),
        width: 150,
      },

      {
        field: 'quantity',
        headerName: t('defineMasterPlan.itemDetail.quantityPlan'),
        width: 150,
        align: 'right',
      },
      {
        field: 'restQuantity',
        headerName: t('defineMasterPlan.restQuantity'),
        width: 150,
        align: 'right',
      },
      {
        field: 'total',
        headerName: t('defineMasterPlan.inputModeration.total'),
        width: 100,
        align: 'right',
      },
      ...(saleOder?.itemSchedules?.[0]?.quantityDays?.days || []).map(
        (d, index) => ({
          field: d?.executionDate,
          headerName: formatDateTimeUtc(d?.executionDate, DATE_FORMAT),
          width: 100,
          align: 'right',
          renderCell: (params) => {
            return params?.row?.schedules[index]?.quantity
          },
        }),
      ),
    ]
    return columns
  }

  const getRows = (saleOder) => {
    let rows = []
    let rowSpanMatrix = []
    let grayRowMatrix = []
    saleOder?.itemSchedules?.forEach((item, itemIndex) => {
      const totalWorkCenter = item?.producingSteps?.reduce((acc, cur) => {
        return acc + (cur?.workCenterSchedules?.length || 1)
      }, 0)

      const totalProducingStep = item?.producingSteps?.length
      const totalQuantity = item?.producingSteps?.reduce((acc, cur) => {
        return acc + cur?.planQuantity
      }, 0)

      item?.producingSteps?.forEach((ps, psIndex) => {
        let obj = {
          producingStepName: ps?.producingStepName,
          itemName: item?.itemName,
          quantity: ps?.planQuantity,
          restQuantity: totalQuantity - item?.quantityDays?.quantity,
          workCenterName: '',
          schedules: '',
          total: '',
        }
        const workcenterPlans = []
        if (!isEmpty(ps?.workCenterSchedules)) {
          ps?.workCenterSchedules?.forEach((w, wIndex) => {
            grayRowMatrix.push(!!(itemIndex % 2))
            workcenterPlans.push({
              ...obj,
              workCenterName: w?.workCenterName,
              schedules: w?.schedules,
              total: w?.quantity,
            })
            if (wIndex === 0) {
              if (item?.producingSteps?.length === 1) {
                rowSpanMatrix.push([
                  totalWorkCenter + 1,
                  (ps?.workCenterSchedules?.length || 1) + 1,
                  1,
                  ps?.workCenterSchedules?.length || 1,
                  (ps?.workCenterSchedules?.length || 1) + 1,
                ])
                return
              }
              if (psIndex === item?.producingSteps?.length - 1) {
                rowSpanMatrix.push([
                  -1,
                  (ps?.workCenterSchedules?.length || 1) + 1,
                  1,
                  ps?.workCenterSchedules?.length || 1,
                  -1,
                  1,
                ])
                return
              }
              if (psIndex === 0) {
                rowSpanMatrix.push([
                  totalWorkCenter + 1,
                  ps?.workCenterSchedules?.length || 1,
                  1,
                  ps?.workCenterSchedules?.length || 1,
                  totalWorkCenter + 1,
                  1,
                ])
                return
              }
              rowSpanMatrix.push([
                -1,
                ps?.workCenterSchedules?.length || 1,
                1,
                1,
                -1,
                1,
              ])
            } else {
              rowSpanMatrix.push([-1, -1, 1, -1, -1, 1])
            }
          })
        } else {
          grayRowMatrix.push(!!(itemIndex % 2))
          if (totalProducingStep === 1) {
            rowSpanMatrix.push([2, 2, 1, 1, 2, 1])
          } else if (psIndex === totalProducingStep - 1) {
            rowSpanMatrix.push([-1, 2, 1, 1, -1])
          } else if (psIndex === 0) {
            rowSpanMatrix.push([
              totalWorkCenter + 1,
              1,
              1,
              1,
              totalWorkCenter + 1,
              1,
            ])
          } else {
            rowSpanMatrix.push([-1, 1, 1, 1, -1, 1])
          }
        }
        if (workcenterPlans?.length) {
          rows.push(...workcenterPlans)
        } else {
          rows.push(obj)
        }
      })
      grayRowMatrix.push(!!(itemIndex % 2))
      rowSpanMatrix.push([-1, -1, 1, 1, -1])
      rows.push({
        itemName: '',
        producingStepName: '',
        workCenterName: '',
        schedules: item?.quantityDays?.days,
        total: item?.quantityDays?.quantity,
        quantity: totalQuantity,
      })
    })
    return { rows, rowSpanMatrix, grayRowMatrix }
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('defineMasterPlan.autoModeration.title')}
      loading={isLoading}
      onBack={backToList}
    >
      <Box
        sx={() => ({
          display: 'flex',
          justifyContent: 'flex-end',
        })}
      >
        <Button
          onClick={() =>
            history.push(
              ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH.replace(':id', `${id}`),
            )
          }
        >
          {t('defineMasterPlan.autoModeration.selectModerationType')}
        </Button>
      </Box>
      {jobDetail?.saleOrderSchedules?.map((s) => (
        <>
          <Box sx={4}>
            <Typography variant="h4" component="span">
              {s?.saleOrderName}
            </Typography>
          </Box>
          <DataTable
            columns={getColumns(s)}
            rows={getRows(s).rows}
            rowSpanMatrix={getRows(s).rowSpanMatrix}
            rowGrayMatrix={getRows(s).grayRowMatrix}
            striped={false}
            hideSetting
            hideFooter
          />
        </>
      ))}

      <ActionBar onBack={backToList} />
    </Page>
  )
}
