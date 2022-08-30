import React from 'react'

import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import useProducingStep from '~/modules/mesx/redux/hooks/useProducingStep'

export const DialogApprove = ({
  open,
  data,
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
  ...props
}) => {
  const { t } = useTranslation(['mesx'])
  const { actions } = useProducingStep()

  const submitConfirm = () => {
    actions.confirmProducingStep(data?.id, onSuccess, onError)
    onClose()
  }

  return (
    <Dialog
      open={open}
      title={t('producingStep.confirmTitle')}
      onCancel={onClose}
      cancelLabel={t('general:common.no')}
      onSubmit={submitConfirm}
      submitLabel={t('general:common.yes')}
      noBorderBottom
      {...props}
    >
      {t('producingStep.confirmBody')}
      <LV
        label={t('producingStep.code')}
        value={data?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LV
        label={t('producingStep.name')}
        value={data?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}

export default DialogApprove
