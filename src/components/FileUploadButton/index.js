import { Box, IconButton, Chip } from '@mui/material'
import { useTheme } from '@mui/styles'
import PropTypes from 'prop-types'

import { IMPORT_SETTING } from '~/common/constants'

import Icon from '../Icon'

const FileUploadButton = ({
  value,
  onChange,
  accept,
  maxNumberOfFiles,
  disabled,
  readOnly,
}) => {
  const theme = useTheme()

  const multiple = maxNumberOfFiles > 1

  const onFilesPicked = (event) => {
    const pickedFiles = Array.from(event.target.files)
    const newFiles = (value || [])
      .concat(pickedFiles)
      .slice(0, maxNumberOfFiles)
    if (multiple) {
      onChange(newFiles)
    } else {
      onChange(pickedFiles[0])
    }
  }

  const handleDelete = (index) => {
    if (multiple) {
      let newFiles = [...(value || [])]
      newFiles.splice(index, 1)

      onChange(newFiles)
    } else {
      onChange({})
    }
  }

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const renderFile = (file = {}, index) => {
    return (
      <Chip
        key={index}
        label={file.fileNameRaw || file.name}
        {...(file.fileUrl
          ? {
              onClick: () => openInNewTab(file.fileUrl),
            }
          : {})}
        {...(readOnly
          ? {}
          : {
              onDelete: () => handleDelete(index),
              deleteIcon: <Icon name="close" size={10} />,
            })}
        sx={{
          borderRadius: '3px',
          backgroundColor: theme.palette.grayF4.main,
          color: theme.palette.primary.main,
          maxWidth: '100%',

          '.MuiChip-label': {
            flex: 1,
          },
          '.MuiChip-deleteIcon': {
            flex: '0 0 10px',
          },
        }}
      />
    )
  }

  const renderFileList = () => {
    if (Array.isArray(value)) {
      if (value.length) {
        return value.map((file, index) => renderFile(file, index))
      }
      return null
    }

    if (!!value) return renderFile(value)

    return null
  }

  const renderIcon = () => {
    if (readOnly) {
      return null
    }

    return (
      <Box sx={{ flex: '0 0 36px', mr: 0.5 }}>
        <IconButton
          component="label"
          disabled={disabled || (multiple && value.length >= maxNumberOfFiles)}
        >
          <Icon name="upload" fill={theme.palette.primary.main} />
          <input
            hidden
            multiple={multiple}
            type="file"
            accept={accept}
            onChange={(e) => onFilesPicked(e)}
          />
        </IconButton>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {renderIcon()}

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap',
          gap: 0.5,
          overflow: 'hidden',
          pt: '2px',
        }}
      >
        {renderFileList()}
      </Box>
    </Box>
  )
}

FileUploadButton.defaultProps = {
  onChange: () => {},
  accept: 'application/pdf, image/jpeg, image/png',
  maxNumberOfFiles: 1, // default: 1
  fileSizeLimit: IMPORT_SETTING.FILE_SIZE_LIMIT,
  disabled: false,
  readOnly: false,
}

FileUploadButton.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  onChange: PropTypes.func,
  accept: PropTypes.string,
  maxNumberOfFiles: PropTypes.number,
  fileSizeLimit: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
}

export default FileUploadButton
