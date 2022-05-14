import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'
import { isNil, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import useItemType from '~/modules/database/redux/hooks/useItemType'
import { MO_STATUS, MO_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useDefineMasterPlan } from '~/modules/mesx/redux/hooks/useDefineMasterPlan'
import { useMo } from '~/modules/mesx/redux/hooks/useMo'
import useRequestBuyMaterial from '~/modules/mesx/redux/hooks/useRequestBuyMaterial'
import { ROUTE } from '~/modules/mesx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import BomProducingStepTable from '../form/bom-producing-step-table'
import BomTable from '../form/bom-table'
import ItemsSettingTable from '../form/items-setting-table'
import PriceTable from '../form/price-table'

function MoDetail() {
  const history = useHistory()
  const { t } = useTranslation(['mesx'])
  const { id } = useParams()

  const [saleOrders, setSaleOrders] = useState([])
  const [isOpenCreatePO, setIsOpenCreatePO] = useState(false)
  const [isOpenEnoughMaterial, setIsOpenEnoughMaterial] = useState(false)
  const {
    data: { moDetails, BOMStructure, PriceStructure, materialCheck },
    actions,
  } = useMo()
  const {
    data: { itemTypeList },
    actions: actionsItemType,
  } = useItemType()

  const { actions: masterPlanActions } = useDefineMasterPlan()

  const {
    data: { requestBuyMaterialList },
    actions: actionRequest,
  } = useRequestBuyMaterial()

  useEffect(() => {
    actions.getMODetailsById(id)
    actions.getBOMProducingStepStructureById(id)
    actions.getPriceStructureById(id)
    actionsItemType.searchItemTypes({ isGetAll: 1 })
    masterPlanActions.getMasterPlanDetailsById(id, (data) => {
      setSaleOrders(data.saleOrderSchedules)
    })
    actionRequest.searchRequestBuyMaterials({ isGetAll: 1 })
    return () => {
      actions.resetMoDetail()
    }
  }, [id])
  const breadcrumb = [
    {
      title: 'plan',
    },
    {
      route: ROUTE.MO.LIST.PATH,
      title: ROUTE.MO.LIST.TITLE,
    },
    {
      title: ROUTE.MO.DETAIL.TITLE,
    },
  ]

  const handleCheckMaterial = () => {
    const idx = requestBuyMaterialList?.find(
      (i) => i?.manufacturingOrder?.id === Number(id),
    )?.id
    if (idx) {
      history.push(
        ROUTE.REQUEST_BUY_MATERIAL.DETAIL.PATH.replace(':id', `${idx}`),
      )
    } else {
      actions.checkMaterialPlanById(moDetails?.materialPlan?.id)
      if (materialCheck) {
        setIsOpenCreatePO(true)
      } else {
        setIsOpenEnoughMaterial(true)
      }
    }
  }

  const createRequestBuyMaterial = () => {
    const params = {
      ...materialCheck,
    }
    if (!isEmpty(params)) {
      actionRequest.createRequestBuyMaterial(params, () => {
        setIsOpenCreatePO(false)
        history.push(ROUTE.REQUEST_BUY_MATERIAL.LIST.PATH)
      })
    }
  }

  const backToList = () => {
    history.push(ROUTE.MO.LIST.PATH)
  }
  return (
    <Page
      breadcrumbs={breadcrumb}
      title={t('menu.moDetail')}
      onBack={backToList}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
            {!isNil(moDetails?.status) && (
              <Grid item xs={12}>
                <LabelValue
                  label={t('Mo.status')}
                  value={
                    <Status
                      options={MO_STATUS_OPTIONS}
                      value={moDetails?.status}
                    />
                  }
                />
              </Grid>
            )}
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('Mo.moCode')} value={moDetails?.code} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('Mo.planName')}
                value={moDetails?.masterPlan?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('Mo.moName')} value={moDetails?.name} />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('Mo.moFactory')}
                value={moDetails?.factory?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue label={t('Mo.moPlan')}>
                {convertUtcDateTimeToLocalTz(moDetails?.planFrom)} -{' '}
                {convertUtcDateTimeToLocalTz(moDetails?.planTo)}
              </LabelValue>
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('Mo.soName')}
                value={moDetails?.saleOrder?.name}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('Mo.creator')}
                value={moDetails?.createdByUser?.fullName}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LabelValue
                label={t('Mo.createAt')}
                value={convertUtcDateTimeToLocalTz(moDetails?.createdAt)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('Mo.descriptionInput')}
                multiline
                value={moDetails?.description}
                rows={3}
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
      <Box mt={2}>
        <Tabs
          list={[
            t('Mo.itemDetails'),
            t('Mo.bom'),
            t('Mo.bomProducingStep'),
            t('Mo.priceBom'),
          ]}
        >
          <ItemsSettingTable
            saleOrder={saleOrders}
            isView={true}
            moDetails={moDetails}
          />
          <BomTable BOMStructure={BOMStructure} itemTypeList={itemTypeList} />
          <BomProducingStepTable
            BOMStructure={BOMStructure}
            itemTypeList={itemTypeList}
          />
          <PriceTable
            PriceStructure={PriceStructure}
            itemTypeList={itemTypeList}
          />
        </Tabs>
      </Box>
      <ActionBar
        onBack={backToList}
        elBefore={
          moDetails?.status !== MO_STATUS.PENDING && (
            <Button
              variant="outlined"
              onClick={() => handleCheckMaterial()}
              sx={{ mr: 'auto' }}
            >
              {t('Mo.requestBuyMetarial')}
            </Button>
          )
        }
      />
      <Dialog
        open={isOpenCreatePO}
        title={t('Mo.notification')}
        onCancel={() => {
          setIsOpenCreatePO(false)
        }}
        cancelLabel={t('general:common.no')}
        onSubmit={createRequestBuyMaterial}
        submitLabel={t('general:common.yes')}
      >
        {t('Mo.createPlan')}
      </Dialog>
      <Dialog
        open={isOpenEnoughMaterial}
        title={t('Mo.notification')}
        onSubmit={() => setIsOpenEnoughMaterial(false)}
        submitLabel={t('general:modal.btnSubmit')}
      >
        {t('Mo.planFull')}
      </Dialog>
    </Page>
  )
}

export default MoDetail
