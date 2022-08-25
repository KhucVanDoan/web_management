import React, { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Status from '~/components/Status'
import TextField from '~/components/TextField'
import { ACTIVE_STATUS_OPTIONS } from '~/modules/wmsx/constants'
import useDefineObjectCategory from '~/modules/wmsx/redux/hooks/useDefineObjectCategory'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_OBJECT_CATEGORY.LIST.PATH,
    title: ROUTE.DEFINE_OBJECT_CATEGORY.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_OBJECT_CATEGORY.DETAIL.PATH,
    title: ROUTE.DEFINE_OBJECT_CATEGORY.DETAIL.TITLE,
  },
]

function DefineObjectCategoryDetail() {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, objectCategoryDetails },
    actions,
  } = useDefineObjectCategory()

  useEffect(() => {
    actions.getObjectCategoryDetailsById(id)
    return () => {
      actions.resetObjectCategoryDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_OBJECT_CATEGORY.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineObjectCategoryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Grid container rowSpacing={4 / 3} columnSpacing={{ xl: 8, xs: 4 }}>
            <Grid item xs={12}>
              <LV
                label={t('defineObjectCategory.status')}
                value={
                  <Status
                    options={ACTIVE_STATUS_OPTIONS}
                    value={objectCategoryDetails?.status}
                  />
                }
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineObjectCategory.code')}
                value={objectCategoryDetails?.code}
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <LV
                label={t('defineObjectCategory.name')}
                value={objectCategoryDetails?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label={t('defineObjectCategory.description')}
                multiline
                rows={3}
                value={objectCategoryDetails?.description}
                readOnly
                sx={{
                  'label.MuiFormLabel-root': {
                    color: (theme) => theme.palette.subText.main,
                  },
                }}
              />
            </Grid>
          </Grid>

          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineObjectCategoryDetail
