import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// import en from "assets/locales/en/translation.json";

import viGenaral from 'assets/locales/vi/general.json'
import viAuth from 'assets/locales/vi/auth.json'
import viMesx from 'assets/locales/vi/mesx.json'
import viMmsx from 'assets/locales/vi/mmsx.json'
import viQmsx from 'assets/locales/vi/qmsx.json'
import viWmsx from 'assets/locales/vi/wmsx.json'

const resources = {
  vi: {
    general: viGenaral,
    auth: viAuth,
    mesx: viMesx,
    mmsx: viMmsx,
    qmsx: viQmsx,
    wmsx: viWmsx,
  },
}
i18n.use(initReactI18next).init({
  resources: resources,
  ln: 'vi',
  fallbackLng: 'vi',
  ns: ['general', 'auth', 'mesx', 'mmsx', 'qmsx', 'wmsx'],
  defaultNS: ['general'],
  interpolation: {
    escapeValue: false,
  },
  debug: false,
  react: {
    useSuspense: true,
    wait: true,
  },
})

export default i18n
