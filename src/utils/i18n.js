import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enAuth from '~/assets/locales/en/auth.json'
import enGeneral from '~/assets/locales/en/general.json'
import enMesx from '~/assets/locales/en/mesx.json'
import enMmsx from '~/assets/locales/en/mmsx.json'
import enQmsx from '~/assets/locales/en/qmsx.json'
import enWmsx from '~/assets/locales/en/wmsx.json'
import jpAuth from '~/assets/locales/jp/auth.json'
import jpGeneral from '~/assets/locales/jp/general.json'
import jpMesx from '~/assets/locales/jp/mesx.json'
import jpMmsx from '~/assets/locales/jp/mmsx.json'
import jpQmsx from '~/assets/locales/jp/qmsx.json'
import jpWmsx from '~/assets/locales/jp/wmsx.json'
import viAuth from '~/assets/locales/vi/auth.json'
import viGeneral from '~/assets/locales/vi/general.json'
import viMesx from '~/assets/locales/vi/mesx.json'
import viMmsx from '~/assets/locales/vi/mmsx.json'
import viQmsx from '~/assets/locales/vi/qmsx.json'
import viWmsx from '~/assets/locales/vi/wmsx.json'
import { DEFAULT_LANG, LANG_OPTIONS } from '~/common/constants'

const resources = {
  [LANG_OPTIONS.VI]: {
    general: viGeneral,
    auth: viAuth,
    mesx: viMesx,
    mmsx: viMmsx,
    qmsx: viQmsx,
    wmsx: viWmsx,
  },
  [LANG_OPTIONS.EN]: {
    general: enGeneral,
    auth: enAuth,
    mesx: enMesx,
    mmsx: enMmsx,
    qmsx: enQmsx,
    wmsx: enWmsx,
  },
  [LANG_OPTIONS.JP]: {
    general: jpGeneral,
    auth: jpAuth,
    mesx: jpMesx,
    mmsx: jpMmsx,
    qmsx: jpQmsx,
    wmsx: jpWmsx,
  },
}

const getCurrentLang = () => {
  let language = window.localStorage.getItem('language')

  if (Object.values(LANG_OPTIONS).every((lang) => lang !== language)) {
    window.localStorage.setItem('language', DEFAULT_LANG)
    language = DEFAULT_LANG
  }

  return language
}

i18n.use(initReactI18next).init({
  resources: resources,
  lng: getCurrentLang(),
  fallbackLng: DEFAULT_LANG,
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
