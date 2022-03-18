import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { Form, Formik } from 'formik'
import { flatMap, flatten } from 'lodash'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import useCalendar from '~/modules/mesx/redux/hooks/useCalendar'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'

function PopupDetail(props) {
  const { open, handleClose, factoryId, date } = props
  const { t } = useTranslation(['mesx'])
  const initialSearch = factoryId
    ? { factoryId: factoryId }
    : { factoryId: factoryId }

  const {
    actions,
    data: { detailCalendar },
  } = useCalendar()

  const {
    data: {
      factoryList: { items: factories },
    },
  } = useCommonManagement()

  const handleSearch = (values) => {
    getDetailFactoryCalendar(values.factoryId)
  }

  useEffect(() => {
    getDetailFactoryCalendar(factoryId)
  }, [factoryId, date, actions])

  const getDetailFactoryCalendar = (factoryId) => {
    const params = { from: date, to: date, factoryId }
    actions.getDetailFactoryCalendar(params)
  }

  const shiftTitle = flatMap(detailCalendar?.shifts, 'title').map((title) => ({
    field: title,
    headerName: title,
    width: 50,
    align: 'center',
  }))

  const shiftColumns = [
    {
      field: 'title',
      headerName: t('planCalendar.shiftName'),
      width: 50,
      align: 'center',
    },
    {
      field: 'from',
      headerName: t('planCalendar.shiftTimeStart'),
      width: 50,
      align: 'center',
    },
    {
      field: 'to',
      headerName: t('planCalendar.shiftTimeEnd'),
      width: 50,
      align: 'center',
    },
  ]

  const relaxColumns = [
    {
      field: 'title',
      headerName: t('planCalendar.relaxTimeTitle'),
      width: 50,
      align: 'center',
    },
    ...shiftTitle,
  ]

  const relaxData = flatten(
    detailCalendar?.shifts.map((shift) => {
      return shift.relaxes.map((relax) => ({
        title: relax.title,
        [shift.title]: `${relax.from} - ${relax.to}`,
      }))
    }),
  )

  return (
    <Dialog
      open={open}
      title={t('planCalendar.detail')}
      onCancel={handleClose}
      cancelLabel={t('common.close')}
      noBorderBottom
      maxWidth="lg"
    >
      <Formik initialValues={initialSearch} onSubmit={handleSearch}>
        {() => (
          <Form>
            <Grid container rowSpacing={4 / 3}>
              <Grid item xs={12} display="flex">
                <Grid item xs={12} sx={{ mr: 3 }}>
                  <Field.Autocomplete
                    name="factoryId"
                    label={t('planCalendar.factory')}
                    placeholder={t('planCalendar.factory')}
                    options={factories}
                    getOptionValue={(opt) => opt?.id}
                    getOptionLabel={(opt) => opt?.name}
                    sx={{ mb: 3 }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit">{t('common.filter')}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <DataTable
        rows={detailCalendar?.shifts ?? []}
        columns={shiftColumns}
        striped={false}
        title={t('planCalendar.shift')}
        hideSetting
        hideFooter
      />
      <Box sx={{ mt: 2 }}>
        <DataTable
          rows={relaxData ?? []}
          columns={relaxColumns}
          striped={false}
          title={t('planCalendar.relaxTime')}
          hideSetting
          hideFooter
        />
      </Box>
    </Dialog>
  )
}

export default PopupDetail
