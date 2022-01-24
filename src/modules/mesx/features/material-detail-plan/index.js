import React, { Component } from 'react'

import Search from '@mui/icons-material/Search'
import {
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material'
import { Autocomplete } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import withStyles from '@mui/styles/withStyles'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'

import { MO_STATUS } from '~/common/constants'
import withBreadcrumbs from '~/components/Breadcrumbs'
import DataTable from '~/components/DataTable'
import Loading from '~/components/Loading'
import { getItems } from '~/modules/mesx/redux/actions/common.action'
import { getProducingStepDetailsById } from '~/modules/mesx/redux/actions/index.action'
import { searchMaterialDetailPlan } from '~/modules/mesx/redux/actions/material-detail-plan.action'
import { searchMO } from '~/modules/mesx/redux/actions/mo.action'
import { getMODetailsById } from '~/modules/mesx/redux/actions/mo.action'
import { getWorkCenterDetailsById } from '~/modules/mesx/redux/actions/work-center.action'
import { ROUTE } from '~/modules/mesx/routes/config'

import useStyles from './style'

const breadcrumbs = [
  {
    title: 'plan',
  },
  {
    route: ROUTE.MATERIAL_DETAIL_PLAN.PATH,
    title: ROUTE.MATERIAL_DETAIL_PLAN.TITLE,
  },
]

class MaterialDetailPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mo: null,
      moId: null,
      itemId: null,
      itemName: '',
      producingStepId: null,
      workCenterId: null,
      items: [],
      producingStepList: [],
      workCenterList: [],
      executionDay: [],
      materialList: [],
      planQuantityMaterial: [],
      actualQuantityMaterial: [],
      shortageQuantityMaterial: [],
      moPlan_planTotal: 0,
      moPlan_actualTotal: 0,
      moPlan_remainingTotal: 0,
      isSubmitFilter: false,
    }

    this.validator = new SimpleReactValidator()
  }

  componentDidMount() {
    const filterData = [
      {
        column: 'status',
        text: MO_STATUS.CONFIRMED.toString(),
      },
    ]
    const params = {
      isGetAll: 1,
      filter: JSON.stringify(filterData),
    }

    this.props.searchMO(params)
    this.props.getItems({ isGetAll: 1 })
  }

  componentDidUpdate(prevProps, prevState) {
    const { moList, itemList } = this.props
    let workCenterList = []
    let producingStepList = []

    if (prevState.moId !== this.state.moId) {
      const mo = moList.find((i) => i.id === this.state?.moId)
      const items = mo?.manufacturingOrderDetails.map((i) =>
        itemList.find((item) => item.id === i.itemId),
      )

      mo?.manufacturingOrderDetails.forEach((i) => {
        i?.workOrders.map((work) => {
          workCenterList = workCenterList.concat(work?.workCenters)
          producingStepList.push({
            id: work?.producingStepId,
            name: work?.producingStepName,
          })
        })
      })

      this.setState({
        mo,
        items,
        producingStepList,
        workCenterList,
      })
    }

    if (prevState.itemId !== this.state.itemId) {
      const item = this.state.mo.manufacturingOrderDetails.find(
        (i) => i.itemId === this.state.itemId,
      )

      item?.workOrders.map((work) => {
        workCenterList = workCenterList.concat(work?.workCenters)
        producingStepList.push({
          id: work?.producingStepId,
          name: work?.producingStepName,
        })
      })

      this.setState({
        producingStepList,
        workCenterList,
      })
    }

    if (
      prevState.producingStepId !== this.state.producingStepId &&
      this.state.itemId
    ) {
      const item = this.state.mo?.manufacturingOrderDetails.find(
        (i) => i.itemId === this.state.itemId,
      )
      item?.workOrders.map((work) => {
        if (work?.producingStepId === this.state.producingStepId)
          workCenterList = workCenterList.concat(work?.workCenters)
      })

      this.setState({
        workCenterList,
      })
    }
  }

  refreshData = () => {
    const { itemId, moId, producingStepId, workCenterId } = this.state
    this.setState({ isSubmitFilter: true })
    if (this.validator.allValid()) {
      const params = {
        manufacturingOrderId: moId,
        itemId,
        producingStepId,
        workCenterId,
      }

      this.props.searchMaterialDetailPlan(params, (res) => {
        const { materialReport, manufacturingOrderPlan } = this.props.mdpDetails

        const executionDay = manufacturingOrderPlan.map((i) =>
          i.executionDay.slice(0, 10).split('-').reverse().join('-'),
        )

        let moPlan_planTotal = 0
        let moPlan_actualTotal = 0
        let moPlan_remainingTotal = 0

        manufacturingOrderPlan.forEach((i) => {
          moPlan_planTotal += Math.floor(i?.planQuantityMaterial)
          moPlan_actualTotal += Math.floor(i?.actualQuantityMaterial)
          moPlan_remainingTotal += Math.floor(i?.shortageQuantityMaterial)
        })

        const materialList = materialReport.map((i) => {
          let materialReport_planTotal = 0
          let materialReport_actualTotal = 0
          let materialReport_remainingTotal = 0

          let planQuantity = []
          let actualQuantity = []
          let remainingQuantity = []

          i?.materialPlanSchedules.forEach((material) => {
            materialReport_planTotal += Math.floor(
              material?.planQuantityMaterial,
            )
            materialReport_actualTotal += Math.floor(
              material?.actualQuantityMaterial,
            )
            materialReport_remainingTotal += Math.floor(
              material?.remainingQuantityMaterial,
            )
            planQuantity.push(material?.planQuantityMaterial)
            actualQuantity.push(material?.actualQuantityMaterial)
            remainingQuantity.push(material?.remainingQuantityMaterial)
          })

          const executionDayLength = executionDay.length
          const planQuantityLength = planQuantity.length
          const actualQuantityLength = actualQuantity.length
          const remainingQuantityLength = remainingQuantity.length
          for (let i = 0; i < executionDayLength - planQuantityLength; i++) {
            planQuantity.push(0)
          }

          for (let i = 0; i < executionDayLength - actualQuantityLength; i++) {
            actualQuantity.push(0)
          }

          for (
            let i = 0;
            i < executionDayLength - remainingQuantityLength;
            i++
          ) {
            remainingQuantity.push(0)
          }

          return {
            itemName: i.itemName,
            materialReports: {
              planQuantity: planQuantity,
              actualQuantity: actualQuantity,
              remainingQuantity: remainingQuantity,
            },
            planTotal: materialReport_planTotal,
            actualTotal: materialReport_actualTotal,
            remainingTotal: materialReport_remainingTotal,
          }
        })

        this.setState({
          executionDay,
          materialList,
          planQuantityMaterial: manufacturingOrderPlan.map(
            (i) => i.planQuantityMaterial,
          ),
          actualQuantityMaterial: manufacturingOrderPlan.map(
            (i) => i.actualQuantityMaterial,
          ),
          shortageQuantityMaterial: manufacturingOrderPlan.map(
            (i) => i.shortageQuantityMaterial,
          ),
          moPlan_planTotal,
          moPlan_actualTotal,
          moPlan_remainingTotal,
        })
      })
    }
  }

  onChangeItem = (key, value) => {
    if (value) this.setState({ [key]: value })
    else this.setState({ [key]: '' })
  }

  render() {
    const {
      items,
      itemName,
      producingStepList,
      workCenterList,
      executionDay,
      planQuantityMaterial,
      actualQuantityMaterial,
      shortageQuantityMaterial,
      moPlan_planTotal,
      moPlan_actualTotal,
      moPlan_remainingTotal,
      materialList,
      producingStepId,
      moId,
      itemId,
      workCenterId,
      isSubmitFilter,
    } = this.state
    const { t, classes, moList } = this.props

    return (
      <>
        <div>
          <h2>{t('materialDetailPlan.title')}</h2>
        </div>
        <Box display="flex" justifyContent="center">
          <Grid container>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={70}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('materialDetailPlan.moCode')}
                    <span className={classes.required}> *</span>
                  </label>
                </Box>

                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl fullWidth size="small">
                    <Select
                      className={classes.displayFlex}
                      size="small"
                      variant="outlined"
                      value={moId}
                      onChange={(event) => {
                        this.onChangeItem('moId', event.target.value)
                      }}
                      openOnFocus
                    >
                      {moList.map((i) => (
                        <MenuItem key={i?.id} value={i?.id}>
                          {i?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* add rule to validate */}
                    {this.validator.message('moId', moId, `required`)}
                    {/* check isValid to show messages */}
                    {isSubmitFilter &&
                      !this.validator.check(moId, `required`) && (
                        <FormHelperText error>
                          {t('form.required')}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={70}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('materialDetailPlan.itemName')}
                  </label>
                </Box>

                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl fullWidth size="small">
                    <Select
                      className={classes.displayFlex}
                      size="small"
                      variant="outlined"
                      value={itemId}
                      onChange={(event) => {
                        this.onChangeItem('itemId', event.target.value)
                        this.onChangeItem(
                          'itemName',
                          event.currentTarget.dataset.name,
                        )
                      }}
                      openOnFocus
                    >
                      {items?.map((i) => (
                        <MenuItem key={i?.id} value={i?.id} data-name={i?.name}>
                          {i?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={70}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('materialDetailPlan.producingStepName')}
                  </label>
                </Box>

                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl fullWidth size="small">
                    <Select
                      className={classes.displayFlex}
                      size="small"
                      variant="outlined"
                      value={producingStepId}
                      onChange={(event) =>
                        this.onChangeItem('producingStepId', event.target.value)
                      }
                      openOnFocus
                    >
                      {producingStepList?.map((i) => (
                        <MenuItem key={i?.id} value={i?.id}>
                          {i?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center">
          <Grid container>
            <Grid item xs={12} lg={4} md={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                height={70}
              >
                <Box width={0.3}>
                  <label className={classes.labelItem}>
                    {t('materialDetailPlan.workCenterName')}
                  </label>
                </Box>

                <Box
                  width={0.7}
                  mx={2}
                  height={1}
                  display="flex"
                  alignItems="center"
                >
                  <FormControl fullWidth size="small">
                    <Select
                      className={classes.displayFlex}
                      size="small"
                      variant="outlined"
                      value={workCenterId}
                      onChange={(event) =>
                        this.onChangeItem('workCenterId', event.target.value)
                      }
                      openOnFocus
                    >
                      {workCenterList?.map((i) => (
                        <MenuItem key={i?.id} value={i?.id}>
                          {i?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={6}></Grid>
            <Grid item xs={12} lg={4} md={2}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mr={1}
                flex={1}
                height={1}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.refreshData}
                  startIcon={<Search />}
                >
                  {t('common.search')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* production plan */}
        <Box mt={5}>
          <Box width={0.3}>
            <label className={classes.labelItem}>
              {t('materialDetailPlan.productionPlan')}
              <span className={classes.required}> *</span>
            </label>
          </Box>
          <TableContainer>
            <Table className={classes.table} stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    width={40}
                    className={classes.headerCell}
                    padding="normal"
                    align="center"
                  >
                    {t('materialDetailPlan.targetName')}
                  </TableCell>
                  <TableCell
                    width={40}
                    className={classes.headerCell}
                    padding="normal"
                    align="center"
                  >
                    {t('materialDetailPlan.plan')}
                  </TableCell>
                  {executionDay.map((duration) => (
                    <TableCell
                      width={20}
                      className={classes.headerCell}
                      padding="normal"
                      align="center"
                    >
                      {duration}
                    </TableCell>
                  ))}
                  <TableCell
                    width={20}
                    className={classes.headerCell}
                    padding="normal"
                    align="center"
                  >
                    {t('materialDetailPlan.total')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell rowSpan={3}>{itemName}</TableCell>
                  <TableCell>{t('materialDetailPlan.planQuantity')}</TableCell>
                  {planQuantityMaterial.map((value) => (
                    <TableCell>{Math.floor(value)}</TableCell>
                  ))}
                  <TableCell>{Math.floor(moPlan_planTotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {t('materialDetailPlan.productionQuantity')}
                  </TableCell>
                  {actualQuantityMaterial.map((value) => (
                    <TableCell>{Math.floor(value)}</TableCell>
                  ))}
                  <TableCell>{Math.floor(moPlan_actualTotal)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {t('materialDetailPlan.additionQuantity')}
                  </TableCell>
                  {shortageQuantityMaterial.map((value) => (
                    <TableCell>{Math.floor(value)}</TableCell>
                  ))}
                  <TableCell>{Math.floor(moPlan_remainingTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* material plan */}
        <Box mt={5}>
          <Box width={0.3}>
            <label className={classes.labelItem}>
              {t('materialDetailPlan.materialPlan')}
              <span className={classes.required}> *</span>
            </label>
          </Box>
          <TableContainer>
            <Table className={classes.table} stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    width={40}
                    className={classes.headerCell}
                    padding="normal"
                    align="center"
                  >
                    {t('materialDetailPlan.targetName')}
                  </TableCell>
                  <TableCell
                    width={40}
                    className={classes.headerCell}
                    padding="normal"
                    align="center"
                  >
                    {t('materialDetailPlan.plan')}
                  </TableCell>
                  {executionDay.map((duration) => (
                    <TableCell
                      width={20}
                      className={classes.headerCell}
                      padding="normal"
                      align="center"
                    >
                      {duration}
                    </TableCell>
                  ))}
                  <TableCell
                    width={20}
                    className={classes.headerCell}
                    padding="normal"
                    align="center"
                  >
                    {t('materialDetailPlan.total')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materialList.map((i) => (
                  <>
                    <TableRow>
                      <TableCell rowSpan={3}>{i.itemName}</TableCell>
                      <TableCell>
                        {t('materialDetailPlan.planQuantity')}
                      </TableCell>
                      {i?.materialReports?.planQuantity.map((value) => (
                        <TableCell>{Math.floor(value)}</TableCell>
                      ))}
                      <TableCell>{Math.floor(i.planTotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {t('materialDetailPlan.productionQuantity')}
                      </TableCell>
                      {i?.materialReports?.actualQuantity.map((value) => (
                        <TableCell>{Math.floor(value)}</TableCell>
                      ))}
                      <TableCell>{Math.floor(i.actualTotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        {t('materialDetailPlan.additionQuantity')}
                      </TableCell>
                      {i?.materialReports?.remainingQuantity.map((value) => (
                        <TableCell>{Math.floor(value)}</TableCell>
                      ))}
                      <TableCell>{Math.floor(i.remainingTotal)}</TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  moList: state.Mo.moList,
  moDetails: state.Mo.moDetails,
  producingStep: state.producingStep,
  wcDetails: state.workCenter.wcDetails,
  itemList: state.commonManagement.itemList,
  mdpDetails: state.materialDetailPlan.mdpDetails,
})

const mapDispatchToProps = {
  searchMO,
  getMODetailsById,
  getProducingStepDetailsById,
  getWorkCenterDetailsById,
  searchMaterialDetailPlan,
  getItems,
}

export default withBreadcrumbs(
  withTranslation()(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(withStyles(useStyles)(MaterialDetailPlan)),
  ),
  breadcrumbs,
)
