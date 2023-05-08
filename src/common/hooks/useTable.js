import { useContext } from 'react'

import TableContext from '~/contexts/TableContext'

export const useTable = () => useContext(TableContext)
