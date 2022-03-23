import React from 'react'

import { Button, Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import { EVENT_TYPE_OPTIONS } from '~/modules/mesx/constants'
import useCalendar from '~/modules/mesx/redux/hooks/useCalendar'
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import { formatDateTimeUtc } from '~/utils'

import { createEventSchema } from './createEventSchema'
const DATE_ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'"

function PopupCreateEvent(props) {
  const {
    open,
    isDetail = false,
    initialValues,
    handleClose,
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
    const { resetForm } = useFormikContext()
    return (
      <>
        <Button color="grayF4" sx={{ mr: 1 }} onClick={handleClose}>
          {t('common.close')}
        </Button>
        {!isDetail && (
          <>
            <Button
              variant="outlined"
              color="subText"
              sx={{ mr: 1 }}
              onClick={resetForm}
            >
              {t('common.cancel')}
            </Button>

            <Button type="submit" disabled={isDetail}>
              {isUpdate ? t('common.update') : t('common.create')}
            </Button>
          </>
        )}
      </>
    )
  }

  const onSubmit = (values) => {
    const params = {
      id: values?.id,
      code: values.code.trim(),
      title: values.title,
      type: values.type,
      factoryIds: values.factoryIds,
      description: values.description,
      from: formatDateTimeUtc(values.time[0], DATE_ISO_FORMAT),
      to: formatDateTimeUtc(values.time[1], DATE_ISO_FORMAT),
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
      renderFooter={renderActionButtons}
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
      </Grid>
    </Dialog>
  )
}

export default PopupCreateEvent