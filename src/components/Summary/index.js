import { Card, CardContent, Box, Typography } from '@mui/material'
import { PropTypes } from 'prop-types'

import Icon from '~/components/Icon'

const Summary = ({ icon, label, value }) => {
  return (
    <Card
      sx={{
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          p: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            flex: '0 0 48px',
            width: 48,
            height: 48,
            bgcolor: 'grayF4.main',
            borderRadius: 2,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 1,
          }}
        >
          <Icon name={icon} size={24} />
        </Box>

        <Box sx={{ flex: 1, textAlign: 'right' }}>
          <Typography
            sx={{ fontSize: 38, fontWeight: 700, lineHeight: 1, mb: 1 }}
          >
            {value}
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

Summary.defaultProps = {
  value: 0,
}

Summary.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
}

export default Summary
