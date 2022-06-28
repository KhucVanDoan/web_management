import React, { useState } from 'react'

import { Box, Popover, Typography } from '@mui/material'
import { Formik, Form } from 'formik'
import { isEqual } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import { useClasses } from '~/themes'

import style from './style'

const TableFilter = ({
  filters: { form, values, onApply, defaultValue = {}, validationSchema },
}) => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Box className={classes.root}>
        <Button icon="tableFilter" color="grayEE" onClick={handleOpen} />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{
            variant: 'caret',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box className={classes.formContainer}>
            <Typography variant="h5" sx={{ mb: 4 / 3 }}>
              {t('dataTable.filterTitle')}
            </Typography>

            <Formik
              initialValues={values}
              validationSchema={validationSchema}
              onSubmit={(value) => {
                onApply(value)
                handleClose()
              }}
              enableReinitialize
            >
              {({ handleReset, values: formikValues }) => (
                <Form>
                  <Box
                    sx={{ maxHeight: '40vh', overflowY: 'auto', mr: -2, pr: 2 }}
                  >
                    {form}
                  </Box>
                  <Box sx={{ display: 'flex', mt: 4 / 3 }}>
                    <Button
                      color="grayF4"
                      onMouseDown={() => {
                        if (isEqual(values, defaultValue)) {
                          if (!isEqual(formikValues, defaultValue)) {
                            handleReset()
                          }
                        } else {
                          onApply(defaultValue)
                        }
                      }}
                      sx={{ ml: 'auto', mr: '8px' }}
                    >
                      {t('dataTable.cancel')}
                    </Button>
                    <Button type="submit">{t('dataTable.filterButton')}</Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Popover>
      </Box>
    </>
  )
}

TableFilter.defaultProps = {
  filters: {},
}

TableFilter.propTypes = {
  filters: PropTypes.shape({
    form: PropTypes.node,
    values: PropTypes.shape(),
    onApply: PropTypes.func,
    defaultValue: PropTypes.shape(),
    validationSchema: PropTypes.shape(),
  }),
}

export default TableFilter
