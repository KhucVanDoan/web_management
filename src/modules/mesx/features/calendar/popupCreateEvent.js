import React from 'react'

import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import { EVENT_TYPE_OPTIONS } from '~/modules/mesx/constants'
import useCalendar from '~/modules/mesx/redux/hooks/useCalendar'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'

import { createEventSchema } from './createEventSchema'

function PopupCreateEvent(props) {
  const {
    open,
    isDetail = false,
    initialValues,
    handleClose,
    onResetForm,
    isUpdate,
    getListFactoryEvent,
  } = props
  const { t } = useTranslation(['mesx'])
  const { actions } = useCalendar()

  const {
    data: {
      factoryList: { items: factories },
    },
  } = useCommonManagement()

  const renderActionButtons = () => {
    return (
      <>
        <Button color="grayF4" sx={{ mr: 1 }} onClick={handleClose}>
          {t('common.close')}
        </Button>
        <Button
          variant="outlined"
          color="subText"
          sx={{ mr: 1 }}
          onClick={onResetForm}
        >
          {t('common.cancel')}
        </Button>
        {!isDetail && (
          <Button type="submit" disabled={isDetail}>
            {isUpdate ? t('common.update') : t('common.create')}
          </Button>
        )}
      </>
    )
  }

  const onSubmit = (values) => {
    const params = {
      id: values?.id,
      code: values.code,
      title: values.title,
      type: values.type,
      factoryIds: values.factoryIds,
      description: values.description,
      from: values.time[0],
      to: values.time[1],
    }
    if (isUpdate) {
      actions.updateFactoryCalendar(params, getListFactoryEvent)
    } else {
      actions.createFactoryCalendar(params, getListFactoryEvent)
    }
    handleClose()
  }

  return (
    <Dialog
      open={open}
      title={
        isUpdate ? t('planCalendar.detail') : t('planCalendar.createEvent')
      }
      maxWidth="sm"
      noBorderBottom
      formikProps={{
        initialValues: initialValues,
        validationSchema: createEventSchema(t),
        onSubmit,
      }}
    >
      <Grid>
        <Grid container rowSpacing={4 / 3} columnSpacing={4}>
          <Grid item xs={12}>
            <Field.TextField
              name="code"
              label={t('planCalendar.eventCode')}
              placeholder={t('planCalendar.eventCode')}
              disabled={isDetail || isUpdate}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Field.TextField
              name="title"
              label={t('planCalendar.eventName')}
              placeholder={t('planCalendar.eventName')}
              disabled={isDetail}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Field.Autocomplete
              name="type"
              label={t('planCalendar.eventType')}
              placeholder={t('planCalendar.eventType')}
              options={EVENT_TYPE_OPTIONS}
              getOptionValue={(opt) => opt?.id}
              getOptionLabel={(opt) => t(opt?.name)}
              disabled={isDetail}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Field.DateRangePicker
              name="time"
              label={t('planCalendar.eventTime')}
              placeholder={t('planCalendar.eventTime')}
              disabled={isDetail}
              minDate={new Date()}
              required
            />
          </Grid>
          {/* <Grid item xs={9} sx={{ ml: 15 }}>
          <Box display="flex" alignItems="center">
            <Field.TimePicker name={`timeFrom`} />
            <Box mx={1} display="flex" alignItems="center">
              {t('workCenter.to')}
            </Box>
            <Field.TimePicker name={`timeTo`} />
          </Box>
        </Grid> */}
          <Grid item xs={12}>
            <Field.Autocomplete
              name="factoryIds"
              label={t('planCalendar.factory')}
              placeholder={t('planCalendar.factory')}
              options={factories}
              getOptionValue={(opt) => opt?.id}
              getOptionLabel={(opt) => opt?.name}
              disabled={isDetail}
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
              disabled={isDetail}
              rows={5}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          {renderActionButtons()}
        </Box>
      </Grid>
    </Dialog>
  )
}

export default PopupCreateEvent
