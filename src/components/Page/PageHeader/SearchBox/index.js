import React from 'react'

import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Icon from '~/components/Icon'
import { useClasses } from '~/themes'

import style from './style'

const SearchBox = ({ onSearch, placeholder }) => {
  const classes = useClasses(style)
  const { t } = useTranslation()

  return (
    <form
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(e.target.search.value)
      }}
    >
      <Icon
        name="search"
        sx={{
          width: 18,
          height: 18,
          position: 'absolute',
          top: 11,
          left: 11,
          pointerEvents: 'none',
        }}
      />
      <input
        name="search"
        className={classes.input}
        placeholder={placeholder || `${t('page.searchPlaceholder')}....`}
        autoComplete="off"
      />
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
    </form>
  )
}

SearchBox.defaultProps = {
  onSearch: () => {},
  placeholder: '',
}

SearchBox.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
}

export default SearchBox
