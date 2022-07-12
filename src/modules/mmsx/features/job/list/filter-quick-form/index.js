import React, { useEffect } from 'react'

import { Grid, createFilterOptions, Box } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import { JOB_STATUS_LIST, WORK_TYPE_OPTIONS } from '~/modules/mmsx/constants'
import useCommonInfo from '~/modules/mmsx/redux/hooks/useCommonInfo'

const JobQuickFilter = ({ setQuickFilters, quickFilters, defaultFilter }) => {
  const { t } = useTranslation(['mmsx'])

  const onSubmit = (values) => {
    setQuickFilters(values)
  }
  const {
    data: { responsibleSubject },
    actions: commonAction,
  } = useCommonInfo()

  useEffect(() => {
    commonAction.getResponsibleSubject()
  }, [])

  return (
    <Formik initialValues={quickFilters} onSubmit={onSubmit} enableReinitialize>
      {({ resetForm }) => {
        return (
          <Form>
            <Grid container justifyContent="center" sx={{ mb: 4 }}>
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 8, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="type"
                      label={t('job.workType')}
                      placeholder={t('job.workType')}
                      options={WORK_TYPE_OPTIONS}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => t(opt?.text)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="status"
                      label={t('job.status')}
                      placeholder={t('job.status')}
                      options={JOB_STATUS_LIST}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.DateRangePicker
                      name="createdAt"
                      label={t('job.createdAt')}
                      placeholder={t('job.createdAt')}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="assign"
                      label={t('job.assign.responsibleUser')}
                      placeholder={t('job.assign.responsibleUser')}
                      options={responsibleSubject?.responsibleUsers}
                      getOptionValue={(opt) => opt?.id}
                      getOptionLabel={(opt) => opt?.username}
                      filterOptions={createFilterOptions({
                        stringify: (opt) => `${opt?.code}|${opt?.name}`,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        color="grayF4"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          resetForm()
                          setQuickFilters(defaultFilter)
                        }}
                      >
                        {t('general:common.cancel')}
                      </Button>
                      <Button type="submit">
                        {t('general:common.search')}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default JobQuickFilter
