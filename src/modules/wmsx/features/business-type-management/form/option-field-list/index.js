import React, { useMemo } from 'react'

import { Checkbox, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { DATA_TYPE_OPTIONS } from '~/modules/wmsx/constants'

const ItemSettingTable = ({ itemOption, arrayHelpers, mode }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const columns = useMemo(
    () => [
      {
        field: 'labelEBS',
        headerName: t('businessTypeManagement.items.labelEBS'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.ebsLabel
          ) : (
            <Field.TextField name={`itemOption[${index}].labelEBS`} required />
          )
        },
      },
      {
        field: 'fieldName',
        headerName: t('businessTypeManagement.items.fieldName'),
        width: 200,
        renderCell: (params, index) => {
          return isView ? (
            params?.row?.fieldName
          ) : (
            <Field.TextField name={`itemOption[${index}].fieldName`} required />
          )
        },
      },
      {
        field: 'type',
        headerName: t('businessTypeManagement.items.type'),
        width: 200,
        renderCell: (params, index) => {
          const type = DATA_TYPE_OPTIONS.find(
            (e) => e?.id === params?.row?.type,
          )
          return isView ? (
            t(`${type?.text}`)
          ) : (
            <Field.Autocomplete
              name={`itemOption[${index}].type`}
              options={DATA_TYPE_OPTIONS}
              getOptionLabel={(opt) => t(`${opt?.text}`)}
              getOptionValue={(opt) => opt}
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              required
            />
          )
        },
      },
      {
        field: 'isShow',
        headerName: t('businessTypeManagement.items.show'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox checked={true} name="isShow" disabled />
          ) : (
            <Field.Checkbox
              name={`itemOption[${index}].show`}
              disabled={true}
              checked={true}
            />
          )
        },
      },
      {
        field: 'required',
        headerName: t('businessTypeManagement.items.required'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox
              checked={params?.row?.required}
              name="required"
              disabled
            />
          ) : (
            <Field.Checkbox
              name={`itemOption[${index}].required`}
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'action',
        width: 100,
        align: 'center',
        renderCell: (params) => {
          const idx = itemOption.findIndex((item) => item.id === params.row.id)
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={itemOption?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [itemOption],
  )
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 2,
        }}
      >
        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: '',
                fieldName: '',
                code: '',
                type: '',
                columnName: '',
                tableName: '',
                required: true,
                show: true,
              })
            }}
          >
            {t('businessTypeManagement.addButton')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={itemOption}
        columns={columns}
        total={itemOption.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  itemOption: [],
  arrayHelpers: {},
  mode: '',
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  itemOption: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
