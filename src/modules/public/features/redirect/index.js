import React from 'react'

import { Redirect, useLocation } from 'react-router-dom'

import { isAuth } from '~/utils'
import qs from '~/utils/qs'

const RedirectPage = () => {
  const location = useLocation()
  const { callbackUrl } = qs.parse(location.search)

  if (!!callbackUrl) {
    if (isAuth()) {
      return <Redirect to={callbackUrl} />
    }

    return <Redirect to={`/login?${qs.stringify({ callbackUrl })}`} />
  }

  return <Redirect to="/" />
}

export default RedirectPage
