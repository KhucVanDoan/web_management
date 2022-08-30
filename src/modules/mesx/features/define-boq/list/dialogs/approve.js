import React from 'react'

import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import { useDefineBOQ } from '~/modules/mesx/redux/hooks/useDefineBOQ'

export const DialogApprove = ({
  open,
  data,
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
  ...props
}) => {
  const { t } = useTranslation(['mesx'])
  const { actions } = useDefineBOQ()

  const submitConfirm = () => {
    actions.confirmBOQById(data?.id, onSuccess, onError)
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
      <LV
        label={t('defineBOQ.boqCode')}
        value={data?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LV
        label={t('defineBOQ.boqName')}
        value={data?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}

export default DialogApprove
