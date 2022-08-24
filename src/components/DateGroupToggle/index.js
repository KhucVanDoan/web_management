import React from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { isNull } from 'lodash'
import { useTranslation } from 'react-i18next'

const groupOptions = [
  {
    name: 'week',
    value: 0,
  },
  {
    name: 'month',
    value: 1,
  },
  {
    name: 'quarter',
    value: 2,
  },
]

const DateGroupToggle = ({ groupBy = 0, setGroupBy = () => {} }) => {
  const { t } = useTranslation(['mmsx'])
  const theme = useTheme()

  const handleChangeGroupBy = (_, id) => {
    if (!isNull(id)) {
      setGroupBy(id)
    }
  }

  return (
    <ToggleButtonGroup
      color="primary"
      size="small"
      value={groupBy}
      exclusive
      onChange={handleChangeGroupBy}
    >
      {groupOptions.map((group) => (
        <ToggleButton
          key={group.value}
          value={group.value}
          sx={{
            textTransform: 'capitalize',
            color: theme.palette.text.main,
            width: 55,
            '&.Mui-selected': {
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            },
          }}
        >
          {t(`common.${group.name}`)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default DateGroupToggle
