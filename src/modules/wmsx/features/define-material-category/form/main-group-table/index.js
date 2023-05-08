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

const MainGroupTable = ({ mainGroups, material, arrayHelpers, mode }) => {
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
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row?.code}</>
          ) : (
            <Field.TextField
              name={`mainGroups[${index}].code`}
              placeholder={t('defineMaterialCategory.mainGroupCode')}
              inputProps={{ maxLength: 2 }}
              allow={TEXTFIELD_ALLOW.NUMERIC}
              disabled={mainGroups[index].parentId}
            />
          )
        },
      },
      {
        field: 'mainGroupName',
        headerName: t('defineMaterialCategory.mainGroupName'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row?.name}</>
          ) : (
            <Field.TextField
              name={`mainGroups[${index}].name`}
              placeholder={t('defineMaterialCategory.mainGroupName')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
              }}
            />
          )
        },
      },
      {
        field: 'mainGroupDesc',
        headerName: t('defineMaterialCategory.mainGroupDesc'),
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row?.description}</>
          ) : (
            <Field.TextField
              name={`mainGroups[${index}].description`}
              placeholder={t('defineMaterialCategory.mainGroupDesc')}
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
                  name={`mainGroups[${index}].status`}
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
        sticky: 'right',
        resizable: false,
        renderCell: (params, index) => {
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(index)
              }}
              disabled={mainGroups?.length === 1 || mainGroups[index].parentId}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [mainGroups],
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
          {t('defineMaterialCategory.mainGroup')}
        </Typography>
        {!isView && (
          <Button
            variant="outlined"
            onClick={() => {
              arrayHelpers.push({
                code: '',
                name: '',
                level: 1,
              })
              scrollToBottom()
            }}
          >
            {t('defineMaterialCategory.addMainGroup')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={mainGroups}
        columns={columns}
        total={mainGroups?.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

MainGroupTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  mainGroups: PropTypes.array,
}

export default MainGroupTable
