import React, { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  CHECK_LIST_STATUS,
  CHECK_TYPE_OPTIONS_MAP,
} from '~/modules/qmsx/constants'
import useDefineCheckList from '~/modules/qmsx/redux/hooks/useDefineCheckList'
import { ROUTE } from '~/modules/qmsx/routes/config'

const breadcrumbs = [
  {
    title: 'qualityControl',
  },
  {
    route: ROUTE.DEFINE_CHECK_LIST.LIST.PATH,
    title: ROUTE.DEFINE_CHECK_LIST.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_CHECK_LIST.DETAIL.PATH,
    title: ROUTE.DEFINE_CHECK_LIST.DETAIL.TITLE,
  },
]

function DefineCheckListDetail() {
  const { t } = useTranslation(['qmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, checkListDetail },
    actions,
  } = useDefineCheckList()

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 50,
      sortable: false,
      renderCell: (params, index) => {
        const indexCount = index + 1
        return indexCount
      },
    },
    {
      field: 'title',
      headerName: t('defineCheckList.headerDetailTable.title'),
      width: 150,
    },
    {
      field: 'descriptionContent',
      headerName: t('defineCheckList.headerDetailTable.content'),
      width: 150,
    },
    {
      field: 'checkType',
      headerName: t('defineCheckList.headerDetailTable.typeOfTest'),
      width: 150,
      renderCell: (params) => {
        const { checkType } = params?.row
        return t(CHECK_TYPE_OPTIONS_MAP[+checkType])
      },
    },
    {
      field: 'norm',
      headerName: t('defineCheckList.headerDetailTable.norm'),
      width: 150,
    },
    {
      field: 'unit',
      headerName: t('defineCheckList.headerDetailTable.unit'),
      width: 150,
      renderCell: (params) => {
        const { itemUnit } = params?.row
        return itemUnit?.name
      },
    },
    {
      field: 'lowerBound',
      headerName: t('defineCheckList.headerDetailTable.lowerBound'),
      width: 150,
      renderCell: (params) => {
        const { valueBottom } = params?.row
        return valueBottom
      },
    },
    {
      field: 'upperBound',
      headerName: t('defineCheckList.headerDetailTable.upperBound'),
      width: 150,
      renderCell: (params) => {
        const { valueTop } = params?.row
        return valueTop
      },
    },
    {
      field: 'typeError',
      headerName: t('defineCheckList.headerDetailTable.typeError'),
      width: 150,
      renderCell: (params) => {
        const { errorGroup } = params?.row
        return errorGroup?.name
      },
    },
  ]

  useEffect(() => {
    const params = {
      id: id,
    }
    actions.getCheckListDetailById(params)
    return () => {
      actions.resetCheckListDetailState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_CHECK_LIST.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineCheckListDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid
            container
            rowSpacing={4 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ mb: 2 }}
          >
            <Grid item lg={12} xs={12}>
              <LV
                label={t('defineCheckList.status')}
                value={
                  <Status
                    options={CHECK_LIST_STATUS}
                    value={+checkListDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCheckList.code')}
                value={checkListDetail?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineCheckList.name')}
                value={checkListDetail?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineCheckList.description')}
                multiline
                rows={3}
                value={checkListDetail?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={4 / 3}
            columnSpacing={{ xl: 8, xs: 4 }}
            sx={{ my: 2 }}
          >
            {/* Table */}
            <Grid item lg={12} xs={12}>
              <Box
                sx={{
                  display: 'block',
                  mb: 2,
                }}
              >
                <Typography variant="h4" component="span">
                  {t('defineCheckList.tableDetailTitle')}
                </Typography>
              </Box>
              <DataTable
                rows={checkListDetail?.checkListDetails}
                columns={columns}
                total={checkListDetail?.checkListDetails?.length}
                striped={true}
                hideSetting
                hideFooter
              />
            </Grid>
          </Grid>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineCheckListDetail
