import React, { useMemo, useState } from 'react'

import { Grid, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Form, Formik } from 'formik'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import Dialog from '~/components/Dialog'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { DATA_TYPE, DATA_TYPE_OPTIONS } from '~/modules/wmsx/constants'
import { scrollToBottom } from '~/utils'

import { defineFieldSchema } from '../schema'

const ItemSettingTable = ({ items, arrayHelpers, mode }) => {
  const { t } = useTranslation(['wmsx'])
  const isView = mode === MODAL_MODE.DETAIL
  const [isOpenModal, setIsOpenModal] = useState(false)

  const columns = useMemo(
    () => [
      {
        field: 'fieldName',
        headerName: t('businessTypeManagement.items.fieldName'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`items[${index}].fieldName`}
              options={[]}
              getOptionLabel={(opt) => opt?.name}
              required
            />
          )
        },
      },
      {
        field: 'type',
        headerName: t('businessTypeManagement.items.type'),
        width: 250,
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`items[${index}].type`}
              options={[]}
              getOptionLabel={(opt) => opt?.name}
              getOptionSubLabel={(opt) => opt?.code}
              required
            />
          )
        },
      },
      {
        field: 'isShow',
        headerName: t('businessTypeManagement.items.show'),
        width: 250,
        renderCell: (params, index) => {
          return <Field.Checkbox name={`items[${index}].show`} />
        },
      },
      {
        field: 'required',
        headerName: t('businessTypeManagement.items.required'),
        width: 250,
        renderCell: (params, index) => {
          return <Field.Checkbox name={`items[${index}].required`} />
        },
      },
      {
        field: 'action',
        width: 100,
        align: 'center',
        visible: 'always',
        sticky: 'right',

        renderCell: (params) => {
          const idx = items.findIndex((item) => item.id === params.row.id)
          return (
            <IconButton
              onClick={() => {
                arrayHelpers.remove(idx)
              }}
              disabled={items?.length === 1}
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items],
  )

  const onSubmit = (values) => {
    arrayHelpers.push({
      id: '',
      fieldName: values?.fieldName,
      code: '',
      type: values?.type,
      columnName: '',
      tableName: '',
      required: true,
      show: true,
    })
    setIsOpenModal(false)
    scrollToBottom()
  }

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
        <Typography variant="h4" component="span">
          {t('businessTypeManagement.items.suppliesList')}
        </Typography>

        {!isView && (
          <Button variant="outlined" onClick={() => setIsOpenModal(true)}>
            {t('businessTypeManagement.items.addSupplies')}
          </Button>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
      <Dialog
        open={isOpenModal}
        maxWidth={'xs'}
        title={t('businessTypeManagement.addButton')}
        onCancel={() => setIsOpenModal(false)}
        noBorderBottom
      >
        <Formik
          initialValues={{
            type: '',
            list: '',
            fieldName: '',
          }}
          validationSchema={defineFieldSchema(t)}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form>
              <Grid container rowSpacing={4 / 3}>
                <Grid item xs={12}>
                  <Field.Autocomplete
                    name="type"
                    label={t('businessTypeManagement.items.type')}
                    placeholder={t('businessTypeManagement.items.type')}
                    options={DATA_TYPE_OPTIONS}
                    getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                    getOptionValue={(opt) => opt?.id?.toString()}
                    labelWidth={100}
                    required
                  />
                </Grid>
                {+values?.type === DATA_TYPE.LIST && (
                  <Grid item xs={12}>
                    <Field.Autocomplete
                      name="list"
                      label={t('businessTypeManagement.items.list')}
                      placeholder={t(
                        'businessTypeManagement.items.contruction',
                      )}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id?.toString()}
                      labelWidth={100}
                      required
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  {+values?.type === DATA_TYPE.LIST ? (
                    <Field.Autocomplete
                      name="fieldName"
                      label={t('businessTypeManagement.items.fieldName')}
                      placeholder={t(
                        'businessTypeManagement.items.contructionName',
                      )}
                      options={[]}
                      getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
                      getOptionValue={(opt) => opt?.id}
                      labelWidth={100}
                      required
                    />
                  ) : (
                    <Field.TextField
                      name="fieldName"
                      label={t('businessTypeManagement.items.fieldName')}
                      placeholder={t('businessTypeManagement.items.fieldName')}
                      labelWidth={100}
                      required
                    />
                  )}
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 / 3 }}>
                <Button type="submit">{t('general.create')}</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  arrayHelpers: {},
  mode: '',
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
  mode: PropTypes.string,
}

export default ItemSettingTable
