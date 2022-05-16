import { useState } from 'react'

import { FilterList as FilterIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'

import Dialog from '~/components/Dialog'

const FilterDialog = ({ children, onSubmit }) => {
  const { t } = useTranslation('qmsx')

  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <IconButton
        aria-label="settings"
        onClick={() => setOpenDialog(true)}
        sx={{ ml: 1, position: 'relative', top: -8 }}
      >
        <FilterIcon />
      </IconButton>

      <Dialog
        open={openDialog}
        title={t('general:common.filter')}
        onCancel={() => setOpenDialog(false)}
        cancelLabel={t('general:common.close')}
        onSubmit={() => {
          setOpenDialog(false)
          onSubmit()
        }}
        submitLabel={t('general:common.accept')}
      >
        {children}
      </Dialog>
    </>
  )
}

FilterDialog.defaultProps = {
  children: null,
  onSubmit: () => {},
}

FilterDialog.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
}

export default FilterDialog
