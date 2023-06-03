import React from 'react'

import { Redirect } from 'react-router-dom'

import { ROUTE as WMSX_ROUTE } from '~/modules/wmsx/routes/config'

const HomePage = () => {
  return <Redirect to={WMSX_ROUTE.WAREHOUSE_IMPORT_RECEIPT.PATH} />
}

export default HomePage
