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

type AppBarProps = WithStyles<typeof styles>

const AppBar: React.FC<AppBarProps> = props => {
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
