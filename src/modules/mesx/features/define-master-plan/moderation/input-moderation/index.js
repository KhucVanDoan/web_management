import React, { useEffect, useState } from 'react'

import { Box, Button } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { DATE_FORMAT_2 } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { ROUTE } from '~/modules/mesx/routes/config'
import { redirectRouter, formatDateTimeUtc } from '~/utils'

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

let initialValues = {}

const InputModeration = (props) => {
  const { t } = useTranslation(['mesx'])
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const {
    data: { isLoading, moderationSuggestSpread },
    actions,
  } = useDefineMasterPlan()
  const [moderationSuggestByProducingStepId, setModerationSuggestByProducingStepId] = useState({})
  const [columns, setColumns] = useState({})

  useEffect(() => {
    const producingStepIds = params?.get('producingStep').split(',') || []
    Promise.all(
      producingStepIds.map(stepId => actions.getModerationSuggestSpread(stepId))
    )
    return () => {
      actions.resetModerationSuggestSpread()
    }
  }, [])

  useEffect(() => {
    setModerationSuggestByProducingStepId(
      moderationSuggestSpread
        ?.map(producingStep => ({
          [producingStep.id.toString()]: producingStep
        }))
        .reduce((prev, cur) => ({ ...prev, ...cur }), {})
    )
  }, [moderationSuggestSpread])

  useEffect(() => {
    Object.keys(moderationSuggestByProducingStepId).forEach(producingStepId => {
      const workCenterSchedule = moderationSuggestByProducingStepId[producingStepId]?.workCenterSchedules
      if (workCenterSchedule?.length) {
        const workCenterDetailSchedules = workCenterSchedule[0]?.workCenterDetailSchedules?.map(schedule => (
          formatDateTimeUtc(schedule.createdAt, DATE_FORMAT_2)
        ))

        const currentProducingStepInitialValues = workCenterSchedule.map(workCenter => {
          return workCenter.workCenterDetailSchedules.reduce((prev, cur) => ({
            ...prev,
            [`${producingStepId}_${cur.id}`]: cur.quantity
          }), {})
        }).reduce((prev, cur) => ({ ...prev, ...cur }), {})
  
        initialValues = {
          ...initialValues,
          ...currentProducingStepInitialValues,
        }
        
        setColumns({
          ...columns,
          [producingStepId]: [
            {
              field: 'workCenterName',
              headerName: t('defineMasterPlan.inputModeration.workCenterName'),
              width: 150,
              align: 'left',
              sortable: false,
            },
            ...workCenterDetailSchedules.map(date => ({
              field: date,
              headerName: date,
              width: 150,
              align: 'left',
              sortable: false,
              renderCell: (params) => {
                const detailSchedule = params.row.workCenterDetailSchedules.find(detailSchedule => (
                  formatDateTimeUtc(detailSchedule.createdAt, DATE_FORMAT_2) === date
                )) || {}
                return (
                  <Field.TextField
                    style={{ width: 140 }}
                    name={`${producingStepId}_${detailSchedule.id}`}
                    type="number"
                  />
                )
              },
            })),
            {
              field: 'quantity',
              headerName: t('defineMasterPlan.inputModeration.total'),
              align: 'center',
              sortable: false,
            },
          ]
        })
      }
    })
    
  }, [moderationSuggestByProducingStepId])

  const backToAutoModeration = () => {
    redirectRouter(ROUTE.MASTER_PLAN.AUTO_MODERATION.PATH.replace(':id', params?.get('masterPlanId')))
  }

  const handleSubmit = async (values) => {
    const payload = {
      soId: moderationSuggestSpread[0]?.saleOrderId,
      items: Object.keys(moderationSuggestByProducingStepId).map(producingStepId => ({
        itemId: moderationSuggestByProducingStepId[producingStepId]?.itemId,
        workCenterDetailSchedules: Object.keys(values)
          .filter(key => (
            key.split('_')[0] === producingStepId
          ))
          .map(key => ({
            id: Number(key.split('_')[1]),
            quantity: Number(values[key])
          }))
      })),
      modeType: 3
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
        {({ resetForm, values, setFieldValue }) => (
          <Form>
            {Object.keys(moderationSuggestByProducingStepId).map(producingStepId => (
              columns[producingStepId]?.length && (
                <>
                  <h4>{moderationSuggestByProducingStepId[producingStepId].producingStepName}</h4>
                  <DataTable
                    rows={moderationSuggestByProducingStepId[producingStepId].workCenterSchedules}
                    columns={columns[producingStepId]}
                    hideSetting={true}
                    hideFooter={true}
                  />
                </>
              )
            ))}
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
              <Button type="submit">{t('common.create')}</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default InputModeration;
