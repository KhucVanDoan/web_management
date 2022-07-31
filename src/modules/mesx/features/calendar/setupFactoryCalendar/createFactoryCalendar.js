import { useEffect } from 'react'

import { createFilterOptions, FormControlLabel } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Formik, Form, FieldArray } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import useCalendar from '~/modules/mesx/redux/hooks/useCalendar'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { ROUTE } from '~/modules/mesx/routes/config'

import { createCalendarSchema } from './createCalendarSchema'
import RelaxTable from './relaxTable'
import ShiftTable from './shiftsTable'

function CalendarCreate() {
  const { t } = useTranslation(['mesx'])
  const breadcrumbs = [
    {
      title: ROUTE.PLAN.CALENDAR.TITLE,
      path: ROUTE.PLAN.CALENDAR.PATH,
    },
    {
      title: ROUTE.PLAN.CALENDAR.CREATE.TITLE,
      path: ROUTE.PLAN.CALENDAR.CREATE.PATH,
    },
  ]
  const history = useHistory()

  const {
    actions: commonAction,
    data: {
      factoryList: { items: factories },
    },
  } = useCommonManagement()

  const { actions } = useCalendar()

  useEffect(() => {
    const params = { isGetAll: 1 }
    commonAction.getFactories(params)
    return () => {
      commonAction.resetFactoriesListState()
    }
  }, [])

  const initialValues = {
    code: '',
    timePlan: null,
    fatoryIds: null,
    description: '',
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    shifts: [
      {
        id: new Date().getTime(),
        title: null,
        from: null,
        to: null,
        breakTimes: [
          {
            id: new Date().getTime(),
            title: t('planCalendar.shiftPreparationTime'),
            from: null,
            to: null,
          },
        ],
      },
    ],
    breakTimes: [{ id: new Date().getTime() }],
    tabValue: '1',
  }

  const formatTime = (data = '') => {
    if (data) {
      const times = data.split(':')
      return `${times[0]}:${times[1]}`
    }
  }

  const onSubmit = (values) => {
    const workDays = []
    if (values.monday) workDays.push(1)
    if (values.tuesday) workDays.push(2)
    if (values.wednesday) workDays.push(3)
    if (values.thursday) workDays.push(4)
    if (values.friday) workDays.push(5)
    if (values.thursday) workDays.push(6)
    if (values.sunday) workDays.push(7)
    const params = {
      description: values.description,
      from: values.timePlan[0],
      to: values.timePlan[1],
      factoryIds: values.fatoryIds,
      workDays: workDays,
      shifts: values.shifts.map((item) => ({
        title: item.title,
        from: item.from,
        to: item.to,
        relaxs: values.breakTimes?.map((breakTime) => {
          const shiftRelax = breakTime?.shifts?.find(
            (itemShift) => itemShift.shiftId === item.id,
          )

          if (shiftRelax) {
            return {
              title: breakTime.title,
              from: formatTime(shiftRelax.from),
              to: formatTime(shiftRelax.to),
            }
          }
          return null
        }),
      })),
    }
    actions.createFactoryCalendarSetup(params, () =>
      history.push(ROUTE.PLAN.CALENDAR.PATH),
    )
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('planCalendar.setupYearCalendar.title')}
      loading={false}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={createCalendarSchema(t)}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, handleReset }) => (
          <Form>
            <Grid container justifyContent="center">
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      minDate={new Date()}
                      name="timePlan"
                      label={t('planCalendar.setupYearCalendar.plan')}
                      placeholder={t('planCalendar.setupYearCalendar.plan')}
                      required
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="fatoryIds"
                      label={t('planCalendar.factory')}
                      placeholder={t('planCalendar.factory')}
                      options={factories}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.name}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                      multiple
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field.TextField
                      name="description"
                      label={t('planCalendar.eventDescription')}
                      placeholder={t('planCalendar.eventDescription')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                  {/* @TODO: DongNQ implement when upload file done
                     <Grid item xs={12}>
                      <Input type="file" />
                    </Grid> */}
                </Grid>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Box>
                <Tabs
                  list={[
                    t('planCalendar.setupYearCalendar.workingDayInWeek'),
                    t('planCalendar.setupYearCalendar.shift'),
                  ]}
                  sx={{ mt: 2 }}
                >
                  <Box sx={{ px: 0 }}>
                    <Grid
                      container
                      rowSpacing={4 / 3}
                      columnSpacing={{ xl: 8, xs: 4 }}
                    >
                      <Grid item lg={3} xs={12}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field.Checkbox name="monday" />}
                            label={t('planCalendar.setupYearCalendar.monday')}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field.Checkbox name="tuesday" />}
                            label={t('planCalendar.setupYearCalendar.tuesday')}
                          />
                        </Grid>
                      </Grid>
                      <Grid item lg={3} xs={12}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field.Checkbox name="wednesday" />}
                            label={t(
                              'planCalendar.setupYearCalendar.wednesday',
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field.Checkbox name="thursday" />}
                            label={t('planCalendar.setupYearCalendar.thursday')}
                          />
                        </Grid>
                      </Grid>
                      <Grid item lg={3} xs={12}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field.Checkbox name="friday" />}
                            label={t('planCalendar.setupYearCalendar.friday')}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field.Checkbox name="saturday" />}
                            label={t('planCalendar.setupYearCalendar.saturday')}
                          />
                        </Grid>
                      </Grid>
                      <Grid item lg={3} xs={12}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field.Checkbox name="sunday" />}
                            label={t('planCalendar.setupYearCalendar.sunday')}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ px: 0 }}>
                    <FieldArray
                      name="shifts"
                      render={(arrayHelpers) => (
                        <ShiftTable
                          shifts={values.shifts || []}
                          arrayHelpers={arrayHelpers}
                        />
                      )}
                    />
                    <Box mt={4}>
                      <FieldArray
                        name="breakTimes"
                        render={(arrayHelpers) => (
                          <RelaxTable
                            shifts={values.shifts || []}
                            breakTimes={values.breakTimes || []}
                            arrayHelpers={arrayHelpers}
                            setFieldValue={setFieldValue}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                </Tabs>
              </Box>
            </Box>

            <ActionBar
              onBack={() => history.push(ROUTE.PLAN.CALENDAR.PATH)}
              onCancel={handleReset}
              mode={MODAL_MODE.CREATE}
            />
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default CalendarCreate
