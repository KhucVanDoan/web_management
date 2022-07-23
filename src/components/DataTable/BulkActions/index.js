import React, { useState } from 'react'

import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  BULK_ACTION,
  BULK_ACTION_OPTIONS,
  NOTIFICATION_TYPE,
} from '~/common/constants'
import Dialog from '~/components/Dialog'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
// import Loading from '~/components/Loading'
import { api } from '~/services/api'
import qs from '~/utils/qs'
import addNotification from '~/utils/toast'

const BulkActions = ({ bulkActions, selected, uniqKey = 'id' }) => {
  const { t } = useTranslation()
  const [action, setAction] = useState(0)
  // const [loading, setLoading] = useState(false)

  const options = BULK_ACTION_OPTIONS.filter((opt) =>
    (bulkActions?.actions || []).includes(opt.value),
  ).map((opt) => ({ ...opt, icon: <Icon name={opt.icon} /> }))

  const isOpen = !!action
  const close = () => setAction(0)

  const ids = qs.stringify({ ids: selected.map((item) => item?.[uniqKey]) })

  const approveMultipleApi = () => {
    const uri = `/v1/${bulkActions?.apiUrl}/confirm/multiple?${ids}`
    return api.put(uri)
  }

  const rejectMultipleApi = () => {
    const uri = `/v1/${bulkActions?.apiUrl}/reject/multiple?${ids}`
    return api.put(uri)
  }

  const deleteMultipleApi = () => {
    const uri = `/v1/${bulkActions?.apiUrl}/multiple?${ids}`
    return api.delete(uri)
  }

  const executeAction = async () => {
    close()
    // setLoading(true)
    try {
      let response

      switch (action) {
        case BULK_ACTION.APPROVE:
          response = await approveMultipleApi()
          break
        case BULK_ACTION.REJECT:
          response = await rejectMultipleApi()
          break
        case BULK_ACTION.DELETE:
          response = await deleteMultipleApi()
          break
        default:
          break
      }

      if (response?.statusCode === 200) {
        addNotification(response?.message, NOTIFICATION_TYPE.SUCCESS)
      } else {
        addNotification(
          response?.message || response?.statusText,
          NOTIFICATION_TYPE.ERROR,
        )
      }

      if (typeof bulkActions?.onSuccess === 'function') {
        bulkActions?.onSuccess()
      }
    } catch (e) {
      // @TODO: yen.nguyenhai handle err
    } finally {
      // setLoading(false)
    }
  }
  return (
    <>
      <Dropdown
        icon="setting"
        title={`${t('bulkActions.actions')} (${selected.length})`}
        options={options}
        handleMenuItemClick={(option) => setAction(option.value)}
        getOptionLabel={(option) => t(option.text)}
        variant="outlined"
        color="subText"
      />

      <Dialog
        open={isOpen}
        title={t(`bulkActions.promptTitle${action}`)}
        onCancel={close}
        cancelLabel={t('general:common.no')}
        onSubmit={executeAction}
        submitLabel={t('general:common.yes')}
        noBorderBottom
        {...(action === BULK_ACTION.REJECT || action === BULK_ACTION.DELETE
          ? {
              submitProps: {
                color: 'error',
              },
            }
          : {})}
      >
        {t(`bulkActions.promptContent${action}`, { number: selected.length })}
      </Dialog>

      {/* <Loading open={loading} /> */}
    </>
  )
}

BulkActions.defaultProps = {
  bulkActions: {},
  selected: [],
}

BulkActions.propTypes = {
  bulkActions: PropTypes.shape({}),
  selected: PropTypes.array,
}

export default BulkActions
