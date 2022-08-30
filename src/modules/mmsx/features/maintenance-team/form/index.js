import React, { useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { FieldArray, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

import {
  MODAL_MODE,
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import { Field } from '~/components/Formik'
import Page from '~/components/Page'
import {
  ACTION_MAP,
  MAINTENANCE_TEAM_TYPE_OPTIONS,
} from '~/modules/mmsx/constants'
import Activities from '~/modules/mmsx/partials/Activities'
import useMaintenanceTeam from '~/modules/mmsx/redux/hooks/useMaintenanceTeam'
import { ROUTE } from '~/modules/mmsx/routes/config'

import ItemsSettingTable from './items-setting-table'
import { validateShema } from './schema'

const DEFAULT_ITEM = {
  memberName: null,
  role: null,
}

const MaintenanceTeamForm = () => {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const { id } = useParams()

  const {
    data: { maintenanceTeamDetail, isLoading },
    actions,
  } = useMaintenanceTeam()

  const MODE_MAP = {
    [ROUTE.MAINTENANCE_TEAM.CREATE.PATH]: MODAL_MODE.CREATE,
    [ROUTE.MAINTENANCE_TEAM.EDIT.PATH]: MODAL_MODE.UPDATE,
  }
  const mode = MODE_MAP[routeMatch.path]
  const isUpdate = mode === MODAL_MODE.UPDATE

  const backToList = () => {
    history.push(ROUTE.MAINTENANCE_TEAM.LIST.PATH)
  }

  const initialValues = {
    code: maintenanceTeamDetail?.code || '',
    name: maintenanceTeamDetail?.name || '',
    type: maintenanceTeamDetail?.type,
    description: maintenanceTeamDetail?.description || '',
    items: maintenanceTeamDetail?.members?.map((i) => ({
      memberName: i,
      ...i,
    })) || [{ ...DEFAULT_ITEM }],
  }

  useEffect(() => {
    if (mode === MODAL_MODE.UPDATE) {
      actions.getDetailMaintenanceTeamStart(id)
    }
    return () => {
      if (isUpdate) actions.resetMaintenanceTeam()
    }
  }, [id])

  const handleSubmit = (values) => {
    const convertValues = {
      ...values,
      id,
      members: values.items?.map((item) => ({
        userId: item.memberName?.id || item.memberName?.userId,
        role: item.role,
      })),
    }

    if (mode === MODAL_MODE.CREATE) {
      actions.createMaintenanceTeamStart(convertValues, backToList)
    } else if (mode === MODAL_MODE.UPDATE) {
      actions.updateMaintenanceTeamStart(convertValues, backToList)
    }
  }

  const getBreadcrumb = () => {
    const breadcrumb = [
      {
        title: 'database',
      },
      {
        route: ROUTE.MAINTENANCE_TEAM.LIST.PATH,
        title: ROUTE.MAINTENANCE_TEAM.LIST.TITLE,
      },
    ]

    switch (mode) {
      case MODAL_MODE.CREATE:
        breadcrumb.push({
          route: ROUTE.MAINTENANCE_TEAM.CREATE.PATH,
          title: ROUTE.MAINTENANCE_TEAM.CREATE.TITLE,
        })
        break
      case MODAL_MODE.UPDATE:
        breadcrumb.push({
          route: ROUTE.MAINTENANCE_TEAM.EDIT.PATH,
          title: ROUTE.MAINTENANCE_TEAM.EDIT.TITLE,
        })
        break
      default:
        break
    }
    return breadcrumb
  }

  const getTitle = () => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return ROUTE.MAINTENANCE_TEAM.CREATE.TITLE
      case MODAL_MODE.UPDATE:
        return ROUTE.MAINTENANCE_TEAM.EDIT.TITLE
      default:
    }
  }

  const renderActionBar = (handleReset) => {
    switch (mode) {
      case MODAL_MODE.CREATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.CREATE}
          />
        )
      case MODAL_MODE.UPDATE:
        return (
          <ActionBar
            onBack={backToList}
            onCancel={handleReset}
            mode={MODAL_MODE.UPDATE}
          />
        )
      default:
        break
    }
  }

  const histories = maintenanceTeamDetail?.histories?.map((item) => ({
    content: ACTION_MAP[item?.action]
      ? t(`maintenanceTeam.actionHistory.${ACTION_MAP[item?.action]}`)
      : '',
    createdAt: item?.createdAt,
    username: item?.username,
  }))
  return (
    <Page
      breadcrumbs={getBreadcrumb()}
      title={t(`menu.${getTitle()}`)}
      loading={isLoading}
      onBack={backToList}
      freeSolo
    >
      <Paper sx={{ p: 2 }}>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={validateShema(t)}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ handleReset, values }) => (
                <Form>
                  <Grid
                    container
                    columnSpacing={{ xl: 8, xs: 4 }}
                    rowSpacing={4 / 3}
                  >
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('maintenanceTeam.team.code')}
                        name="code"
                        placeholder={t('maintenanceTeam.team.code')}
                        disabled={mode === MODAL_MODE.UPDATE}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.CODE_7.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.ALPHANUMERIC}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.TextField
                        label={t('maintenanceTeam.team.name')}
                        name="name"
                        placeholder={t('maintenanceTeam.team.name')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        allow={TEXTFIELD_ALLOW.EXCEPT_SPECIALS}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Field.Autocomplete
                        name="type"
                        label={t('maintenanceTeam.type')}
                        placeholder={t('maintenanceTeam.type')}
                        options={MAINTENANCE_TEAM_TYPE_OPTIONS}
                        getOptionLabel={(opt) =>
                          opt?.text ? t(opt?.text) : ''
                        }
                        getOptionValue={(opt) => opt?.id}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field.TextField
                        name="description"
                        label={t('maintenanceTeam.team.description')}
                        placeholder={t('maintenanceTeam.team.description')}
                        inputProps={{
                          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
                        }}
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FieldArray
                        name="items"
                        render={(arrayHelpers) => (
                          <ItemsSettingTable
                            items={values?.items || []}
                            arrayHelpers={arrayHelpers}
                            mode={mode}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  {renderActionBar(handleReset)}
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
      {isUpdate && <Activities data={histories} />}
    </Page>
  )
}

export default MaintenanceTeamForm
