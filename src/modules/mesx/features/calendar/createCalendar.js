import React from 'react'

import { Checkbox, FormControlLabel, Input } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemTable from './itemTable'
import TimeTable from './timeTable'

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
  const initialValues = {}

  const onSubmit = () => {}
  const renderActionBar = () => {
    return (
      <>
        <ActionBar
          onBack={() => history.push(ROUTE.PLAN.CALENDAR.PATH)}
          onCancel={() => history.push(ROUTE.PLAN.CALENDAR.PATH)}
          mode={MODAL_MODE.CREATE}
        />
      </>
    )
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('planCalendar.setupYearCalendar.title')}
        loading={false}
      >
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {() => (
                <Form>
                  <Grid
                    container
                    rowSpacing={4 / 3}
                    columnSpacing={{ xl: 8, xs: 4 }}
                  >
                    <Grid item lg={6} xs={12}>
                      <Field.DateRangePicker
                        name="time"
                        label={t('planCalendar.setupYearCalendar.plan')}
                        placeholder={t('planCalendar.setupYearCalendar.plan')}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="fatory"
                        label="Nhà máy"
                        placeholder="Nhà máy"
                        options={[]}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label="Mô tả"
                        placeholder="Mô tả"
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input type="file" />
                    </Grid>
                    <Grid item xs={12}>
                      <Tabs
                        list={['Ngày làm việc trong tuần', 'Ca làm việc']}
                        sx={{ mt: 2 }}
                      >
                        {/* Tab 1 */}
                        <Box>
                          <Grid
                            container
                            rowSpacing={4 / 3}
                            columnSpacing={{ xl: 8, xs: 4 }}
                          >
                            <Grid item lg={3} xs={12}>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Thứ 2"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Thứ 3"
                                />
                              </Grid>
                            </Grid>
                            <Grid item lg={3} xs={12}>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Thứ 4"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Thứ 5"
                                />
                              </Grid>
                            </Grid>
                            <Grid item lg={3} xs={12}>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Thứ 6"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Thứ 7"
                                />
                              </Grid>
                            </Grid>
                            <Grid item lg={3} xs={12}>
                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label="Chủ nhật"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>

                        {/* Tab 2 */}
                        <Box>
                          <ItemTable />

                          <Box mt={4}>
                            <TimeTable />
                          </Box>
                        </Box>
                      </Tabs>
                    </Grid>
                  </Grid>
                  {renderActionBar()}
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Page>
    </>
  )
}

export default CalendarCreate
