import React, { useEffect } from 'react'

import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  BLOCK_ITEM_LOCATION_TYPE,
  BLOCK_ITEM_LOCATION_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useBlockItemLocation from '~/modules/wmsx/redux/hooks/useBlockItemLocation'
import { ROUTE } from '~/modules/wmsx/routes/config'

import LockItemTable from '../../form/lock-item-setting-table'
const LockItemDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const mode = MODAL_MODE.DETAIL
  const breadcrumbs = [
    {
      title: ROUTE.WAREHOUSE_REPORT_MANAGEMENT.TITLE,
    },
    {
      route: ROUTE.LOCK_ITEM_LOCATION.LIST.PATH,
      title: ROUTE.LOCK_ITEM_LOCATION.LIST.TITLE,
    },
    {
      title: ROUTE.LOCK_ITEM_LOCATION.DETAIL_ITEM.TITLE,
      route: ROUTE.LOCK_ITEM_LOCATION.DETAIL_ITEM.PATH,
    },
  ]
  const {
    data: { blockItemDetail },
    actions,
  } = useBlockItemLocation()
  useEffect(() => {
    actions.getBlockItemDetailById(id)
    return () => actions.resetStateBlockItemLocation()
  }, [id])

  let itemData = []
  const objectItem = {
    id: 0,
    itemId: blockItemDetail?.itemId,
    quantity: blockItemDetail?.quantity,
    lotNumber: blockItemDetail?.lotNumber,
    mfg: blockItemDetail?.mfg,
    warehouseId: blockItemDetail?.warehouseId,
    packageId: blockItemDetail?.packageId,
  }
  itemData.push(objectItem)
  const backToList = () => {
    history.push(ROUTE.LOCK_ITEM_LOCATION.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.lockItemLocationDetail')}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LabelValue
                label={t('blockItemLocation.status')}
                value={
                  <Status
                    options={BLOCK_ITEM_LOCATION_STATUS_OPTIONS}
                    value={blockItemDetail?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <RadioGroup
                value={BLOCK_ITEM_LOCATION_TYPE.ITEM}
                name="radio-buttons-group"
              >
                <Box sx={{ display: 'flex' }}>
                  <FormControlLabel
                    value={BLOCK_ITEM_LOCATION_TYPE.ITEM}
                    control={<Radio />}
                    label={t('blockItemLocation.blockItem')}
                    disabled={true}
                  />
                  <FormControlLabel
                    value={BLOCK_ITEM_LOCATION_TYPE.LOCATION}
                    control={<Radio />}
                    label={t('blockItemLocation.blockLocation')}
                    sx={{ ml: 2 }}
                    disabled={true}
                  />
                </Box>
              </RadioGroup>
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextField
                name="description"
                label={t('blockItemLocation.description')}
                multiline
                rows={3}
                value={''}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <LockItemTable mode={mode} lockItems={itemData} />
      </Box>
      <ActionBar onBack={backToList} />
    </Page>
  )
}
export default LockItemDetail
