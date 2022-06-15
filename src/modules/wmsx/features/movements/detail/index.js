import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import {
  MOVEMENT_ORDER_TYPE_MAP,
  MOVEMENT_TYPE_MAP,
  ORDER_STATUS_OPTIONS,
} from '~/modules/wmsx/constants'
import useMovements from '~/modules/wmsx/redux/hooks/useMovements'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import ItemsSettingTable from './items-setting-table'

const MovementDetail = ({ breadcrumbs, onBack }) => {
  const { t } = useTranslation(['wmsx'])
  const { id } = useParams()
  const {
    data: { isLoading, movementDetail },
    actions,
  } = useMovements()

  useEffect(() => {
    actions.getMovementsDetailsById(id)
    return () => {
      actions.resetMovementsDetailsState()
    }
  }, [id])

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('movements.formTitle')}
      onBack={onBack}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('inventoryCalendar.status')}
                value={
                  <Status
                    options={ORDER_STATUS_OPTIONS}
                    value={Number(movementDetail?.status)}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementCode')}
                value={movementDetail?.id}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementType')}
                value={t(MOVEMENT_TYPE_MAP[movementDetail?.movementType])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.letterCode')}
                value={movementDetail?.order?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.letterType')}
                value={t(MOVEMENT_ORDER_TYPE_MAP[movementDetail?.movementType])}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.warehouseCode')}
                value={movementDetail?.warehouse?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.warehouseName')}
                value={movementDetail?.warehouse?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.createdUser')}
                value={movementDetail?.user?.username}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.movementDate')}
                value={convertUtcDateTimeToLocalTz(movementDetail?.createdAt)}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('movements.importExport.confirmDate')}
                value={convertUtcDateTimeToLocalTz(movementDetail?.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('movements.importExport.description')}
                multiline
                rows={3}
                value={movementDetail?.description}
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
        <ItemsSettingTable items={movementDetail?.items || []} />
      </Box>
      <ActionBar onBack={onBack} />
    </Page>
  )
}

MovementDetail.defaultProps = {
  breadcrumbs: [],
}

MovementDetail.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape()),
  onBack: PropTypes.func,
}

export default MovementDetail
