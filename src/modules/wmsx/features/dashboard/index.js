import React from 'react'

import { useTranslation } from 'react-i18next'

import Page from '~/components/Page'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    route: ROUTE.DASHBOARD.PATH,
    title: ROUTE.DASHBOARD.TITLE,
  },
]
function Dashboard() {
  const { t } = useTranslation(['wmsx'])

  return (
    <Page
      title={t('dashboard.title')}
      breadcrumbs={breadcrumbs}
      freeSolo
    ></Page>
  )
}

export default Dashboard
