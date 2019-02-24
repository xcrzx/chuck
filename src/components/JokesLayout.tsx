import React from 'react'
import { WithStyles, withStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import { Joke } from '../types'

import SingleJoke from './SingleJoke'

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  padding: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
})

type JokesLayoutProps = WithStyles<typeof styles> & {
  title: string
  jokes: Joke[]
  error?: Error
  actions?: React.ReactNode
}

class JokesLayout extends React.Component<JokesLayoutProps> {
  render() {
    const { classes, jokes, error, title, actions } = this.props

    return (
      <Paper className={classes.root}>
        <div className={classes.padding}>
          <Typography variant="h6">{title}</Typography>
        </div>
        {error ? (
          <div className={classes.padding}>
            <Typography variant="body1">{error.message}</Typography>
          </div>
        ) : (
          <List>
            {jokes.map(joke => (
              <SingleJoke key={joke.id} joke={joke} />
            ))}
          </List>
        )}
        {actions && (
          <>
            <Divider />
            <div className={classes.padding}>{actions}</div>
          </>
        )}
      </Paper>
    )
  }
}

export default withStyles(styles)(JokesLayout)
