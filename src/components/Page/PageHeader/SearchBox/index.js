import React from 'react'

import { Box } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import { Formik, Form } from 'formik'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useClasses } from '~/themes'

import style from './style'

const SearchBox = ({ onSearch, placeholder, renderSearchBox }) => {
  const classes = useClasses(style)
  const { t } = useTranslation()

  if (typeof renderSearchBox === 'function') {
    return <Box className={classes.root}>{renderSearchBox()}</Box>
  }

  return (
    <Box className={classes.root}>
      <Formik
        initialValues={{ keyword: '' }}
        onSubmit={({ keyword }) => onSearch(keyword)}
        enableReinitialize
      >
        <Form>
          <Field.TextField
            name="keyword"
            placeholder={placeholder || `${t('page.searchPlaceholder')}...`}
            inputProps={{
              maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
            }}
            startAdornment={
              <InputAdornment>
                <Icon
                  name="search"
                  sx={{
                    width: 18,
                    height: 18,
                    pointerEvents: 'none',
                  }}
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment
                sx={{
                  height: 'auto',
                  maxHeight: 'none',
                }}
              >
                <Button
                  sx={{
                    height: '32px',
                    margin: '4px',
                    whiteSpace: 'nowrap',
                  }}
                  type="submit"
                >
                  {t('page.searchButton')}
                </Button>
              </InputAdornment>
            }
          />
        </Form>
      </Formik>
    </Box>
  )
}

SearchBox.defaultProps = {
  onSearch: () => {},
  placeholder: '',
}

SearchBox.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  renderSearchBox: PropTypes.func,
}

export default SearchBox
