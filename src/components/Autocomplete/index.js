import { useState, useEffect } from 'react'

import {
  Autocomplete as MuiAutocomplete,
  Box,
  ListItemButton,
  Paper,
  Typography,
} from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { useDebounce } from '~/common/hooks/useDebounce'
import VirtualList from '~/components/Autocomplete/VirtualList'
import TextField from '~/components/TextField'
import { useClasses } from '~/themes'

import Icon from '../Icon'
import style from './style'

const Autocomplete = ({
  label,
  options: rawOptions,
  multiple,
  renderOption,
  asyncRequest,
  renderStickyHeader,
  noOptionsText,
  loadingText,
  vertical,
  required,
  error,
  helperText,
  getOptionLabel,
  placeholder,
  labelWidth,
  getOptionValue,
  value: rawValue,
  onChange: rawOnChange,
  ...props
}) => {
  const classes = useClasses(style)
  const hasSubLabel = rawOptions.some((opt) => opt.subLabel)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(rawOptions)
  const isAsync = typeof asyncRequest === 'function'
  const { t } = useTranslation()

  useEffect(() => {
    setOptions(rawOptions)
  }, [rawOptions])

  const getOptionsByKeyword = async (keyword) => {
    if (!keyword) {
      setOptions(rawOptions)
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const response = await asyncRequest(keyword)
      setOptions(response)
    } catch (e) {
      setOptions(rawOptions)
    } finally {
      setLoading(false)
    }
  }

  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (isAsync) {
      getOptionsByKeyword(debouncedInputValue)
    }
  }, [debouncedInputValue, isAsync])

  const renderOptionWithSubLabel = (optionProps, option) => {
    return (
      <ListItemButton {...optionProps} component="li">
        <Typography sx={{ flex: 1, wordBreak: 'break-word' }}>
          {option.label}
        </Typography>
        <Typography sx={{ flex: '0 0 25%', ml: 2, textAlign: 'right' }}>
          {option.subLabel}
        </Typography>
      </ListItemButton>
    )
  }

  const renderOptionMultiple = (optionProps, option, selected) => {
    return (
      <ListItemButton
        {...optionProps}
        component="li"
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography>{getOptionLabel(option)}</Typography>
        {selected && (
          <Box sx={{ ml: 2 }}>
            <Icon name="check" />
          </Box>
        )}
      </ListItemButton>
    )
  }

  const StickyHeader = ({ children, ...other }) => {
    const header = () => {
      if (renderStickyHeader) {
        if (typeof renderStickyHeader === 'function')
          return renderStickyHeader()
        if (typeof renderStickyHeader === 'string')
          return (
            <Typography sx={{ p: '8px 16px' }}>{renderStickyHeader}</Typography>
          )
      }
      return null
    }
    return (
      <Paper {...other}>
        {header()}
        {children}
      </Paper>
    )
  }

  const [value, setValue] = useState(null)

  useEffect(() => {
    if (!multiple && typeof getOptionValue === 'function') {
      const selectedValue = options.find((o) => getOptionValue(o) === rawValue)
      setValue(selectedValue)
    }
  }, [rawValue, options])

  return (
    <MuiAutocomplete
      classes={{
        root: classes.root,
        tag: classes.tag,
        listbox: classes.listbox,
      }}
      forcePopupIcon={false}
      multiple={multiple}
      ChipProps={{
        deleteIcon: (
          <Box sx={{ display: 'flex' }}>
            <Icon name="close" sx={{ width: '8px', height: '8px' }} />
          </Box>
        ),
      }}
      {...(!multiple && typeof getOptionValue === 'function'
        ? {
            value: value,
            onChange: (_, newValue) => {
              setValue(newValue)
              rawOnChange(newValue)
            },
          }
        : {})}
      options={options}
      noOptionsText={noOptionsText || t('autocomplete.noOptionsText')}
      loading={loading}
      loadingText={loadingText || t('autocomplete.loadingText')}
      getOptionLabel={getOptionLabel}
      renderOption={(optionProps, option, { selected }) => {
        if (typeof renderOption === 'function')
          return renderOption(optionProps, option)
        if (multiple) return renderOptionMultiple(optionProps, option, selected)
        if (hasSubLabel) return renderOptionWithSubLabel(optionProps, option)
        return (
          <ListItemButton component="li" {...optionProps}>
            {getOptionLabel(option)}
          </ListItemButton>
        )
      }}
      {...((options || []).length > 50
        ? {
            ListboxComponent: VirtualList,
          }
        : {})}
      {...(isAsync ? { filterOptions: (opts) => opts } : {})}
      {...(multiple ? { disableCloseOnSelect: true } : {})}
      PaperComponent={StickyHeader}
      renderInput={({ InputLabelProps, ...params }) => (
        <TextField
          {...params}
          vertical={vertical}
          required={required}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          label={label}
          labelWidth={labelWidth}
          onChange={(e) => {
            setInputValue(e.target.value)
            if (isAsync && !loading) {
              setLoading(true)
            }
          }}
        />
      )}
      {...props}
    />
  )
}

Autocomplete.defaultProps = {
  label: '',
  multiple: false,
  options: [],
  asyncRequest: null,
  renderStickyHeader: '',
  vertical: false,
  required: false,
  error: false,
  helperText: '',
  placeholder: '',
  getOptionLabel: (option) => option?.label || '',
}

Autocomplete.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  renderOption: PropTypes.shape(),
  asyncRequest: PropTypes.func,
  renderStickyHeader: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape(),
    PropTypes.string,
  ]),
  noOptionsText: PropTypes.node,
  loadingText: PropTypes.node,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  labelWidth: PropTypes.number,
  onChange: PropTypes.func,
}

export default Autocomplete
