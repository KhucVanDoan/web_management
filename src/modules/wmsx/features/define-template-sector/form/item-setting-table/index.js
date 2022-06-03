import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Box, Grid, IconButton } from '@mui/material'
import Big from 'big.js'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  NOTIFICATION_TYPE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import addNotification from '~/utils/toast'

const ItemSettingTable = ({ items, arrayHelpers, values }) => {
  const { t } = useTranslation(['wmsx'])
  const validateName = (name, index) => {
    let error = ''
    if (
      items?.some(
        (item, itemIndex) => item?.nameSheft === name && itemIndex !== index,
      )
    ) {
      error = t('templateSector.duplicateName')
    }
    return error
  }
  const validateNumberOfShelfsInSector = () => {
    const nextQty = (items?.length || 0) + 1
    if (
      values?.templateSheft &&
      Big(nextQty).mul(Big(values?.templateSheft?.long?.value || 0)) <=
        (values?.long || 0)
    ) {
      return true
    }
    return false
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            if (validateNumberOfShelfsInSector()) {
              arrayHelpers.push({
                id: new Date().getTime(),
                nameSheft: '',
              })
            } else {
              addNotification(
                t('templateSector.messageNumberOfShelfsExceed'),
                NOTIFICATION_TYPE.ERROR,
              )
            }
          }}
          disabled={!values?.templateSheft?.id}
        >
          <AddIcon fontSize="small" /> {t('templateSector.addDetailButton')}
        </Button>
      </Box>
      <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
        {items?.map((item, index) => (
          <Grid item xs={12} lg={6} key={item?.id}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Field.TextField
                name={`items[${index}].nameSheft`}
                label={`${t('templateSector.nameSheft')} ${index + 1}`}
                inputProps={{
                  maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                }}
                required
                validate={(name) => validateName(name, index)}
                sx={{ flex: 1 }}
                placeholder={`${t('templateSector.nameSheft')} ${index + 1}`}
              />
              <IconButton
                onClick={() => {
                  arrayHelpers.remove(index)
                }}
                disabled={items?.length === 1}
              >
                <Icon name="remove" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
}

export default ItemSettingTable
