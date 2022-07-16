import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LabelValue from '~/components/LabelValue'
import Page from '~/components/Page'
import TextField from '~/components/TextField'
import useAttributeType from '~/modules/mmsx/redux/hooks/useAttributeType'
import { ROUTE } from '~/modules/mmsx/routes/config'
const breadcrumbs = [
  {
    title: ROUTE.SETTING.TITLE,
  },
  {
    route: ROUTE.ATTRIBUTE_TYPE.LIST.PATH,
    title: ROUTE.ATTRIBUTE_TYPE.LIST.TITLE,
  },
  {
    route: ROUTE.ATTRIBUTE_TYPE.DETAIL.PATH,
    title: ROUTE.ATTRIBUTE_TYPE.DETAIL.TITLE,
  },
]
function AttributeTypeDetail() {
  const { t } = useTranslation(['mmsx'])
  const history = useHistory()
  const { id } = useParams()

  const {
    data: { attributeTypeDetail, isLoading },
    actions,
  } = useAttributeType()

  useEffect(() => {
    actions.getAttributeType(id)
    return () => actions.resetStateAttrbuteType()
  }, [id])

  const backToList = () => {
    history.push(ROUTE.ATTRIBUTE_TYPE.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.attributeTypeDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('attributeType.table.code')}
                value={attributeTypeDetail?.code}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('attributeType.table.name')}
                value={attributeTypeDetail?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LabelValue
                label={t('attributeType.table.unit')}
                value={attributeTypeDetail?.unit?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('attributeType.form.description')}
                placeholder={t('attributeType.form.description')}
                multiline
                readOnly
                rows={3}
                value={attributeTypeDetail?.description}
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

export default AttributeTypeDetail
