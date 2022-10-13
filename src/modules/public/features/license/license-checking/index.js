import { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import { ROUTE } from '~/modules/public/routes/config'
import { getLocalItem } from '~/utils/storage'

const LicenseChecking = () => {
  const history = useHistory()

  useEffect(() => {
    const savedLicenseInfo = getLocalItem('license')

    if (!savedLicenseInfo) {
      history.push(ROUTE.LICENSE.PATH)
    }
  }, [])

  return null
}

export default LicenseChecking
