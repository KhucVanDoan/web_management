import React, { useState, useEffect, useCallback, useMemo } from 'react'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ManageSearch from '@mui/icons-material/ManageSearch'
import {
  Autocomplete as MuiAutocomplete,
  Box,
  ListItemButton,
  Popper as MuiPopper,
  Paper as MuiPaper,
  Typography,
  Divider,
} from '@mui/material'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { isArray, isEqual, isNil, last, reverse, uniqWith } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { useDebounce } from '~/common/hooks'
import VirtualList from '~/components/Autocomplete/VirtualList'
import TextField from '~/components/TextField'
import { useClasses } from '~/themes'
import qs from '~/utils/qs'

import Button from '../Button'
import Icon from '../Icon'
import style from './style'

const Autocomplete = ({
  label,
  options = [],
  multiple,
  renderOption,
  asyncRequest,
  asyncRequestHelper,
  asyncRequestDeps,
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
  dropdownLarger,
  dropdownWidth,
  dropdownHeader,
  quickCreate,
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
  const refetchWhen = useDebounce(
    isNil(asyncRequestDeps) ||
      typeof asyncRequestDeps === 'string' ||
      typeof asyncRequestDeps === 'number' ||
      typeof asyncRequestDeps === 'boolean'
      ? asyncRequestDeps
      : qs.stringify(asyncRequestDeps),
    200,
  )

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
      const response = await asyncRequest(keyword.trim())
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

  const prefetchOptions = () => fetchOptionsFn('', setPersistedOptions)

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
  }, [isAsync, refetchWhen])

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

  const dropdownMinWidth = useMemo(() => {
    if (dropdownWidth) return dropdownWidth
    if (dropdownLarger || hasSubLabel) return 500
    return 0
  }, [dropdownWidth, dropdownLarger, hasSubLabel])

  const renderCustomizedOption = (optProps, opt, selected) => {
    const sx = {
      wordBreak: 'break-word',
      display: 'block !important',
      ...(multiple
        ? {
            pr: '30px !important',
            position: 'relative',
          }
        : {}),
    }

    const icon = multiple && selected && (
      <Icon
        name="check"
        size={16}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      />
    )

    if (typeof renderOption === 'function') {
      return renderOption(optProps, opt, selected, sx, icon)
    }

    return (
      <ListItemButton {...optProps} component="li" sx={sx}>
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

        {icon}
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
              label={<ArrowDropUpIcon fontSize="small" />}
              sx={{
                m: '3px',
                '.MuiChip-label': { display: 'flex', px: '6px' },
              }}
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
              <ol className={classes.tooltipList}>
                {tags.slice(0, -1)?.map((tag, i) => (
                  <li key={i}>
                    <Typography fontSize={12}>{getOptionLabel(tag)}</Typography>
                  </li>
                ))}
              </ol>
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
              sx={{
                '.MuiChip-label': { px: '6px' },
              }}
            />
          </Tooltip>
        )}
      </>
    )
  }

  const Popper = useCallback(
    (popperProps) => (
      <MuiPopper
        {...popperProps}
        placement="bottom-start"
        style={{
          ...popperProps?.style,
          minWidth: `min(${dropdownMinWidth}px, 100vw)`,
        }}
      />
    ),
    [dropdownMinWidth],
  )

  const Paper = useCallback(
    ({ children, ...paperProps }) => (
      <MuiPaper {...paperProps}>
        {dropdownHeader}
        {children}
        {typeof quickCreate === 'function' && (
          <>
            <Divider sx={{ mt: 0 }} />
            <Box sx={{ py: 1, px: 4 / 3 }}>
              <Button
                size="small"
                onMouseDown={(e) => {
                  e.stopPropagation()
                  quickCreate()
                }}
                startIcon={<BoltOutlinedIcon />}
                color="secondary"
              >
                {t('autocomplete.quickCreate')}
              </Button>
            </Box>
          </>
        )}
      </MuiPaper>
    ),
    [dropdownHeader, quickCreate],
  )

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
      {...(dropdownMinWidth ? { PopperComponent: Popper } : {})}
      {...(!!dropdownHeader || typeof quickCreate === 'function'
        ? { PaperComponent: Paper }
        : {})}
      loading={loading}
      loadingText={loadingText || t('autocomplete.loadingText')}
      noOptionsText={noOptionsText || t('autocomplete.noOptionsText')}
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
      disableCloseOnSelect={multiple ? true : false}
      {...(isAsync
        ? {
            value,
            options: getDisplayedAsyncOptions(),
            filterOptions: (opts) => opts,
            isOptionEqualToValue: (opt, val) => isOptEqual(opt, val),
            popupIcon: <ManageSearch sx={{ color: 'rgba(51, 51, 51, 0.4)' }} />,
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
                  key: JSON.stringify(value),
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
            ...(typeof isOptionEqualToValue === 'function'
              ? { isOptionEqualToValue }
              : {}),
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
  dropdownLarger: false,
  dropdownHeader: null,
}

Autocomplete.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  renderOption: PropTypes.func,
  asyncRequest: PropTypes.func,
  asyncRequestDeps: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
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
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  uncontrolled: PropTypes.bool,
  dropdownLarger: PropTypes.bool,
  dropdownWidth: PropTypes.number,
  dropdownHeader: PropTypes.node,
  quickCreate: PropTypes.func,
}

export default Autocomplete
