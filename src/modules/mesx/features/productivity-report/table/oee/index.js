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
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import useStyles from './style'

class OEETable extends Component {
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
                      {t('productivityReport.planOEE')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>{i.planOEE}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head" className={classes.textBold}>
                      {t('productivityReport.actualOEE')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>{i.actualOEE}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      {t('productivityReport.availability')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>
                        {i.availability !== undefined
                          ? i.availability + '%'
                          : i.availability}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      {t('productivityReport.quality')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>
                        {i.quality !== undefined ? i.quality + '%' : i.quality}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      {t('productivityReport.performance')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>
                        {i.performance !== undefined
                          ? i.performance + '%'
                          : i.performance}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head" className={classes.textBold}>
                      {t('productivityReport.cumulativeActualOEE')}
                    </TableCell>
                    {data?.map((i) => (
                      <TableCell>
                        {i.cumulativeActualOEE !== undefined
                          ? i.cumulativeActualOEE + '%'
                          : i.cumulativeActualOEE}
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
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(OEETable)),
)
