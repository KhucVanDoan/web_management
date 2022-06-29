import React from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useQueryState } from '~/common/hooks'
import Button from '~/components/Button'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import { ROUTE } from '~/modules/wmsx/routes/config'

import LockLocattion from './lock-location'
import LockItem from './lock-product'

const breadcrumbs = [
  {
    title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
  },
  {
    route: ROUTE.LOCK_ITEM_LOCATION.LIST.PATH,
    title: ROUTE.LOCK_ITEM_LOCATION.LIST.TITLE,
  },
]
const LockItemLocation = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()

  const { keyword, setKeyword } = useQueryState()
  const renderHeaderRight = () => {
    return (
      <>
        <Button
          onClick={() => history.push(ROUTE.LOCK_ITEM_LOCATION.CREATE.PATH)}
          sx={{ ml: 4 / 3 }}
          icon="add"
        >
          {t('general:common.create')}
        </Button>
      </>
    )
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.lockItemLocation')}
      onSearch={setKeyword}
      placeholder={t('blockItemLocation.searchPlaceholder')}
      renderHeaderRight={renderHeaderRight}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Tabs
            list={[
              t('blockItemLocation.blockItem'),
              t('blockItemLocation.blockLocation'),
            ]}
          >
            {/* tab 1 */}
            <LockItem keyword={keyword} />
            {/* tab 2 */}

            <LockLocattion keyword={keyword} />
          </Tabs>
        </Grid>
      </Grid>
    </Page>
  )
}

export default LockItemLocation
