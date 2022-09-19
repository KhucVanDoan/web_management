import React, { useMemo } from 'react'

import { Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'

const MaterialTable = ({ material, mode }) => {
  const { t } = useTranslation(['wmsx'])
  const isUpdate = mode === MODAL_MODE.UPDATE

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'materialCode',
        headerName: t('defineMaterialCategory.materialCode'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`material[${index}].code`}
              placeholder={t('defineMaterialCategory.materialCode')}
              inputProps={{ maxLength: 1 }}
              allow={TEXTFIELD_ALLOW.NUMERIC}
              disabled={isUpdate}
            />
          )
        },
      },
      {
        field: 'materialName',
        headerName: t('defineMaterialCategory.materialName'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`material[${index}].name`}
              placeholder={t('defineMaterialCategory.materialName')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
              }}
            />
          )
        },
      },
      {
        field: 'materialDesc',
        headerName: t('defineMaterialCategory.materialDesc'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`material[${index}].description`}
              placeholder={t('defineMaterialCategory.materialDesc')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
            />
          )
        },
      },
      isUpdate
        ? {
            field: 'status',
            headerName: t('defineMaterialCategory.status'),
            width: 180,
            renderCell: (params, index) => {
              return (
                <Field.Autocomplete
                  name={`material[${index}].status`}
                  placeholder={t('defineMaterialCategory.status')}
                  options={ACTIVE_STATUS_OPTIONS}
                  getOptionLabel={(opt) => t(opt.text)}
                  getOptionValue={(opt) => opt?.id}
                  disableClearable
                />
              )
            },
          }
        : {},
    ],
    [material],
  )

  return (
    <>
      <Typography variant="h4" mb={1}>
        {t('defineMaterialCategory.materialType')}
      </Typography>
      <DataTable
        rows={material}
        columns={columns}
        total={material?.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

MaterialTable.defaultProps = {
  material: [],
  arrayHelpers: {},
}

MaterialTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  material: PropTypes.array,
}

export default MaterialTable
