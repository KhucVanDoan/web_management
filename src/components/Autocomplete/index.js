import { useState, useEffect, useRef } from 'react'

import HighlightAltOutlinedIcon from '@mui/icons-material/HighlightAltOutlined'
import ManageSearch from '@mui/icons-material/ManageSearch'
import {
  Autocomplete as MuiAutocomplete,
  Box,
  ListItemButton,
  // Paper,
  Typography,
} from '@mui/material'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { isArray, isEqual, isNil, last } from 'lodash'
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
  options: rawOptions = [],
  multiple,
  renderOption,
  renderOptionMarkup,
  asyncRequest,
  asyncRequestHelper,
  // renderStickyHeader,
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
  subLabelWidth,
  subLabelLeft,
  ...props
}) => {
  const classes = useClasses(style)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(rawOptions)
  const [isShowFullTags, setIsShowFullTags] = useState(false)

  const isAsync = typeof asyncRequest === 'function'
  const hasSubLabel = typeof getOptionSubLabel === 'function'

  const { t } = useTranslation()
  const debouncedInputValue = useDebounce(inputValue, 200)
  const rawOptionsRef = useRef()

  const parseValue = (val, opts = []) => {
    if (multiple) {
      return opts.filter((opt) => {
        if (isArray(val)) {
          return val?.some((v) => isEqual(v, getOptionValue(opt)))
        }
        return false
      })
    }

    return opts.find((opt) => isEqual(getOptionValue(opt), val)) || null
  }

  const resetOptions = () => {
    if (multiple) {
      setOptions(!isNil(value) ? value : rawOptions)
    } else {
      setOptions(!isNil(value) ? [value] : rawOptions)
    }
  }

  const fetchOptions = async (keyword) => {
    if (!keyword) {
      resetOptions()
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const response = await asyncRequest(keyword)
      let opts = response

      if (response && typeof asyncRequestHelper === 'function') {
        opts = asyncRequestHelper(response)
      }

      if (Array.isArray(opts)) {
        setOptions(opts || [])
      }
    } catch (e) {
      setOptions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAsync) {
      fetchOptions(debouncedInputValue)
    }
  }, [debouncedInputValue, isAsync])

  useEffect(() => {
    if (!isEqual(rawOptionsRef.current, rawOptions)) {
      rawOptionsRef.current = rawOptions
      setOptions(rawOptions)
    }
  }, [rawOptions])

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
          ...(multiple
            ? {
                pr: '30px !important',
                position: 'relative',
              }
            : {}),
          ...(hasSubLabel
            ? {
                display: 'flex',
                alignItems: 'flex-start !important',
                ...(subLabelLeft ? { flexDirection: 'row-reverse' } : {}),
              }
            : {}),
        }}
      >
        {typeof renderOptionMarkup === 'function' ? (
          renderOptionMarkup(opt)
        ) : (
          <>
            <Typography sx={{ flex: 1 }}>{getOptionLabel(opt)}</Typography>

            {hasSubLabel && (
              <Typography
                sx={{
                  flex: 0,
                  flexBasis: subLabelWidth || '30%',
                  ...(subLabelLeft
                    ? { mr: 1, textAlign: 'left' }
                    : { ml: 1, textAlign: 'right' }),
                }}
              >
                {getOptionSubLabel(opt)}
              </Typography>
            )}
          </>
        )}

        {selected && (
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
                {tags?.map((tag, i) => (
                  <li key={i}>
                    <Typography fontSize={12}>{getOptionLabel(tag)}</Typography>
                  </li>
                ))}
              </ul>
            }
            sx={{ '.MuiTooltip-tooltip': { maxHeight: 100 } }}
          >
            <Chip
              classes={{ root: classes.tag }}
              label={`+${tags?.length - 1}`}
              onClick={() => setIsShowFullTags(true)}
            />
          </Tooltip>
        )}
      </>
    )
  }

  // const PaperComponent = ({ children, ...other }) => {
  //   const header = () => {
  //     if (renderStickyHeader) {
  //       if (typeof renderStickyHeader === 'function')
  //         return renderStickyHeader()
  //       if (typeof renderStickyHeader === 'string')
  //         return (
  //           <Typography sx={{ p: '8px 16px' }}>{renderStickyHeader}</Typography>
  //         )
  //     }
  //     return null
  //   }
  //   return (
  //     <Paper {...other}>
  //       {header()}
  //       {children}
  //     </Paper>
  //   )
  // }

  return (
    <MuiAutocomplete
      classes={{
        root: multiple ? classes.rootMultiple : classes.root,
        tag: classes.tag,
        listbox: classes.listbox,
        ...(isAsync
          ? { popupIndicatorOpen: classes.popupIndicatorOpenSearch }
          : {}),
      }}
      multiple={multiple}
      renderTags={renderTags}
      noOptionsText={noOptionsText || t('autocomplete.noOptionsText')}
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
      {...((options || []).length > 50
        ? {
            ListboxComponent: VirtualList,
          }
        : {})}
      // PaperComponent={PaperComponent}
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
                  if (isAsync && !loading) {
                    setLoading(true)
                  }
                },
              }
            : {})}
        />
      )}
      {...props}
      {...(multiple
        ? { disableCloseOnSelect: true, onOpen: () => setIsShowFullTags(false) }
        : {})}
      {...(isAsync
        ? {
            value: value,
            options,
            filterOptions: (opts) => opts,
            getOptionValue: (opt) => opt,
            onClose: () => {
              setInputValue('')
              resetOptions()
            },
            onChange: (_, newVal) => onChange(newVal),
            popupIcon: <ManageSearch />,
          }
        : {
            options: rawOptions,
            onChange: (_, newVal) => {
              if (multiple) {
                onChange(newVal?.map((v) => getOptionValue(v)))
              } else {
                onChange(getOptionValue(newVal))
              }
            },
            // popupIcon: <KeyboardArrowDownOutlinedIcon />,
            ...(!isNil(value) ? { value: parseValue(value, rawOptions) } : {}),
          })}
      {...(isShowFullTags ? { open: false } : {})}
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
  getOptionLabel: (opt) => opt?.label || '',
  getOptionValue: (opt) => opt,
  onChange: () => {},
  subLabelWidth: '30%',
  subLabelLeft: false,
}

Autocomplete.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  renderOption: PropTypes.func,
  renderOptionMarkup: PropTypes.func,
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
  getOptionSubLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  labelWidth: PropTypes.number,
  onChange: PropTypes.func,
  subLabelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subLabelLeft: PropTypes.bool,
}

export default Autocomplete
