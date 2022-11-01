/* eslint-disable no-param-reassign */
import { useRef, useState, useEffect } from 'react'

import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import TruncateMarkup from 'react-truncate-markup'

import { IMPORT_SETTING } from '~/common/constants'
import { useClasses } from '~/themes'
import { isImageFile, formatFileSize } from '~/utils/file'

import Icon from '../Icon'
import style from './style'

const FileUploadDropzone = ({
  value,
  onChange,
  accept,
  dropzoneLabel,
  dropzoneIcon,
  maxNumberOfFiles,
  fileSizeLimit,
  disabled,
  ...props
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const classes = useClasses(style)
  const inputRef = useRef()
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  const multiple = maxNumberOfFiles > 1

  const isValidFileType = (f) =>
    accept.map((i) => i?.MIME_TYPE).includes(f?.type)

  const validate = (files = []) => {
    const msg = []

    if (files.length > maxNumberOfFiles) {
      setError(
        `${t('fileUpload.error.invalidNumberOfFiles')} ${maxNumberOfFiles}`,
      )
      return false
    }

    if (files.some((f) => !isValidFileType(f))) {
      msg.push(
        `${t('fileUpload.error.invalidType')} ${
          !isEmpty(accept) && accept.map((file) => file.NAME).join(', ')
        }`,
      )
    }

    if (files.some((f) => f?.size > fileSizeLimit)) {
      msg.push(
        `${t('fileUpload.error.invalidSize')} ${formatFileSize(
          fileSizeLimit,
        )}.`,
      )
    }

    if (isEmpty(msg)) {
      return true
    }

    setError(msg.join('\n').trim())
    return false
  }

  const handleReset = () => {
    setError('')
    setUploading(false)
    onChange(multiple ? [] : null)
  }

  const handleSubmit = (files) => {
    const isValid = validate(files)

    if (!isValid) return

    if (multiple) {
      onChange(files)
    } else {
      onChange(files[0])
    }
  }

  const onDropFile = (event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    handleSubmit(files)
  }

  const openFilesPicker = () => {
    if (isEmpty(value) && !disabled) inputRef?.current?.click()
  }

  const onFilesPicked = (event) => {
    const files = Array.from(event.target.files)
    handleSubmit(files)
  }

  const getColor = (prevColor) =>
    !error ? prevColor : theme.palette.error.main

  const fetchImage = async () => {
    if (!value) return
    if (typeof value === 'string') {
      const res = await fetch(value)
      const imageBlob = await res.blob()

      setImgSrc(imageBlob)
    }

    // @TODO: handle multiple files case later
  }

  useEffect(() => {
    fetchImage()
  }, [value])

  const Dropzone = () => (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      rowSpacing={4 / 3}
    >
      <Grid item>
        {dropzoneIcon ?? <Icon name="imagePlus" size="auto" />}
        <input
          type="file"
          hidden
          onChange={(e) => onFilesPicked(e)}
          ref={inputRef}
          multiple={multiple}
        />
      </Grid>
      <Grid item>
        {dropzoneLabel ?? (
          <Typography>
            {t('fileUpload.drag')}{' '}
            <Typography
              color={theme.palette.primary.main}
              variant="h5"
              component="span"
            >
              {t('fileUpload.selectFile')}
            </Typography>
          </Typography>
        )}

        <Typography>
          {t('fileUpload.accept')}{' '}
          <Typography
            color={theme.palette.primary.main}
            variant="h5"
            component="span"
          >
            {!isEmpty(accept)
              ? accept.map((file) => file.NAME).join(', ')
              : t('fileUpload.acceptAll')}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  )

  const FilePreview = ({ file }) => {
    return (
      <Box sx={{ minHeight: 138 }}>
        <Grid container columnSpacing={2}>
          <Grid item>
            <Icon
              name="paper"
              size="100%"
              fill={getColor(theme.palette.primary.main)}
            />
          </Grid>
          <Grid item flex={1}>
            <TruncateMarkup lines={1} ellipsis={() => '...'}>
              <Typography color={getColor(theme.palette.text.main)}>
                {file?.name || file?.type}
              </Typography>
            </TruncateMarkup>

            <Typography color={theme.palette.grayF4.contrastText}>
              {formatFileSize(file?.size)}
            </Typography>
          </Grid>
          {!disabled && (
            <Grid item alignSelf="center">
              <IconButton onClick={handleReset} disabled={uploading}>
                <Icon name="delete" />
              </IconButton>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 2 }}>
          {!!error && (
            <Typography
              sx={{ whiteSpace: 'pre-line' }}
              color={theme.palette.subText.main}
            >
              {error}
            </Typography>
          )}
          {uploading && (
            <Box textAlign="center">
              <CircularProgress color="primary" />
            </Box>
          )}
          {isImageFile(file) && (
            <Box textAlign="center">
              <img
                src={URL.createObjectURL(file)}
                alt={file?.name}
                className={classes.img}
              />
            </Box>
          )}
        </Box>
      </Box>
    )
  }

  if (Array.isArray(value) ? value?.length : !!value) {
    return (
      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: theme.palette.grayF5.main,
          borderRadius: 1,
          border: 1,
          borderColor: getColor(theme.palette.grayF5.main),
        }}
      >
        {Array.isArray(value) ? (
          value.map((file, idx) => (
            <FilePreview key={idx} file={imgSrc?.[idx] || file} />
          ))
        ) : (
          <FilePreview file={imgSrc || value} />
        )}
      </Box>
    )
  }

  if (!value && disabled) {
    return (
      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: theme.palette.grayF5.main,
          borderRadius: 1,
          border: 1,
          borderColor: getColor(theme.palette.grayF5.main),
        }}
      >
        <Grid
          container
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          rowSpacing={4 / 3}
        >
          <Grid item>
            {dropzoneIcon ?? <Icon name="imagePlus" size="auto" />}
          </Grid>
          <Grid item>
            <Typography variant="body2">{t('fileUpload.noData')}</Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box
      onClick={openFilesPicker}
      onDrop={onDropFile}
      onDragEnter={(event) => {
        event.currentTarget.style.border = `1px dashed ${theme.palette.primary.main}`
      }}
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDragLeave={(event) => {
        event.currentTarget.style.border = ''
      }}
      {...props}
      sx={{
        mt: 3,
        p: 2,
        bgcolor: theme.palette.grayF5.main,
        borderRadius: 1,
        border: 1,
        borderColor: getColor(theme.palette.grayF5.main),
        cursor: 'pointer',
        '&:hover': {
          border: `1px dashed ${theme.palette.primary.main}`,
        },
      }}
    >
      <Box sx={{ pointerEvents: 'none' }}>
        <Dropzone />
      </Box>
    </Box>
  )
}

FileUploadDropzone.defaultProps = {
  onChange: () => {},
  accept: [],
  dropzoneLabel: null,
  dropzoneIcon: null,
  maxNumberOfFiles: 1, // default: 1; unlimited: -1
  fileSizeLimit: IMPORT_SETTING.FILE_SIZE_LIMIT,
  disabled: false,
}

FileUploadDropzone.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    ),
  ]),
  onChange: PropTypes.func,
  accept: PropTypes.array,
  dropzoneLabel: PropTypes.node,
  dropzoneIcon: PropTypes.element,
  maxNumberOfFiles: PropTypes.number,
  fileSizeLimit: PropTypes.number,
  disabled: PropTypes.bool,
}

export default FileUploadDropzone
