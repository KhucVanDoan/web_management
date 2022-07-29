import React, { useMemo } from 'react'

import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { ASYNC_SEARCH_LIMIT, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import DataTable from '~/components/DataTable'
import { Field } from '~/components/Formik'
import Icon from '~/components/Icon'
import {
  ROLE_ENUM,
  ROLE_ENUM_MAP,
  ROLE_ENUM_OPTIONS,
} from '~/modules/mmsx/constants'
import { getAllUserItDepartmentApi } from '~/modules/mmsx/redux/sagas/maintenance-team/get-all-user-it-department'
import { scrollToBottom } from '~/utils'

const ItemSettingTable = ({ items, mode, arrayHelpers }) => {
  const { t } = useTranslation(['mmsx'])
  const isView = mode === MODAL_MODE.DETAIL

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: '#',
        width: 80,
        renderCell: (_, index) => {
          return index + 1
        },
      },
      {
        field: 'memberName',
        headerName: t('maintenanceTeam.team.memberName'),
        width: 400,
        renderCell: (params, index) => {
          const itemIdCodeList = items.map((item) => item?.memberName?.id)
          return isView ? (
            <>{params.row.username}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].memberName`}
              placeholder={t('maintenanceTeam.team.memberName')}
              asyncRequest={(s) =>
                getAllUserItDepartmentApi({
                  keyword: s,
                  limit: ASYNC_SEARCH_LIMIT,
                })
              }
              asyncRequestHelper={(res) => res?.data}
              getOptionLabel={(opt) => opt?.username}
              getOptionDisabled={(opt) =>
                itemIdCodeList.some((id) => id === opt?.id) &&
                opt?.id !== items[index]?.memberName?.id
              }
              isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
              required
            />
          )
        },
      },
      {
        field: 'role',
        headerName: t('maintenanceTeam.team.mission'),
        width: 400,
        renderCell: (params, index) => {
          const hasLeader = items.some(
            (item) => item?.role === ROLE_ENUM.LEADER,
          )

          return isView ? (
            <>{t(ROLE_ENUM_MAP[params.row.role])}</>
          ) : (
            <Field.Autocomplete
              name={`items[${index}].role`}
              placeholder={t('maintenanceTeam.team.mission')}
              options={ROLE_ENUM_OPTIONS}
              getOptionLabel={(opt) => (opt?.text ? t(opt?.text) : '')}
              getOptionValue={(opt) => opt?.id}
              getOptionDisabled={(opt) =>
                hasLeader && opt.id === ROLE_ENUM.LEADER
              }
              required
            />
          )
        },
      },
      {
        field: 'remove',
        width: 100,
        renderCell: (_, index) => {
          return isView ? null : (
            <IconButton
              onClick={() => arrayHelpers.remove(index)}
              disabled={items?.length === 1}
              size="large"
            >
              <Icon name="remove" />
            </IconButton>
          )
        },
      },
    ],
    [items],
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
        <Typography variant="h4" mt={1} mb={1}>
          {t('maintenanceTeam.roleDetail')}
        </Typography>
        {!isView && (
          <Box mt={1}>
            <Button
              variant="outlined"
              onClick={() => {
                arrayHelpers.push({
                  memberName: null,
                  role: null,
                })
                scrollToBottom()
              }}
            >
              {t('maintenanceTeam.addMember')}
            </Button>
          </Box>
        )}
      </Box>
      <DataTable
        rows={items}
        columns={columns}
        striped={false}
        hideSetting
        hideFooter
      />
    </>
  )
}

ItemSettingTable.defaultProps = {
  items: [],
  arrayHelpers: {},
}

ItemSettingTable.propTypes = {
  arrayHelpers: PropTypes.shape(),
  items: PropTypes.array,
}

export default ItemSettingTable
