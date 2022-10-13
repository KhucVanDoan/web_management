import { Redirect } from 'react-router-dom'

import { getLocalItem } from '~/utils/storage'

import useLicense from '../../redux/hooks/useLicense'
import LicenseDetail from './license-detail'
import LicenseForm from './license-form'

const License = () => {
  const {
    data: { license },
  } = useLicense()

  const savedLicenseInfo = getLocalItem('license')

  if (savedLicenseInfo) return <Redirect to="/" />

  if (license) return <LicenseDetail />

  return <LicenseForm />
}

export default License
