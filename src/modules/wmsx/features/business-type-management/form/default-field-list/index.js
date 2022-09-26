import React, { useMemo } from 'react'

import { Checkbox } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import {
  PARENT_BUSINESS_TYPE,
  TYPE_DATA_FATHER_JOB_OPTIONS,
} from '~/modules/wmsx/constants'

const DefaultFieldList = ({ itemDefault, mode, setFieldValue, values }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const handleChangeRequired = (val, index) => {
    if (+values?.parentBusiness === PARENT_BUSINESS_TYPE.IMPORT) {
      if (val === true) {
        setFieldValue(`itemDefault[${index}].show`, true)
      }
      if (val === true && index === 0) {
        setFieldValue(`itemDefault[1].show`, false)
        setFieldValue(`itemDefault[2].show`, false)
        setFieldValue(`itemDefault[1].required`, false)
        setFieldValue(`itemDefault[2].required`, false)
      }
      if (val === true && index === 1) {
        setFieldValue(`itemDefault[0].show`, false)
        setFieldValue(`itemDefault[2].show`, true)
        setFieldValue(`itemDefault[0].required`, false)
      }
      if (val === true && index === 2) {
        setFieldValue(`itemDefault[0].show`, false)
        setFieldValue(`itemDefault[1].show`, true)
        setFieldValue(`itemDefault[0].required`, false)
      }
    } else if (+values?.parentBusiness === PARENT_BUSINESS_TYPE.EXPORT) {
      if (val === true) {
        setFieldValue(`itemDefault[${index}].show`, true)
      }
      if (val === true && index === 0) {
        setFieldValue(`itemDefault[1].show`, false)
        setFieldValue(`itemDefault[1].required`, false)
      }
      if (val === true && index === 1) {
        setFieldValue(`itemDefault[0].show`, false)
        setFieldValue(`itemDefault[0].required`, false)
      }
    }
  }
  const handleChangeShow = (val, index) => {
    if (+values?.parentBusiness === PARENT_BUSINESS_TYPE.IMPORT) {
      if (val === true && index === 0) {
        setFieldValue(`itemDefault[1].show`, false)
        setFieldValue(`itemDefault[2].show`, false)
        setFieldValue(`itemDefault[1].required`, false)
        setFieldValue(`itemDefault[2].required`, false)
      }
      if (val === true && index === 1) {
        setFieldValue(`itemDefault[0].show`, false)
        setFieldValue(`itemDefault[2].show`, true)
        setFieldValue(`itemDefault[0].required`, false)
      }
      if (val === true && index === 2) {
        setFieldValue(`itemDefault[0].show`, false)
        setFieldValue(`itemDefault[1].show`, true)
        setFieldValue(`itemDefault[0].required`, false)
      }
    } else if (+values?.parentBusiness === PARENT_BUSINESS_TYPE.EXPORT) {
      if (val === true && index === 0) {
        setFieldValue(`itemDefault[1].show`, false)
        setFieldValue(`itemDefault[1].required`, false)
      }
      if (val === true && index === 1) {
        setFieldValue(`itemDefault[0].show`, false)
        setFieldValue(`itemDefault[0].required`, false)
      }
    }
  }
  const columns = useMemo(
    () => [
      {
        field: 'labelEBS',
        headerName: t('businessTypeManagement.items.labelEBS'),
        width: 250,
        renderCell: (params) => {
          return params?.row?.labelEBS
        },
      },
      {
        field: 'fieldName',
        headerName: t('businessTypeManagement.items.fieldName'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.fieldName
          ) : (
            <Field.TextField
              name={`itemDefault[${index}].fieldName`}
              value={t(`${params?.row?.fieldName}`)}
              disabled
            />
          )
        },
      },
      {
        field: 'type',
        headerName: t('businessTypeManagement.items.type'),
        width: 250,
        renderCell: (params, index) => {
          const type = TYPE_DATA_FATHER_JOB_OPTIONS.find(
            (e) => e?.code === params?.row?.code,
          )
          return isView ? (
            t(`${type?.name}`)
          ) : (
            <Field.TextField
              name={`itemDefault[${index}].type`}
              value={t(`${params?.row?.type}`) || t(`${type?.name}`)}
              required
              disabled
            />
          )
        },
      },
      {
        field: 'isShow',
        headerName: t('businessTypeManagement.items.show'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox checked={params?.row?.isShow} name="show" disabled />
          ) : (
            <Field.Checkbox
              name={`itemDefault[${index}].show`}
              onChange={(val) => handleChangeShow(val, index)}
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'required',
        headerName: t('businessTypeManagement.items.required'),
        width: 250,
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox
              checked={params?.row?.required}
              name="required"
              disabled
            />
          ) : (
            <Field.Checkbox
              name={`itemDefault[${index}].required`}
              onChange={(val) => handleChangeRequired(val, index)}
              disabled={isView}
            />
          )
        },
      },
    ],
    [itemDefault],
  )
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      ></Box>
      <DataTable
        rows={itemDefault}
        columns={columns}
        total={itemDefault.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default DefaultFieldList
