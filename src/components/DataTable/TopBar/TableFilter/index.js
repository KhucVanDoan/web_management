import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Box, Popover } from '@mui/material'
import { useClasses } from 'themes'
import style from './style'
import Button from 'components/Button'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'

const TableFilter = ({ filters: { form, values, onApply, ...props } }) => {
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
          <Formik
            initialValues={values}
            onSubmit={(values) => {
              onApply(values)
              handleClose()
            }}
          >
            {({ resetForm }) => (
              <Form>
                {form}
                <Box sx={{ display: 'flex', mt: '16px' }}>
                  <Button type="submit" sx={{ ml: 'auto', mr: '8px' }}>
                    {t('dataTable.filter')}
                  </Button>
                  <Button
                    color="grayF4"
                    onClick={() => {
                      resetForm()
                      handleClose()
                    }}
                  >
                    {t('dataTable.cancel')}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Popover>
    </>
  )
}

TableFilter.defaultProps = {
  filters: {
    form: null,
    values: {},
    onApply: () => {},
  },
}

TableFilter.propTypes = {
  filters: PropTypes.shape({
    form: PropTypes.node,
    values: PropTypes.shape(),
    onApply: PropTypes.func,
  }),
}

export default TableFilter
