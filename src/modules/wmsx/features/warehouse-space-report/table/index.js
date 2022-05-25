import React from 'react'

import { Grid, Typography } from '@mui/material'
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
        <Grid container>
          <Grid xs={12}>
            <div className={classes.rangeTitle}>
              <Typography className={classes.rangeTitleText} variant="h5">
                {item?.name}
              </Typography>
            </div>
            <Grid style={{ overflowX: 'auto' }} wrap={false} align="bottom">
              {item?.shelfs?.map((shelf) => (
                <Grid>
                  {shelf?.floors?.reverse().map((floor) => (
                    <Grid>
                      <Grid className={classes.colFloors}>
                        <ProgressBar
                          bgcolor={
                            +floor.fullmentPercent === 100
                              ? theme.palette.error.main
                              : +floor.fullmentPercent > 70
                              ? theme.palette.secondary.main
                              : theme.palette.primary.main
                          }
                          completed={+floor.fullmentPercent}
                          name={floor.position}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              ))}
              {item?.fullmentPercent > 0 && (
                <Grid>
                  <div className={classes.sectorFullment}>
                    <span>
                      {item.fullmentPercent ? item.fullmentPercent + '%' : null}
                    </span>
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      ))}
      {data?.fullmentPercent > 0 && (
        <Grid sx={{ mt: 2 }}>
          <Grid xs={24}>
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
