import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { Theme, withStyles, WithStyles } from '@material-ui/core'

import AppBar from './AppBar'
import RandomJokes from './RandomJokes'

const styles = (theme: Theme) => ({
  padding: {
    padding: theme.spacing.unit * 4,
  },
})

type AppProps = WithStyles<typeof styles>

const App: React.FunctionComponent<AppProps> = ({ classes }) => {
  return (
    <>
      <CssBaseline />
      <AppBar />
      <div className={classes.padding}>
        <Grid container spacing={24}>
          <Grid item>
            <RandomJokes />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default withStyles(styles)(App)
