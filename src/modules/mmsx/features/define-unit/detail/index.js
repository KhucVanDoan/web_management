import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import { ROUTE } from '~/modules/mmsx/routes/config'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.DEFINE_UNIT.LIST.PATH,
    title: ROUTE.DEFINE_UNIT.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_UNIT.DETAIL.PATH,
    title: ROUTE.DEFINE_UNIT.DETAIL.TITLE,
  },
]
function DefineUnitDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  // const { id } = useParams()

  // const {
  //   data: { defineUnitDetail, isLoading },
  //   actions,
  // } = useDefineUnit()

  // useEffect(() => {
  //   actions.getUnit(id)
  //   return () => actions.resetStateDefineUnit()
  // }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_UNIT.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineUnitDetail')}
      onBack={backToList}
      // loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12} lg={6}>
              <LabelValue label={t('defineUnit.code')} value={''} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue label={t('defineUnit.name')} value={''} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue label={t('defineUnit.unit')} value={''} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineUnit.description')}
                placeholder={t('defineUnit.description')}
                multiline
                readOnly
                rows={3}
                value={''}
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
  )
}

export default DefineUnitDetail
