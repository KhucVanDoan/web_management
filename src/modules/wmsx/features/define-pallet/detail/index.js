import React, { useEffect } from 'react'

import { Box, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import ActionBar from '~/components/ActionBar'
import DataTable from '~/components/DataTable'
import LV from '~/components/LabelValue'
import Page from '~/components/Page'
import Tabs from '~/components/Tabs'
import TextField from '~/components/TextField'
import {
  DEFAULT_UNITS_MAP,
  PALLET_ITEM_STORAGE_TYPE,
  WEIGHT_UNITS_MAP,
} from '~/modules/wmsx/constants'
import useDefinePallet from '~/modules/wmsx/redux/hooks/useDefinePallet'
import { ROUTE } from '~/modules/wmsx/routes/config'

const breadcrumbs = [
  {
    title: 'defineCategory',
  },
  {
    route: ROUTE.DEFINE_PALLET.LIST.PATH,
    title: ROUTE.DEFINE_PALLET.LIST.TITLE,
  },
  {
    route: ROUTE.DEFINE_PALLET.DETAIL.PATH,
    title: ROUTE.DEFINE_PALLET.DETAIL.TITLE,
  },
]

const DefinePalletDetail = () => {
  const { t } = useTranslation(['wmsx'])
  const history = useHistory()
  const { id } = useParams()
  const {
    data: { isLoading, palletDetails },
    actions,
  } = useDefinePallet()

  useEffect(() => {
    actions.getPalletDetailById(id)
    return () => {
      actions.resetPalletDetailsState()
    }
  }, [id])

  const productColumns = [
    {
      field: 'code',
      headerName: t('definePallet.item.code'),
      renderCell: (params) => {
        return params.row.item?.code
      },
    },
    {
      field: 'name',
      headerName: t('definePallet.item.name'),
      renderCell: (params) => {
        return params.row.item?.name
      },
    },
    {
      field: 'amout',
      headerName: t('definePallet.item.amount'),
      renderCell: (params) => {
        return params.row.quantity
      },
    },
  ]

  const packageColumns = [
    {
      field: 'code',
      headerName: t('definePallet.package.code'),
      renderCell: (params) => {
        return params.row.package?.code
      },
    },
    {
      field: 'name',
      headerName: t('definePallet.package.name'),
      renderCell: (params) => {
        return params.row.package?.name
      },
    },
    {
      field: 'amout',
      headerName: t('definePallet.package.amount'),
      renderCell: (params) => {
        return params.row.quantity
      },
    },
  ]

  const backToList = () => {
    history.push(ROUTE.DEFINE_PALLET.LIST.PATH)
  }

  return (
    <Page
      breadcrumbs={breadcrumbs}
      title={t('menu.palletDetail')}
      onBack={backToList}
      loading={isLoading}
    >
      <Grid container justifyContent="center">
        <Grid item xl={11} xs={12}>
          <Tabs
            list={[
              t('definePallet.commonInfo'),
              t('definePallet.storageSpace'),
              t('definePallet.itemStorageType'),
            ]}
          >
            {/* Tab 1 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('definePallet.code')}
                    value={palletDetails.code}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <LV
                    label={t('definePallet.name')}
                    value={palletDetails.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label={t('definePallet.description')}
                    multiline
                    rows={3}
                    value={palletDetails.description}
                    readOnly
                    sx={{
                      'label.MuiFormLabel-root': {
                        color: (theme) => theme.palette.subText.main,
                      },
                    }}
                  />
                </Grid>
              </Grid>
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
                    label={t('definePallet.long')}
                    value={
                      palletDetails?.long?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[palletDetails?.long?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('definePallet.height')}
                    value={
                      palletDetails?.height?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[palletDetails?.height?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('definePallet.width')}
                    value={
                      palletDetails?.width?.value +
                      ' ' +
                      t(DEFAULT_UNITS_MAP[palletDetails?.width?.unit])
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <LV
                    label={t('definePallet.weight')}
                    value={
                      palletDetails?.weightLoad?.value +
                      ' ' +
                      t(WEIGHT_UNITS_MAP[palletDetails?.weightLoad?.unit])
                    }
                  />
                </Grid>
              </Grid>
            </Box>
            {/* Tab 3 */}
            <Box>
              <Grid
                container
                rowSpacing={4 / 3}
                columnSpacing={{ xl: 8, xs: 4 }}
              >
                <Grid item lg={6} xs={12}>
                  <RadioGroup
                    value={String(palletDetails?.type)}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label={t('definePallet.palletGroupItem')}
                      sx={{ pointerEvents: 'none', mt: '-9px' }}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label={t('definePallet.palletSingleItem')}
                      sx={{ pointerEvents: 'none' }}
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                {palletDetails?.type === PALLET_ITEM_STORAGE_TYPE.GROUP ? (
                  <DataTable
                    rows={palletDetails.palletDetails}
                    columns={packageColumns}
                    total={palletDetails.palletDetails?.length}
                    striped={false}
                    hideSetting
                    hideFooter
                  />
                ) : (
                  <DataTable
                    rows={palletDetails.palletDetails}
                    columns={productColumns}
                    total={palletDetails.palletDetails?.length}
                    striped={false}
                    hideSetting
                    hideFooter
                  />
                )}
              </Box>
            </Box>
          </Tabs>
          <ActionBar onBack={backToList} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default DefinePalletDetail
