import React from 'react'

import { Grid, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useClasses } from '~/themes'

import ProgressBar from '../progress-bar/index'
import style from './style'

const Table = (props) => {
  const theme = useTheme()
  const { data } = props
  const classes = useClasses(style)
  return (
    <>
      {data?.sectors?.map((item) => (
        //                 <Grid
        //                 container
        //                 rowSpacing={4 / 3}
        //                 columnSpacing={{ xl: 8, xs: 4 }}
        //               >
        //                 {item?.shelfs?.map((shelf) => (
        //                 <Grid xs={4}>
        //                   {shelf?.floors?.reverse().map((floor) => (
        //                     // <Grid xs={4}>
        //                     <Grid className={classes.colFloors}>
        //                       <ProgressBar
        //                         bgcolor={
        //                           +floor.fullmentPercent === 100
        //                             ? theme.palette.error.main
        //                             : +floor.fullmentPercent > 70
        //                             ? theme.palette.secondary.main
        //                             : theme.palette.primary.main
        //                         }
        //                         completed={+floor.fullmentPercent}
        //                         name={floor.position}
        //                       />
        //                     </Grid>
        //                     // </Grid>
        //                   ))}
        //                 </Grid>
        //               ))}
        // <Grid item lg={6} xs={12}>

        // </Grid>
        // </Grid>
        <Grid container>
          <Grid xs={12}>
            <div className={classes.rangeTitle}>
              <Typography className={classes.rangeTitleText} variant="h5">
                {item?.name}
              </Typography>
            </div>
            <Box
              style={{ overflowX: 'auto' }}
              wrap={false}
              align="bottom"
              display="flex"
            >
              {item?.shelfs?.map((shelf) => (
                <Grid xs={4}>
                  {shelf?.floors?.reverse().map((floor) => (
                    <ProgressBar
                      bgcolor={
                        +floor.fullmentPercent === 100
                          ? theme.palette.error.main
                          : +floor.fullmentPercent > 70
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                      }
                      completed={+floor.fullmentPercent}
                      name={floor.name}
                    />
                  ))}
                </Grid>
              ))}
              {item?.fullmentPercent > 0 && (
                <Grid xs={4}>
                  <div className={classes.sectorFullment}>
                    <span>
                      {item.fullmentPercent ? item.fullmentPercent + '%' : null}
                    </span>
                  </div>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      ))}
      {data?.fullmentPercent > 0 && (
        <Grid sx={{ mt: 2 }}>
          <Grid xs={12}>
            <div className={classes.warehouseFullment}>
              <span>
                {data?.fullmentPercent ? data.fullmentPercent + '%' : null}
              </span>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Table
