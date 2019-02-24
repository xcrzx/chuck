import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { Theme, withStyles, WithStyles } from '@material-ui/core'
import { Provider } from 'react-redux'

import { store } from '../store'

import AppBar from './AppBar'
import RandomJokes from './RandomJokes'
import FavoriteJokes from './FavoriteJokes'

const styles = (theme: Theme) => ({
  padding: {
    padding: theme.spacing.unit * 4,
  },
})

type AppProps = WithStyles<typeof styles>

const App: React.FunctionComponent<AppProps> = ({ classes }) => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppBar />
      <div className={classes.padding}>
        <Grid container spacing={24}>
          <Grid item md={6}>
            <RandomJokes />
          </Grid>
          <Grid item md={6}>
            <FavoriteJokes />
          </Grid>
        </Grid>
      </div>
    </Provider>
  )
}

export default withStyles(styles)(App)
