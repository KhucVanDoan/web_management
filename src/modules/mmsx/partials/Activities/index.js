import React from 'react'

import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { convertUtcDateTimeToLocalTz } from '~/utils'

const Activities = ({ data, sx }) => {
  const { t } = useTranslation('mmsx')

  return (
    <Paper
      sx={{
        mt: 2,
        p: 2,
        ...sx,
      }}
    >
      <Typography variant="h3">{t('common.activityReport')}</Typography>
      <List>
        {data.map((item) => (
          <ListItem alignItems="flex-start" key={item?.id} disableGutters>
            <ListItemAvatar>
              <Avatar alt="" src="" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography
                    variant="h5"
                    component="span"
                    sx={{ mr: item?.username ? 1 : 0 }}
                  >
                    {item?.username}
                  </Typography>
                  <Typography variant="body2" component="span">
                    {convertUtcDateTimeToLocalTz(item?.createdAt)}
                  </Typography>
                </>
              }
              secondary={<Typography>{item?.content}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

Activities.defaultProps = {
  data: [],
  sx: {},
}

Activities.propTypes = {
  sx: PropTypes.shape(),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ),
}

export default Activities
