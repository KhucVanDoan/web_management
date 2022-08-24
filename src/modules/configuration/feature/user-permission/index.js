import React, { useEffect, useState } from 'react'

import { Grid, Checkbox, FormControlLabel, Box } from '@mui/material'
import { Formik, Form } from 'formik'
import { flatten, map } from 'lodash'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import { useQueryState } from '~/common/hooks'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import TableCollapse from '~/components/TableCollapse'
import useDepartmentList from '~/modules/configuration/redux/hooks/useDepartmentList'
import useRoleList from '~/modules/configuration/redux/hooks/useRoleList'
import useUserPermission from '~/modules/configuration/redux/hooks/useUserPermission'
import { ROUTE } from '~/modules/configuration/routes/config'

const breadcrumbs = [
  {
    title: 'decentralization',
  },
  {
    route: ROUTE.USER_PERMISSION.PATH,
    title: ROUTE.USER_PERMISSION.TITLE,
  },
]

function UserPermission() {
  const { t } = useTranslation(['configuration'])
  const [bomTree, setBomTree] = useState([])
  const [departmentId, setDepartmentId] = useState(null)
  const [userRoleId, setUserRoleId] = useState(null)
  const [permissionList, setPermissionList] = useState([])

  const { page, pageSize, setPage, setPageSize } = useQueryState()
  const {
    data: { permissionDetails, isLoading, total },
    actions,
  } = useUserPermission()

  const {
    data: { departmentList },
    actions: departmentActs,
  } = useDepartmentList()

  const {
    data: { roleList },
    actions: roleActs,
  } = useRoleList()

  useEffect(() => {
    departmentActs.searchDepartmentList()
    roleActs.searchRoleList()
  }, [])

  const listRole = flatten(
    map(permissionDetails?.groupPermissions, (per) => per.permissionSettings),
  )

  const initialValues = {
    departmentId: null,
    userRoleId: null,
  }

  useEffect(() => {
    if (userRoleId) {
      const params = {
        department: departmentId,
        role: userRoleId,
      }
      actions.getUserPermissionDetails(params)

      return () => {
        actions.resetUserPermissionDetailsState()
      }
    }
  }, [departmentId, userRoleId])

  const refreshData = () => {
    const total = permissionDetails?.groupPermissions?.length
    const start = total ? pageSize * (page - 1) : 0
    const end = total ? Math.min(pageSize * page, total) : 0
    const pageOfItems = permissionDetails?.groupPermissions?.slice(start, end)
    setBomTree(pageOfItems)
  }

  useEffect(() => {
    refreshData()
  }, [permissionDetails, page, pageSize])

  useEffect(() => {
    setPermissionList(listRole)
  }, [permissionDetails])

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

  const onSubmit = (values) => {
    const convertValues = {
      departmentId: values.departmentId,
      roleId: values.userRoleId,
      permissions: permissionList,
    }
    actions.updateUserPermission(convertValues, () => {
      window.location.reload()
    })
  }

  const renderActionBar = (handleReset) => {
    return (
      <ActionBar
        onBack={() => {}} // @TODO: <anh.nth> check onBack
        onCancel={handleReset}
        mode={MODAL_MODE.UPDATE}
      />
    )
  }

  const columns = [
    {
      field: 'id',
      headerName: t('userPermission.id'),
      width: 80,
    },
    {
      field: 'feature',
      headerName: t('userPermission.feature'),
      width: 250,
      align: 'left',
      renderCell: (params) => {
        return params?.row?.name
      },
    },
    {
      field: 'assign',
      headerName: t('userPermission.assign'),
      width: 120,
      renderCell: (params) => {
        const { permissionSettings } = params.row
        const permission = (permissionList || [])
          .filter((item) => item.status === 1)
          .map((per) => per.code)

        const isCheckAll = permissionSettings.every((item) => {
          return permission.includes(item.code)
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

  const additionColums = [
    {
      field: 'permissionSetting',
      width: 350,
      renderCell: (params) => {
        return params?.row?.name
      },
    },
    {
      field: 'status',
      width: 110,
      renderCell: (params) => {
        const { code } = params.row
        const isChecked = permissionList?.find(
          (item) => item.code === code,
        )?.status

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

  const handleGetData = (id) => {
    const newBomTree = bomTree.map((bom) => {
      if (bom?.id === id) {
        const newBom = { ...bom }
        if (!bom.subBom) {
          newBom.subBom = bom.permissionSettings
        }
        return newBom
      } else {
        return bom
      }
    })
    setBomTree(newBomTree)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.userPermission')}
      loading={isLoading}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset, values }) => (
          <Form>
            <Grid container justifyContent="center" sx={{ mb: 3 }}>
              <Grid item xl={11} xs={12}>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 4, xs: 4 }}
                >
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="departmentId"
                      label={t('userPermission.departmentName')}
                      placeholder={t('userPermission.departmentName')}
                      options={departmentList}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      onChange={(val) => setDepartmentId(val)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="userRoleId"
                      label={t('userPermission.role')}
                      placeholder={t('userPermission.role')}
                      options={roleList}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      onChange={(val) => setUserRoleId(val)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {values.userRoleId && (
              <Box>
                <TableCollapse
                  rows={bomTree}
                  columns={columns}
                  additionColums={additionColums}
                  handleGetData={handleGetData}
                  pageSize={pageSize}
                  page={page}
                  isRoot={true}
                  isView={true}
                  type={'list'}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                  total={total}
                  hideSetting
                />
              </Box>
            )}
            {renderActionBar(handleReset)}
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default UserPermission
