import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import { BOM_PRODUCING_STEP_STATUS_MAP, MODAL_MODE } from '~/common/constants'
import Button from '~/components/Button'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useBOM from '~/modules/mesx/redux/hooks/useBOM'
import useBomProducingStep from '~/modules/mesx/redux/hooks/useBomProducingStep'
import { ROUTE } from '~/modules/mesx/routes/config'

import ItemsSettingTable from '../form/items-setting-table'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.BOM_PRODUCING_STEP.LIST.PATH,
    title: ROUTE.BOM_PRODUCING_STEP.LIST.TITLE,
  },
  {
    route: ROUTE.BOM_PRODUCING_STEP.DETAIL.PATH,
    title: ROUTE.BOM_PRODUCING_STEP.DETAIL.TITLE,
  },
]

function BomProducingStepDetail() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { bomProducingStepDetails, isLoading },
    actions,
  } = useBomProducingStep()

  const {
    data: { BOMDetails },
    actions: bomActions,
  } = useBOM()

  useEffect(() => {
    if (id) {
      actions.getBomProducingStepDetailsById(id)
      bomActions.getBOMDetailsById(id)
    }

    return () => {
      actions.resetBomProducingStepDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.BOM_PRODUCING_STEP.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.bomProducingStepDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent={'center'}>
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12} lg={6}>
              <LV label={t('bomProducingStep.code')} value={BOMDetails?.code} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('bomProducingStep.itemCode')}
                value={BOMDetails?.item?.itemId}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV label={t('bomProducingStep.name')} value={BOMDetails?.name} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('bomProducingStep.itemName')}
                value={BOMDetails?.item?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('bomProducingStep.routingName')}
                value={BOMDetails?.routing?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('bomProducingStep.status')}
                value={t(BOM_PRODUCING_STEP_STATUS_MAP[BOMDetails?.status])}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV label={t('bomProducingStep.user')} value={''} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LV
                label={t('bomProducingStep.createDate')}
                value={BOMDetails?.createdAt}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('bomProducingStep.description')}
                placeholder={t('bomProducingStep.description')}
                multiline
                readOnly
                rows={3}
                value={BOMDetails?.description}
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
        <ItemsSettingTable
          items={bomProducingStepDetails?.materialDetails || []}
          mode={MODAL_MODE.DETAIL}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={backToList} color="grayF4">
          {t('common.close')}
        </Button>
      </Box>
    </Page>
  )
}

export default BomProducingStepDetail
