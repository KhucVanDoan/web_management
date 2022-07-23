import React, { useState, useEffect } from 'react'

import HighlightAltOutlinedIcon from '@mui/icons-material/HighlightAltOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ManageSearch from '@mui/icons-material/ManageSearch'
import {
  Autocomplete as MuiAutocomplete,
  Box,
  ListItemButton,
  Typography,
} from '@mui/material'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { isArray, isEqual, last, reverse, uniqWith } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { useDebounce } from '~/common/hooks'
import VirtualList from '~/components/Autocomplete/VirtualList'
import TextField from '~/components/TextField'
import { useClasses } from '~/themes'

import Icon from '../Icon'
import style from './style'

const Autocomplete = ({
  label,
  options = [],
  multiple,
  renderOption,
  asyncRequest,
  asyncRequestHelper,
  noOptionsText,
  loadingText,
  vertical,
  required,
  error,
  helperText,
  getOptionLabel,
  getOptionSubLabel,
  getOptionValue,
  placeholder,
  labelWidth,
  value,
  onChange,
  isOptionEqualToValue,
  uncontrolled,
  ...props
}) => {
  const classes = useClasses(style)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [searchedOptions, setSearchedOptions] = useState([])
  const [persistedOptions, setPersistedOptions] = useState([])
  const [isShowFullTags, setIsShowFullTags] = useState(false)
  const [isSearchingMode, setIsSearchingMode] = useState(false)

  const isAsync = typeof asyncRequest === 'function'
  const hasSubLabel = typeof getOptionSubLabel === 'function'

  const { t } = useTranslation()
  const debouncedInputValue = useDebounce(inputValue, 200)

  const isOptEqual = (opt, v) =>
    typeof isOptionEqualToValue === 'function'
      ? isOptionEqualToValue(opt, v)
      : isEqual(getOptionValue(opt), v)

  const parseValue = (val, opts = []) => {
    if (multiple) {
      return opts.filter((opt) => {
        if (isArray(val)) {
          return val?.some((v) => isOptEqual(opt, v))
        }
        return false
      })
    }

    return opts.find((opt) => isOptEqual(opt, val)) || null
  }

  const fetchOptionsFn = async (keyword = '', cb) => {
    setLoading(true)
    try {
      const response = await asyncRequest(keyword)
      let opts = response

      if (response && typeof asyncRequestHelper === 'function') {
        opts = asyncRequestHelper(response)
      }

      if (!Array.isArray(opts)) {
        opts = []
      }

      cb(opts)
    } catch (e) {
      cb([])
    } finally {
      setLoading(false)
    }
  }

  const persist = (opts) =>
    setPersistedOptions((oldOpts) =>
      uniqWith([...oldOpts, ...opts], isOptEqual),
    )

  const prefetchOptions = () => fetchOptionsFn('', persist)

  const fetchOptions = (keyword) =>
    fetchOptionsFn(keyword, (opts) => {
      setSearchedOptions(opts)
      persist(opts)
    })

  useEffect(() => {
    if (isAsync && debouncedInputValue) {
      fetchOptions(debouncedInputValue)
      setIsSearchingMode(true)
    }
  }, [debouncedInputValue, isAsync])

  useEffect(() => {
    if (isAsync) {
      prefetchOptions()
    }
  }, [isAsync])

  const getDisplayedAsyncOptions = () => {
    if (isSearchingMode) {
      return searchedOptions
    }

    let arr = persistedOptions
    if (multiple) {
      arr = [
        ...(Array.isArray(value) && value?.length ? value : []),
        ...persistedOptions,
      ]
    } else {
      arr = [...(value ? [value] : []), ...persistedOptions]
    }

    return reverse(uniqWith(reverse(arr), isOptEqual))
  }

  const renderCustomizedOption = (optProps, opt, selected) => {
    if (typeof renderOption === 'function') {
      return renderOption(optProps, opt, selected)
    }

    return (
      <ListItemButton
        {...optProps}
        component="li"
        sx={{
          wordBreak: 'break-word',
          display: 'block !important',
          ...(multiple
            ? {
                pr: '30px !important',
                position: 'relative',
              }
            : {}),
        }}
      >
        <Typography component="span">{getOptionLabel(opt)}</Typography>

        {hasSubLabel && (
          <Typography
            variant="subtitle"
            sx={{
              ml: 0.5,
              opacity: 0.7,
            }}
          >
            - {getOptionSubLabel(opt)}
          </Typography>
        )}

        {multiple && selected && (
          <Icon
            name="check"
            size={16}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          />
        )}
      </ListItemButton>
    )
  }

  const renderTags = (tags = [], getTagProps) => {
    if (!tags?.length) return null

    if (isShowFullTags) {
      return (
        <>
          {tags.map((tag, index) => (
            <Chip
              title={getOptionLabel(tag)}
              label={getOptionLabel(tag)}
              deleteIcon={
                <Box sx={{ display: 'flex' }}>
                  <Icon name="close" sx={{ width: '8px', height: '8px' }} />
                </Box>
              }
              {...getTagProps({ index })}
            />
          ))}
          {tags?.length > 1 && (
            <Chip
              classes={{ root: classes.tag }}
              onClick={() => setIsShowFullTags(false)}
              label={<HighlightAltOutlinedIcon />}
              sx={{ m: '3px', '.MuiChip-label': { px: '6px' } }}
            />
          )}
        </>
      )
    }

    return (
      <>
        <Chip
          title={getOptionLabel(last(tags))}
          label={getOptionLabel(last(tags))}
          deleteIcon={
            <Box sx={{ display: 'flex' }}>
              <Icon name="close" sx={{ width: '8px', height: '8px' }} />
            </Box>
          }
          {...getTagProps({ index: tags?.length - 1 })}
          sx={{ maxWidth: '50% !important' }}
        />

        {tags?.length > 1 && (
          <Tooltip
            arrow
            placement="top"
            title={
              <ul className={classes.tooltipList}>
                {tags.slice(0, -1)?.map((tag, i) => (
                  <li key={i}>
                    <Typography fontSize={12}>{getOptionLabel(tag)}</Typography>
                  </li>
                ))}
              </ul>
            }
            PopperProps={{
              sx: {
                '.MuiTooltip-tooltip': {
                  p: 0,
                },
              },
            }}
          >
            <Chip
              classes={{ root: classes.tag }}
              label={`+${tags?.length - 1}`}
              onClick={() => {
                setIsShowFullTags(true)
                setInputValue('')
              }}
            />
          </Tooltip>
        )}
      </>
    )
  }

  return (
    <MuiAutocomplete
      classes={{
        root: multiple ? classes.rootMultiple : classes.root,
        tag: classes.tag,
        listbox: classes.listbox,
        ...(isAsync
          ? { popupIndicatorOpen: classes.popupIndicatorOpenSearch }
          : {}),
        paper: classes.paper,
      }}
      multiple={multiple}
      renderTags={renderTags}
      loading={loading}
      loadingText={loadingText || t('autocomplete.loadingText')}
      getOptionLabel={(opt) => getOptionLabel(opt) || ''}
      renderOption={(p, opt, { selected }) =>
        renderCustomizedOption(
          {
            ...p,
            key: p?.key + p?.['data-option-index'],
          },
          opt,
          selected,
        )
      }
      {...(options?.length > 50 && !props.groupBy
        ? {
            ListboxComponent: VirtualList,
          }
        : {})}
      // eslint-disable-next-line no-unused-vars
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
          {...(isAsync
            ? {
                onChange: (e) => {
                  setInputValue(e.target.value)

                  if (!e.target.value) {
                    setIsSearchingMode(false)
                  }
                },
              }
            : {})}
        />
      )}
      {...props}
      {...(multiple
        ? {
            disableCloseOnSelect: true,
          }
        : {})}
      {...(isAsync
        ? {
            value,
            options: getDisplayedAsyncOptions(),
            filterOptions: (opts) => opts,
            isOptionEqualToValue: isOptEqual,
            popupIcon: <ManageSearch sx={{ color: 'rgba(51, 51, 51, 0.4)' }} />,
            noOptionsText: inputValue ? (
              noOptionsText || t('autocomplete.noOptionsText')
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
                {t('autocomplete.hint')}
              </Box>
            ),
            ...(multiple
              ? {
                  // async multiple
                  onChange: (_, newVal, reason) => {
                    onChange(newVal)
                    if (
                      reason === 'clear' ||
                      (reason === 'removeOption' && !newVal?.length)
                    ) {
                      setInputValue('')
                      setIsSearchingMode(false)
                    }
                  },
                  onClose: () => {
                    setInputValue('')
                    setIsSearchingMode(false)
                  },
                }
              : {
                  // async single
                  onChange: (_, newVal, reason) => {
                    onChange(newVal)

                    if (reason === 'clear') {
                      setInputValue('')
                      setIsSearchingMode(false)
                    }
                  },
                  onClose: (_, reason) => {
                    if (
                      reason === 'blur' ||
                      reason === 'escape' ||
                      reason === 'toggleInput'
                    ) {
                      if (
                        !value ||
                        (value &&
                          searchedOptions.every(
                            (opt) => !isOptEqual(opt, value),
                          ))
                      ) {
                        setInputValue('')
                        setIsSearchingMode(false)
                      }
                    }
                  },
                }),
          }
        : {
            ...(uncontrolled ? {} : { value: parseValue(value, options) }),
            options,
            onChange: (_, newVal) => {
              if (multiple) {
                onChange(newVal?.map((v) => getOptionValue(v)))
              } else {
                onChange(getOptionValue(newVal))
              }
            },
            popupIcon: (
              <KeyboardArrowDownIcon sx={{ color: 'rgba(51, 51, 51, 0.4)' }} />
            ),
            noOptionsText: noOptionsText || t('autocomplete.noOptionsText'),
          })}
    />
  )
}

Autocomplete.defaultProps = {
  label: '',
  multiple: false,
  options: [],
  asyncRequest: null,
  vertical: false,
  required: false,
  error: false,
  helperText: '',
  placeholder: '',
  getOptionLabel: (opt) => opt?.label || '',
  getOptionValue: (opt) => opt,
  onChange: () => {},
  uncontrolled: false,
}

Autocomplete.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  renderOption: PropTypes.func,
  asyncRequest: PropTypes.func,
  noOptionsText: PropTypes.node,
  loadingText: PropTypes.node,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  getOptionLabel: PropTypes.func,
  getOptionSubLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  labelWidth: PropTypes.number,
  onChange: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  uncontrolled: PropTypes.bool,
}

export default Autocomplete
