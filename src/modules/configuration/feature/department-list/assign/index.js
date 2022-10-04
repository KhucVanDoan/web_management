import React, { useEffect, useState } from 'react'

import { Grid, Checkbox, FormControlLabel, Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import useDepartmentList from '~/modules/configuration/redux/hooks/useDepartmentList'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.DEPARTMENT_LIST.LIST.PATH,
    title: ROUTE.DEPARTMENT_LIST.LIST.TITLE,
  },
  {
    route: ROUTE.DEPARTMENT_LIST.ASSIGN.PATH,
    title: ROUTE.DEPARTMENT_LIST.ASSIGN.TITLE,
  },
]

function DepartmentAssign() {
  const { t } = useTranslation(['configuration'])
  const history = useHistory()
  const { id } = useParams()
  const { page, pageSize, setPage, setPageSize } = useQueryState()
  const [permissionList, setPermissionList] = useState([])

  const {
    data: { departmentAssign, isLoading, total },
    actions,
  } = useDepartmentList()

  useEffect(() => {
    actions.getDepartmentAssignDetails({
      departmentId: id,
      page: page,
      limit: pageSize,
    })
    return () => {
      actions.resetDepartmentAssignDetailsState()
    }
  }, [id, page, pageSize])

  useEffect(() => {
    setPermissionList(departmentAssign?.groupPermissions)
  }, [departmentAssign?.groupPermissions])

  const handleChangeCheckbox = (e, code) => {
    const newPermission = permissionList?.map((permission) => {
      if (permission.code === code) {
        return {
          ...permission,
          status: e.target.checked ? 1 : 0,
        }
      }
      return { ...permission }
    })
    setPermissionList(newPermission)
  }

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
      field: 'featureName',
      headerName: t('departmentAssign.featureName'),
      width: 250,
      renderCell: (params) => {
        return params.row.name
      },
    },
    {
      field: 'assign',
      headerName: t('departmentAssign.assign'),
      width: 250,
      align: 'left',
      renderCell: (params) => {
        const { code } = params.row
        const isChecked = params.row.status === 1 ? true : false
        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox
                defaultChecked={isChecked}
                onChange={(e) => {
                  handleChangeCheckbox(e, code)
                }}
                name="status"
              />
            }
          />
        )
      },
    },
    {
      field: 'description',
      headerName: t('departmentAssign.description'),
      width: 150,
    },
  ]

  const onSubmit = () => {
    const convertValues = {
      id: Number(id),
      groupPermissions: permissionList,
    }
    actions.updateDepartmentAssign(convertValues, () => {
      window.location.reload()
    })
  }

  const backToList = () => {
    history.push(ROUTE.DEPARTMENT_LIST.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('departmentAssign.title')}
      onBack={backToList}
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
                    <LV
                      label={t('departmentAssign.departmentName')}
                      value={departmentAssign?.name}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box>
              <DataTable
                columns={columns}
                rows={departmentAssign?.groupPermissions}
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

export default DepartmentAssign
