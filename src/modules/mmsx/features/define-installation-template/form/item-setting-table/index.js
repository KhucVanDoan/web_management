import React, { useMemo } from 'react'

import { Checkbox, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, arrayHelpers, mode }) => {
  const { t } = useTranslation(['mmsx'])
  const isView = mode === MODAL_MODE.DETAIL
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
        field: 'title',
        width: 150,
        headerName: t('templateInstall.form.field.title'),
        align: 'center',
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.title}</>
          ) : (
            <Field.TextField
              name={`items[${index}].title`}
              placeholder={t('templateInstall.titlePlaceholer')}
            />
          )
        },
      },
      {
        field: 'description',
        width: 300,
        headerName: t('templateInstall.form.field.description'),
        align: 'center',
        renderCell: (params, index) => {
          return isView ? (
            <>{params?.row?.description}</>
          ) : (
            <Field.TextField
              name={`items[${index}].description`}
              placeholder={t('templateInstall.descriptionPlaceholer')}
            />
          )
        },
      },
      {
        field: 'isRequire',
        width: 100,
        headerName: t('templateInstall.form.field.mandatory'),
        align: 'center',
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox
              checked={params?.row?.isRequire}
              name="isProductionObject"
              disabled
            />
          ) : (
            <Field.Checkbox
              name={`items[${index}].isRequire`}
              disabled={isView}
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        renderCell: (params, index) => {
          return isView ? null : (
            <IconButton
              onClick={() => arrayHelpers.remove(index)}
              disabled={items?.length === 1}
              size="large"
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items],
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
      >
        <Typography variant="h4">
          {t('templateInstall.installListTable')}
          {!isView && (
            <Typography color="error" component="span" ml="3px">
              *
            </Typography>
          )}
        </Typography>
        {!isView && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  title: '',
                  description: '',
                  isRequire: false,
                })
                scrollToBottom()
              }}
            >
              {t('templateInstall.addRow')}
            </Button>
          </Box>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        hideSetting
        hideFooter
        total={items.length}
        striped={false}
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
}

export default ItemSettingTable
