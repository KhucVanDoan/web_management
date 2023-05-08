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
import {
  DATA_TYPE,
  DATA_TYPE_OPTIONS,
  TABLE_NAME_ENUM,
} from '~/modules/wmsx/constants'

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
            <Field.TextField
              name={`itemOption[${index}].labelEBS`}
              placeholder={t(
                'businessTypeManagement.items.placeholderLabelEBS',
              )}
              required
            />
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
            <Field.TextField
              name={`itemOption[${index}].fieldName`}
              placeholder={t(
                'businessTypeManagement.items.placeholderFieldName',
              )}
              required
            />
          )
        },
      },
      {
        field: 'type',
        headerName: t('businessTypeManagement.items.type'),
        width: 200,
        renderCell: (params, index) => {
          const type = () => {
            switch (params?.row?.type) {
              case DATA_TYPE.TEXT:
                return DATA_TYPE_OPTIONS.find(
                  (item) => item?.id === DATA_TYPE.TEXT,
                )?.text
              case DATA_TYPE.DATE:
                return DATA_TYPE_OPTIONS.find(
                  (item) => item?.id === DATA_TYPE.DATE,
                )?.text
              case DATA_TYPE.NUMBER:
                return DATA_TYPE_OPTIONS.find(
                  (item) => item?.id === DATA_TYPE.NUMBER,
                )?.text
              case DATA_TYPE.LIST:
                switch (params?.row?.tableName) {
                  case TABLE_NAME_ENUM.DEPARTMENT_RECEIPT:
                    return DATA_TYPE_OPTIONS.find(
                      (item) =>
                        item?.tableName === TABLE_NAME_ENUM.DEPARTMENT_RECEIPT,
                    )?.text
                  case TABLE_NAME_ENUM.VENDOR:
                    return DATA_TYPE_OPTIONS.find(
                      (item) => item?.tableName === TABLE_NAME_ENUM.VENDOR,
                    )?.text
                  case TABLE_NAME_ENUM.COST_TYPE:
                    return DATA_TYPE_OPTIONS.find(
                      (item) => item?.tableName === TABLE_NAME_ENUM.COST_TYPE,
                    )?.text
                  case TABLE_NAME_ENUM.ORGANIZATION_PAYMENT:
                    return DATA_TYPE_OPTIONS.find(
                      (item) =>
                        item?.tableName ===
                        TABLE_NAME_ENUM.ORGANIZATION_PAYMENT,
                    )?.text
                  default:
                    return
                }
              default:
                break
            }
          }
          return isView ? (
            t(`${type()}`)
          ) : (
            <Field.Autocomplete
              name={`itemOption[${index}].type`}
              options={DATA_TYPE_OPTIONS}
              placeholder={t('businessTypeManagement.items.placeholderType')}
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
      itemOption?.length > 1 && {
        field: 'action',
        width: 100,
        align: 'center',
        sticky: 'right',
        resizable: false,
        renderCell: (params, idx) => {
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
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
                labelEBS: '',
                fieldName: '',
                code: '',
                type: '',
                columnName: '',
                tableName: '',
                required: false,
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
