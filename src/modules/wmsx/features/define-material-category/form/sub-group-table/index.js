import React, { useMemo } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import { scrollToBottom } from '~/utils'

const SubGroupTable = ({
  subGroups,
  material,
  mainGroups,
  arrayHelpers,
  mode,
}) => {
  const { t } = useTranslation(['wmsx'])
  const isUpdate = mode === MODAL_MODE.UPDATE
  const isView = mode === MODAL_MODE.DETAIL
  const isCreate = mode === MODAL_MODE.CREATE

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
              value={material[0].code}
              placeholder={t('defineMaterialCategory.materialCode')}
              disabled
            />
          )
        },
      },
      {
        field: 'mainGroupCode',
        headerName: t('defineMaterialCategory.mainGroupCode'),
        width: 200,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`subGroups[${index}].mainCode`}
              placeholder={t('defineMaterialCategory.mainGroupCode')}
              options={mainGroups?.filter((main) => main.code !== '')}
              getOptionLabel={(opt) => opt?.code || null}
              getOptionValue={(opt) => opt?.code || null}
            />
          )
        },
      },
      {
        field: 'subGroupCode',
        headerName: t('defineMaterialCategory.subGroupCode'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`subGroups[${index}].code`}
              placeholder={t('defineMaterialCategory.subGroupCode')}
              inputProps={{ maxLength: 2 }}
              allow={TEXTFIELD_ALLOW.NUMERIC}
              disabled={isUpdate}
            />
          )
        },
      },
      {
        field: 'subGroupName',
        headerName: t('defineMaterialCategory.subGroupName'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`subGroups[${index}].name`}
              placeholder={t('defineMaterialCategory.subGroupName')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
              }}
            />
          )
        },
      },
      {
        field: 'subGroupDesc',
        headerName: t('defineMaterialCategory.subGroupDesc'),
        width: 150,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`subGroups[${index}].description`}
              placeholder={t('defineMaterialCategory.subGroupDesc')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
            />
          )
        },
      },
      !isCreate
        ? {
            field: 'status',
            headerName: t('defineMaterialCategory.status'),
            width: 180,
            renderCell: (params, index) => {
              return (
                <Field.Autocomplete
                  name={`subGroups[${index}].status`}
                  placeholder={t('defineMaterialCategory.status')}
                  options={ACTIVE_STATUS_OPTIONS}
                  getOptionLabel={(opt) => t(opt.text)}
                  getOptionValue={(opt) => opt?.id.toString()}
                />
              )
            },
          }
        : {},
      {
        field: 'action',
        width: 80,
        align: 'center',
        renderCell: (params) => {
          const idx = subGroups.findIndex((item) => item.id === params.row.id)
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={subGroups?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [subGroups],
  )

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography variant="h4">
          {t('defineMaterialCategory.subGroup')}
        </Typography>
        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                id: new Date().getTime(),
                code: '',
                name: '',
                level: 2,
              })
              scrollToBottom()
            }}
          >
            {t('defineMaterialCategory.addSubGroup')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={subGroups}
        columns={columns}
        total={subGroups?.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

SubGroupTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  subGroups: PropTypes.array,
}

export default SubGroupTable
