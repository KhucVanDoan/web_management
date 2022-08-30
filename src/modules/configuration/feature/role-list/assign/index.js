import React, { useEffect } from 'react'

import { Grid, Checkbox, FormControlLabel, Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useRoleList from '~/modules/configuration/redux/hooks/useRoleList'
import { ROUTE } from '~/modules/configuration/routes/config'

const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.ROLE_LIST.LIST.PATH,
    title: ROUTE.ROLE_LIST.LIST.TITLE,
  },
  {
    route: ROUTE.ROLE_LIST.ASSIGN.PATH,
    title: ROUTE.ROLE_LIST.ASSIGN.TITLE,
  },
]

function RoleAssign() {
  const { t } = useTranslation(['configuration'])
  const { id } = useParams()
  const { page, pageSize, setPage, setPageSize } = useQueryState()

  const {
    data: { roleAssign, isLoading, total },
    actions,
  } = useRoleList()

  useEffect(() => {
    actions.getRoleAssignDetails(id)
    return () => {
      actions.resetRoleAssignDetailsState()
    }
  }, [id])

  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onBack={() => {}}
        onCancel={handleReset}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  const columns = [
    {
      field: 'feature',
      headerName: t('roleAssign.feature'),
      width: 250,
      renderCell: (params) => {
        return params.row.name
      },
    },
    {
      field: 'assign',
      headerName: t('roleAssign.assign'),
      width: 250,
      align: 'left',
      renderCell: (params) => {
        const isChecked = params.row.status === 1 ? true : false
        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox checked={isChecked} onChange={() => {}} name="status" />
            }
          />
        )
      },
    },
  ]

  const onSubmit = () => {}

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('roleAssign.title')}
      onSearch={() => {}}
      placeholder={t('roleAssign.searchPlaceholder')}
      loading={isLoading}
    >
      <Formik onSubmit={onSubmit} enableReinitialize>
        {({ handleReset }) => (
          <Form>
            <Grid container justifyContent="center" sx={{ mb: 3 }}>
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 4, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <LV label={t('roleAssign.departmentName')} value={''} />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <LV label={t('roleAssign.role')} value={''} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box>
              <DataTable
                columns={columns}
                rows={roleAssign}
                pageSize={pageSize}
                page={page}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                total={total}
                hideSetting
              />
            </Box>
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default RoleAssign
