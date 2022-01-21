import React, { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider as ReduxProvider } from 'react-redux'
import ReactNotification from 'react-notifications-component'
import i18n from 'utils/i18n'
import store from 'store'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
import { Router, Route, Switch } from 'react-router-dom'
import history from 'services/history'

import publicRoutes from 'modules/public/routes'
import authRoutes from 'modules/auth/routes'
import { privateRoutesFlatten } from 'routes'
import PublicLayout from 'layouts/Public'
import AuthLayout from 'layouts/Auth'
import PrivateLayout from 'layouts/Private'

import theme, { globalStyles } from 'themes'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import viLocale from 'date-fns/locale/vi'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles(theme)} />

        <Suspense fallback={() => null}>
          <ReactNotification />
          <ReduxProvider store={store}>
            <I18nextProvider i18n={i18n}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={viLocale}
              >
                <Router history={history}>
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

                    {privateRoutesFlatten.map((route) => (
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
                    <Route path="*" component={() => <h1>404 not found</h1>} />
                  </Switch>
                </Router>
              </LocalizationProvider>
            </I18nextProvider>
          </ReduxProvider>
        </Suspense>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
