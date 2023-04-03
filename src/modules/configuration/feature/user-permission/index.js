import React, { useEffect, useMemo, useState } from 'react'

import { Grid, Checkbox, FormControlLabel, Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { flatten, map } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import DataTableCollapse from '~/components/DataTableCollapse'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import useUserPermission from '~/modules/configuration/redux/hooks/useUserPermission'
import { searchManagamentUnitApi } from '~/modules/wmsx/redux/sagas/management-unit/search'
import { searchRoleListApi } from '~/modules/wmsx/redux/sagas/role-list/search-role-list'
import { ROUTE } from '~/modules/wmsx/routes/config'

import { filterSchema } from './schema'

const breadcrumbs = [
  {
    title: 'setting',
  },
  {
    route: ROUTE.USER_PERMISSION.PATH,
    title: ROUTE.USER_PERMISSION.TITLE,
  },
]

function UserPermission() {
  const { t } = useTranslation(['configuration'])
  const [departmentId, setDepartmentId] = useState(null)
  const [userRoleId, setUserRoleId] = useState(null)
  const [permissionList, setPermissionList] = useState([])

  const { page, pageSize, setPage, setPageSize } = useQueryState()
  const {
    data: { permissionDetails, isLoading, total },
    actions,
  } = useUserPermission()

  useEffect(() => {
    if (departmentId && userRoleId) {
      actions.getUserPermissionDetails({
        department: departmentId,
        role: userRoleId,
      })

      return () => {
        actions.resetUserPermissionDetailsState()
      }
    } else {
      setPermissionList([])
    }
  }, [departmentId, userRoleId])

  const pageData = useMemo(() => {
    const group = permissionDetails?.groupPermissions || []
    const total = group.length || 0
    const start = total ? pageSize * (page - 1) : 0
    const end = total ? Math.min(pageSize * page, total) : 0

    return group.slice(start, end)
  }, [permissionDetails?.groupPermissions, page, pageSize])

  const flattenPermissions = useMemo(
    () =>
      flatten(
        map(
          permissionDetails?.groupPermissions,
          (per) => per.permissionSettings,
        ),
      ),
    [permissionDetails?.groupPermissions],
  )

  useEffect(() => {
    setPermissionList(flattenPermissions)
  }, [flattenPermissions])

  const handleChangeCheckbox = (e, code) => {
    const newPermission = permissionList.map((permission) => {
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

  const handleChangeAll = (e, permissionSettings) => {
    const permissionIdList = permissionSettings.map((item) => item.code)
    const newPermissionAll = permissionList.map((permission) => {
      if (permissionIdList.includes(permission.code)) {
        return {
          ...permission,
          status: e.target.checked ? 1 : 0,
        }
      }
      return { ...permission }
    })
    setPermissionList(newPermissionAll)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const params = {
      departmentId,
      roleId: userRoleId,
      permissions: permissionList,
    }
    actions.updateUserPermission(params, () => {
      actions.getUserPermissionDetails({
        department: departmentId,
        role: userRoleId,
      })
    })
  }

  const renderActionBar = () => {
    return (
      <ActionBar
        onCancel={() => setPermissionList(flattenPermissions)}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  const columns = [
    {
      field: 'feature',
      headerName: t('userPermission.feature'),
      align: 'left',
      renderCell: (params) => {
        return params?.row?.name
      },
    },
    {
      field: 'assign',
      headerName: t('userPermission.assign'),
      width: 150,
      renderCell: (params) => {
        const { permissionSettings } = params.row
        const checkedPermissions = (permissionList || [])
          .filter((item) => item.status === 1)
          .map((per) => per.code)

        const isCheckAll = permissionSettings.every((item) => {
          return checkedPermissions.includes(item.code)
        })
        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox
                checked={isCheckAll}
                onChange={(e) => handleChangeAll(e, permissionSettings)}
                name="statusAll"
              />
            }
          />
        )
      },
    },
  ]

  const subColumns = [
    {
      field: 'permissionSetting',
      renderCell: (params) => {
        return params?.row?.name
      },
    },
    {
      field: 'status',
      width: 150,
      renderCell: (params) => {
        const { code } = params.row
        const isChecked = permissionList?.some(
          (item) => item?.code === code && !!item?.status,
        )

        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox
                onChange={(e) => handleChangeCheckbox(e, code)}
                checked={isChecked}
                name="status"
              />
            }
          />
        )
      },
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.userPermission')}
      loading={isLoading}
    >
      <Formik
        initialValues={{
          department: null,
          userRole: null,
        }}
        validationSchema={filterSchema(t)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <Grid container justifyContent="center">
            <Grid item xl={11} xs={12}>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 4, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="department"
                    label={t('userPermission.departmentName')}
                    placeholder={t('userPermission.departmentName')}
                    asyncRequest={(s) =>
                      searchManagamentUnitApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(opt) => opt?.name}
                    onChange={(val) => setDepartmentId(val?.id)}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Field.Autocomplete
                    name="userRole"
                    label={t('userPermission.role')}
                    placeholder={t('userPermission.role')}
                    asyncRequest={(s) =>
                      searchRoleListApi({
                        keyword: s,
                        limit: ASYNC_SEARCH_LIMIT,
                      })
                    }
                    asyncRequestHelper={(res) => res?.data?.items}
                    getOptionLabel={(opt) => opt?.name}
                    onChange={(val) => setUserRoleId(val?.id)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Formik>

      {departmentId && userRoleId && (
        <form
          onSubmit={onSubmit}
          key={`${departmentId}_${userRoleId}`}
          style={{ marginTop: 40 }}
        >
          <Box>
            <DataTableCollapse
              rows={pageData}
              columns={columns}
              subColumns={subColumns}
              subDataKey="permissionSettings"
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              hideSetting
            />
          </Box>

          {renderActionBar()}
        </form>
      )}
    </Page>
  )
}

export default UserPermission
