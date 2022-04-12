import i18n from 'i18next'
import { store } from 'react-notifications-component'

import { NOTIFICATION_TYPE } from '~/common/constants'

const NOTIFICATION_DURATION = 5000

/**
 * Add toast notification
 * @param {string} message
 * @param {string} type Type in NOTIFICATION_TYPE
 * @param {string} title Default is i18n.t("toast.notificationTitle")
 * @param {number} duration Duration in milliseconds
 */
const addNotification = (
  message,
  type = NOTIFICATION_TYPE.INFO,
  title = i18n.t('toast.notificationTitle'),
  duration = NOTIFICATION_DURATION,
) => {
  store.addNotification({
    title: i18n.t(title),
    message: i18n.t(message),
    type: type,
    insert: 'bottom',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeInRight'],
    animationOut: ['animate__animated', 'animate__fadeOutRight'],
    dismiss: {
      duration,
      onScreen: false,
      click: true,
      touch: true,
      showIcon: true,
    },
  })
}

export default addNotification
