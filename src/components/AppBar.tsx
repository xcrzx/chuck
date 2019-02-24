import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import LoginDialog from './LoginDialog'

const styles = {
  grow: {
    flexGrow: 1,
  },
}

type AppBarProps = WithStyles<typeof styles>

const AppBar: React.FC<AppBarProps> = props => {
  const { classes } = props

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Chuck Norris Jokes
        </Typography>
        <LoginDialog />
      </Toolbar>
    </MuiAppBar>
  )
}

export default withStyles(styles)(AppBar)
