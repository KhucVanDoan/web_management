import React, { useEffect } from 'react'

import { Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Page from '~/components/Page'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertUtcDateToLocalTz } from '~/utils'

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
        headerAlign: 'left',
      },
      {
        field: 'restQuantity',
        headerName: t('defineMasterPlan.restQuantity'),
        width: 150,
        align: 'right',
        headerAlign: 'left',
      },
      {
        field: 'total',
        headerName: t('defineMasterPlan.inputModeration.total'),
        width: 100,
        align: 'right',
        headerAlign: 'left',
      },
      ...(saleOder?.itemSchedules?.[0]?.quantityDays?.days || []).map(
        (d, index) => ({
          field: d?.executionDate,
          headerName: convertUtcDateToLocalTz(d?.executionDate),
          width: 100,
          align: 'right',
          headerAlign: 'left',
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
  const renderHeaderRight = () => {
    return (
      <Button
        onClick={() =>
          history.push(
            ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH.replace(':id', `${id}`),
          )
        }
        sx={{ ml: 4 / 3 }}
      >
        {t('defineMasterPlan.autoModeration.selectModerationType')}
      </Button>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('defineMasterPlan.autoModeration.title')}
      loading={isLoading}
      renderHeaderRight={renderHeaderRight}
      onBack={backToList}
    >
      {jobDetail?.saleOrderSchedules?.map((s) => (
        <>
          <Typography variant="h4" component="span" mb={2}>
            {s?.saleOrderName}
          </Typography>
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
