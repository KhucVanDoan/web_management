import React, { useMemo } from 'react'

import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE, TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {} from '~/modules/mmsx/constants'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['mmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'title',
        headerName: t('templateChecklist.form.title'),
        width: 400,
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row.title}</>
          ) : (
            <Field.TextField
              name={`items[${index}].title`}
              placeholder={t('templateChecklist.form.title')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
              required
            />
          )
        },
      },
      {
        field: 'descriptionDetail',
        headerName: t('templateChecklist.form.description'),
        width: 400,
        renderCell: (params, index) => {
          return isView ? (
            <>{params.row.descriptionDetail}</>
          ) : (
            <Field.TextField
              name={`items[${index}].descriptionDetail`}
              placeholder={t('templateChecklist.form.description')}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
              }}
              required
            />
          )
        },
      },
      {
        field: 'obligatory',
        headerName: t('templateChecklist.form.obligatory'),
        align: 'center',
        width: 150,
        renderCell: (params, index) => {
          return isView ? (
            <Checkbox disabled checked={params.row.obligatory} />
          ) : (
            <FormControlLabel
              control={<Field.Checkbox name={`items[${index}].obligatory`} />}
              label=""
            />
          )
        },
      },
      {
        field: 'remove',
        width: 100,
        renderCell: (params) => {
          const idx = items.findIndex((item) => item?.id === params.row?.id)
          return isView ? null : (
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
        <Typography variant="h4" mt={1} mb={1}>
          {t('templateChecklist.checkDetail')}
        </Typography>
        {!isView && (
          <Box mt={1}>
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  id: new Date().getTime(),
                  title: '',
                  descriptionDetail: '',
                  obligatory: false,
                })
                scrollToBottom()
              }}
            >
              {t('templateChecklist.addRow')}
            </Button>
          </Box>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
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
