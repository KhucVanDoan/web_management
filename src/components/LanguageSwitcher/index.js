import React from 'react'

import { useTranslation } from 'react-i18next'

import enFlag from '~/assets/images/flags/EN.png'
import jpFlag from '~/assets/images/flags/JP.png'
import viFlag from '~/assets/images/flags/VI.png'
import { LANG_OPTIONS } from '~/common/constants'
import Dropdown from '~/components/Dropdown'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const currentLang = i18n.language

  const flags = {
    [LANG_OPTIONS.VI]: viFlag,
    [LANG_OPTIONS.EN]: enFlag,
    [LANG_OPTIONS.JP]: jpFlag,
  }

  const options = Object.values(LANG_OPTIONS).map((item) => ({
    label: item.toUpperCase(),
    value: item,
    selected: item === currentLang,
    icon: (
      <img
        src={flags[item]}
        alt=""
        style={{
          width: 24,
          height: 16,
          borderRadius: 2,
          border: '1px solid #ccc',
        }}
      />
    ),
  }))
  return (
    <Dropdown
      options={options}
      color="grayEE"
      title={currentLang}
      startIcon={
        <img
          src={flags[currentLang]}
          alt=""
          style={{
            width: 24,
            height: 16,
            borderRadius: 2,
          }}
        />
      }
      handleMenuItemClick={(opt) => {
        i18n.changeLanguage(opt.value)
        window.localStorage.setItem('language', opt.value)
        window.location.reload()
      }}
      sx={{
        minWidth: 80,
        height: 40,
        pl: 1.5,
        pr: 1,
        textTransform: 'uppercase',
        justifyContent: 'flex-start',
      }}
    />
  )
}

export default LanguageSwitcher
