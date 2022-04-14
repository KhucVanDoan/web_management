import { useEffect, useRef, useState } from 'react'

import {
  Box,
  CircularProgress,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material'
import { isEmpty, isNil } from 'lodash'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { format } from 'react-string-format'
import TruncateMarkup from 'react-truncate-markup'

import {
  FILE_TYPE,
  IMPORT_EXPORT_MODE,
  IMPORT_EXPORT_MODE_OPTIONS,
  IMPORT_SETTING,
} from '~/common/constants'
import Dialog from '~/components/Dialog'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
import palette from '~/themes/palette'
import { formatFileSize, isValidFileType } from '~/utils/file'

import Button from '../Button'

/** @TODO:
 * Tên file đang ko truncate sau khi kéo thả
 * Nút (X) cần bị disable khi đang import
 * Tách riêng menu và import dialog
 **/

const ImportExport = ({
  onDownloadTemplate,
  onDownloadLog,
  onImport,
  onExport,
  importFile,
  setImportFile,
  mode,
  ...props
}) => {
  const { t } = useTranslation()

  const [validationError, setValidationError] = useState(null)
  const [importing, setImporting] = useState(false)
  const [open, setOpen] = useState(false)
  const [importResult, setImportResult] = useState(null)
  const [importError, setImportError] = useState(null)

  const inputFileRef = useRef()

  useEffect(() => {
    if (importResult) setOpen(false)
  }, [importResult])

  useEffect(() => {
    setImporting(false)
  }, [importError])

  const { FILE_SIZE_LIMIT, NUMBER_OF_FILE } = IMPORT_SETTING
  const { XLSX } = FILE_TYPE

  const validateFileInput = (files) => {
    const file = files[0]

    if (files.length > NUMBER_OF_FILE)
      setValidationError(
        `${t('fileUpload.error.invalidNumberOfFiles')} ${NUMBER_OF_FILE}`,
      )
    else if (files.length === NUMBER_OF_FILE) {
      const { name, size } = file

      const msg = []

      if (size <= 0 || size > FILE_SIZE_LIMIT)
        msg.push(
          `${t('fileUpload.error.invalidSize')} ${formatFileSize(
            FILE_SIZE_LIMIT,
          )}.`,
        )

      if (!isValidFileType(name, XLSX.EXT)) {
        msg.push(`${t('fileUpload.error.invalidType')} ${XLSX.NAME}.`)
      }

      setValidationError(msg.join('\n').trim())
    }
  }

  const onFileChange = (event) => {
    const files = event.target.files

    validateFileInput(files)

    return setImportFile(files[0])
  }

  const onDropFile = (event) => {
    event.preventDefault()

    const files = event.dataTransfer.files

    validateFileInput(files)

    return setImportFile(files[0])
  }

  const onSubmit = () => {
    setImporting(true)

    if (!onImport) return

    const { result, error } = onImport()

    result && setImportResult(result)
    error && setImportError(error)
  }

  const onCancel = () => {
    resetImportState()
    setOpen && setOpen(false)
  }

  const onClickDropzone = () => {
    if (!importFile) inputFileRef.current.click()
  }

  const onImportAgain = () => {
    resetImportState()
    setOpen && setOpen(true)
  }

  const resetImportState = () => {
    setImportFile(null)
    setValidationError(null)
    setImportError(null)
    setImportResult(null)
    setImporting(false)
  }

  const isSubmitDisabled = () =>
    isNil(importFile) ||
    !isEmpty(validationError) ||
    !isEmpty(importError) ||
    importing

  const getColor = (prevColor) =>
    isEmpty(validationError) && isEmpty(importError)
      ? prevColor
      : palette.error.main

  const handleMenuItemClick = (option) => {
    switch (option) {
      case IMPORT_EXPORT_MODE.IMPORT_ONLY:
        return setOpen(true)
      case IMPORT_EXPORT_MODE.EXPORT_ONLY:
        return onExport()
      default:
        return null
    }
  }

  const Dropzone = (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      rowSpacing={4 / 3}
    >
      <Grid item>
        <Icon name="importXlsx" size="auto" />
        <input
          type="file"
          hidden
          accept={FILE_TYPE.XLSX.EXT}
          onChange={onFileChange}
          ref={inputFileRef}
        />
      </Grid>
      <Grid item>
        <Typography component="div">
          {t('import.stepUploadData.description')}
        </Typography>
        <Typography component="span">
          {t('import.stepUploadData.support')}
        </Typography>
        <Typography color={palette.primary.main} variant="h5" component="span">
          {t('import.stepUploadData.fileType')}
        </Typography>
      </Grid>
    </Grid>
  )

  const FileInfo = (
    <Grid container flexDirection="column" minHeight={150}>
      <Grid item flex={1}>
        <Grid container columnSpacing={2}>
          <Grid item>
            <Icon
              name="paper"
              size="100%"
              fill={getColor(palette.primary.main)}
            />
          </Grid>
          <Grid item flex={1}>
            <TruncateMarkup lines={1} ellipsis={() => '...'}>
              <Typography color={getColor(palette.text.main)}>
                {importFile?.name}
              </Typography>
            </TruncateMarkup>

            <Typography color={palette.grayF4.contrastText}>
              {formatFileSize(importFile?.size)}
            </Typography>
          </Grid>
          <Grid item alignSelf="center">
            <Button
              variant="text"
              onClick={resetImportState}
              sx={{ p: 0, minWidth: 0 }}
              disabled={importing}
            >
              <Icon name="delete" size="auto" />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        {!isEmpty(validationError || importError) && (
          <Typography
            sx={{ whiteSpace: 'pre-line' }}
            color={palette.subText.main}
          >
            {!isEmpty(validationError) ? validationError : importError}
          </Typography>
        )}
        {importing && (
          <Box textAlign="center">
            <CircularProgress color="primary" />
          </Box>
        )}
      </Grid>
    </Grid>
  )

  const ResultDialog = (
    <Dialog
      open={!isNil(importResult)}
      title={t('import.title')}
      onCancel={onCancel}
      cancelLabel={t('actionBar.closeNotification')}
      onSubmit={onImportAgain}
      submitLabel={t('actionBar.importAgain')}
      disableBackdropClick={true}
    >
      <Box textAlign="center" p={1}>
        <Box mb={1}>
          {format(
            t('import.result'),
            <Typography
              color={palette.success.main}
              variant="h5"
              component="span"
            >
              {importResult?.success}
            </Typography>,
            <Typography
              color={palette.error.main}
              variant="h5"
              component="span"
            >
              {importResult?.fail}
            </Typography>,
          )}
        </Box>
        <MuiLink
          onClick={onDownloadLog}
          variant="h5"
          component={Link}
          underline="none"
        >
          {t('import.log')}
        </MuiLink>
      </Box>
    </Dialog>
  )

  const ImportDialog = (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth={true}
      title={t('import.title')}
      onCancel={onCancel}
      cancelLabel={t('actionBar.cancel')}
      cancelProps={{
        disabled: importing,
      }}
      onSubmit={onSubmit}
      submitLabel={t('actionBar.import')}
      submitProps={{
        disabled: isSubmitDisabled(),
      }}
      {...props}
      sx={{
        '.MuiDialogContent-root': {
          py: 0,
        },
      }}
      disableBackdropClick={true}
    >
      <Grid container columnSpacing={16 / 3} position="relative">
        <Icon
          name="collapse"
          size="auto"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
          }}
        />
        <Grid
          item
          xs={6}
          md={6}
          lg={6}
          pt={2}
          borderRight={1}
          borderColor={palette.divider}
        >
          <Typography variant="h5">
            {t('import.stepDownloadTemplate.title')}
          </Typography>
          <Button
            icon="downloadAlt"
            sx={{ my: 2, ml: 0, mr: 1 }}
            onClick={onDownloadTemplate}
          >
            {t('import.downloadTemplate')}
          </Button>
          <Typography component="span">
            {t('import.stepDownloadTemplate.description')}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} pt={2}>
          <Typography variant="h5">
            {t('import.stepUploadData.title')}
          </Typography>
          <Box
            my={3}
            py={3}
            px={5}
            bgcolor={palette.grayF5.main}
            onClick={onClickDropzone}
            minHeight={150}
            border={1}
            borderColor={getColor(palette.grayF5.main)}
            onDrop={onDropFile}
            onDragOver={(event) => event.preventDefault()}
          >
            {isNil(importFile) ? Dropzone : FileInfo}
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  )

  const render = () => {
    const res = []

    switch (mode) {
      case IMPORT_EXPORT_MODE.BOTH:
        res.push(
          <Dropdown
            icon="download"
            title={t('importExportMenu.importExport')}
            options={IMPORT_EXPORT_MODE_OPTIONS}
            handleMenuItemClick={(option) => handleMenuItemClick(option.value)}
            getOptionLabel={(option) => t(option.text) || ''}
            variant="outlined"
          />,
        )
        break
      case IMPORT_EXPORT_MODE.IMPORT_ONLY:
        res.push(
          <Button
            variant="outlined"
            icon="upload"
            onClick={() => handleMenuItemClick(mode)}
          >
            {t('importExportMenu.import')}
          </Button>,
        )
        break
      case IMPORT_EXPORT_MODE.EXPORT_ONLY:
        res.push(
          <Button
            variant="outlined"
            icon="downloadAlt"
            onClick={() => handleMenuItemClick(mode)}
          >
            {t('importExportMenu.export')}
          </Button>,
        )
        break
      default:
        return null
    }

    if (
      mode === IMPORT_EXPORT_MODE.BOTH ||
      mode === IMPORT_EXPORT_MODE.IMPORT_ONLY
    ) {
      res.push(ImportDialog)

      if (importResult) {
        res.push(ResultDialog)
      }
    }

    return res
  }

  return render()
}

ImportExport.defaultProps = {
  mode: IMPORT_EXPORT_MODE.BOTH,
}

ImportExport.propTypes = {
  onDownloadTemplate: PropTypes.func,
  onDownloadLog: PropTypes.func,
  onImport: PropTypes.func,
  onExport: PropTypes.func,
  importFile: PropTypes.shape(),
  setImportFile: PropTypes.func,
  mode: PropTypes.string,
}

export default ImportExport
