import React from 'react'

import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'

export const DialogReject = ({
  open,
  data,
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
  ...props
}) => {
  const { t } = useTranslation(['mesx'])
  const { actions } = useDefineMasterPlan()

  const submitConfirm = () => {
    actions.rejectMasterPlan(data?.id, onSuccess, onError)
    onClose()
  }

  return (
    <Dialog
      open={open}
      title={t('general:common.notify')}
      onCancel={onClose}
      cancelLabel={t('general:common.no')}
      onSubmit={submitConfirm}
      submitLabel={t('general:common.yes')}
      noBorderBottom
      submitProps={{
        color: 'error',
      }}
      {...props}
    >
      {t('general:common.confirmMessage.reject')}
      <LV
        label={t('defineMasterPlan.code')}
        value={data?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LV
        label={t('defineMasterPlan.planName')}
        value={data?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}

export default DialogReject
