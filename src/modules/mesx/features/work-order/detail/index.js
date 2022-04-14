import { useEffect } from 'react'

import { Grid, Typography } from '@mui/material'
import { isNil } from 'lodash'
import qs from 'query-string'
import { useTranslation } from 'react-i18next'
import { useParams, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { WORK_ORDER_STATUS_OPTIONS } from '~/modules/mesx/constants'
import { useWorkOrder } from '~/modules/mesx/redux/hooks/useWorkOrder'
import { ROUTE } from '~/modules/mesx/routes/config'
import { formatDateTimeUtc } from '~/utils'
const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MO.LIST.PATH,
    title: ROUTE.MO.LIST.TITLE,
  },
  {
    route: ROUTE.MO.WORK_ORDER.PATH,
    title: ROUTE.MO.WORK_ORDER.TITLE,
  },
  {
    title: ROUTE.MO.WORK_ORDER_DETAIL.TITLE,
    route: ROUTE.MO.WORK_ORDER_DETAIL.PATH,
  },
]
function workOrderDetail() {
  const { t } = useTranslation(['mesx'])
  const history = useHistory()
  const location = useLocation()
  const urlSearchParams = qs.parse(location.search)
  const locationId = urlSearchParams.moId
  const { id } = useParams()
  const {
    data: { workOrderDetails },
    actions,
  } = useWorkOrder()

  useEffect(() => {
    actions.getWorkOrderDetailsById(id)
    return () => actions.resetWorkOrderDetailState()
  }, [id])

  const backToList = () => {
    history.push(`${ROUTE.MO.WORK_ORDER.PATH}?moId=${locationId}`)
  }
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
        title={t('menu.workOrderDetail')}
        onBack={backToList}
      >
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
              {!isNil(workOrderDetails?.status) && (
                <Grid item xs={12}>
                  <LV
                    label={t('workOrder.status')}
                    value={
                      <Status
                        options={WORK_ORDER_STATUS_OPTIONS}
                        value={workOrderDetails?.status}
                      />
                    }
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="h4">
                  {t('workOrder.generalInfo')}
                </Typography>
              </Grid>
              <Grid item xl={6} xs={12}>
                <LV
                  label={t('workOrder.lblcodeWorkOrder')}
                  value={workOrderDetails?.code}
                />
                <LV
                  label={t('workOrder.mameCV')}
                  value={workOrderDetails?.name}
                  mt={4 / 3}
                />
                <LV label={t('workOrder.datePlan')} mt={4 / 3}>
                  {formatDateTimeUtc(workOrderDetails?.planFrom)}
                  {' - '}
                  {formatDateTimeUtc(workOrderDetails?.planTo)}
                </LV>
              </Grid>
              <Grid item xl={6} xs={12}>
                <LV
                  label={t('workOrder.planName')}
                  value={workOrderDetails?.moPlan?.name}
                />
                <LV
                  label={t('workOrder.moName')}
                  value={workOrderDetails?.mo?.name}
                  mt={4 / 3}
                />
                <LV
                  label={t('workOrder.soName')}
                  value={workOrderDetails?.so?.name}
                  mt={4 / 3}
                />
                <LV
                  label={t('workOrder.factory')}
                  value={workOrderDetails?.factory?.name}
                  mt={4 / 3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={(theme) => ({
            justifyContent: 'center',
            bgcolor: 'grayF4.main',
            borderRadius: 1,
            my: 2,
            pt: 1,
            pb: 2,

            [theme.breakpoints.down('xl')]: {
              px: 2,
            },
          })}
        >
          <Grid item xl={11} xs={12}>
            <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
              <Grid item xs={12}>
                <Typography variant="h4">
                  {t('workOrder.produceInfo')}
                </Typography>
              </Grid>
              <Grid item xl={6} xs={12}>
                <LV
                  label={t('workOrder.nameTP')}
                  value={workOrderDetails?.moDetail?.itemName}
                />
                <LV
                  label={t('workOrder.codeBom')}
                  value={workOrderDetails?.bom?.name}
                  mt={4 / 3}
                />
                <LV
                  label={t('workOrder.nameCD')}
                  value={workOrderDetails?.producingStep?.name}
                  mt={4 / 3}
                />
                <LV
                  label={t('workOrder.lblquantityPlan')}
                  value={workOrderDetails?.quantity}
                  mt={4 / 3}
                />
                <LV label={t('workOrder.planCV')} mt={4 / 3}>
                  {formatDateTimeUtc(workOrderDetails?.planFrom)}
                  {' - '}
                  {formatDateTimeUtc(workOrderDetails?.planTo)}
                </LV>
              </Grid>
              <Grid item xl={6} xs={12}>
                <LV
                  label={t('workOrder.nameBTP')}
                  value={workOrderDetails?.bom?.itemName}
                />
                <LV
                  label={t('workOrder.codeRouting')}
                  value={workOrderDetails?.routing?.code}
                  mt={4 / 3}
                />
                <LV
                  label={t('workOrder.nameWorkshop')}
                  value={workOrderDetails?.workCenters
                    ?.map((i) => i?.name)
                    ?.join(', ')}
                  mt={4 / 3}
                />
                <LV
                  label={t('workOrder.dataStart')}
                  value={workOrderDetails?.startAt}
                  mt={4 / 3}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xl={11} xs={12}>
            <Grid container columnSpacing={{ xl: 8, xs: 4 }} rowSpacing={4 / 3}>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label={t('workOrder.description')}
                  multiline
                  value={workOrderDetails?.description}
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
        <ActionBar onBack={backToList} />
      </Page>
    </>
  )
}
export default workOrderDetail
