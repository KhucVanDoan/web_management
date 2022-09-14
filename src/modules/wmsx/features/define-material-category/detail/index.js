import React, { useEffect } from 'react'

import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import { MODAL_MODE } from '~/common/constants'
import ActionBar from '~/components/ActionBar'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import useDefineExpenditureOrg from '~/modules/wmsx/redux/hooks/useDefineExpenditureOrg'
import { ROUTE } from '~/modules/wmsx/routes/config'

import MainGroupTable from '../form/main-group-table'
import MaterialTable from '../form/material-table'
import SubGroupTable from '../form/sub-group-table'

const breadcrumbs = [
  {
    title: 'database',
  },
  {
    route: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.PATH,
    title: ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.PATH,
    title: ROUTE.DEFINE_MATERIAL_CATEGORY.DETAIL.TITLE,
  },
]

const DefineMaterialCategoryDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, expenditureOrgDetails },
    actions,
  } = useDefineExpenditureOrg()

  useEffect(() => {
    actions.getExpenditureOrgDetailsById(id)
    return () => {
      actions.resetExpenditureOrgDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_MATERIAL_CATEGORY.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineMaterialCategoryDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Tabs
            list={[
              t('defineMaterialCategory.materialType'),
              t('defineMaterialCategory.mainGroup'),
              t('defineMaterialCategory.subGroup'),
            ]}
          >
            {/* Tab 1 */}
            <Box sx={{ mt: 3 }}>
              <MaterialTable
                items={expenditureOrgDetails?.producingSteps || []}
                mode={MODAL_MODE.DETAIL}
              />
            </Box>
            {/* Tab 2 */}
            <Box sx={{ mt: 3 }}>
              <MainGroupTable
                items={expenditureOrgDetails?.producingSteps || []}
                mode={MODAL_MODE.DETAIL}
              />
            </Box>
            {/* Tab 3 */}
            <Box sx={{ mt: 3 }}>
              <SubGroupTable
                items={expenditureOrgDetails?.producingSteps || []}
                mode={MODAL_MODE.DETAIL}
              />
            </Box>
          </Tabs>

          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineMaterialCategoryDetail
