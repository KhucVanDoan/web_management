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
import Status from '~/components/Status'
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
          return isView ? (
            <>{material?.[0].code}</>
          ) : (
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
          return isView ? (
            <>{mainGroups.find((m) => m?.id === params.row?.parentId)?.code}</>
          ) : (
            <Field.Autocomplete
              name={`subGroups[${index}].mainCode`}
              placeholder={t('defineMaterialCategory.mainGroupCode')}
              options={mainGroups?.filter((main) => main.code !== '')}
              getOptionLabel={(opt) => opt?.code || null}
              getOptionValue={(opt) => opt?.code || null}
              disabled={subGroups[index].parentId}
            />
          )
        },
      },
      {
        field: 'subGroupCode',
        headerName: t('defineMaterialCategory.subGroupCode'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row?.code}</>
          ) : (
            <Field.TextField
              name={`subGroups[${index}].code`}
              placeholder={t('defineMaterialCategory.subGroupCode')}
              inputProps={{ maxLength: 2 }}
              allow={TEXTFIELD_ALLOW.NUMERIC}
              disabled={subGroups[index].parentId}
            />
          )
        },
      },
      {
        field: 'subGroupName',
        headerName: t('defineMaterialCategory.subGroupName'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row?.name}</>
          ) : (
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
          return isView ? (
            <>{params.row?.description}</>
          ) : (
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
              const status = Number(params.row?.status)
              return isView ? (
                <Status
                  options={ACTIVE_STATUS_OPTIONS}
                  value={status}
                  variant="text"
                />
              ) : (
                <Field.Autocomplete
                  name={`subGroups[${index}].status`}
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
      {
        field: 'action',
        width: 80,
        align: 'center',
        hide: isView,
        renderCell: (params, index) => {
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(index)
              }}
              disabled={subGroups?.length === 1 || subGroups[index].parentId}
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
                mainCode: '',
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
