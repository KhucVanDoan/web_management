import { useState } from 'react'

import {
  Checkbox,
  FormControlLabel,
  Input,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemTable from './itemTable'
import TimeTable from './timeTable'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

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
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onSubmit = () => {}
  const renderActionButtons = () => {
    return (
      <>
        <Button
          color="grayF4"
          sx={{ mr: 1 }}
          onClick={() => history.push(ROUTE.PLAN.CALENDAR.PATH)}
        >
          {t('common.close')}
        </Button>
        <Button
          variant="outlined"
          color="subText"
          sx={{ mr: 1 }}
          onClick={() => history.push(ROUTE.PLAN.CALENDAR.PATH)}
        >
          {t('common.cancel')}
        </Button>
        <Button type="submit">{t('common.create')}</Button>
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
          <Grid item xl={11} sx={12}>
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
                        labelWidth={180}
                        required
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Field.Autocomplete
                        name="fatory"
                        label="Nhà máy"
                        placeholder="Nhà máy"
                        options={[]}
                        labelWidth={180}
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
                        labelWidth={180}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input type="file" />
                    </Grid>
                    <Grid item xs={12}>
                      <Box mt={2}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                        >
                          <Tab
                            label="Ngày làm việc trong tuần"
                            {...a11yProps(0)}
                          />
                          <Tab label="Ca làm việc" {...a11yProps(1)} />
                        </Tabs>
                      </Box>

                      <Box mt={2}>
                        <TabPanel value={value} index={0}>
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
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <Box>
                            <ItemTable />
                          </Box>
                          <Box mt={4}>
                            <TimeTable />
                          </Box>
                        </TabPanel>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                    {renderActionButtons()}
                  </Box>
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
