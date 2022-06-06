import React, { useEffect } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import { DEFAULT_UNITS_MAP, WEIGHT_UNITS_MAP } from '~/modules/wmsx/constants'
import useDefineBlock from '~/modules/wmsx/redux/hooks/useDefineBlock'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { convertUtcDateTimeToLocalTz } from '~/utils'

const breadcrumbs = [
  {
    title: 'defineCategory',
  },
  {
    route: ROUTE.DEFINE_BLOCK.LIST.PATH,
    title: ROUTE.DEFINE_BLOCK.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_BLOCK.DETAIL.PATH,
    title: ROUTE.DEFINE_BLOCK.DETAIL.TITLE,
  },
]

const DefineBlockDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, blockDetails },
    actions,
  } = useDefineBlock()

  useEffect(() => {
    actions.getBlockDetailsById(id)
    return () => {
      actions.resetBlockDetailsState()
    }
  }, [id])

  const backToList = () => {
    history.push(ROUTE.DEFINE_BLOCK.LIST.PATH)
  }

  const columns = [
    {
      field: 'productName',
      headerName: t('defineBlock.productName'),
      renderCell: (params) => {
        return params.row.item?.name
      },
    },
    {
      field: 'details',
      headerName: t('defineBlock.details'),
      renderCell: (params) => {
        return params.row.itemDetail?.name
      },
    },
    {
      field: 'productAmount',
      headerName: t('defineBlock.productAmount'),
      align: 'right',
      renderCell: (params) => {
        return params.row.quantity
      },
    },
  ]

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.defineBlockDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Tabs list={[t('defineBlock.commonInfo'), t('defineBlock.storage')]}>
            {/* Tab 1 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <LV label={t('defineBlock.code')} value={blockDetails.code} />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV label={t('defineBlock.name')} value={blockDetails.name} />
                </Grid>

                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineDetail.createdAt')}
                    value={convertUtcDateTimeToLocalTz(blockDetails.createdAt)}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('defineDetail.updatedAt')}
                    value={convertUtcDateTimeToLocalTz(blockDetails.updatedAt)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label={t('defineBlock.description')}
                    multiline
                    rows={3}
                    value={blockDetails.description}
                    readOnly
                    sx={{
                      'label.MuiFormLabel-root': {
                        color: (theme) => theme.palette.subText.main,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" mt={1} mb={1}>
                    {t('defineBlock.productList')}
                  </Typography>
                </Grid>
                {/* {blockDetails.packageItems?.map((p) => (
                  <>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineBlock.productName')}
                        value={p.item?.name}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <LV
                        label={t('defineBlock.productAmount')}
                        value={Number(p.quantity)}
                      />
                    </Grid>
                  </>
                ))} */}
              </Grid>
              <Box sx={{ mt: 2 }}>
                <DataTable
                  rows={blockDetails.blockItemDetails}
                  columns={columns}
                  total={blockDetails.blockItemDetails?.length}
                  striped={false}
                  hideSetting
                  hideFooter
                />
              </Box>
            </Box>

            {/* Tab 2 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineBlock.long')}
                    value={
                      blockDetails?.long?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[blockDetails?.long?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineBlock.height')}
                    value={
                      blockDetails?.height?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[blockDetails?.height?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineBlock.width')}
                    value={
                      blockDetails?.width?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[blockDetails?.width?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('defineBlock.weight')}
                    value={
                      blockDetails?.weight?.value +
                      ' ' +
                      t(WEIGHT_UNITS_MAP[blockDetails?.weight?.unit])
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Tabs>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefineBlockDetail
