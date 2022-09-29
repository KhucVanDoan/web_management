import React, { useMemo } from 'react'

import { Checkbox } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { TYPE_DATA_FATHER_JOB_OPTIONS } from '~/modules/wmsx/constants'

const DefaultFieldList = ({ itemDefault, mode, setFieldValue }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const handleChangeRequired = (val, index) => {
    if (val) {
      setFieldValue(`itemDefault[${index}].show`, true)
    }
    // const indexOfWarehouseExport = itemDefault?.findIndex(
    //   (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.SO_EXPORT_ID,
    // )
    // const indexOfPaper = itemDefault?.findIndex(
    //   (item) =>
    //     item?.code === CODE_TYPE_DATA_FATHER_JOB.WAREHOUSE_EXPORT_PROPOSAL_ID,
    // )
    // const indexOfReciept = itemDefault?.findIndex(
    //   (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.RECEIPT_ID,
    // )
    // const indexOfWarehouseImport = itemDefault?.findIndex(
    //   (item) => item?.code === CODE_TYPE_DATA_FATHER_JOB.PO_IMPORT_ID,
    // )
    // if (+values?.parentBusiness === PARENT_BUSINESS_TYPE.IMPORT) {
    //   if (val) {
    //     setFieldValue(`itemDefault[${index}].show`, true)
    //   }
    //   if (val && index === indexOfWarehouseExport) {
    //     setFieldValue(`itemDefault[${indexOfPaper}].show`, false)
    //     setFieldValue(`itemDefault[${indexOfReciept}].show`, false)
    //     setFieldValue(`itemDefault[${indexOfPaper}].required`, false)
    //     setFieldValue(`itemDefault[${indexOfReciept}].required`, false)
    //   }
    //   if (val && index === indexOfPaper) {
    //     setFieldValue(`itemDefault[${indexOfWarehouseExport}].show`, false)
    //     setFieldValue(`itemDefault[${indexOfReciept}].show`, true)
    //     setFieldValue(`itemDefault[${indexOfWarehouseExport}].required`, false)
    //   }
    //   if (val && index === indexOfReciept) {
    //     setFieldValue(`itemDefault[${indexOfWarehouseExport}].show`, false)
    //     setFieldValue(`itemDefault[${indexOfPaper}].show`, true)
    //     setFieldValue(`itemDefault[${indexOfWarehouseExport}].required`, false)
    //   }
    // } else if (+values?.parentBusiness === PARENT_BUSINESS_TYPE.EXPORT) {
    //   if (val) {
    //     setFieldValue(`itemDefault[${index}].show`, true)
    //   }
    //   if (val && index === indexOfWarehouseImport) {
    //     setFieldValue(`itemDefault[${indexOfPaper}].show`, false)
    //     setFieldValue(`itemDefault[${indexOfPaper}].required`, false)
    //   }
    //   if (val && index === indexOfPaper) {
    //     setFieldValue(`itemDefault[${indexOfWarehouseImport}].show`, false)
    //     setFieldValue(`itemDefault[${indexOfWarehouseImport}].required`, false)
    //   }
    // }
  }
  // const handleChangeShow = (val, index) => {
  //   if (+values?.parentBusiness === PARENT_BUSINESS_TYPE.IMPORT) {
  //     if (val && index === indexOfWarehouseExport) {
  //       setFieldValue(`itemDefault[${indexOfPaper}].show`, false)
  //       setFieldValue(`itemDefault[${indexOfReciept}].show`, false)
  //       setFieldValue(`itemDefault[${indexOfPaper}].required`, false)
  //       setFieldValue(`itemDefault[${indexOfReciept}].required`, false)
  //     }
  //     if (val && index === indexOfPaper) {
  //       setFieldValue(`itemDefault[${indexOfWarehouseExport}].show`, false)
  //       setFieldValue(`itemDefault[${indexOfReciept}].show`, true)
  //       setFieldValue(`itemDefault[${indexOfWarehouseExport}].required`, false)
  //     }
  //     if (val && index === indexOfReciept) {
  //       setFieldValue(`itemDefault[${indexOfWarehouseExport}].show`, false)
  //       setFieldValue(`itemDefault[${indexOfPaper}].show`, true)
  //       setFieldValue(`itemDefault[${indexOfWarehouseExport}].required`, false)
  //     }
  //   } else if (+values?.parentBusiness === PARENT_BUSINESS_TYPE.EXPORT) {
  //     if (val && index === indexOfWarehouseImport) {
  //       setFieldValue(`itemDefault[${indexOfPaper}].show`, false)
  //       setFieldValue(`itemDefault[${indexOfPaper}].required`, false)
  //     }
  //     if (val && index === indexOfPaper) {
  //       setFieldValue(`itemDefault[${indexOfWarehouseImport}].show`, false)
  //       setFieldValue(`itemDefault[${indexOfWarehouseImport}].required`, false)
  //     }
  //   }
  // }
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
              // onChange={(val) => handleChangeShow(val, index)}
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
