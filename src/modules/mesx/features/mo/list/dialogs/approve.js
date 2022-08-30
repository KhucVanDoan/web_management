import React from 'react'

import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'

export const DialogApprove = ({
  open,
  data,
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
  ...props
}) => {
  const { t } = useTranslation(['mesx'])
  const { actions } = useMo()

  const submitConfirm = () => {
    actions.confirmMOById(data?.id, onSuccess, onError)
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
      {...props}
    >
      {t('general:common.confirmMessage.confirm')}
      <LV label={t('Mo.moCode')} value={data?.code} sx={{ mt: 4 / 3 }} />
      <LV label={t('Mo.moName')} value={data?.name} sx={{ mt: 4 / 3 }} />
    </Dialog>
  )
}

export default DialogApprove
