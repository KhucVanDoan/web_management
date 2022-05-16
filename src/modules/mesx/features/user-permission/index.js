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
import { useCommonManagement } from '~/modules/mesx/redux/hooks/useCommonManagement'
import useUserPermission from '~/modules/mesx/redux/hooks/useUserPermission'
import { ROUTE } from '~/modules/mesx/routes/config'

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
  const { t } = useTranslation(['mesx'])
  const [bomTree, setBomTree] = useState([])
  const [departmentId, setDepartmentId] = useState(null)
  const [userRoleId, setUserRoleId] = useState(null)
  const [permissionList, setPermissionList] = useState([])

  const { page, pageSize, setPage, setPageSize } = useQueryState()
  const {
    data: { roleDetail, isLoading },
    actions,
  } = useUserPermission()

  const {
    data: { groupPermissions, departments },
    actions: commonManagementActions,
  } = useCommonManagement()

  useEffect(() => {
    commonManagementActions.getGroupPermissions()
    commonManagementActions.getDepartmentsRole()
  }, [])

  const listRole = flatten(
    map(groupPermissions, (per) => per.permissionSetting),
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
    const total = groupPermissions.length
    const start = total ? pageSize * (page - 1) : 0
    const end = total ? Math.min(pageSize * page, total) : 0
    const pageOfItems = groupPermissions.slice(start, end)
    setBomTree(pageOfItems)
  }

  useEffect(() => {
    refreshData()
  }, [groupPermissions, page, pageSize])

  useEffect(() => {
    const newArr = listRole?.map((item) => {
      return {
        code: item.code,
        status: !!roleDetail.find(
          (role) => role.permissionSettingCode === item.code,
        ),
      }
    })
    setPermissionList(newArr)
  }, [roleDetail])

  const handleChangeCheckbox = (e, code) => {
    const newPermission = permissionList.map((permission) => {
      if (permission.code === code) {
        return {
          ...permission,
          status: e.target.checked,
        }
      }
      return { ...permission }
    })
    setPermissionList(newPermission)
  }

  const handleChangeAll = (e, permissionSetting) => {
    const permissionIdList = permissionSetting.map((item) => item.code)
    const newPermissionAll = permissionList.map((permission) => {
      if (permissionIdList.includes(permission.code)) {
        return {
          ...permission,
          status: e.target.checked,
        }
      }
      return { ...permission }
    })
    setPermissionList(newPermissionAll)
  }

  const onSubmit = (values) => {
    const convertValues = permissionList.map((item) => ({
      ...item,
      departmentId: values.departmentId,
      userRoleId: values.userRoleId,
    }))

    actions.updateUserPermission(convertValues, () => {
      const params = {
        department: departmentId,
        role: userRoleId,
      }
      actions.getUserPermissionDetails(params)
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
      field: 'permission',
      headerName: t('userPermission.permission'),
      width: 250,
      align: 'left',
      renderCell: (params) => {
        return params?.row?.name
      },
    },
    {
      field: 'status',
      headerName: t('userPermission.status'),
      width: 120,
      renderCell: (params) => {
        const { permissionSetting } = params.row
        const permission = (permissionList || [])
          .filter((item) => item.status === true)
          .map((per) => per.code)

        const isCheckAll = permissionSetting.every((item) => {
          return permission.includes(item.code)
        })
        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox
                checked={isCheckAll}
                onChange={(e) => handleChangeAll(e, permissionSetting)}
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
        const isChecked = permissionList.find(
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
          newBom.subBom = bom.permissionSetting
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
      onSearch={() => {}}
      placeholder={t('userPermission.searchPlaceholder')}
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
                      label={t('userPermission.department')}
                      placeholder={t('userPermission.department')}
                      options={departments}
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
                      options={
                        departments.find(
                          (item) => item.id === values.departmentId,
                        )?.role
                      }
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      onChange={(val) => setUserRoleId(val)}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="screen"
                      label={t('userPermission.screen')}
                      placeholder={t('userPermission.screen')}
                      options={[]}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Field.Autocomplete
                      name="system"
                      label={t('userPermission.system')}
                      placeholder={t('userPermission.system')}
                      options={[]}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      disabled
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
                  total={groupPermissions?.length}
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
