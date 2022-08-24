import React from 'react'

import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import useRequestBuyMaterial from '~/modules/mesx/redux/hooks/useRequestBuyMaterial'

export const DialogApprove = ({
  open,
  data,
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
  ...props
}) => {
  const { t } = useTranslation(['mesx'])
  const { actions } = useRequestBuyMaterial()

  const submitConfirm = () => {
    actions.confirmRequestBuyMaterialById(data?.id, onSuccess, onError)
    onClose()
  }

  return (
    <Dialog
      open={open}
      title={t('requestBuyMaterial.confirmTitle')}
      onCancel={onClose}
      cancelLabel={t('general:common.no')}
      onSubmit={submitConfirm}
      submitLabel={t('general:common.yes')}
      noBorderBottom
      {...props}
    >
      {t('requestBuyMaterial.confirmBody')}
      <LV
        label={t('requestBuyMaterial.requestCode')}
        value={data?.code}
        sx={{ mt: 4 / 3 }}
      />
      <LV
        label={t('requestBuyMaterial.requestName')}
        value={data?.name}
        sx={{ mt: 4 / 3 }}
      />
    </Dialog>
  )
}

export default DialogApprove
