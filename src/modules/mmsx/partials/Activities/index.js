import React, { useState } from 'react'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Avatar } from '~/components/Avatar'
import Button from '~/components/Button'
import { convertUtcDateTimeToLocalTz } from '~/utils'
const Activities = ({ data, sx }) => {
  const { t } = useTranslation('mmsx')
  const [expanded, setExpanded] = useState(false)

  const getName = (item = {}) => item.userName || item.username || ''
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
        {(data || [])
          .slice(0, expanded ? data?.length : 2)
          .map((item, index) => (
            <ListItem alignItems="flex-start" key={index} disableGutters>
              <ListItemAvatar>
                <Avatar alt="" src="" name={getName(item)} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{ mr: getName(item) ? 1 : 0 }}
                    >
                      {getName(item)}
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

      {data?.length > 2 && (
        <Button
          variant="text"
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
        >
          {t(expanded ? 'common.seeLess' : 'common.seeMore')}
        </Button>
      )}
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
      username: PropTypes.string,
      userName: PropTypes.string,
    }),
  ),
}

export default Activities
