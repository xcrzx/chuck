import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    flexGrow: 1,
  },
}

export interface Props extends WithStyles<typeof styles> {}

function AppBar(props: Props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Chuck Norris Jokes
          </Typography>
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}

export default withStyles(styles)(AppBar)
