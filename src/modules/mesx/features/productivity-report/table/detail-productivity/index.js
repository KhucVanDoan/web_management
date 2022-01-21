import { Component } from 'react'
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'

import withStyles from '@mui/styles/withStyles'

import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import useStyles from './style'

class ProductivityTable extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  handleOpenModal = () => this.setState({ isOpenModal: true })
  onCloseModal = () => this.setState({ isOpenModal: false })

  render() {
    const { t, classes, data } = this.props
    return (
      <>
        <Box xs={12} lg={12} md={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell variant="head" className={classes.header}>
                      {t('productivityReport.plan')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell className={classes.header}>
                        {i.executionDay}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head" className={classes.textBold}>
                      {t('productivityReport.planItemExecutionTime')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>{i.planExecutionTime}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head" className={classes.textBold}>
                      {t('productivityReport.actualItemExecutionTime')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>{i.actualExecutionTime}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head" className={classes.textBold}>
                      {t('productivityReport.planProductivity')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>
                        {i.planProductivity !== undefined
                          ? i.planProductivity + '%'
                          : i.planProductivity}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head" className={classes.textBold}>
                      {t('productivityReport.actualProductivity')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>
                        {i.actualProductivity !== undefined
                          ? i.actualProductivity + '%'
                          : i.actualProductivity}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head" className={classes.textBold}>
                      {t('productivityReport.cummulativePlanProductivity')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>
                        {i.cumulativePlanProductivity !== undefined
                          ? i.cumulativePlanProductivity + '%'
                          : i.cumulativePlanProductivity}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head" className={classes.textBold}>
                      {t('productivityReport.cummulativeActualProductivity')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>
                        {i.cumulativeActualProductivity !== undefined
                          ? i.cumulativeActualProductivity + '%'
                          : i.cumulativeActualProductivity}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Box>
      </>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(useStyles)(ProductivityTable)),
)
