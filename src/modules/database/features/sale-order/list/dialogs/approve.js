import React from 'react'

import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'
import LV from '~/components/LabelValue'
import useSaleOrder from '~/modules/database/redux/hooks/useSaleOrder'

export const DialogApprove = ({
  open,
  data,
  onSuccess = () => {},
  onError = () => {},
  onClose = () => {},
  ...props
}) => {
  const { t } = useTranslation(['database'])
  const { actions } = useSaleOrder()

  const submitConfirm = () => {
    actions.confirmSaleOrderById(data?.id, onSuccess, onError)
    onClose()
  }

  return (
    <Dialog
      open={open}
      title={t('saleOrder.confirmTitle')}
      onCancel={onClose}
      cancelLabel={t('general:common.no')}
      onSubmit={submitConfirm}
      submitLabel={t('general:common.yes')}
      noBorderBottom
      {...props}
    >
      {t('saleOrder.confirmBody')}
      <LV label={t('saleOrder.code')} value={data?.code} sx={{ mt: 4 / 3 }} />
      <LV label={t('saleOrder.name')} value={data?.name} sx={{ mt: 4 / 3 }} />
    </Dialog>
  )
}

export default DialogApprove
