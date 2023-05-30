import React, { useCallback, useMemo, useState } from 'react'

import { Box, FormControlLabel, Radio, Switch } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import { TEXTFIELD_ALLOW } from '~/common/constants'
import { useTable } from '~/common/hooks/useTable'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import { Field, FastField } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useClasses } from '~/themes'

import DataTable from '..'
import { validationSchema } from './schema'
import style from './style'

const DialogContent = () => {
  const { t } = useTranslation()

  const { columns, isVisible, isTableCollapse } = useTable()
  const { values, setFieldValue } = useFormikContext()

  const getName = useCallback(
    (field) => {
      const headerName = columns.find((c) => c?.field === field)?.headerName
      if (typeof headerName === 'function') return headerName()
      return headerName
    },
    [columns],
  )

  const tableColumns = [
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 50,
    //   sticky: 'left',
    //   renderCell: (_, index) => {
    //     return index + 1
    //   },
    // },
    {
      field: 'name',
      headerName: t('dataTable.tableSetting.name'),
      width: 200,
      renderCell: ({ row }) => getName(row.field),
      sticky: 'left',
    },
    {
      field: 'aliasName',
      headerName: t('dataTable.tableSetting.aliasName'),
      width: 200,
      renderCell: ({ row }, index) => {
        const headerName = columns.find(
          (c) => c?.field === row.field,
        )?.headerName

        if (!headerName || headerName === 'function') {
          return null
        }

        return <FastField.TextField name={`items[${index}].aliasName`} />
      },
    },
    {
      field: 'minWidth',
      headerName: t('dataTable.tableSetting.minWidth'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      hide: isTableCollapse,
      renderCell: (_, index) => {
        return (
          <Field.TextField
            name={`items[${index}].minWidth`}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
            onChange={(val) => {
              if (val > values?.items?.[index]?.width) {
                setFieldValue(`items[${index}].width`, val)
              }
            }}
          />
        )
      },
    },

    {
      field: 'width',
      headerName: t('dataTable.tableSetting.width'),
      width: 100,
      align: 'right',
      headerAlign: 'left',
      hide: isTableCollapse,
      renderCell: (_, index) => {
        return (
          <Field.TextField
            name={`items[${index}].width`}
            type="number"
            allow={TEXTFIELD_ALLOW.NUMERIC}
          />
        )
      },
    },
    {
      field: 'visible',
      headerName: t('dataTable.tableSetting.visible'),
      width: 80,
      align: 'center',
      headerAlign: 'left',
      renderCell: (_, index) => {
        return (
          <FastField.Switch
            name={`items[${index}].visible`}
            checked={isVisible(values?.items?.[index])}
            color="success"
            disabled={values?.items?.[index]?.visible === 'always'}
          />
        )
      },
    },
    {
      field: 'stickyStatus',
      headerName: t('dataTable.tableSetting.sticky'),
      width: 80,
      align: 'center',
      headerAlign: 'left',
      hide: isTableCollapse,
      renderCell: (_, index) => {
        return (
          <Switch
            color="success"
            checked={['left', 'right'].includes(values?.items?.[index]?.sticky)}
            onChange={(_, val) => {
              if (val) {
                setFieldValue(`items[${index}].sticky`, 'left')
              } else {
                setFieldValue(`items[${index}].sticky`, '')
              }
            }}
          />
        )
      },
    },
    {
      field: 'stickyPosition',
      headerName: t('dataTable.tableSetting.side'),
      width: 150,
      align: 'center',
      headerAlign: 'left',
      hide: isTableCollapse,
      renderCell: (_, index) => {
        if (!values?.items?.[index]?.sticky) return null
        return (
          <Field.RadioGroup
            row
            name={`items[${index}].sticky`}
            sx={{ flexWrap: 'nowrap', justifyContent: 'center' }}
          >
            <FormControlLabel
              value="left"
              control={<Radio sx={{ p: '6px' }} />}
              label={t('dataTable.tableSetting.left')}
              sx={{ ml: '-6px', mr: 2 }}
            />
            <FormControlLabel
              value="right"
              control={<Radio sx={{ p: '6px' }} />}
              label={t('dataTable.tableSetting.right')}
            />
          </Field.RadioGroup>
        )
      },
    },
  ]

  return (
    <DataTable
      rows={values.items}
      columns={tableColumns}
      hideSetting
      hideFooter
      enableResizable={false}
    />
  )
}

const TableSetting = () => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const { initSetting, updateSetting, setting, columns, isTableCollapse } =
    useTable()

  const tableRows = useMemo(
    () =>
      setting.filter((item) => {
        const isHidden = columns.find((c) => c?.field === item.field && c?.hide)

        if (isHidden) return false
        return true
      }),
    [setting, columns],
  )

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUpdate = (items) => {
    const st = setting.map((s) => {
      const matched = items.find((item) => item.field === s.field)

      if (matched) return matched
      return s
    })

    updateSetting(st)
  }

  const renderFooter = () => {
    const { resetForm } = useFormikContext()
    return (
      <Box
        sx={{
          display: 'flex',
          gap: 4 / 3,
          width: '100%',
        }}
      >
        <Button
          variant="text"
          onClick={() => {
            handleClose()
            initSetting(true)
          }}
          sx={{ mr: 'auto', pl: '3px' }}
        >
          <Icon name="undo" size={24} sx={{ marginRight: '6px' }} />
          {t('dataTable.tableSetting.reset')}
        </Button>

        <Button color="grayF4" onClick={resetForm}>
          {t('general:common.cancel')}
        </Button>
        <Button type="submit">{t('general:common.save')}</Button>
      </Box>
    )
  }

  return (
    <Box className={classes.root}>
      <Button icon="tableSetting" color="grayEE" onClick={handleOpen} />

      <Dialog
        open={Boolean(anchorEl)}
        onCancel={handleClose}
        title={t('dataTable.tableSetting.dialogTitle')}
        maxWidth={isTableCollapse ? 'md' : 'lg'}
        formikProps={{
          validationSchema: validationSchema(t),
          initialValues: { items: tableRows },
          onSubmit: (values) => {
            handleClose()
            handleUpdate(values.items)
          },
          enableReinitialize: true,
        }}
        renderFooter={renderFooter}
      >
        <DialogContent />
      </Dialog>
    </Box>
  )
}

export default TableSetting
