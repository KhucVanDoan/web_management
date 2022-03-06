import React, { useEffect, useState } from 'react'

import { Box, Button } from '@mui/material'
import { Formik, Form } from 'formik'
import { groupBy, uniq } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { MODERATION_TYPE } from '~/modules/mesx/constants'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { redirectRouter } from '~/utils'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MASTER_PLAN.LIST.PATH,
    title: ROUTE.MASTER_PLAN.LIST.TITLE,
  },
  {
    route: ROUTE.MASTER_PLAN.EDIT.PATH,
    title: ROUTE.MASTER_PLAN.EDIT.TITLE,
  },
  {
    route: ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH,
    title: ROUTE.MASTER_PLAN.AUTO_MODERATION.TITLE,
  },
  {
    route: ROUTE.MASTER_PLAN.INPUT_MODERATION.PATH,
    title: ROUTE.MASTER_PLAN.INPUT_MODERATION.TITLE,
  },
]

const excludeInputInColumns = [
  'workCenterId',
  'workCenterName',
  'totalQuantity',
]

let initialValues = {}

const InputModeration = () => {
  const { t } = useTranslation(['mesx'])
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const {
    data: { isLoading, moderationSuggestSpread },
    actions,
  } = useDefineMasterPlan()
  const [tableData, setTableData] = useState({})
  const [columns, setColumns] = useState({})

  useEffect(() => {
    const producingStepIds = params?.get('producingStep')
    const moderationType = params?.get('moderationType')
    if (Number(moderationType) === MODERATION_TYPE.SPREAD_EVENLY) {
      actions.getModerationSuggestSpread({
        itemProducingStepIds: producingStepIds,
      })
    } else if (Number(moderationType) === MODERATION_TYPE.INPUT_MODERATION) {
      actions.getProducingStepDetail({ itemProducingStepIds: producingStepIds })
    }

    return () => {
      actions.resetModerationSuggestSpread()
    }
  }, [])

  useEffect(() => {
    if (moderationSuggestSpread?.length) {
      const data = moderationSuggestSpread
        ?.map((producingStep) => ({
          [producingStep.id.toString()]: {
            producingStepName: producingStep.producingStepName,
            itemId: producingStep.itemId,
            workCenterSchedule: groupWorkCenterSchedule(
              producingStep.workCenterSchedules,
              producingStep.quantity,
            ),
          },
        }))
        .reduce((prev, cur) => ({ ...prev, ...cur }), {})
      setTableData(data)
    }
  }, [moderationSuggestSpread])

  const groupWorkCenterSchedule = (workCenterSchedules, totalQuantity) => {
    const groupWorkCenter = groupBy(
      workCenterSchedules.map((workCenterSchedule) => ({
        workCenterId: workCenterSchedule.workCenterId,
        workCenterName: workCenterSchedule.workCenterName,
        [workCenterSchedule.excutionDate]: {
          id: workCenterSchedule.id,
          quantity: workCenterSchedule.quantity,
        },
      })),
      'workCenterId',
    )

    return Object.keys(groupWorkCenter).map((key) => ({
      ...groupWorkCenter[key].reduce((prev, cur) => ({ ...prev, ...cur }), {}),
      totalQuantity,
    }))
  }

  useEffect(() => {
    let tableDataColumns = {}
    Object.keys(tableData).forEach((producingStepId) => {
      const workCenterSchedule = tableData[producingStepId]?.workCenterSchedule
      if (workCenterSchedule?.length) {
        const currentProducingStepInitialValues = workCenterSchedule
          .map((workCenter) =>
            Object.keys(workCenter)
              .filter((key) => !excludeInputInColumns.includes(key))
              .map((key) => ({
                [`${producingStepId}_${workCenter[key]?.id}_${key}`]:
                  workCenter[key]?.quantity,
              }))
              .reduce((prev, cur) => ({ ...prev, ...cur }), {}),
          )
          .reduce((prev, cur) => ({ ...prev, ...cur }), {})

        initialValues = {
          ...initialValues,
          ...currentProducingStepInitialValues,
        }

        const executionDates = uniq(
          workCenterSchedule
            .map((schedule) =>
              Object.keys(schedule).filter(
                (key) => !excludeInputInColumns.includes(key),
              ),
            )
            .flat(),
        ).sort()

        tableDataColumns = {
          ...tableDataColumns,
          [producingStepId]: [
            {
              field: 'workCenterName',
              headerName: t('defineMasterPlan.inputModeration.workCenterName'),
              width: 150,
              align: 'left',
              sortable: false,
            },
            ...executionDates.map((date) => ({
              field: date,
              headerName: date,
              width: 150,
              align: 'left',
              sortable: false,
              renderCell: (params) => {
                return (
                  <Field.TextField
                    style={{ width: 140 }}
                    name={`${producingStepId}_${params.row[date]?.id}_${date}`}
                    type="number"
                  />
                )
              },
            })),
            {
              field: 'totalQuantity',
              headerName: t('defineMasterPlan.inputModeration.total'),
              align: 'center',
              sortable: false,
            },
          ],
        }
      }
    })
    setColumns(tableDataColumns)
  }, [tableData])

  const backToAutoModeration = () => {
    redirectRouter(
      ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH.replace(
        ':id',
        params?.get('masterPlanId'),
      ),
    )
  }

  const handleSubmit = async (values) => {
    const payload = {
      soId: moderationSuggestSpread[0]?.saleOrderId,
      items: Object.keys(tableData).map((producingStepId) => ({
        itemId: tableData[producingStepId]?.itemId,
        workCenterDetailSchedules: Object.keys(values)
          .filter((key) => key.split('_')[0] === producingStepId)
          .map((key) => ({
            id: Number(key.split('_')[1]),
            quantity: Number(values[key]),
          })),
      })),
      modeType: 3,
    }
    await actions.submitModerationInput(payload)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('defineMasterPlan.inputModeration.title')}
      loading={isLoading}
      onBack={backToAutoModeration}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            {Object.keys(tableData).map(
              (producingStepId) =>
                columns[producingStepId]?.length && (
                  <div key={producingStepId}>
                    <h4>{tableData[producingStepId].producingStepName}</h4>
                    <DataTable
                      rows={tableData[producingStepId].workCenterSchedule}
                      columns={columns[producingStepId]}
                      hideSetting={true}
                      hideFooter={true}
                    />
                  </div>
                ),
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                '& button + button': {
                  ml: 4 / 3,
                },
              }}
            >
              <Button color="grayF4" onClick={backToAutoModeration}>
                {t('common.close')}
              </Button>
              <Button variant="outlined" color="subText" onClick={resetForm}>
                {t('common.cancel')}
              </Button>
              <Button type="submit">{t('common.save')}</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default InputModeration
