import React, { useEffect, useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
import { CHECK_TYPE, CHECK_TYPE_OPTIONS } from '~/modules/qmsx/constants'
import useCommonManagement from '~/modules/qmsx/redux/hooks/useCommonManagement'
import { scrollToBottom } from '~/utils'

const CheckListDetailTable = (props) => {
  const { items, arrayHelpers, setFieldValue } = props
  const { t } = useTranslation(['qmsx'])

  const {
    appStore: { itemUnits },
    actions: appStoreActions,
  } = useAppStore()

  const {
    data: { errorGroupList },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    appStoreActions.getAppStore()
    commonManagementActions.getAllErrorGroup()
  }, [])

  const getColumns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 50,
        align: 'center',
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'title',
        headerName: t('defineCheckList.headerDetailTable.title'),
        width: 180,
        align: 'center',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`checkListDetails[${index}].title`}
              placeholder={t('defineCheckList.headerDetailTable.title')}
            />
          )
        },
      },
      {
        field: 'descriptionContent',
        headerName: t('defineCheckList.headerDetailTable.content'),
        width: 180,
        align: 'center',
        renderCell: (params, index) => {
          return (
            <Field.TextField
              name={`checkListDetails[${index}].descriptionContent`}
              placeholder={t('defineCheckList.headerDetailTable.content')}
            />
          )
        },
      },
      {
        field: 'checkType',
        headerName: t('defineCheckList.headerDetailTable.typeOfTest'),
        width: 150,
        align: 'center',
        renderCell: (params, index) => {
          return (
            <Field.Autocomplete
              name={`checkListDetails[${index}].checkType`}
              placeholder={t('defineCheckList.headerDetailTable.typeOfTest')}
              options={CHECK_TYPE || []}
              getOptionValue={(opt) => opt?.value}
              getOptionLabel={(opt) => t(opt?.text) || ''}
              onChange={(value) => {
                if (value === CHECK_TYPE_OPTIONS.PASS_PAIL) {
                  setFieldValue(`checkListDetails[${index}].norm`, null)
                  setFieldValue(`checkListDetails[${index}].itemUnitId`, null)
                  setFieldValue(`checkListDetails[${index}].valueBottom`, null)
                  setFieldValue(`checkListDetails[${index}].valueTop`, null)
                }
              }}
            />
          )
        },
      },
      {
        field: 'norm',
        headerName: t('defineCheckList.headerDetailTable.norm'),
        width: 100,
        align: 'center',
        renderCell: (params, index) => {
          const { checkType } = params?.row
          const checkValid = checkType === CHECK_TYPE_OPTIONS.PASS_PAIL
          return (
            <Field.TextField
              name={`checkListDetails[${index}].norm`}
              placeholder={
                !checkValid && t('defineCheckList.headerDetailTable.norm')
              }
              disabled={checkValid}
              type="number"
            />
          )
        },
      },
      {
        field: 'unit',
        headerName: t('defineCheckList.headerDetailTable.unit'),
        width: 150,
        align: 'center',
        renderCell: (params, index) => {
          const { checkType } = params?.row
          const checkValid = checkType === CHECK_TYPE_OPTIONS.PASS_PAIL
          return (
            <Field.Autocomplete
              name={`checkListDetails[${index}].itemUnitId`}
              placeholder={
                !checkValid && t('defineCheckList.headerDetailTable.unit')
              }
              disabled={checkValid}
              options={itemUnits || []}
              getOptionValue={(opt) => opt?.id}
              getOptionLabel={(opt) => opt?.name || ''}
            />
          )
        },
      },
      {
        field: 'valueBottom',
        headerName: t('defineCheckList.headerDetailTable.lowerBound'),
        width: 150,
        align: 'center',
        renderCell: (params, index) => {
          const { checkType } = params?.row
          const checkValid = checkType === CHECK_TYPE_OPTIONS.PASS_PAIL
          return (
            <Field.TextField
              name={`checkListDetails[${index}].valueBottom`}
              placeholder={
                !checkValid && t('defineCheckList.headerDetailTable.lowerBound')
              }
              type="number"
              disabled={checkValid}
            />
          )
        },
      },
      {
        field: 'valueTop',
        headerName: t('defineCheckList.headerDetailTable.upperBound'),
        width: 150,
        align: 'center',
        renderCell: (params, index) => {
          const { checkType } = params?.row
          const checkValid = checkType === CHECK_TYPE_OPTIONS.PASS_PAIL
          return (
            <Field.TextField
              name={`checkListDetails[${index}].valueTop`}
              placeholder={
                !checkValid && t('defineCheckList.headerDetailTable.upperBound')
              }
              type="number"
              disabled={checkValid}
            />
          )
        },
      },
      {
        field: 'typeError',
        headerName: t('defineCheckList.headerDetailTable.typeError'),
        width: 180,
        align: 'center',
        renderCell: (params, index) => {
          const listErrorGroupId = items.map((item) => item.errorGroupId)
          return (
            <Field.Autocomplete
              name={`checkListDetails[${index}].errorGroupId`}
              placeholder={t('defineCheckList.headerDetailTable.typeError')}
              options={errorGroupList || []}
              getOptionValue={(opt) => opt?.id}
              getOptionLabel={(opt) => opt?.name || ''}
              getOptionDisabled={(opt) =>
                listErrorGroupId.some((i) => i === opt?.id)
              }
            />
          )
        },
      },
      {
        field: 'remove',
        headerName: '',
        width: 50,
        align: 'center',
        renderCell: (params) => {
          const idx = items.findIndex((item) => item.id === params?.row?.id)
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
    [items, itemUnits, errorGroupList],
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
        <Typography variant="h4" component="span">
          {t('defineCheckList.tableDetailTitle')}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            arrayHelpers.push({
              id: undefined,
              title: '',
              descriptionContent: '',
              checkType: null,
              norm: null,
              itemUnitId: null,
              valueBottom: null,
              valueTop: null,
              errorGroupId: null,
            })
            scrollToBottom()
          }}
        >
          {t('defineCheckList.btnAddTitle')}
        </Button>
      </Box>
      <DataTable
        rows={items}
        columns={getColumns}
        total={items.length}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

export default CheckListDetailTable