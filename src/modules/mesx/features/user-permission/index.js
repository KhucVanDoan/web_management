import React, { useEffect, useState } from 'react'

import { Grid, Checkbox, FormControlLabel } from '@mui/material'
import { Formik, Form } from 'formik'
import { useTranslation } from 'react-i18next'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import TableCollapse from '~/components/TableCollapse'
import { useAppStore } from '~/modules/auth/redux/hooks/useAppStore'
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
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const { appStore } = useAppStore()
  const [bomTree, setBomTree] = useState([])
  const [departmentId, setDepartmentId] = useState(null)
  const [userRoleId, setUserRoleId] = useState(null)
  const [permissionList, setPermissionList] = useState([])

  const {
    data: { roleDetail, isLoading },
    actions,
  } = useUserPermission()

  const initialValues = {
    departmentId: null,
    userRoleId: null,
  }

  useEffect(() => {
    if (!!userRoleId) {
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
    const groupPermissions = appStore.groupPermisions || []
    const total = groupPermissions.length
    const start = total ? pageSize * (page - 1) : 0
    const end = total ? Math.min(pageSize * page, total) : 0
    const pageOfItems = groupPermissions.slice(start, end)
    setBomTree(pageOfItems)
  }

  useEffect(() => {
    refreshData()
  }, [appStore.groupPermisions, page, pageSize])

  useEffect(() => {
    const newArr = appStore.userPermisions?.map((item) => {
      return {
        ...item,
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
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ handleReset, values }) => (
              <Form>
                <Grid
                  container
                  rowSpacing={4 / 3}
                  columnSpacing={{ xl: 4, xs: 4 }}
                >
                  <Grid item lg={3} xs={12}>
                    <Field.Autocomplete
                      name="departmentId"
                      label={t('userPermission.department')}
                      labelWidth={100}
                      placeholder={t('userPermission.department')}
                      options={appStore.deparments}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      onChange={(val) => setDepartmentId(val)}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.Autocomplete
                      name="userRoleId"
                      label={t('userPermission.role')}
                      labelWidth={100}
                      placeholder={t('userPermission.role')}
                      options={
                        appStore.deparments.find(
                          (item) => item.id === values.departmentId,
                        )?.role
                      }
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      onChange={(val) => setUserRoleId(val)}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.Autocomplete
                      name="screen"
                      label={t('userPermission.screen')}
                      labelWidth={100}
                      placeholder={t('userPermission.screen')}
                      options={[]}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      disabled
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <Field.Autocomplete
                      name="system"
                      label={t('userPermission.system')}
                      labelWidth={100}
                      placeholder={t('userPermission.system')}
                      options={[]}
                      getOptionLabel={(opt) => opt?.name}
                      getOptionValue={(opt) => opt?.id}
                      disabled
                    />
                  </Grid>
                  {values.userRoleId && (
                    <Grid item xs={12}>
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
                        total={appStore?.groupPermisions?.length}
                        hideSetting
                      />
                    </Grid>
                  )}
                </Grid>
                {renderActionBar(handleReset)}
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Page>
  )
}

export default UserPermission
