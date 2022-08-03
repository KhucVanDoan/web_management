import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { Form, Formik } from 'formik'
import { flatMap, flatten } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT } from '~/common/constants'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import { searchFactoriesApi } from '~/modules/database/redux/sagas/factory/search-factories'
import useCalendar from '~/modules/mesx/redux/hooks/useCalendar'

function PopupDetail(props) {
  const { open, handleClose, factory, date } = props
  const { t } = useTranslation(['mesx'])

  const factoryId = factory?.id

  const {
    actions,
    data: { detailCalendar },
  } = useCalendar()

  const handleSearch = (id) => {
    getDetailFactoryCalendar(id)
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
    detailCalendar?.shifts?.map((shift) => {
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
      cancelLabel={t('general:common.close')}
      noBorderBottom
      maxWidth="lg"
    >
      <Formik initialValues={{ factory }}>
        {() => (
          <Form>
            <Grid container rowSpacing={4 / 3}>
              <Grid item xl={5} lg={6} xs={12}>
                <Field.Autocomplete
                  name="factory"
                  label={t('planCalendar.factory')}
                  placeholder={t('planCalendar.factory')}
                  asyncRequest={(s) =>
                    searchFactoriesApi({
                      keyword: s,
                      limit: ASYNC_SEARCH_LIMIT,
                    })
                  }
                  asyncRequestHelper={(res) => res?.data?.items}
                  getOptionLabel={(opt) => opt?.name}
                  sx={{ mb: 3 }}
                  required
                  labelWidth="auto"
                  onChange={(val) => {
                    if (!val) return
                    handleSearch(val?.id)
                  }}
                />
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
