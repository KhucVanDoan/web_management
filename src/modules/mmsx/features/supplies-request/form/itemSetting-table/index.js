import React from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { SUPPLIES_ACCESSORY_OPTION_MAP } from '~/modules/mmsx/constants'
import useSuppliesRequest from '~/modules/mmsx/redux/hooks/useSuppliesRequest'

function ItemSettingTable({ items, arrayHelpers, setFieldValue, jobCode }) {
  const { t } = useTranslation(['mmsx'])

  const {
    data: { jobList },
  } = useSuppliesRequest()

  const materialCodeList = jobList?.find((job) => job?.id === jobCode)
    ?.deviceAssignment?.sparePartDetails

  const getObjectMaterial = (id) => {
    return materialCodeList?.find((item) => item?.id === id)
  }

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 80,
      renderCell: (_, index) => {
        return index + 1
      },
    },
    {
      field: 'materialCode',
      headerName: t('suppliesRequest.form.field.materialCode'),
      width: 200,
      renderCell: (params, index) => {
        const itemIdCodeList = items.map((i) => i?.materialCode)
        return (
          <Field.Autocomplete
            name={`items[${index}].materialCode`}
            placeholder={t('suppliesRequest.form.field.materialCode')}
            options={materialCodeList}
            getOptionLabel={(opt) => opt?.code}
            getOptionValue={(opt) => opt?.id}
            onChange={(id) =>
              setFieldValue(
                `items[${index}].requireAmount`,
                getObjectMaterial(id)?.quantity,
              )
            }
            getOptionDisabled={(opt) =>
              itemIdCodeList.some(
                (id) =>
                  id === (opt?.id || opt?.itemId) &&
                  opt?.id !== items[index]?.materialCode,
              )
            }
            required
          />
        )
      },
    },
    {
      field: 'materialName',
      headerName: t('suppliesRequest.form.field.materialName'),
      width: 200,
      renderCell: (params, index) => {
        const { materialCode } = params.row
        return (
          <Field.TextField
            name={`items[${index}].materialName`}
            placeholder={t('suppliesRequest.form.field.materialName')}
            value={getObjectMaterial(materialCode)?.name}
            disabled
          />
        )
      },
    },
    {
      field: 'materialType',
      headerName: t('suppliesRequest.form.field.materialType'),
      width: 100,
      renderCell: (params, index) => {
        const { materialCode } = params.row
        return (
          <Field.TextField
            name={`items[${index}].materialType`}
            placeholder={t('suppliesRequest.form.field.materialType')}
            value={
              materialCode
                ? t(
                    `${
                      SUPPLIES_ACCESSORY_OPTION_MAP[
                        getObjectMaterial(materialCode)?.type
                      ]
                    }`,
                  )
                : null
            }
            disabled
          />
        )
      },
    },
    {
      field: 'materialUnit',
      headerName: t('suppliesRequest.form.field.materialUnit'),
      width: 150,
      renderCell: (params, index) => {
        const { materialCode } = params.row
        return (
          <Field.TextField
            name={`items[${index}].materialUnit`}
            placeholder={t('suppliesRequest.form.field.materialUnit')}
            value={getObjectMaterial(materialCode)?.unit}
            disabled
          />
        )
      },
    },
    {
      field: 'materialPrice',
      headerName: t('suppliesRequest.form.field.materialPrice'),
      width: 150,
      renderCell: (params, index) => {
        const { materialCode } = params.row
        return (
          <Field.TextField
            name={`items[${index}].materialPrice`}
            placeholder={t('suppliesRequest.form.field.materialPrice')}
            value={getObjectMaterial(materialCode)?.price}
            disabled
          />
        )
      },
    },
    {
      field: 'requireAmount',
      headerName: t('suppliesRequest.form.field.requireAmount'),
      width: 100,
      renderCell: (params, index) => {
        return (
          <Field.TextField
            name={`items[${index}].requireAmount`}
            placeholder={t('suppliesRequest.form.field.requireAmount')}
          />
        )
      },
    },

    {
      field: 'remove',
      width: 100,
      renderCell: (params, idx) => {
        return (
          <IconButton
            onClick={() => arrayHelpers.remove(idx)}
            disabled={items?.length === 1}
            size="large"
          >
            <Icon name="remove" />
          </IconButton>
        )
      },
    },
  ]

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" mt={1} mb={1}>
          {t('suppliesRequest.form.table')}
        </Typography>

        <Box mt={1}>
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                materialCode: '',
                requireAmount: '',
              })
            }}
          >
            {t('suppliesRequest.form.addRow')}
          </Button>
        </Box>
      </Box>
      <DataTable
        rows={items || []}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default ItemSettingTable
