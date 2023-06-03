import React, { Suspense } from 'react'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import GlobalStyles from '@mui/material/GlobalStyles'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { I18nextProvider } from 'react-i18next'
import ReactNotification from 'react-notifications-component'
import { Provider as ReduxProvider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import AuthLayout from '~/layouts/Auth'
import PrivateLayout from '~/layouts/Private'
import PublicLayout from '~/layouts/Public'
import authRoutes from '~/modules/auth/routes'
import publicRoutes from '~/modules/public/routes'
import wmsxRoutes from '~/modules/wmsx/routes'
// import { privateRoutesFlatten } from '~/routes'
import history from '~/services/history'
import store from '~/store'
import theme, { globalStyles } from '~/themes'
import i18n from '~/utils/i18n'

import { AppProvider } from './contexts/AppContext'
import { SocketProvider } from './contexts/SocketContext'
import NotFoundPage from './modules/public/features/not-found'
import { getLocale } from './utils'
import { DateFns } from './utils/date-time'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles(theme)} />

        <Suspense fallback={() => null}>
          <I18nextProvider i18n={i18n}>
            <ReduxProvider store={store}>
              <LocalizationProvider dateAdapter={DateFns} locale={getLocale()}>
                <AppProvider>
                  <SocketProvider>
                    <ReactNotification />

                    <Router history={history}>
                      {/* <LicenseChecking /> */}

                      <Switch>
                        {publicRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path}
                            render={(props) => (
                              <PublicLayout>
                                <route.component {...props} />
                              </PublicLayout>
                            )}
                            exact
                          />
                        ))}

                        {authRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path}
                            render={(props) => (
                              <AuthLayout>
                                <route.component {...props} />
                              </AuthLayout>
                            )}
                            exact
                          />
                        ))}

                        {wmsxRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path}
                            render={(props) => (
                              <PrivateLayout>
                                <route.component {...props} />
                              </PrivateLayout>
                            )}
                            exact
                          />
                        ))}
                        <Route path="*" component={NotFoundPage} />
                      </Switch>
                    </Router>
                  </SocketProvider>
                </AppProvider>
              </LocalizationProvider>
            </ReduxProvider>
          </I18nextProvider>
        </Suspense>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
